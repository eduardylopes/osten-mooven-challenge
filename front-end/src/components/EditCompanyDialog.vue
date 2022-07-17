<template>
  <q-dialog
    ref="dialog"
    persistent
    :value="value"
    @closeInput="onCloseDialog"
    full-width
    :dark="true"
  >
    <q-card class="q-pa-lg bg-dark">
      <div class="text-h6 text-white">Preencha o formulário abaixo</div>
      <p>
        {{ company.address.state }}
        <q-card-separator>
          <div class="company-form">
            <div class="text-subtitle2 text-white q-mt-lg">
              Dados da empresa
            </div>
            <q-separator :spaced="true" dark />
            <div class="form-group q-mt-lg">
              <div class="row col-12">
                <q-input
                  :dark="true"
                  class="full-width"
                  outlined
                  v-model="company.name"
                  label="Nome"
                  color="secondary"
                />

                <q-input
                  :dark="true"
                  class="full-width q-mt-md"
                  outlined
                  v-model="company.corporate_name"
                  label="Razão social"
                  color="secondary"
                />

                <q-input
                  :dark="true"
                  class="full-width q-mt-md"
                  outlined
                  v-model="company.cnpj"
                  label="CNPJ"
                  color="secondary"
                />
              </div>
            </div>

            <div class="form-group q-mt-lg">
              <div class="text-subtitle2 text-white">Endereço da empresa</div>
              <q-separator :spaced="true" dark />
              <div class="row col-12 q-mt-lg">
                <q-input
                  :dark="true"
                  class="col-8 q-pr-sm"
                  outlined
                  v-model="company.address.street"
                  label="Rua"
                  color="secondary"
                />

                <q-input
                  :dark="true"
                  class="col-4"
                  outlined
                  type="number"
                  v-model="company.address.number"
                  label="Número"
                  color="secondary"
                />

                <q-input
                  :dark="true"
                  class="col-6 q-pr-sm q-mt-md"
                  outlined
                  v-model="company.address.complement"
                  label="Complemento"
                  color="secondary"
                />

                <q-input
                  :dark="true"
                  class="col-6 q-mt-md"
                  outlined
                  v-model="company.address.district"
                  label="Bairro"
                  color="secondary"
                />

                <q-input
                  :dark="true"
                  class="col-6 q-pr-sm q-mt-md"
                  outlined
                  v-model="company.address.city"
                  label="Cidade"
                  color="secondary"
                />

                <q-input
                  :dark="true"
                  class="col-6 q-mt-md"
                  outlined
                  v-model="company.address.state"
                  label="Estado"
                  color="secondary"
                />

                <q-input
                  :dark="true"
                  class="col-4 q-mt-md"
                  outlined
                  v-model="company.address.telephone"
                  label="Telefone"
                  color="secondary"
                />
              </div>
            </div>
          </div>
        </q-card-separator>
      </p>

      <div class="row justify-end q-mt-md">
        <q-btn
          dark
          color="negative"
          flat
          outlined
          @click="confirmCancel()"
          label="Cancelar"
        ></q-btn>

        <q-btn
          dark
          color="secondary"
          flat
          outlined
          :label="!isEdit ? 'Cadastrar' : 'Atualizar'"
          @click="!isEdit ? onCreateCompany() : onUpdateCompany()"
        ></q-btn>
      </div>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.q-dialog__inner--fullwidth > div {
  max-width: 40% !important;
}
</style>
<script>
import { defineComponent, ref } from "vue";
import { createCompany, getCompany, putCompany } from "./CompanyService";
export default defineComponent({
  name: "CreateCompanyDialog",

  setup() {
    opts: {
      dark: true;
    }

    return {
      company: ref({
        corporate_name: null,
        name: null,
        cnpj: null,
        address: {
          street: null,
          number: {
            type: Number,
          },
          complement: null,
          district: null,
          city: null,
          state: null,
          telephone: null,
        },
      }),
    };
  },

  props: {
    value: Boolean,
    companyId: String,
    isEdit: Boolean,
  },

  mounted() {},

  computed() {},

  methods: {
    async onCreateCompany() {
      const result = await createCompany({
        ...this.company,
        address: {
          ...this.company.address,
          number: Number(this.company.address.number),
        },
      });

      if (result) {
        this.$q.notify({
          message: "Empresa criada com sucesso!.",
          color: "positive",
          position: "top",
          timeout: 1500,
        });

        this.onCloseDialog();
      }
    },

    confirmCancel() {
      this.$q
        .dialog({
          title: "Confirme",
          message: "Você deseja realmente cancelar o cadastro?",
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
          this.onCloseDialog();
        });
    },

    clearFields() {
      this.company = {
        corporate_name: null,
        name: null,
        cnpj: null,
        address: {
          street: null,
          number: null,
          complement: null,
          district: null,
          city: null,
          state: null,
          telephone: null,
        },
      };
    },

    async loadCompany(companyId) {
      const { data } = await getCompany(companyId);
      this.company = this.updateCompanyMapper(data);
    },

    async onUpdateCompany() {
      const response = await putCompany(this.companyId, {
        ...this.company,
        address: {
          ...this.company.address,
          number: Number(this.company.address.number),
        },
      });

      if (response) {
        this.$q.notify({
          message: "Dados atualizados com sucesso!.",
          color: "positive",
          position: "top",
          timeout: 1500,
        });

        this.onCloseDialog();
      }
    },

    updateCompanyMapper({ corporate_name, name, cnpj, address }) {
      const { street, number, complement, district, city, state, telephone } =
        address;

      const company = {
        corporate_name,
        name,
        cnpj,
        address: {
          street,
          number,
          complement,
          district,
          city,
          state,
          telephone,
        },
      };

      return company;
    },

    onCloseDialog() {
      this.$emit("closeInput", false);
      this.$refs.dialog.hide();
      this.clearFields();
    },
  },

  watch: {
    isEdit(val) {
      console.log(val);
      if (val) {
        this.loadCompany(this.companyId);
      }
    },
  },
});
</script>
