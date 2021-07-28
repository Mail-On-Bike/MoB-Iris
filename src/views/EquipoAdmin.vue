<template>
  <div class="w-full max-h-screen p-4 mt-10 bg-gray-100 rounded-xl">
    <div class="flex justify-end">
      <h1
        class="relative inline-block px-6 py-2 mb-4 text-2xl font-bold text-center bg-gray-100 text-primary rounded-xl -top-12"
      >
        Equipo Administrativo
      </h1>
    </div>

    <div class="overlay" v-if="showAdvertencia" />

    <RestaurarPassword
      v-if="showAdvertencia"
      :currentUser="currentUser"
      :restaurarPassword="restaurarPassword"
      @cerrarBuscador="showAdvertencia = false"
    />

    <div class="flex flex-row items-center justify-end mb-4 -mt-10">
      <router-link
        to="/register"
        class="px-6 py-2 font-bold text-white bg-green-600 rounded-xl focus:outline-none hover:bg-green-500"
        custom
        v-slot="{ navigate }"
      >
        <span @click="navigate" role="link" class="text-center cursor-pointer"
          >Nuevo Usuario</span
        >
      </router-link>
    </div>

    <div class="overflow-y-auto max-h-96">
      <table class="table w-full border-collapse table-auto">
        <tr
          class="table-row text-sm text-center text-white border-2 bg-secondary border-secondary"
        >
          <th class="table-cell">Usuario</th>
          <th class="table-cell">Nombres</th>
          <th class="table-cell">Email</th>
          <th class="table-cell">Franquicia</th>
          <th class="table-cell">Roles</th>
          <th class="table-cell">Acciones</th>
        </tr>

        <tr
          class="table-row max-h-full overflow-y-auto text-sm border-2 odd:bg-info odd:text-white border-secondary"
          v-for="user in usuarios"
          :key="user.id"
        >
          <td class="table-cell p-2 text-center border-2 border-secondary">
            {{ user.username }}
          </td>
          <td class="table-cell p-2 text-center border-2 border-secondary">
            {{ user.fullName }}
          </td>
          <td class="table-cell p-2 text-center border-2 border-secondary">
            {{ user.email }}
          </td>
          <td class="table-cell p-2 text-center border-2 border-secondary">
            {{ user.empresa }}
          </td>
          <td class="table-cell p-2 text-center border-2 border-secondary">
            {{ listarRoles(user.roles) }}
          </td>
          <td class="table-cell p-2 text-center border-2 border-secondary">
            <router-link
              :to="`/editar-user/${user.id}`"
              custom
              v-slot="{ navigate }"
              class="px-2 font-bold text-white bg-green-600 rounded-xl"
            >
              <span
                @click="navigate"
                role="link"
                class="text-center cursor-pointer"
                >Editar</span
              >
            </router-link>

            <button
              class="px-2 ml-2 font-bold text-white bg-red-500 rounded-xl"
              @click="openAdvertencia(user)"
            >
              Restaurar
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import AuthService from "../services/auth.service";
import RestaurarPassword from "../components/RestaurarPassword.vue";

export default {
  name: "EquipoAdmin",
  components: { RestaurarPassword },
  data() {
    return {
      usuarios: [],
      currentUser: null,
      showAdvertencia: false,
    };
  },
  mounted() {
    this.getMobAdmin();
  },
  methods: {
    async getMobAdmin() {
      try {
        this.usuarios = await AuthService.getEquipoAdmin();
      } catch (error) {
        console.error(
          `No se pudieron obtener los usuarios del Equipo Admin: ${error.message}`
        );
      }
    },

    capitalizar(texto) {
      const nuevoTexto = texto
        .trim()
        .toLowerCase()
        .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

      return nuevoTexto;
    },

    listarRoles(roles) {
      let rolesUsuario = "";

      roles.forEach((rol) => {
        rolesUsuario += " " + this.capitalizar(rol.name);
      });

      return rolesUsuario;
    },

    openAdvertencia(user) {
      this.showAdvertencia = true;
      this.currentUser = user;
    },

    async restaurarPassword(id) {
      await AuthService.restartPassword(id);
      this.showAdvertencia = false;
    },
  },
};
</script>
