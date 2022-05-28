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
      <v-card v-if="offences" max-width="800px" :shaped="true">
        <v-card-title>
          <v-icon light>mdi-folder</v-icon>　攻めパから検索 (全{{ offenceCount }}件)
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="検索"
            sigle-line
          />
        </v-card-title>
        <v-card-subtitle>
          <p class="text-right grey--text text-caption">
            <span><v-icon>mdi-chevron-right-circle</v-icon>...詳細を見る</span>
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
          :items="offences"
          :items-per-page="10"
          :search="search"
          sort-by="id"
          :sort-desc="true"
          class="elevation-1"
          no-data-text="データがありません。"
        >
        <template v-slot:top>
          <v-dialog v-model="showDialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ offence.monster1}}/{{ offence.monster2}}/{{ offence.monster3}}</span>
                <span v-if="offence.defence" class="grey--text subtitle-2">- VS {{ offence.defence.monster1 }}/{{ offence.defence.monster2 }}/{{ offence.defence.monster3 }}</span>
              </v-card-title>
              <v-btn
                class="ma-2"
                outlined
                color="indigo"
                @click="() => $router.push({ path: `/defences/${offence.defenceId}`})"
              >
                防衛ページへ移動
              </v-btn>
              <v-divider></v-divider>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col v-if="offence.isAccept" cols="12" class="font-weight-bold"><v-icon color="blue" light>mdi-check-circle-outline</v-icon><span class="blue--text">検証済みPT</span></v-col>
                    <v-col v-else cols="12" class="font-weight-bold"><v-icon color="pink" light>mdi-alert-decagram-outline</v-icon><span class="pink--text">未検証PT</span></v-col>
                    <v-col cols="12" class="font-weight-bold"><v-icon light>mdi-check-circle-outline</v-icon>プレイング</v-col>
                    <v-col class="u-pre-wrap text-caption" cols="12" v-text="offence.actionOrder"></v-col>
                    <v-col cols="12" class="font-weight-bold"><v-icon light>mdi-check-circle-outline</v-icon>メモ</v-col>
                    <v-col v-if="offence.memo" class="u-pre-wrap text-caption" cols="12" v-text="offence.memo"></v-col>
                    <v-col v-else class="u-pre-wrap text-caption" cols="12">なし</v-col>
                    <v-col
                      cols="12"
                    >
                      <v-slider
                        v-model="offence.rate"
                        color="light-green"
                        label="推奨度"
                        min="1"
                        max="5"
                        thumb-label
                        readonly
                        step="1"
                        ticks="always"
                        :tick-labels="ticksLabels"
                      ></v-slider>
                    </v-col>
                    <v-col cols="12" class="font-weight-bold">
                      <v-icon light>mdi-alert-circle</v-icon>{{ offence.monster1 }}(リーダー)
                    </v-col>
                    <v-col class="u-pre-wrap text-caption" cols="12" v-text="offence.monster1Memo"></v-col>
                    <v-col cols="12" class="font-weight-bold">
                      <v-icon light>mdi-alert-circle</v-icon>{{ offence.monster2 }}
                    </v-col>
                    <v-col class="u-pre-wrap text-caption" cols="12" v-text="offence.monster2Memo"></v-col>
                    <v-col cols="12" class="font-weight-bold">
                      <v-icon light>mdi-alert-circle</v-icon>{{ offence.monster3 }}
                    </v-col>
                    <v-col class="u-pre-wrap text-caption" cols="12" v-text="offence.monster3Memo"></v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-icon
                  large
                  @click="close"
                >
                  mdi-close-circle-outline
                </v-icon>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>

        <template v-slot:item.defences="{ item }">
          <span class="grey--text text-caption">VS {{ item.defence.monster1 }}/{{ item.defence.monster2 }}/{{ item.defence.monster3 }}</span>
        </template>

          <template v-slot:item.actions="{ item }">
            <v-icon @click="show(item)">
              mdi-chevron-right-circle
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
      showDialog: false,
      offences: [],
      offence: {},
      unLoading: true,
      search: '',
      headers: [
        { text: '防衛', value: 'defences' },
        { text: 'リーダー', value: 'monster1' },
        { text: '.', value: 'monster2' },
        { text: '.', value: 'monster3' },
        { text: '操作', value: 'actions' }
      ],
    }
  },
  mounted() {
    this.load()
  },
  computed: {
    user() {
      return this.$auth.user;
    },
    offenceCount () {
      return this.offences.length
    },
    ticksLabels () {
      return [1, 2, 3, 4, 5]
    },
  },
  methods: {
    async load() {
      this.offences = await this.$axios.get('https://std3app.herokuapp.com/api/offences?defenceId=-1', {
        headers: {
            Authorization: this.$auth.strategy.token.get(),
          }
      }).then((response) => {
        return response.data
      })
      this.unLoading = false
    },
    show (offence) {
      this.offence = Object.assign({}, offence)
      this.showDialog = true
    },
    close () {
      this.showDialog = false
      this.offence = {}
    },
  }
}
</script>
