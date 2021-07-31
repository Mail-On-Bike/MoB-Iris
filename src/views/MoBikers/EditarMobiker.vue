<template>
  <div class="px-8 py-4 mx-auto mt-10 bg-gray-100 shadow-lg rounded-xl">
    <div class="flex justify-end">
      <h1
        class="relative inline-block px-6 py-2 mb-4 text-2xl font-bold text-center bg-gray-100 text-primary rounded-xl -top-12"
      >
        Editar MoBiker
      </h1>
    </div>

    <form
      class="-mt-10"
      @submit.prevent="handleEditarMobiker"
      autocomplete="off"
    >
      <div class="grid grid-cols-5 gap-4 mb-4">
        <div class="flex flex-col">
          <label for="nombres" class="label-input">Nombres</label>
          <input
            v-model="editarMobiker.nombres"
            v-validate="'required'"
            type="text"
            name="nombres"
            class="input"
          />
          <div
            v-if="errors.has('nombres')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>El nombre es requerido</p>
          </div>
        </div>

        <div class="flex flex-col">
          <label for="apellidos" class="label-input">Apellidos</label>
          <input
            v-model="editarMobiker.apellidos"
            type="text"
            v-validate="'required'"
            name="apellidos"
            class="input"
          />
          <div
            v-if="errors.has('apellidos')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>Al menos 1 apellido es requerido</p>
          </div>
        </div>

        <div class="flex flex-col">
          <label for="telefono" class="label-input">Teléfono</label>
          <input
            v-model="editarMobiker.telefono"
            type="string"
            v-validate="'required|min:6|max:12'"
            name="telefono"
            class="input"
          />
          <div
            v-if="errors.has('telefono')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>El teléfono es requerido y debe tener máximo 9 números</p>
          </div>
        </div>

        <div class="flex flex-col">
          <label for="telegram" class="label-input">Usuario Telegram</label>
          <input
            v-model="editarMobiker.telegram"
            type="text"
            v-validate="'required'"
            name="telegram"
            class="input"
          />
          <div
            v-if="errors.has('telegram')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>El Telegram es requerido</p>
          </div>
        </div>

        <div class="flex flex-col">
          <label for="genero" class="label-input">Género</label>
          <model-list-select
            v-model="editarMobiker.genero"
            :list="generos"
            v-validate="'required'"
            name="genero"
            option-text="gen"
            option-value="gen"
          />
          <div
            v-if="errors.has('genero')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>El Género es requerido</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-4 gap-4 mb-4">
        <div class="flex flex-col">
          <label for="direccion" class="label-input">Dirección</label>
          <input
            v-model="editarMobiker.direccion"
            type="text"
            v-validate="'required'"
            name="direccion"
            class="input"
          />
          <div
            v-if="errors.has('direccion')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>La dirección es requerida</p>
          </div>
        </div>

        <div class="flex flex-col">
          <label for="distrito" class="label-input">Distrito</label>
          <model-list-select
            name="distrito"
            v-model="editarMobiker.distrito"
            v-validate="'required'"
            placeholder="Buscar distrito..."
            :list="distritos"
            option-text="distrito"
            option-value="distrito"
          />
          <div
            v-if="errors.has('distrito')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>El distrito es requerido</p>
          </div>
        </div>

        <div class="flex flex-col">
          <label for="tipoDocumento" class="label-input"
            >Tipo de Documento</label
          >
          <model-list-select
            v-model="editarMobiker.tipoDocumento"
            name="tipoDocumento"
            :list="tiposDocumentos"
            option-text="doc"
            option-value="doc"
            placeholder="Opcional"
          />
          <div
            v-if="errors.has('tipoDocumento')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>El tipo de documento es requerido</p>
          </div>
        </div>

        <div class="flex flex-col">
          <label for="numeroDocumento" class="label-input"
            >Número de Documento</label
          >
          <input
            v-model="editarMobiker.numeroDocumento"
            type="string"
            v-validate="'min:8|max:10'"
            name="numeroDocumento"
            class="input"
            placeholder="Opcional"
          />
          <div
            v-if="errors.has('numeroDocumento')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>Ingrese número de documento válido</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-5 gap-4 mb-4">
        <div class="flex flex-col">
          <label for="fechaNacimiento" class="label-input"
            >Fecha de Nacimiento</label
          >
          <datepicker
            v-model="editarMobiker.fechaNacimiento"
            v-validate="'required'"
            name="fechaNacimiento"
            input-class="input"
            :monday-first="true"
            :language="es"
            format="dd MMMM yyyy"
          />
          <div
            v-if="errors.has('fechaNacimiento')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>La fecha de Nacimiento es requerida</p>
          </div>
        </div>

        <div class="flex flex-col">
          <label for="email" class="label-input">Email</label>
          <input
            v-model="editarMobiker.email"
            type="email"
            name="email"
            class="input"
            placeholder="Opcional"
          />
        </div>

        <div class="flex flex-col">
          <label for="tipoBicicleta" class="label-input"
            >Tipo de Bicicleta</label
          >
          <model-list-select
            v-model="editarMobiker.tipoBicicleta"
            :list="tipoBicicletas"
            v-validate="'required'"
            name="tipoBicicleta"
            option-text="bici"
            option-value="bici"
          />
          <div
            v-if="errors.has('tipoBicicleta')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>El tipo de bicicleta es requerido</p>
          </div>
        </div>

        <div class="flex flex-col">
          <label for="equipo" class="label-input">Equipo</label>
          <model-list-select
            v-model="editarMobiker.equipo"
            :list="equipoDeTrabajo"
            v-validate="'required'"
            name="equipo"
            option-text="equipo"
            option-value="equipo"
          />
          <div
            v-if="errors.has('equipo')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>El equipo es requerido</p>
          </div>
        </div>

        <div class="flex flex-col">
          <label for="rango" class="label-input">Nivel</label>
          <model-list-select
            v-model="editarMobiker.rango"
            :list="rangosMoBiker"
            v-validate="'required'"
            name="rango"
            option-text="rangoMoBiker"
            option-value="rangoMoBiker"
          />
          <div
            v-if="errors.has('equipo')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>El Nivel es requerido</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-5 gap-4 mb-10">
        <div class="flex flex-col">
          <label for="fechaIngreso" class="label-input">Fecha de Ingreso</label>
          <datepicker
            v-model="editarMobiker.fechaIngreso"
            v-validate="'required'"
            name="fechaIngreso"
            type="date"
            input-class="input"
            :monday-first="true"
            :language="es"
            format="dd MMMM yyyy"
          />
          <div
            v-if="errors.has('fechaIngreso')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>La fecha de ingreso es requerida</p>
          </div>
        </div>

        <div class="flex flex-col">
          <label for="banco" class="label-input">Entidad Financiera</label>
          <model-list-select
            v-model="editarMobiker.banco"
            name="banco"
            :list="entidadesBancarias"
            option-text="banco"
            option-value="banco"
            placeholder="Opcional"
          />
        </div>

        <div class="flex flex-col">
          <label for="tipoCuenta" class="label-input"
            >Tipo de Cuenta Bancaria</label
          >
          <model-list-select
            v-model="editarMobiker.tipoCuenta"
            :list="cuentaBancaria"
            name="tipoCuenta"
            option-text="cuenta"
            option-value="cuenta"
            placeholder="Opcional"
          />
        </div>

        <div class="flex flex-col">
          <label for="numeroCuentaBancaria" class="label-input"
            >Número de Cuenta Bancaria</label
          >
          <input
            v-model="editarMobiker.numeroCuentaBancaria"
            type="text"
            class="input"
            placeholder="Opcional"
          />
        </div>

        <div class="flex flex-col">
          <label for="status" class="label-input">Estado del MoBiker</label>
          <model-list-select
            v-model="editarMobiker.status"
            :list="estadosMoBiker"
            v-validate="'required'"
            name="status"
            option-text="status"
            option-value="status"
          />
          <div
            v-if="errors.has('equipo')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>El estado es requerido</p>
          </div>
        </div>
      </div>

      <div class="flex flex-row justify-between mb-6">
        <button
          @click="cancelar"
          type="button"
          class="block px-6 py-2 mx-auto font-bold text-white transition duration-200 bg-red-500 rounded-lg shadow-lg hover:bg-red-700 hover:shadow-xl focus:outline-none"
        >
          Cancelar
        </button>

        <button
          type="submit"
          class="block px-6 py-2 mx-auto font-bold text-white transition duration-200 rounded-lg shadow-lg bg-info hover:bg-secondary hover:shadow-xl focus:outline-none"
        >
          Editar MoBiker
        </button>
      </div>
    </form>

    <BaseAlerta v-if="alert.show" :alert="alert" />
  </div>
</template>

<script>
import BaseAlerta from "@/components/BaseAlerta.vue";
import Mobiker from "@/models/mobiker";
import { ModelListSelect } from "vue-search-select";
import { mapState, mapActions } from "vuex";
import { es } from "vuejs-datepicker/dist/locale";
import MobikerService from "@/services/mobiker.service";
import Datepicker from "vuejs-datepicker";

export default {
  name: "EditarMobiker",
  data() {
    return {
      editarMobiker: new Mobiker(),
      alert: {
        message: "",
        success: false,
        show: false,
      },
      tiposDocumentos: [
        { doc: "DNI" },
        { doc: "Pasaporte" },
        { doc: "Carnet de Extranjería" },
        { doc: "PTP" },
      ],
      generos: [
        { gen: "Masculino" },
        { gen: "Femenino" },
        { gen: "No Binario" },
      ],
      tipoBicicletas: [
        { bici: "MTB" },
        { bici: "Rutera/Fixie" },
        { bici: "Cargo" },
      ],
      equipoDeTrabajo: [
        { equipo: "Caja Térmica" },
        { equipo: "Jaba/Canastilla" },
        { equipo: "Mochila" },
        { equipo: "Mochila MoB" },
      ],
      cuentaBancaria: [
        { cuenta: "Sin Cuenta" },
        { cuenta: "Cuenta de Ahorros" },
        { cuenta: "Cuenta Corriente" },
      ],
      estadosMoBiker: [
        {
          id: 1,
          status: "Activo",
        },
        {
          id: 2,
          status: "Inactivo",
        },
        {
          id: 3,
          status: "Retirado",
        },
      ],
      es: es,
    };
  },
  mounted() {
    try {
      this.getMobiker(this.$route.params.id);
    } catch (error) {
      console.error("Mensaje de error:", error);
    }
  },
  computed: {
    ...mapState("auxiliares", [
      "distritos",
      "entidadesBancarias",
      "rangosMoBiker",
    ]),
  },
  methods: {
    ...mapActions("mobikers", ["getMobikers"]),

    async getMobiker(id) {
      try {
        let response = await MobikerService.getMobikerById(id);

        this.editarMobiker = response.data;
        this.editarMobiker.rango = response.data.rango.rangoMoBiker;

        // Acomodando Fechas
        this.editarMobiker.fechaNacimiento = new Date(
          new Date(this.editarMobiker.fechaNacimiento).getTime() +
            1000 * 60 * 60 * 5
        );
        this.editarMobiker.fechaIngreso = new Date(
          new Date(this.editarMobiker.fechaIngreso).getTime() +
            1000 * 60 * 60 * 5
        );
      } catch (error) {
        console.error(`Error al obtener el MoBiker: ${error}`);
      }
    },

    async handleEditarMobiker() {
      try {
        const isValid = await this.$validator.validateAll();
        if (!isValid) {
          return;
        }

        const response = await MobikerService.editMobiker(
          this.$route.params.id,
          this.editarMobiker
        );

        this.alert.message = response.data.message;
        this.alert.show = true;
        this.alert.success = true;
        await this.getMobikers();

        setTimeout(() => {
          history.go(-1);
        }, 1500);
      } catch (error) {
        console.error(`Error al actualizar al MoBiker: ${error}`);
        this.alert.message = error.response.data.message;
        this.alert.show = true;
        this.alert.success = false;
        setTimeout(() => (this.alert.show = false), 2500);
      }
    },

    revision() {
      console.log(this.editarMobiker.fechaNacimiento);
    },

    cancelar() {
      history.go(-1);
    },
  },
  components: {
    ModelListSelect,
    Datepicker,
    BaseAlerta,
  },
};
</script>
