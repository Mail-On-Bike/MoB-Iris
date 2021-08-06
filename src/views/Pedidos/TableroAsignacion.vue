<template>
  <div class="w-full max-h-screen p-4 mt-10 bg-gray-100 rounded-xl">
    <div class="flex justify-end">
      <h1
        class="relative inline-block px-6 py-2 mb-4 text-2xl font-bold text-center bg-gray-100 text-primary rounded-xl -top-12"
      >
        Asignación de Pedidos
      </h1>
    </div>

    <div class="overlay" v-if="showDetalle || showResumen || showRuteo"></div>

    <DetallePedidoProgramado
      v-if="showDetalle"
      :showDetalle="showDetalle"
      @cerrarDetalle="closeModal"
      @refresh="refreshList"
      :pedidosArray="pedidosArray"
    />

    <ResumenPedido
      v-if="currentPedido"
      :showResumen="showResumen"
      @cerrarResumen="closeResumen"
      @marcarAsignar="marcarAsignar"
      :currentPedido="currentPedido"
    />

    <DetalleRuteo
      v-if="showRuteo"
      :currentRuta="currentRuta"
      @cerrarResumen="closeResumen"
      @asignarRuteo="marcarRuteo"
    />

    <div class="flex flex-row items-center mb-4 -mt-10 justify-evenly">
      <div class="flex flex-row">
        <datepicker
          v-model="fechaInicio"
          name="fechaInicio"
          input-class="w-20 p-2 mb-1 font-bold text-center cursor-pointer rounded-l-xl focus:outline-none text-primary"
          :monday-first="true"
          :language="es"
          format="dd MMM"
          @input="getPedidosAsignar"
        />
        <datepicker
          v-model="fechaFin"
          name="fechaFin"
          input-class="w-20 p-2 mb-1 font-bold text-center cursor-pointer rounded-r-xl focus:outline-none text-primary"
          :monday-first="true"
          :language="es"
          format="dd MMM"
          @input="getPedidosAsignar"
        />
      </div>

      <div>
        <input
          type="search"
          placeholder="Buscar Pedido..."
          class="input"
          v-model="buscador"
          @keyup="buscarPedido"
        />
      </div>

      <router-link
        to="/pedidos/tablero-pedidos"
        class="px-6 py-2 font-bold text-white bg-indigo-600 rounded-xl focus:outline-none hover:bg-indigo-500"
        custom
        v-slot="{ navigate }"
      >
        <span @click="navigate" role="link" class="text-center cursor-pointer"
          >Regresar a Pedidos</span
        >
      </router-link>

      <button class="h-10 refresh-btn" @click="refreshList">
        <font-awesome-icon
          class="text-white group-hover:animate-spin"
          icon="sync-alt"
        />
      </button>

      <button
        class="px-6 py-2 font-bold text-white bg-green-600 rounded-xl focus:outline-none hover:bg-green-500 disabled:opacity-90 disabled:bg-green-900"
        @click="createArrayPedidos"
        :disabled="emptyArray"
      >
        Asignar
      </button>

      <div class="flex flex-col items-center justify-center ">
        <label for="ruteos" class="resalta">Ruteos</label>
        <input id="ruteos" type="checkbox" v-model="ruteos" />
      </div>
    </div>

    <div class="grid grid-cols-5 gap-2">
      <div class="flex flex-row justify-center">
        <p v-if="pedidos">
          <span class="resalta">Pedidos por asignar:</span>
          {{ pedidosPorAsignar }}
        </p>
      </div>

      <div
        v-if="ruteos"
        class="inline-grid items-center grid-cols-8 col-span-4 text-sm font-bold text-center text-primary"
      >
        <p class="font-bold">Pedidos</p>
        <p class="font-bold">Cliente</p>
        <p class="font-bold">Origen</p>
        <p class="font-bold">MoBiker</p>
        <p class="font-bold">Estado</p>
        <p class="font-bold">Observaciones</p>
        <p class="font-bold">Fecha</p>
        <p class="font-bold">Asignar</p>
      </div>

      <div
        v-else
        class="inline-grid items-center grid-cols-10 col-span-4 text-sm font-bold text-center text-primary"
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
        <div>
          <p>Observaciones</p>
        </div>
        <button @click="sortPorFecha" class="focus:outline-none">
          <p class="font-bold">Fecha</p>
        </button>
        <div>
          <p>Asignar</p>
        </div>
      </div>
      <div
        class="overflow-y-auto bg-white border border-black max-h-96 h-96 pedidos-scroll"
      >
        <Loading v-if="loading" />
        <div
          v-else
          class="grid items-center grid-cols-3 px-2 text-sm text-center border-b-2 cursor-pointer gap-x-1 h-14 border-primary hover:bg-info"
          :class="{
            'bg-info text-white font-bold':
              mobiker.mobiker.id == currentIndexMobiker,
          }"
          v-for="mobiker in mobikersFiltrados"
          :title="
            `Dirección: ${mobiker.mobiker.direccion}, Distrito: ${mobiker.mobiker.distrito.distrito}
            Bicicleta: ${mobiker.mobiker.tipoBicicleta} - Equipo: ${mobiker.mobiker.equipo}`
          "
          :key="mobiker.id"
          @click="checkPedidosMobikers(mobiker.mobiker, mobiker.mobiker.id)"
        >
          <div class="col-span-2">
            {{ mobiker.mobiker.fullName }}
          </div>

          <div>
            {{ mobiker.cantidadPedidos }}
          </div>
        </div>
      </div>

      <div
        v-if="ruteos"
        class="col-span-4 overflow-y-auto bg-white border border-black pedidos-scroll max-h-96"
      >
        <Loading v-if="loading" />
        <div
          v-else
          class="grid items-center grid-cols-8 py-2 text-xs text-center border-b-2 cursor-pointer gap-x-1 h-14 border-primary hover:bg-info"
          :class="{
            'bg-info text-white font-bold': ruta.ruta.id == currentRutaIndex,
          }"
          v-for="ruta in ruteosFiltrados"
          :key="ruta.ruta.id"
        >
          <p @click="setActiveRuteo(ruta, ruta.ruta.id)">
            {{ ruta.pedidosRuta.length }}
          </p>

          <p @click="setActiveRuteo(ruta, ruta.ruta.id)">
            {{ ruta.pedidosRuta[0].empresaRemitente }}
          </p>

          <p @click="setActiveRuteo(ruta, ruta.ruta.id)">
            {{ ruta.pedidosRuta[0].distritoRemitente }}
          </p>

          <p @click="setActiveRuteo(ruta, ruta.ruta.id)">
            {{ ruta.pedidosRuta[0].mobiker.fullName }}
          </p>

          <div @click="setActiveRuteo(ruta, ruta.ruta.id)">
            <p
              v-if="ruta.pedidosRuta[0].status.id === 1"
              class="tag-programado"
            >
              {{ ruta.pedidosRuta[0].status.tag }}
            </p>
            <p v-if="ruta.pedidosRuta[0].status.id === 2" class="tag-recoger">
              {{ ruta.pedidosRuta[0].status.tag }}
            </p>
          </div>

          <div @click="setActiveRuteo(ruta, ruta.ruta.id)">
            <font-awesome-icon
              v-if="
                ruta.pedidosRuta[0].otroDatoRemitente ||
                  ruta.pedidosRuta[0].otroDatoConsignado
              "
              class="text-2xl font-bold text-red-500"
              icon="eye"
            />

            <p v-else></p>
          </div>

          <p @click="setActiveRuteo(ruta, ruta.ruta.id)">
            {{ $date(ruta.pedidosRuta[0].fecha).format("DD MMM YYYY") }}
          </p>

          <button
            @click="assignRuta(ruta.pedidosRuta)"
            class="focus:outline-none text-primary"
          >
            <font-awesome-icon
              v-if="!pedidosArray.includes(ruta.pedidosRuta[0])"
              class="text-2xl text-gray-400"
              icon="check-circle"
            />
            <font-awesome-icon v-else class="text-2xl" icon="check-circle" />
          </button>
        </div>
      </div>

      <div
        v-else
        class="col-span-4 overflow-y-auto bg-white border border-black pedidos-scroll max-h-96"
      >
        <Loading v-if="loading" />
        <div
          v-else
          class="grid items-center h-auto grid-cols-10 py-2 text-xs text-center border-b-2 cursor-pointer gap-x-1 border-primary hover:bg-info"
          :class="{
            'bg-info text-white font-bold': pedido.id == currentIndex,
          }"
          v-for="pedido in pedidosFiltrados"
          :key="pedido.id"
          :title="`Cliente: ${pedido.contactoRemitente}`"
        >
          <div @click="setActivePedido(pedido, pedido.id)">
            <p>{{ pedido.id }}</p>
          </div>

          <div @click="setActivePedido(pedido, pedido.id)">
            <p>{{ pedido.empresaRemitente }}</p>
          </div>

          <div @click="setActivePedido(pedido, pedido.id)">
            <p v-if="pedido.rolCliente === 'Remitente'">
              {{ pedido.distritoRemitente }}
            </p>
            <p v-else>{{ pedido.distrito.distrito }}</p>
          </div>

          <div @click="setActivePedido(pedido, pedido.id)">
            <p
              v-if="
                pedido.contactoConsignado.toLowerCase() === 'mesa de partes'
              "
            >
              {{ pedido.empresaConsignado }}
            </p>
            <p v-else>{{ pedido.contactoConsignado }}</p>
          </div>

          <div @click="setActivePedido(pedido, pedido.id)">
            <p v-if="pedido.rolCliente === 'Remitente'">
              {{ pedido.distrito.distrito }}
            </p>
            <p v-else>{{ pedido.distritoRemitente }}</p>
          </div>

          <div @click="setActivePedido(pedido, pedido.id)">
            <p>{{ pedido.mobiker.fullName }}</p>
          </div>

          <div @click="setActivePedido(pedido, pedido.id)">
            <p v-if="pedido.status.id === 1" class="tag-programado">
              {{ pedido.status.tag }}
            </p>
            <p v-if="pedido.status.id === 2" class="tag-recoger">
              {{ pedido.status.tag }}
            </p>
          </div>

          <div @click="setActivePedido(pedido, pedido.id)">
            <font-awesome-icon
              v-if="pedido.otroDatoRemitente || pedido.otroDatoConsignado"
              class="text-2xl font-bold text-red-500"
              icon="eye"
            />

            <p v-else></p>
          </div>

          <div @click="setActivePedido(pedido, pedido.id)">
            <p>{{ $date(pedido.fecha).format("DD MMM YYYY") }}</p>
          </div>

          <button
            @click="assignPedido(pedido)"
            class="focus:outline-none text-primary"
          >
            <font-awesome-icon
              v-if="!pedidosArray.includes(pedido)"
              class="text-2xl text-gray-400"
              icon="check-circle"
            />
            <font-awesome-icon v-else class="text-2xl" icon="check-circle" />
          </button>
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
import MobikerService from "@/services/mobiker.service";
import DetallePedidoProgramado from "@/components/DetallePedidoProgramado.vue";
import ResumenPedido from "@/components/ResumenPedido.vue";
import DetalleRuteo from "@/components/DetalleRuteo.vue";
import Datepicker from "vuejs-datepicker";
import Pagination from "@/components/Pagination.vue";
import Loading from "@/components/Loading";
import { es } from "vuejs-datepicker/dist/locale";

// const seisDiasAtras = new Date().getTime() - 1000 * 60 * 60 * 24 * 6;
const manana = new Date().getTime() + 1000 * 60 * 60 * 24;

export default {
  name: "Pedidos",
  components: {
    DetallePedidoProgramado,
    Datepicker,
    Pagination,
    ResumenPedido,
    DetalleRuteo,
    Loading,
  },
  data() {
    return {
      pedidos: [],
      pedidosFiltrados: [],
      ruteosFiltrados: [],
      totalRuteos: 0,
      pedidosMobiker: [],
      mobikersFiltrados: [],
      showDetalle: false,
      showResumen: false,
      showRuteo: false,
      currentIndexMobiker: -1,
      currentPedido: null,
      currentIndex: -1,
      currentRuta: null,
      currentRutaIndex: -1,
      fechaInicio: new Date(),
      fechaFin: new Date(manana),
      pedidosPorAsignar: 0,
      pedidosArray: [],
      ruteos: false,
      loading: false,

      buscador: "",

      page: 1,
      cantidadPedidos: 0,
      pageSize: 200,
      es: es,
    };
  },
  mounted() {
    this.retrievePedidos();
    this.retrieveRuteos();
    this.retrieveMobikers();
  },
  computed: {
    emptyArray() {
      if (this.pedidosArray.length === 0) {
        return true;
      } else {
        return false;
      }
    },
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

    async retrieveMobikers() {
      try {
        this.loading = true;
        const params = {
          desde: this.$date(this.fechaInicio).format("YYYY-MM-DD"),
          hasta: this.$date(this.fechaFin).format("YYYY-MM-DD"),
        };

        const response = await MobikerService.getMobikersConPedidos(params);
        this.mobikersFiltrados = response.data.sort((a, b) => {
          return a.cantidadPedidos - b.cantidadPedidos;
        });
        this.loading = false;
      } catch (error) {
        console.error(
          `Error al obtener MoBikers con Pedidos: ${error.message}`
        );
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

        const response = await PedidoService.searchPedidoProgramado(params);
        const { pedidos, totalPedidos } = response.data;
        this.pedidos = pedidos; // rows
        this.pedidosFiltrados = pedidos
          .filter(
            (pedido) =>
              (pedido.statusId === 1 || pedido.statusId === 2) &&
              pedido.isRuteo === false
          )
          .sort((a, b) => {
            return a.statusId > b.statusId ? 1 : -1;
          }); // rows
        this.pedidosMobiker = pedidos
          .filter((pedido) => pedido.statusId === 1 || pedido.statusId === 2)
          .sort((a, b) => {
            return a.statusId > b.statusId ? 1 : -1;
          });
        this.cantidadPedidos = totalPedidos; // count
        this.pedidosPorAsignar = pedidos.filter(
          (pedido) =>
            pedido.statusId === 1 &&
            pedido.mobiker.fullName === "Asignar MoBiker"
        ).length;
        this.loading = false;
      } catch (error) {
        console.error(`Error al obtener los Pedidos: ${error.message}`);
      }
    },

    async retrieveRuteos() {
      try {
        this.loading = true;
        const params = {
          desde: this.$date(this.fechaInicio).format("YYYY-MM-DD"),
          hasta: this.$date(this.fechaFin).format("YYYY-MM-DD"),
        };

        const response = await PedidoService.getRuteos(params);
        const { pedidos, totalPedidos } = response.data;
        this.ruteosFiltrados = pedidos
          .filter(
            (pedido) =>
              pedido.pedidosRuta[0].statusId === 1 ||
              pedido.pedidosRuta[0].statusId === 2
          )
          .sort((a, b) => {
            return a.pedidosRuta[0].statusId > b.pedidosRuta[0].statusId
              ? 1
              : -1;
          });
        this.totalRuteos = totalPedidos;
        this.loading = false;
      } catch (error) {
        console.error(`Error al obtener los Ruteos: ${error.message}`);
      }
    },

    async getPedidosAsignar() {
      this.loading = true;
      await this.retrievePedidos();
      await this.retrieveRuteos();
      await this.retrieveMobikers();
      this.loading = false;
    },

    checkPedidosMobikers(mobiker, index) {
      this.buscador = mobiker.fullName;
      this.currentIndexMobiker = index;

      this.buscarPedido();
    },

    buscarPedido() {
      this.loading = true;
      this.pedidosFiltrados = this.pedidos
        .filter((pedido) => {
          if (
            pedido.contactoRemitente
              .toLowerCase()
              .includes(this.buscador.toLowerCase()) ||
            pedido.id.toString().includes(this.buscador.toLowerCase()) ||
            pedido.mobiker.fullName
              .toLowerCase()
              .includes(this.buscador.toLowerCase())
          ) {
            return pedido;
          }
        })
        .filter(
          (pedido) =>
            (pedido.statusId === 1 || pedido.statusId === 2) &&
            pedido.isRuteo === false
        );

      if (this.buscador.trim() === "") {
        this.pedidosFiltrados = this.pedidos.filter(
          (pedido) =>
            (pedido.statusId === 1 || pedido.statusId === 2) &&
            pedido.isRuteo === false
        );
      }
      this.loading = false;
    },

    handlePageChange(value) {
      this.page = value;
      this.retrievePedidos();
    },

    setActivePedido(pedido, index) {
      this.currentPedido = pedido;
      this.currentIndex = index;

      this.showResumen = true;
    },

    setActiveRuteo(ruta, index) {
      this.currentRuta = ruta;
      this.currentRutaIndex = index;

      this.showRuteo = true;
    },

    assignPedido(pedido) {
      if (this.pedidosArray.includes(pedido)) {
        this.pedidosArray = this.pedidosArray.filter((item) => item !== pedido);
      } else {
        this.pedidosArray.push(pedido);
      }
    },

    assignRuta(pedidos) {
      if (this.pedidosArray.includes(pedidos[0])) {
        this.pedidosArray = this.pedidosArray.filter(
          (pedido) => !pedidos.includes(pedido)
        );
      } else {
        this.pedidosArray = [...this.pedidosArray, ...pedidos];
      }
    },

    createArrayPedidos() {
      this.showDetalle = true;
    },

    closeModal() {
      this.showDetalle = false;
      this.showResumen = false;
      this.pedidosArray = [];

      this.currentPedido = null;
      this.currentIndex = -1;

      this.currentRuta = null;
      this.currentRutaIndex = -1;
    },

    closeResumen() {
      this.showDetalle = false;
      this.showResumen = false;
      this.showRuteo = false;
      this.pedidosArray = [];

      this.currentPedido = null;
      this.currentIndex = -1;

      this.currentRuta = null;
      this.currentRutaIndex = -1;
    },

    marcarAsignar() {
      this.showResumen = false;
      this.pedidosArray.push(this.currentPedido);
    },

    marcarRuteo() {
      this.showRuteo = false;
      this.assignRuta(this.currentRuta.pedidosRuta);
    },

    refreshList() {
      this.buscador = "";
      this.retrievePedidos();
      this.retrieveRuteos();
      this.retrieveMobikers();

      this.currentPedido = null;
      this.currentIndex = -1;
      this.currentIndexMobiker = -1;
      this.currentRuta = null;
      this.currentRutaIndex = -1;
      this.pedidosArray = [];
    },

    sortPorId() {
      this.pedidosFiltrados.sort((a, b) => {
        return a.id > b.id ? 1 : -1;
      });
    },

    sortPorOrigen() {
      this.pedidosFiltrados.sort((a, b) => {
        return a.distritoRemitente.toLowerCase() >
          b.distritoRemitente.toLowerCase()
          ? 1
          : -1;
      });
    },

    sortPorDestino() {
      this.pedidosFiltrados.sort((a, b) => {
        return a.distrito.distrito.toLowerCase() >
          b.distrito.distrito.toLowerCase()
          ? 1
          : -1;
      });
    },

    sortPorMobiker() {
      this.pedidosFiltrados.sort((a, b) => {
        return a.mobiker.fullName.toLowerCase() >
          b.mobiker.fullName.toLowerCase()
          ? 1
          : -1;
      });
    },

    sortPorEstado() {
      this.pedidosFiltrados.sort((a, b) => {
        return a.status.tag.toLowerCase() > b.status.tag.toLowerCase() ? 1 : -1;
      });
    },

    sortPorFecha() {
      this.pedidosFiltrados.sort((a, b) => {
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
