<template>
  <div>
    <!-- 弹出判断 -->
    <v-dialog
      v-model="auth.dialog"
      max-width="550px"
    >
      <v-card class="py-2 px-1">
        <v-card-title class="headline">
          {{ 'login' }}
        </v-card-title>
        <v-card-text>
          <v-alert
            type="info"
            border="left"
            class="mt-2 mb-6"
          >
            {{ 'notice' }}
          </v-alert>
          <v-text-field
            class="mb-3"
            v-model="auth.username"
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
            
            v-model="auth.password"
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
            :disabled="auth.username === '' && auth.password === ''"
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

      </v-card>
    </v-dialog>
    <v-btn
      v-if="true"
      v-haptic

      icon
      @click="auth.dialog = true"
    >
      <v-icon>mdi-login-variant</v-icon>
    </v-btn>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
    
    name: "AccountManager",
    data () {
        return {
            auth: {
            buttonHovered: false,
            dialog: false,
            username: '',
            password: '',
            loading: false,
            detailPrompt: false
            },
            snackbar: {
            enabled: false,
            color: "",
            text: ""
            },
            historyDialog: false,
            error: ""
        }
    },
    created () {
    
    },
    methods:{
        keyupClick() {
          this.$refs.pwd.focus()
        },
        login() {},
    },

}
</script>

<style>

</style>