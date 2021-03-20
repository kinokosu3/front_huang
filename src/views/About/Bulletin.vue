<template>
  <v-scroll-y-transition
    leave-absolute
    hide-on-leave
  >
      <NoticeCard />

    <!-- <v-card
      v-else
      elevation="5"
      class="bulletin-card pa-6 mb-2"
    >
      <h1 class="headline font-weight-bold d-flex align-center">
        <v-icon left>
          mdi-information
        </v-icon>

        {{ $t('menu.about.bulletin') }}
      </h1>
      <div
        class="mt-4"
      >
        <v-alert
          type="info"
          border="left"
          text
          class="mb-0"
        >
          <span>
            暂无公告
          </span>
        </v-alert>
      </div>
    </v-card> -->
  </v-scroll-y-transition>
</template>

<script>
import NoticeCard from "./NoticeCard"
export default {
    components:{
        NoticeCard,
    },
    data(){
        return{}
    }
}
</script>

<style>
 .theme--light .notice-card--informational {
    background: repeating-linear-gradient(
        -45deg,
        rgba(240, 240, 240, 0.98),
        rgba(240, 240, 240, 0.98) 45px,
        rgba(255, 255, 255, 0.9) 45px,
        rgba(255, 255, 255, 0.9) 90px
    ) !important;
  }

  .theme--dark .notice-card--informational {
    background: repeating-linear-gradient(
        -45deg,
        rgba(61, 61, 61, 0.98),
        rgba(61, 61, 61, 0.98) 45px,
        rgba(46, 46, 46, 0.9) 45px,
        rgba(46, 46, 46, 0.9) 90px
    ) !important;
  }
</style>