<template>
  <v-card
    width="500" v-for="item in news" :key="item"
    class="mx-auto mb-4"
    max-width="500"
    flat
  >
    <v-img
      :src="item.urlToImage"
      cover
    ></v-img>

    <v-card-title>
      {{item.title}}
    </v-card-title>

    <v-card-subtitle>
      <sup>{{formatDate(item.publishedAt)}}</sup>
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange-lighten-2"
        variant="text"
        @click="show = !show"
      >
        Explore
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          <p class="mb-3">{{item.description}}</p>
          <a :href="item.url">{{item.url}}</a>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>
<script>
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import { format } from 'date-fns'

export default {
  setup() {
    const store = useStore()

    const news = computed(() => store.state.news)
    const show = ref(false)

    onMounted(() => {
      store.dispatch('getNews')
      // console.log(news);
    })

    const formatDate = (item) =>  {
      let date = new Date(item)
      return format(date, 'dd/MM/yyyy');
    };

    return {
      news,
      formatDate,
      show
    }
  }
}
</script>