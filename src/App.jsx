import { useState, useEffect } from "react";
import TablaArticulos from "./components/TablaArticulos";
import ArticuloForm from "./components/ArticuloForm";

const API_URL = import.meta.env.VITE_API_URL + "/articulos";

function App() {
  const [articulos, setArticulos] = useState([]);
  const [totales, setTotales] = useState({ coste: 0, venta: 0 });

  const cargarArticulos = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setArticulos(data);
  };

  useEffect(() => {
    cargarArticulos();
  }, []);

  const actualizarTotales = (nuevoCoste, nuevoVenta) => {
    setTotales({ coste: nuevoCoste, venta: nuevoVenta });
  };

  const agregarArticulo = async (articulo) => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(articulo),
    });
    await cargarArticulos();
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Inventario React</h1>
      <ArticuloForm onAgregar={agregarArticulo} />
      <TablaArticulos articulos={articulos} onActualizarTotales={actualizarTotales} />
      <div className="alert alert-info mt-4">
        <strong>Totales:</strong> Coste €{totales.coste.toFixed(2)} — Venta €{totales.venta.toFixed(2)}
      </div>
    </div>
  );
}

export default App;
