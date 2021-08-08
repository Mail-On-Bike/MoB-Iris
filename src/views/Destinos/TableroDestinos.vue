<template>
  <div class="w-full max-h-screen p-4 mt-10 bg-gray-100 rounded-xl">
    <div class="flex justify-end">
      <h1
        class="relative inline-block px-6 py-2 mb-4 text-2xl font-bold text-center bg-gray-100 text-primary rounded-xl -top-12"
      >
        Destinos Recurrentes
      </h1>
    </div>

    <div class="flex flex-row mb-4 -mt-10 justify-evenly">
      <div>
        <input
          type="search"
          class="input"
          v-model="buscador"
          @keyup.enter="searchDestino"
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
        to="/destinos/crear-destino"
        class="px-6 py-2 font-bold text-white bg-green-600 rounded-xl focus:outline-none hover:bg-green-500"
        custom
        v-slot="{ navigate }"
      >
        <span @click="navigate" role="link" class="text-center cursor-pointer"
          >Nuevo Destino Recurrente</span
        >
      </router-link>
    </div>

    <div>
      <div
        class="grid items-center w-full grid-cols-6 text-sm font-bold text-center text-primary"
      >
        <h2>Contacto</h2>
        <h2>Empresa</h2>
        <h2>Teléfono</h2>
        <h2>Dirección</h2>
        <h2>Distrito</h2>
        <h2>otroDato</h2>
      </div>

      <div
        class="overflow-y-auto bg-white border border-primary min-h-80 max-h-96"
      >
        <Loading v-if="loading" />

        <div
          v-else
          class="grid items-center h-auto grid-cols-6 py-2 overflow-hidden text-xs text-center border-b-2 cursor-default hover:bg-info border-primary"
          v-for="destino in destinosFiltrados"
          :key="destino.id"
          @click="editDestino(destino.id)"
        >
          <div>{{ destino.contacto }}</div>

          <div>{{ destino.empresa }}</div>

          <div>{{ destino.telefono }}</div>

          <div>{{ destino.direccion }}</div>

          <div>{{ destino.distrito.distrito }}</div>

          <div>{{ destino.otroDato }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DestinoService from "@/services/destino.service";
import Loading from "@/components/Loading";
import { mapActions, mapState } from "vuex";

export default {
  components: { Loading },
  data() {
    return {
      buscador: "",
      destinosFiltrados: [],
      loading: false,
    };
  },
  mounted() {
    this.destinosFiltrados = this.destinos;
  },
  computed: {
    ...mapState("destinos", ["destinos"]),
  },
  methods: {
    ...mapActions("destinos", ["getDestinos"]),

    editDestino(id) {
      this.$router.push(`/destinos/tablero-destinos/${id}`);
    },

    async refreshList() {
      try {
        this.loading = true;
        await this.getDestinos();
        this.destinosFiltrados = this.destinos;

        this.buscador = "";
        this.loading = false;
      } catch (error) {
        console.error(`Error al refrescar la lista: ${error.message}`);
      }
    },

    async searchDestino() {
      try {
        this.loading = true;
        this.destinosFiltrados = await DestinoService.searchDestinos(
          this.buscador
        );

        if (this.buscador.trim() === "") {
          this.refreshList();
        }
        this.loading = false;
      } catch (error) {
        console.error(`Error en el buscador de Destinos: ${error.message}`);
      }
    },
  },
};
</script>
