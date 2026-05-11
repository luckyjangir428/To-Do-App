import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function AppContent() {
  const { token } = useAuth();
  const [page, setPage] = useState("login");

  if (token) return <Dashboard />;

  if (page === "register") {
    return <Register onSwitch={() => setPage("login")} />;
  }

  return <Login onSwitch={() => setPage("register")} />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
