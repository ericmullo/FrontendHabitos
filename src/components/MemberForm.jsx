// src/components/MemberForm.jsx
import { useState } from "react";
import api from "../api/axiosClient";
import FamilySelect from "./FamilySelect";

export default function MemberForm({ onCreated }) {
  const [nombres, setNombres] = useState("");
  const [cedula, setCedula] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [familyId, setFamilyId] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOk("");

    try {
      const body = {
        nombres,
        cedula,
        fechaNacimiento,
        familyId: familyId ? Number(familyId) : null,
      };

      const res = await api.post("/members", body);
      setOk("Miembro creado correctamente: " + res.data.nombres);
      setNombres("");
      setCedula("");
      setFechaNacimiento("");
      setFamilyId("");

      if (onCreated) onCreated();
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Error inesperado al crear el miembro");
      }
    }
  };

  return (
    <>
      <h2>Registrar Miembro</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombres</label>
          <input
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Cédula (validada en back)</label>
          <input
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Fecha de nacimiento</label>
          <input
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Familia</label>
          {/* 👇 AQUÍ NO QUEREMOS AGREGAR FAMILIA */}
          <FamilySelect value={familyId} onChange={setFamilyId} />
        </div>

        <button type="submit">Guardar</button>

        {error && <p className="error">{error}</p>}
        {ok && <p className="success">{ok}</p>}
      </form>
    </>
  );
}
