<template>
  <v-app class="banner">
    <v-card max-height="300px" height="300" class="roundel">oal</v-card>
    <div class="cards">
      <v-card v-for="card in 3" :key="card" min-width="100" height="102" style="background: #8FBF9F" class="card">
        Aqui
      </v-card>
    </div>
    <v-col>
      <div v-for="card in 3" :key="card" class="d-flex">
        <v-card min-width="100" height="102">
          Qui
        </v-card>
      </div>
    </v-col>
  </v-app>
</template>

<script>
import { defineComponent } from 'vue';

// Components
import HelloWorld from '../components/HelloWorld.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    HelloWorld,
  },
});
</script>
<style>
.roundel {
  border-bottom-left-radius: 115px !important;
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
</style>
