<template>
  <div class="p-4 mx-auto my-12 bg-gray-100 shadow-lg rounded-xl">
    <div class="flex justify-end">
      <h1
        class="relative inline-block px-6 py-2 mb-4 text-2xl font-bold text-center bg-gray-100 text-primary rounded-xl -top-12"
      >
        Editar Ruteo
      </h1>
    </div>

    <div class="flex flex-row justify-center px-4 -mt-12">
      <div>
        <!-- <button
          class="px-4 py-1 font-bold text-white bg-primary rounded-xl focus:outline-none"
          @click="showBuscador = true"
        >
          Buscar cliente
        </button> -->
      </div>

      <div class="overlay" v-if="showBuscador"></div>

      <BuscadorCliente
        :showBuscador="showBuscador"
        @cerrarBuscador="showBuscador = false"
        @activarCliente="activarCliente"
      />
    </div>

    <form class="h-full p-2 mt-2" autocomplete="off" ref="pedido">
      <div class="grid h-full grid-cols-1">
        <div class="px-1 text-3xl font-bold text-center text-primary">
          <h2>Origen</h2>
        </div>

        <!-- FORMULARIO ORIGEN -->
        <div class="grid grid-cols-6 gap-2 p-2">
          <div>
            <button
              class="w-full py-2 mt-6 font-bold text-white rounded bg-secondary focus:outline-none"
              @click="asignarHoy()"
              type="button"
            >
              Para hoy
            </button>
          </div>

          <div>
            <button
              class="w-full py-2 mt-6 font-bold text-white rounded bg-secondary focus:outline-none"
              @click="asignarMañana()"
              type="button"
            >
              Para mañana
            </button>
          </div>

          <div>
            <label for="fecha" class="label-input">Fecha Seleccionada</label>
            <datepicker
              v-model="pedido.fecha"
              v-validate="'required'"
              name="fecha"
              input-class="input"
              :monday-first="true"
              placeholder="Fecha del Pedido"
              format="dd MMMM yyyy"
              :language="es"
              :useUtc="true"
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
              v-model="pedido.contactoRemitente"
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
              readonly
              v-model="pedido.empresaRemitente"
              type="text"
              v-validate="'required'"
              name="empresaRemitente"
              class="input"
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
              v-model="pedido.telefonoRemitente"
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
              >Direccion</label
            >
            <input
              v-model="pedido.direccionRemitente"
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
              v-model="pedido.distritoRemitente"
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
              v-model="pedido.otroDatoRemitente"
              type="text"
              class="input"
            />
          </div>

          <div>
            <label for="formaPago" class="label-input">Forma de pago</label>
            <model-list-select
              name="formaPago"
              v-model="pedido.formaPago"
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
            <label for="tipoCarga" class="label-input">Tipo de Carga</label>
            <model-list-select
              name="tipoCarga"
              v-model="pedido.tipoCarga"
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
            <label for="tipoEnvio" class="label-input">Tipo de Envío</label>
            <model-list-select
              name="tipoEnvio"
              v-model="pedido.tipoEnvio"
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
            <label for="status" class="label-input">Estado del Pedido</label>
            <model-list-select
              name="status"
              v-model="pedido.status"
              :list="statusDelPedido"
              v-validate="'required'"
              option-text="tag"
              option-value="id"
            />
          </div>

          <div>
            <label for="rol" class="label-input">Rol</label>
            <model-list-select
              name="rolCliente"
              :list="rolCliente"
              v-model="pedido.rolCliente"
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

          <div>
            <label for="mobiker" class="label-input">Mobiker</label>
            <model-list-select
              name="mobiker"
              v-model="pedido.mobiker"
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
        </div>
      </div>

      <div class="flex flex-row justify-between mt-2"></div>

      <!-- Aqui va toda la funcionalidad de Destinos -->
      <div class="w-full p-4 mt-5 bg-gray-100 rounded-xl">
        <div class="px-1 text-3xl font-bold text-center text-primary">
          <h2>
            Destinos
          </h2>
        </div>
        <!-- <input type="file" @change="onFileChanged" multiple /> -->

        <!-- FORMULARIO DESTINO -->
        <div class="grid grid-cols-6 gap-2 p-2">
          <div>
            <label for="contactoConsignado" class="label-input">Contacto</label>
            <input
              v-model="nuevoDestinoIndividual.contactoConsignado"
              type="text"
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
              v-model="nuevoDestinoIndividual.empresaConsignado"
              type="text"
              name="empresaConsignado"
              class="input"
            />
          </div>

          <div>
            <label for="telefonoConsignado" class="label-input">Teléfono</label>
            <input
              v-model="nuevoDestinoIndividual.telefonoConsignado"
              type="string"
              name="telefonoConsignado"
              class="input"
            />
          </div>

          <div class="col-span-2">
            <label for="direccionConsignado" class="label-input"
              >Dirección</label
            >
            <input
              v-model="nuevoDestinoIndividual.direccionConsignado"
              type="text"
              name="direccionConsignado"
              class="input"
            />
          </div>

          <div>
            <label for="distritoConsignado" class="label-input">Distrito</label>
            <model-list-select
              name="distritoConsignado"
              v-model="nuevoDestinoIndividual.distritoConsignado"
              placeholder="Buscar distrito..."
              :list="distritos"
              option-text="distrito"
              option-value="distrito"
            />
          </div>

          <div>
            <label for="tipoEnvio" class="label-input">Tipo de Envío</label>
            <model-list-select
              name="tipoEnvio"
              v-model="nuevoDestinoIndividual.tipoEnvio"
              :list="tiposDeEnvio"
              option-text="tipo"
              option-value="tipo"
            />
          </div>

          <div>
            <label for="modalidad" class="label-input">Modalidad</label>
            <model-list-select
              name="modalidad"
              v-model="nuevoDestinoIndividual.modalidad"
              :list="modalidades"
              option-text="tipo"
              option-value="tipo"
            />
          </div>
          <div class="col-span-3">
            <label for="otroDatoConsignado" class="label-input"
              >Otro Dato</label
            >
            <input
              v-model="nuevoDestinoIndividual.otroDatoConsignado"
              type="text"
              class="input"
            />
          </div>
          <div></div>
        </div>
        <div
          style="display:flex; padding: 10px 0px 20px; justify-content:center;"
        >
          <button
            type="button"
            class="block px-6 py-2 font-bold text-white transition duration-200 bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 hover:shadow-xl focus:outline-none"
            @click="agregarDestinoManual()"
          >
            Agregar Destino
          </button>
        </div>
        <!-- <input type="file" @change="onFileChanged" multiple /> -->

        <div style="width: 100%; min-height: 650px">
          <div
            class="grid grid-cols-2 gap-2 p-2"
            style="padding-bottom: 10px; border-bottom: 2px solid #ddd; margin-bottom: 30px;"
          >
            <div
              style="width: 100%; padding: 20px 40px;min-height: 250px; justify-content:center; border-right: 2px solid #ddd;"
            >
              <textarea
                v-model="excelData"
                class="input"
                style="resize: none; width:100%;height: 200px;"
                name=""
                id=""
                cols="80"
                rows="8"
                placeholder="Puedes copiar y pegar aquí registros desde excel en el siguiente orden:            Contacto    Direccion     Distrito    Telefono     Observaciones"
              ></textarea>
              <div
                style="display:flex; padding-left: 20px; justify-content:center;"
              >
                <button
                  type="button"
                  class="block px-6 py-2 font-bold text-white transition duration-200 bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 hover:shadow-xl focus:outline-none"
                  @click="convertirExcelData('agregar')"
                >
                  Convertir
                </button>
              </div>
            </div>
            <div>
              <div style="min-height:200px;">
                <table class="table-auto" style="max-height: 200px;">
                  <thead>
                    <tr class="text-primary">
                      <th></th>
                      <th>ID Pedido</th>
                      <th>Destino</th>
                      <th>Contacto</th>
                      <th>Telefono</th>
                    </tr>
                  </thead>
                  <tbody style="">
                    <tr
                      v-for="(pedidoIndividualNoAgregado,
                      index) in pedidosIndividualClienteActual"
                      :key="index"
                    >
                      <td>
                        <input
                          type="checkbox"
                          v-model="pedidoIndividualNoAgregado.agregarAlRuteo"
                        />
                      </td>
                      <td>{{ pedidoIndividualNoAgregado.id }}</td>
                      <td>
                        {{ pedidoIndividualNoAgregado.direccionConsignado }},
                        {{ pedidoIndividualNoAgregado.distrito.distrito }}
                      </td>
                      <td>
                        {{ pedidoIndividualNoAgregado.contactoConsignado }}
                      </td>
                      <td>
                        {{ pedidoIndividualNoAgregado.telefonoConsignado }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <br />
              <div style="display:flex; justify-content: center;">
                <button
                  type="button"
                  class="block px-6 py-2 font-bold text-white transition duration-200 bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 hover:shadow-xl focus:outline-none"
                  @click="agregarPedidoDelListado()"
                >
                  Agregar al Ruteo
                </button>
              </div>
            </div>
          </div>

          <div
            v-if="showLoading"
            wire:loading
            class="fixed top-0 bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-gray-700 opacity-75"
          >
            <div
              class="w-12 h-12 mb-4 ease-linear border-4 border-t-4 border-gray-200 rounded-full loader"
            ></div>
            <h2 class="text-xl font-semibold text-center text-white">
              Cargando...
            </h2>
            <p class="w-1/3 text-center text-white">
              Ésto puede tomar algunos segundos, no cierres la pagina por favor
              :D.
            </p>
          </div>
          <div style="display:flex; align-items:center; ">
            <!-- <div style="">
              <input type="checkbox" name="" id="seleccionarTodos"  v-model="seleccionarTodosLosPedidos" @change="seleccionarTodos($event)"> 
              <label style="margin-left:5px; cursor:pointer" for="seleccionarTodos"> Seleccionar todos</label>
            </div> -->
            <button
              type="button"
              style="margin-left: 20px"
              class="block px-6 py-2 font-bold text-white transition duration-200 bg-red-500 rounded-lg shadow-lg hover:bg-red-600 hover:shadow-xl focus:outline-none"
              @click="anularPedidoDeRuteo()"
            >
              Anular
            </button>
            <button
              type="button"
              style="margin-left: 20px"
              class="block px-6 py-2 font-bold text-white transition duration-200 bg-yellow-500 rounded-lg shadow-lg hover:bg-yellow-600 hover:shadow-xl focus:outline-none"
              @click="quitarPedidoDeRuteo()"
            >
              Quitar
            </button>
          </div>
          <table class="table-auto">
            <thead class="text-center text-primary">
              <tr>
                <th>
                  <font-awesome-icon
                    class="text-2xl text-primary"
                    icon="trash-alt"
                  />
                </th>
                <th>Contacto</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Distrito</th>
                <th>Observaciones</th>
                <th>Distancia</th>
                <th>Tarifa</th>
                <th>Tarifa Sugerida</th>
                <th>Recaudo</th>
                <th>Trámite</th>
                <th>Modalidad</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(pedidoIndividual, index) in pedidos" :key="index">
                <td>
                  <input
                    type="checkbox"
                    name=""
                    v-model="pedidoIndividual.seleccionado"
                  />
                </td>
                <td>{{ pedidoIndividual.contactoConsignado }}</td>
                <td>{{ pedidoIndividual.telefonoConsignado }}</td>
                <td>{{ pedidoIndividual.direccionConsignado }}</td>
                <td>
                  {{ pedidoIndividual.distrito.distrito }}
                </td>
                <td>
                  <input
                    class="input input2"
                    type="text"
                    v-model="pedidoIndividual.otroDatoConsignado"
                  />
                </td>
                <td class="table-cell text-center">
                  {{ pedidoIndividual.distancia }} km
                </td>
                <td class="table-cell text-center">
                  <input
                    class="input input2"
                    type="number"
                    min="0"
                    v-model.number="pedidoIndividual.tarifa"
                    @input="changeTarifa"
                    @change="changeTarifa"
                  />
                </td>
                <td class="table-cell text-center">
                  {{ pedidoIndividual.tarifaSugerida }}
                </td>
                <td>
                  <input
                    class="input input2"
                    type="number"
                    min="0"
                    v-model.number="pedidoIndividual.recaudo"
                    @input="calcularRecaudo(pedidoIndividual)"
                    @change="changeRecaudo"
                  />
                </td>
                <td>
                  <input
                    class="input input2"
                    type="number"
                    min="0"
                    v-model.number="pedidoIndividual.tramite"
                    @input="changeTramite"
                    @change="changeTramite"
                  />
                </td>
                <td>
                  <model-list-select
                    name="modalidad"
                    v-model="pedidoIndividual.modalidad"
                    v-validate="'required'"
                    :list="modalidades"
                    option-text="tipo"
                    option-value="tipo"
                    @input="changeModalidad(pedidoIndividual.modalidad, index)"
                  />
                </td>
              </tr>
              <tr class="bg-opacity-25 bg-info">
                <td class="p-1 text-lg font-bold text-primary">
                  Total:
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class="p-1 text-lg font-bold text-center text-primary">
                  <span>{{ +distanciaTotal.toFixed(1) }}</span> km.
                </td>
                <td class="p-1 text-lg font-bold text-center text-primary">
                  S/. <span>{{ tarifaTotal }}</span>
                </td>
                <td class="p-1 text-lg font-bold text-center text-primary">
                  S/. <span>{{ tarifaTotalSugerida }}</span>
                </td>
                <td class="p-1 text-lg font-bold text-center text-primary">
                  S/. <span>{{ recaudoTotal }}</span>
                </td>
                <td class="p-1 text-lg font-bold text-center text-primary">
                  S/. <span>{{ tramiteTotal }}</span>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Aqui va toda la funcionalidad de Destinos -->

      <div class="flex justify-between w-full">
        <button
          @click="cancelar"
          type="button"
          class="block px-6 py-2 mx-auto font-bold text-white transition duration-200 bg-red-500 rounded-lg shadow-lg hover:bg-red-700 hover:shadow-xl focus:outline-none"
        >
          Cancelar
        </button>

        <button
          type="submit"
          @click.prevent="handelActualizarRuteo"
          class="block px-6 py-2 mx-auto font-bold text-white transition duration-200 rounded-lg shadow-lg bg-info hover:bg-secondary hover:shadow-xl focus:outline-none"
        >
          Actualizar Ruteo
        </button>
      </div>
    </form>

    <div
      v-if="showModalComentarioAnulados"
      style="position:fixed; display:flex; align-items:center; justify-content:center; width:100vw; height: 100vh; top:0; bottom:0; left: 0;background: #00000070;"
    >
      <div
        style="width: 30%; height: auto;"
        class="px-10 py-4 bg-primary rounded-xl"
      >
        <div style="height: 40px; text-align:end;">
          <button
            style="position: absolute; "
            class="px-2 text-2xl text-white rounded-full bg-info hover:bg-secondary focus:outline-none"
            @click.prevent="cerrarModal"
          >
            <font-awesome-icon icon="times" />
          </button>
        </div>

        <form class="flex flex-col items-center p-4 bg-white rounded-xl">
          <div>
            <label
              for="comentario"
              class="block mb-1 ml-1 text-sm font-bold text-primary"
              >Ingres algun comentario del por que se estan anulando los pedidos
              (Opcional)</label
            >
            <textarea
              class="input"
              name="comentario"
              id="comentario"
              cols="26"
              rows="3"
              v-model="comentarioAnulados"
              style="resize:none"
            ></textarea>
          </div>
        </form>

        <div class="flex justify-center mt-6">
          <button
            type="submit"
            class="px-6 py-2 font-bold text-white bg-green-600 rounded-xl focus:outline-none hover:bg-green-500"
            @click="handleAgregarComentarioAnulacion"
          >
            Confimar Anulacion
          </button>
        </div>
      </div>
    </div>

    <BaseAlerta v-if="alert.show" :alert="alert" />
  </div>
</template>

<script>
import BaseAlerta from "@/components/BaseAlerta.vue";
import Pedido from "@/models/pedido";
import { ModelListSelect } from "vue-search-select";
import PedidoService from "@/services/pedido.service";
import BuscadorCliente from "@/components/BuscadorCliente";
import Datepicker from "vuejs-datepicker";
import { mapState, mapActions } from "vuex";
import { es } from "vuejs-datepicker/dist/locale";

import consultarApi from "@/services/maps.service";
import calcularTarifa from "@/services/tarifa.service";
import calcularEstadisticas from "@/services/ecoamigable.service";
import ClienteService from "@/services/cliente.service";

export default {
  name: "EditarRuteo",
  data() {
    return {
      pedido: new Pedido(),
      showBuscador: false,
      mobikersFiltrados: [],
      alert: {
        message: "",
        success: false,
        show: false,
      },
      errorCalcularDistancia: false,
      memoriaCliente: null,
      es: es,
      file: null,
      pedidos: [],
      pedidosIndividualClienteActual: [],
      tarifaTotal: 0,
      tarifaTotalSugerida: 0,
      distanciaTotal: 0,
      recaudoTotal: 0,
      tramiteTotal: 0,
      showLoading: false,
      excelData: "",
      tablaExcelData: [],
      ruteoId: null,
      pedidosRuteoSeleccionados: [],
      pedidosParaAgregar: [],
      pedidosParaQuitar: [],
      pedidosParaAnular: [],
      seleccionarTodosLosPedidos: false,
      comentarioAnulados: "",
      showModalComentarioAnulados: false,
      nuevoDestinoIndividual: {
        contactoConsignado: "",
        direccionConsignado: "",
        telefonoConsignado: "",
        empresaConsignado: "",
        distritoConsignado: null,
        tipoEnvio: "E-Commerce",
        modalidad: "Una vía",
      },
    };
  },
  mounted() {
    this.getRuteo(this.$route.params.id);

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
    "pedido.mobiker": async function() {
      if (this.pedido.mobiker === "Asignar MoBiker") {
        this.pedido.status = 1;
      } else {
        this.pedido.status = 2;
      }

      if (this.pedido.mobiker) {
        const comision = await this.obtenerComision(this.pedido.mobiker);
        this.pedido.comision =
          this.pedido.tarifa !== 0
            ? +(this.pedido.tarifa * comision).toFixed(2)
            : 0;
      }
    },

    "pedido.status": function() {
      if (this.pedido.status === 1) {
        this.pedido.mobiker = "Asignar MoBiker";
      }
    },

    "pedido.tarifa": async function() {
      if (this.pedido.mobiker) {
        const comision = await this.obtenerComision(this.pedido.mobiker);
        this.pedido.comision =
          this.pedido.tarifa !== 0
            ? +(this.pedido.tarifa * comision).toFixed(2)
            : 0;
      }
    },

    "pedido.modalidad": function() {
      if (this.pedido.modalidad === "Con Retorno") {
        this.pedido.viajes = 2;
      }
      if (this.pedido.modalidad === "Una vía") {
        this.pedido.viajes = 1;
      }
    },
  },
  methods: {
    ...mapActions("mobikers", ["obtenerComision"]),

    changeModalidad(modalidad, index) {
      if (modalidad.tipo === "Con Retorno") {
        if (this.pedidos[index].viajes !== 2) {
          if (this.pedido.tipoEnvio === "E-Commerce") {
            this.pedidos[index].tarifa *= 2;
          } else {
            this.pedidos[index].tarifa += +Math.ceil(
              this.pedidos[index].tarifa / 2
            );
          }
        }
        this.pedidos[index].viajes = 2;
        this.pedidos[index].distancia *= 2;
      }
      if (modalidad.tipo === "Una vía") {
        this.pedidos[index].viajes = 1;
        this.pedidos[index].tarifa = this.pedidos[index].tarifaMemoria;
        this.pedidos[index].distancia = this.pedidos[index].distanciaMemoria;
      }
      this.changeTarifa();
    },

    actualizarSumas() {
      this.changeTarifa();
      this.changeRecaudo();
      this.changeTramite();
      this.changeTarifaSugerida();
      this.changeDistancia();
    },

    cerrarModal() {
      this.showModalComentarioAnulados = false;
    },

    removeRuta(pos, action) {
      if (action === "quitar") {
        this.pedidosParaQuitar.push(this.pedidos[pos]);
      } else if (action === "anular") {
        this.pedidosParaAnular.push(this.pedidos[pos]);
      }

      this.pedidos.splice(pos, 1);
      this.actualizarSumas();

      return true;
    },

    changeTarifa() {
      let total = 0;
      for (let i in this.pedidos) {
        if (this.pedidos[i].tarifa === "" || this.pedidos[i].tarifa === null) {
          this.pedidos[i].tarifa = 0;
        }
        total += parseFloat(this.pedidos[i].tarifa);
      }
      this.tarifaTotal = total;
    },

    changeTarifaSugerida() {
      let total = 0;
      for (let i in this.pedidos) {
        if (
          this.pedidos[i].tarifaSugerida === "" ||
          this.pedidos[i].tarifaSugerida === null
        ) {
          this.pedidos[i].tarifaSugerida = 0;
        }
        total += parseFloat(this.pedidos[i].tarifa);
      }
      this.tarifaTotalSugerida = total;
    },

    changeDistancia() {
      let total = 0;
      for (let i in this.pedidos) {
        if (
          this.pedidos[i].distancia === "" ||
          this.pedidos[i].distancia === null
        ) {
          this.pedidos[i].distancia = 0;
        }
        total += parseFloat(this.pedidos[i].distancia);
      }
      this.distanciaTotal = total;
    },

    async convertirExcelData(type) {
      if (
        this.pedido.fecha != "" &&
        this.pedido.fecha != null &&
        this.pedido.empresaRemitente != "" &&
        this.pedido.empresaRemitente != null &&
        this.pedido.direccionRemitente != "" &&
        this.pedido.direccionRemitente != null
      ) {
        if (this.excelData != "") {
          if (type === "nuevo") {
            this.pedidos = [];
          }
          this.showLoading = true;

          var rows = this.excelData.split("\n");
          for (var y in rows) {
            var cells = rows[y].split("\t");
            //var row = '<tr>';
            var row = {};
            for (let x = 0; x < cells.length; x++) {
              switch (x) {
                case 0: {
                  row["contactoConsignado"] = cells[x];
                  break;
                }
                case 1: {
                  row["direccionConsignado"] = cells[x];
                  break;
                }
                case 2: {
                  row["distrito"] = {};
                  row["distrito"]["distrito"] = cells[x];
                  break;
                }
                case 3: {
                  row["telefonoConsignado"] = cells[x];
                  break;
                }
                case 4: {
                  row["otroDatoConsignado"] = cells[x];
                  break;
                }
              }
            }
            let info = await this.calcularDistancia(
              row.direccionConsignado,
              row.distrito.distrito
            );
            row["empresaConsignado"] = "";
            row["distancia"] = info.distancia;
            row["distanciaMemoria"] = info.distancia;
            row["tarifa"] = info.tarifa;
            row["tarifaMemoria"] = +info.tarifa;
            row["tarifaSugerida"] = info.tarifaSugerida;
            row["CO2Ahorrado"] = info.CO2Ahorrado;
            row["ruido"] = info.ruido;
            row["recaudo"] = 0;
            row["tramite"] = 0;
            row["modalidad"] = { tipo: "Una vía" };
            row["viajes"] = 1;
            row["seleccionado"] = false;
            this.tarifaTotal = this.tarifaTotal + info.tarifa;
            this.tarifaTotalSugerida =
              this.tarifaTotalSugerida + info.tarifaSugerida;
            this.distanciaTotal += +info.distancia.toFixed(1);
            this.recaudoTotal = 0;
            this.tramiteTotal = 0;
            this.pedidos.push(row);
          }
          this.actualizarSumas();

          this.excelData = "";
          this.showLoading = false;
        } else {
          this.alert.message = "Necesitas agregar algo información del pedido";
          this.alert.success = false;
          this.alert.show = true;
        }
      } else {
        const isValid = await this.$validator.validateAll();
        if (!isValid) {
          return;
        }
      }
    },

    calcularRecaudo(pedido) {
      if (pedido.recaudo > 0) {
        pedido.tarifa = +(pedido.tarifaMemoria + 2);
      }
      if (pedido.recaudo === 0) {
        pedido.tarifa = +pedido.tarifaMemoria;
      }
    },

    changeRecaudo() {
      let total = this.pedidos.reduce((acc, pedido) => {
        if (pedido.recaudo === "" || pedido.recaudo === null)
          pedido.recaudo = 0;

        return +pedido.recaudo + acc;
      }, 0);
      this.recaudoTotal = +total.toFixed(2);
    },

    changeTramite() {
      let total = this.pedidos.reduce((acc, pedido) => {
        if (pedido.tramite === "" || pedido.tramite === null)
          pedido.tramite = 0;

        return +pedido.tramite + acc;
      }, 0);
      this.tramiteTotal = +total.toFixed(2);
    },

    handelActualizarRuteo() {
      if (this.pedidosParaAnular.length > 0) {
        this.showModalComentarioAnulados = true;
      } else {
        this.handleEditarRuteo();
      }
    },

    handleAgregarComentarioAnulacion() {
      for (let i = 0; i < this.pedidosParaAnular.length; i++) {
        this.pedidosParaAnular[i]["comentario"] = this.comentarioAnulados;
      }
      this.cerrarModal();
      this.handleEditarRuteo();
    },

    async handleEditarRuteo() {
      try {
        this.showLoading = true;
        let response = {};

        if (this.pedidosParaAnular.length > 0) {
          for (let i = 0; i < this.pedidosParaAnular.length; i++) {
            const pedidoCambiado = {
              status: 6,
              mobiker: this.pedido.mobiker,
              comentario: this.pedidosParaAnular[i].comentario,
              isRuteo: false,
              ruteoId: null,
            };
            response = await PedidoService.cambiarEstadoPedido(
              this.pedidosParaAnular[i].id,
              pedidoCambiado
            );
          }
        }

        if (this.pedidosParaQuitar.length > 0) {
          for (let i = 0; i < this.pedidosParaQuitar.length; i++) {
            const pedidoCambiado = {
              status: this.pedidosParaQuitar[i].statusId,
              mobiker: this.pedido.mobiker,
              isRuteo: false,
              ruteoId: null,
            };
            response = await PedidoService.cambiarEstadoPedido(
              this.pedidosParaQuitar[i].id,
              pedidoCambiado
            );
          }
        }

        for (let i = 0; i < this.pedidos.length; i++) {
          if (this.pedidos[i].id) {
            this.pedido.operador = this.$store.getters.operador;
            const comision = await this.obtenerComision(this.pedido.mobiker);
            this.pedido.comision = +(this.pedidos[i].tarifa * comision).toFixed(
              2
            );

            let pedidoExtendido = {
              fecha: this.pedido.fecha,
              contactoRemitente: this.pedido.contactoRemitente,
              empresaRemitente: this.pedido.empresaRemitente,
              direccionRemitente: this.pedido.direccionRemitente,
              distritoRemitente: this.pedido.distritoRemitente,
              telefonoRemitente: this.pedido.telefonoRemitente,
              otroDatoRemitente: this.pedido.otroDatoRemitente,
              contactoConsignado: this.pedidos[i].contactoConsignado,
              empresaConsignado: this.pedidos[i].empresaConsignado,
              direccionConsignado: this.pedidos[i].direccionConsignado,
              telefonoConsignado: this.pedidos[i].telefonoConsignado,
              otroDatoConsignado: this.pedidos[i].otroDatoConsignado,
              distritoConsignado: this.pedidos[i].distrito.distrito,
              tipoCarga: this.pedido.tipoCarga,
              formaPago: this.pedido.formaPago,
              tarifa: this.pedidos[i].tarifa,
              tarifaSugerida: this.pedidos[i].tarifaSugerida,
              recaudo: this.pedidos[i].recaudo,
              tramite: this.pedidos[i].tramite,
              comision: this.pedido.comision,
              distancia: this.pedidos[i].distancia,
              CO2Ahorrado: this.pedidos[i].CO2Ahorrado,
              ruido: this.pedidos[i].ruido,
              status: this.pedido.status,
              mobiker: { fullName: this.pedidos[i].mobiker.fullName },
              tipoDeEnvio: { tipo: this.pedido.tipoEnvio },
              modalidad: { tipo: this.pedidos[i].modalidad.tipo },
              operador: this.pedido.operador,
              rolCliente: this.pedido.rolCliente,
              viajes: this.pedidos[i].viajes,
              isRuteo: true,
              ruteo: this.$route.params.id,
            };

            const isValid = await this.$validator.validateAll();
            if (!isValid) {
              this.showLoading = false;
              return;
            }
            console.log(this.pedidos[i].id);
            response = await PedidoService.editPedido(
              this.pedidos[i].id,
              pedidoExtendido
            );
          } else {
            this.pedido.operador = this.$store.getters.operador;
            const comision = await this.obtenerComision(this.pedido.mobiker);
            this.pedido.comision = +(this.pedidos[i].tarifa * comision).toFixed(
              2
            );

            let pedidoExtendido = {
              fecha: this.pedido.fecha,
              contactoRemitente: this.pedido.contactoRemitente,
              empresaRemitente: this.pedido.empresaRemitente,
              direccionRemitente: this.pedido.direccionRemitente,
              distritoRemitente: this.pedido.distritoRemitente,
              telefonoRemitente: this.pedido.telefonoRemitente,
              otroDatoRemitente: this.pedido.otroDatoRemitente,
              contactoConsignado: this.pedidos[i].contactoConsignado,
              empresaConsignado: this.pedidos[i].empresaConsignado,
              direccionConsignado: this.pedidos[i].direccionConsignado,
              telefonoConsignado: this.pedidos[i].telefonoConsignado,
              otroDatoConsignado: this.pedidos[i].otroDatoConsignado,
              distritoConsignado: this.pedidos[i].distrito.distrito,
              tipoCarga: this.pedido.tipoCarga,
              formaPago: this.pedido.formaPago,
              tarifa: this.pedidos[i].tarifa,
              tarifaSugerida: this.pedidos[i].tarifaSugerida,
              recaudo: this.pedidos[i].recaudo,
              tramite: this.pedidos[i].tramite,
              comision: this.pedido.comision,
              distancia: this.pedidos[i].distancia,
              CO2Ahorrado: this.pedidos[i].CO2Ahorrado,
              ruido: this.pedidos[i].ruido,
              status: this.pedido.status,
              mobiker: this.pedido.mobiker,
              tipoEnvio: this.pedido.tipoEnvio,
              modalidad: this.pedidos[i].modalidad.tipo,
              operador: this.pedido.operador,
              rolCliente: this.pedido.rolCliente,
              viajes: this.pedidos[i].viajes,
              isRuteo: true,
              ruteo: this.$route.params.id,
            };

            const isValid = await this.$validator.validateAll();
            if (!isValid) {
              this.showLoading = false;
              return;
            }
            response = await PedidoService.storageNuevoPedido(pedidoExtendido);
          }
        }
        this.showLoading = false;
        this.alert.message = response.data.message;
        this.alert.show = true;
        this.alert.success = true;

        // setTimeout(() => {
        //   location.reload();
        // }, 1500);
      } catch (error) {
        console.log(`Error al Editar Pedido: ${error.response.data.message}`);
        this.alert.message = error.response.data.message;
        this.alert.show = true;
        this.alert.success = false;
        setTimeout(() => (this.alert.show = false), 2500);
      }
    },

    async probandoDistancia(direccion, distrito) {
      let response = await consultarApi(
        this.pedido.direccionRemitente,
        this.pedido.distritoRemitente,
        direccion,
        distrito
      );
      return response;
    },

    async calcularDistancia(direccion = null, distrito = null, modalidad) {
      let data = {
        distancia: null,
        tarifa: null,
        tarifaMemoria: null,
        tarifaSugerida: null,
        CO2Ahorrado: null,
        ruido: null,
      };
      try {
        if (direccion != null && distrito != null) {
          data.distancia = await consultarApi(
            this.pedido.direccionRemitente,
            this.pedido.distritoRemitente,
            direccion,
            distrito
          );

          const response = calcularTarifa(
            data.distancia,
            this.pedido.tipoEnvio,
            modalidad,
            distrito
          );

          data.tarifa = response.tarifa;
          data.tarifaMemoria = response.tarifa;
          data.tarifaSugerida = response.tarifaSugerida;

          // Calcular las estadísticas Ecoamigables
          const stats = calcularEstadisticas(data.distancia);
          data.CO2Ahorrado = stats.co2;
          data.ruido = stats.ruido;

          return data;
        } else {
          return 0;
        }
      } catch (error) {
        console.error("Mensaje de error: ", error.message);
      }
    },

    async agregarDestinoManual() {
      const isValid = await this.$validator.validateAll();
      if (!isValid) {
        return;
      }
      if (
        this.nuevoDestinoIndividual.contacto != "" &&
        this.nuevoDestinoIndividual.telefonoConsignado != "" &&
        this.nuevoDestinoIndividual.direccionConsignado != "" &&
        this.nuevoDestinoIndividual.distritoConsignado != "" &&
        this.nuevoDestinoIndividual.tipoDeEnvio != ""
      ) {
        console.log("LLEGA");
        this.showLoading = true;
        let destino = this.nuevoDestinoIndividual;

        let info = await this.calcularDistancia(
          this.nuevoDestinoIndividual.direccionConsignado,
          this.nuevoDestinoIndividual.distritoConsignado,
          this.nuevoDestinoIndividual.modalidad
        );
        destino["empresaConsignado"] = "";
        destino["distanciaMemoria"] = info.distancia;
        destino["tarifa"] = info.tarifa;
        destino["tarifaMemoria"] = info.tarifaMemoria;
        destino["tarifaSugerida"] = info.tarifaSugerida;
        destino["CO2Ahorrado"] = info.CO2Ahorrado;
        destino["ruido"] = info.ruido;
        destino["recaudo"] = 0;
        destino["tramite"] = 0;
        destino["viajes"] = 1;
        destino.distrito = { distrito: destino["distritoConsignado"] };
        destino.modalidad = { tipo: this.nuevoDestinoIndividual.modalidad };

        if (this.nuevoDestinoIndividual.modalidad === "Una vía") {
          destino["distancia"] = info.distancia;
          destino["viajes"] = 1;
        } else {
          destino["distancia"] = info.distancia * 2;
          destino["viajes"] = 2;
        }
        this.pedidos.push(destino);
        this.actualizarSumas();
        this.showLoading = false;

        this.nuevoDestinoIndividual = {
          contactoConsignado: "",
          direccionConsignado: "",
          telefonoConsignado: "",
          empresaConsignado: "",
          distritoConsignado: null,
          tipoEnvio: "E-Commerce",
          modalidad: "Una vía",
        };
      } else {
        this.alert.message = "Debes de llenar todos los campos del destino!";
        this.alert.show = true;
        this.alert.success = false;

        setTimeout(() => (this.alert.show = false), 2000);
      }
    },

    cancelar() {
      this.$router.push("/pedidos/tablero-pedidos");
    },

    activarCliente(cliente) {
      if (cliente) {
        this.pedido.contactoRemitente = cliente.contacto;
        this.pedido.empresaRemitente = cliente.razonComercial;
        this.pedido.telefonoRemitente = cliente.telefono;
        this.pedido.direccionRemitente = cliente.direccion;
        this.pedido.distritoRemitente = cliente.distrito.distrito;
        this.pedido.otroDatoRemitente = cliente.otroDato;
        this.pedido.tipoCarga = cliente.tipoDeCarga.tipo;
        this.pedido.formaPago = cliente.formaDePago.pago;
        this.pedido.statusFinanciero = 1;
        this.pedido.rolCliente = cliente.rolCliente.rol;
        this.pedido.tipoEnvio = cliente.tipoDeEnvio.tipo;
        this.pedido.modalidad = "Una vía";
        this.pedido.status = 1;

        this.memoriaCliente = cliente;
        this.memoriaCliente.fecha = new Date();
      }
    },

    asignarHoy() {
      let hoy = new Date();
      return (this.pedido.fecha = hoy);
    },

    asignarMañana() {
      let hoy = new Date();
      let DIA_EN_MS = 24 * 60 * 60 * 1000;
      let manana = new Date(hoy.getTime() + DIA_EN_MS);
      return (this.pedido.fecha = manana);
    },

    onFileChanged(event) {
      this.file = event.target.files[0];
      this.uploadFile();
    },

    async uploadFile() {
      try {
        this.showLoading = true;
        const mypostparameters = new FormData();
        mypostparameters.append("file", this.file, this.file.name);

        let response = await PedidoService.procesarCSV(mypostparameters);
        let data = response.data.data;

        for (let i = 0; i < data.length; i++) {
          let info = await this.calcularDistancia(
            data[i].direccionConsignado,
            data[i].distritoConsignado
          );
          data[i]["distancia"] = info.distancia;
          data[i]["distanciaMemoria"] = info.distancia;
          data[i]["tarifa"] = info.tarifa;
          data[i]["tarifaMemoria"] = info.tarifaMemoria;
          data[i]["tarifaSugerida"] = info.tarifaSugerida;
          data[i]["CO2Ahorrado"] = info.CO2Ahorrado;
          data[i]["ruido"] = info.ruido;
          data[i]["recaudo"] = 0;
          data[i]["tramite"] = 0;
          data[i]["modalidad"] = "Una vía";
          data[i]["viajes"] = 1;
          this.tarifaTotal = this.tarifaTotal + info.tarifa;
          this.tarifaTotalSugerida =
            this.tarifaTotalSugerida + info.tarifaSugerida;
          this.distancia += info.distancia;
          this.recaudoTotal = 0;
          this.tramiteTotal = 0;
        }
        this.pedidos = [];
        this.pedidos = data;
        this.showLoading = false;
      } catch (error) {
        console.error(error.message);
        console.error(error);
      }
    },

    async getRuteo(id) {
      try {
        const response = await PedidoService.getRuteoById(id);
        this.pedido.fecha = response.data.pedidosRuta[0].fecha;

        this.pedido.contactoRemitente =
          response.data.pedidosRuta[0].contactoRemitente;
        this.pedido.empresaRemitente =
          response.data.pedidosRuta[0].empresaRemitente;
        this.pedido.telefonoRemitente =
          response.data.pedidosRuta[0].telefonoRemitente;
        this.pedido.direccionRemitente =
          response.data.pedidosRuta[0].direccionRemitente;
        this.pedido.distritoRemitente =
          response.data.pedidosRuta[0].distritoRemitente;
        this.pedido.otroDatoRemitente =
          response.data.pedidosRuta[0].otroDatoRemitente;

        this.pedido.tipoEnvio = response.data.pedidosRuta[0].tipoDeEnvio.tipo;
        this.pedido.tipoCarga = response.data.pedidosRuta[0].tipoCarga;
        this.pedido.formaPago = response.data.pedidosRuta[0].formaPago;
        this.pedido.mobiker = response.data.pedidosRuta[0].mobiker.fullName;
        this.pedido.rolCliente = response.data.pedidosRuta[0].rolCliente;

        for (let i = 0; i < response.data.pedidosRuta.length; i++) {
          response.data.pedidosRuta[i]["seleccionado"] = false;
          this.tarifaTotal =
            this.tarifaTotal + response.data.pedidosRuta[i].tarifa;
          this.tarifaTotalSugerida =
            this.tarifaTotalSugerida +
            response.data.pedidosRuta[i].tarifaSugerida;
          this.distanciaTotal += response.data.pedidosRuta[i].distancia;

          response.data.pedidosRuta[i].tarifaMemoria =
            response.data.pedidosRuta[i].tarifa;
          response.data.pedidosRuta[i].distanciaMemoria =
            response.data.pedidosRuta[i].distancia;
        }

        this.pedidos = response.data.pedidosRuta;

        await this.getPedidosByCliente(response.data.pedidosRuta[0].clienteId);

        this.pedido.tarifa = 0;
        this.pedido.tarifaSugerida = 0;
        this.pedido.comision = 0.0;
        this.pedido.recaudo = 0;
        this.pedido.tramite = 0;

        // Acomodando Fechas
        this.pedido.fecha = new Date(
          new Date(this.pedido.fecha).getTime() + 1000 * 60 * 60 * 5
        );
      } catch (error) {
        console.error(`Error al obtener un Ruteo por Id. ${error.message}`);
      }
    },

    async getPedidosByCliente(id) {
      let response = await ClienteService.getPedidosDelClienteById(id);

      for (let i = 0; i < response.data.length; i++) {
        if (
          !response.data[i].isRuteo &&
          response.data[i].statusId === 1 &&
          response.data[i].direccionRemitente ===
            this.pedido.direccionRemitente &&
          response.data[i].distritoRemitente ===
            this.pedido.distritoRemitente &&
          response.data[i].fecha === this.pedido.fecha &&
          response.data[i].tipoDeEnvio.tipo === this.pedido.tipoEnvio
        ) {
          response.data[i]["agregarAlRuteo"] = false;
          this.pedidosIndividualClienteActual.push(response.data[i]);
        }
      }
    },

    agregarPedidoDelListado() {
      for (
        let i = this.pedidosIndividualClienteActual.length - 1;
        i >= 0;
        i--
      ) {
        if (this.pedidosIndividualClienteActual[i].agregarAlRuteo) {
          this.pedidosIndividualClienteActual[i]["seleccionado"] = false;
          this.pedidos.push(this.pedidosIndividualClienteActual[i]);
          this.pedidosIndividualClienteActual.splice(i, 1);
        }
      }
      this.actualizarSumas();
    },

    seleccionarTodos(e) {
      console.log(e);
      for (let i = 0; i < this.pedidosRuteoSeleccionados.length; i++) {
        console.log(this.pedidosRuteoSeleccionados);
      }
    },

    anularPedidoDeRuteo() {
      for (let i = this.pedidos.length - 1; i >= 0; i--) {
        if (this.pedidos[i].seleccionado) {
          this.removeRuta(i, "anular");
        }
      }
    },

    quitarPedidoDeRuteo() {
      for (let i = this.pedidos.length - 1; i >= 0; i--) {
        if (this.pedidos[i].seleccionado) {
          this.removeRuta(i, "quitar");
        }
      }
    },
  },
  components: {
    ModelListSelect,
    BuscadorCliente,
    Datepicker,
    BaseAlerta,
  },
};
</script>

<style lang="scss">
table {
  width: 100%;
  max-width: 100%;
  min-width: 100%;
  overflow: scroll;
}

thead {
  display: table-header-group;
  vertical-align: middle;
  border-color: inherit;
  tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
  }
  th {
    padding: 0.75rem;
    display: table-cell;
    text-align: inherit;
    vertical-align: bottom;
    border-bottom: 3px solid #ccc;
  }
}

tbody tr {
  border-bottom: 1px solid #ccc;
  td {
    font-size: 12px;
    padding: 5px;
  }
}

.input2 {
  width: 90%;
  border-radius: 3px;
  margin: 5px;
}

.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
