<template>
  <div class="px-8 py-4 mx-auto mt-10 bg-gray-100 shadow-lg rounded-xl">
    <div class="flex justify-end">
      <h1
        class="relative inline-block px-6 py-2 mb-4 text-2xl font-bold text-center bg-gray-100 text-primary rounded-xl -top-12"
      >
        Nuevo Usuario Cliente
      </h1>
    </div>

    <div class="flex flex-row justify-around px-4 mx-auto -mt-12">
      <div>
        <button
          class="px-4 py-1 font-bold text-white bg-primary rounded-xl focus:outline-none"
          @click="showBuscador = true"
        >
          Buscar cliente
        </button>
      </div>
    </div>

    <div class="overlay" v-if="showBuscador"></div>

    <BuscadorCliente
      :showBuscador="showBuscador"
      @cerrarBuscador="showBuscador = false"
      @activarCliente="setEmpresa"
    />

    <form
      class="mt-6"
      @submit.prevent="handleNuevoUserCliente"
      autocomplete="off"
    >
      <div class="grid grid-cols-3 gap-4">
        <div>
          <label for="contacto" class="label-input">Contacto</label>
          <input
            v-model="nuevoUserCliente.contacto"
            v-validate="'required'"
            type="text"
            name="contacto"
            class="input"
          />
          <div
            v-if="errors.has('contacto')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>El contacto es requerido</p>
          </div>
        </div>

        <div>
          <label for="username" class="label-input">Username</label>
          <input
            v-model="nuevoUserCliente.username"
            v-validate="'required'"
            type="text"
            name="username"
            class="input"
          />
          <div
            v-if="errors.has('username')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>El username es requerido</p>
          </div>
        </div>

        <div>
          <label for="email" class="label-input">Email</label>
          <input
            v-model="nuevoUserCliente.email"
            v-validate="'required'"
            type="email"
            name="email"
            class="input"
          />
          <div
            v-if="errors.has('email')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>El email es requerido</p>
          </div>
        </div>

        <div>
          <label for="telefono" class="label-input">Teléfono</label>
          <input
            v-model="nuevoUserCliente.telefono"
            v-validate="'required|min:6|max:12'"
            type="text"
            name="telefono"
            class="input"
          />
          <div
            v-if="errors.has('telefono')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>El teléfono es requerido</p>
          </div>
        </div>

        <div>
          <label for="password" class="label-input">Contraseña</label>
          <input
            v-model="nuevoUserCliente.password"
            v-validate="'required'"
            type="password"
            name="contacto"
            class="input"
          />
          <div
            v-if="errors.has('password')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>La contraseña es obligatoria</p>
          </div>
        </div>

        <div>
          <label for="role" class="label-input">Rol</label>
          <input
            v-model="nuevoUserCliente.role"
            readonly
            type="text"
            name="role"
            class="input"
          />
          <div
            v-if="errors.has('role')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>El rol es requerido</p>
          </div>
        </div>

        <div class="col-span-3">
          <label for="empresa" class="label-input">Empresa</label>
          <input
            v-model="nuevoUserCliente.empresa"
            v-validate="'required'"
            readonly
            type="text"
            name="empresa"
            class="input"
            placeholder="Seleccione un Cliente"
          />
          <div
            v-if="errors.has('empresa')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>La empresa es requerida</p>
          </div>
        </div>
      </div>

      <div class="flex flex-row justify-between mt-8 mb-6">
        <button
          @click="cancelar"
          type="button"
          class="block px-6 py-2 mx-auto font-bold text-white transition duration-200 bg-red-500 rounded-lg shadow-lg hover:bg-red-700 hover:shadow-xl focus:outline-none"
        >
          Cancelar
        </button>

        <button
          type="submit"
          class="block px-6 py-2 mx-auto font-bold text-white transition duration-200 rounded-lg shadow-lg bg-info hover:bg-secondary hover:shadow-xl focus:outline-none"
        >
          Crear Nuevo Usuario Cliente
        </button>
      </div>
    </form>

    <BaseAlerta v-if="alert.show" :alert="alert" />
  </div>
</template>

<script>
import BaseAlerta from "@/components/BaseAlerta.vue";
import UserCliente from "@/models/userCliente";
import UserClienteService from "@/services/userCliente.service";
import BuscadorCliente from "@/components/BuscadorCliente";

export default {
  name: "NuevoUsuarioCliente",
  components: {
    BaseAlerta,
    BuscadorCliente,
  },
  data() {
    return {
      nuevoUserCliente: new UserCliente("", "", "", "", "", "", "cliente"),
      showBuscador: false,
      alert: {
        message: "",
        success: false,
        show: false,
      },
    };
  },
  methods: {
    async handleNuevoUserCliente() {
      try {
        const isValid = await this.$validator.validateAll();
        if (!isValid) {
          return;
        }

        const response = await UserClienteService.storageUserCliente(
          this.nuevoUserCliente
        );

        this.alert.message = response.data.message;
        this.alert.show = true;
        this.alert.success = true;

        setTimeout(() => {
          history.go(-1);
        }, 1500);
      } catch (error) {
        console.log(
          `Error al crear Nuevo Usuario Cliente: ${error.response.data.message}`
        );
        this.alert.message = error.response.data.message;
        this.alert.show = true;
        this.alert.success = false;
        setTimeout(() => (this.alert.show = false), 2500);
      }
    },

    setEmpresa(cliente) {
      if (cliente) {
        this.nuevoUserCliente.contacto = cliente.contacto;
        this.nuevoUserCliente.email = cliente.email;
        this.nuevoUserCliente.telefono = cliente.telefono;
        this.nuevoUserCliente.empresa = cliente.razonComercial;
      }
    },

    cancelar() {
      history.go(-1);
    },
  },
};
</script>
