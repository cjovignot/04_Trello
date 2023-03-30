<script setup>
import {ref} from 'vue';
import WPAPI from 'wpapi';

const url = "http://localhost/wordpress/index.php/wp-json/wp/v2/    ";


const emit = defineEmits('updatecardlist')

let title=ref("");
 const toggle = ref(true);
let a = 1;
let i = ref()
const prop = defineProps({
  catid: {
    type: Number,
  }
})
     
    const wp = new WPAPI({
  endpoint: 'http://localhost/wordpress/index.php/wp-json/',
  username: 'wankeradmin',
  password: 'wankerAdmin',
  });

  
    let articleName = ref('');
    const createArticle = async () => {
      try {
        const article = await wp.posts().create({
          title: articleName.value,
          content: 'prout',
          status: 'publish',
          categories: [prop.catid]


        
       
        //   slug: articleName.value.toLowerCase().replace(/ /g, '-'),
        });
     

        emit('updatecardlist');
        console.log(articleName.value)
        console.log(`Created article with ID `);
      } catch (err) {
        console.error(`Error creating article: ${err.message}`);
      }
      return { articleName, createArticle };
    }



</script>
<template>


<div class="addcard"  v-show ='toggle'>
      <button style="border:none" class="Edit" @click="toggle = !toggle"><img style="width: 10px;height: 10px;" src="../../public/plus.png" alt=""></button> 
  </div>


  <div class="insertcard"  v-show ='!toggle'>
    <input class="cardinp" type="text" name="title" v-model="articleName">
    <button class="valid" v-on:click="createArticle">+</button>
    <button  class="return" @click="toggle = !toggle"><img style="width: 10px;height: 10px;border:none;" src="../../public/return.png" alt=""></button> 
  </div>

  

  
</template>
<style>
.valid{
  background-color: #28965A;
  color: white;
  font-weight: bolder;
  border-radius: 2px;
  border: none;

  
}
.addcard{

  text-align: center;


}

.cardinp{
border:none;
width: 153px;


}

.return{
  background-color: white;
 border-radius: 3px;
 border: none
}
</style>