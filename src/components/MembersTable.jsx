// src/components/MembersTable.jsx
import { useEffect, useState } from "react";
import api from "../api/axiosClient";

export default function MembersTable({ reloadToken = 0, familyId }) {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (!familyId) return;

    api
      .get(`/members/by-family/${familyId}`)
      .then((r) => setMembers(r.data))
      .catch((err) =>
        console.error("Error cargando miembros por familia", err)
      );
  }, [reloadToken, familyId]);

  return (
    <div className="side-card">
      <h2>Miembros registrados</h2>
      {members.length === 0 ? (
        <p>No hay miembros registrados aún.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cédula</th>
              <th>Familia</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id}>
                <td>{m.nombres}</td>
                <td>{m.cedula}</td>
                <td>{m.family?.nombre || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
