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
        v-model="tab"
      >
        <v-tab
          v-for="link in links"
          :key="link"
          :value="link.id"
        >
          <v-icon class="pr-5">{{link.icon}}</v-icon>{{ link.name }}
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
              <v-col class="d-flex flex-column">
                <span>Feed {{news.length}}</span>
                <span>Favorites {{favoriteNews.length}}</span>
              </v-col>
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="8"
            class="d-flex flex-row justify-center"

          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
              max-width="500"
              class="responsive"
              style="background: #EEEEEE"
            >
              <Feed :is-feed="tab" ></Feed>
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
import { computed, ref } from 'vue'

export default {
  data: () => ({
    links: [
      {name: 'Feed', id: 1, icon: 'mdi-movie-roll'},
      {name: 'Favorites', id: 2, icon: 'mdi-heart'},
    ],
  }),
  components: {
    Feed
  },
  setup() {
    const store = useStore()
    let tab = ref("")

    const favoriteNews = computed(() => store.state.favoriteNews)
    const news = computed(() => store.state.news)

    return {
      favoriteNews,
      news,
      tab
    }
  }
}
</script>
<style scoped>
@media screen and (max-width: 400px) {
  .responsive {
    width: 100%;
    padding: 0 5px;
  }
}
</style>