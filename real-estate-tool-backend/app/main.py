from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from . import schemas
import pandas as pd
import numpy as np
# import seaborn as sns
# import matplotlib.pyplot as plt
import warnings
import re
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
# import statsmodels.api as sm
from datetime import datetime
warnings.filterwarnings("ignore")

app = FastAPI(title="Housing Price Predictor")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/predict")
def predict(request: schemas.PredictRequest):
    floor_area = float(request.size)
    remaining_lease_years = int(request.lease)
    remaining_lease_months = int(request.remaining_months)
    flat_type = request.flat_type
    floor_category = request.floor_cat

    months_since_2017 = calculate_months_since_jan_2017()

    price = calculate(floor_area, remaining_lease_years, remaining_lease_months, months_since_2017, flat_type, floor_category)

    return {"status": "ok", "price": price}

data = "Resale Flat Prices Jan-2017 onwards.csv"
housing = pd.read_csv(data)

# Transform skewed data using log
housing[['resale_price_lg', 'floor_area_sqm_lg']] = np.log(housing[['resale_price', 'floor_area_sqm']])

# Convert remaining lease to months
def convert_to_months(lease_str):
    match = re.match(r'(\d+) years (\d+) months', lease_str)
    if match:
        years = int(match.group(1))
        months = int(match.group(2))
        return years * 12 + months
    match_years = re.match(r'(\d+) years', lease_str)
    if match_years:
        years = int(match_years.group(1))
        return years * 12
    return None  

housing['remaining_lease_months'] = housing['remaining_lease'].apply(convert_to_months)

# Convert the number of months since January 2017 to an integer
def convert_month_to_int(month_str):
    year, month = map(int, month_str.split('-'))
    return (year - 2017) * 12 + (month - 1)

housing['months_since_jan_2017'] = housing['month'].apply(convert_month_to_int)

# Bin storey range data to prepare for encoding
housing['storey_range_start'] = housing['storey_range'].str.split(' TO ').str[0].astype(int)
housing['storey_range_end'] = housing['storey_range'].str.split(' TO ').str[1].astype(int)

# Create a new column to categorise floors
def categorise_floors(row):
    if row['storey_range_end'] <= 6:
        return 'low_floor'
    elif 7 <= row['storey_range_start'] <= 21:
        return 'medium_floor'
    else:
        return 'high_floor'

housing['floor_category'] = housing.apply(categorise_floors, axis=1)

# Bin floor category data to prepare for encoding
hdb_type_mapping = {
    '2 ROOM': '2_3_ROOM',
    '3 ROOM': '2_3_ROOM',
    '4 ROOM': '4_5_ROOM',
    '5 ROOM': '4_5_ROOM',
    'EXECUTIVE': 'EXECUTIVE_MULTI',
    'MULTI GENERATION': 'EXECUTIVE_MULTI'
}

housing['hdb_type_binned'] = housing['flat_type'].map(hdb_type_mapping)

# Encode categorical variables
housing_prepared = housing[['floor_area_sqm_lg', 'resale_price_lg', 'remaining_lease_months', 'months_since_jan_2017', 'hdb_type_binned', 'floor_category']]
housing_encoded = pd.get_dummies(housing_prepared, columns = ['hdb_type_binned', 'floor_category'], drop_first= True, dtype=int)
housing_encoded.rename(columns={'floor_area_sqm_lg': 'floor_area_lg', 'remaining_lease_months': 'remaining_months', 'months_since_jan_2017':'months_since_2017','hdb_type_binned_EXECUTIVE_MULTI':'exec_multi_room' ,'hdb_type_binned_4_5_ROOM':'4_5_room', 'floor_category_low_floor':'low_floor','floor_category_medium_floor':'med_floor'}, inplace=True)

# Feed training data into the model
X = housing_encoded[['floor_area_lg','remaining_months','months_since_2017','4_5_room', 'exec_multi_room', 'low_floor', 'med_floor']]
y = housing_encoded['resale_price_lg']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2)
lm = LinearRegression()
lm.fit(X_train,y_train)

# Calculate months since January 2017
def calculate_months_since_jan_2017():
    current_date = datetime.now()
    start_date = datetime(2017, 1, 1)
    delta = current_date - start_date
    return delta.days // 30  # Convert days to months

# Prompt user for input and make predictions
def calculate(floor_area, remaining_lease_years, remaining_lease_months, months_since_2017, flat_type, floor_category):
    # floor_area = float(input("Enter the floor area (in sqm): "))
    # remaining_lease_years = int(input("Enter the remaining lease (in years): "))
    # remaining_lease_months = int(input("Enter additional remaining months (if any): "))
    
    # months_since_2017 = calculate_months_since_jan_2017()
    # print(f"Months since January 2017: {months_since_2017}")

    # flat_type = input("Enter flat type (2/3 room, 4/5 room, Executive/Multi): ").strip().lower()
    if flat_type == "4/5 room":
        four_five_room = 1
        exec_multi_room = 0
    elif flat_type == "executive/multi":
        four_five_room = 0
        exec_multi_room = 1
    elif flat_type == "2/3 room":
        four_five_room = 0
        exec_multi_room = 0
    else:
        print("Invalid flat type entered. Defaulting to 2/3 room.")
        four_five_room = 0
        exec_multi_room = 0

    # floor_category = input("Enter floor category (low: 1st to 6th floor, medium: 7th to 21st floor, high: Anything beyond the 21st floor): ").strip().lower()
    if floor_category == "low":
        low_floor = 1
        med_floor = 0
    elif floor_category == "medium":
        low_floor = 0
        med_floor = 1
    else:
        low_floor = 0
        med_floor = 0
    
    floor_area_lg = np.log(floor_area)
    remaining_lease_months_total = remaining_lease_years * 12 + remaining_lease_months
    
    new_data = pd.DataFrame({
        'floor_area_lg': [floor_area_lg],
        'remaining_months': [remaining_lease_months_total],
        'months_since_2017': [months_since_2017],
        '4_5_room': [four_five_room],
        'exec_multi_room': [exec_multi_room],
        'low_floor': [low_floor],
        'med_floor': [med_floor]
    })
    
    predicted_log_price = lm.predict(new_data)
    predicted_price = np.exp(predicted_log_price)
    return predicted_price[0]