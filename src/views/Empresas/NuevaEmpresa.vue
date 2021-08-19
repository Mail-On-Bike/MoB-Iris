<template>
  <div class="px-8 py-4 mx-auto mt-10 bg-gray-100 shadow-lg rounded-xl">
    <div class="flex justify-end">
      <h1
        class="relative inline-block px-6 py-2 mb-4 text-2xl font-bold text-center bg-gray-100 text-primary rounded-xl -top-12"
      >
        Nueva Empresa
      </h1>
    </div>

    <div class="overlay" v-if="showBuscador"></div>

    <BuscadorCliente
      :showBuscador="showBuscador"
      @cerrarBuscador="showBuscador = false"
      @activarCliente="activarCliente"
    />

    <div class="flex flex-col items-center justify-center -mt-12">
      <form
        class="grid w-4/5 grid-cols-5 gap-4 p-4 border-b-2 border-primary"
        autocomplete="off"
      >
        <div class="col-span-3">
          <label for="nombreEmpresa" class="label-input"
            >Nombre de la Empresa:</label
          >
          <input
            v-model="dataEmpresa.empresa"
            type="text"
            v-validate="'required|max:100'"
            name="nombreEmpresa"
            class="input"
          />
          <div
            v-if="errors.has('nombreEmpresa')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>
              El nombre de la empresa es requerida y máximo 75 caracteres
            </p>
          </div>
        </div>

        <div>
          <label for="ruc" class="label-input">Ruc:</label>
          <input
            v-model="dataEmpresa.ruc"
            type="text"
            v-validate="'min:11|max:11'"
            name="ruc"
            class="input"
          />
          <div
            v-if="errors.has('ruc')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>
              El RUC es de 11 números.
            </p>
          </div>
        </div>

        <div>
          <label for="comprobante" class="label-input">Comprobante:</label>
          <model-list-select
            name="comprobante"
            v-model="dataEmpresa.comprobante"
            :list="tiposDeComprobante"
            option-text="tipo"
            option-value="tipo"
          />
          <div
            v-if="errors.has('comprobante')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>
              El comprobante es de máximo 25 caracteres
            </p>
          </div>
        </div>
      </form>

      <div class="grid w-4/5 grid-cols-4 gap-4 py-4">
        <div
          class="grid items-center grid-cols-4 col-span-4 font-bold text-center text-primary"
        >
          <h2>Contacto</h2>
          <h2>Empresa</h2>
          <h2>Distrito</h2>
          <h2>Acciones</h2>
        </div>

        <div v-if="clientesAsociados.length === 0" class="col-span-3"></div>

        <div
          v-else
          class="grid items-center justify-center grid-cols-4 col-span-4 text-xs gap-x-2"
          v-for="cliente in clientesAsociados"
          :key="cliente.id"
        >
          <div class="w-full p-3 bg-white rounded-xl">
            {{ cliente.contacto }}
          </div>

          <div class="w-full p-3 bg-white rounded-xl">
            {{ cliente.razonComercial }}
          </div>

          <div class="w-full p-3 text-center bg-white rounded-xl">
            {{ cliente.distrito.distrito }}
          </div>

          <div
            class="flex items-center justify-center"
            title="Quitar Cliente Asociado"
          >
            <button @click="removerCliente(cliente)">
              <font-awesome-icon
                class="text-2xl text-red-500"
                icon="trash-alt"
              />
            </button>
          </div>
        </div>

        <div class="flex items-center justify-center col-start-4">
          <button
            class="relative px-4 py-1 font-bold text-white bg-primary rounded-xl focus:outline-none"
            @click="showBuscador = true"
          >
            Agregar cliente
          </button>
        </div>
      </div>
    </div>

    <div class="flex flex-row justify-between mt-2">
      <button
        @click="cancelar"
        type="button"
        class="block px-6 py-2 mx-auto font-bold text-white transition duration-200 bg-red-500 rounded-lg shadow-lg hover:bg-red-700 hover:shadow-xl focus:outline-none"
      >
        Cancelar
      </button>

      <button
        type="submit"
        @click.prevent="handleNuevaEmpresa"
        class="block px-6 py-2 mx-auto font-bold text-white transition duration-200 rounded-lg shadow-lg bg-info hover:bg-secondary hover:shadow-xl focus:outline-none"
      >
        Crear Nueva Empresa
      </button>
    </div>

    <BaseAlerta v-if="alert.show" :alert="alert" />
  </div>
</template>

<script>
import BaseAlerta from "@/components/BaseAlerta.vue";
import BuscadorCliente from "@/components/BuscadorCliente";
import Empresa from "@/models/empresa";
import EmpresaService from "@/services/empresa.service";
import { ModelListSelect } from "vue-search-select";
import { mapState } from "vuex";

export default {
  name: "NuevaEmpresa",
  components: { BaseAlerta, BuscadorCliente, ModelListSelect },
  data() {
    return {
      dataEmpresa: new Empresa("", "", "", []),
      showBuscador: false,
      alert: {
        message: "",
        success: false,
        show: false,
      },
      clientesAsociados: [],
    };
  },
  computed: { ...mapState("auxiliares", ["tiposDeComprobante"]) },
  methods: {
    async handleNuevaEmpresa() {
      try {
        const isValid = await this.$validator.validateAll();
        if (!isValid) {
          return;
        }

        const nuevaEmpresa = {
          empresa: this.dataEmpresa.empresa,
          ruc: this.dataEmpresa.ruc,
          comprobante: this.dataEmpresa.comprobante,
          clientes: this.clientesAsociados,
        };

        const response = await EmpresaService.storageEmpresa(nuevaEmpresa);
        this.alert.message = response.data.message;
        this.alert.show = true;
        this.alert.success = true;

        setTimeout(() => {
          history.go(-1);
        }, 1500);
      } catch (error) {
        console.log(
          `Error al crear Nuevo Pedido: ${error.response.data.message}`
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

    activarCliente(cliente) {
      if (cliente) {
        this.clientesAsociados.push(cliente);
      }
    },

    removerCliente(remover) {
      this.clientesAsociados = this.clientesAsociados.filter(
        (cliente) => cliente !== remover
      );
    },
  },
};
</script>
