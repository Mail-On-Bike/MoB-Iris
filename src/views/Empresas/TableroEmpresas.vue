<template>
  <div class="w-full max-h-screen p-4 mt-10 bg-gray-100 rounded-xl">
    <div class="flex justify-end">
      <h1
        class="relative inline-block px-6 py-2 mb-4 text-2xl font-bold text-center bg-gray-100 text-primary rounded-xl -top-12"
      >
        Tablero Empresas
      </h1>
    </div>

    <div class="flex flex-row mb-4 -mt-10 justify-evenly">
      <div>
        <input
          type="search"
          class="input"
          v-model="buscador"
          @keyup.enter="searchEmpresa"
          placeholder="Buscar empresa..."
        />
      </div>

      <button class="refresh-btn" @click="refreshList">
        <font-awesome-icon
          class="text-white group-hover:animate-spin"
          icon="sync-alt"
        />
      </button>

      <!-- <router-link
        to="/destinos/crear-destino"
        class="px-6 py-2 font-bold text-white bg-green-600 rounded-xl focus:outline-none hover:bg-green-500"
        custom
        v-slot="{ navigate }"
      >
        <span @click="navigate" role="link" class="text-center cursor-pointer"
          >Nueva Empresa</span
        >
      </router-link> -->
    </div>

    <div class="grid items-center w-full grid-cols-4 border gap-x-2">
      <div
        class="col-span-3 overflow-y-auto bg-white border border-primary min-h-80 max-h-96"
      >
        <Loading v-if="loading" />

        <div
          v-else
          class="grid items-center justify-center h-auto grid-cols-4 py-3 overflow-hidden text-xs text-center border-b-2 cursor-default hover:bg-info border-primary"
          :class="{
            'bg-info text-white font-bold': empresa.id == currentIndex,
          }"
          v-for="empresa in empresasFiltradas"
          :key="empresa.id"
          @click="setActiveEmpresa(empresa, empresa.id)"
        >
          <div class="col-span-3">{{ empresa.empresa }}</div>

          <div>
            <router-link
              :to="`/clientes/tablero-clientes/${empresa.id}`"
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

      <div
        class="h-full overflow-y-auto bg-white border border-primary min-h-80 max-h-96"
      >
        <h3
          v-if="!currentEmpresa"
          class="mt-40 text-2xl font-bold text-center text-primary"
        >
          Seleccione a una Empresa...
        </h3>

        <div v-else>
          <h3
            v-if="clientesAsociados.length === 0"
            class="mt-40 text-2xl font-bold text-center text-primary"
          >
            No hay clientes asociados...
          </h3>

          <div
            v-else
            class="grid items-center justify-center h-auto py-3 overflow-hidden text-xs text-center border-b-2 cursor-default hover:bg-info border-primary"
            v-for="cliente in clientesAsociados"
            :key="cliente.id"
          >
            <router-link
              :to="`/clientes/tablero-clientes/${cliente.id}`"
              custom
              v-slot="{ navigate }"
              class="cursor-pointer"
            >
              <span @click="navigate" role="link">
                {{ cliente.contacto }}
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmpresaService from "@/services/empresa.service";
import Loading from "@/components/Loading";
import { mapActions, mapState } from "vuex";

export default {
  name: "TableroEmpresas",
  components: { Loading },
  data() {
    return {
      buscador: "",
      empresasFiltradas: [],
      clientesAsociados: [],
      loading: false,
      currentEmpresa: null,
      currentIndex: -1,
    };
  },
  mounted() {
    this.empresasFiltradas = this.empresas;
  },
  computed: {
    ...mapState("empresas", ["empresas"]),
  },
  methods: {
    ...mapActions("empresas", ["getEmpresas"]),

    async refreshList() {
      try {
        this.loading = true;
        await this.getEmpresas();
        this.empresasFiltradas = this.empresas;
        this.clientesAsociados = [];

        this.currentEmpresa = null;
        this.currentIndex = -1;

        this.buscador = "";
        this.loading = false;
      } catch (error) {
        console.error(`Error al refrescar la lista: ${error.message}`);
      }
    },

    async retrieveClientesDeEmpresa(id) {
      try {
        const { clientes } = await EmpresaService.getEmpresa(id);
        this.clientesAsociados = clientes;
      } catch (error) {
        console.error(
          `No se pudieron obtener los clientes asociados de esa empresa: ${error.message}`
        );
      }
    },

    setActiveEmpresa(empresa, index) {
      this.currentEmpresa = empresa;
      this.currentIndex = index;
      this.retrieveClientesDeEmpresa(index);
    },

    async searchEmpresa() {
      try {
        this.loading = true;
        this.empresasFiltradas = await EmpresaService.searchEmpresa(
          this.buscador
        );

        if (this.buscador.trim() === "") {
          this.refreshList();
        }
        this.loading = false;
      } catch (error) {
        console.error(`Error en el buscador de Empresas: ${error.message}`);
      }
    },
  },
};
</script>
