<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="black accent-3"
      src="https://picsum.photos/1920/1080?random"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" class="white--text" />
      <v-spacer></v-spacer>
      <v-divider vertical></v-divider>
      <v-btn color="white" text @click="() => $router.push({ path: `/guildRules`})">
        <v-icon>mdi-cards-heart-outline</v-icon>ギルド方針
      </v-btn>
      <v-divider vertical></v-divider>
      <v-btn color="white" text @click="() => $router.push({ path: `/rules`})">
        <v-icon>mdi-alert-circle-check-outline</v-icon>運用ルール
      </v-btn>
      <v-divider vertical></v-divider>
      <v-btn color="white" text @click="() => $router.push({ path: `/defences`})">
        <v-icon>mdi-magnify</v-icon>防衛から
      </v-btn>
      <v-divider vertical></v-divider>
      <v-btn color="white" text @click="() => $router.push({ path: `/offences`})">
        <v-icon>mdi-magnify</v-icon>攻めから
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/defences'
        },
        {
          icon: 'mdi-cards-heart-outline',
          title: 'ギルド方針',
          to: '/guildRules'
        },
        {
          icon: 'mdi-alert-circle-check-outline',
          title: '運用ルール',
          to: '/rules'
        },
        {
          icon: 'mdi-magnify',
          title: '防衛から検索',
          to: '/defences'
        },
        {
          icon: 'mdi-magnify',
          title: '攻めから検索',
          to: '/offences'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'STD♡3rd'
    }
  }
}
</script>
