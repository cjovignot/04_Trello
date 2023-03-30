<script setup>
import { ref } from 'vue'
import WPAPI from 'wpapi'
import { createToaster } from "@meforma/vue-toaster";
const prop = defineProps({
        postid: {
            type: String,
            default: "pr"
        },
        titlep: {
            type: String,
            default: "pr"
        }

})
const emit = defineEmits('titleupdate','delete')
const toggle = ref(true)
const toaster = createToaster({ /* options */ });

let cards = ref([])
var data = new WPAPI({
    endpoint: 'http://localhost/wordpress/index.php/wp-json/',
    // This assumes you are using basic auth, as described further below
    username: 'wankeradmin',
    password: 'wankerAdmin'
});
data.posts().id(prop.postid).get().then( posts => { cards.value = posts  })

const editCardTitle = async (title) => {
     
     console.log('title = ', title)
    console.log("title => ", title);
     try {
         const post = await data.posts().id(prop.postid).update({
             title: title,
         });
         emit('titleupdate')
         toaster.success('updated posttitle with id: ' + prop.postid);
     } catch (err) {
         toaster.error(err.message);
     }
   
 }

 const deleteCard = async () => {
     

     try {
         const post = await data.posts().id(prop.postid).delete({force: true});
         emit('delete')
         toaster.success('deleted post with id: ' + prop.postid);

     } catch (err) {
         toaster.error(err.message);
     }
   
 }




</script>


<template>
    <div v-if="cards.title != undefined"> 
<div class="conttog" v-show ='!toggle'>
    <input class="stack" type="text" name="title" v-model="cards.title.rendered" @keyup.enter="toggle = !toggle" v-on:keyup.enter="editCardTitle(cards.title.rendered)">
    <button class="stackok" type="text"   @click="toggle = !toggle" v-on:click="editCardTitle(cards.title.rendered)"> ok </button>
    <button class="stackback" type="text" @click="toggle = !toggle"><img style="width: 10px;height: 10px;border:none;" src="../../public/return.png" alt=""></button>
</div>


<div class="cardedit" >

   <button class="buted" @click="toggle = !toggle"><img style="width: 10px;height: 10px;" src="../../public/edit.png" alt=""></button>
    <button class= "deled"  v-on:click="deleteCard">X</button>
</div>
</div>
</template>

<style>
.buted{
 background-color: white;
 border-radius: 3px;
 border: none
    
}

.deled{
 background-color: #DE3C4B;
 color:white;
 border-radius: 3px;
 border: none
    
}
/* 
.conttog{

    background-color: black;
    position: absolute;
    left: 145px;
    top: 3px;
  z-index: 9;
} */

.stack{
    
    position: absolute;
    left: -149px;
    top: 0;
  z-index: 9;
  width: 153px;
  border: none;
  height: 22px;
    
}
.stackok{
    
    position: absolute;
    left: 3px;
    top: 1px;
  z-index: 9;
    border: none;
    border-radius:  3px 0 0 3px ;
    height: 22px;
    background-color: aquamarine;
    
    

}

.stackback{
    
    position: absolute;
    left: 29px;
    top: 0;
  z-index: 9;
  border: none;
  border-left: 1px solid black;
    border-radius:  0 3px 3px 0;
    height: 22px;
    
}
</style>