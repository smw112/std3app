<template>
  <v-layout
    column
    justify-center
    align-left
  >
    <v-card max-width="800px" :shaped="true">
      <v-card-title>{{ defence.monster1 }}/{{ defence.monster2 }}/{{ defence.monster3 }}</v-card-title>
      <v-card-subtitle>
        <v-icon light>
          mdi-alert-circle
        </v-icon>
        メモ
      </v-card-subtitle>
      <v-card-text v-if="defence.memo">{{ defence.memo }}</v-card-text>
      <v-card-text v-else>なし</v-card-text>
    </v-card><br /><br />
    <div class="text-left">
      <v-btn
        class="ma-2"
        outlined
        color="indigo"
        max-width="150px"
        @click="() => $router.push({ path: `/defences`})"
      >
        防衛へもどる
      </v-btn>
    </div>
    <br>
    <div></div>
    <v-card max-width="800px" :shaped="true" v-if="offences">
      <v-card-title>
        攻めパ一覧 (全{{ offenceCount }}件)
        <v-spacer />
      </v-card-title>
      <v-card-subtitle>
        <v-btn
          color="blue-grey"
          class="ma-2 white--text"
          @click="add"
        >
          攻めパ追加
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
        dense
        :headers="headers"
        :items="offences"
        :items-per-page="10"
        sort-by="rate"
        :sort-desc="true"
        class="elevation-1"
        no-data-text="データがありません。"
      >
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span v-if="isPersistedOffence" class="headline">{{ offence.monster1}}/{{ offence.monster2}}/{{ offence.monster3}}</span>
                <span v-else class="headline">攻めパ追加</span>
                <span class="grey--text subtitle-2">- VS {{ defence.monster1 }}/{{ defence.monster2 }}/{{ defence.monster3 }}</span>
              </v-card-title>
              <v-card-subtitle>
                <br>
                <span class="text-right grey--text text-caption">
                  <v-icon>mdi-alert-outline</v-icon>モンスター名は正式名称で入力してください
                </span>
              </v-card-subtitle>
              <v-card-text>
                <v-container>
                  <v-form ref="offence_form">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field v-model="offence.monster1" counter="255" label="モンスター1(リーダー)" :rules="[required]" />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="offence.monster1Memo" counter="255" label="ルーン/AF" :rules="[required]" />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="offence.monster2" counter="255" label="モンスター2" :rules="[required]" />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="offence.monster2Memo" counter="255" label="ルーン/AF" :rules="[required]" />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="offence.monster3" counter="255" label="モンスター3" :rules="[required]" />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="offence.monster3Memo" counter="255" label="ルーン/AF" :rules="[required]" />
                      </v-col>
                      <v-col
                        cols="12"
                      >
                        <v-slider
                          v-model="offence.rate"
                          color="light-green"
                          label="推奨度"
                          hint="高い順に使用をオススメします"
                          min="1"
                          max="5"
                          thumb-label
                          step="1"
                          ticks="always"
                          :tick-labels="ticksLabels"
                        ></v-slider>
                      </v-col>

                      <v-col cols="12">
                        <v-checkbox v-model="offence.isAccept" label="検証済み"></v-checkbox>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea v-model="offence.actionOrder" label="プレイング" :rules="[required]" />
                      </v-col>
                      <v-col cols="12">
                        <v-textarea v-model="offence.memo" label="メモ" />
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
                <v-btn v-else-if="isPersistedOffence" class="primary" @click="update">更新する</v-btn>
                <v-btn v-else class="primary" @click="create">追加する</v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="showDialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ offence.monster1}}/{{ offence.monster2}}/{{ offence.monster3}}</span>
                <span class="grey--text subtitle-2">- VS {{ defence.monster1 }}/{{ defence.monster2 }}/{{ defence.monster3 }}</span>
              </v-card-title>
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

        <template v-slot:item.isAccept="{ item }">
          <v-icon v-if="item.isAccept" color="blue" light>mdi-check-circle-outline</v-icon>
          <span v-else class="pink--text">未検証</span>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon @click="show(item)">
            mdi-chevron-right-circle
          </v-icon>
          <v-icon @click="edit(item)">
            mdi-pencil
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      showDialog: false,
      unLoading: true,
      submitForm: false,
      search: '',
      headers: [
        { text: '推奨度', value: 'rate' },
        { text: 'リーダー', value: 'monster1' },
        { text: '.', value: 'monster2' },
        { text: '.', value: 'monster3' },
        { text: '検証', value: 'isAccept' },
        { text: '操作', value: 'actions' }
      ],
      required: value => !!value || "必ず入力してください",
      offences: [],
      offence: {},
      defence: {},
    }
  },
  mounted() {
    this.load()
  },
  computed: {
    defId() {
      return this.$route.params.id
    },
    isPersistedOffence () {
      return !!this.offence.id
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
      this.defence = await this.$axios.get(`https://std3app.herokuapp.com/api/defences/${this.defId}`, {
        headers: {
            Authorization: this.$auth.strategy.token.get(),
          }
      }).then((response) => {
        return response.data
      })
      this.offences = await this.$axios.get(`https://std3app.herokuapp.com/api/offences?defenceId=${this.defId}`, {
        headers: {
            Authorization: this.$auth.strategy.token.get(),
          },
      }).then((response) => {
        return response.data
      })
      this.unLoading = false
      this.submitForm = false
    },
    show (offence) {
      this.offence = Object.assign({}, offence)
      this.showDialog = true
    },
    close () {
      this.dialog = false
      this.showDialog = false
      this.offence = {}
    },
    add (offence) {
      this.offence = {}
      this.dialog = true
    },
    async create () {
      if (this.$refs.offence_form.validate()) {
        this.submitForm = true
        await this.$axios
          .post(`https://std3app.herokuapp.com/api/offences`, {
            headers: {
              Authorization: this.$auth.strategy.token.get(),
            },
            defenceId: this.defId,
            monster1: this.offence.monster1,
            monster1Memo: this.offence.monster1Memo,
            monster2: this.offence.monster2,
            monster2Memo: this.offence.monster2Memo,
            monster3: this.offence.monster3,
            monster3Memo: this.offence.monster3Memo,
            actionOrder: this.offence.actionOrder,
            memo: this.offence.memo,
            rate: this.offence.rate,
            isAccept: this.offence.isAccept
          })
          .then((response) => {
            console.log(response)
        })
        this.close()
        this.load()
      }
    },
    edit (offence) {
      this.offence = Object.assign({}, offence)
      this.dialog = true
    },
    async update () {
      if (this.$refs.offence_form.validate()) {
        this.submitForm = true
        await this.$axios
          .put(`https://std3app.herokuapp.com/api/offences/${this.offence.id}`, {
            headers: {
              Authorization: this.$auth.strategy.token.get(),
            },
            defenceId: this.defId,
            monster1: this.offence.monster1,
            monster1Memo: this.offence.monster1Memo,
            monster2: this.offence.monster2,
            monster2Memo: this.offence.monster2Memo,
            monster3: this.offence.monster3,
            monster3Memo: this.offence.monster3Memo,
            actionOrder: this.offence.actionOrder,
            memo: this.offence.memo,
            rate: this.offence.rate,
            isAccept: this.offence.isAccept
          })
          .then((response) => {
            console.log(response)
        })
        this.close()
        this.load()
      }
    },
  }
}
</script>
