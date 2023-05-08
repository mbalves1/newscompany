import { createStore, useStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    news: []
  },
  getters: {
  },
  mutations: {
    GET_NEWS(state, data) {
      console.log(data)
      state.news = data
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
          store.commit('GET_NEWS', articles)
          return articles
        })
        .catch((error) => console.log(error))
    }
  },
  modules: {
  }
})
