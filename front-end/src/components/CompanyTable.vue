<template>
  <q-table
    class="container"
    title="Treats"
    :rows="companies"
    :columns="columns"
    row-key="name"
    table-header-class="text-secondary font-weight-bold"
    dark
    square
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="id" :props="props">
          {{ props.row.id }}
        </q-td>

        <q-td key="corporate_name" :props="props">
          {{ props.row.corporate_name }}
        </q-td>

        <q-td key="cnpj" :props="props">
          {{ props.row.cnpj }}
        </q-td>

        <q-td key="action" :props="props">
          <q-btn
            outline
            dense
            @click="onShowDetail(props.row.id)"
            class="q-mr-sm"
            color="yellow-14"
            name="action"
            icon="visibility"
          >
            <q-tooltip>Visualizar</q-tooltip>
          </q-btn>
          <q-btn
            outline
            dense
            @click="onEditCompany(props.row.id)"
            color="light-blue-10"
            class="q-mr-sm"
            name="action"
            icon="edit"
          >
            <q-tooltip>Editar</q-tooltip>
          </q-btn>
          <q-btn
            outline
            dense
            @click="confirmDeleteCompany(props.row.id)"
            color="red-6"
            name="action"
            icon="delete"
          >
            <q-tooltip>Editar</q-tooltip>
          </q-btn>
        </q-td>
      </q-tr>
    </template>

    <template v-slot:top>
      <div class="row full-width justify-between q-mb-md flex flex-row header">
        <q-input
          class="q-mr-md teal-10"
          debounce="600"
          color="teal-10"
          dark
          filled
          label-color="primary"
          v-model="filter"
          v-on:keyup.enter="(ev) => filterCompany(ev)"
        >
          <template v-slot:append>
            <q-icon name="search" color="secondary" />
          </template>
        </q-input>

        <q-btn
          color="secondary"
          label="Cadastrar empresa"
          @click="onShowDialog()"
        />
      </div>
    </template>
  </q-table>
  <CompanyDialog
    v-model="activeCompanyDialog"
    @closeInput="closeInput"
    :companyId="companyId"
    :isEdit="isEdit"
  />
  <CompanyDetail
    v-model="activeCompanyDetail"
    @closeInput="closeCompanyDetail"
    :companyId="companyId"
    :value="activeCompanyDetail"
  />
</template>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
}
.q-input {
  flex: 1;
  max-width: 500px;
}

@media screen and (max-width: 720px) {
  .header {
    flex-direction: column-reverse;

    .q-input {
      max-width: initial;
      margin: 10px 0;
    }

    .q-btn {
      padding: 15px;
    }
  }
}
</style>

<script>
import { defineComponent, ref } from "vue";
import {
  getAllCompanies,
  deleteCompany,
  getFilterCompanies,
} from "./CompanyService";
import CompanyDialog from "./CompanyDialog.vue";
import CompanyDetail from "./CompanyDetail.vue";

const columns = [
  {
    name: "id",
    label: "id",
    align: "left",
    sortable: true,
    format: (val) => val,
    field: (row) => row.id,
  },
  {
    name: "corporate_name",
    label: "Razão social",
    align: "left",
    sortable: true,
    format: (val) => val,
    field: (row) => `${row.corporate_name}`,
  },
  {
    name: "cnpj",
    label: "CNPJ",
    align: "left",
    sortable: true,
    format: (val) => val,
    field: (row) => row.cnpj,
  },

  {
    name: "action",
    align: "center",
    label: "Actions",
  },
];

export default defineComponent({
  name: "CompanyItem",

  components: { CompanyDialog, CompanyDetail },

  setup() {
    const leftDrawerOpen = ref(false);
    const companies = ref([]);
    const filter = null;

    return {
      isEdit: ref(false),
      companyId: ref(null),
      activeCompanyDialog: ref(false),
      activeCompanyDetail: ref(false),
      columns,
      companies,
      filter,
    };
  },

  mounted() {
    this.loadAllCompanies();
  },

  computed() {},

  methods: {
    onShowDialog() {
      this.activeCompanyDialog = true;
      this.isEdit = false;
      this.companyId = null;
    },

    onShowDetail(companyId) {
      this.activeCompanyDetail = true;
      this.companyId = companyId;
    },

    onCloseDetail() {
      this.activeCompanyDetail = false;
      this.companyId = null;
    },

    async loadAllCompanies() {
      const { data } = await getAllCompanies();
      this.companies = data;
    },

    addCompany() {},

    async onDeleteCompany(companyId) {
      const response = await deleteCompany(companyId);
      if (response.status === 204) {
        this.$q.notify({
          message: "Empresa deletada com sucesso!.",
          color: "positive",
          position: "top",
          timeout: 1500,
        });

        this.loadAllCompanies();
      }
    },

    confirmDeleteCompany(companyId) {
      this.$q
        .dialog({
          title: "Confirme",
          message: "Você deseja realmente deletar esta empresa?",
          cancel: {
            flat: true,
            label: "Cancelar",
          },
          dark: true,
          color: "secondary",
          persistent: true,
          ok: {
            flat: true,
            color: "negative",
            label: "Confirmar",
          },
        })
        .onOk(() => {
          this.onDeleteCompany(companyId);
        });
    },

    onEditCompany(companyId) {
      this.isEdit = true;
      this.activeCompanyDialog = true;
      this.companyId = companyId;
    },

    closeInput(val) {
      if (!val) {
        this.activeCompanyDialog = false;
        this.isEdit = false;
        this.companyId = null;
        this.loadAllCompanies();
      }
    },

    async filterCompany(ev) {
      const { data } = await getFilterCompanies(ev.target.value);

      if (data) {
        this.companies = data;
      }
    },
  },
});
</script>
