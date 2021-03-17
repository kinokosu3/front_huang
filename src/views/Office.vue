<template>
  <v-row>
      <v-col
        v-for="(values, key, index) in dataList"
        :key="index"
        class="d-flex"
        cols="12"
        sm="6"
        md="12"
      >
        <v-card
          class="d-flex flex-column link-card bkop-light position-relative"
        >
          <v-card-title v-if="key" primary-title class="px-4 pt-4 pb-2">
            <div>
              <div class="title">
                {{ key }}
              </div>
              <span v-if="key" class="subtitle-1">by {{ "link.author" }}</span>
            </div>
          </v-card-title>

          <v-container class="fill-height justify-center lg-wider-container">
            <v-row align="center">
              <v-col
                cols="12"
                sm="12"
                md="6"
                lg="4"
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
                    </v-card-title>
                    <v-card-text class="flex-grow-1">
                      <v-list dense subheader>
                        <!--        <v-subheader v-text="$t('members.responsibilities._name')" />-->
                        <v-list-item>
                          <v-list-item-avatar
                            :size="dense ? 24 : undefined"
                            :class="{ 'mr-2': dense }"
                          >
                            <v-icon :small="dense">
                              {{ "responsibility.icon" }}
                            </v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title class="v-list--force-line-break">
                              {{ value.responsibility }}
                            </v-list-item-title>
                            <v-list-item-subtitle
                              v-if="!dense"
                              class="monospace"
                            >
                              {{ "responsibility.id" }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-card-text>
                    <!-- :key="`${member.name}-${id}`" -->
                    <v-card-actions class="d-flex flex-row justify-center">
                      <v-btn
                        :key="member"
                        v-haptic
                        icon
                        :href="`localhost:8080`"
                        target="_blank"
                        rel="noopener"
                        :title="twitter"
                      >
                        <v-icon>
                          {{ "mdi-twitter" }}
                        </v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                  <!--  -->
                </transition>
              </v-col>
            </v-row>
          </v-container>

          <!-- <v-card-title
          v-if="link.features"
          primary-title
          class="px-4 py-1"
        >
          <v-chip
            v-for="(feature, featIndex) in link.features"
            :key="featIndex"
            :color="feature.color"
            class="ma-1"

            text-color="white"
          >
            {{ "links.tags.${feature.name}" }}
          </v-chip>
        </v-card-title> -->

          <v-row
            v-if="key"
            class="flex-grow-1 px-4 pt-2"
            align="end"
            justify="center"
          >
            <v-btn
              v-ripple
              color="secondary"
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
          </v-row>
        </v-card>
      </v-col>
  </v-row>
</template>

<script>
import anime from "animejs";
import API from "../api/api_data";
export default {
  name: "office",
  components: {

  },
  data() {
    return {
      dense: false,
      dataList: [],
      url: window.location.href,
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
  created(){

  },
  methods: {
    getStaffData() {
      let _this = this;
      // let url = window.location.href;
      API.Get("api/" + this.url.split("/").pop()).then(function (res) {
        _this.dataList = res;
      });
    },

    goToOfficeManage(key, values) {
      
      this.$router.push(
        {path:"/officeManage", name:'officeManage',params:{dataList:values, name:key}}
      );
    },
    goToHref(link) {
      this.$ga.event("redirect", "links", link.title, 1);
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