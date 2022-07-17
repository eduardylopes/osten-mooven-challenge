<template>
  <q-page class="flex flex-center" dark>
    <CompanyTableVue />
  </q-page>
</template>

<style scoped></style>

<script>
import CompanyTableVue from "components/CompanyTable.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",

  components: {
    CompanyTableVue,
  },
});
</script>
