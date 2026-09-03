import chromadb

class VectorEngine:
    def __init__(self):
        self.client = chromadb.Client()
        self.collection = self.client.get_or_create_collection(name="enterprise_knowledge")
        self._seed_data()

    def _seed_data(self):
        if self.collection.count() == 0:
            self.collection.add(
                documents=[
                    "SKU-994 current stock level is 42 units. Average daily consumption is 10 units. Stockout expected in 4 days.",
                    "Q3 revenue target is ₹50 Lakhs. Current realized revenue is ₹41.2 Lakhs.",
                    "Supplier lead time for electronic components is currently 12 days."
                ],
                metadatas=[{"source": "inventory"}, {"source": "finance"}, {"source": "supply_chain"}],
                ids=["doc1", "doc2", "doc3"]
            )

    def query(self, query_text: str, n_results: int = 2):
        results = self.collection.query(
            query_texts=[query_text],
            n_results=n_results
        )
        return results["documents"][0] if results["documents"] else []

vector_engine = VectorEngine()
