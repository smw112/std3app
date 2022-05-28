<template>
  <div>
    <v-layout
      column
      justify-center
      align-left
    >
      <br>
      <template v-slot:activator="{ on }">
      </template>
      <v-card v-if="defences" max-width="800px" :shaped="true">
        <v-card-title>
          <v-icon light>mdi-folder</v-icon>　防衛検索 (全{{ defCount }}件)
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="検索"
            sigle-line
          />
        </v-card-title>
        <v-card-subtitle>
          <v-btn
            color="blue-grey"
            class="ma-2 white--text"
            @click="add"
          >
            防衛追加
            <v-icon
              right
              dark
            >
              mdi-folder-multiple-plus-outline
            </v-icon>
          </v-btn>
          <p class="text-right grey--text text-caption">
            <span><v-icon>mdi-chevron-right-circle</v-icon>...詳細を見る</span>
            <span><v-icon>mdi-pencil</v-icon>...編集する</span>
          </p>
        </v-card-subtitle>
        <v-data-table
          v-if="unLoading"
          class="elevation-1"
          loading
          loading-text="読込中"
        ></v-data-table>
        <v-data-table
          v-else
          :headers="headers"
          :items="defences"
          :items-per-page="10"
          :search="search"
          sort-by="id"
          :sort-desc="true"
          class="elevation-1"
          no-data-text="データがありません。"
        >
          <template v-slot:top>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-subtitle>
                  <br>
                  <span class="text-right grey--text text-caption">
                    <v-icon>mdi-alert-outline</v-icon>モンスター名は正式名称で入力してください
                  </span>
                </v-card-subtitle>
                <v-card-text>
                  <v-container>
                    <v-form ref="defence_form">
                      <v-row>
                        <v-col cols="12">
                          <v-text-field v-model="defence.monster1" counter="255" label="モンスター1(リーダー)" :rules="[required]" />
                        </v-col>
                        <v-col cols="12">
                          <v-text-field v-model="defence.monster2" counter="255" label="モンスター2" :rules="[required]" />
                        </v-col>
                        <v-col cols="12">
                          <v-text-field v-model="defence.monster3" counter="255" label="モンスター3" :rules="[required]" />
                        </v-col>
                        <v-col cols="12">
                          <v-checkbox v-model="defence.isFive" label="純5防衛"></v-checkbox>
                        </v-col>
                        <v-col cols="12">
                          <v-textarea v-model="defence.memo" label="メモ" />
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn @click="close">✕</v-btn>
                  <v-progress-circular
                    v-if="submitForm"
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                  <v-btn v-else-if="isPersistedDefence" class="primary" @click="update">更新する</v-btn>
                  <v-btn v-else class="primary" @click="create">追加する</v-btn>
                  <v-spacer />
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>

        <template v-slot:item.createdAt="{ item }">
          <span>{{ $dateFns.format(item.createdAt, 'yyyy-MM-dd') }}</span>
        </template>

          <template v-slot:item.actions="{ item }">
            <v-icon @click="move(item)">
              mdi-chevron-right-circle
            </v-icon>
            <v-icon @click="edit(item)">
              mdi-pencil
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-layout>
  </div>
</template>

<script>
export default {
  middleware({ store, redirect }) {
    if(!store.$auth.loggedIn) {
      redirect('/login');
    }
  },
  data () {
    return {
      dialog: false,
      defence: {},
      defences: [],
      unLoading: true,
      submitForm: false,
      search: '',
      headers: [
        { text: '登録日', value: 'createdAt' },
        { text: 'リーダー', value: 'monster1' },
        { text: '.', value: 'monster2' },
        { text: '.', value: 'monster3' },
        { text: '操作', value: 'actions' }
      ],
      // 入力規則
      required: value => !!value || "必ず入力してください",
    }
  },
  mounted() {
    this.load()
  },
  computed: {
    isPersistedDefence () {
      return !!this.defence.id
    },
    formTitle () {
      return this.isPersistedDefence ? '防衛編集' : '防衛追加'
    },
    user() {
      return this.$auth.user;
    },
    defCount () {
      return this.defences.length
    },
  },
  methods: {
    async load() {
      this.defences = await this.$axios.get('https://std3app.herokuapp.com/api/defences', {
        headers: {
            Authorization: this.$auth.strategy.token.get(),
          }
      }).then((response) => {
        return response.data
      })
      this.unLoading = false
      this.submitForm = false
    },
    add (defence) {
      this.defence = {}
      this.dialog = true
    },
    async create () {
      if (this.$refs.defence_form.validate()) {
        this.submitForm = true
        await this.$axios
          .post(`https://std3app.herokuapp.com/api/defences`, {
            headers: {
              Authorization: this.$auth.strategy.token.get(),
            },
            monster1: this.defence.monster1,
            monster2: this.defence.monster2,
            monster3: this.defence.monster3,
            memo: this.defence.memo,
            is_five: this.defence.isFive
          })
          .then((response) => {
            console.log(response)
        })
        this.close()
        this.load()
      }
    },
    edit (defence) {
      this.defence = Object.assign({}, defence)
      this.dialog = true
    },
    move (defence) {
      this.$router.replace({ path: `/defences/${defence.id}` });
    },
    async update () {
      if (this.$refs.defence_form.validate()) {
        this.submitForm = true
        await this.$axios
          .put(`https://std3app.herokuapp.com/api/defences/${this.defence.id}`, {
            headers: {
              Authorization: this.$auth.strategy.token.get(),
            },
            monster1: this.defence.monster1,
            monster2: this.defence.monster2,
            monster3: this.defence.monster3,
            memo: this.defence.memo,
            is_five: this.defence.isFive
          })
          .then((response) => {
            console.log(response)
        })
        this.close()
        this.load()
      }
    },
    async remove (defence) {
      await this.$axios
        .delete(`https://std3app.herokuapp.com/api/defences/${defence.id}`, {
          headers: {
            Authorization: this.$auth.strategy.token.get(),
          }
        })
        .then((response) => {
          console.log(response)
      })
      this.load()
    },
    close () {
      this.dialog = false
      this.defence = {}
    },
  }
}
</script>
