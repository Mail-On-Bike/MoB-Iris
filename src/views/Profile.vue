<template>
  <div class="w-1/3 p-4 mx-auto my-12 bg-gray-100 shadow-lg rounded-xl">
    <div class="flex justify-end">
      <h1
        class="relative inline-block px-6 py-2 mb-4 text-2xl font-bold text-center bg-gray-100 text-primary rounded-xl -top-12"
      >
        Perfil
      </h1>
    </div>

    <div class="-mt-12">
      <div class="p-4">
        <h2 class="mb-2">
          <strong class="resalta">Perfil:</strong>
          {{ currentUser.username }}
        </h2>
        <p class="mb-2">
          <strong class="resalta">Nombre:</strong>
          {{ currentUser.fullName }}
        </p>
        <p class="mb-2">
          <strong class="resalta">Email:</strong>
          {{ currentUser.email }}
        </p>
        <p class="mb-2">
          <strong class="resalta">Empresa:</strong>
          {{ currentUser.empresa }}
        </p>
      </div>
    </div>

    <form
      class="p-4"
      @submit.prevent="handleChangePassword"
      ref="formChangePassword"
    >
      <h2 class="mb-6 text-xl font-bold text-primary">Cambiar contraseña</h2>

      <label for="oldPassword" class="label-input">Vieja Contraseña</label>
      <input
        v-model="changePassword.oldPassword"
        v-validate="'required|min:6|max:40'"
        type="password"
        class="input"
        name="oldPassword"
      />
      <div
        v-if="errors.has('oldPassword')"
        class="p-2 text-sm text-white bg-red-500 rounded"
      >
        <p>Tu vieja contraseña es requerida</p>
      </div>

      <label for="newPassword" class="mt-6 label-input">Nueva Contraseña</label>
      <input
        v-model="changePassword.newPassword"
        v-validate="'required|min:6|max:40'"
        type="password"
        class="input"
        name="newPassword"
      />
      <div
        v-if="errors.has('newPassword')"
        class="p-2 text-sm text-white bg-red-500 rounded"
      >
        <p>Tu nueva contraseña es requerida</p>
      </div>

      <button
        class="block px-8 py-2 mx-auto mt-6 font-bold text-white transition duration-200 rounded shadow-lg bg-info hover:bg-secondary hover:shadow-xl focus:outline-none"
        type="submit"
      >
        Cambiar contraseña
      </button>
    </form>

    <BaseAlerta v-if="alert.show" :alert="alert" />
  </div>
</template>

<script>
import BaseAlerta from "@/components/BaseAlerta.vue";
import AuthService from "../services/auth.service";

export default {
  name: "Perfil",
  components: { BaseAlerta },
  data() {
    return {
      changePassword: {
        oldPassword: "",
        newPassword: "",
      },
      alert: {
        message: "",
        success: false,
        show: false,
      },
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
  methods: {
    async handleChangePassword() {
      try {
        const isValid = await this.$validator.validateAll();

        if (!isValid) {
          return;
        }

        const response = await AuthService.changePassword(
          this.$store.state.user.id,
          this.changePassword
        );
        this.alert.message = response.message;
        this.alert.show = true;
        this.alert.success = true;

        this.changePassword.oldPassword = "";
        this.changePassword.newPassword = "";
        this.errors.items = [];

        setTimeout(() => {
          this.alert.show = false;
          this.$refs.formChangePassword.reset();
        }, 2000);
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
