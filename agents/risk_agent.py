class RiskAgent:
    async def analyze(self, directive: str):
        return {
            "agent": "RiskAgent",
            "threat_level": "MODERATE",
            "finding": "Inventory exhaustion on SKU-994 presents an estimated revenue risk of ₹2.4 Lakh."
        }
