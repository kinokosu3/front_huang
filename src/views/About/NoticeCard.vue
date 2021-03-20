<template>
  <v-card elevation="5" class="pa-6 mb-2 notice-card--informational">
    <h1 class="headline font-weight-black d-flex align-center">
      <v-icon left>
        {{ "mdi-information" }}
      </v-icon>

      {{ "测试用" }}
    </h1>
    <v-alert border="left" text class="mt-4 mb-0">
      <span>
        {{ notice_text }}
      </span>
    </v-alert>
  </v-card>
</template>

<script>
import API_Nomal from "../../api/api_data";
export default {
  name: "NoticeCard",
  data() {
    return {
      notice_text: "",
    }
  },
  created(){
    this.notice();
  },
  methods: {
    notice() {
      let _this = this;
      API_Nomal.Get("notice/").then(function (res) {
        _this.notice_text = res;
      });
    },
  },
};
</script>

<style scoped>
::v-deep .markdown-content p {
  margin-bottom: 0 !important;
  perspective: 0px;
}
::v-deep .markdown-content a {
  color: #1ab0ff;
  display: inline-block;
  border: 1px solid white;
  padding: 1px 8px;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18);
  transform: none;
  transition: all 125ms;
  background: rgba(0, 0, 0, 0.5);
}
.theme--light ::v-deep .markdown-content a {
  color: white;
  border: 1px solid black;
  background: rgba(0, 140, 215, 0.85);
}
::v-deep .markdown-content a:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  transform: scale(1.01) translateY(-1px);
}
.theme--light ::v-deep .markdown-content a:hover {
  background: rgba(0, 140, 215, 0.9);
}
::v-deep .markdown-content a:active {
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);
  transform: scale(0.98) translateY(1px);
  background: rgba(0, 0, 0, 0.65);
}
.theme--light ::v-deep .markdown-content a:active {
  background: rgba(0, 140, 215, 1);
}

.notice-card--emergency {
  animation: card-pulse infinite 2.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}
@keyframes card-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(226, 81, 65, 0);
  }

  70% {
    box-shadow: 0 0 0 10px rgba(226, 81, 65, 0.55);
  }

  100% {
    box-shadow: 0 0 0 15px rgba(226, 81, 65, 0);
  }
}
</style>