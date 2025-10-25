import { useState } from "react";

export default function ArticuloForm({ onAgregar }) {
  const [nombre, setNombre] = useState("");
  const [coste, setCoste] = useState("");
  const [venta, setVenta] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAgregar({ nombre, coste: parseFloat(coste), venta: parseFloat(venta) });
    setNombre(""); setCoste(""); setVenta("");
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-4 shadow-sm bg-light border-0">
      <div className="row g-3">
        <div className="col-md-4"><input type="text" className="form-control" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required /></div>
        <div className="col-md-3"><input type="number" step="0.01" className="form-control" placeholder="Coste (€)" value={coste} onChange={(e) => setCoste(e.target.value)} required /></div>
        <div className="col-md-3"><input type="number" step="0.01" className="form-control" placeholder="Venta (€)" value={venta} onChange={(e) => setVenta(e.target.value)} required /></div>
        <div className="col-md-2"><button className="btn btn-primary w-100">Añadir</button></div>
      </div>
    </form>
  );
}
