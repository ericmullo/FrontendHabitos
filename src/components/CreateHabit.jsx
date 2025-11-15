import { useState } from "react";
import api from "../api/axiosClient";
import "../styles/global.css";

export default function CreateHabit() {
  const [nombre, setNombre] = useState("");
  const [unidad, setUnidad] = useState("");
  const [metaDiaria, setMetaDiaria] = useState("");
  const [ok, setOk] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOk("");

    try {
      await api.post("/habits", {
        nombre,
        unidad,
        metaDiaria: Number(metaDiaria),
      });

      setOk("Hábito creado correctamente");
      setNombre("");
      setUnidad("");
      setMetaDiaria("");
    } catch {
      setError("Error al crear hábito");
    }
  };

  return (
    <div className="card">
      <h2>Crear Hábito</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} />

        <label>Unidad</label>
        <input value={unidad} onChange={(e) => setUnidad(e.target.value)} />

        <label>Meta Diaria</label>
        <input value={metaDiaria} onChange={(e) => setMetaDiaria(e.target.value)} />

        <button type="submit">Guardar</button>
      </form>

      {ok && <p className="success">{ok}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
