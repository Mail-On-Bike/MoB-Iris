<template>
  <div
    class="flex flex-col justify-center w-full h-full p-4 text-sm"
    v-if="estadisticas"
  >
    <div class="mb-2 text-center">
      <span class="resalta">Total Bicienvios: </span>
      <span class="select-all">{{ estadisticas.biciEnvios }}</span>
    </div>

    <div class="mb-2 text-center">
      <span class="resalta">E-Commerce: </span>
      <span class="select-all">{{ contarEcommerce(pedidos) }}</span>
    </div>

    <div class="mb-2 text-center">
      <span class="resalta">Express: </span>
      <span class="select-all">{{ contarExpress(pedidos) }}</span>
    </div>

    <div class="mb-2 text-center">
      <span class="resalta">Total de kilómetros: </span>
      <span class="select-all">{{ estadisticas.kilometros }} km</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseBiciEnvios",
  props: {
    estadisticas: Object,
    pedidos: Array,
  },
  methods: {
    contarEcommerce(pedidos) {
      let contadorEcommerce = pedidos.reduce((acc, pedido) => {
        if (pedido.tipoDeEnvioId === 1) {
          return acc + pedido.viajes;
        } else {
          return acc;
        }
      }, 0);

      return contadorEcommerce;
    },

    contarExpress(pedidos) {
      let contadorEcommerce = pedidos.reduce((acc, pedido) => {
        if (
          pedido.tipoDeEnvioId === 3 ||
          pedido.tipoDeEnvioId === 2 ||
          pedido.tipoDeEnvioId === 4
        ) {
          return acc + pedido.viajes;
        } else {
          return acc;
        }
      }, 0);

      return contadorEcommerce;
    },
  },
};
</script>
