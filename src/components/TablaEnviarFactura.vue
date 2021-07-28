<template>
  <table v-if="casoEspecial" class="table w-full border-collapse table-auto ">
    <tr
      class="table-row text-sm text-center text-white border-2 bg-secondary border-secondary"
    >
      <th class="table-cell">Fecha</th>
      <th class="table-cell">Solicitante</th>
      <th class="table-cell">Consignado</th>
      <th class="table-cell">Dirección</th>
      <th class="table-cell">Distrito</th>
      <th class="table-cell">Tarifa</th>
      <th class="table-cell">Trámite</th>
      <th class="table-cell">Observaciones</th>
    </tr>

    <tr
      class="table-row text-xs border-2 odd:bg-info odd:text-white border-secondary"
      v-for="detalle in info"
      :key="detalle.id"
    >
      <td class="table-cell px-2 text-center border-2 border-secondary">
        {{ $date(detalle.fecha).format("DD MMM") }}
      </td>
      <td class="table-cell px-2 border-2 border-secondary">
        {{ capitalizar(detalle.contactoRemitente) }}
      </td>
      <td class="table-cell px-2 border-2 border-secondary">
        {{
          detalle.contactoConsignado.toLowerCase() === "mesa de partes"
            ? capitalizar(detalle.empresaoConsignado)
            : capitalizar(detalle.contactoConsignado)
        }}
      </td>
      <td class="table-cell px-2 border-2 border-secondary">
        {{ capitalizar(detalle.direccionConsignado) }}
      </td>
      <td class="table-cell px-2 border-2 border-secondary">
        {{ detalle.distrito.distrito }}
      </td>
      <td class="table-cell px-2 text-center border-2 border-secondary">
        {{ detalle.tarifa }}
      </td>
      <td class="table-cell px-2 text-center border-2 border-secondary">
        {{ detalle.otroDatoConsignado }}
      </td>
    </tr>

    <tr class="table-row">
      <td class="table-cell"></td>
      <td class="table-cell"></td>
      <td class="table-cell"></td>
      <td class="table-cell"></td>
      <td class="table-cell"></td>
      <td
        class="table-cell px-2 font-bold text-center border-2 border-secondary text-primary"
      >
        {{ totalTarifa }}
      </td>
      <td
        class="table-cell px-2 font-bold text-center border-2 border-secondary text-primary"
      >
        {{ totalTramite }}
      </td>
    </tr>
  </table>

  <table v-else class="table w-full border-collapse table-auto ">
    <tr
      class="table-row text-sm text-center text-white border-2 bg-secondary border-secondary"
    >
      <th class="table-cell">Fecha</th>
      <th class="table-cell">Consignado</th>
      <th class="table-cell">Dirección</th>
      <th class="table-cell">Distrito</th>
      <th class="table-cell">Tarifa</th>
      <th class="table-cell">Trámite</th>
      <th class="table-cell">Observaciones</th>
    </tr>

    <tr
      class="table-row text-xs border-2 odd:bg-info odd:text-white border-secondary"
      v-for="detalle in info"
      :key="detalle.id"
    >
      <td class="table-cell px-2 text-center border-2 border-secondary">
        {{ $date(detalle.fecha).format("DD MMM") }}
      </td>
      <td class="table-cell px-2 border-2 border-secondary">
        {{
          detalle.contactoConsignado.toLowerCase() === "mesa de partes"
            ? capitalizar(detalle.empresaConsignado)
            : capitalizar(detalle.contactoConsignado)
        }}
      </td>
      <td class="table-cell px-2 border-2 border-secondary">
        {{ capitalizar(detalle.direccionConsignado) }}
      </td>
      <td class="table-cell px-2 border-2 border-secondary">
        {{ detalle.distrito.distrito }}
      </td>
      <td class="table-cell px-2 text-center border-2 border-secondary">
        {{ detalle.tarifa }}
      </td>
      <td class="table-cell px-2 text-center border-2 border-secondary">
        {{ detalle.tramite }}
      </td>
      <td class="table-cell px-2 text-center border-2 border-secondary">
        {{ detalle.otroDatoConsignado }}
      </td>
    </tr>

    <tr class="table-row">
      <td class="table-cell"></td>
      <td class="table-cell"></td>
      <td class="table-cell"></td>
      <td class="table-cell"></td>
      <td
        class="table-cell px-2 font-bold text-center border-2 border-secondary text-primary"
      >
        {{ totalTarifa }}
      </td>
      <td
        class="table-cell px-2 font-bold text-center border-2 border-secondary text-primary"
      >
        {{ totalTramite }}
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "TablaEnviarFactura",
  props: {
    info: {
      type: Array,
      required: true,
    },
    casoEspecial: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    totalTarifa() {
      let total = this.info.reduce((acc, detalle) => {
        return +detalle.tarifa + acc;
      }, 0);
      return +total.toFixed(2);
    },

    totalTramite() {
      let total = this.info.reduce((acc, detalle) => {
        return +detalle.tramite + acc;
      }, 0);
      return +total.toFixed(2);
    },
  },
  methods: {
    capitalizar(texto) {
      const nuevoTexto = texto
        .trim()
        .toLowerCase()
        .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

      return nuevoTexto;
    },
  },
};
</script>
