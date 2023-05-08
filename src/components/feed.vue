<template>
  <v-card width="500" v-for="item in news" :key="item">
    <v-img :src="item.urlToImage"></v-img>
    {{item}}
  </v-card>
</template>
<script>
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'

export default {
  setup() {
    const store = useStore()

    const news = computed(() => store.state.news)

    onMounted(() => {
      store.dispatch('getNews')
      console.log(news);
    })

    return {
      news
    }
  }
}
</script>