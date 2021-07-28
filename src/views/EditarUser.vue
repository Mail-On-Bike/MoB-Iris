<template>
  <div class="flex flex-col items-center justify-center w-full mt-6">
    <div
      class="max-w-lg px-8 py-4 mx-auto overflow-hidden bg-gray-100 shadow-lg rounded-xl"
    >
      <form
        class="flex flex-col mt-4"
        @submit.prevent="handleEdit"
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

        <div class="flex flex-row my-6 justify-evenly">
          <button
            @click="cancelar"
            type="button"
            class="block px-8 py-2 font-bold text-white transition duration-200 bg-red-500 rounded-lg shadow-lg hover:bg-red-700 hover:shadow-xl focus:outline-none"
          >
            Cancelar
          </button>

          <button
            class="block px-8 py-2 font-bold text-white transition duration-200 rounded-lg shadow-lg bg-info hover:bg-secondary hover:shadow-xl focus:outline-none"
            type="submit"
          >
            Editar Usuario
          </button>
        </div>
      </form>

      <BaseAlerta v-if="alert.show" :alert="alert" />
    </div>
  </div>
</template>

<script>
import BaseAlerta from "@/components/BaseAlerta.vue";
import AuthService from "@/services/auth.service";
import User from "@/models/user";
import { mapState } from "vuex";

export default {
  name: "EditarUser",
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
  mounted() {
    this.getUser(this.$route.params.id);
  },
  computed: {
    ...mapState("auxiliares", ["rolesUsuarios"]),
  },
  methods: {
    async getUser(id) {
      try {
        this.user = await AuthService.getUser(id);

        this.user.roles = this.user.roles.map((rol) => rol.name);
      } catch (error) {
        console.error(`No se encontró ningún usuario: ${error.message}`);
      }
    },

    cancelar() {
      history.go(-1);
    },

    async handleEdit() {
      console.log(this.user);
      try {
        const isValid = await this.$validator.validateAll();

        if (!isValid) {
          return;
        }

        const response = await AuthService.editUser(
          this.$route.params.id,
          this.user
        );
        console.log(response);
        this.alert.message = response.message;
        this.alert.show = true;
        this.alert.success = true;

        setTimeout(() => {
          this.alert.show = false;
          history.go(-1);
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
