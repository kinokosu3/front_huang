<template>
  <v-app>
      <v-navigation-drawer
        v-model="drawer"
        app
        class="safe-area--navigation-drawer"
        width="300px"
        v-if="flag"
      >
        <Logo />
        <v-list
            dense
            nav
            expand
            class="safe-area--navigation"
        >
          <GlobalSearchNavigation />
          <Navigation
            v-for="route in routes"
            :key="route.name"
            :route="route"
            
          />
        </v-list>
      </v-navigation-drawer>
      <v-app-bar
        elevate-on-scroll
        app
        dark
        :color="`blue darken-3`"
        v-if="flag"
        class="x--safe-area toolbar--safe-area flex-column"
      >
        <v-app-bar-nav-icon
          v-haptic
          @click.stop="drawer = !drawer"
        />

        <v-toolbar-title class="pl-2">
          <transition
            name="fade-transition"
            mode="out-in"
          >
          </transition>
          <span class="title force-lang-font">
            xx
          </span>
        </v-toolbar-title>

        <v-spacer />
        <v-btn
          icon
          @click="LoginOut"
        >
          <v-icon>mdi-login-variant</v-icon>
        </v-btn>
      </v-app-bar>
    <!-- :class="{'safe-area--v-content':CenterClass}" -->
      <v-content
        :class="{'safe-area--v-content':CenterClass}"
        id="content"
      >
        <transition
          name="slide-fade"
          mode="out-in"
        >
          <router-view />
        </transition>
        <Footer v-if="flag"/>
      </v-content>
  </v-app>
</template>

<script>
import './styles/global.css'
import './styles/modules.scss'
import './styles/fonts.css'
import './styles/theme-adapt.scss'
import Navigation from "@/components/drawer/Navigation";
import Logo from "@/components/drawer/Logo";
import GlobalSearchNavigation from "@/components/search/GlobalSearchNavigation";
import Footer from "@/components/global/Footer";





export default {

  name: 'App',

  components: {
    Navigation,
    Logo,
    GlobalSearchNavigation,
    Footer,
  },

  data () {
    return {  
      drawer: !this.$vuetify.breakpoint.xsOnly,
      flag: null,
      token: null,
    }
  },
  created (){
    let user = JSON.parse(localStorage.getItem('access-user'));
    let token = '';
    if (user) {
      token = user.token;
    }
    if(token === null || token === '')
      this.flag = false;
    else
      this.flag = true;
    console.log(token);
    this.routes = this.$router.options.routes.filter(el => !el.meta.hide);
  },
  methods:{
      LoginOut(){
        localStorage.removeItem('access-user');
        this.$router.push('/login');
        this.flag = false;
        alert("login out");
      },
  },
  computed:{
    CenterClass(){
      return (this.$route.path === '/login'||this.$route.path === '/register'?false : true);
    }
  }

};
</script>
