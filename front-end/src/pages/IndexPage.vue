<template>
  <q-page class="flex flex-center" dark>
    <CompanyTableVue />
    <CreateCompanyDialog
      v-model="activeCompanyDialog"
      @closeInput="closeInput"
      :companyId="companyId"
      :isEdit="isEdit"
    />
  </q-page>
</template>

<style scoped></style>

<script>
import CreateCompanyDialog from "components/CreateCompanyDialog.vue";
import CompanyTableVue from "components/CompanyTable.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",

  components: { CompanyTableVue, CreateCompanyDialog },
});
</script>
