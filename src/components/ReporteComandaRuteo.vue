<template>
  <div
    class="absolute z-40 w-1/2 px-10 py-4 transform -translate-x-1/2 shadow-xl bg-primary top-12 left-1/2 rounded-xl"
  >
    <div class="absolute -top-4 -right-2">
      <button
        class="px-2 text-2xl text-white rounded-full bg-info hover:bg-secondary focus:outline-none"
        @click.prevent="cerrarComanda"
      >
        <font-awesome-icon icon="times" />
      </button>
    </div>

    <div class="flex justify-center">
      <h1
        class="inline-block px-6 pt-1 text-2xl font-bold bg-white text-primary rounded-t-xl"
      >
        Ruta
        <span class="text-red-500">{{
          currentRuta.ruta.id.split("-")[0]
        }}</span>
      </h1>
    </div>

    <div class="justify-center bg-white rounded-xl">
      <!-- Texto formateado como mensaje de Telegram a copiar -->
      <div class="hidden" ref="comanda">
        <MensajeComandaRuteo
          v-if="currentRuta"
          :currentRuta="currentRuta.pedidosRuta"
        />
      </div>

      <!-- Texto de ejemplo para que el operador confirme la comanda -->
      <!-- Caso Remitente -->
      <div v-if="currentRuta.pedidosRuta[0].rolCliente === 'Remitente'">
        <div class="p-4 text-sm border-b-2 border-secondary">
          <div>
            <span class="resalta">Tipo Envío: </span
            >{{
              formatearTipoEnvio(currentRuta.pedidosRuta[0].tipoDeEnvio.tipo)
            }}
          </div>
          <div>
            <span class="resalta">
              Origen:
            </span>
            {{ currentRuta.pedidosRuta[0].direccionRemitente }} -
            {{ currentRuta.pedidosRuta[0].distritoRemitente }}
          </div>
          <div>
            <span class="resalta">Empresa: </span
            >{{ currentRuta.pedidosRuta[0].empresaRemitente }}
          </div>
          <div>
            <span class="resalta">
              Contacto:
            </span>
            {{ currentRuta.pedidosRuta[0].contactoRemitente }} -
            {{ currentRuta.pedidosRuta[0].telefonoRemitente }}
          </div>
          <div v-if="currentRuta.pedidosRuta[0].otroDatoRemitente !== null">
            <span class="resalta">IMPORTANTE: </span
            >{{ currentRuta.pedidosRuta[0].otroDatoRemitente }}
          </div>
          <br />
          <div class="resalta">
            {{ currentRuta.pedidosRuta.length }} DESTINOS
          </div>
          <div>
            <span class="resalta">Llevar:</span>
            {{ currentRuta.pedidosRuta[0].tipoCarga }}
          </div>

          <div>
            <span class="resalta">Tarifa:</span>
            S/. {{ sumarTarifas(currentRuta.pedidosRuta) }}
          </div>
          <div>
            <span class="resalta">Recaudo:</span>
            S/. {{ sumarRecaudos(currentRuta.pedidosRuta) }}
          </div>
          <div>
            <span class="resalta">Trámite:</span>
            S/. {{ sumarTramites(currentRuta.pedidosRuta) }}
          </div>
          <div>
            <span class="resalta">Comisión:</span>
            S/. {{ sumarComisiones(currentRuta.pedidosRuta) }}
          </div>
          <div>
            <span class="resalta">CO2:</span>
            {{ sumarCO2(currentRuta.pedidosRuta) }} Kg
          </div>
          <div>
            <span class="resalta">Horas de Ruido:</span>
            {{ sumarHorasRuido(currentRuta.pedidosRuta) }} h
          </div>
        </div>

        <div class="px-10 py-4 overflow-y-auto text-sm max-h-52">
          <div v-for="(destino, idx) in currentRuta.pedidosRuta" :key="idx">
            <div class="resalta">Destino {{ idx + 1 }}</div>

            <div>
              <span class="resalta">Modalidad: </span
              >{{ destino.modalidad.tipo }}
            </div>

            <div>
              <span class="resalta">Tarifa: </span> S./ {{ destino.tarifa }} -
              {{ formatearFormaPago(destino.formaPago) }}
            </div>

            <div>
              <span class="resalta">Comisión: </span>
              {{ destino.comision }}
            </div>

            <div>
              <span class="resalta">Contacto: </span>
              {{ destino.contactoConsignado }}
            </div>

            <div>
              <span class="resalta">Dirección: </span>
              {{ destino.direccionConsignado }} -
              {{ destino.distrito.distrito }}
            </div>

            <div v-if="destino.empresaConsignado">
              <span class="resalta">Empresa: </span>
              {{ destino.empresaConsignado }}
            </div>

            <div>
              <span class="resalta">Teléfono: </span>
              {{ destino.telefonoConsignado }}
            </div>

            <div v-if="destino.otroDatoConsignado">
              <span class="resalta">IMPORTANTE: </span
              >{{ destino.otroDatoConsignado }}
            </div>

            <div v-if="destino.recaudo">
              <span class="resalta">Recaudo: </span>
              S/. {{ destino.recaudo }}
            </div>
            <br />
          </div>
        </div>
      </div>

      <!-- Caso Destinatario -->
      <div v-else>
        <div class="p-4 text-sm border-b-2 border-secondary">
          <div>
            <span class="resalta">Tipo Envío: </span
            >{{
              formatearTipoEnvio(currentRuta.pedidosRuta[0].tipoDeEnvio.tipo)
            }}
          </div>
          <div>
            <span class="resalta">
              Destino:
            </span>
            {{ currentRuta.pedidosRuta[0].direccionRemitente }} -
            {{ currentRuta.pedidosRuta[0].distritoRemitente }}
          </div>
          <div>
            <span class="resalta">Empresa: </span
            >{{ currentRuta.pedidosRuta[0].empresaRemitente }}
          </div>
          <div>
            <span class="resalta">
              Contacto:
            </span>
            {{ currentRuta.pedidosRuta[0].contactoRemitente }} -
            {{ currentRuta.pedidosRuta[0].telefonoRemitente }}
          </div>
          <div v-if="currentRuta.pedidosRuta[0].otroDatoRemitente !== null">
            <span class="resalta">IMPORTANTE: </span
            >{{ currentRuta.pedidosRuta[0].otroDatoRemitente }}
          </div>
          <br />
          <div class="resalta">
            {{ currentRuta.pedidosRuta.length }} ORÍGENES
          </div>
          <div>
            <span class="resalta">Llevar:</span>
            {{ currentRuta.pedidosRuta[0].tipoCarga }}
          </div>

          <div>
            <span class="resalta">Tarifa:</span>
            S/. {{ sumarTarifas(currentRuta.pedidosRuta) }}
          </div>
          <div>
            <span class="resalta">Recaudo:</span>
            S/. {{ sumarRecaudos(currentRuta.pedidosRuta) }}
          </div>
          <div>
            <span class="resalta">Trámite:</span>
            S/. {{ sumarTramites(currentRuta.pedidosRuta) }}
          </div>
          <div>
            <span class="resalta">Comisión:</span>
            S/. {{ sumarComisiones(currentRuta.pedidosRuta) }}
          </div>
          <div>
            <span class="resalta">CO2:</span>
            {{ sumarCO2(currentRuta.pedidosRuta) }} Kg
          </div>
          <div>
            <span class="resalta">Horas de Ruido:</span>
            {{ sumarHorasRuido(currentRuta.pedidosRuta) }} h
          </div>
        </div>

        <div class="px-10 py-4 overflow-y-auto text-sm max-h-52">
          <div v-for="(destino, idx) in currentRuta.pedidosRuta" :key="idx">
            <div class="resalta">Origen {{ idx + 1 }}</div>

            <div>
              <span class="resalta">Modalidad: </span
              >{{ destino.modalidad.tipo }}
            </div>

            <div>
              <span class="resalta">Tarifa: </span> S./ {{ destino.tarifa }} -
              {{ formatearFormaPago(destino.formaPago) }}
            </div>

            <div>
              <span class="resalta">Comisión: </span>
              {{ destino.comision }}
            </div>

            <div>
              <span class="resalta">Contacto: </span>
              {{ destino.contactoConsignado }}
            </div>

            <div>
              <span class="resalta">Dirección: </span>
              {{ destino.direccionConsignado }} -
              {{ destino.distrito.distrito }}
            </div>

            <div v-if="destino.empresaConsignado">
              <span class="resalta">Empresa: </span>
              {{ destino.empresaConsignado }}
            </div>

            <div>
              <span class="resalta">Teléfono: </span>
              {{ destino.telefonoConsignado }}
            </div>

            <div v-if="destino.otroDatoConsignado">
              <span class="resalta">IMPORTANTE: </span
              >{{ destino.otroDatoConsignado }}
            </div>

            <div v-if="destino.recaudo">
              <span class="resalta">Recaudo: </span>
              S/. {{ destino.recaudo }}
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-4">
      <button
        v-if="comandaCopiada === false"
        class="px-4 py-2 font-bold text-white bg-secondary rounded-xl focus:outline-none hover:bg-info"
        @click="copiarComanda"
      >
        Copiar
      </button>

      <button
        v-else
        class="px-4 py-2 font-bold text-white bg-green-600 rounded-xl focus:outline-none hover:bg-green-500"
        @click="copiarComanda"
      >
        Copiado
      </button>
    </div>
  </div>
</template>

<script>
import MensajeComandaRuteo from "./MensajeComandaRuteo.vue";

export default {
  props: {
    currentRuta: {
      type: Object,
    },
  },
  components: { MensajeComandaRuteo },
  data() {
    return {
      comandaCopiada: false,
    };
  },
  methods: {
    cerrarComanda() {
      this.comandaCopiada = false;
      this.$emit("cerrarComanda");
    },

    copiarComanda() {
      console.log(this.$refs.comanda.innerText);
      this.$copyText(this.$refs.comanda.innerText).then(() => {
        this.comandaCopiada = true;
        console.log("Texto copiado");
      });
    },

    formatearFormaPago(pago) {
      let nuevaFormaPago;

      let compararPago = pago.split(" ")[0];

      if (compararPago === "Crédito") {
        nuevaFormaPago = "Crédito";
      } else {
        nuevaFormaPago = pago;
      }

      return nuevaFormaPago;
    },

    formatearTipoEnvio(envio) {
      let nuevoTipoEnvio;

      if (envio === "EmpresaG" || envio === "Persona") {
        nuevoTipoEnvio = "Express";
      } else {
        nuevoTipoEnvio = envio;
      }

      return nuevoTipoEnvio;
    },

    sumarTarifas(pedidos) {
      const total = pedidos.reduce((acc, tarifa) => +tarifa.tarifa + acc, 0);

      return +total.toFixed(2);
    },

    sumarRecaudos(pedidos) {
      const total = pedidos.reduce((acc, recaudo) => +recaudo.recaudo + acc, 0);

      return +total.toFixed(2);
    },

    sumarTramites(pedidos) {
      const total = pedidos.reduce((acc, tramite) => +tramite.tramite + acc, 0);

      return +total.toFixed(2);
    },

    sumarComisiones(comisiones) {
      const total = comisiones.reduce(
        (acc, comision) => +comision.comision + acc,
        0
      );

      return +total.toFixed(2);
    },

    sumarCO2(emisiones) {
      const total = emisiones.reduce(
        (acc, emision) => +emision.CO2Ahorrado + acc,
        0
      );

      return +total.toFixed(1);
    },

    sumarHorasRuido(horas) {
      const total = horas.reduce((acc, hora) => +hora.ruido + acc, 0);

      return +total.toFixed(1);
    },
  },
};
</script>
