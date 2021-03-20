<template>
  <v-card class="text-center backdrop-card transition-all" :class="'pa-4'" >
    <v-card-title class="display-2 px-3">
      <span ref="totalReportsNum" class="monospace ">
        {{ count_dict.count_price}}
      </span>
      <v-spacer />
      <span ref="totalReportsNum" class="monospace ">
        {{ count_dict.count_itemNum}}
      </span>
    </v-card-title>
    <v-card-subtitle class="d-flex align-center pl-3">
      <span>
        {{ "总计流水金额 - All Time" }}
      </span>
      <v-spacer />
      <span class="d-flex flex-row align-center">
        {{ "总计账单数量" }}
      </span>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import API_Nomal from "../../api/api_data";
export default {
  data() {
    return {
      count_dict: {},
    };
  },
  created() {
    this.count();
  },
  methods: {
    count() {
      let _this = this;
      API_Nomal.Get("/home/count").then(function (res) {
        console.log(res);
        _this.count_dict = res;
        
      });
    },
  },
};
</script>

<style>
</style>