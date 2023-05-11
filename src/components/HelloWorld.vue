<template>
  <v-app id="inspire">
    <v-app-bar
      class="px-3"
      color="white"
      flat
      density="compact"
    >
      <v-spacer></v-spacer>

      <v-tabs
        centered
        color="grey-darken-2"
      >
        <v-tab
          v-for="link in links"
          :key="link"
        >
          {{ link }}
        </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="2"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >
              <span>{{favoriteNews}}</span>
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="8"
            class="d-flex flex-row justify-center"
            width="500"
          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
              width="500"
              style="background: #EEEEEE"
            >
              <Feed></Feed>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Feed from './feed.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  data: () => ({
    links: [
      'Dashboard',
      'Messages',
      'Profile',
      'Updates',
    ],
  }),
  components: {
    Feed
  },
  setup() {
    const store = useStore()

    const favoriteNews = computed(() => store.state.favoriteNews)

    return {favoriteNews}
  }
}
</script>