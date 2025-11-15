import { useEffect, useState } from "react";
import api from "../api/axiosClient";

export default function RecordsTable({ reloadToken = 0, familyId }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (!familyId) {
      setRecords([]);
      return;
    }

    api
      .get(`/records/by-family/${familyId}`)
      .then((r) => setRecords(r.data))
      .catch((err) =>
        console.error("Error cargando registros por familia", err)
      );
  }, [reloadToken, familyId]);

  return (
    <div className="side-card">
      <h2>Registros recientes</h2>
      {records.length === 0 ? (
        <p>No hay registros todavía.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Miembro</th>
              <th>Hábito</th>
              <th>Cant.</th>
              <th>% Cumpl.</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id}>
                <td>{r.fecha}</td>
                <td>{r.member.nombres}</td>
                <td>{r.habit.nombre}</td>
                <td>
                  {r.cantidadRealizada} {r.habit.unidad}
                </td>
                <td>{r.porcentajeCumplimiento.toFixed(0)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
