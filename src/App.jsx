import { useEffect, useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import ErrorMessage from "./components/ErrorMessage";
import SuccessMessage from "./components/SuccessMessage";
import RadarYouShop from "./components/RadarYouShop";
import { useProducts } from "./hooks/useProducts";
import "./App.css";

function App() {
  const { products, error, success, loading, handleCreate, handleDelete, handleUpdate } = useProducts();
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("radar"); 

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase())
  );

  function handleEdit(product) {
    setEditingProduct(product);
  }

  function handleCancelEdit() {
    setEditingProduct(null);
  }

  useEffect(() => {
    if (success) {
      setEditingProduct(null);
    }
  }, [success]);

  return (
    <div className="app-container" style={{ maxWidth: "960px", margin: "0 auto", padding: "20px" }}>
      
      <header
        style={{
          background: "#13294b",
          color: "#fff",
          padding: "16px 24px",
          borderRadius: "14px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <div style={{ textAlign: "left" }}>
          <h1 style={{ margin: 0, fontSize: "20px", color: "#9ce600" }}>
            YOUSHOP <span style={{ color: "#fff", fontWeight: 400 }}>| Control & AI</span>
          </h1>
          <small style={{ color: "#cbd5e1" }}>Protótipo — Desafio de Inovação 2027</small>
        </div>

        <nav style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setActiveTab("radar")}
            style={{
              background: activeTab === "radar" ? "#9ce600" : "rgba(255,255,255,0.1)",
              color: activeTab === "radar" ? "#13294b" : "#fff",
              border: "none",
              padding: "8px 14px",
              borderRadius: "8px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            ⚡ Radar Preditivo IA
          </button>

          <button
            onClick={() => setActiveTab("stock")}
            style={{
              background: activeTab === "stock" ? "#9ce600" : "rgba(255,255,255,0.1)",
              color: activeTab === "stock" ? "#13294b" : "#fff",
              border: "none",
              padding: "8px 14px",
              borderRadius: "8px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            📦 Base de Produtos (API)
          </button>
        </nav>
      </header>

      {activeTab === "radar" ? (
        <RadarYouShop products={products} loading={loading} />
      ) : (
        <>
          {loading && <p className="loading">Carregando dados da API...</p>}
          <ErrorMessage message={error?.general} />
          <SuccessMessage message={success} />

          <ProductForm
            onCreate={handleCreate}
            editingProduct={editingProduct}
            onUpdate={handleUpdate}
            onCancelEdit={handleCancelEdit}
            loading={loading}
            error={error}
            success={success}
          />

          <input
            className="search-input"
            placeholder="Buscar produto na base... 🔎"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <ProductList
            products={filteredProducts}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </>
      )}
    </div>
  );
}

export default App;