import { useState } from "react";

export default function TablaArticulos({ articulos, onActualizarTotales }) {
  const [cantidades, setCantidades] = useState({});

  const handleCantidadChange = (id, valor) => {
    setCantidades({ ...cantidades, [id]: parseFloat(valor) || 0 });
  };

  const recalcularTotales = () => {
    let totalCoste = 0;
    let totalVenta = 0;
    articulos.forEach((art) => {
      const cant = cantidades[art.id] || 0;
      totalCoste += Number(art.coste) * cant;
      totalVenta += Number(art.venta) * cant;
    });
    onActualizarTotales(totalCoste, totalVenta);
  };

  return (
    <table className="table table-bordered table-striped">
      <thead className="table-dark">
        <tr>
          <th>Nombre</th><th>Coste (€)</th><th>Venta (€)</th><th>Cantidad</th><th>Seleccionar</th>
        </tr>
      </thead>
      <tbody>
        {articulos.map((art) => (
          <tr key={art.id}>
            <td>{art.nombre}</td>
            <td>{Number(art.coste).toFixed(2)}</td>
            <td>{Number(art.venta).toFixed(2)}</td>
            <td><input type="number" min="0" className="form-control" value={cantidades[art.id] ?? ""} onChange={(e) => handleCantidadChange(art.id, e.target.value)} /></td>
            <td><button className="btn btn-success btn-sm" onClick={recalcularTotales}>✓</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
