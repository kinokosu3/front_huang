<template>
  <v-card
    elevation="5"
    class="bkop-light pa-6"
    style="height: 100%"
  >
    <h1 class="headline">
      {{ "Contribute" }}
    </h1>
    <div class="caption my-2">
      * {{ "一个开源项目" }}
    </div>

    <v-row
      class="my-2 py-1 transparent outline"
      align="center"
      justify="center"
    >
      <v-btn
        href="https://github.com/kinokosu3/front_huang"
        target="_blank"
        rel="noopener"
        :class="{
          'mx-2': $vuetify.breakpoint.smAndUp,
          'mx-1': $vuetify.breakpoint.xsOnly
        }"
        text
      >
        {{ "FRONTED" }}
        <v-icon right>
          mdi-github
        </v-icon>
      </v-btn>

      <v-divider vertical />

      <v-btn
        href="https://github.com/kinokosu3/backend-huang"
        target="_blank"
        rel="noopener"
        :class="{
          'mx-2': $vuetify.breakpoint.smAndUp,
          'mx-1': $vuetify.breakpoint.xsOnly
        }"
        text
      >
        {{ "BACKEND" }}
        <v-icon right>
          mdi-github
        </v-icon>
      </v-btn>
    </v-row>


    <ul class="ml-2">
      <li
        v-for="(skill, key) in skills"
        :key="key"
        class="subtitle-2"
      >
        {{ skill }}
      </li>
    </ul>

    <v-divider class="my-2" />

    
  </v-card>
</template>

<script>


export default {
  name: 'Contribute',
  components: {
    
  },
  data() {
    return {
      skills: [
        'Front End Development(Vue.js、Vuetify)',
        'Back End Development(Java Spring Boot, Mysql)',
        '科室管理',
        '药库管理',
        '患者管理',
        '开药管理',
        '账单管理',
        '登陆注册系统',
      ],
    }
  }
}
</script>

<style scoped>
  .outline {
    box-shadow: 0 0 0 2px rgba(0,0,0,0.54) !important;
    border-radius: 4px
  }
</style>
