<template>
  <div class="px-8 py-4 mx-auto mt-10 bg-gray-100 shadow-lg rounded-xl">
    <div class="flex justify-end">
      <h1
        class="relative inline-block px-6 py-2 mb-4 text-2xl font-bold text-center bg-gray-100 text-primary rounded-xl -top-12"
      >
        Nuevo Destino Recurrente
      </h1>
    </div>

    <form
      class="-mt-10"
      @submit.prevent="handleEditarDestino"
      autocomplete="off"
    >
      <div class="grid grid-cols-3 gap-4">
        <div>
          <label for="contacto" class="label-input">Contacto</label>
          <input
            v-model="editarDestino.contacto"
            v-validate="'required'"
            type="text"
            name="contacto"
            class="input"
          />
          <div
            v-if="errors.has('contacto')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>El contacto es requerido</p>
          </div>
        </div>

        <div>
          <label for="empresa" class="label-input">Empresa</label>
          <input
            v-model="editarDestino.empresa"
            v-validate="'required'"
            type="text"
            name="empresa"
            class="input"
          />
          <div
            v-if="errors.has('empresa')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>La empresa es requerido</p>
          </div>
        </div>

        <div>
          <label for="telefono" class="label-input">Teléfono</label>
          <input
            v-model="editarDestino.telefono"
            v-validate="'required|min:6|max:12'"
            type="text"
            name="contacto"
            class="input"
          />
          <div
            v-if="errors.has('telefono')"
            class="p-2 text-sm text-white bg-red-500 rounded"
          >
            <p>El telefono es requerido y debe tener máximo 9 números</p>
          </div>
        </div>

        <div class="col-span-2">
          <label for="direccion" class="label-input">Dirección</label>
          <input
            v-model="editarDestino.direccion"
            v-validate="'required'"
            type="text"
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

        <div>
          <label for="distrito" class="label-input">Distrito</label>
          <model-list-select
            v-validate="'required'"
            name="distrito"
            v-model="editarDestino.distrito"
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

        <div class="col-span-3">
          <label for="otroDato" class="label-input">Observaciones</label>
          <input
            v-model="editarDestino.otroDato"
            type="text"
            name="otroDato"
            class="input"
          />
        </div>
      </div>

      <div class="flex flex-row justify-between mt-10 mb-6">
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
          Crear Nuevo Destino Recurrente
        </button>
      </div>
    </form>

    <BaseAlerta v-if="alert.show" :alert="alert" />
  </div>
</template>

<script>
import Destino from "@/models/destino";
import DestinoService from "@/services/destino.service";
import BaseAlerta from "@/components/BaseAlerta.vue";
import { ModelListSelect } from "vue-search-select";
import { mapState } from "vuex";

export default {
  name: "EditarDestino",
  components: {
    ModelListSelect,
    BaseAlerta,
  },
  data() {
    return {
      editarDestino: new Destino(),
      alert: {
        message: "",
        success: false,
        show: false,
      },
    };
  },
  computed: {
    ...mapState("auxiliares", ["distritos"]),
  },
  mounted() {
    this.getDestino(this.$route.params.id);
  },
  methods: {
    async getDestino(id) {
      try {
        this.editarDestino = await DestinoService.getDestino(id);
      } catch (error) {
        console.error(`Error al obtener el destino por id: ${error.message}`);
      }
    },

    async handleEditarDestino() {
      try {
        const isValid = await this.$validator.validateAll();
        if (!isValid) {
          return;
        }

        const response = await DestinoService.updateDestino(
          this.$route.params.id,
          this.editarDestino
        );

        this.alert.message = response.data.message;
        this.alert.show = true;
        this.alert.success = true;

        setTimeout(() => {
          history.go(-1);
        }, 1500);
      } catch (error) {
        console.log(
          `Error al editar Destino Recurrente: ${error.response.data.message}`
        );
        this.alert.message = error.response.data.message;
        this.alert.show = true;
        this.alert.success = false;
        setTimeout(() => (this.alert.show = false), 2500);
      }
    },

    cancelar() {
      history.go(-1);
    },
  },
};
</script>
