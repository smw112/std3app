<template>
  <div>
    <v-btn fab light small color="light" class="mb-2"
      @click="add"
    >
      <v-icon light>
        mdi-phone-plus-outline
      </v-icon>
    </v-btn>
    <v-layout
      column
      justify-center
      align-center
    >
      <template v-slot:activator="{ on }">
      </template>
      <v-card v-if="contacts">
        <v-card-title>
          <v-icon light>mdi-book-open-variant</v-icon>　連絡先一覧
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="検索"
            sigle-line
          />
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="contacts"
          :items-per-page="5"
          :search="search"
          sort-by="id"
          :sort-desc="true"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field v-model="contact.name" label="名前" />
                      </v-col>
                      <v-col cols="6">
                        <v-text-field v-model="contact.phone_number" label="電話番号" />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn @click="close">閉じる</v-btn>
                  <v-btn v-if="isPersistedContact" class="primary" @click="update">更新する</v-btn>
                  <v-btn v-else class="primary" @click="create">追加する</v-btn>
                  <v-spacer />
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              @click="edit(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="remove(item)"
            >
              mdi-delete
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
      contact: {},
      contacts: [],
      search: '',
      headers: [
        { text: 'ID', value: 'id' },
        { text: '名前', value: 'name' },
        { text: '電話番号', value: 'phone_number' },
        { text: '操作', value: 'actions' }
      ]
    }
  },
  mounted() {
    this.load()
  },
  computed: {
    isPersistedContact () {
      return !!this.contact.id
    },
    formTitle () {
      return this.isPersistedContact ? '連絡先編集' : '連絡先追加'
    },
    user() {
      return this.$auth.user;
    }
  },
  methods: {
    async load() {
      console.log(this.$auth.strategy.token.get())
      this.contacts = await this.$axios.get('https://std3app.herokuapp.com/api/contacts', {
        headers: {
            Authorization: this.$auth.strategy.token.get(),
          }
      }).then((response) => {
        return response.data
      })
    },
    add (contact) {
      this.contact = {}
      this.dialog = true
    },
    async create () {
      await this.$axios
        .post(`https://std3app.herokuapp.com/api/contacts`, {
          headers: {
            Authorization: this.$auth.strategy.token.get(),
          },
          name: this.contact.name,
          phone_number: this.contact.phone_number,
        })
        .then((response) => {
          console.log(response)
      })
      this.close()
      this.load()
    },
    edit (contact) {
      this.contact = Object.assign({}, contact)
      this.dialog = true
    },
    async update () {
      await this.$axios
        .put(`https://std3app.herokuapp.com/api/contacts/${this.contact.id}`, {
          headers: {
            Authorization: this.$auth.strategy.token.get(),
          },
          name: this.contact.name,
          phone_number: this.contact.phone_number,
        })
        .then((response) => {
          console.log(response)
      })
      this.close()
      this.load()
    },
    async remove (contact) {
      await this.$axios
        .delete(`https://std3app.herokuapp.com/api/contacts/${contact.id}`, {
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
      this.contact = {}
    },
  }
}
</script>
