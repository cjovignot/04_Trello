<script setup>
import { ref,onMounted } from 'vue';
import { useRoute } from 'vue-router';
import WPAPI from 'wpapi'
import { createToaster } from "@meforma/vue-toaster";

// import Tiptap from './Tiptap.vue'

// // import test from './EditCard.vue'

// Vue.use(VueEditor)
const route = useRoute();  
const toaster = createToaster({ /* options */ });
const toggle = ref(true);


let card = ref([])
var data = new WPAPI({
    endpoint: 'http://localhost/wordpress/index.php/wp-json',
    // This assumes you are using basic auth, as described further below
    username: 'wankeradmin',
    password: 'wankerAdmin'
});
data.posts().id(route.params.id).get().then( posts => { card.value = posts 
console.log(route.params.id)

} );

 const editPost = async (title,content) => {
     
    console.log('title = ', title)
    console.log('content = ', content)
    try {
        const post = await data.posts().id(route.params.id).update({
            title: title,
            content: content,
         
        });
        toaster.success('updated post with id: ' + route.params.id);
    } catch (err) {
        toaster.error(err.message);
    }
  
}

   </script>

<template>
 

<div class="container">

<div v-if="card.title != undefined"> 
    
 <div class="readonly"  v-show ='toggle'>
    <div id="title" v-html=card.title.rendered></div>   
    <div id="content" v-html=card.content.rendered></div>  
    <button class="Edit" @click="toggle = !toggle">Edit</button> 
    <a class="back" href="/">Back</a>  
</div>

<div class="inputable" v-show = '!toggle'>
    <textarea style="font-size: 50px;" type="text" name="title"   
    v-model="card.title.rendered"></textarea>
    <textarea id="editor" class="contentpost" style="font-size: 20px;" type="text" name="content"   
    v-model="card.content.rendered"></textarea>
    <button class="Edit" v-on:click="editPost(card.title.rendered,card.content.rendered)">Save</button> 
    <button class="Edit"  @click="toggle = !toggle" >Back</button> 
</div>
    
</div>
</div>
</template>
<style>
.back{
    text-decoration: none ;
 width: 60px;
 height: 30px;
 border: solid black 1px;
 border-radius: 2px;
 font-size: 16px;
 color: black;
 background-color:#A3D9FF ;
 margin: 5px;
 padding: 2px;
}

.readonly{
    width: 100%;
    resize: none;
    border: none;
    border-radius: 3px;
    background-color: white;
}

#title{
    font-size: 50px;
}
#content{
    font-size: 20px;
}

.edit {
    
    width: 60px;
 height: 24px;
 border: solid black 1px;
 border-radius: 2px;
 font-size: 16px;
 background-color: #9AE19D;

}
.container{
    font-family: Arial, Helvetica, sans-serif;
    background-color: #f4f5f7;
    width: 600px;
    margin: auto;
    padding: 10px;
    border-radius: 10px 10px 0 0;
    text-align: center;
}

textarea{
    width: 100%;
    resize: none;
    border: none;
    border-radius: 3px;
  
}

.contentpost{
    height:300px
}


</style>