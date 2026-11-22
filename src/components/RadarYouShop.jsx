import { useRef, useState } from "react";
import "./RadarYouShop.css";

const FALLBACK_PRODUCTS = [
  { id: "demo-1", name: "Sérum Facial Vitamina C 30ml", quantity: 18, price: 89.90 },
  { id: "demo-2", name: "Whey Protein Isolado 900g", quantity: 42, price: 149.90 },
  { id: "demo-3", name: "Kit Cronograma Capilar", quantity: 9, price: 119.00 },
];

export default function RadarYouShop({ products, loading }) {
  const [simulatedSpikes, setSimulatedSpikes] = useState({});
  const [selectedAlert, setSelectedAlert] = useState(null);
  const aiBoxRef = useRef(null);

  const activeProducts = products && products.length > 0 ? products : FALLBACK_PRODUCTS;
  const isUsingFallback = !products || products.length === 0;

  function handleSimulateSpike(product) {
    const newClicksPerHour = Math.floor(Math.random() * (1800 - 950 + 1)) + 950;
    const projected24hSales = Math.round(newClicksPerHour * 0.035 * 12);
    const creatorName = "@creator_youshop";

    setSimulatedSpikes((prev) => ({
      ...prev,
      [product.id]: {
        clicksPerHour: newClicksPerHour,
        projectedSales: projected24hSales,
        creatorName,
      },
    }));

    setSelectedAlert({
      product,
      clicksPerHour: newClicksPerHour,
      projectedSales: projected24hSales,
      creatorName,
    });

    setTimeout(() => {
      aiBoxRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 100);
  }

  function handleReset(id) {
    setSimulatedSpikes((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
    if (selectedAlert?.product?.id === id) {
      setSelectedAlert(null);
    }
  }

  return (
    <div className="radar-container">
      <div className="radar-header">
        <div>
          <span className="radar-badge">INTELIGÊNCIA OPERACIONAL & ESTOQUE</span>
          <h2>Radar Preditivo de Ruptura</h2>
          <p>
            Monitoramento em tempo real cruzando velocidade de cliques nos links de{" "}
            <strong>Creators</strong> com o saldo físico em estoque.
          </p>
        </div>

        <div className="sync-status">
          <span className={`status-dot ${loading ? "syncing" : "online"}`}></span>
          {loading
            ? "Sincronizando base de estoque..."
            : isUsingFallback
            ? "Base de Demonstração Ativa"
            : `Estoque Sincronizado (${products.length} SKUs)`}
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <span className="kpi-label">Produtos Monitorados</span>
          <strong className="kpi-value">{activeProducts.length}</strong>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Picos de Viralização Ativos</span>
          <strong className="kpi-value highlight">
            {Object.keys(simulatedSpikes).length}
          </strong>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Chargebacks Evitados (Est.)</span>
          <strong className="kpi-value">
            {Object.keys(simulatedSpikes).length * 14} pedidos
          </strong>
        </div>
      </div>

      <div className="radar-table-wrapper">
        <table className="radar-table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Estoque Atual</th>
              <th>Tráfego Creators</th>
              <th>Demanda (24h)</th>
              <th>Status IA</th>
              <th>Simulação</th>
            </tr>
          </thead>
          <tbody>
            {activeProducts.map((product) => {
              const spike = simulatedSpikes[product.id];
              const clicks = spike ? spike.clicksPerHour : 45;
              const projected = spike ? spike.projectedSales : 4;
              const stock = Number(product.quantity ?? product.stock ?? 0);
              const isCritical = stock < projected;

              return (
                <tr key={product.id} className={isCritical ? "row-critical" : ""}>
                  <td>
                    <strong>{product.name}</strong>
                    {spike && (
                      <div className="creator-tag">
                        🔥 Pico gerado por {spike.creatorName}
                      </div>
                    )}
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>{stock} un.</td>
                  <td style={{ whiteSpace: "nowrap" }}>{clicks} cliques/h</td>
                  <td style={{ whiteSpace: "nowrap" }}>~{projected} un.</td>
                  <td>
                    <span
                      className={`pill ${isCritical ? "pill-danger" : "pill-ok"}`}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {isCritical ? "⚠ Risco de Ruptura" : "✓ Estoque Saudável"}
                    </span>
                  </td>
                  <td>
                    {!spike ? (
                      <button
                        className="btn-simulate"
                        style={{ whiteSpace: "nowrap" }}
                        onClick={() => handleSimulateSpike(product)}
                      >
                        ⚡ Simular Pico
                      </button>
                    ) : (
                      <div className="action-group">
                        <button
                          className="btn-view-ai"
                          style={{ whiteSpace: "nowrap" }}
                          onClick={() => {
                            setSelectedAlert({
                              product,
                              clicksPerHour: spike.clicksPerHour,
                              projectedSales: spike.projectedSales,
                              creatorName: spike.creatorName,
                            });
                            aiBoxRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                          }}
                        >
                          Ver Ação IA
                        </button>
                        <button
                          className="btn-reset"
                          style={{ whiteSpace: "nowrap" }}
                          onClick={() => handleReset(product.id)}
                        >
                          Resetar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedAlert && (
        <div className="ai-copilot-box" ref={aiBoxRef}>
          <div className="ai-copilot-header">
            <h3>🤖 Diagnóstico & Ações Recomendadas pela IA</h3>
            <button className="close-btn" onClick={() => setSelectedAlert(null)}>
              ✕
            </button>
          </div>

          <p className="ai-summary">
            O link de <strong>{selectedAlert.creatorName}</strong> levou o produto{" "}
            <strong>{selectedAlert.product.name}</strong> a{" "}
            <strong>{selectedAlert.clicksPerHour} cliques/hora</strong>. A projeção de{" "}
            <strong>{selectedAlert.projectedSales} vendas</strong> nas próximas 24h supera o
            saldo atual de{" "}
            <strong>
              {selectedAlert.product.quantity ?? selectedAlert.product.stock ?? 0} unidades
            </strong>
            .
          </p>

          <div className="ai-actions-grid">
            <div className="ai-action-card">
              <h4>1. Trava Preventiva de Links (Operações)</h4>
              <p>
                Pausar temporariamente a geração de novos links de afiliação para este SKU e
                notificar o produtor para reposição imediata antes de zerar o estoque.
              </p>
              <span className="ai-tag">Evita venda sem lastro</span>
            </div>

            <div className="ai-action-card">
              <h4>2. Mensagem Proativa ao Comprador (CX)</h4>
              <p className="quote-msg">
                "Oi! Vimos que seu pedido de <strong>{selectedAlert.product.name}</strong> teve
                alta procura hoje. Já reservamos o seu item e o envio ocorrerá em até 48h úteis
                com rastreio prioritário!"
              </p>
              <span className="ai-tag">Reduz tickets e chargebacks</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}