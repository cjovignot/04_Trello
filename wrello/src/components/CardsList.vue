<script setup>
import { ref } from 'vue';
import CreateCard from './CreateCard.vue'
import WPAPI from 'wpapi'

let prop = defineProps({
    catid: {
        type: String,
    }
})

let cards = ref([])
var data = new WPAPI({
    endpoint: 'http://localhost/wordpress/index.php/wp-json/',
    // This assumes you are using basic auth, as described further below
    username: 'wankeradmin',
    password: 'wankerAdmin'
});
data.posts().get().then( posts => { cards.value = posts  } );
</script>

<template>
  <CreateCard />
  <div class="post" v-for="(card, index) in cards" :key="index" >
    <a :href="'/card/'+card.id"> 
      <div>{{ card.title.rendered }}</div>
    </a>
  </div>
</template>

<style scoped>
</style>

