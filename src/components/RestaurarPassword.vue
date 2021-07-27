<template>
  <div
    class="absolute z-40 w-1/2 p-8 transform -translate-x-1/2 shadow-xl bg-primary top-24 left-1/2 rounded-xl"
  >
    <div class="absolute -top-4 -right-2">
      <button
        class="px-2 text-2xl text-white rounded-full bg-info hover:bg-secondary focus:outline-none"
        @click.prevent="cerrarBuscador"
      >
        <font-awesome-icon icon="times" />
      </button>
    </div>

    <div class="p-6 bg-white rounded-xl">
      <p class="text-lg text-center">
        Estás a punto de restablecer la contraseña de
        <span class="resalta">{{ currentUser.fullName }}</span
        >. ¿Quieres continuar?
      </p>
    </div>

    <div class="flex justify-around mt-6">
      <button
        class="px-6 py-2 mx-auto font-bold text-white transition duration-200 bg-red-500 rounded-lg shadow-lg hover:bg-red-700 hover:shadow-xl focus:outline-none"
        @click="restaurarPassword(currentUser.id)"
      >
        Restaurar Contraseña
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentUser: {
      type: Object,
      required: true,
    },
    restaurarPassword: {
      type: Function,
    },
  },
  methods: {
    cerrarBuscador() {
      this.$emit("cerrarBuscador");
    },
  },
};
</script>
