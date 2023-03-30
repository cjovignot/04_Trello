
<script setup>
import { ref,onMounted } from 'vue';
import { RouterLink } from 'vue-router'
import CreateCard from './CreateCard.vue'
import WPAPI from 'wpapi'

let prop = defineProps({
    catid: {
        type: Number,

    }
})

let cards = ref([])
var data = new WPAPI({
    endpoint: 'http://localhost/wordpress/index.php/wp-json/',
    // This assumes you are using basic auth, as described further below
    username: 'wankeradmin',
    password: 'wankerAdmin'
});
   data.posts().param("categories", prop.catid).get().then( posts => { cards.value = posts  })

// data.posts().get().then( posts => { cards.value = posts  } );

console.log(cards)
// const url = "http://localhost/wordpress/index.php/wp-json/wp/v2/";


//  fetch(url)
// .then((response) => response.json()) 
// .then((data) => { console.log(data)
//     // cards.value = data
// })



</script>

<template>
     <!-- <div>prop {{ prop.catid }} </div> -->
    <div class="post" v-for="(card, index) in cards" :key="index" >
  <a :href="'/card/'+card.id"> 
  
    <div class="card">{{ card.title.rendered }} </div>
</a>

  </div>
  <CreateCard :catid="prop.catid"/>
</template>
<style>
.card{
  height: 20px;
  background-color: white;
  margin-top:5px;
  overflow: hidden;
 
}
a{
  text-decoration: none;
  color: #172b4d;
}
/* .post:nth-child(2) {
  background: red;
} */
/* 
h2{font-weight: bold;}

.limittitle{
  overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;


}
.limit{
  overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;

}
.postit{

  width:250px;
  height:140px;
  position:relative;
  background:#FA9F42;
  overflow:hidden;
  margin:10px 5px;
  padding:20px;
  border-radius:0 0 0 10px/25px;
  box-shadow:
  inset 0 -40px 40px rgba(0,0,0,0.2),
    inset 0 25px 10px rgba(0,0,0,0.2),
    0 5px 6px 5px rgba(0,0,0,0.2);
  font-family: 'Permanent Marker', cursive;
  line-height:1.7em;
  font-size:19px;

  color:black;
}

.divcont{
  
  max-height: 70px;
    overflow: hidden;

}
 */





</style>

