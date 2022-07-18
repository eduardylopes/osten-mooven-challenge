<template>
  <q-dialog
    ref="dialog"
    persistent
    :value="value"
    @closeInput="onCloseDialog"
    :dark="true"
  >
    <q-card class="q-pa-lg bg-dark">
      <q-toolbar>
        <q-toolbar-title class="text-white"
          >Preencha o formulário</q-toolbar-title
        >
        <q-btn
          @click="confirmCancel()"
          flat
          round
          dense
          class="text-white"
          icon="close"
        />
      </q-toolbar>

      <p>
        <q-card-separator>
          <form class="company-form">
            <div class="text-subtitle2 text-white q-mt-lg">
              Dados da empresa
            </div>
            <q-separator :spaced="true" dark />
            <div class="form-group q-mt-lg">
              <div class="row col-12">
                <q-input
                  ref="fantasy_nameRef"
                  :dark="true"
                  class="full-width"
                  outlined
                  dense
                  v-model="company.fantasy_name"
                  label="Nome Fantasia"
                  color="secondary"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'O campo nome deve ser preenchido',
                  ]"
                />

                <q-input
                  ref="corporate_nameRef"
                  :dark="true"
                  class="full-width q-mt-sm"
                  dense
                  outlined
                  v-model="company.corporate_name"
                  label="Razão social"
                  color="secondary"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'O campo razão social deve ser preenchido',
                  ]"
                />

                <q-input
                  ref="cnpjRef"
                  :dark="true"
                  class="full-width q-mt-sm"
                  dense
                  outlined
                  v-model="company.cnpj"
                  label="CNPJ"
                  color="secondary"
                  lazy-rules
                  :rules="cnpjRules"
                />
              </div>
            </div>

            <form
              @submit.prevent.stop="
                !isEdit ? onCreateCompany() : onUpdateCompany()
              "
              @reset.prevent.stop="confirmCancel()"
              class="form-group q-mt-lg"
            >
              <div class="text-subtitle2 text-white">Endereço da empresa</div>
              <q-separator :spaced="true" dark />
              <div class="row col-12 q-mt-lg">
                <q-input
                  ref="streetRef"
                  :dark="true"
                  class="col-8 q-pr-sm"
                  outlined
                  dense
                  v-model="company.address.street"
                  label="Rua"
                  type="address"
                  color="secondary"
                  clearable
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'O campo rua deve ser preenchido',
                  ]"
                />

                <q-input
                  ref="numberRef"
                  :dark="true"
                  class="col-4"
                  outlined
                  dense
                  v-model="company.address.number"
                  label="Número"
                  color="secondary"
                  clearable
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val > 0) || 'O campo número deve ser preenchido',
                    (val) =>
                      (val && !isNaN(val)) ||
                      'O campo deve conter apenas números',
                  ]"
                />

                <q-input
                  :dark="true"
                  class="col-6 q-pr-sm q-mt-sm"
                  outlined
                  dense
                  v-model="company.address.complement"
                  label="Complemento"
                  type="address"
                  color="secondary"
                  clearable
                />

                <q-input
                  ref="districtRef"
                  :dark="true"
                  class="col-6 q-mt-sm"
                  outlined
                  dense
                  v-model="company.address.district"
                  label="Bairro"
                  type="address"
                  color="secondary"
                  clearable
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'O campo bairro deve ser preenchido',
                  ]"
                />

                <q-input
                  ref="cityRef"
                  :dark="true"
                  class="col-6 q-pr-sm q-mt-sm"
                  outlined
                  dense
                  v-model="company.address.city"
                  label="Cidade"
                  type="address"
                  color="secondary"
                  clearable
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'O campo cidade deve ser preenchido',
                  ]"
                />

                <q-input
                  ref="stateRef"
                  :dark="true"
                  class="col-6 q-mt-sm"
                  outlined
                  dense
                  v-model="company.address.state"
                  label="Estado"
                  type="address"
                  color="secondary"
                  clearable
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'O campo estado deve ser preenchido',
                  ]"
                />

                <q-input
                  ref="telephoneRef"
                  :dark="true"
                  class="col-4 q-mt-sm"
                  outlined
                  dense
                  v-model="company.address.telephone"
                  label="Telefone"
                  color="secondary"
                  clearable
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'O campo telefone deve ser preenchido',
                  ]"
                />
              </div>
            </form>
          </form>
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
          type="submit"
          outlined
          :label="!isEdit ? 'Cadastrar' : 'Atualizar'"
          @click="!isEdit ? onCreateCompany() : onUpdateCompany()"
        ></q-btn>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { cnpjValidation } from "../utils/cnpjValidation.js";
import { defineComponent, ref } from "vue";
import { createCompany, getCompany, updateCompany } from "./CompanyService";
export default defineComponent({
  name: "CompanyDialog",

  setup() {
    return {
      company: ref({
        corporate_name: null,
        fantasy_name: null,
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
      }),

      cnpjRules: [
        (val) => (val && val.length > 0) || "O campo cnpj deve ser preenchido",
        (val) => cnpjValidation(val) || "Cnpj inválido",
      ],
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
      const refs = [
        "fantasy_nameRef",
        "corporate_nameRef",
        "cnpjRef",
        "streetRef",
        "districtRef",
        "cityRef",
        "stateRef",
        "numberRef",
        "telephoneRef",
      ];

      refs.forEach((ref) => {
        this.$refs[ref].validate();
      });

      const hasError = refs.reduce((acc, ref) => {
        return (acc |= this.$refs[ref].hasError);
      }, false);

      if (hasError) {
        this.$q.notify({
          message: "É necessário preencher os campos obrigatórios",
          color: "negative",
          position: "top",
          timeout: 3000,
        });

        return;
      }

      this.company.address.number = Number(this.company.address.number);

      const response = await createCompany(this.company);

      if (response.status === 201) {
        this.$q.notify({
          message: "Empresa criada com sucesso!.",
          color: "positive",
          position: "top",
          timeout: 1500,
        });

        this.onCloseDialog();
      }

      if (response.data.message === "company already exists") {
        this.$q.notify({
          message: "Empresa já cadastrada",
          color: "negative",
          position: "top",
          timeout: 3000,
        });

        return;
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
        fantasy_name: null,
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
      const response = await updateCompany(this.companyId, {
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

    updateCompanyMapper({ corporate_name, fantasy_name, cnpj, address }) {
      const { street, number, complement, district, city, state, telephone } =
        address;

      const company = {
        corporate_name,
        fantasy_name,
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
      if (val) {
        this.loadCompany(this.companyId);
      }
    },
  },
});
</script>
