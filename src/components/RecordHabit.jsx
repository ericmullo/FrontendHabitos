import { useEffect, useState } from "react";
import api from "../api/axiosClient";

export default function RecordHabit() {
  const [members, setMembers] = useState([]);
  const [habits, setHabits] = useState([]);

  const [memberId, setMemberId] = useState("");
  const [habitId, setHabitId] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [fecha, setFecha] = useState("");
  const [ok, setOk] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/members/by-family/1").then(r => setMembers(r.data));  
    api.get("/habits").then(r => setHabits(r.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOk("");
    setError("");

    try {
      await api.post("/records", {
        memberId: Number(memberId),
        habitId: Number(habitId),
        cantidadRealizada: Number(cantidad),
        fecha,
      });

      setOk("Registro guardado");
      setCantidad("");
      setFecha("");
    } catch {
      setError("Error al guardar");
    }
  };

  return (
    <div>
      <h2>Registrar Hábito Diario</h2>

      <form onSubmit={handleSubmit}>
        <label>Miembro</label>
        <select value={memberId} onChange={e => setMemberId(e.target.value)}>
          <option value="">Seleccione</option>
          {members.map(m => <option key={m.id} value={m.id}>{m.nombres}</option>)}
        </select>

        <label>Hábito</label>
        <select value={habitId} onChange={e => setHabitId(e.target.value)}>
          <option value="">Seleccione</option>
          {habits.map(h => <option key={h.id} value={h.id}>{h.nombre}</option>)}
        </select>

        <label>Cantidad</label>
        <input value={cantidad} onChange={e => setCantidad(e.target.value)} />

        <label>Fecha</label>
        <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} />

        <button type="submit">Guardar</button>
      </form>

      {ok && <p style={{ color: "green" }}>{ok}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
