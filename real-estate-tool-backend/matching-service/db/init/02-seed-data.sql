-- Insert Sellers
INSERT INTO sellers (id, name, contact, agent_id) VALUES 
(3, 'Robert Davis', '+6594567890', 1),
(7, 'James Lee', '+6595678901', 2),
(8, 'Sophia Tan', '+6596789012', 1),
(19, 'Daniel Wong', '+6598901234', 2),
(20, 'Olivia Lim', '+6599012345', 1),
(21, 'Adrian Koh', '+6590123456', 2),
(22, 'Fiona Ng', '+6591234567', 1);

-- Reset the sequence to continue after the highest ID
SELECT setval('sellers_id_seq', (SELECT MAX(id) FROM sellers));

-- Insert Buyers
INSERT INTO buyers (id, name, contact, preferences, agent_id) VALUES
(1, 'John Smith', '+6591234567', 'Looking for a 3-room flat in Ang Mo Kio with good ventilation, near MRT, below 300k', 1),
(2, 'Sarah Johnson', '+6599876543', 'Interested in a 4-room flat in Bishan, high floor, good school zone, budget 450k', 1),
(4, 'Emily Wilson', '+6597890123', 'Looking for an executive flat in Tampines, at least 110 sqm, remaining lease > 70 years', 1),
(5, 'Michael Chang', '+6592345678', 'Searching for a 5-room flat in Bedok, near amenities, medium floor, budget 520k', 1),
(6, 'Lisa Wong', '+6593456789', 'Interested in a 3-room flat in Toa Payoh, renovated, near hawker center, max 350k', 1),
(9, 'David Lim', '+6598901234', 'Looking for a 4-room flat in Jurong East, near MRT and shopping malls, budget around 400k', 1),
(10, 'Michelle Tan', '+6599012345', 'Interested in a 5-room flat in Punggol, waterfront view, high floor, budget 550k', 1),
(11, 'Kenneth Ng', '+6590123456', 'Searching for a 3-room flat in Queenstown, older estate, near park, budget 320k', 2),
(12, 'Jessica Teo', '+6591234567', 'Looking for an executive flat in Pasir Ris, near beach, spacious, willing to pay up to 600k', 2),
(13, 'Ryan Goh', '+6592345678', 'Interested in a 4-room flat in Bishan, renovated, ground floor, budget 430k', 2),
(14, 'Alicia Kwan', '+6593456789', 'Searching for a 3-room flat in Ang Mo Kio, high floor, near market, budget 310k', 2),
(15, 'Benjamin Yeo', '+6594567890', 'Looking for a 5-room flat in Tampines, close to schools and parks, budget 520k', 2),
(16, 'Natalie Chua', '+6595678901', 'Interested in an executive flat in Woodlands, near causeway, at least 120 sqm, budget 480k', 2),
(17, 'Wei Ming', '+6596789012', 'Searching for a 4-room flat in Sengkang, pet-friendly community, near LRT, max 420k', 2),
(18, 'Grace Chen', '+6597890123', 'Looking for a 3-room flat in Toa Payoh, central location, near amenities, budget 330k', 2);

-- Reset the sequence to continue after the highest ID
SELECT setval('buyers_id_seq', (SELECT MAX(id) FROM buyers));

-- Insert Properties
INSERT INTO properties (
    id, seller_id, property_type, floor_area_sqm, remaining_lease_years, 
    remaining_lease_months, flat_type, floor_category, town, block, 
    street_name, description, asking_price
) VALUES
(1, 3, 'HDB', 95, 55, 4, '4 ROOM', 'medium', 'BISHAN', '123', 
   'BISHAN STREET 13', 'Well-maintained 4-room flat near Bishan MRT, good ventilation, recently renovated kitchen', 420000),
(2, 7, 'HDB', 67, 60, 7, '3 ROOM', 'low', 'ANG MO KIO', '108', 
   'ANG MO KIO AVE 4', 'Cozy 3-room flat in Ang Mo Kio, walking distance to amenities, well-maintained', 280000),
(3, 8, 'HDB', 110, 72, 2, 'EXECUTIVE', 'high', 'TAMPINES', '456', 
   'TAMPINES STREET 42', 'Spacious executive flat in Tampines with excellent view, near shopping mall and MRT', 580000),
(4, 19, 'HDB', 112, 68, 9, '5 ROOM', 'high', 'BEDOK', '234', 
   'BEDOK NORTH AVENUE 1', 'Large 5-room flat in Bedok with panoramic view, close to amenities and public transport', 510000),
(5, 20, 'HDB', 68, 65, 3, '3 ROOM', 'medium', 'TOA PAYOH', '45', 
   'LORONG 5 TOA PAYOH', 'Newly renovated 3-room flat in Toa Payoh, close to hawker center and MRT station', 340000),
(6, 21, 'HDB', 93, 70, 11, '4 ROOM', 'high', 'JURONG EAST', '301', 
   'JURONG EAST STREET 32', 'Bright and airy 4-room flat in Jurong East, near shopping malls and MRT interchange', 405000),
(7, 22, 'HDB', 110, 85, 4, '5 ROOM', 'high', 'PUNGGOL', '168A', 
   'PUNGGOL FIELD', 'Modern 5-room flat in Punggol with waterfront view, near LRT and Waterway Point', 545000),
(8, 3, 'HDB', 67, 50, 8, '3 ROOM', 'low', 'QUEENSTOWN', '88', 
   'COMMONWEALTH CLOSE', 'Charming 3-room flat in Queenstown, mature estate with convenient access to city', 325000),
(9, 7, 'HDB', 120, 74, 6, 'EXECUTIVE', 'medium', 'PASIR RIS', '510', 
   'PASIR RIS STREET 52', 'Spacious executive flat in Pasir Ris, close to beach and park, family-friendly neighborhood', 590000),
(10, 8, 'HDB', 92, 78, 3, '4 ROOM', 'high', 'SENGKANG', '270B', 
    'SENGKANG CENTRAL', 'Modern 4-room flat in Sengkang with unblocked view, near LRT and shopping mall', 415000);

-- Reset the sequence to continue after the highest ID
SELECT setval('properties_id_seq', (SELECT MAX(id) FROM properties));
