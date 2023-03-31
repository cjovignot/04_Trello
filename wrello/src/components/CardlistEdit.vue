<script setup>
import { ref,nextTick } from 'vue'
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
let titleinput = ref(null);
let showForm = ref(false)

let cards = ref([])
var data = new WPAPI({
    endpoint: import.meta.env.VITE_API_ENDPOINT,
    // This assumes you are using basic auth, as described further below
    username: import.meta.env.VITE_USERNAME,
    password: import.meta.env.VITE_PWD
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

 function toggleShowForm() {
    showForm.value = !showForm.value;
    if (showForm.value) {
        nextTick(() => {
     titleinput.value.focus()
        })
    }
  
  };

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
<!-- <div class="overlay" v-show ='!toggle' @click="toggle = !toggle"> -->
<div v-if="showForm">
    <!-- <div class="conttog"  v-show ='!toggle'   > -->
    <input ref="titleinput" class="stack" type="text" name="title" v-model="cards.title.rendered" @keyup.enter="toggleShowForm" v-on:keyup.enter="editCardTitle(cards.title.rendered)">
    <button class="stackok" type="text"   @click="toggleShowForm" v-on:click="editCardTitle(cards.title.rendered)"> ok </button>
    <button class="stackback" type="text" @click="toggleShowForm"><img style="width: 10px;height: 10px;border:none;" src="../../public/return.png" alt=""></button>
</div>
<!-- </div> -->


<div class="cardedit" >

   <button class="buted" @click="toggleShowForm"><img style="width: 10px;height: 10px;" src="../../public/edit.png" alt=""></button>
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
.buted:hover, .deled:hover {
    cursor: pointer;
}
.deled{
    background-color: #DE3C4B;
    color:white;
    border-radius: 3px;
    border: none
}

/* .conttog{

    background-color: black;
    position: absolute;
    left: 145px;
    top: 3px;
  z-index: 9;
} */

.stack{
    position: absolute;
    left: -149px;
    top: 3.1px;
    z-index: 9;
    width: 153px;
    border: none;
    height: 22px;
    
}
.stackok{
    position: absolute;
    left: 3px;
    top: 3px;
    z-index: 9;
    border: none;
    border-radius: 3px 0 0 3px;
    height: 22px;
    background-color: aquamarine;
}

.stackback{
    position: absolute;
    left: 28.9px;
    top: 2.8px;
    z-index: 9;
    border: none;
    border-left: 1px solid black;
    border-radius: 0 3px 3px 0;
    height: 22px;
}
.stack:hover, .stackok:hover, .stackback:hover {
    cursor: pointer;
}

input:focus{
    outline: none;
}

/* .overlay{
    width: 3000px;
    height: 600px;
    background-color: none;
    border: 1px solid white;
    position: absolute;
    left: -500px;
    top: 0px;
  z-index: 5;
} */
</style>