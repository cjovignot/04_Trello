<script setup>
import { ref,onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();  
console.log(route.params.id)
let card = ref([])
const url = "http://localhost/wordpress/index.php/wp-json/wp/v2/posts/" + route.params.id;

onMounted(async() =>  {


await fetch(url,
{ header: {
    "Access-Control-Allow-Origin": "*",

}})
.then((response) => response.json()) 
.then((data) => { card.value = data

console.log(card)})

})

</script>

<template>
 

<div>prouta</div>

<div>{{ $route.params.id }} {{ card.value }}</div>
<div v-if="card.title != undefined"> 
 
    <div >{{ card.title.rendered }} </div>
    <div>{{ card.content.rendered}} </div>

</div>

</template>
<style>




</style>

