import HousingPricePredictor from "~/components/housing-price-predictor";

export default function PricePredictorPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Housing Price Predictor</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-2">
            <HousingPricePredictor />
          </div>
          <div>
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold">About the Predictor</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                This tool uses a regression model to predict housing prices
                based on various factors including floor area, remaining lease,
                flat type, and floor level. The predictions are estimates and
                actual prices may vary.
              </p>
              <h4 className="mt-4 font-medium">How it works:</h4>
              <ul className="text-muted-foreground mt-2 list-disc pl-5 text-sm">
                <li>Enter all required property details</li>
                <li>Our model analyzes the inputs</li>
                <li>Get an estimated market value</li>
              </ul>
              <p className="text-muted-foreground mt-4 text-sm">
                Use this tool to help clients understand potential property
                values or to assist in pricing strategies.
              </p>
              {/* <p className="mt-4 text-sm text-red-500">
                Disclaimer: This model only accounts for 70% of the variation in
                price. There might be other factors like location that might not
                be accounted for in this model.
              </p> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
