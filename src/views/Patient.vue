<template>
  <!-- class="fill-height transparent elevation-0 full-width pa-md-2 pa-lg-4 pa-xl-4" -->
  <v-main
    fluid
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
            {{ "患者管理" }}
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
  provide(){
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      dataList: [],
      configList: {
        id: { text: "id", value: "id",align: "start",select: false},
        name:{text:"名字", value: "name",align:"left", sortable:false, width:"50px"},
        sex: { text: "性别", value: "sex", align: "left",select: true, item:["男","女"]},
        idCard: {
          text: "身份证",
          value: "idCard",
          align: "left",
          select: false
        },
        age: { text: "年龄", value: "age", align: "left",select: false},
        telNum: {
          text: "手机号码",
          value: "telNum",
          align: "left",
          select: false
        },
        address: {
          text: "地址",
          value: "address",
          sortable: false,
          align: "left",

          select: false
        },
        treatIf: {
          text: "是否在治疗",
          value: "treatIf",
          align: "left",
          select: true,
          item: ["是", "否"]
        },
      },
      functionList:{
        edit:"editPatientData",
        delete:"deletePatientData",
        new: "newPatientData",
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
      API.getPatientData().then(function (res) {
        _this.dataList = res;
        _this.flag = true;
      });
    },
    reload(){
      this.flag = false;
      this.$nextTick(function(){
        this.flag = true;
      })
    },
  },
};
</script>

<style scoped>
</style>