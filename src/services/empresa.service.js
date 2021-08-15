import axios from "axios";
import authHeader from "@/services/auth-header";

const API_URL = process.env.VUE_APP_HERMES;

class EmpresaService {
  async getEmpresas() {
    try {
      let empresas = await axios.get(`${API_URL}/empresas-registradas`, {
        headers: authHeader(),
      });

      return empresas.data;
    } catch (error) {
      console.error(`Error al obtener todas las Empresas ${error.message}`);
    }
  }

  async storageEmpresa(nuevaEmpresa) {
    try {
      let empresa = await axios.post(
        `${API_URL}/nueva-empresa`,
        {
          empresa: nuevaEmpresa.empresa,
        },
        {
          headers: authHeader(),
        }
      );

      return empresa;
    } catch (error) {
      console.error(`Error al crear una nueva Empresa ${error.message}`);
    }
  }

  async updateEmpresa(id, editarEmpresa) {
    try {
      let empresa = await axios.put(
        `${API_URL}/empresas-registradas/${id}`,
        {
          empresa: editarEmpresa.empresa,
        },
        {
          headers: authHeader(),
        }
      );

      return empresa;
    } catch (error) {
      console.error(`Error al editar una Empresa ${error.message}`);
    }
  }

  async getEmpresa(id) {
    try {
      let empresa = await axios.get(`${API_URL}/empresas-registradas/${id}`, {
        headers: authHeader(),
      });

      return empresa.data;
    } catch (error) {
      console.error(`Error al obtener una Empresa por su Id ${error.message}`);
    }
  }

  async searchEmpresa(findEmpresa) {
    try {
      let empresa = await axios.get(`${API_URL}/empresas?q=${findEmpresa}`, {
        headers: authHeader(),
      });

      return empresa.data;
    } catch (error) {
      console.error(`Error al buscar las Empresas ${error.message}`);
    }
  }
}

export default new EmpresaService();
