<template>
  <q-layout class="bg-dark" view="lHh Lpr lFf">
    <CompanyTable />
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import CompanyTable from "src/components/CompanyTable.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    CompanyTable,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {};
  },
});
</script>
