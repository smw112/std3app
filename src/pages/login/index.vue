<template>
  <v-layout align-center justify-center>
    <v-container>
      <v-row dense>
        <v-col cols=12>
          <v-card elevation="16" width="600px" class="mx-auto mt-5" shaped>
            <v-card-title>
              <h2 class="mx-auto">ログイン</h2>
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-bind:type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  prepend-icon="mdi-lock"
                  label="パスワード"
                  placeholder="シーズンごとに変更します"
                  counter="32"
                  v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  v-model="user.password"
                ></v-text-field>
                <v-card-actions>
                  <v-btn
                    v-if="!loading"
                    class="primary"
                    @click="login"
                    rounded
                    x-large
                  >
                    　ログイン　
                  </v-btn>
                  <v-progress-circular
                    v-else
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row
        v-if="loginErr"
        justify="center">
        <v-alert
          dense
          outlined
          type="error"
        >
          ログインに失敗しました
        </v-alert>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  layout: 'home',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      showPassword: false,
      loading: false,
      loginErr: false
    }
  },
  methods: {
    async login() {
      this.loading = true
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: 'std_member',
            password: this.user.password
          }
        })
        this.$router.replace({ path: '/defences' });
      } catch(err) {
        this.loading = false
        this.loginErr = true
      }
    },
  },
}
</script>
