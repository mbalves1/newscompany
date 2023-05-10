<template>
  <v-card
    v-for="(item, index) in news" :key="item"
    class="mx-auto mb-4 card-container"
    flat
  >
    <v-img
      :src="item.urlToImage"
      cover
    ></v-img>

    <v-card-title style="white-space: initial">
      {{item.title}}
    </v-card-title>

    <v-card-subtitle>
      <sup>{{formatDate(item.publishedAt)}}</sup>
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange-lighten-2"
        variant="text"
        @click="openInfos(index)"
      >
        Explore
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="openInfos(index)"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="item.show">
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

    const openInfos = (index) => {
      news.value.forEach((item, i) => item.show = i === index ? !item.show : false);
    }

    const formatDate = (item) =>  {
      let date = new Date(item)
      return format(date, 'dd/MM/yyyy');
    };

    return {
      news,
      formatDate,
      show,
      openInfos
    }
  }
}
</script>