import axios from "axios";
import authHeader from "@/services/auth-header";

const API_URL = process.env.VUE_APP_HERMES;

class MobikerService {
  async getMobikers() {
    try {
      let mobikers = await axios.get(`${API_URL}/mobikers/equipo-mobiker`, {
        headers: authHeader(),
      });

      return mobikers.data;
    } catch (error) {
      console.error(`Mensaje de error desde MobikerService: ${error.message}`);
    }
  }

  async filterMobikers(status) {
    try {
      let mobikers = await axios.get(
        `${API_URL}/mobikers/filter-mobiker?status=${status}`,
        {
          headers: authHeader(),
        }
      );

      return mobikers.data;
    } catch (error) {
      console.error(`Mensaje de error desde MobikerService: ${error.message}`);
    }
  }

  async storageNuevoMobiker(nuevoMobiker) {
    try {
      let mobiker = await axios.post(
        `${API_URL}/mobikers/crear-nuevo-mobiker`,
        {
          nombres: nuevoMobiker.nombres,
          apellidos: nuevoMobiker.apellidos,
          telefono: nuevoMobiker.telefono,
          telegram: nuevoMobiker.telegram,
          direccion: nuevoMobiker.direccion,
          distrito: nuevoMobiker.distrito,
          tipoDocumento: nuevoMobiker.tipoDocumento,
          numeroDocumento: nuevoMobiker.numeroDocumento,
          email: nuevoMobiker.email,
          genero: nuevoMobiker.genero,
          banco: nuevoMobiker.banco,
          tipoCuenta: nuevoMobiker.tipoCuenta,
          numeroCuentaBancaria: nuevoMobiker.numeroCuentaBancaria,
          equipo: nuevoMobiker.equipo,
          tipoBicicleta: nuevoMobiker.tipoBicicleta,
          fechaNacimiento: nuevoMobiker.fechaNacimiento,
          fechaIngreso: nuevoMobiker.fechaIngreso,
          status: nuevoMobiker.status,
          rango: nuevoMobiker.rango,
        },
        {
          headers: authHeader(),
        }
      );

      return mobiker;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async getMobikerById(id) {
    try {
      let mobiker = await axios.get(
        `${API_URL}/mobikers/equipo-mobiker/${id}`,
        {
          headers: authHeader(),
        }
      );

      return mobiker;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async getPedidosDelMobiker(params) {
    try {
      let pedidos = await axios.get(`${API_URL}/mobikers/pedidos`, {
        params,
        headers: authHeader(),
      });

      return pedidos;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async getPedidosDelMobikerById(id) {
    try {
      let pedidos = await axios.get(
        `${API_URL}/mobikers/pedidos-del-mobiker/${id}`,
        {
          headers: authHeader(),
        }
      );

      return pedidos;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async getCantidadPedidos(params) {
    try {
      let cantidadPedidos = await axios.get(
        `${API_URL}/mobikers/cantidad-pedidos`,
        {
          params,
          headers: authHeader(),
        }
      );

      return cantidadPedidos;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async editMobiker(id, editarMobiker) {
    try {
      let mobikerEditado = await axios.put(
        `${API_URL}/mobikers/equipo-mobiker/${id}`,
        {
          nombres: editarMobiker.nombres,
          apellidos: editarMobiker.apellidos,
          telefono: editarMobiker.telefono,
          telegram: editarMobiker.telegram,
          direccion: editarMobiker.direccion,
          distrito: editarMobiker.distrito.distrito,
          tipoDocumento: editarMobiker.tipoDocumento,
          numeroDocumento: editarMobiker.numeroDocumento,
          email: editarMobiker.email,
          genero: editarMobiker.genero,
          banco: editarMobiker.banco,
          tipoCuenta: editarMobiker.tipoCuenta,
          numeroCuentaBancaria: editarMobiker.numeroCuentaBancaria,
          equipo: editarMobiker.equipo,
          tipoBicicleta: editarMobiker.tipoBicicleta,
          fechaNacimiento: editarMobiker.fechaNacimiento,
          fechaIngreso: editarMobiker.fechaIngreso,
          status: editarMobiker.status,
          rango: editarMobiker.rango,
        },
        {
          headers: authHeader(),
        }
      );

      return mobikerEditado;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async searchMobiker(findMobiker) {
    try {
      let mobiker = await axios.get(`${API_URL}/mobikers?q=${findMobiker}`, {
        headers: authHeader(),
      });

      return mobiker.data;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async getMobikersConPedidos(params) {
    try {
      let mobikers = await axios.get(`${API_URL}/mobikers-con-pedidos`, {
        params,
        headers: authHeader(),
      });

      return mobikers;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async getContadorMobikers() {
    try {
      let mobikers = await axios.get(`${API_URL}/contar-mobikers`, {
        headers: authHeader(),
      });

      return mobikers.data;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }
}

export default new MobikerService();
