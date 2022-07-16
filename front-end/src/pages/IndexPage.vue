<template>
  <q-page class="flex flex-center">
    <CompaniesTable></CompaniesTable>
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import CompaniesTable from "CompaniesTable";

export default defineComponent({
  name: "IndexPage",

  components: { CompaniesTable },
});
</script>
