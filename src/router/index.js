import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
  },
  {
    path: "/editar-user/:id",
    name: "EditarUser",
    component: () => import("@/views/EditarUser.vue"),
    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
  },
  {
    path: "/perfil",
    name: "Perfil",
    component: () => import("@/views/Profile.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/equipo-admin",
    name: "EquipoAdmin",
    component: () => import("@/views/EquipoAdmin.vue"),
    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
  },
  {
    path: "/pedidos/tablero-pedidos",
    name: "TableroPedidos",
    component: () => import("@/views/Pedidos/TableroPedidos.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/pedidos/pedidos-programados",
    name: "TableroAsignacion",
    component: () => import("@/views/Pedidos/TableroAsignacion.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/pedidos/nuevo-pedido",
    name: "NuevoPedido",
    component: () => import("@/views/Pedidos/NuevoPedido.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/pedidos/tablero-pedidos/:id",
    name: "EditarPedido",
    component: () => import("@/views/Pedidos/EditarPedido.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/pedidos/ruteo",
    name: "Ruteo",
    component: () => import("@/views/Pedidos/Ruteo.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/pedidos/ruteo/:id",
    name: "EditarRuteo",
    component: () => import("@/views/Pedidos/EditarRuteo.vue"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/mobikers/equipo-mobiker",
    name: "EquipoMobiker",
    component: () => import("@/views/MoBikers/EquipoMobiker.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/mobikers/nuevo-mobiker",
    name: "NuevoMobiker",
    component: () => import("@/views/MoBikers/NuevoMobiker.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/mobikers/equipo-mobiker/:id",
    name: "EditarMobiker",
    component: () => import("@/views/MoBikers/EditarMobiker.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/mobikers/mobiker-top",
    name: "MobikerTop",
    component: () => import("@/views/MoBikers/MobikerTop.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/clientes/tablero-clientes",
    name: "TableroClientes",
    component: () => import("@/views/Clientes/TableroClientes.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/clientes/nuevo-cliente",
    name: "NuevoCliente",
    component: () => import("@/views/Clientes/NuevoCliente.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/clientes/tablero-clientes/:id",
    name: "EditarCliente",
    component: () => import("@/views/Clientes/EditarCliente.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/finanzas/historial-pedidos",
    name: "HistorialPedidos",
    component: () => import("@/views/Finanzas/HistorialPedidos.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/finanzas/comisiones",
    name: "Comisiones",
    component: () => import("@/views/Finanzas/Comisiones.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/finanzas/facturacion",
    name: "Facturacion",
    component: () => import("@/views/Finanzas/Facturacion.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/finanzas/transferencias",
    name: "Transferencias",
    component: () => import("@/views/Finanzas/Transferencias.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/finanzas/recaudos",
    name: "Recaudos",
    component: () => import("@/views/Finanzas/Recaudos.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Páginas Públicas
  if (
    to.matched.some(
      (record) => record.meta.requiresAuth && !record.meta.isAdmin
    )
  ) {
    if (!user) {
      next("/login");
    } else {
      next();
    }
  }

  // Páginas exclusivas para el Administrador
  if (
    to.matched.some((record) => record.meta.requiresAuth && record.meta.isAdmin)
  ) {
    if (user.roles.some((rol) => rol.toLowerCase() === "administrador")) {
      next();
    } else {
      next("/perfil");
    }
  }

  next();
});

export default router;
