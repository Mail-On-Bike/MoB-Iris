<template>
  <div
    v-if="showDetalle"
    class="absolute z-40 w-1/2 h-auto px-10 py-4 transform -translate-x-1/2 shadow-xl bg-primary top-12 left-1/2 rounded-xl"
  >
    <div class="absolute -top-4 -right-2">
      <button
        class="px-2 text-2xl text-white rounded-full bg-info hover:bg-secondary focus:outline-none"
        @click.prevent="cerrarDetalle"
      >
        <font-awesome-icon icon="times" />
      </button>
    </div>

    <div class="flex justify-center">
      <h1
        class="inline-block px-6 pt-1 text-2xl font-bold bg-white text-primary rounded-t-xl"
      >
        {{ mobiker.fullName }}
      </h1>
    </div>

    <div
      class="p-4 overflow-y-auto text-sm bg-white rounded-xl pedidos-scroll h-96 max-h-96"
      ref="comisiones"
    >
      <div v-for="detalle in detalles" :key="detalle.id">
        <span>
          {{ $date(detalle.fecha).format("DD/MM") }}: {{ detalle.id }} - [{{
            detalle.empresaRemitente.toUpperCase()
          }}] = {{ detalle.tarifa }}
          {{
            detalle.status.id === 5
              ? detalle.status.tag
              : detalle.formaPago.split(" ")[0]
          }}
        </span>
      </div>
      <br />
      <div>
        <span>Envíos E-commerce = {{ contarEcommerce }}</span>
        <div>Envíos Express = {{ contarExpress }}</div>
        <div>Total de envíos = {{ detalles.length }}</div>
        <br />
        <div>Tarifas E-commerce = {{ calcularTarifaEcommerce }}</div>
        <div>Tarifas Express = {{ calcularTarifaExpress }}</div>
        <div>
          Total de tarifas =
          {{ totalTarifa }}
        </div>
        <br />
        <div>Comisiones E-commerce = {{ calcularComisionEcommerce }}</div>
        <div>Comisiones Express = {{ calcularComisionExpress }}</div>
        <div>
          Total de comisiones =
          {{ totalComisiones }}
        </div>
        <br />
        <div>Pagos en Efectivo = {{ calcularPagosEfectivo }}</div>
        <div>
          Total a pagar =
          {{ totalPagar }}
        </div>
        <br />
        <div class="resalta">Mis Estadísticas:</div>
        <div>Mis BiciEnvíos = {{ mobiker.biciEnvios }}</div>
        <div>Mis Kilómetros = {{ mobiker.kilometros }}km</div>
        <div>CO2 Ahorrado = {{ mobiker.CO2Ahorrado }}kg</div>
        <div>Horas de Ruido Ahorrado = {{ mobiker.ruido }}h</div>
        <div>Mi nivel es: {{ mobiker.rango.rangoMoBiker }}</div>
      </div>
    </div>

    <div class="flex justify-center mt-4">
      <button
        v-if="reporteCopiado === false"
        class="px-4 py-2 font-bold text-white bg-secondary rounded-xl focus:outline-none hover:bg-info"
        @click="copiarReporte"
      >
        Copiar
      </button>

      <button
        v-else
        class="px-4 py-2 font-bold text-white bg-green-600 rounded-xl focus:outline-none hover:bg-green-500"
        @click="copiarReporte"
      >
        Copiado
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReporteComisiones",
  props: {
    showDetalle: {
      type: Boolean,
      required: true,
    },
    detalles: {
      type: Array,
    },
    mobiker: {
      type: Object,
    },
  },
  data() {
    return { reporteCopiado: false };
  },
  computed: {
    contarEcommerce() {
      let contadorEcommerce = 0;

      this.detalles.forEach((pedido) => {
        if (pedido.tipoDeEnvioId === 1) {
          contadorEcommerce++;
        }
      });

      return contadorEcommerce;
    },

    calcularTarifaEcommerce() {
      let tarifaEcommerce = 0;

      this.detalles.forEach((pedido) => {
        if (pedido.tipoDeEnvioId === 1) {
          tarifaEcommerce += pedido.tarifa;
        }
      });

      return +tarifaEcommerce.toFixed(2);
    },

    calcularComisionEcommerce() {
      let comisionEcommerce = 0;

      this.detalles.forEach((pedido) => {
        if (pedido.tipoDeEnvioId === 1) {
          comisionEcommerce += pedido.comision;
        }
      });

      return +comisionEcommerce.toFixed(2);
    },

    contarExpress() {
      let contadorExpress = 0;

      this.detalles.forEach((pedido) => {
        if (
          pedido.tipoDeEnvioId === 2 ||
          pedido.tipoDeEnvioId === 3 ||
          pedido.tipoDeEnvioId === 4
        ) {
          contadorExpress++;
        }
      });

      return contadorExpress;
    },

    calcularTarifaExpress() {
      let tarifaExpress = 0;

      this.detalles.forEach((pedido) => {
        if (
          pedido.tipoDeEnvioId === 2 ||
          pedido.tipoDeEnvioId === 3 ||
          pedido.tipoDeEnvioId === 4
        ) {
          tarifaExpress += pedido.tarifa;
        }
      });

      return +tarifaExpress.toFixed(2);
    },

    calcularComisionExpress() {
      let comisionExpress = 0;

      this.detalles.forEach((pedido) => {
        if (
          pedido.tipoDeEnvioId === 2 ||
          pedido.tipoDeEnvioId === 3 ||
          pedido.tipoDeEnvioId === 4
        ) {
          comisionExpress += pedido.comision;
        }
      });

      return +comisionExpress.toFixed(2);
    },

    calcularPagosEfectivo() {
      let pagoEfectivo = 0;

      this.detalles.forEach((pedido) => {
        if (
          pedido.formaPago === "Efectivo en Origen" ||
          pedido.formaPago === "Efectivo en Destino"
        ) {
          pagoEfectivo += pedido.tarifa;
        }
        // pagoEfectivo += pedido.recaudo;
      });

      return +pagoEfectivo.toFixed(2);
    },

    totalComisiones() {
      let total =
        parseFloat(this.calcularComisionEcommerce) +
        parseFloat(this.calcularComisionExpress);
      return +total.toFixed(2);
    },

    totalTarifa() {
      let total =
        parseFloat(this.calcularTarifaEcommerce) +
        parseFloat(this.calcularTarifaExpress);
      return +total.toFixed(2);
    },

    totalPagar() {
      let pagoPorComision =
        parseFloat(this.calcularComisionEcommerce) +
        parseFloat(this.calcularComisionExpress);
      let pagoPorEfectivo = parseFloat(this.calcularPagosEfectivo);
      let totalAPagar = pagoPorComision - pagoPorEfectivo;
      return +totalAPagar.toFixed(2);
    },
  },
  methods: {
    cerrarDetalle() {
      this.$emit("cerrarDetalle");
      this.reporteCopiado = false;
    },

    copiarReporte() {
      console.log(this.$refs.comisiones.innerText);
      this.$copyText(this.$refs.comisiones.innerText).then(() => {
        this.reporteCopiado = true;
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
