import axios from "axios";
import authHeader from "@/services/auth-header";

const API_URL = process.env.VUE_APP_HERMES;

class ClienteService {
  async getClientes() {
    try {
      let clientes = await axios.get(`${API_URL}/clientes/tablero-clientes`, {
        headers: authHeader(),
      });

      return clientes;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async storageNuevoCliente(nuevoCliente) {
    try {
      let cliente = await axios.post(
        `${API_URL}/clientes/crear-nuevo-cliente`,
        {
          contacto: nuevoCliente.contacto,
          razonSocial: nuevoCliente.razonSocial,
          razonComercial: nuevoCliente.razonComercial,
          telefono: nuevoCliente.telefono,
          direccion: nuevoCliente.direccion,
          otroDato: nuevoCliente.otroDato,
          distrito: nuevoCliente.distrito,
          comprobante: nuevoCliente.comprobante,
          rol: nuevoCliente.rol,
          carga: nuevoCliente.carga,
          pago: nuevoCliente.pago,
          ruc: nuevoCliente.ruc,
          email: nuevoCliente.email,
          tipoEnvio: nuevoCliente.tipoEnvio,
        },
        { headers: authHeader() }
      );

      return cliente;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async getClienteById(id) {
    try {
      let cliente = await axios.get(
        `${API_URL}/clientes/tablero-clientes/${id}`,
        { headers: authHeader() }
      );

      return cliente;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async getPedidosDelCliente(params) {
    try {
      let pedidos = await axios.get(`${API_URL}/clientes/pedidos`, {
        params,
        headers: authHeader(),
      });

      return pedidos;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async getPedidosDelClienteById(id) {
    try {
      let pedidos = await axios.get(
        `${API_URL}/clientes/pedidos-del-cliente/${id}`,
        { headers: authHeader() }
      );

      return pedidos;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async editCliente(id, clienteEditado) {
    try {
      let editarCliente = await axios.put(
        `${API_URL}/clientes/tablero-clientes/${id}`,
        {
          contacto: clienteEditado.contacto,
          razonSocial: clienteEditado.razonSocial,
          razonComercial: clienteEditado.razonComercial,
          telefono: clienteEditado.telefono,
          email: clienteEditado.email,
          ruc: clienteEditado.ruc,
          distrito: clienteEditado.distrito.distrito,
          direccion: clienteEditado.direccion,
          otroDato: clienteEditado.otroDato,
          carga: clienteEditado.carga,
          pago: clienteEditado.pago,
          comprobante: clienteEditado.comprobante,
          rol: clienteEditado.rol,
          tipoEnvio: clienteEditado.tipoEnvio,
        },
        { headers: authHeader() }
      );

      return editarCliente;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async searchCliente(findCliente) {
    try {
      let cliente = await axios.get(`${API_URL}/clientes?q=${findCliente}`, {
        headers: authHeader(),
      });

      return cliente.data;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async getClientesConPedidos(params) {
    try {
      let clientes = await axios.get(`${API_URL}/clientes-con-pedidos`, {
        params,
        headers: authHeader(),
      });

      return clientes;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async getStatsCliente(id) {
    try {
      let clientes = await axios.get(
        `${API_URL}/stats-actuales-cliente/${id}`,
        {
          headers: authHeader(),
        }
      );

      return clientes.data;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async getClientesPorFacturar(params) {
    try {
      let pedidosDelCliente = await axios.get(
        `${API_URL}/clientes-por-facturar`,
        {
          params,
          headers: authHeader(),
        }
      );

      console.log(pedidosDelCliente.data);
      return pedidosDelCliente.data;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }
}

export default new ClienteService();
