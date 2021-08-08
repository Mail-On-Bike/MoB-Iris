import axios from "axios";
import authHeader from "@/services/auth-header";

const API_URL = process.env.VUE_APP_HERMES;

class DestinoService {
  async getDestinos() {
    try {
      let destinos = await axios.get(`${API_URL}/destinos-recurrentes`, {
        headers: authHeader(),
      });

      return destinos;
    } catch (error) {
      console.error(`Error al obtener todos los Destinos ${error.message}`);
    }
  }

  async storageDestino(nuevoDestino) {
    try {
      let destino = await axios.post(
        `${API_URL}/crear-destino-recurrente`,
        {
          contacto: nuevoDestino.contacto,
          empresa: nuevoDestino.empresa,
          telefono: nuevoDestino.telefono,
          direccion: nuevoDestino.direccion,
          distrito: nuevoDestino.distrito,
          otroDato: nuevoDestino.otroDato,
        },
        {
          headers: authHeader(),
        }
      );

      return destino;
    } catch (error) {
      console.error(
        `Error al crear un nuevo Destino Recurrente ${error.message}`
      );
    }
  }

  async updateDestino(id, editarDestino) {
    try {
      let destino = await axios.put(
        `${API_URL}/destinos-recurrentes/${id}`,
        {
          contacto: editarDestino.contacto,
          empresa: editarDestino.empresa,
          telefono: editarDestino.telefono,
          direccion: editarDestino.direccion,
          distrito: editarDestino.distrito.distrito,
          otroDato: editarDestino.otroDato,
        },
        {
          headers: authHeader(),
        }
      );

      return destino;
    } catch (error) {
      console.error(`Error al editar un Destino ${error.message}`);
    }
  }

  async getDestino(id) {
    try {
      let destino = await axios.get(`${API_URL}/destinos-recurrentes/${id}`, {
        headers: authHeader(),
      });

      return destino.data;
    } catch (error) {
      console.error(`Error al obtener un Destino por su Id ${error.message}`);
    }
  }

  async searchDestinos(findDestino) {
    try {
      let destino = await axios.get(`${API_URL}/destinos?q=${findDestino}`, {
        headers: authHeader(),
      });

      return destino.data;
    } catch (error) {
      console.error(`Error al buscar los Destinos ${error.message}`);
    }
  }
}

export default new DestinoService();
