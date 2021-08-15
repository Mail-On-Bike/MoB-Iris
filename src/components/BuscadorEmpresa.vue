<template>
  <div
    v-if="showBuscador"
    class="absolute z-40 w-1/2 p-8 py-10 transform -translate-x-1/2 shadow-xl bg-primary top-12 left-1/2 rounded-xl"
  >
    <div class="absolute -top-4 -right-2">
      <button
        class="px-2 text-2xl text-white rounded-full bg-info hover:bg-secondary focus:outline-none"
        @click.prevent="cerrarBuscador"
      >
        <font-awesome-icon icon="times" />
      </button>
    </div>

    <div class="flex flex-row justify-center">
      <input
        type="search"
        class="input"
        v-model="buscador"
        @keyup.enter="searchEmpresa"
        placeholder="Buscar contacto o empresa..."
        autofocus
      />
    </div>

    <div class="h-56 mt-6 overflow-y-auto bg-white">
      <div
        class="grid items-center justify-center py-2 text-sm text-center bg-white border-b-2 cursor-default hover:bg-info border-primary"
        :class="{ 'bg-info': empresa.id == currentIndex }"
        v-for="empresa in empresasFiltradas"
        :key="empresa.id"
        @click="setActiveEmpresa(empresa, empresa.id)"
      >
        <div>
          {{ empresa.empresa }}
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-4">
      <button
        class="px-4 py-2 font-bold text-white bg-secondary rounded-xl focus:outline-none hover:bg-info"
        @click.prevent="enviarEmpresa"
      >
        Capturar empresa
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import EmpresaService from "@/services/empresa.service";

export default {
  name: "BuscadorEmpresa",
  props: {
    showBuscador: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      buscador: "",
      empresasFiltradas: [],
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
    async searchEmpresa() {
      try {
        this.empresasFiltradas = await EmpresaService.searchEmpresa(
          this.buscador
        );

        if (this.buscador.trim() === "") {
          this.empresasFiltradas = this.empresas;
        }
      } catch (error) {
        console.error(`Error en el buscador de Empresas: ${error.message}`);
      }
    },

    setActiveEmpresa(empresa, index) {
      this.currentEmpresa = empresa;
      this.currentIndex = index;
    },

    cerrarBuscador() {
      this.$emit("cerrarBuscador");
    },

    enviarEmpresa() {
      this.$emit("activarEmpresa", this.currentEmpresa);
      this.$emit("cerrarBuscador");
    },
  },
};
</script>
