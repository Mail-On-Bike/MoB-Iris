<template>
  <div class="p-4 mx-auto my-12 bg-gray-100 shadow-lg rounded-xl">
    <div class="flex justify-end">
      <h1
        class="relative inline-block px-6 py-2 mb-4 text-2xl font-bold text-center bg-gray-100 text-primary rounded-xl -top-12"
      >
        Nuevo Pedido
      </h1>
    </div>

    <div class="flex flex-row justify-around px-4 mx-auto -mt-12">
      <div>
        <button
          class="relative px-4 py-1 font-bold text-white bg-primary rounded-xl focus:outline-none"
          @click="showBuscador = true"
        >
          Buscar cliente
        </button>
      </div>

      <div>
        <button
          class="relative px-4 py-1 font-bold text-white bg-primary rounded-xl focus:outline-none"
          @click="showBuscadorDestinos = true"
        >
          Destinos Recurrentes
        </button>
      </div>

      <div class="overlay" v-if="showBuscador || showBuscadorDestinos"></div>

      <BuscadorCliente
        :showBuscador="showBuscador"
        @cerrarBuscador="showBuscador = false"
        @activarCliente="activarCliente"
      />

      <BuscadorDestino
        :showBuscadorDestinos="showBuscadorDestinos"
        @cerrarBuscador="showBuscadorDestinos = false"
        @activarDestino="activarDestino"
      />
    </div>

    <form class="h-full p-2 mt-2" autocomplete="off" ref="pedido">
      <div class="grid h-full grid-cols-2">
        <div class="px-1 text-3xl font-bold text-center text-primary">
          <h2 v-if="nuevoPedido.rolCliente === 'Destinatario'">
            Destino
          </h2>
          <h2 v-else>Origen</h2>
        </div>

        <div class="px-1 text-3xl font-bold text-center text-primary">
          <h2 v-if="nuevoPedido.rolCliente === 'Destinatario'">Origen</h2>
          <h2 v-else>Destino</h2>
        </div>

        <!-- FORMULARIO ORIGEN -->
        <div class="grid grid-cols-3 gap-2 p-2 border-r-2 border-secondary">
          <div>
            <button
              class="w-full py-2 mt-5 font-bold text-white rounded bg-secondary focus:outline-none"
              @click="asignarHoy()"
              type="button"
            >
              Para hoy
            </button>
          </div>

          <div>
            <button
              class="w-full py-2 mt-5 font-bold text-white rounded bg-secondary focus:outline-none"
              @click="asignarMañana()"
              type="button"
            >
              Para mañana
            </button>
          </div>

          <div>
            <label for="fecha" class="block ml-1 text-sm font-bold text-primary"
              >Fecha Seleccionada</label
            >
            <datepicker
              v-model="nuevoPedido.fecha"
              v-validate="'required'"
              name="fecha"
              input-class="input"
              :monday-first="true"
              placeholder="Fecha del Pedido"
              format="dd MMMM yyyy"
              :language="es"
            />
            <div
              v-if="errors.has('fecha')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>La fecha es requerida</p>
            </div>
          </div>

          <div>
            <label for="contactoRemitente" class="label-input">Contacto</label>
            <input
              v-model="nuevoPedido.contactoRemitente"
              type="text"
              v-validate="'required'"
              name="contactoRemitente"
              class="input"
            />
            <div
              v-if="errors.has('contactoRemitente')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>El contacto del cliente es requerido</p>
            </div>
          </div>

          <div>
            <label for="empresaRemitente" class="label-input">Empresa</label>
            <input
              v-model="nuevoPedido.empresaRemitente"
              type="text"
              v-validate="'required'"
              name="empresaRemitente"
              class="input"
              :disabled="true"
            />
            <div
              v-if="errors.has('empresaRemitente')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>La empresa del cliente es requerida</p>
            </div>
          </div>

          <div>
            <label
              for="telefonoRemitente"
              class="mb-1 ml-1 text-sm font-bold text-primary"
              >Teléfono</label
            >
            <input
              v-model="nuevoPedido.telefonoRemitente"
              type="string"
              v-validate="'required|min:6|max:12'"
              name="telefonoRemitente"
              class="input"
            />
            <div
              v-if="errors.has('telefonoRemitente')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>El teléfono es requerido y tener máximo 9 números</p>
            </div>
          </div>

          <div class="col-span-2 ">
            <label for="direccionRemitente" class="label-input"
              >Dirección</label
            >
            <input
              v-model="nuevoPedido.direccionRemitente"
              type="text"
              v-validate="'required'"
              name="direccionRemitente"
              class="input"
            />
            <div
              v-if="errors.has('direccionRemitente') || errorCalcularDistancia"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>La dirección es requerida</p>
            </div>
          </div>

          <div>
            <label for="distritoRemitente" class="label-input">Distrito</label>
            <model-list-select
              name="distritoRemitente"
              v-model="nuevoPedido.distritoRemitente"
              v-validate="'required'"
              placeholder="Buscar distrito..."
              class="w-full"
              :list="distritos"
              option-text="distrito"
              option-value="distrito"
            />
            <div
              v-if="errors.has('distritoRemitente') || errorCalcularDistancia"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>El distrito es requerido</p>
            </div>
          </div>

          <div class="col-span-3">
            <label for="otroDatoRemitente" class="label-input">Otro Dato</label>
            <input
              v-model="nuevoPedido.otroDatoRemitente"
              type="text"
              class="input"
            />
          </div>

          <div>
            <label for="formaPago" class="label-input">Forma de pago</label>
            <model-list-select
              name="formaPago"
              v-model="nuevoPedido.formaPago"
              class="w-full"
              v-validate="'required'"
              :list="formasDePago"
              option-text="pago"
              option-value="pago"
            />
            <div
              v-if="errors.has('formaPago')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>La forma de pago es requerida</p>
            </div>
          </div>

          <div>
            <label for="tarifa" class="label-input">Tarifa</label>
            <input
              v-model.number="nuevoPedido.tarifa"
              type="number"
              v-validate="'required'"
              name="tarifa"
              class="input"
              min="0"
            />
            <div
              v-if="errors.has('tarifa')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>La tarifa es requerida</p>
            </div>
          </div>

          <div>
            <label for="tarifaSugerida" class="label-input"
              >Tarifa Sugerida</label
            >
            <p class="w-full h-10 p-2 bg-white rounded tex-gray-700">
              {{ nuevoPedido.tarifaSugerida }}
            </p>
          </div>

          <div class="col-span-2">
            <label for="tipoCarga" class="label-input">Tipo de Carga</label>
            <model-list-select
              name="tipoCarga"
              v-model="nuevoPedido.tipoCarga"
              :list="tiposDeCarga"
              v-validate="'required'"
              option-text="tipo"
              option-value="tipo"
            />
            <div
              v-if="errors.has('tipoCarga')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>El tipo de carga es requerido</p>
            </div>
          </div>

          <div>
            <label for="rol" class="label-input">Rol</label>
            <model-list-select
              name="rolCliente"
              :list="rolCliente"
              v-model="nuevoPedido.rolCliente"
              v-validate="'required'"
              option-text="rol"
              option-value="rol"
            />
            <div
              v-if="errors.has('rolCliente')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>El rol del cliente es requerido</p>
            </div>
          </div>
        </div>

        <!-- FORMULARIO DESTINO -->
        <div class="grid grid-cols-3 gap-2 p-2">
          <div>
            <label for="tipoEnvio" class="label-input">Tipo de Envío</label>
            <model-list-select
              name="tipoEnvio"
              v-model="nuevoPedido.tipoEnvio"
              v-validate="'required'"
              :list="tiposDeEnvio"
              option-text="tipo"
              option-value="tipo"
            />
            <div
              v-if="errors.has('tipoEnvio')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>El tipo de Envío es requerido</p>
            </div>
          </div>

          <div>
            <label for="modalidad" class="label-input">Modalidad</label>
            <model-list-select
              name="modalidad"
              v-model="nuevoPedido.modalidad"
              v-validate="'required'"
              :list="modalidades"
              option-text="tipo"
              option-value="tipo"
            />
            <div
              v-if="errors.has('modalidad')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>La modalidad es requerida</p>
            </div>
          </div>

          <div>
            <label for="status" class="label-input">Estado del Pedido</label>
            <model-list-select
              name="status"
              v-model="nuevoPedido.status"
              :list="statusDelPedido"
              v-validate="'required'"
              option-text="tag"
              option-value="id"
            />
          </div>

          <div>
            <label for="contactoConsignado" class="label-input">Contacto</label>
            <input
              v-model="nuevoPedido.contactoConsignado"
              type="text"
              v-validate="'required'"
              name="contactoConsignado"
              class="input"
            />
            <div
              v-if="errors.has('contactoConsignado')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>El contacto es requerido</p>
            </div>
          </div>

          <div>
            <label for="empresaConsignado" class="label-input">Empresa</label>
            <input
              v-model="nuevoPedido.empresaConsignado"
              type="text"
              name="empresaConsignado"
              class="input"
            />
          </div>

          <div>
            <label for="telefonoConsignado" class="label-input">Teléfono</label>
            <input
              v-model="nuevoPedido.telefonoConsignado"
              type="string"
              v-validate="'required|min:6|max:12'"
              name="telefonoConsignado"
              class="input"
            />
            <div
              v-if="errors.has('telefonoConsignado')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>El telefono es requerido y debe tener máximo 9 números</p>
            </div>
          </div>

          <div class="col-span-2">
            <label for="direccionConsignado" class="label-input"
              >Dirección</label
            >
            <input
              v-model="nuevoPedido.direccionConsignado"
              type="text"
              v-validate="'required'"
              name="direccionConsignado"
              class="input"
            />
            <div
              v-if="errors.has('direccionConsignado') || errorCalcularDistancia"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>La dirección es requerida</p>
            </div>
          </div>

          <div>
            <label for="distritoConsignado" class="label-input">Distrito</label>
            <model-list-select
              name="distritoConsignado"
              v-model="nuevoPedido.distritoConsignado"
              placeholder="Buscar distrito..."
              v-validate="'required'"
              :list="distritos"
              option-text="distrito"
              option-value="distrito"
            />
            <div
              v-if="errors.has('distritoConsignado') || errorCalcularDistancia"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>El distrito es requerido</p>
            </div>
          </div>

          <div class="col-span-3">
            <label for="otroDatoConsignado" class="label-input"
              >Otro Dato</label
            >
            <input
              v-model="nuevoPedido.otroDatoConsignado"
              type="text"
              class="input"
            />
          </div>

          <div>
            <label for="comision" class="label-input">Comisión</label>
            <p class="w-full h-10 p-2 bg-white rounded tex-gray-700">
              {{ nuevoPedido.comision }}
            </p>
          </div>

          <div>
            <label for="mobiker" class="label-input">Mobiker</label>
            <model-list-select
              name="mobiker"
              v-model="nuevoPedido.mobiker"
              placeholder="Buscar distrito..."
              :list="mobikersFiltrados"
              v-validate="'required'"
              option-text="fullName"
              option-value="fullName"
            />
            <div
              v-if="errors.has('mobiker') || errorCalcularDistancia"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>El MoBiker es requerido</p>
            </div>
          </div>

          <div class="text-center">
            <button
              class="p-2 mt-6 font-bold text-white bg-primary rounded-xl focus:outline-none"
              @click.prevent="calcularDistancia"
            >
              Calcular distancia
            </button>
          </div>

          <div>
            <label for="distancia" class="label-input">Distancia</label>
            <p class="w-full h-10 p-2 bg-white rounded tex-gray-700">
              {{ nuevoPedido.distancia }}
            </p>
            <div
              v-if="errorCalcularDistancia === true"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>Falta calcular la distancia</p>
            </div>
          </div>

          <div>
            <label for="recaudo" class="label-input">Recaudo</label>
            <input
              v-model.number="nuevoPedido.recaudo"
              type="number"
              class="input"
              @input="changeRecaudo"
              @change="changeRecaudo"
              min="0"
            />
          </div>

          <div>
            <label for="tramite" class="label-input">Trámite</label>
            <input
              v-model.number="nuevoPedido.tramite"
              type="number"
              class="input"
              min="0"
            />
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
          @click.prevent="handleAnadirPedido"
          class="block px-6 py-2 mx-auto font-bold text-white transition duration-200 bg-green-500 rounded-lg shadow-lg hover:bg-green-700 hover:shadow-xl focus:outline-none"
        >
          Añadir otro Pedido
        </button>

        <button
          v-if="nuevoPedido.mobiker === 'Asignar MoBiker'"
          type="submit"
          @click.prevent="handleNuevoPedido"
          class="block px-6 py-2 mx-auto font-bold text-white transition duration-200 bg-yellow-500 rounded-lg shadow-lg hover:bg-yellow-600 hover:shadow-xl focus:outline-none"
        >
          Programar Pedido
        </button>

        <button
          v-else
          type="submit"
          @click.prevent="handleNuevoPedido"
          class="block px-6 py-2 mx-auto font-bold text-white transition duration-200 rounded-lg shadow-lg bg-info hover:bg-secondary hover:shadow-xl focus:outline-none"
        >
          Asignar Pedido
        </button>
      </div>
    </form>

    <BaseAlerta v-if="alert.show" :alert="alert" />
  </div>
</template>

<script>
import BaseAlerta from "@/components/BaseAlerta.vue";
import Pedido from "@/models/pedido";
import { ModelListSelect } from "vue-search-select";
import PedidoService from "@/services/pedido.service";
import BuscadorCliente from "@/components/BuscadorCliente";
import BuscadorDestino from "@/components/BuscadorDestino";
import Datepicker from "vuejs-datepicker";
import { mapState, mapActions } from "vuex";
import { es } from "vuejs-datepicker/dist/locale";

import consultarApi from "@/services/maps.service";
import calcularTarifa from "@/services/tarifa.service";
import calcularEstadisticas from "@/services/ecoamigable.service";

export default {
  name: "nuevoPedido",
  data() {
    return {
      nuevoPedido: new Pedido(),
      showBuscador: false,
      showBuscadorDestinos: false,
      mobikersFiltrados: [],
      alert: {
        message: "",
        success: false,
        show: false,
      },
      errorCalcularDistancia: false,
      memoriaCliente: null,
      es: es,
      tarifaMemoria: 0,
      tarifaSugeridaMemoria: 0,
      distanciaMemoria: 0,
    };
  },
  async mounted() {
    this.nuevoPedido.tarifa = 0;
    this.nuevoPedido.tarifaSugerida = 0;
    this.nuevoPedido.comision = 0.0;
    this.nuevoPedido.recaudo = 0;
    this.nuevoPedido.tramite = 0;

    this.mobikersFiltrados = this.mobikers.filter(
      (mobiker) => mobiker.status === "Activo"
    );
  },
  computed: {
    ...mapState("auxiliares", [
      "distritos",
      "formasDePago",
      "tiposDeCarga",
      "rolCliente",
      "modalidades",
      "tiposDeEnvio",
      "statusDelPedido",
    ]),

    ...mapState("mobikers", ["mobikers"]),
  },
  watch: {
    "nuevoPedido.mobiker": async function() {
      if (this.nuevoPedido.mobiker === "Asignar MoBiker") {
        this.nuevoPedido.status = 1;
      } else {
        this.nuevoPedido.status = 2;
      }

      if (this.nuevoPedido.mobiker) {
        const comision = await this.obtenerComision(this.nuevoPedido.mobiker);
        this.nuevoPedido.comision =
          this.nuevoPedido.tarifa !== 0
            ? +(this.nuevoPedido.tarifa * comision).toFixed(2)
            : 0;
      }
    },

    "nuevoPedido.status": function() {
      if (this.nuevoPedido.status === 1) {
        this.nuevoPedido.mobiker = "Asignar MoBiker";
      }
    },

    "nuevoPedido.tarifa": async function() {
      if (this.nuevoPedido.mobiker) {
        const comision = await this.obtenerComision(this.nuevoPedido.mobiker);
        this.nuevoPedido.comision =
          this.nuevoPedido.tarifa !== 0
            ? +(this.nuevoPedido.tarifa * comision).toFixed(2)
            : 0;
      }
    },

    "nuevoPedido.modalidad": function() {
      if (this.nuevoPedido.modalidad === "Con Retorno") {
        this.nuevoPedido.viajes = 2;
        this.nuevoPedido.distancia *= 2;
        if (this.nuevoPedido.tipoEnvio === "E-Commerce") {
          this.nuevoPedido.tarifa = this.tarifaMemoria * 2;
          this.nuevoPedido.tarifaSugerida = this.tarifaSugeridaMemoria * 2;
        } else {
          this.nuevoPedido.tarifa += +Math.ceil(this.tarifaMemoria / 2);
          this.nuevoPedido.tarifaSugerida += +Math.ceil(
            this.tarifaSugeridaMemoria / 2
          );
        }
      }
      if (this.nuevoPedido.modalidad === "Una vía") {
        this.nuevoPedido.viajes = 1;
        this.nuevoPedido.tarifa = this.tarifaMemoria;
        this.nuevoPedido.tarifaSugerida = this.tarifaSugeridaMemoria;
        this.nuevoPedido.distancia = this.distanciaMemoria;
      }
    },
  },
  methods: {
    ...mapActions("mobikers", ["obtenerComision"]),

    changeRecaudo() {
      if (this.nuevoPedido.recaudo !== 0) {
        this.nuevoPedido.tarifa = +(this.tarifaMemoria + 2);
      }
      if (this.nuevoPedido.recaudo === 0) {
        this.nuevoPedido.tarifa = +this.tarifaMemoria;
      }
    },

    async handleNuevoPedido() {
      try {
        const isValid = await this.$validator.validateAll();
        if (this.nuevoPedido.distancia === (null || undefined)) {
          this.errorCalcularDistancia = true;
          return;
        }
        if (!isValid) {
          return;
        }

        this.nuevoPedido.operador = this.$store.getters.operador;
        this.nuevoPedido.isRuteo = false;

        const response = await PedidoService.storageNuevoPedido(
          this.nuevoPedido
        );
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

    async handleAnadirPedido() {
      try {
        const isValid = await this.$validator.validateAll();
        if (!isValid) {
          return;
        }

        this.nuevoPedido.operador = this.$store.getters.operador;

        const response = await PedidoService.storageNuevoPedido(
          this.nuevoPedido
        );
        this.alert.message = response.data.message;
        this.alert.show = true;
        this.alert.success = true;
        this.memoriaCliente.fecha = this.nuevoPedido.fecha;

        setTimeout(() => {
          this.alert.show = false;
        }, 1500);

        this.resetForm();
        this.errors.items = [];
      } catch (error) {
        console.log(
          `Error al añadir Nuevo Pedido: ${error.response.data.message}`
        );
        this.alert.message = error.response.data.message;
        this.alert.show = true;
        this.alert.success = false;
        setTimeout(() => (this.alert.show = false), 2500);
      }
    },

    resetForm() {
      this.nuevoPedido.fecha = this.memoriaCliente.fecha;
      this.nuevoPedido.contactoRemitente = null;
      this.nuevoPedido.empresaRemitente = null;
      this.nuevoPedido.telefonoRemitente = null;
      this.nuevoPedido.direccionRemitente = null;
      this.nuevoPedido.distritoRemitente = null;
      this.nuevoPedido.formaPago = null;
      this.nuevoPedido.tipoCarga = null;
      this.nuevoPedido.rolCliente = null;
      this.nuevoPedido.tipoEnvio = null;
      this.nuevoPedido.modalidad = null;
      this.nuevoPedido.contactoConsignado = null;
      this.nuevoPedido.empresaConsignado = null;
      this.nuevoPedido.telefonoConsignado = null;
      this.nuevoPedido.direccionConsignado = null;
      this.nuevoPedido.distritoConsignado = null;
      this.nuevoPedido.otroDatoConsignado = null;
      this.nuevoPedido.tarifa = 0;
      this.nuevoPedido.tarifaSugerida = 0;
      this.nuevoPedido.comision = 0;
      this.nuevoPedido.distancia = null;
      this.nuevoPedido.recaudo = 0;
      this.nuevoPedido.tramite = 0;

      if (this.nuevoPedido.mobiker === "Asignar MoBiker") {
        this.nuevoPedido.status = 1;
        this.nuevoPedido.mobiker = "Asignar MoBiker";
      }
    },

    async calcularDistancia() {
      try {
        if (
          !(
            this.nuevoPedido.direccionRemitente &&
            this.nuevoPedido.distritoRemitente &&
            this.nuevoPedido.direccionConsignado &&
            this.nuevoPedido.distritoConsignado &&
            this.nuevoPedido.mobiker
          )
        ) {
          this.errorCalcularDistancia = true;
          console.error("Mensaje de error: No se pudo calcular la distancia");
          return;
        }
        this.errorCalcularDistancia = false;

        // Calcular Distancia
        this.nuevoPedido.distancia = await consultarApi(
          this.nuevoPedido.direccionRemitente,
          this.nuevoPedido.distritoRemitente,
          this.nuevoPedido.direccionConsignado,
          this.nuevoPedido.distritoConsignado
        );

        this.distanciaMemoria = this.nuevoPedido.distancia;
        if (this.nuevoPedido.modalidad === "Con Retorno") {
          this.nuevoPedido.distancia = this.distanciaMemoria * 2;
        } else {
          this.nuevoPedido.distancia = this.distanciaMemoria;
        }

        if (
          this.nuevoPedido.distancia === null ||
          this.nuevoPedido.distancia === undefined ||
          this.nuevoPedido.distancia <= -0.1 ||
          this.nuevoPedido.distancia >= 100
        ) {
          this.nuevoPedido.distancia = null;
          this.alert.message = "No se ha podido calcular la distancia...";
          this.alert.show = true;
          this.alert.success = false;
          this.errorCalcularDistancia = true;
          setTimeout(() => (this.alert.show = false), 2500);
        }

        // Calcular la tarifa
        const response = calcularTarifa(
          this.nuevoPedido.distancia,
          this.nuevoPedido.tipoEnvio,
          this.nuevoPedido.modalidad,
          this.nuevoPedido.distritoConsignado
        );

        this.nuevoPedido.tarifa = response.tarifa;
        this.tarifaMemoria = response.tarifa;
        this.nuevoPedido.tarifaSugerida = response.tarifaSugerida;
        this.tarifaSugeridaMemoria = response.tarifaSugerida;

        // Calcular las estadísticas Ecoamigables
        const stats = calcularEstadisticas(this.nuevoPedido.distancia);
        this.nuevoPedido.CO2Ahorrado = stats.co2;
        this.nuevoPedido.ruido = stats.ruido;
      } catch (error) {
        console.error(`Error al calcular la distancia: ${error.message}`);
      }
    },

    cancelar() {
      console.log("Creación de Pedido cancelada");
      history.go(-1);
    },

    activarCliente(cliente) {
      if (cliente) {
        this.nuevoPedido.contactoRemitente = cliente.contacto;
        this.nuevoPedido.empresaRemitente = cliente.razonComercial;
        this.nuevoPedido.telefonoRemitente = cliente.telefono;
        this.nuevoPedido.direccionRemitente = cliente.direccion;
        this.nuevoPedido.distritoRemitente = cliente.distrito.distrito;
        this.nuevoPedido.otroDatoRemitente = cliente.otroDato;
        this.nuevoPedido.tipoCarga = cliente.tipoDeCarga.tipo;
        this.nuevoPedido.formaPago = cliente.formaDePago.pago;
        this.nuevoPedido.rolCliente = cliente.rolCliente.rol;
        this.nuevoPedido.tipoEnvio = cliente.tipoDeEnvio.tipo;
        this.nuevoPedido.modalidad = "Una vía";
        this.nuevoPedido.status = 1;

        this.memoriaCliente = cliente;
        this.memoriaCliente.fecha = new Date();
      }
    },

    activarDestino(destino) {
      if (destino) {
        this.nuevoPedido.contactoConsignado = destino.contacto;
        this.nuevoPedido.empresaConsignado = destino.empresa;
        this.nuevoPedido.telefonoConsignado = destino.telefono;
        this.nuevoPedido.direccionConsignado = destino.direccion;
        this.nuevoPedido.distritoConsignado = destino.distrito.distrito;
        this.nuevoPedido.otroDatoConsignado = destino.otroDato;
      }
    },

    asignarHoy() {
      let hoy = new Date();
      return (this.nuevoPedido.fecha = hoy);
    },

    asignarMañana() {
      let hoy = new Date();
      let DIA_EN_MS = 24 * 60 * 60 * 1000;
      let manana = new Date(hoy.getTime() + DIA_EN_MS);
      return (this.nuevoPedido.fecha = manana);
    },
  },
  components: {
    ModelListSelect,
    BuscadorCliente,
    Datepicker,
    BaseAlerta,
    BuscadorDestino,
  },
};
</script>
