<template>
  <v-main
    alt-labels
    class="transparent elevation-0 full-width pa-md-2 pa-lg-4 pa-xl-4"
  >
    <v-card class="bkop-light pt-2 elevation-4 mt-2 content-card">
      <v-card-title class="pa-0 ml-10 mt-3">
        <v-btn depressed color="primary" @click="return_push">
          <v-icon class="back-button--icon"> mdi-keyboard-return </v-icon>
          返回
        </v-btn>
      </v-card-title>
      <v-card-title class="pa-0 mx-1">
        <v-row
          align="center"
          justify="center"
          class="px-4 px-sm-4 px-md-6 px-lg-6 px-xl-8 pt-0 pb-4"
        >
          <h1 class="title mt-2 pt-1 no-wrap--text font-weight-bold">
            {{ name }}
          </h1>
        </v-row>
      </v-card-title>
      <DataTable
        class="px-3 px-sm-4 px-md-6 px-lg-6 px-xl-8 pt-0 pb-6"
        :dataList="dataList"
        :configList="configList"
        v-if="flag"
      />
    </v-card>
  </v-main>
</template>

<script>
import DataTable from "@/components/stats/DataTable";
export default {
  components: {
    DataTable,
  },
  data() {
    return {
      dataList: [],
      items: [],
      flag: false,
      configList: {
        id: { text: "id", value: "id", align: "start", select: false },
        name: { text: "名字", value: "name", align: "left", sortable: false },
        office: {
          text: "科室",
          value: "office",
          aligin: "left",
          sortable: false,
          select: true,
          item: this.$route.params.name,
        },
        responsibility: {
          text: "职务",
          value: "responsibility",
          aligin: "left",
          sortable: false,
        },
      },
      name: this.$route.params.name,
    };
  },
  created() {
    if (typeof this.$route.params.dataList == "undefined") {
      this.$router.push("/office");
    } else {
      this.flag = true;
      this.dataList = this.$route.params.dataList;
    }
  },
  methods: {
    return_push() {
      this.$router.push("/office");
    },
  },
};
</script>

<style>
</style>