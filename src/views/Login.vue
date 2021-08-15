<template>
  <div class="flex flex-col items-center justify-center w-full mt-28">
    <div
      class="flex flex-col justify-center max-w-lg px-8 py-4 mx-auto bg-gray-100 shadow-lg rounded-xl"
    >
      <img
        id="profile-img"
        src="@/assets/MoB-logo.png"
        alt="Mail On Bike Logo"
        class="relative w-40 mx-auto -top-24"
      />
      <form class="-mt-16" @submit.prevent="handleLogin" autocomplete="off">
        <div class="rounded">
          <label for="username" class="label-input">Usuario</label>
          <input
            v-model="user.username"
            v-validate="'required'"
            type="text"
            name="username"
            class="input"
          />
          <div
            v-if="errors.has('username')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>El usuario es requerido</p>
          </div>
        </div>

        <div class="my-6 rounded">
          <label for="password" class="label-input">Contraseña</label>
          <input
            v-model="user.password"
            v-validate="'required'"
            type="password"
            name="password"
            class="input"
          />
          <div
            v-if="errors.has('password')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>La contraseña es requerida</p>
          </div>
          <button
            class="block w-full py-2 my-6 font-bold text-white transition duration-200 rounded shadow-lg bg-info hover:bg-secondary hover:shadow-xl focus:outline-none"
            :class="{ 'opacity-50': bloquearBtn === true }"
            type="submit"
            :disabled="bloquearBtn"
          >
            <span>Iniciar Sesión</span>
          </button>
        </div>
      </form>
    </div>

    <BaseAlerta v-if="alert.show" :alert="alert" />
  </div>
</template>

<script>
import BaseAlerta from "@/components/BaseAlerta.vue";
import User from "../models/user";

export default {
  name: "Login",
  components: { BaseAlerta },
  data() {
    return {
      user: new User(),
      alert: {
        message: "",
        success: false,
        show: false,
      },
      bloquearBtn: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/perfil");
    }
  },
  methods: {
    async handleLogin() {
      try {
        const isValid = await this.$validator.validateAll();

        if (!isValid) {
          return;
        }

        if (this.user.username && this.user.password) {
          const response = await this.$store.dispatch("login", this.user);
          console.log(response.message);
          this.bloquearBtn = true;
          this.alert.message = response.message;
          this.alert.show = true;
          this.alert.success = true;

          await this.getAllTablasAuxiliares();
          await this.getMoBikersAndClientes();
          setTimeout(() => {
            this.bloquearBtn = false;
            this.$router.push("/perfil");
          }, 1500);
        }
      } catch (error) {
        console.log(`Error al iniciar sesión: ${error.message}`);
        this.alert.message = "No se pudo iniciar sesión";
        this.alert.show = true;
        this.alert.success = false;
        setTimeout(() => (this.alert.show = false), 2500);
      }
    },

    async getAllTablasAuxiliares() {
      try {
        await this.$store.dispatch("auxiliares/getRolesUsuarios");
        await this.$store.dispatch("auxiliares/getDistritosLima");
        await this.$store.dispatch("auxiliares/getZonaCobertura");
        await this.$store.dispatch("auxiliares/getTiposCarga");
        await this.$store.dispatch("auxiliares/getComprobantes");
        await this.$store.dispatch("auxiliares/getTiposEnvios");
        await this.$store.dispatch("auxiliares/getFormasPago");
        await this.$store.dispatch("auxiliares/getModalidades");
        await this.$store.dispatch("auxiliares/getRangosMoB");
        await this.$store.dispatch("auxiliares/getRolCliente");
        await this.$store.dispatch("auxiliares/getEntidadesBancarias");
        await this.$store.dispatch("auxiliares/getStatusPedido");
        console.log("Se cargaron las tablas auxiliares");
      } catch (error) {
        console.error(
          `No se pudieron cargar las tablas Auxiliares. ${error.message}`
        );
      }
    },

    async getMoBikersAndClientes() {
      try {
        await this.$store.dispatch("mobikers/getMobikers");
        await this.$store.dispatch("clientes/getClientes");
        await this.$store.dispatch("destinos/getDestinos");
        await this.$store.dispatch("empresas/getEmpresas");
        console.log("Se cargaron los MoBikers y los Clientes");
      } catch (error) {
        console.error(
          `No se pudieron cargar los MoBikers y Clientes. ${error.message}`
        );
      }
    },
  },
};
</script>
