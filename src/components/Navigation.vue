<template>
  <nav class="z-40 flex items-center px-6 py-2 text-white bg-secondary">
    <div>
      <router-link to="/" custom v-slot="{ navigate }">
        <img
          @click="navigate"
          role="link"
          class="w-14"
          src="@/assets/MoB-logo.png"
          alt="Mail On Bike Logo"
        />
      </router-link>
    </div>

    <div v-if="currentUser" class="flex flex-row items-center ml-auto ">
      <!-- Navigation -->
      <div v-for="nav in navigationMenu" :key="nav.title">
        <router-link
          :to="nav.link"
          custom
          v-slot="{ navigate }"
          class="mr-6 font-bold link"
        >
          <span @click="navigate" role="link">
            {{ nav.title }}
          </span>
        </router-link>
      </div>

      <!-- Dropdown Menu -->
      <div>
        <button
          class="px-4 py-2 font-bold text-white bg-info rounded-xl focus:outline-none"
          @click="dropMenu = !dropMenu"
        >
          {{ currentUser.username }}
        </button>

        <div
          v-if="dropMenu"
          class="absolute z-40 flex flex-col mt-1 text-sm text-black bg-white rounded shadow-xl sub-menu right-4"
          v-click-outside="clickExterno"
        >
          <div
            v-for="link in linksDropMenu"
            :key="link.title"
            class="px-2 py-2 rounded link hover:bg-blue-500 hover:text-white"
          >
            <router-link :to="link.link" custom v-slot="{ navigate }">
              <span @click="navigate" role="link" class="w-full">
                {{ link.title }}
              </span>
            </router-link>
          </div>
          <div class="divider"></div>
          <a
            class="px-2 py-2 rounded link hover:bg-blue-500 hover:text-white"
            href
            @click.prevent="logOut"
            >Cerrar Sesión</a
          >
        </div>
      </div>
    </div>

    <div class="content-center ml-auto mr-4" v-else>
      <div class="flex mr-4">
        <router-link to="/login" custom v-slot="{ navigate }" class="link">
          <span @click="navigate" role="link">
            Login
          </span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import vClickOutside from "v-click-outside";

export default {
  data() {
    return {
      dropMenu: false,
      linksDropMenu: [
        { title: "Mi Perfil", link: "/perfil" },
        { title: "Crear usuario", link: "/register" },
        { title: "Crear usuario Cliente", link: "/nuevo-usuario-cliente" },
        { title: "Equipo MoB Admin", link: "/equipo-admin" },
      ],
      navigationMenu: [
        {
          title: "Finanzas",
          link: "/finanzas/historial-pedidos",
        },
        {
          title: "Clientes",
          link: "/clientes/tablero-clientes",
        },
        {
          title: "MoBikers",
          link: "/mobikers/equipo-mobiker",
        },
        {
          title: "Pedidos",
          link: "/pedidos/tablero-pedidos",
        },
      ],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
  },
  directives: {
    vClickOutside: vClickOutside.directive,
  },
  methods: {
    logOut() {
      this.$store.dispatch("logout");
      this.dropMenu = false;
      this.$router.push("/login");
    },
    clickExterno() {
      this.dropMenu = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.divider {
  width: 100%;
  height: 2px;
  background: #303868;
}

.link {
  cursor: pointer;
}
</style>
