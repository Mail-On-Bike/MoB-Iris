import axios from "axios";
import authHeader from "@/services/auth-header";

const API_URL = process.env.VUE_APP_HERMES;
class AuthService {
  async login(user) {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username: user.username,
        password: user.password,
      });

      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));

        return response.data;
      }
    } catch (error) {
      console.error(`Error al iniciar sesión: ${error.message}`);
    }
  }

  logout() {
    // Eliminar Tablas Principales
    localStorage.removeItem("user");
    localStorage.removeItem("clientes");
    localStorage.removeItem("mobikers");
    localStorage.removeItem("destinos");

    // Eliminar Tablas Auxiliares
    localStorage.removeItem("rolesUsuarios");
    localStorage.removeItem("distritos");
    localStorage.removeItem("tiposDeCarga");
    localStorage.removeItem("tiposDeComprobante");
    localStorage.removeItem("tiposDeEnvio");
    localStorage.removeItem("formasDePago");
    localStorage.removeItem("modalidades");
    localStorage.removeItem("rangosMoBiker");
    localStorage.removeItem("rolCliente");
    localStorage.removeItem("entidadesBancarias");
    localStorage.removeItem("statusDelPedido");
  }

  async register(user) {
    try {
      const response = await axios.post(
        `${API_URL}/registro`,
        {
          fullName: user.fullName,
          username: user.username,
          email: user.email,
          empresa: user.empresa,
          password: user.password,
          roles: user.roles,
        },
        { headers: authHeader() }
      );

      return response.data;
    } catch (error) {
      console.error(`Error al registrar nuevo usuario: ${error.message}`);
    }
  }

  async changePassword() {
    try {
      let css;
      console.log(css);
    } catch (error) {
      console.error(
        `Error al obtener los miembros del Equipo Admin: ${error.message}`
      );
    }
  }

  async restartPassword(id) {
    try {
      let restablecer = await axios.post(
        `${API_URL}/reset-password/${id}`,
        {},
        {
          headers: authHeader(),
        }
      );

      return restablecer;
    } catch (error) {
      console.error(
        `Error al obtener los miembros del Equipo Admin: ${error.message}`
      );
    }
  }

  async getEquipoAdmin() {
    try {
      const response = await axios.get(`${API_URL}/equipo-admin`, {
        headers: authHeader(),
      });

      return response.data;
    } catch (error) {
      console.error(
        `Error al obtener los miembros del Equipo Admin: ${error.message}`
      );
    }
  }
}

export default new AuthService();
