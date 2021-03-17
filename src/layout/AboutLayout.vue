<template>
  <v-container
    class="justify-center lg-wider-container"
    :class="{'fill-height': isActive }"
    
  >
    <v-row align="center">
      <v-col>
        <transition
          name="slide-fade"
          mode="out-in"
        >
          <router-view :key="key"></router-view>
        </transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "AboutLayout",
    data(){
      return{
        isActive: true,
      }
    },
    created(){
    },
    computed:{
      key(){
        return this.$route.path + Math.random();
      },
    },
    watch:{
      '$route':function(){
        if(this.$route.name == 'office'){
          this.isActive = true;
        }else{
          this.isActive = false;
        }
      }
      
    }
  }
</script>

<style scoped>
  @media (min-width: 960px) {
    .lg-wider-container {
      max-width: 1255px !important;
    }
  }

</style>