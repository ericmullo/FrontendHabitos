import { useEffect, useState } from "react";
import api from "../api/axiosClient";

export default function Dashboard() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.get("/records/by-family/1")
      .then(r => setRecords(r.data));
  }, []);

  return (
    <div>
      <h2>Dashboard Familiar</h2>

      {records.map(r => (
        <div key={r.id} style={{ marginBottom: "1rem" }}>
          <strong>{r.member.nombres}</strong> — {r.habit.nombre}  
          <br />
          Realizado: {r.cantidadRealizada} {r.habit.unidad}
          <br />
          Cumplimiento: {r.porcentajeCumplimiento.toFixed(0)}%
        </div>
      ))}
    </div>
  );
}
