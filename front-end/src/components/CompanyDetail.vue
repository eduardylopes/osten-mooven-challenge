<template>
  <q-dialog
    ref="dialog"
    persistent
    :value="value"
    @closeInput="onCloseDialog"
    :dark="true"
  >
  </q-dialog>
</template>

<script>
export default defineComponent({
  name: "CompanyDetail",

  setup() {
    return {};
  },

  props: {
    companyId: String,
  },

  mounted() {},

  computed() {},

  methods: {},
});
</script>
