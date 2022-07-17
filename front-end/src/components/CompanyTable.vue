<template>
  <div class="company">
    <div class="container q-pa-md">
      <q-table
        title="Treats"
        :rows="companies"
        :columns="columns"
        row-key="name"
        table-header-class="text-secondary font-weight-bold"
        dark
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
                @click="onEditCompany(props.row.id)"
                class="q-mr-sm bg-secondary"
                name="action"
                icon="edit"
              >
                <q-tooltip>Editar</q-tooltip>
              </q-btn>
              <q-btn
                @click="confirmDeleteCompany(props.row.id)"
                class="bg-red"
                name="action"
                icon="delete"
              >
                <q-tooltip>Editar</q-tooltip>
              </q-btn>
            </q-td>
          </q-tr>
        </template>

        <template v-slot:top>
          <div class="row full-width justify-between q-mb-md">
            <q-input
              style="width: 20%"
              class="q-mr-md text-white"
              debounce="600"
              color="secondary"
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
    </div>
    <CompanyDialog
      v-model="activeCompanyDialog"
      @closeInput="closeInput"
      :companyId="companyId"
      :isEdit="isEdit"
    />
  </div>
</template>

<style scoped lang="scss"></style>

<script>
import { defineComponent, ref } from "vue";
import {
  getAllCompanies,
  deleteCompany,
  getFilterCompanies,
} from "./CompanyService";
import CompanyDialog from "./CompanyDialog.vue";

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
    label: "Action",
  },
];

export default defineComponent({
  name: "CompanyItem",

  components: { CompanyDialog },

  setup() {
    const leftDrawerOpen = ref(false);
    const companies = ref([]);
    const filter = null;

    return {
      isEdit: ref(false),
      companyId: ref(null),
      activeCompanyDialog: ref(false),
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

    async loadAllCompanies() {
      const { data } = await getAllCompanies();
      this.companies = data;
    },

    addCompany() {},

    async onDeleteCompany(companyId) {
      const response = await deleteCompany(companyId);
      if (response) {
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
      console.log(companyId);
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
      const response = await getFilterCompanies(ev.target.value);
      if (response) {
        this.companies = response.data;
      }
    },
  },
});
</script>
