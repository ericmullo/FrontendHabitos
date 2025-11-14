import { useState } from "react";
import api from "../api/axiosClient";
import FamilySelect from "./FamilySelect";

export default function MemberForm() {
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
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Error inesperado al crear el miembro");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar Miembro</h2>

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
        <label>Fecha de Nacimiento</label>
        <input
          type="date"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Familia</label>
        <FamilySelect value={familyId} onChange={setFamilyId} />
      </div>

      <button type="submit">Guardar</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {ok && <p style={{ color: "green" }}>{ok}</p>}
    </form>
  );
}
