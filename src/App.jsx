import { useState } from "react";
import MemberForm from "./components/MemberForm";
import CreateHabit from "./components/CreateHabit";
import RecordHabit from "./components/RecordHabit";
import Dashboard from "./components/Dashboard";

function App() {
  const [page, setPage] = useState("members");

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Admin Hábitos Familiares</h1>

      <button onClick={() => setPage("members")}>Miembros</button>
      <button onClick={() => setPage("habits")}>Hábitos</button>
      <button onClick={() => setPage("records")}>Registrar Hábitos</button>
      <button onClick={() => setPage("dashboard")}>Dashboard</button>

      {page === "members" && <MemberForm />}
      {page === "habits" && <CreateHabit />}
      {page === "records" && <RecordHabit />}
      {page === "dashboard" && <Dashboard />}
    </div>
  );
}

export default App;
