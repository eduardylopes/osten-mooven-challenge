const routes = [
  {
    path: "/company",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Company.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
