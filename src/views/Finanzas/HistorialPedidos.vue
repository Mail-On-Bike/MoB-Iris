<template>
  <div class="w-full max-h-screen p-4 mt-10 bg-gray-100 rounded-xl">
    <div class="flex justify-end">
      <h1
        class="relative inline-block px-6 py-2 mb-4 text-2xl font-bold text-center bg-gray-100 text-primary rounded-xl -top-12"
      >
        Historial de Pedidos
      </h1>
    </div>

    <div class="overlay" v-if="showDetalle || showCambiarStatus"></div>

    <DetalleHistorialPedido
      :showDetalle="showDetalle"
      @cerrarDetalle="showDetalle = false"
      :currentPedido="currentPedido"
    />

    <CambiarStatusPedido
      :showCambiarStatus="showCambiarStatus"
      @cerrarModal="
        showCambiarStatus = false;
        refreshList();
      "
      :currentPedido="currentPedido"
    />

    <div class="flex flex-row mb-4 -mt-10 justify-evenly">
      <div class="flex flex-row">
        <datepicker
          v-model="fechaInicio"
          name="fechaInicio"
          input-class="w-24 p-2 font-bold text-center cursor-pointer rounded-l-xl focus:outline-none text-primary"
          :monday-first="true"
          :language="es"
          format="dd MMM"
          @input="retrievePedidos"
        />
        <datepicker
          v-model="fechaFin"
          name="fechaFin"
          input-class="w-24 p-2 font-bold text-center cursor-pointer rounded-r-xl focus:outline-none text-primary"
          :monday-first="true"
          :language="es"
          format="dd MMM"
          @input="retrievePedidos"
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Buscar Pedido..."
          class="input"
          v-model="buscador"
          @keyup.enter="buscarPedido"
        />
      </div>

      <button class="refresh-btn" @click="refreshList">
        <font-awesome-icon
          class="text-white group-hover:animate-spin"
          icon="sync-alt"
        />
      </button>

      <router-link
        to="/finanzas/comisiones"
        class="px-6 py-2 font-bold text-white bg-indigo-600 rounded-xl focus:outline-none hover:bg-indigo-500"
        custom
        v-slot="{ navigate }"
      >
        <span @click="navigate" role="link" class="text-center cursor-pointer"
          >Comisiones</span
        >
      </router-link>

      <router-link
        to="/finanzas/facturacion"
        class="px-6 py-2 font-bold text-white bg-secondary rounded-xl focus:outline-none hover:bg-info"
        custom
        v-slot="{ navigate }"
      >
        <span @click="navigate" role="link" class="text-center cursor-pointer"
          >Facturacion</span
        >
      </router-link>

      <router-link
        to="/finanzas/transferencias"
        class="px-6 py-2 font-bold text-white bg-secondary rounded-xl focus:outline-none hover:bg-info"
        custom
        v-slot="{ navigate }"
      >
        <span @click="navigate" role="link" class="text-center cursor-pointer"
          >Transferencias</span
        >
      </router-link>

      <router-link
        to="/finanzas/recaudos"
        class="px-6 py-2 font-bold text-white bg-secondary rounded-xl focus:outline-none hover:bg-info"
        custom
        v-slot="{ navigate }"
      >
        <span @click="navigate" role="link" class="text-center cursor-pointer"
          >Recaudos</span
        >
      </router-link>
    </div>

    <div class="grid grid-cols-10 gap-2">
      <div class="flex flex-row justify-center col-span-2">
        <p>
          <span class="resalta">Número de Pedidos:</span> {{ cantidadPedidos }}
        </p>
      </div>

      <div
        class="inline-grid items-center grid-cols-9 col-span-8 text-sm font-bold text-center text-primary"
      >
        <button @click="sortPorId" class="focus:outline-none">
          <p class="font-bold"># Pedido</p>
        </button>
        <div>
          <p class="font-bold">Cliente</p>
        </div>
        <button @click="sortPorOrigen" class="focus:outline-none">
          <p class="font-bold">Origen</p>
        </button>
        <div>
          <p class="font-bold">Consignado</p>
        </div>
        <button @click="sortPorDestino" class="focus:outline-none">
          <p class="font-bold">Destino</p>
        </button>
        <button @click="sortPorMobiker" class="focus:outline-none">
          <p class="font-bold">MoBiker</p>
        </button>
        <button @click="sortPorEstado" class="focus:outline-none">
          <p class="font-bold">Estado</p>
        </button>
        <button @click="sortPorFecha" class="focus:outline-none">
          <p class="font-bold">Fecha</p>
        </button>
        <div class="cursor-default">
          <p>Detalles</p>
        </div>
      </div>

      <div class="col-span-2 p-4 bg-white border border-black">
        <h2 class="mb-2 text-2xl font-bold text-primary">
          Cliente
        </h2>

        <ShowCliente :currentPedido="currentPedido" />
      </div>

      <div
        class="col-span-8 overflow-y-auto bg-white border border-black pedidos-scroll max-h-96"
      >
        <Loading v-if="loading" />

        <div
          v-else
          class="grid items-center h-auto grid-cols-9 py-2 text-xs text-center border-b-2 cursor-pointer gap-x-1 border-primary hover:bg-info"
          :class="{ 'bg-info text-white font-bold': pedido.id == currentIndex }"
          v-for="pedido in pedidosFiltrados"
          :key="pedido.id"
          @click="setActiveCliente(pedido, pedido.id)"
        >
          <div>
            <p>{{ pedido.id }}</p>
          </div>
          <div>
            <p>{{ pedido.empresaRemitente }}</p>
          </div>
          <div>
            <p v-if="pedido.rolCliente === 'Remitente'">
              {{ pedido.distritoRemitente }}
            </p>
            <p v-else>{{ pedido.distrito.distrito }}</p>
          </div>
          <div>
            <p>{{ pedido.contactoConsignado }}</p>
          </div>
          <div>
            <p v-if="pedido.rolCliente === 'Remitente'">
              {{ pedido.distrito.distrito }}
            </p>
            <p v-else>{{ pedido.distritoRemitente }}</p>
          </div>
          <div>
            <p>{{ pedido.mobiker.fullName }}</p>
          </div>
          <div>
            <p v-if="pedido.status.id === 1" class="tag-programado">
              {{ pedido.status.tag }}
            </p>
            <p v-if="pedido.status.id === 2" class="tag-recoger">
              {{ pedido.status.tag }}
            </p>
            <p v-if="pedido.status.id === 3" class="tag-transito">
              {{ pedido.status.tag }}
            </p>
            <p v-if="pedido.status.id === 4" class="tag-entregado">
              {{ pedido.status.tag }}
            </p>
            <p v-if="pedido.status.id === 5" class="tag-falso-flete">
              {{ pedido.status.tag }}
            </p>
            <p v-if="pedido.status.id === 6" class="tag-anulado">
              {{ pedido.status.tag }}
            </p>
          </div>
          <div>
            <p>{{ $date(pedido.fecha).format("DD MMM YYYY") }}</p>
          </div>

          <div class="flex justify-evenly">
            <button
              v-if="pedido.status.id !== 1"
              @click="showCambiarStatus = true"
              class="focus:outline-none"
              title="Estado del Pedido"
            >
              <font-awesome-icon class="text-2xl text-primary" icon="bicycle" />
            </button>

            <button class="focus:outline-none" @click="showDetalle = true">
              <font-awesome-icon
                class="text-2xl text-primary"
                icon="window-maximize"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <Pagination
      :page="page"
      :cantidadItems="cantidadPedidos"
      :pageSize="pageSize"
      @prevPageChange="
        page--;
        retrievePedidos();
      "
      @nextPageChange="
        page++;
        retrievePedidos();
      "
      @handlePageChange="handlePageChange"
    />
  </div>
</template>

<script>
import PedidoService from "@/services/pedido.service";
import DetalleHistorialPedido from "@/components/DetalleHistorialPedido";
import CambiarStatusPedido from "@/components/CambiarStatusPedido";
import Loading from "@/components/Loading";
import ShowCliente from "@/components/ShowCliente";
import Datepicker from "vuejs-datepicker";
import { es } from "vuejs-datepicker/dist/locale";
import Pagination from "@/components/Pagination.vue";

const seisDiasAtras = new Date().getTime() - 1000 * 60 * 60 * 24 * 6;

export default {
  name: "HistorialPedidos",
  components: {
    DetalleHistorialPedido,
    Datepicker,
    Pagination,
    CambiarStatusPedido,
    ShowCliente,
    Loading,
  },
  data() {
    return {
      pedidos: [],
      pedidosFiltrados: [],
      showDetalle: false,
      showCambiarStatus: false,
      currentPedido: null,
      currentIndex: -1,
      fechaInicio: new Date(seisDiasAtras),
      fechaFin: new Date(),
      buscador: "",

      loading: false,

      page: 1,
      cantidadPedidos: 0,
      pageSize: 200,
      es: es,
    };
  },
  mounted() {
    this.retrievePedidos();
  },
  methods: {
    getRequestParams(desde, hasta, page, pageSize) {
      let params = {};

      if (desde) {
        params["desde"] = desde;
      }

      if (hasta) {
        params["hasta"] = hasta;
      }

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },

    async buscarPedido() {
      try {
        this.loading = true;
        const response = await PedidoService.searchPedido(this.buscador);

        this.pedidosFiltrados = response.data;

        if (this.buscador.trim() === "") {
          this.pedidosFiltrados = this.pedidos;
        }
        this.loading = false;
      } catch (error) {
        console.error(`Error al buscar un Pedido. ${error.message}`);
      }
    },

    async retrievePedidos() {
      try {
        this.loading = true;
        const params = this.getRequestParams(
          this.$date(this.fechaInicio).format("YYYY-MM-DD"),
          this.$date(this.fechaFin).format("YYYY-MM-DD"),
          this.page,
          this.pageSize
        );

        const response = await PedidoService.historialPedidos(params);

        const { pedidos, totalPedidos } = response.data;
        this.pedidos = pedidos; // rows
        this.pedidosFiltrados = pedidos; // rows
        this.cantidadPedidos = totalPedidos; // count

        this.loading = false;
      } catch (error) {
        console.error(`Error al obtener Pedidos. ${error.message}`);
      }
    },

    handlePageChange(value) {
      this.page = value;
      this.retrievePedidos();
    },

    setActiveCliente(pedido, index) {
      this.currentPedido = pedido;
      this.currentIndex = index;
    },

    async refreshList() {
      await this.retrievePedidos();

      this.currentPedido = null;
      this.currentIndex = -1;
      this.buscador = "";
    },

    sortPorId() {
      this.pedidos.sort((a, b) => {
        return a.id > b.id ? 1 : -1;
      });
    },

    sortPorOrigen() {
      this.pedidos.sort((a, b) => {
        return a.distritoRemitente.toLowerCase() >
          b.distritoRemitente.toLowerCase()
          ? 1
          : -1;
      });
    },

    sortPorDestino() {
      this.pedidos.sort((a, b) => {
        return a.distrito.distrito.toLowerCase() >
          b.distrito.distrito.toLowerCase()
          ? 1
          : -1;
      });
    },

    sortPorMobiker() {
      this.pedidos.sort((a, b) => {
        return a.mobiker.fullName.toLowerCase() >
          b.mobiker.fullName.toLowerCase()
          ? 1
          : -1;
      });
    },

    sortPorEstado() {
      this.pedidos.sort((a, b) => {
        return a.status.tag.toLowerCase() > b.status.tag.toLowerCase() ? 1 : -1;
      });
    },

    sortPorFecha() {
      this.pedidos.sort((a, b) => {
        return a.fecha > b.fecha ? -1 : 1;
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
