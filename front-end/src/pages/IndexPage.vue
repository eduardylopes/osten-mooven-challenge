<template>
  <q-page class="flex flex-center" dark>
    <CompanyTableVue />
  </q-page>
</template>

<style scoped>
/* .q-page {
  background-color: rgb(29, 29, 29);
} */
</style>

<script>
import CompanyTableVue from "src/components/CompanyTable.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",

  components: { CompanyTableVue },
});
</script>
