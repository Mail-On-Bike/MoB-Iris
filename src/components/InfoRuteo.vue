<template>
  <div class="p-4 bg-white rounded-xl gap-x-8">
    <!-- Top -->
    <div
      class="grid w-full grid-cols-3 mx-auto text-sm border-b-2 gap-x-8 border-secondary place-items-center"
    >
      <p class="mb-2">
        <span class="resalta">Fecha: </span>
        {{ $date(infoRuta.pedidosRuta[0].fecha).format("DD MMM YYYY") }}
      </p>

      <p class="mb-2 text-center">
        <span class="resalta">Tipo Envío: </span
        >{{ infoRuta.pedidosRuta[0].tipoDeEnvio.tipo }}
      </p>

      <div class="mb-2">
        <p
          v-if="infoRuta.pedidosRuta[0].status.id === 1"
          class="tag-programado"
        >
          {{ infoRuta.pedidosRuta[0].status.tag }}
        </p>
        <p v-if="infoRuta.pedidosRuta[0].status.id === 2" class="tag-recoger">
          {{ infoRuta.pedidosRuta[0].status.tag }}
        </p>
        <p v-if="infoRuta.pedidosRuta[0].status.id === 3" class="tag-transito">
          {{ infoRuta.pedidosRuta[0].status.tag }}
        </p>
        <p v-if="infoRuta.pedidosRuta[0].status.id === 4" class="tag-entregado">
          {{ infoRuta.pedidosRuta[0].status.tag }}
        </p>
        <p
          v-if="infoRuta.pedidosRuta[0].status.id === 5"
          class="tag-falso-flete"
        >
          {{ infoRuta.pedidosRuta[0].status.tag }}
        </p>
        <p v-if="infoRuta.pedidosRuta[0].status.id === 6" class="tag-anulado">
          {{ infoRuta.pedidosRuta[0].status.tag }}
        </p>
      </div>
    </div>

    <!-- Info Origen -->
    <div
      class="flex flex-col justify-center text-xs border-b-2 border-secondary"
    >
      <h2 class="my-4 text-2xl font-bold text-center text-primary">
        Origen
      </h2>

      <div class="mx-auto mb-4">
        <p class="mb-2">
          <span class="resalta">Contacto: </span>
          {{ infoRuta.pedidosRuta[0].contactoRemitente }}
        </p>
        <p class="mb-2">
          <span class="resalta">Empresa: </span
          >{{ infoRuta.pedidosRuta[0].empresaRemitente }}
        </p>
        <p class="mb-2">
          <span class="resalta">Dirección: </span
          >{{ infoRuta.pedidosRuta[0].direccionRemitente }}
        </p>
        <p class="mb-2">
          <span class="resalta">Distrito: </span
          >{{ infoRuta.pedidosRuta[0].distritoRemitente }}
        </p>
        <p class="mb-2">
          <span class="resalta">Teléfono: </span
          >{{ infoRuta.pedidosRuta[0].telefonoRemitente }}
        </p>
        <p class="mb-2" v-if="infoRuta.pedidosRuta[0].otroDatoRemitente">
          <span class="font-bold text-red-600">Observaciones del Cliente: </span
          >{{ infoRuta.pedidosRuta[0].otroDatoRemitente }}
        </p>
      </div>
    </div>

    <!-- Mención del MoBiker Asignado -->
    <div class="grid w-full col-span-2 py-2 my-2 text-xs place-items-center ">
      <p>
        <span class="resalta">MoBiker: </span
        >{{ infoRuta.pedidosRuta[0].mobiker.fullName }}
      </p>
    </div>

    <!-- Info Pedidos -->
    <div class="p-4 ">
      <div
        class="grid items-center grid-cols-12 pb-2 text-sm font-bold text-center border-b-2 text-primary border-secondary"
      >
        <p># Pedido</p>
        <p class="col-span-2">Contacto</p>
        <p class="col-span-2">Dirección</p>
        <p>Distrito</p>
        <p class="col-span-3">Observaciones</p>
        <p>Tarifa</p>
        <p>Recaudo</p>
        <p>Trámite</p>
      </div>

      <div
        class="grid items-center grid-cols-12 py-2 overflow-y-auto text-xs text-center border-b max-h-52 border-primary"
        v-for="ruta in infoRuta.pedidosRuta"
        :key="ruta.id"
      >
        <div>
          <router-link
            :to="`/pedidos/tablero-pedidos/${ruta.id}`"
            custom
            v-slot="{ navigate }"
          >
            <span
              @click="navigate"
              role="link"
              class="font-bold text-center cursor-pointer text-primary"
              >{{ ruta.id }}</span
            >
          </router-link>
        </div>

        <div class="col-span-2">
          <router-link
            :to="`/pedidos/tablero-pedidos/${ruta.id}`"
            custom
            v-slot="{ navigate }"
          >
            <span @click="navigate" role="link" class="cursor-pointer">{{
              ruta.contactoConsignado
            }}</span>
          </router-link>
        </div>

        <div class="col-span-2">
          <router-link
            :to="`/pedidos/tablero-pedidos/${ruta.id}`"
            custom
            v-slot="{ navigate }"
          >
            <span @click="navigate" role="link" class="cursor-pointer">{{
              ruta.direccionConsignado
            }}</span>
          </router-link>
        </div>

        <div>
          <router-link
            :to="`/pedidos/tablero-pedidos/${ruta.id}`"
            custom
            v-slot="{ navigate }"
          >
            <span @click="navigate" role="link" class="cursor-pointer">{{
              ruta.distrito.distrito
            }}</span>
          </router-link>
        </div>

        <div class="col-span-3">
          <router-link
            :to="`/pedidos/tablero-pedidos/${ruta.id}`"
            custom
            v-slot="{ navigate }"
          >
            <span
              v-if="ruta.otroDatoConsignado"
              @click="navigate"
              role="link"
              class="font-bold cursor-pointer text-primary"
              >{{ ruta.otroDatoConsignado }}</span
            >

            <div v-else></div>
          </router-link>
        </div>

        <div>
          <router-link
            :to="`/pedidos/tablero-pedidos/${ruta.id}`"
            custom
            v-slot="{ navigate }"
          >
            <span
              @click="navigate"
              role="link"
              class="text-center cursor-pointer"
              >S/. {{ ruta.tarifa }}</span
            >
          </router-link>
        </div>

        <div>
          <router-link
            :to="`/pedidos/tablero-pedidos/${ruta.id}`"
            custom
            v-slot="{ navigate }"
          >
            <span
              @click="navigate"
              role="link"
              class="text-center cursor-pointer"
              >S/. {{ ruta.recaudo }}</span
            >
          </router-link>
        </div>

        <div>
          <router-link
            :to="`/pedidos/tablero-pedidos/${ruta.id}`"
            custom
            v-slot="{ navigate }"
          >
            <span
              @click="navigate"
              role="link"
              class="text-center cursor-pointer "
              >S/. {{ ruta.tramite }}</span
            >
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    infoRuta: { type: Object },
  },
};
</script>
