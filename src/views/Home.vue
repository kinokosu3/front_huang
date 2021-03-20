<template>
  <v-container fluid class="fill-height justify-center">
    <v-row align="center" :dense="$vuetify.breakpoint.mdAndDown" class="mx-0">
      <v-col cols="12" lg="6" xl="8">
        <Intro class="card-translate-up" />
      </v-col>

      <v-col cols="12" lg="6" xl="4">
        <Bulletin class="card-translate-up" />
        <SiteStats class="card-translate-up" />
      </v-col>
      <v-col cols="12" md="6" class="align-self-stretch">
        <Contribute class="card-translate-up align-self-stretch" />
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="align-self-stretch"
      >
        <License class="card-translate-up" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import Intro from "@/views/About/Intro";
import anime from 'animejs';
import Bulletin from "./About/Bulletin"
import SiteStats from "./About/SiteStats"
import Contribute from "./About/Contribute"
import License from "./About/License"
import API_Nomal from '../api/api_data'
export default {
  name: "Home",
  // components: {
  //   HomeSearch,
  //   SiteStatsOverview, GettingStarted, License, Contribute, Donate, Intro, Bulletin, Contact },
  components: {
    Intro,
    Bulletin,
    SiteStats,
    Contribute,
    License,
  },
  data: () => ({}),
  
  mounted () {
    setTimeout(() => {
      try {
        anime({
          targets: '.card-translate-up',
          translateY: [48, 0],
          opacity: [0, 1],
          duration: 625,
          delay: anime.stagger(75),
          easing: "easeOutQuint"
        })
        anime({
          targets: ['.card-translate-up h1', '.card-translate-up h2', '.card-translate-up p', '.card-translate-up span:not(.v-btn__content)'],
          translateY: [48, 0],
          opacity: [0, 1],
          duration: 625,
          delay: anime.stagger(25),
          easing: "easeOutQuint"
        })
        anime({
          targets: ['.card-fade-appear'],
          scaleY: [1.1, 1],
          duration: 325,
          easing: "easeOutQuint"
        })
      } catch (e) {
        Console.warn("HomeAnimation", "error when animating home entry animation", e)
      }
    }, 0);
  },
};
</script>

<style scoped>
.home-card {
  height: 100%;
}
.card-translate-up {
  transition: box-shadow 225ms ease-out;
}
</style>