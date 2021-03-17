<template>
  <v-card elevation="0" class="transparent pt-0 my-1">
    <v-row align="center" justify="center" justify-lg="start">
      <v-card-title class="justify-start" style="word-break: normal">
        <v-img
          :src="require('../../assets/logo.png')"
          aspect-ratio="1"
          height="128px"
          width="128px"
          contain
          :position="
            $vuetify.breakpoint.mdAndDown ? 'center center' : 'left center'
          "
          class="my-6"
        />

        <v-col cols="12">
          <v-btn color="primary" dark class="mb-2" @click="test">
            test Item
          </v-btn>
          <h1
            :class="{
              'display-2': $vuetify.breakpoint.mdAndUp,
              'display-1': $vuetify.breakpoint.smAndDown,
            }"
            class="font-weight-bold mb-4 display-1"
          >
            {{ "池化 Pooling" }}
          </h1>
          <p class="subtitle-1 line-height-wide">
            {{
              "池化即空间池化，是卷积神经网络中用于提取特征的一种方法，通过对不同特征进行聚合统计处理以获得相对更低的维度，同时避免出现过拟合现象。"
            }}
            <br />
            {{
              "池化在降低各个特征图维度的同时保留大部分重要信息，目前主要有最大化、平均化、加和等方式"
            }}
          </p>
        </v-col>
      </v-card-title>
      <v-col cols="6" sm="6">
        <v-select :items="items" label="Standard"></v-select>
      </v-col>
      <v-col cols="6" sm="6">
        <v-btn color="primary" dark class="mb-2" @click="test">
          test Item
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import API from "../../api/api_user";
export default {
  name: "Intro",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      value: "",
      items: ["sex", "over"],
    };
  },
  methods: {
    test() {
      API.test(this.user).then(function (res) {});
    },
  },
};
</script>

<style scoped>
</style>

