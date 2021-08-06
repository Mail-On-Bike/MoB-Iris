import axios from "axios";
import authHeader from "@/services/auth-header";

const API_URL = process.env.VUE_APP_HERMES;

class UserClienteService {
  async storageUserCliente(nuevoUserCliente) {
    try {
      let cliente = await axios.post(
        `${API_URL}/create-user-cliente`,
        {
          contacto: nuevoUserCliente.contacto,
          username: nuevoUserCliente.username,
          email: nuevoUserCliente.email,
          telefono: nuevoUserCliente.telefono,
          password: nuevoUserCliente.password,
          empresa: nuevoUserCliente.empresa,
          role: nuevoUserCliente.role,
        },
        { headers: authHeader() }
      );

      return cliente;
    } catch (error) {
      console.error("Mensaje de error: ", error.message);
    }
  }
}

export default new UserClienteService();
