<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex xs12 sm8 md4>
            <v-card class="py-2 px-1 rounded-xl card-login" :elevation="10">
              <v-card-title class="headline">
                {{ "管理员注册" }}
              </v-card-title>
              <v-card-text>
                <v-alert type="info" border="left" class="mt-2 mb-6">
                  {{ "Notice: 破产了破产了破产了" }}
                </v-alert>
                <v-row>
                  <v-col cols="12" sm="4">
                    <v-img :src="require('../assets/download.png')"
                      aspect-ratio="1"
                      height="128px"
                      width="128px"
                    ></v-img>
                  </v-col>
                  <v-col cols="12" sm="8" >
                    <v-text-field
                      class="mb-3"
                      v-model="user.username"
                      :label="`${'userId'} *`"
                      :error-messages="error"
                      required
                      clearable
                      outlined
                      :hide-details="error === ''"
                      @keyup.enter.native="keyupClick"
                      @input="emitError"
                    >
                    </v-text-field>

                    <v-text-field
                      v-model="user.password"
                      :label="`${'password'} *`"
                      :error-messages="error"
                      required
                      clearable
                      outlined
                      :hide-details="error === ''"
                      ref="pwd"
                      @keyup.enter.native="login"
                      @input="emitError"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
              <!-- 登陆按钮 -->
              <v-card-actions class="mx-4 mb-2">
                <v-btn
                  v-haptic
                  :loading="auth.loading"
                  :disabled="user.username === '' || user.password === ''"
                  color="primary"
                  block
                  large
                  @click="register"
                >
                  <v-icon left> mdi-login-variant </v-icon>

                  {{ "Register" }}
                </v-btn>
              </v-card-actions>
              
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import API from "../api/api_data";
import "../styles/fonts.css";
import anime from "animejs";
import { mapMutations } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      userToken: "",
      host: window.location.host,
      user: {
        username: "",
        password: "",
      },
      auth: {
        buttonHovered: false,
        dialog: false,
        username: "",
        loading: false,
        detailPrompt: false,
      },
      userToken: "",
      historyDialog: false,
      error: "",
      url: window.location.href,
    };
  },
  created() {
    // var obj = document.getElementById("content");
    // obj.classList.remove("safe-area--v-content");
  },
  methods: {
    ...mapMutations(["changeLogin"]),
    keyupClick() {
      this.$refs.pwd.focus();
    },
    register() {
      let _this = this;
      _this.auth.loading = true;
      API.Post('api/'+this.url.split('/').pop(),this.user).then(function (res) {
        //验证
          console.log(res);
          if(res.code == 104){
            alert(res.msg);
          }else if(res.code == 101){
            
            _this.auth.loading = false;
            alert(res.msg);
            _this.$router.push('/login');
          }
      });
    
    },
    // login() {
    //   let _this = this;
    //   axios({
    //     method: 'post',
    //     url: 'http://localhost:8081/login',
    //     data: this.user,
    //   }).then(res => {
    //     if(res.data.LoginSuccess === false){
    //       alert('账号或密码出现错误');
    //     }else{
    //       let userinfo ={
    //         userToken: res.data.userToken,
    //         timestamp: new Date().getTime()
    //       };
    //       localStorage.setItem('access-user', JSON.stringify(userinfo));
    //       _this.$router.go('/');
    //       alert('登陆成功');
    //     }

    //   }).catch(error =>{
    //     console.log(error);
    //     alert("登陆出现错误");
    //   })
    // },
  },
  mounted() {
    setTimeout(() => {
      try {
        anime({
          targets: ".card-login",
          translateY: [48, 0],
          opacity: [0, 1],
          duration: 625,
          delay: anime.stagger(75),
          easing: "easeOutQuint",
        });
      } catch (e) {
        Console.warn(
          "HomeAnimation",
          "error when animating home entry animation",
          e
        );
      }
    }, 0.1);
  },
};
</script>


<style>
</style>