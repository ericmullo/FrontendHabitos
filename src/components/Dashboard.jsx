import { useEffect, useState } from "react";
import api from "../api/axiosClient";
import "../styles/global.css";

export default function Dashboard({ familyId }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (!familyId) return;

    api
      .get(`/records/by-family/${familyId}`)
      .then((r) => setRecords(r.data));
  }, [familyId]);

  return (
    <>
      <h2>Dashboard Familiar</h2>

      {records.map((r) => (
        <div key={r.id} className="record-card">
          <strong>{r.member.nombres}</strong> — {r.habit.nombre}
          <br />
          Realizado: {r.cantidadRealizada} {r.habit.unidad}
          <br />
          Cumplimiento: {r.porcentajeCumplimiento.toFixed(0)}%
        </div>
      ))}
    </>
  );
}
