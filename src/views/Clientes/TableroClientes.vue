<template>
  <div class="w-full max-h-screen p-4 mt-10 bg-gray-100 rounded-xl">
    <div class="flex justify-end">
      <h1
        class="relative inline-block px-6 py-2 mb-4 text-2xl font-bold text-center bg-gray-100 text-primary rounded-xl -top-12"
      >
        Tablero de Clientes
      </h1>
    </div>

    <div class="flex flex-row mb-4 -mt-10 justify-evenly">
      <div>
        <input
          type="search"
          class="input"
          v-model="buscador"
          @keyup.enter="searchCliente"
          placeholder="Buscar contacto o empresa..."
        />
      </div>

      <button class="refresh-btn" @click="refreshList">
        <font-awesome-icon
          class="text-white group-hover:animate-spin"
          icon="sync-alt"
        />
      </button>

      <router-link
        to="/clientes/nuevo-cliente"
        class="px-6 py-2 font-bold text-white bg-green-600 rounded-xl focus:outline-none hover:bg-green-500"
        custom
        v-slot="{ navigate }"
      >
        <span @click="navigate" role="link" class="text-center cursor-pointer"
          >Crear nuevo cliente</span
        >
      </router-link>

      <router-link
        to="/destinos/tablero-destinos"
        class="px-6 py-2 font-bold text-white bg-green-600 rounded-xl focus:outline-none hover:bg-green-500"
        custom
        v-slot="{ navigate }"
      >
        <span @click="navigate" role="link" class="text-center cursor-pointer"
          >Destinos Recurrentes</span
        >
      </router-link>
    </div>

    <div class="grid grid-cols-2 gap-x-2">
      <div
        class="inline-grid items-center grid-cols-4 text-sm font-bold text-center text-primary"
      >
        <p>Empresa</p>
        <p>Contacto</p>
        <p>Distrito</p>
        <p>Editar</p>
      </div>

      <div
        class="inline-grid items-center grid-cols-3 text-sm font-bold text-center cursor-pointer text-primary"
      >
        <div
          class="py-2 hover:bg-info hover:text-white rounded-t-xl"
          :class="{ 'bg-info text-white': activeTabName === tabNames.detalles }"
          @click="handleTabClick(tabNames.detalles)"
        >
          Detalles
        </div>
        <div
          class="py-2 hover:bg-info hover:text-white rounded-t-xl"
          :class="{
            'bg-info text-white': activeTabName === tabNames.biciEnvios,
          }"
          @click="handleTabClick(tabNames.biciEnvios)"
        >
          Bicienvios
        </div>
        <div
          class="py-2 hover:bg-info hover:text-white rounded-t-xl"
          :class="{
            'bg-info text-white': activeTabName === tabNames.ecoamigable,
          }"
          @click="handleTabClick(tabNames.ecoamigable)"
        >
          Ecoamigable
        </div>
      </div>

      <div class="overflow-y-auto bg-white border border-black max-h-96">
        <Loading v-if="loading" />

        <div
          v-else
          class="grid items-center h-24 grid-cols-4 py-2 overflow-hidden text-xs text-center border-b-2 cursor-default hover:bg-info border-primary"
          :class="{
            'bg-info text-white font-bold': cliente.id == currentIndex,
          }"
          v-for="cliente in clientesFiltrados"
          :key="cliente.id"
          @click="setActiveCliente(cliente, cliente.id)"
        >
          <div class="col-span-1">
            <p>
              {{ cliente.razonComercial }}
            </p>
          </div>
          <div class="col-span-1">
            <p>
              {{ cliente.contacto }}
            </p>
          </div>
          <div>
            <p>
              {{ cliente.distrito.distrito }}
            </p>
          </div>
          <div class="flex justify-center">
            <router-link
              :to="`/clientes/tablero-clientes/${cliente.id}`"
              custom
              v-slot="{ navigate }"
              class="cursor-pointer"
            >
              <font-awesome-icon
                class="text-xl text-primary"
                icon="pencil-alt"
                @click="navigate"
                role="link"
              />
            </router-link>
          </div>
        </div>
      </div>

      <div class="border border-black h-96">
        <h3
          v-if="!currentCliente"
          class="mt-40 text-2xl font-bold text-center text-primary"
        >
          Seleccione a un Cliente...
        </h3>

        <Component
          v-else
          :is="currentTab"
          :estadisticas="currentCliente"
          :pedidos="pedidosCliente"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ClienteService from "@/services/cliente.service";
import ClienteDetalles from "@/components/ClienteDetalles.vue";
import BaseBiciEnvios from "@/components/BaseBiciEnvios.vue";
import BaseEcoamigable from "@/components/BaseEcoamigable.vue";
import Loading from "@/components/Loading";
import { mapState, mapActions } from "vuex";

const tabNames = {
  detalles: "detalles",
  biciEnvios: "bicienvios",
  ecoamigable: "ecoamigable",
};

export default {
  data() {
    return {
      clientesFiltrados: [],
      pedidosCliente: [],
      currentCliente: null,
      currentIndex: -1,
      buscador: "",
      currentTab: null,
      tabNames,
      tabs: {
        [tabNames.detalles]: ClienteDetalles,
        [tabNames.biciEnvios]: BaseBiciEnvios,
        [tabNames.ecoamigable]: BaseEcoamigable,
      },
      activeTabName: null,
      loading: false,
    };
  },
  components: {
    ClienteDetalles,
    BaseBiciEnvios,
    BaseEcoamigable,
    Loading,
  },
  computed: {
    ...mapState("clientes", ["clientes"]),
  },
  mounted() {
    this.clientesFiltrados = this.clientes;
  },
  methods: {
    ...mapActions("clientes", ["getClientes"]),

    async retrievePedidosCliente(id) {
      try {
        const response = await ClienteService.getPedidosDelClienteById(id);
        this.pedidosCliente = response.data;
      } catch (error) {
        console.error(
          `Error al traer los pedidos del Cliente: ${error.message}`
        );
      }
    },

    handleTabClick(tabName) {
      this.activeTabName = tabName;
      this.currentTab = this.tabs[tabName];
    },

    async refreshList() {
      try {
        this.loading = true;
        await this.getClientes();
        this.clientesFiltrados = this.clientes;

        this.currentCliente = null;
        this.currentIndex = -1;
        this.buscador = "";
        this.loading = false;
      } catch (error) {
        console.error(`Error al refrescar la lista: ${error.message}`);
      }
    },

    setActiveCliente(cliente, index) {
      this.currentCliente = cliente;
      this.currentIndex = index;
      this.handleTabClick(tabNames.detalles);
      this.retrievePedidosCliente(index);
    },

    async searchCliente() {
      try {
        this.loading = true;
        this.clientesFiltrados = await ClienteService.searchCliente(
          this.buscador
        );

        if (this.buscador.trim() === "") {
          this.refreshList();
        }
        this.loading = false;
      } catch (error) {
        console.error(`Error en el buscador de Clientes: ${error.message}`);
      }
    },
  },
};
</script>
