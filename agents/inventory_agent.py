from services.predictive import predictive_engine

class InventoryAgent:
    async def analyze(self, directive: str):
        # Sample SKU metrics pulled for analysis
        current_stock = 42
        daily_burn = 10.0
        
        prediction = predictive_engine.calculate_stockout_risk(current_stock, daily_burn)
        demand_forecast = predictive_engine.forecast_demand_7days(daily_burn)

        return {
            "agent": "InventoryAgent",
            "target_sku": "SKU-994",
            "current_stock": current_stock,
            "projected_7day_demand": demand_forecast,
            "predictive_metrics": prediction,
            "finding": f"Critical stockout risk on SKU-994. Stockout predicted in {prediction['days_until_stockout']} days ({prediction['stockout_probability']*100}% probability)."
        }
