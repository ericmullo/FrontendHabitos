import { useEffect, useState } from "react";
import api from "../api/axiosClient";
import "../styles/global.css";

export default function Dashboard() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.get("/records/by-family/1")
      .then(r => setRecords(r.data));
  }, []);

  return (
    <div className="card" style={{ maxWidth: "700px" }}>
      <h2>Dashboard Familiar</h2>

      {records.map(r => (
        <div key={r.id} className="record-card">
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
