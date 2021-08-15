import EmpresaService from "@/services/empresa.service";

const empresasStorage = JSON.parse(localStorage.getItem("empresas"));

export const empresas = {
  namespaced: true,
  state: {
    empresas: empresasStorage ? empresasStorage : [],
  },
  mutations: {
    setEmpresasArray(state, payload) {
      state.empresas = payload;
      localStorage.setItem("empresas", JSON.stringify(payload));
    },
  },
  actions: {
    async getEmpresas({ commit }) {
      try {
        const response = await EmpresaService.getEmpresas();
        commit("setEmpresasArray", response);
      } catch (error) {
        console.error(`Mensaje de error desde la Store: ${error.message}`);
      }
    },
  },
};
