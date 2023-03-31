<script setup>
import { ref } from 'vue';
import CreateCard from './CreateCard.vue'
import WPAPI from 'wpapi'
import cardedit from './CardlistEdit.vue'

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
function updatelist(){
  console.log('prout,prout')
  data.posts().param("categories", prop.catid).get().then( posts => { cards.value = posts  })

}

// data.posts().get().then( posts => { cards.value = posts  } );

console.log(cards)
// const url = "http://localhost/wordpress/index.php/wp-json/wp/v2/";


//  fetch(url)
// .then((response) => response.json()) 
// .then((data) => { console.log(data)
//     // cards.value = data
// })

updatelist();

</script>

<template>
     <!-- <div>prop {{ prop.catid }} </div> -->
    <div class="postlist" v-for="(card, index) in cards.slice().reverse()" :key="index" >
  <a :href="'/card/'+card.id"> 
  
    <div class="cardtitle">{{ card.title.rendered }} </div>
</a>
  <cardedit :postid="card.id" :titlep="card.title.rendered" @titleupdate="updatelist"  @delete="updatelist"/>
  </div>
  <CreateCard :catid="prop.catid" @updatecardlist="updatelist"/>
</template>
<style>
.cardtitle{
  height: 20px;
  background: rgb(0,29,37);
background: linear-gradient(90deg, rgba(0,29,37,1) 0%, rgba(255,255,255,1) 4%, rgba(0,212,255,0) 100%);
  overflow: hidden;
  color: black;
  width: 142px;
  border-radius: 3px;
  padding: 0 0 2px 10px;
  line-height: 20px;
 
  
 
}

.postlist{
  display: flex;
  justify-content: space-between
}
a{
  text-decoration: none;
  color: #172b4d;
}
</style>