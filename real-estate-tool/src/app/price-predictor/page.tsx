import HousingPricePredictor from "~/components/housing-price-predictor"

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
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-lg font-semibold">About the Predictor</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                This tool uses a regression model to predict housing prices based on various factors including floor
                area, remaining lease, flat type, and floor level. The predictions are estimates and actual prices may
                vary.
              </p>
              <h4 className="mt-4 font-medium">How it works:</h4>
              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                <li>Enter all required property details</li>
                <li>Our model analyzes the inputs</li>
                <li>Get an estimated market value</li>
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                Use this tool to help clients understand potential property values or to assist in pricing strategies.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

