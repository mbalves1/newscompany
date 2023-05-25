import { createStore, useStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    news: [],
    newsMoreRead: [],
    favoriteNews: [],
    links: [
      {name: 'Mais Lidas', id: 3, icon: 'mdi-book-open'},
      {name: 'Favorites', id: 2, icon: 'mdi-heart'},
      {name: 'Feed', id: 1, icon: 'mdi-movie-roll'},
    ],
  },
  getters: {
  },
  mutations: {
    GET_NEWS(state, data) {
      state.news = data
    },
    GET_NEWS_MORE_READ(state, data) {
      console.log(data);
      state.newsMoreRead = data
    },
    POST_FAVORITE(state, data) {
      state.favorite.push(data)
    }
  },
  actions: {
    // 9d4ed95f048e478390e1790821a58f80
    getNews() {
      const store = useStore()
      axios.get('https://newsapi.org/v2/everything?q=apple&from=2023-05-07&to=2023-05-07&sortBy=popularity&apiKey=9d4ed95f048e478390e1790821a58f80')
        .then(response => {
          const { data } = response
          const { articles } = data
          store.commit('GET_NEWS', articles.slice(0, 10))
          return articles
        })
        .catch((error) => console.log(error))
    },
    getNewsMoreReaded() {
      const store = useStore()
      axios.get('https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=91f3684377e7a5129f2879dae7b375d6')
        .then(response => {
          const { data } = response
          const { articles } = data
          console.log("response", articles);
          store.commit('GET_NEWS_MORE_READ', articles)
          return articles
        })
        .catch((error) => console.log(error))
    },
    postFavorite(item) {
      const store = useStore()
      console.log(store)
      store.commit('POST_FAVORITE', item)
    }
  },
  modules: {
  }
})
