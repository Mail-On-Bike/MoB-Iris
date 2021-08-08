<template>
  <div class="px-8 py-4 mx-auto mt-10 bg-gray-100 shadow-lg rounded-xl">
    <div class="flex justify-end">
      <h1
        class="relative inline-block px-6 py-2 mb-4 text-2xl font-bold text-center bg-gray-100 text-primary rounded-xl -top-12"
      >
        Nuevo Cliente
      </h1>
    </div>

    <form
      class="-mt-10"
      @submit.prevent="handleNuevoCliente"
      autocomplete="off"
    >
      <div class="grid grid-cols-4 gap-4 mb-4">
        <div>
          <label for="contacto" class="label-input">Contacto</label>
          <input
            v-model="nuevoCliente.contacto"
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
          <label for="razonSocial" class="label-input">Razón Social</label>
          <input
            v-model="nuevoCliente.razonSocial"
            type="text"
            name="razonSocial"
            class="input"
            placeholder="Opcional"
          />
        </div>

        <div>
          <label for="razonComercial" class="label-input"
            >Razón Comercial</label
          >
          <input
            v-model="nuevoCliente.razonComercial"
            v-validate="'required'"
            type="text"
            name="razonComercial"
            class="input"
          />
          <div
            v-if="errors.has('razonComercial')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>La Razón Comercial es requerida</p>
          </div>
        </div>

        <div>
          <label for="telefono" class="label-input">Teléfono</label>
          <input
            v-model="nuevoCliente.telefono"
            v-validate="'required|min:6|max:12'"
            type="string"
            name="telefono"
            class="input"
          />
          <div
            v-if="errors.has('telefono')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>El telefono es requerido y debe tener máximo 9 números</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label for="email" class="label-input">Email</label>
          <input
            v-model="nuevoCliente.email"
            type="email"
            name="email"
            class="input"
            placeholder="Opcional"
          />
        </div>

        <div>
          <label for="ruc" class="label-input">RUC</label>
          <input
            v-model="nuevoCliente.ruc"
            v-validate="'max:11'"
            name="ruc"
            type="string"
            class="input"
            placeholder="Opcional"
          />
          <div
            v-if="errors.has('ruc')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>El RUC debe tener 11 números</p>
          </div>
        </div>

        <div>
          <label for="distrito" class="label-input">Distrito</label>
          <model-list-select
            v-validate="'required'"
            name="distrito"
            v-model="nuevoCliente.distrito"
            placeholder="Buscar distrito..."
            :list="distritos"
            option-text="distrito"
            option-value="distrito"
          />
          <div
            v-if="errors.has('distrito')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>El distrito es requerido</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label for="direccion" class="label-input">Dirección</label>
          <input
            v-model="nuevoCliente.direccion"
            v-validate="'required'"
            name="direccion"
            type="text"
            class="input"
          />
          <div
            v-if="errors.has('direccion')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>La dirección es requerida</p>
          </div>
        </div>

        <div>
          <label for="otroDato" class="label-input">Otro Dato</label>
          <input
            v-model="nuevoCliente.otroDato"
            name="otroDato"
            type="text"
            class="input"
            placeholder="Opcional"
          />
        </div>
      </div>

      <div class="grid grid-cols-5 gap-4 mb-10">
        <div>
          <label for="carga" class="label-input">Tipo de Carga</label>
          <model-list-select
            v-validate="'required'"
            name="carga"
            v-model="nuevoCliente.carga"
            :list="tiposDeCarga"
            option-text="tipo"
            option-value="tipo"
          />
          <div
            v-if="errors.has('carga')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>El tipo de carga es requerido</p>
          </div>
        </div>

        <div>
          <label for="pago" class="label-input">Forma de Pago</label>
          <model-list-select
            v-validate="'required'"
            name="pago"
            v-model="nuevoCliente.pago"
            :list="formasDePago"
            option-text="pago"
            option-value="pago"
          />
          <div
            v-if="errors.has('pago')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>La forma de pago es requerida</p>
          </div>
        </div>

        <div>
          <label for="comprobante" class="label-input">Comprobante</label>
          <model-list-select
            v-validate="'required'"
            name="comprobante"
            v-model="nuevoCliente.comprobante"
            :list="tiposDeComprobante"
            option-text="tipo"
            option-value="tipo"
          />
          <div
            v-if="errors.has('comprobante')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>El comprobante es requerido</p>
          </div>
        </div>

        <div>
          <label for="tipoEnvio" class="label-input">Tipo de Envío</label>
          <model-list-select
            name="tipoEnvio"
            v-model="nuevoCliente.tipoEnvio"
            v-validate="'required'"
            :list="tiposDeEnvio"
            option-text="tipo"
            option-value="tipo"
          />
          <div
            v-if="errors.has('tipoEnvio')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>El tipo de Envío es requerido</p>
          </div>
        </div>

        <div>
          <label for="rol" class="label-input">Rol</label>
          <model-list-select
            v-validate="'required'"
            name="rol"
            v-model="nuevoCliente.rol"
            :list="rolCliente"
            option-text="rol"
            option-value="rol"
          />
          <div
            v-if="errors.has('rol')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>El rol es requerido</p>
          </div>
        </div>
      </div>

      <div class="flex flex-row justify-between mb-6">
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
          Crear Nuevo Cliente
        </button>
      </div>
    </form>

    <BaseAlerta v-if="alert.show" :alert="alert" />
  </div>
</template>

<script>
import BaseAlerta from "@/components/BaseAlerta.vue";
import Cliente from "@/models/cliente";
import { ModelListSelect } from "vue-search-select";
import ClienteService from "@/services/cliente.service";
import { mapState, mapActions } from "vuex";

export default {
  name: "NuevoCliente",
  data() {
    return {
      nuevoCliente: new Cliente(),
      alert: {
        message: "",
        success: false,
        show: false,
      },
    };
  },
  computed: {
    ...mapState("auxiliares", [
      "distritos",
      "tiposDeCarga",
      "tiposDeComprobante",
      "formasDePago",
      "rolCliente",
      "tiposDeEnvio",
    ]),
  },
  mounted() {
    this.nuevoCliente.carga = "Paquete";
    this.nuevoCliente.pago = "Efectivo en Origen";
    this.nuevoCliente.comprobante = "Ninguno";
    this.nuevoCliente.tipoEnvio = "E-Commerce";
    this.nuevoCliente.rol = "Remitente";
  },
  methods: {
    ...mapActions("clientes", ["getClientes"]),

    async handleNuevoCliente() {
      try {
        const isValid = await this.$validator.validateAll();
        if (!isValid) {
          return;
        }

        const response = await ClienteService.storageNuevoCliente(
          this.nuevoCliente
        );

        this.alert.message = response.data.message;
        this.alert.show = true;
        this.alert.success = true;
        await this.getClientes();

        setTimeout(() => {
          history.go(-1);
        }, 1500);
      } catch (error) {
        console.log(
          `Error al crear Nuevo Cliente: ${error.response.data.message}`
        );
        this.alert.message = error.response.data.message;
        this.alert.show = true;
        this.alert.success = false;
        setTimeout(() => (this.alert.show = false), 2500);
      }
    },

    cancelar() {
      history.go(-1);
    },
  },
  components: {
    ModelListSelect,
    BaseAlerta,
  },
};
</script>
