import Vue from "vue";
import Vuex from "vuex";

// Auth Controllers
import AuthService from "../services/auth.service";

// Modules
import { auxiliares } from "./auxiliares.module";
import { mobikers } from "./mobikers.module";
import { clientes } from "./clientes.module";
import { destinos } from "./destino.module";
import { empresas } from "./empresa.module";

const initialState = JSON.parse(localStorage.getItem("user"));

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  state: {
    loggedIn: initialState ? true : false,
    user: initialState ? initialState : null,
  },
  mutations: {
    loginSuccess(state, payload) {
      state.user = payload;
      state.loggedIn = true;
      localStorage.setItem("user", JSON.stringify(payload));
    },

    logout(state) {
      state.loggedIn = false;
      state.user = null;
    },
  },
  actions: {
    async login({ commit }, user) {
      try {
        const usuarioLogin = await AuthService.login(user);
        commit("loginSuccess", usuarioLogin);
        return Promise.resolve(usuarioLogin);
      } catch (error) {
        console.error(`Error en el login: ${error}`);
        return Promise.reject(error);
      }
    },

    logout({ commit }) {
      AuthService.logout();
      commit("logout");
    },
  },
  getters: {
    operador: (state) => {
      return state.user.username;
    },
  },
  modules: {
    auxiliares,
    mobikers,
    clientes,
    destinos,
    empresas,
  },
});
