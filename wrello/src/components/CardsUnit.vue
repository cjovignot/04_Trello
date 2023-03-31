<script setup>
import { ref } from 'vue';
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
    endpoint: import.meta.env.VITE_API_ENDPOINT,
    // This assumes you are using basic auth, as described further below
    username: import.meta.env.VITE_USERNAME,
    password: import.meta.env.VITE_PWD
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
    <div class="display" v-if="card.title != undefined"> 
        <a id="menu" href="/"><img src="../../public/home.png" alt=""></a>
        <div class="readonly"  v-show ='toggle'>
            <div style="display: flex; align-items: center;">
                <img style="height: 20px; width: 18px;" src="../../public/text.png" alt="">
                <h4 id="title" v-html=card.title.rendered></h4>
                <button id="edit_card_title" @click="toggle = !toggle"><img src="../../public/edit2.png" alt=""></button>
            </div>
            <div id="content" v-html=card.content.rendered></div>
        </div>

        <div class="readonly" v-show = '!toggle'>
            <textarea type="text" name="title"   
            v-model="card.title.rendered"></textarea>
            <textarea id="editor" class="contentpost" type="text" name="content"   
            v-model="card.content.rendered"></textarea>
            <div style="display: flex; justify-content: space-between;">
                <button id="cancel" @click='toggle = !toggle'>Annuler</button>
                <button id="save" v-on:click="editPost(card.title.rendered,card.content.rendered)" action="submit">Enregistrer</button>
            </div>
        </div>
    </div>
    <hr style="margin: 10px 60px;">
</div>
</template>

<style scoped>
.display {
    display: flex;
    flex-direction: column;
}
#cancel {
    transition: 0.3s;
}
#cancel:hover {
    background-color: rgba(106, 106, 106, 0.43);
    transition: 0.3s;
}
#save {
    transition: 0.3s;
}
#save:hover {
    background-color: rgba(59, 129, 67, 0.566);
    color: white;
    transition: 0.3s;
}
#menu img {
    height: 13px;
    width: 13px;
    vertical-align: middle;
    margin-left: -7px;
}
#editor {
    font-family: 'Roboto';
    padding: 10px;
    color: var(--ds-text,#172b4d);
    outline: none;
    margin: 7px 0;
    height: 43px;
    font-size: 14px;
    text-align: justify;
    width: 100%;
    resize: none;
    border: none;
    border-radius: 3px;
}
#menu:hover {
    background-color: rgba(106, 106, 106, 0.43);
    transition: 0.3s;
}
textarea {
    font-family: 'Roboto';
    padding: 10px;
    color: var(--ds-text,#172b4d);
    outline: none;
    margin: 7px 0;
    height: 43px;
    font-size: 19px;
    text-align: justify;
    font-weight: bold;
    width: 100%;
    resize: none;
    border: none;
    border-radius: 3px;
}
a {
    text-align: end;
    background-color: #d5d5d5;
    border-radius: 5px;
    border: none;
    font-family: Roboto;
    font-weight: bold;
    font-size: 14px;
    text-decoration: none;
    cursor: pointer;
    color: black;
    width: 33px;
    padding: 5px 11px;
    height: 32px;
    transition: 0.3s;
}
button {
    margin: 5px;
    width: 100px;
    background-color: none;
    border-radius: 5px;
    border: none;
    font-family: Roboto;
    font-weight: bold;
    cursor: pointer;
    height: 32px;
    transition: 0.3s;
}
.readonly{
    width: 100%;
    resize: none;
    border: none;
    margin: 10px 0;
    border-radius: 3px;
}
#edit_card_title {
    background-color: rgb(213 213 213 / 43%);
    width: 36px;
    transition: 0.3s;
}
#edit_card_title img {
    height: 14px;
}
#edit_card_title:hover {
    background-color: rgba(160, 160, 160, 0.48);
    transition: 0.3s;
}
h4 {
    padding: 0 10px;
    color: var(--ds-text,#172b4d);
    margin: 7px 0;
    font-size: 19px;
    text-align: justify;
    font-weight: bold;
}
#content {
    font-size: 15px;
    text-align: justify;
    padding: 0 10px 0 30px;
}

.edit {
    background-color: rgb(213 213 213 / 43%);
    width: 36px;
}
.container{
    font-family: 'Roboto';
    background-color: #f4f5f7;
    width: 600px;
    margin: auto;
    padding: 10px;
    border-radius: 10px 10px 0 0;
    text-align: center;
}
.contentpost{
    min-height: 140px;
}
</style>

