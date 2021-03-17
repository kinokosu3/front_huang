<template>
  <v-stepper
    v-model="step"
    alt-labels
    class="transparent elevation-0 full-width pa-md-2 pa-lg-4 pa-xl-4"
  >
    <v-card class="bkop-light pt-2 elevation-4 mt-2 content-card">
      <v-card-title class="pb-0 mx-1">
        <v-row
          align="center"
          justify="center"
          class="px-4 px-sm-4 px-md-6 px-lg-6 px-xl-8 pt-0 pb-4"
        >
          <h2 class="subtitle-2 d-block" style="width: 100%">
            {{ "FUCK FUCK" }}
          </h2>
          <h1 class="title pt-1 no-wrap--text">
            {{ "FUCK FUCK" }}
          </h1>
        </v-row>
      </v-card-title>
      <DataTable
        class="px-3 px-sm-4 px-md-6 px-lg-6 px-xl-8 pt-0 pb-6"
        :dataList="dataList"
        :configList="configList"
      />
    </v-card>
  </v-stepper>
</template>

<script>
import DataTable from "@/components/stats/DataTable";
export default {
  components: {
    DataTable,
  },
  data() {
    return {
      dataList:[],
      items:[],
      configList: {
        id: { text: "id", value: "id", align: "start", select: false },
        name: { text: "名字", value: "name", align: "left", sortable: false },
        office: {
          text: "科室",
          value: "office",
          aligin: "left",
          sortable: false,
          select: true,
          item: new Array([this.$route.params.name]),
        },
        responsibility: {
          text: "职务",
          value: "responsibility",
          aligin: "left",
          sortable: false,
        },
      },
    };
  },
  created() {
    console.log(this.$route.params.name);
    this.dataList = this.$route.params.dataList;
  },
  methods: {},
};
</script>

<style>
</style>