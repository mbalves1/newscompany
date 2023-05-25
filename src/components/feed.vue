<template>
  <v-card
    v-for="(item, index) in dataFeed" :key="item"
    class="mx-auto mb-4 card-container"
    flat
  >
    <v-img
      :src="isFeed !== 1 ? item.image : item.urlToImage"
      cover
    ></v-img>

    <v-card-title class="removed" style="white-space: initial">
      {{item.title}}
      <!-- <pre>{{item}}</pre> -->
    </v-card-title>

    <v-card-subtitle class="d-flex flex-column">
      <span>{{item.author}}</span>
      <span>{{formatDate(item.publishedAt)}}</span>
    </v-card-subtitle>

    <v-card-text>
      <p class="mb-3">{{item.description}}</p>
    </v-card-text>

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
        :icon="item.show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="openInfos(index)"
      ></v-btn>

      <v-btn
        v-if="isFeed !== 1"
        :icon="item.favorite ? 'mdi-heart' : 'mdi-heart-outline'"
        :color="item.favorite ? 'red' : 'black'"
        @click="favorite(item)"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="item.show">
        <v-divider></v-divider>
        <v-card-text>
          <p class="mb-3">{{item.content}}</p>
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
  props: {
    isFeed: {
      type: String,
      default: "feed"
    }
  },
  setup(props) {
    const store = useStore()

    const news = computed(() => store.state.news)
    const favoriteNews = computed(() => store.state.favoriteNews)
    const newsMoreRead = computed(() => store.state.newsMoreRead)
    const show = ref(false)

    onMounted(() => {
      getNew()
      getNewMoreRead()
      newsMoreRead
    })

    const getNew = () => {
      store.dispatch('getNews')
    }

    const getNewMoreRead = () => {
      store.dispatch('getNewsMoreReaded')
    }

    const openInfos = (index) => {
      news.value.forEach((item, i) => item.show = i === index ? !item.show : false);
      newsMoreRead.value.forEach((item, i) => item.show = i === index ? !item.show : false);
    }

    const dataFeed = computed(() => {
      return props.isFeed === 1 ? news.value : props.isFeed === 2 ? favoriteNews.value : newsMoreRead.value
    })

    const favorite = (item) => {
      console.log("item", item);
      favoriteNews.value.map(i => {
        console.log(":>", i);
      })
      if (!item.id) {
        item.favorite = true
        item.id = Math.floor(1000000 + Math.random() * 9000000)
        favoriteNews.value.push(item)
      } else {
        item.favorite = false
      }
      // const itemMore = newsMoreRead.value[index];
      // if(props.isFeed === 2) {
      //   itemMore.favorite = false;
      //   console.log(index);
      // } else {
  
      //   if (!itemMore.favorite) {
          
      //     favoriteNews.value.push(itemMore);
      //     itemMore.favorite = true;
      //   } else {
      //     const itemIndex = favoriteNews.value.findIndex((favItem) => favItem === itemMore);
      //     if (itemIndex !== -1) {
      //       favoriteNews.value.splice(itemIndex, 1);
      //       itemMore.favorite = false;
      //     }
      //   }
      // }
    }

    const formatDate = (item) =>  {
      let date = new Date(item)
      return format(date, 'dd/MM/yyyy');
    };

    return {
      news,
      formatDate,
      show,
      newsMoreRead,
      openInfos,
      favorite,
      dataFeed
    }
  }
}
</script>
<style scoped>
.v-card .v-card-subtitle .v-card-title {
  line-height: 15px !important;
}

.removed {
  line-height: 22px !important;
}
</style>