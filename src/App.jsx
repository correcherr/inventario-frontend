import { useState, useEffect } from "react";
import ArticuloForm from "./components/ArticuloForm";
import ListaArticulos from "./components/ListaArticulos";

const API_URL = import.meta.env.VITE_API_URL + "/articulos";

export default function App() {
  const [articulos, setArticulos] = useState([]);
  const [totales, setTotales] = useState({ coste: 0, venta: 0 });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const cargarArticulos = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setArticulos(data);
  };

  useEffect(() => {
    cargarArticulos();
  }, []);

  const agregarArticulo = async (articulo) => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(articulo),
    });
    await cargarArticulos();
    setMostrarFormulario(false);
  };

  return (
    <div className="container py-3">
      <h2 className="text-center mb-3 text-info">📦 Inventario</h2>

      <div className="d-grid mb-3">
        <button
          className="btn btn-primary py-2 fw-bold"
          onClick={() => setMostrarFormulario((v) => !v)}
        >
          {mostrarFormulario ? "Cerrar formulario" : "➕ Añadir producto"}
        </button>
      </div>

      {mostrarFormulario && (
        <ArticuloForm onAgregar={agregarArticulo} />
      )}

      <ListaArticulos articulos={articulos} onSeleccionChange={setTotales} />
    <div className="card text-center mt-4 shadow-sm border-0 bg-dark">
      <div className="card-body">
        <h1 className="fw-bold mb-1 neon-title"> Totales seleccionados </h1>          
        <h2 className="fw-bold mb-1 neon-venta"> Venta €{totales.venta.toFixed(2)} </h2>
        <h2 className="fw-bold mb-1 neon-coste"> Coste €{totales.coste.toFixed(2)} </h2>
      </div>
    </div>
    </div>
  );
}
