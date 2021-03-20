<template>
   <v-app id="inspire">
      <v-content>
         <v-container fluid fill-height>
            <v-layout justify-center align-center>
               <v-flex xs12 sm8 md4>
                 <v-card class="py-2 px-1 rounded-xl card-login" 
                  :elevation="10"
                 >
                    <v-card-title class="headline">
                      {{ '管理员登陆' }}
                    </v-card-title>
                    <v-card-text>
                      <v-alert
                        type="info"
                        border="left"
                        class="mt-2 mb-6"
                      >
                        {{ 'Notice:'+notice_text }}
                      </v-alert>
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
                        @click="login"
                      >
                        <v-icon left>
                          mdi-login-variant
                        </v-icon>

                        {{ 'Login' }}
                      </v-btn>
                    </v-card-actions>

                    
                      <v-card-actions class="mx-4 mb-2">
                        <v-btn
                          v-haptic
                          color="pink accent-1"
                          block
                          large
                          @click="register"
                        >
                          <v-icon left>
                            mdi-login-variant
                          </v-icon>

                          {{ 'register' }}
                        </v-btn>
                      </v-card-actions>
                    

                  </v-card>
                  <!-- <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Login form</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                           <v-text-field
                              prepend-icon="person"
                              name="login"
                              label="Login"
                              type="text"
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              prepend-icon="lock"
                              name="password"
                              label="Password"
                              type="password"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" to="/">Login</v-btn>
                     </v-card-actions>
                  </v-card> -->
               </v-flex>
            </v-layout>
         </v-container>
      </v-content>
   </v-app>
</template>

<script>
import API from '../api/api_user'
import API_Nomal from '../api/api_data'
import '../styles/fonts.css'
import anime from 'animejs';
import { mapMutations} from 'vuex';
export default {
    name: 'Login',
    data () {
        return {
            userToken: '',
            host: window.location.host,
            user: {
              username: '',
              password: '',
            },
            auth: {
              buttonHovered: false,
              dialog: false,
              username: '',
              loading: false,
              detailPrompt: false
            },
            userToken: '',
            historyDialog: false,
            error: "",
            notice_text: "",
        }
    },
    created (){
      this.notice();
      var obj = document.getElementById("content");
      // obj.classList.remove("safe-area--v-content");
    },
    methods:{
      ...mapMutations(['changeLogin']),
        keyupClick() {
          this.$refs.pwd.focus()
        },
        notice(){
          let _this = this;
          API_Nomal.Get('notice/').then(function(res){
            _this.notice_text = res;
          })
        },
        login() {
          let _this = this;
          _this.auth.loading = true;
          API.login(this.user).then(function(res) {
            if(res.LoginSuccess === false){
              alert('账号或密码出现错误');
            }else{
              let userinfo ={
                userToken: res.userToken,
                timestamp: new Date().getTime()
              };
              localStorage.setItem('access-user', JSON.stringify(userinfo));
              _this.$router.go('/');
              _this.auth.loading = false;
              alert('登陆成功');
            }
          })
          _this.auth.loading = false;
        },
        register(){
            this.$router.push('/register');
        }
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
    mounted (){
      setTimeout(() => {
      try {
        anime({
          targets: '.card-login',
          translateY: [48, 0],
          opacity: [0, 1],
          duration: 625,
          delay: anime.stagger(75),
          easing: "easeOutQuint"
        })
      } catch (e) {
        Console.warn("HomeAnimation", "error when animating home entry animation", e)
      }
    }, 0.1);
    }
}
</script>


