<template>
  <v-app class="banner">
    <div class="banner-container">

      <v-card max-height="300px" height="300" flat class="roundel lessBan ml-4">
        <v-img src="https://img.freepik.com/vetores-gratis/fundo-do-boletim-de-noticias-da-terra-de-tecnologia-global_1017-33687.jpg"></v-img>
      </v-card>
      <div class="cards">
        <v-card v-for="card in links" :key="card" min-width="100" height="102" style="background: #8FBF9F" class="card">
          <v-col class="d-flex flex-column justify-space-around align-center mt-4">
            <v-icon class="pr-5 ml-5">{{card.icon}}</v-icon>
            <span class="f-size-12 mt-3">{{ card.name }}</span>
          </v-col>
        </v-card>
      </div>
      <v-col>
        <h3>Mais lidas</h3> 
        <div v-for="card in dataFeed" :key="card" class="mt-3">
          <v-card min-width="100" flat class="lessBan">
            <!--<v-img
              :src="card.image"
              cover
            ></v-img>
            <v-card-title style="white-space: initial; font-size: 10px">
              {{card.title}}
            </v-card-title> -->
              <div class="d-flex flex-no-wrap justify-space-between">
                <v-avatar
                  class=""
                  size="125"
                  rounded="0"
                >
                  <v-img
                    :src="card.image"
                    cover
                  ></v-img>
                </v-avatar>
                <div>
                  <v-card-title class="f-size-12 tesst">
                    <p>{{card.title}}</p>
                  </v-card-title>

                  <v-card-subtitle class="f-size-10 tesst">
                    {{card.description}}
                  </v-card-subtitle>

                  <!-- <v-card-actions>
                    <v-btn
                      class=""
                      icon=""
                      variant="text"
                    ></v-btn>
                  </v-card-actions> -->
                </div>

              </div>
          </v-card>
        </div>
      </v-col>

      <v-col>
        <h3>Feed</h3>
        <v-row>
          <v-col :cols="6" v-for="card in dataFeedSecond" :key="card" class="">
            <v-card flat class="lessBan">
              <div class="d-flex flex-no-wrap justify-space-between flex-column">
                <v-avatar
                  class=""
                  :style="{ width: '100%', height: '100%' }"
                  rounded="0"
                >
                  <v-img
                    :src="card.image"
                    cover
                    :style="{ width: '100%', height: '100%' }"
                  ></v-img>
                </v-avatar>
                <div>
                  <v-card-title class="f-size-12 tesst">
                    <p>{{card.title}}</p>
                  </v-card-title>

                  <v-card-subtitle class="f-size-10 tesst">
                    {{card.description}}
                  </v-card-subtitle>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </div>
  </v-app>
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
    const newsMoreRead = computed(() => {
      console.log(store);
      return store.state.newsMoreRead
    })
    const links = computed(() => {
      console.log(store.state.links);
      return store.state.links
    })
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

    const dataFeed = computed(() => newsMoreRead.value.slice(0, 2))

    const dataFeedSecond = computed(() => newsMoreRead.value.slice(2, 7))

    const formatDate = (item) =>  {
      let date = new Date(item)
      return format(date, 'dd/MM/yyyy');
    };

    return {
      news,
      formatDate,
      links,
      show,
      newsMoreRead,
      openInfos,
      dataFeed,
      dataFeedSecond
    }
  }
}
</script>
<style scoped lang="scss">
.roundel {
  border-bottom-left-radius: 115px !important;
}
.lessBan {

  background: #F5ECD7;
}
.banner {
  background: #ebe2cd;
}
.cards {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  overflow-x: scroll;
  scrollbar-width: none !important;
  position: relative;
  top: -50px;
  height: 105px;
}
.cards::-webkit-scrollbar {
  display: none;
}
.card {
  margin: 0px 15px;
  border-radius: 15px;
  border-bottom-left-radius: 45px !important;
}

.f-size-10 {
  font-size: 10px;
}

.f-size-12 {
  font-size: 12px;
}

.tesst {
  line-height: 15px;
  white-space: initial;
}
.banner {
  display: flex;
  justify-content: center;
  align-items: center;
  &-container {
    max-width: 500px;
    margin: auto;
  }
}

</style>
