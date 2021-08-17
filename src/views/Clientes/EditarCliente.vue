<template>
  <div class="px-8 py-4 mx-auto mt-10 bg-gray-100 shadow-lg rounded-xl">
    <div class="flex justify-end">
      <h1
        class="relative inline-block px-6 py-2 mb-4 text-2xl font-bold text-center bg-gray-100 text-primary rounded-xl -top-12"
      >
        Editar Cliente
      </h1>
    </div>

    <div class="overlay" v-if="showBuscador"></div>

    <BuscadorEmpresa
      :showBuscador="showBuscador"
      @cerrarBuscador="showBuscador = false"
      @activarEmpresa="activarEmpresa"
    />

    <form
      class="-mt-10"
      @submit.prevent="handleEditarCliente"
      autocomplete="off"
    >
      <div class="grid grid-cols-4 gap-4 mb-4">
        <div class="flex flex-col">
          <label for="contacto" class="label-input">Contacto</label>
          <input
            v-model="editarCliente.contacto"
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

        <div class="flex flex-col">
          <label for="razonSocial" class="label-input">Razón Social</label>
          <input
            v-model="editarCliente.razonSocial"
            type="text"
            name="razonSocial"
            class="input"
            placeholder="Opcional"
          />
        </div>

        <div class="flex flex-col">
          <label for="razonComercial" class="label-input"
            >Razón Comercial</label
          >
          <input
            v-model="editarCliente.razonComercial"
            v-validate="'required'"
            type="text"
            name="razonComercial"
            class="input"
          />
        </div>

        <div class="flex flex-col">
          <label for="telefono" class="label-input">Teléfono</label>
          <input
            v-model="editarCliente.telefono"
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
        <div class="flex flex-col">
          <label for="email" class="label-input">Email</label>
          <input
            v-model="editarCliente.email"
            type="email"
            name="email"
            class="input"
            placeholder="Opcional"
          />
        </div>

        <div class="flex flex-col">
          <label for="ruc" class="label-input">RUC</label>
          <input
            v-model.number="editarCliente.ruc"
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

        <div class="flex flex-col">
          <label for="distrito" class="label-input">Distrito</label>
          <model-list-select
            v-validate="'required'"
            name="distrito"
            v-model="editarCliente.distrito"
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
        <div class="flex flex-col">
          <label for="direccion" class="label-input">Dirección</label>
          <input
            v-model="editarCliente.direccion"
            v-validate="'required'"
            name="direccion"
            type="text"
            class="input"
          />
          <div
            v-if="errors.has('direccion')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>La direccion es requerida</p>
          </div>
        </div>

        <div class="flex flex-col">
          <label for="otroDato" class="label-input">Otro Dato</label>
          <input
            v-model="editarCliente.otroDato"
            name="otroDato"
            type="text"
            class="input"
            placeholder="Opcional"
          />
        </div>
      </div>

      <div class="grid grid-cols-5 gap-4 mb-10">
        <div class="flex flex-col">
          <label for="carga" class="label-input">Tipo de Carga</label>
          <model-list-select
            v-validate="'required'"
            name="carga"
            v-model="editarCliente.carga"
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

        <div class="flex flex-col">
          <label for="pago" class="label-input">Forma de Pago</label>
          <model-list-select
            v-validate="'required'"
            name="pago"
            v-model="editarCliente.pago"
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

        <div class="flex flex-col">
          <label for="comprobante" class="label-input">Comprobante</label>
          <model-list-select
            v-validate="'required'"
            name="pago"
            v-model="editarCliente.comprobante"
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
            v-model="editarCliente.tipoEnvio"
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

        <div class="flex flex-col">
          <label for="rol" class="label-input">Rol</label>
          <model-list-select
            v-validate="'required'"
            name="rol"
            v-model="editarCliente.rol"
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
          type="button"
          @click="cancelar"
          class="block px-6 py-2 mx-auto font-bold text-white transition duration-200 bg-red-500 rounded-lg shadow-lg hover:bg-red-700 hover:shadow-xl focus:outline-none"
        >
          Cancelar
        </button>

        <button
          type="button"
          class="relative px-4 py-1 font-bold text-white bg-primary rounded-xl focus:outline-none"
          @click="showBuscador = true"
        >
          Buscar Empresa
        </button>

        <button
          type="submit"
          class="block px-6 py-2 mx-auto font-bold text-white transition duration-200 rounded-lg shadow-lg bg-info hover:bg-secondary hover:shadow-xl focus:outline-none"
        >
          Editar Cliente
        </button>
      </div>
    </form>

    <BaseAlerta v-if="alert.show" :alert="alert" />
  </div>
</template>

<script>
import BaseAlerta from "@/components/BaseAlerta.vue";
import BuscadorEmpresa from "@/components/BuscadorEmpresa";
import Cliente from "@/models/cliente";
import { ModelListSelect } from "vue-search-select";
import { mapState, mapActions } from "vuex";
import ClienteService from "@/services/cliente.service";

export default {
  name: "EditarCliente",
  data() {
    return {
      editarCliente: new Cliente(),
      showBuscador: false,
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
    this.getCliente(this.$route.params.id);
  },
  methods: {
    ...mapActions("clientes", ["getClientes"]),

    async getCliente(id) {
      try {
        let response = await ClienteService.getClienteById(id);
        this.editarCliente = response.data;

        this.editarCliente.carga = response.data.tipoDeCarga["tipo"];
        this.editarCliente.pago = response.data.formaDePago["pago"];
        this.editarCliente.comprobante =
          response.data.tipoDeComprobante["tipo"];
        this.editarCliente.rol = response.data.rolCliente["rol"];
        this.editarCliente.tipoEnvio = response.data.tipoDeEnvio["tipo"];
      } catch (error) {
        console.error(`Error al obtener el cliente por id: ${error.message}`);
      }
    },

    async handleEditarCliente() {
      try {
        const isValid = await this.$validator.validateAll();
        if (!isValid) {
          return;
        }

        if (this.editarCliente.ruc === "") {
          this.editarCliente.ruc = null;
        }

        const response = await ClienteService.editCliente(
          this.$route.params.id,
          this.editarCliente
        );

        this.alert.message = response.data.message;
        this.alert.show = true;
        this.alert.success = true;
        await this.getClientes();

        setTimeout(() => {
          history.go(-1);
        }, 1500);
      } catch (error) {
        console.error(`Error al editar el cliente: ${error.message}`);
        this.alert.message = error.response.data.message;
        this.alert.show = true;
        this.alert.success = false;
        setTimeout(() => (this.alert.show = false), 2500);
      }
    },

    activarEmpresa(empresa) {
      this.editarCliente.razonComercial = empresa.empresa;
    },

    cancelar() {
      history.go(-1);
    },
  },
  components: {
    ModelListSelect,
    BaseAlerta,
    BuscadorEmpresa,
  },
};
</script>
