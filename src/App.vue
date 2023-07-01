<template>
  <v-app>
    <div>
      <v-app-bar app dark>
        <v-app-bar-nav-icon @click="drawer = !drawer"/>
        <v-spacer />
        <v-toolbar-title>Anotame</v-toolbar-title>
      </v-app-bar>
      <v-navigation-drawer app dark v-model="drawer" temporary>
        <v-list
        nav
        dark
      >
        <v-list-item-group
          active-class="text--accent-4"
        >
          <v-list-item
            :to="'/'"
          >
          <v-icon class="mr-2">mdi-lightbulb</v-icon>
            <v-list-item-title>Ideas</v-list-item-title>
          </v-list-item>

          <v-list-item
            :to="'/notas'"
          >
          <v-icon class="mr-2">mdi-note</v-icon>
            <v-list-item-title>Notas</v-list-item-title>
          </v-list-item>

          <v-list-item
            :to="'/acerca-de'"
          >
          <v-icon class="mr-2">mdi-help</v-icon>
            <v-list-item-title>Acerca de</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      </v-navigation-drawer>
    </div>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    drawer: false
  }),
};
</script>
