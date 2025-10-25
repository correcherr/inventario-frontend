import { useState } from "react";

export default function ArticuloForm({ onAgregar }) {
  const [nombre, setNombre] = useState("");
  const [coste, setCoste] = useState("");
  const [venta, setVenta] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAgregar({
      nombre,
      coste: parseFloat(coste),
      venta: parseFloat(venta),
    });
    setNombre("");
    setCoste("");
    setVenta("");
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-4 shadow-sm border-0">
      <h5 className="mb-3 text-center neon-title">Add new item</h5>

      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. Pencil"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Cost (€)</label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          placeholder="e.g. 0.50"
          value={coste}
          onChange={(e) => setCoste(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Sale price (€)</label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          placeholder="e.g. 1.20"
          value={venta}
          onChange={(e) => setVenta(e.target.value)}
          required
        />
      </div>

      <button className="btn btn-primary w-100 py-2 fw-bold">
        Save item
      </button>
    </form>
  );
}
