import axios from "axios";
import authHeader from "@/services/auth-header";

const API_URL = process.env.VUE_APP_HERMES;

class PedidoService {
  async getPedidosPorFecha(params) {
    try {
      let pedidos = await axios.get(`${API_URL}/pedidos/tablero-pedidos`, {
        params,
        headers: authHeader(),
      });

      return pedidos;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async createRuteo() {
    try {
      let ruteo = await axios.post(
        `${API_URL}/pedidos/nueva-ruta`,
        {},
        {
          headers: authHeader(),
        }
      );
      const { id } = ruteo.data;

      return id;
    } catch (error) {
      console.error(`Error al crear Ruteo: ${error.message}`);
    }
  }

  async storageNuevoPedido(nuevoPedido) {
    try {
      let pedido = await axios.post(
        `${API_URL}/pedidos/crear-nuevo-pedido`,
        {
          fecha: nuevoPedido.fecha,
          contactoRemitente: nuevoPedido.contactoRemitente,
          empresaRemitente: nuevoPedido.empresaRemitente,
          direccionRemitente: nuevoPedido.direccionRemitente,
          distritoRemitente: nuevoPedido.distritoRemitente,
          telefonoRemitente: nuevoPedido.telefonoRemitente,
          otroDatoRemitente: nuevoPedido.otroDatoRemitente,
          contactoConsignado: nuevoPedido.contactoConsignado,
          empresaConsignado: nuevoPedido.empresaConsignado,
          direccionConsignado: nuevoPedido.direccionConsignado,
          telefonoConsignado: nuevoPedido.telefonoConsignado,
          otroDatoConsignado: nuevoPedido.otroDatoConsignado,
          tipoCarga: nuevoPedido.tipoCarga,
          formaPago: nuevoPedido.formaPago,
          tarifa: nuevoPedido.tarifa,
          tarifaSugerida: nuevoPedido.tarifaSugerida,
          recaudo: nuevoPedido.recaudo,
          tramite: nuevoPedido.tramite,
          comision: nuevoPedido.comision,
          distancia: nuevoPedido.distancia,
          CO2Ahorrado: nuevoPedido.CO2Ahorrado,
          ruido: nuevoPedido.ruido,
          status: nuevoPedido.status,
          distritoConsignado: nuevoPedido.distritoConsignado,
          mobiker: nuevoPedido.mobiker,
          tipoEnvio: nuevoPedido.tipoEnvio,
          modalidad: nuevoPedido.modalidad,
          rolCliente: nuevoPedido.rolCliente,
          operador: nuevoPedido.operador,
          viajes: nuevoPedido.viajes,
          isRuteo: nuevoPedido.isRuteo,
          ruteo: nuevoPedido.ruteo,
        },
        { headers: authHeader() }
      );

      return pedido;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async getPedidoById(id) {
    try {
      let pedido = await axios.get(`${API_URL}/pedidos/tablero-pedidos/${id}`, {
        headers: authHeader(),
      });

      return pedido;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async editPedido(id, editarPedido) {
    try {
      let pedidoEditado = await axios.put(
        `${API_URL}/pedidos/tablero-pedidos/${id}`,
        {
          fecha: editarPedido.fecha,
          contactoRemitente: editarPedido.contactoRemitente,
          empresaRemitente: editarPedido.empresaRemitente,
          direccionRemitente: editarPedido.direccionRemitente,
          distritoRemitente: editarPedido.distritoRemitente,
          telefonoRemitente: editarPedido.telefonoRemitente,
          otroDatoRemitente: editarPedido.otroDatoRemitente,
          contactoConsignado: editarPedido.contactoConsignado,
          empresaConsignado: editarPedido.empresaConsignado,
          direccionConsignado: editarPedido.direccionConsignado,
          telefonoConsignado: editarPedido.telefonoConsignado,
          otroDatoConsignado: editarPedido.otroDatoConsignado,
          tipoCarga: editarPedido.tipoCarga,
          formaPago: editarPedido.formaPago,
          tarifa: editarPedido.tarifa,
          tarifaSugerida: editarPedido.tarifaSugerida,
          recaudo: editarPedido.recaudo,
          tramite: editarPedido.tramite,
          comision: editarPedido.comision,
          distancia: editarPedido.distancia,
          CO2Ahorrado: editarPedido.CO2Ahorrado,
          ruido: editarPedido.ruido,
          status: editarPedido.statusId,
          distritoConsignado: editarPedido.distritoConsignado,
          mobiker: editarPedido.mobiker.fullName,
          tipoEnvio: editarPedido.tipoDeEnvio.tipo,
          modalidad: editarPedido.modalidad.tipo,
          rolCliente: editarPedido.rolCliente,
          operador: editarPedido.operador,
          viajes: editarPedido.viajes,
          isRuteo: editarPedido.isRuteo,
          ruteoId: editarPedido.ruteo,
        },
        { headers: authHeader() }
      );

      return pedidoEditado;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async searchPedido(findPedido) {
    try {
      let pedido = await axios.get(`${API_URL}/pedidos?q=${findPedido}`, {
        headers: authHeader(),
      });

      return pedido;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async searchPedidoProgramado(params) {
    try {
      let pedido = await axios.get(`${API_URL}/pedidos-programados`, {
        params,
        headers: authHeader(),
      });

      return pedido;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async asignarPedido(id, pedidoAsignado) {
    try {
      let pedidoEditado = await axios.put(
        `${API_URL}/pedidos-programados/${id}`,
        {
          status: pedidoAsignado.statusId,
          mobiker: pedidoAsignado.mobiker,
          comision: pedidoAsignado.comision,
        },
        { headers: authHeader() }
      );

      return pedidoEditado;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async cambiarEstadoPedido(id, pedidoCambiado) {
    try {
      let pedidoEditado = await axios.put(
        `${API_URL}/pedidos/cambiar-estado/${id}`,
        pedidoCambiado,
        { headers: authHeader() }
      );

      return pedidoEditado;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async historialPedidos(params) {
    try {
      let pedido = await axios.get(`${API_URL}/historial-pedidos`, {
        params,
        headers: authHeader(),
      });

      return pedido;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async getPedidosTransferencia(params) {
    try {
      let pedido = await axios.get(`${API_URL}/pedidos-transferencia`, {
        params,
        headers: authHeader(),
      });

      return pedido;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async getPedidosRecaudo(params) {
    try {
      let pedido = await axios.get(`${API_URL}/pedidos-recaudo`, {
        params,
        headers: authHeader(),
      });

      return pedido;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async getRuteos(params) {
    try {
      let pedido = await axios.get(`${API_URL}/ruteos-pedidos`, {
        params,
        headers: authHeader(),
      });

      return pedido;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async getRuteoById(id) {
    try {
      let ruteo = await axios.get(`${API_URL}/ruteo/${id}`, {
        headers: authHeader(),
      });

      return ruteo;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }

  async procesarCSV(file) {
    try {
      let result = await axios.post(`${API_URL}/procesar-csv`, file, {
        headers: authHeader(),
        "Content-Type": "multipart/form-data",
      });

      return result;
    } catch (error) {
      console.error(`Mensaje de error desde MobikerService: ${error.message}`);
    }
  }
}

export default new PedidoService();
