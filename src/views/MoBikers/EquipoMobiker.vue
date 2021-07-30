<template>
  <div class="w-full max-h-screen p-4 mt-10 bg-gray-100 rounded-xl">
    <div class="flex justify-end">
      <h1
        class="relative inline-block px-6 py-2 mb-4 text-2xl font-bold text-center bg-gray-100 text-primary rounded-xl -top-12"
      >
        Equipo MoBiker
      </h1>
    </div>

    <div class="hidden" ref="stats">
      <MensajeEstadisticas
        v-if="currentMobiker"
        :estadisticas="currentMobiker"
      />
    </div>

    <div class="flex flex-row mb-4 -mt-10 justify-evenly">
      <div>
        <input
          type="search"
          class="input"
          v-model="buscador"
          @keyup.enter="searchMobiker"
          placeholder="Buscar mobiker..."
        />
      </div>

      <button class="refresh-btn" @click="refreshList">
        <font-awesome-icon
          class="text-white group-hover:animate-spin"
          icon="sync-alt"
        />
      </button>

      <router-link
        to="/mobikers/mobiker-top"
        class="px-6 py-2 font-bold text-white bg-secondary rounded-xl focus:outline-none hover:bg-info"
        custom
        v-slot="{ navigate }"
      >
        <span @click="navigate" role="link" class="text-center cursor-pointer"
          >MoBikers Top</span
        >
      </router-link>

      <router-link
        to="/mobikers/nuevo-mobiker"
        class="px-6 py-2 font-bold text-white bg-green-600 rounded-xl focus:outline-none hover:bg-green-500"
        custom
        v-slot="{ navigate }"
      >
        <span @click="navigate" role="link" class="text-center cursor-pointer"
          >Crear nuevo MoBiker</span
        >
      </router-link>
    </div>

    <div class="flex justify-around w-1/2 px-2 my-2 ml-4">
      <button @click="filtrarMobiker('Activo')" class="mob-activo">
        Activos ({{ contarMoBikersActivos }})
      </button>
      <button @click="filtrarMobiker('Inactivo')" class="mob-inactivo">
        Inactivos ({{ contarMoBikersInactivos }})
      </button>
      <button @click="filtrarMobiker('Retirado')" class="mob-retirado">
        Retirados ({{ contarMoBikersRetirados }})
      </button>
    </div>

    <div class="grid grid-cols-5 gap-x-2">
      <div
        class="inline-grid items-center grid-cols-7 col-span-3 mr-2 text-sm font-bold text-center text-primary"
      >
        <p>Nombres</p>
        <p>Distrito</p>
        <p>Equipo</p>
        <p>Bicienvios</p>
        <p>Rango</p>
        <p>Estado</p>
        <p>Acciones</p>
      </div>

      <div
        class="inline-grid items-center grid-cols-3 col-span-2 text-sm font-bold text-center cursor-pointer text-primary"
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

      <div
        class="col-span-3 overflow-y-auto bg-white border border-black pedidos-scroll max-h-96"
      >
        <Loading v-if="loading" />
        <div
          v-else
          class="grid items-center grid-cols-7 py-2 text-xs text-center border-b-2 cursor-default h-14 hover:bg-info border-primary"
          :class="{
            'bg-info text-white font-bold': mobiker.id == currentIndex,
          }"
          v-for="mobiker in mobikersFiltrados"
          :key="mobiker.id"
          @click="setActiveMobiker(mobiker, mobiker.id)"
        >
          <div class="px-2">
            <p>
              {{ mobiker.fullName }}
            </p>
          </div>
          <div>
            <p>
              {{ mobiker.distrito.distrito }}
            </p>
          </div>
          <div>
            <p>
              {{ mobiker.equipo }}
            </p>
          </div>
          <div>
            <p>
              {{ mobiker.biciEnvios }}
            </p>
          </div>
          <div>
            <p>
              {{ mobiker.rango.rangoMoBiker }}
            </p>
          </div>
          <div>
            <p v-if="mobiker.status === 'Activo'" class="mob-activo">
              {{ mobiker.status }}
            </p>
            <p v-if="mobiker.status === 'Inactivo'" class="mob-inactivo">
              {{ mobiker.status }}
            </p>
            <p v-if="mobiker.status === 'Retirado'" class="mob-retirado">
              {{ mobiker.status }}
            </p>
          </div>
          <div class="flex justify-center">
            <router-link
              :to="`/mobikers/equipo-mobiker/${mobiker.id}`"
              custom
              v-slot="{ navigate }"
              class="cursor-pointer"
            >
              <font-awesome-icon
                class="text-2xl text-primary"
                icon="pencil-alt"
                @click="navigate"
                role="link"
              />
            </router-link>

            <button class="ml-3" @click="statsMob(mobiker, mobiker.id)">
              <font-awesome-icon
                class="text-2xl text-primary"
                icon="chart-bar"
              />
            </button>
          </div>
        </div>
      </div>

      <div class="col-span-2 border border-black h-96">
        <h3
          v-if="!currentMobiker"
          class="mt-40 text-2xl font-bold text-center text-primary"
        >
          Seleccione a un MoBiker...
        </h3>

        <Component
          :is="currentTab"
          :estadisticas="currentMobiker"
          :pedidos="pedidosMobiker"
          v-else
        />
      </div>
    </div>
  </div>
</template>

<script>
import MobikerService from "@/services/mobiker.service";
import MoBDetalles from "@/components/MoBDetalles.vue";
import MensajeEstadisticas from "@/components/MensajeEstadisticas.vue";
import BaseBiciEnvios from "@/components/BaseBiciEnvios.vue";
import BaseEcoamigable from "@/components/BaseEcoamigable.vue";
import Loading from "@/components/Loading";

const tabNames = {
  detalles: "detalles",
  biciEnvios: "bicienvios",
  ecoamigable: "ecoamigable",
};

export default {
  data() {
    return {
      mobikers: [],
      mobikersFiltrados: [],
      pedidosMobiker: [],
      currentMobiker: null,
      currentIndex: -1,
      editModal: false,
      buscador: "",
      currentTab: null,
      tabNames,
      tabs: {
        [tabNames.detalles]: MoBDetalles,
        [tabNames.biciEnvios]: BaseBiciEnvios,
        [tabNames.ecoamigable]: BaseEcoamigable,
      },
      activeTabName: null,
      loading: false,

      statsCopiadas: false,
    };
  },
  components: {
    MoBDetalles,
    BaseBiciEnvios,
    BaseEcoamigable,
    Loading,
    MensajeEstadisticas,
  },
  async mounted() {
    this.mobikersFiltrados = await MobikerService.filterMobikers("Activo");
    await this.getAllMobikers();

    this.currentTab = this.tabs[tabNames.detalles];
  },
  computed: {
    contarMoBikersActivos() {
      return this.mobikers.filter((mob) => {
        return mob.status === "Activo";
      }).length;
    },

    contarMoBikersInactivos() {
      return this.mobikers.filter((mob) => {
        return mob.status === "Inactivo";
      }).length;
    },

    contarMoBikersRetirados() {
      return this.mobikers.filter((mob) => {
        return mob.status === "Retirado";
      }).length;
    },
  },
  methods: {
    async retrievePedidosMobikers(id) {
      try {
        const response = await MobikerService.getPedidosDelMobikerById(id);
        this.pedidosMobiker = response.data;
      } catch (error) {
        console.error(
          `No se pudieron obtener los pedidos del MoBiker: ${error.message}`
        );
      }
    },

    async getAllMobikers() {
      try {
        this.mobikers = await MobikerService.getMobikers();
      } catch (error) {
        console.error(
          `No se pudieron obtener todos los MoBikers: ${error.message}`
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
        this.mobikersFiltrados = await MobikerService.filterMobikers("Activo");

        this.currentMobiker = null;
        this.currentIndex = -1;
        this.buscador = "";
        await this.getAllMobikers();
        this.loading = false;
      } catch (error) {
        console.error(`Error al refrescar la lista: ${error.message}`);
      }
    },

    async setActiveMobiker(mobiker, index) {
      this.currentMobiker = mobiker;
      this.currentIndex = index;
      await this.handleTabClick(tabNames.detalles);
      await this.retrievePedidosMobikers(index);
    },

    async statsMob(mobiker, index) {
      await this.setActiveMobiker(mobiker, index);
      await this.copiarEstadisticas();
    },

    async filtrarMobiker(status) {
      this.loading = true;
      this.currentMobiker = null;
      this.currentIndex = -1;
      this.buscador = "";
      this.mobikersFiltrados = await MobikerService.filterMobikers(status);
      this.loading = false;
    },

    async searchMobiker() {
      try {
        this.loading = true;
        this.mobikersFiltrados = await MobikerService.searchMobiker(
          this.buscador
        );

        if (this.buscador.trim() === "") {
          this.mobikersFiltrados = await MobikerService.filterMobikers(
            "Activo"
          );
        }
        this.loading = false;
      } catch (error) {
        console.error(`Error en el buscador de MoBikers: ${error.message}`);
      }
    },

    copiarEstadisticas() {
      console.log(this.$refs.stats.innerText);
      this.$copyText(this.$refs.stats.innerText).then(() => {
        this.statsCopiadas = true;
        console.log("Texto copiado");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.pedidos-scroll::-webkit-scrollbar {
  width: 0.5rem;
  background: white;

  &-thumb {
    background: #52678e;
    border-radius: 1rem;
  }
}
</style>
