<template>
  <v-layout align-center justify-center>
    <v-card elevation="16" width="600px" class="mx-auto mt-5" shaped>
      <v-card-title>
        <h2 class="mx-auto">新規登録</h2>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            prepend-icon="mdi-account-circle"
            label="ユーザー名"
            placeholder="yamadatarou"
            counter="16"
            v-model="user.username"
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-email-outline"
            label="メールアドレス"
            placeholder="example@email.com"
            counter="64"
            v-model="user.email"
          />
          <v-text-field
            v-bind:type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            prepend-icon="mdi-lock"
            label="パスワード"
            placeholder="大文字・小文字・記号を含んで下さい"
            counter="32"
            v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            v-model="user.password"
          ></v-text-field>
          <br />
          <v-card-actions>
            <v-btn rounded x-large class="primary" @click="createUser">登録</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  auth: false,
  layout: 'home',
  data() {
    return {
      showPassword: false,
      user: {
        username: '',
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async createUser() {
      await this.$axios.post('https://std3app.herokuapp.com/api/auth/signup', {
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
      })
      await this.$router.push('/login')
    },
  },
}
</script>
