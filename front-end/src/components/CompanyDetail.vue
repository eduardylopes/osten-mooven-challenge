<template>
  <q-dialog
    ref="dialog"
    :value="value"
    @closeInput="onCloseDialog"
    :dark="true"
    auto-close
  >
    <q-card class="q-pa-md" dark rounded style="width: 400px">
      <q-toolbar>
        <q-toolbar-title>Sobre</q-toolbar-title>
        <q-btn flat v-close-popup round dense icon="close" />
      </q-toolbar>

      <div class="text-white container">
        <q-list dark style="max-width: 700px">
          <q-item v-ripple>
            <q-item-section>
              <q-item-label class="text-secondary" color="secondary" overline
                >ID</q-item-label
              >
              <q-item-label>{{ company.id }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-ripple>
            <q-item-section>
              <q-item-label class="text-secondary" color="secondary" overline
                >Nome Fantasia</q-item-label
              >
              <q-item-label>{{ company.fantasy_name }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-ripple>
            <q-item-section>
              <q-item-label class="text-secondary" overline
                >Razão Social</q-item-label
              >
              <q-item-label>{{ company.corporate_name }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-ripple>
            <q-item-section>
              <q-item-label class="text-secondary" overline>CNPJ</q-item-label>
              <q-item-label>{{ company.cnpj }}</q-item-label>
            </q-item-section>
          </q-item>

          <div v-if="company.address">
            <q-item v-ripple>
              <q-item-section>
                <q-item-label class="text-secondary" overline
                  >CNPJ</q-item-label
                >
                <q-item-label>{{ company.address.street }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item v-ripple>
              <q-item-section>
                <q-item-label class="text-secondary" overline
                  >Número</q-item-label
                >
                <q-item-label>{{ company.address.number }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item v-ripple v-if="company.address.complement">
              <q-item-section>
                <q-item-label class="text-secondary" overline
                  >Complemento</q-item-label
                >
                <q-item-label>{{ company.address.complement }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item v-ripple>
              <q-item-section>
                <q-item-label class="text-secondary" overline
                  >Bairro</q-item-label
                >
                <q-item-label>{{ company.address.district }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item v-ripple>
              <q-item-section>
                <q-item-label class="text-secondary" overline
                  >Cidade</q-item-label
                >
                <q-item-label>{{ company.address.city }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item v-ripple>
              <q-item-section>
                <q-item-label class="text-secondary" overline
                  >Estado</q-item-label
                >
                <q-item-label>{{ company.address.state }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-ripple>
              <q-item-section>
                <q-item-label class="text-secondary" overline
                  >Telefone</q-item-label
                >
                <q-item-label>{{ company.address.telephone }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-list>
      </div>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.container {
  max-width: 700px;
}
</style>

<script>
import { defineComponent, ref } from "vue";
import { getCompany } from "./CompanyService";
export default defineComponent({
  name: "CompanyDetail",
  props: {
    companyId: String,
    value: Boolean,
  },

  setup() {
    const company = {};
    return { company };
  },

  mounted() {},

  computed() {},

  methods: {
    async loadCompany(companyId) {
      const { data } = await getCompany(companyId);
      this.company = data;
    },
  },

  watch: {
    value(val) {
      if (val) {
        this.loadCompany(this.companyId);
      }
    },
  },
});
</script>
