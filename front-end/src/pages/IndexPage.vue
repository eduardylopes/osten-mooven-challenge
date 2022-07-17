<template>
  <q-page class="flex flex-center">
    <CompanyTableVue />
  </q-page>
</template>

<script>
import CompanyTableVue from "src/components/CompanyTable.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",

  components: { CompanyTableVue },
});
</script>
