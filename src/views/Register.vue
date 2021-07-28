<template>
  <div class="flex flex-col items-center justify-center w-full mt-6">
    <div
      class="max-w-lg px-8 py-4 mx-auto overflow-hidden bg-gray-100 shadow-lg rounded-xl"
    >
      <form
        class="flex flex-col mt-4"
        @submit.prevent="handleRegister"
        autocomplete="off"
      >
        <div class="flex flex-row">
          <div class="mb-4 mr-4 rounded">
            <label for="fullName" class="label-input">Nombre completo</label>
            <input
              v-model="user.fullName"
              v-validate="'required|min:3|max:30'"
              type="text"
              class="input"
              name="fullName"
            />
            <div
              v-if="errors.has('fullName')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>El nombre es requerido</p>
            </div>
          </div>
          <div class="mb-4 rounded">
            <label for="username" class="label-input">Usuario</label>
            <input
              v-model="user.username"
              v-validate="'required|min:3|max:25'"
              type="text"
              class="input"
              name="username"
            />
            <div
              v-if="errors.has('username')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>El usuario es requerido</p>
            </div>
          </div>
        </div>

        <div class="flex flex-row">
          <div class="mb-4 mr-4 rounded">
            <label for="empresa" class="label-input">Empresa</label>
            <input
              v-model="user.empresa"
              v-validate="'required|min:3|max:30'"
              type="text"
              class="input"
              name="empresa"
            />
            <div
              v-if="errors.has('empresa')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>La empresa es requerida</p>
            </div>
          </div>
          <div class="mb-4 rounded">
            <label for="email" class="label-input">Email</label>
            <input
              v-model="user.email"
              v-validate="'required|email|max:50'"
              type="email"
              class="input"
              name="email"
            />
            <div
              v-if="errors.has('email')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>El email es requerido</p>
            </div>
          </div>
        </div>

        <div class="mb-4 rounded">
          <label for="password" class="label-input">Password</label>
          <input
            v-model="user.password"
            v-validate="'required|min:6|max:40'"
            type="password"
            class="input"
            name="password"
          />
          <div
            v-if="errors.has('password')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>La contraseña es requerida</p>
          </div>
        </div>

        <div class="flex flex-row">
          <div class="mx-auto">
            <label for="roles" class="label-input">Seleccione un Rol</label>
            <div v-for="(rol, index) in rolesUsuarios" :key="index">
              <input
                type="checkbox"
                name="roles"
                v-model="user.roles"
                :value="rol.name"
              />
              <label class="ml-2" :for="rol">{{
                rolesUsuarios[index].name
              }}</label>
            </div>
            <div
              v-if="errors.has('roles')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              {{ errors.first("roles") }}
            </div>
          </div>
        </div>

        <button
          class="block px-8 py-2 mx-auto my-4 font-bold text-white transition duration-200 rounded shadow-lg bg-info hover:bg-secondary hover:shadow-xl focus:outline-none"
          type="submit"
        >
          Crear Nuevo Usuario
        </button>
      </form>

      <BaseAlerta v-if="alert.show" :alert="alert" />
    </div>
  </div>
</template>

<script>
import BaseAlerta from "@/components/BaseAlerta.vue";
import AuthService from "../services/auth.service";
import User from "../models/user";
import { mapState } from "vuex";

export default {
  name: "Register",
  components: { BaseAlerta },
  data() {
    return {
      user: new User("", "", "", "", "", []),
      alert: {
        message: "",
        success: false,
        show: false,
      },
    };
  },
  computed: {
    ...mapState("auxiliares", ["rolesUsuarios"]),

    loggedIn() {
      return this.$store.state.status.loggedIn;
    },
  },
  methods: {
    async handleRegister() {
      try {
        const isValid = await this.$validator.validateAll();

        if (!isValid) {
          return;
        }

        const response = await AuthService.register(this.user);
        this.alert.message = response.message;
        this.alert.show = true;
        this.alert.success = true;

        setTimeout(() => {
          this.alert.show = false;
          this.$route.push("/equipo-admin");
        }, 1500);
      } catch (error) {
        console.log(`Error al crear nuevo usuario: ${error.response.message}`);
        this.alert.message = error.response.message;
        this.alert.show = true;
        this.alert.success = false;
        setTimeout(() => (this.alert.show = false), 2500);
      }
    },
  },
};
</script>

<style lang="scss">
input[type="checkbox"] {
  position: relative;
  width: 2rem;
  height: 1rem;
  appearance: none;
  background: #c6c6c6;
  outline: none;
  border-radius: 1rem;
  box-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  &:checked {
    background: #6f8fc8;
  }

  &::before {
    content: "";
    position: absolute;
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    top: 0;
    left: 0;
    background: #fff;
    transform: scale(1.1);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }

  &:checked::before {
    left: 1rem;
  }
}
</style>
