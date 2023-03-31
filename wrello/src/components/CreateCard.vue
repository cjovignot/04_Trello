<script setup>
import {ref} from 'vue';
import WPAPI from 'wpapi';

const emit = defineEmits('updatecardlist')

const toggle = ref(true);

const prop = defineProps({
  catid: {
    type: Number,
  }
})
     
    const wp = new WPAPI({
  endpoint: import.meta.env.VITE_API_ENDPOINT,
  username: import.meta.env.VITE_USERNAME,
  password: import.meta.env.VITE_PWD,
  });

  
    let articleName = ref('');
    const createArticle = async () => {
      try {
        const article = await wp.posts().create({
          title: articleName.value,
          content: '',
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
      <button style="border:none" class="Edit" @click="toggle = !toggle"><img style="width: 10px;height: 10px;" src="../../public/plus.png" alt=""> Ajouter une carte</button> 
  </div>


  <div class="insertcard"  v-show ='!toggle'>
    <input class="cardinp" type="text" name="title" v-model="articleName" v-on:keyup.enter="createArticle">
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
.valid:hover {
  cursor: pointer;
}
.Edit {
  background-color: unset;
}
.addcard {
  text-align: center;
  display: flex;
  margin: 10px 0px 0px 0px;
  opacity: 70%;
}
.addcard button:hover {
  cursor: pointer;
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
.return:hover {
  cursor: pointer;
}
</style>