<template>
  <!-- <v-stepper
    v-model="step"
    alt-labels
    class="transparent elevation-0 full-width"
  >
    <v-stepper-header
      class="bkop-light elevation-4 py-2 px-4 mx-8 my-2 d-flex flex-row position-relative align-center"
      style="border-radius: 4px"
    >
      <BackButton
        name="科室管理"
        :active="step > 1"
        @back="step = 1"
      />
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content
        :step="1"
      >
        
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper> -->
  <v-row>
    <v-col
      v-for="(values, key, index) in dataList"
      :key="key"
      class="d-flex"
      cols="12"
      sm="6"
      md="12"
    >
      <v-card
        class="ma-2 mt-1 elevation-2 d-flex flex-column link-card bkop-light position-relative"
      >
        <v-card-title
          v-if="key"
          primary-title
          class="px-4 pt-4 pb-2 align-content-center justify-center"
        >
          <div>
            <div class="title font-weight-bold">
              {{ key }}
            </div>
          </div>
        </v-card-title>

        <v-container class="fill-height justify-center lg-wider-container">
          <v-row align="center">
            <v-col
              cols="12"
              sm="12"
              md="6"
              lg="3"
              xl="5"
              v-for="(value, index) in values"
              :key="index"
            >
              <transition name="slide-fade" mode="out-in">
                <v-card
                  class="bkop-light pt-1 d-flex flex-column justify-center"
                >
                  <v-card-title class="text-center d-flex flex-column">
                    <v-avatar class="mx-auto mb-2" :size="64">
                      <v-img
                        :src="require('../assets/test.png')"
                        aspect-ratio="1"
                      />
                    </v-avatar>

                    {{ value.name }}
                    <!-- <span class="headline">{{ value.name }}</span> -->
                  </v-card-title>
                  <v-card-text class="flex-grow-1">
                    <v-list dense subheader>
                      <v-list-item>
                        <v-list-item-avatar
                          :size="dense ? 24 : undefined"
                          :class="{ 'mr-2': dense }"
                        >
                          <v-icon :small="dense">
                            {{ "mdi-eyedropper" }}
                          </v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title class="v-list--force-line-break">
                            {{ "职责: " + value.responsibility }}
                          </v-list-item-title>
                          <v-list-item-subtitle v-if="!dense" class="monospace">
                            {{ value.id }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                  <!-- :key="`${member.name}-${id}`" -->
                  <!-- <v-card-actions class="d-flex flex-row justify-center">
                            <v-btn
                              :key="member"
                              icon
                              :href="`localhost:8080`"
                              target="_blank"
                              rel="noopener"
                              :title="twitter"
                            >
                              <v-icon>
                                {{ "mdi-google" }}
                              </v-icon>
                            </v-btn>
                          </v-card-actions> -->
                </v-card>
                <!--  -->
              </transition>
            </v-col>
          </v-row>
        </v-container>
        <v-row class="flex-grow-1 px-4 pt-2" align="end" justify="center">
          <v-btn
            v-ripple
            color="light-green lighten-2"
            class="ma-2 mb-4"
            text-color="white"
            target="_blank"
            rel="noopener"
            @click="goToOfficeManage(key, values)"
          >
            <span class="subtitle-1" style="text-transform: initial">
              {{ "科室管理" }}
            </span>
            <v-icon right small> mdi-open-in-new </v-icon>
          </v-btn>
          <v-btn
            v-ripple
            class="ma-2 mb-4"
            color="error"
            text-color="white"
            target="_blank"
            rel="noopener"
            @click="deleteConfirm(key)"
          >
            <span class="subtitle-1" style="text-transform: initial">
              删除科室
            </span>
            <v-icon right small> mdi-delete </v-icon>
          </v-btn>

          <v-dialog v-model="dialog" max-width="500px" :retain-focus="false">
            <v-card>
              <v-card-title class="headline"
                >是否删除科室？</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeFunc"
                  >取消</v-btn
                >
                <v-btn color="error darken-1" text @click="deleteOffice"
                  >确定</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>




          <v-dialog
            v-model="dialog_new"
            max-width="600px"
            :retain-focus="false"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-ripple
                class="ma-2 mb-4"
                color="blue"
                text-color="white"
                target="_blank"
                rel="noopener"
                v-bind="attrs"
                v-on="on"
                v-if="index == Object.keys(dataList).length - 1"
              >
                <span class="subtitle-1" style="text-transform: initial">
                  {{ "添加科室" }}
                </span>
                <v-icon right small> mdi-folder-multiple-plus </v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ "添加科室" }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="科室名"
                        v-model="office.name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="科室简介"
                        v-model="office.info"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog_new = false">
                  退出
                </v-btn>
                <v-btn color="blue darken-1" text @click="addOffice">
                  保存
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import anime from "animejs";
import API from "../api/api_data";
import BackButton from "../components/stats/BackButton";
export default {
  name: "office",
  components: { BackButton },
  data() {
    return {
      internalStep: 1,
      dialog: false,
      dialog_new: false,
      dense: false,
      dataList: [],
      url: window.location.href,
      office: {
        id: null,
        name: "",
        info: "",
      },
      name_buf: null,
    };
  },
  mounted() {
    this.getStaffData(),
      anime({
        targets: ".link-card",
        translateY: [48, 0],
        opacity: [0, 1],
        duration: 425,
        delay: (el, i) => i * 50,
        easing: "easeOutQuint",
      });
  },
  created() {},
  computed: {
    step: {
      get() {
        return this.internalStep;
      },
      set(val) {
        this.internalStep = val;
      },
    },
  },
  methods: {
    getStaffData() {
      let _this = this;
      // let url = window.location.href;
      API.Get("api/" + this.url.split("/").pop()).then(function (res) {
        _this.dataList = res;
        console.log(res);
      });
    },
    goToOfficeManage(key, values) {
      this.$router.push({
        path: "/officeManage",
        name: "officeManage",
        params: { dataList: values, name: key },
      });
    },
    goToHref(link) {
      this.$ga.event("redirect", "links", link.title, 1);
    },
    closeFunc(){
      this.dialog = false;
      this.name_buf = null;
    },
    deleteOffice(){
      let _this = this;
      API.Post("api/" + this.url.split("/").pop() + "/delete", this.name_buf).then(
        function (res) {
          if (res.code == 104) {
            alert(res.msg);
          } else if (res.code == 101) {
            _this.dialog = false;
            _this.name_buf = null;
            alert(res.msg);
            let NewPage = "_empty" + "?time=" + new Date().getTime() / 500;
            _this.$router.push(NewPage);
            _this.$router.go(-1);
          }
        }
      );
    },
    deleteConfirm(name) {
      this.name_buf = name;
      this.dialog = true;
    },
    addOffice() {
      let _this = this;
      API.Post("api/" + this.url.split("/").pop() + "/new", this.office).then(
        function (res) {
          if (res.code == 104) {
            alert(res.msg);
          } else if (res.code == 101) {
            _this.dialog_new = false;
            alert(res.msg);
            let NewPage = "_empty" + "?time=" + new Date().getTime() / 500;
            _this.$router.push(NewPage);
            _this.$router.go(-1);
          }
        }
      );
    },
  },
};
</script>

<style scoped>
.link-card {
  width: 100%;
  /*border: 1px solid rgba(255, 255, 255, 0.75) !important;*/
}
.theme--light .link-card {
  /*border: 1px solid rgba(0, 0, 0, 0.75) !important;*/
}
</style>