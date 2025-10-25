import { useState, useEffect } from "react";

export default function ListaArticulos({ articulos, onSeleccionChange }) {
  const [seleccionados, setSeleccionados] = useState({});

  const manejarSeleccion = (id) => {
    setSeleccionados((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        seleccionado: !prev[id]?.seleccionado,
        cantidad: prev[id]?.cantidad || 1,
      },
    }));
  };

  const manejarCantidad = (id, cantidad) => {
    setSeleccionados((prev) => ({
      ...prev,
      [id]: { ...prev[id], cantidad: parseInt(cantidad) || 1 },
    }));
  };

  useEffect(() => {
    let totalCoste = 0;
    let totalVenta = 0;
    articulos.forEach((art) => {
      const item = seleccionados[art.id];
      if (item?.seleccionado) {
        totalCoste += Number(art.coste) * item.cantidad;
        totalVenta += Number(art.venta) * item.cantidad;
      }
    });
    onSeleccionChange({ coste: totalCoste, venta: totalVenta });
  }, [seleccionados, articulos]);

  if (articulos.length === 0) {
    return <p className="text-center text-muted">No items yet.</p>;
  }

  return (
    <div className="d-flex flex-column gap-3">
      {articulos.map((art) => {
        const item = seleccionados[art.id] || {};
        const seleccionado = item.seleccionado;

        return (
          <div
            key={art.id}
            className={`card shadow-sm border-0 p-3 ${
              seleccionado ? "card-selected" : ""
            }`}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold mb-1">{art.nombre}</h6>
                <div className="small text-muted">
                  Cost {Number(art.coste).toFixed(2)}€ — Sale {Number(art.venta).toFixed(2)}€
                </div>
              </div>
              <input
                type="checkbox"
                checked={!!seleccionado}
                onChange={() => manejarSeleccion(art.id)}
                className="form-check-input checkbox-grande"
              />
            </div>

            {seleccionado && (
              <div className="mt-3 d-flex align-items-center gap-2">
                <label className="small text-muted mb-0">Quantity:</label>
                <input
                  type="number"
                  min="1"
                  value={item.cantidad ?? 1}
                  onChange={(e) => manejarCantidad(art.id, e.target.value)}
                  className="form-control cantidad-input"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
