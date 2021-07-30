<template>
  <div>
    <pre>
**Estadísticas de {{ estadisticas.fullName }}**

**BiciEnvíos: ** {{ estadisticas.biciEnvios }}
**Kilómetros: ** {{ estadisticas.kilometros }} Km
**CO2 Ahorrado: ** {{ estadisticas.CO2Ahorrado }} Kg
**Horas de Ruido Ahorrado: ** {{ estadisticas.ruido }} h
**Nivel MoB es: ** {{ estadisticas.rango.rangoMoBiker }}
    </pre>
  </div>
</template>

<script>
export default {
  props: {
    estadisticas: Object,
  },
};
</script>
