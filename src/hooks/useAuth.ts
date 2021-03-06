import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";

export default function useAuth() {
  const { usuario, verificarTempoRestante, logout } = useContext(AuthContext);
  const logado = !!usuario && !!usuario._id;
  const token = `Bearer ${usuario && usuario.token}`;

  return {
    usuario,
    token,
    logado,
    verificarTempoRestante,
    logout,
  }
}