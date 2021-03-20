<template>
  <v-main

    alt-labels
    class="fill-height transparent elevation-0 full-width pa-md-2 pa-lg-4 pa-xl-4"
  >
    <v-card class="bkop-light pt-2 elevation-4 mt-2 content-card">
      <v-card-title class="pb-0 mx-1">
        <v-row
          align="center"
          justify="center"
          class="px-4 px-sm-4 px-md-6 px-lg-6 px-xl-8 pt-0 pb-4"
        >
          <h1 class="title mt-2 pt-1 no-wrap--text font-weight-bold">
            {{ "药物单" }}
          </h1>
        </v-row>
      </v-card-title>
      <DataTable
        class="px-3 px-sm-4 px-md-6 px-lg-6 px-xl-8 pt-0 pb-6"
        v-if="flag"
        :dataList="dataList"
        :configList="configList"
      />
    </v-card>
  </v-main>
</template>

<script>
import DataTable from "@/components/stats/DataTable";
import API from "../api/api_data";
export default {
  components: {
    DataTable,
  },
  data() {
    return {
      dataList: [],
      configList: {
        id: { text: "id", value: "id",align: "start",select: false},
        name:{text:"药物名", value: "name",align:"left",select: false},
        drug_code:{text:"药物编号", value: "drug_code", align:"left",select: false},
        measure:{text:"量词", value:"measure", align:"left",select: false},
        company:{text:"药厂名", value:"company", aligin:"left", select:false},
        price:{text:"单价", value:"price", aligin:"left", select:false},
      },
      flag: false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let _this = this;
      let url = window.location.href;
      API.Get('api/'+url.split('/').pop()).then(function (res) {
        console.log(res);
        _this.dataList = res;
        _this.flag = true;
      });
    },
  },
};
</script>

<style scoped>
</style>