<script setup>
import {ref} from 'vue';
import { useRoute } from 'vue-router';
import WPAPI from 'wpapi';
import { createToaster } from "@meforma/vue-toaster";


// Plugin to display comment relative time
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import * as calendar from 'dayjs/plugin/calendar';
dayjs.extend(relativeTime);
dayjs.extend(calendar)

const toaster = createToaster({ /* options */ });
const toggle = ref(true);
const route = useRoute();

// Fetch API
let comments = ref([]);
fetch('http://localhost/wordpress/wp-json/wp/v2/comments')
.then((resp) => resp.json())
.then(function(data) {
    comments.value = data;
    // console.log(data)
})


const wp = new WPAPI({
   endpoint: 'http://localhost/wordpress/wp-json/',
   username: 'wankeradmin',
   password: 'wankerAdmin',
});
let deletecom = ref('');
const deleteComment = async (id) => {
    try {
        await wp.comments().id(id).delete({force: true});
        comments.value = comments.value.filter((comment) => comment.id !== id);
        toaster.success('Comment deleted from id: ' + id);
    } catch (err) {
        toaster.error('Comment deleting aborted !');
    }
    return { deletecom, deleteComment }
};
</script>


<template>
    <div style="margin-bottom: 20px;" v-for="(comment, index) in comments" :key="index">
        <div class="div_comment" v-show="comment.post == route.params.post">
            <div style="display: flex;">
                <img src="../../src/assets/logo.svg" alt="logo">
                <div class="comment_content" v-show='toggle'>
                    <div style="padding: 4px 7px; display: flex; align-items: baseline; justify-content: space-between;">
                        <h4 name="author_name">{{ comment.author_name }}</h4><span>{{ dayjs(comment.date).calendar() }}</span>
                    </div>
                    <div class="content" name="content" v-html=comment.content.rendered></div>
                    <div class="button_div">
                        <button id="emoji"></button>
                        <li></li>
                        <button class="edit_btns" @click='toggle = !toggle' :value="comment.id">Modifier</button>
                        <li></li>
                        <button class="edit_btns" @click='deleteComment(comment.id)' :value="comment.id">Supprimer</button>
                    </div>
                </div>
                
                <div class="div_comment2" v-show='!toggle'>
                        <h4 name="author_name">{{ comment.author_name }}</h4>
                    <div class="comment_head">
                        <div class="comment_content">
                            <input name="content" v-model="comment.content.rendered" type="text" >
                        </div>
                    </div>
                    <div class="button_div2">
                        <div style="display: flex; align-items: center">
                            <button v-on:click="createComment" action="submit">Enregistrer</button>
                            <button @click='toggle = !toggle' id="cancel"></button>
                        </div>
                        <div>
                            <button id="clip"></button>
                            <button id="mention"></button>
                            <button id="emoji"></button>
                            <button id="add_card"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.div_comment {
    display: flex;
    flex-direction: column;
    min-height: 50px;
    height: auto;
    border-radius: 4px;
    margin: 5px 0;
    margin-bottom: 20px;
}
h4 {
    color: var(--ds-text,#172b4d);
    margin: 7px 0;
    font-size: 15px;
    font-weight: bold;
}
span {
    font-size: 13px;
}
img {
    height: 30px;
    width: 30px;
    margin: 5px;
}
.comment_content {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: flex-start;
}
.button_div {
    align-items: center;
    display: flex;
}
button {
    width: 60px;
    background-color: unset;
    text-decoration: underline;
    border-radius: 5px;
    border: none;
    font-family: Roboto;
    font-weight: bold;
    cursor: pointer;
    font-size: 12px;
    height: 32px;
    color: var(--ds-text-subtle,#5e6c84);
    transition: 0.3s;
}
.edit_btns {
    width: 60px;
}
.edit_btns:hover {
    background-color: unset;
    color: #172b4d;
}
button:hover {
    color: var(--ds-text-subtle,#172b4d);
}
#clip, #emoji, #add_card, #mention {
    background-color: unset;
    background-size: 50%;
    background-repeat: no-repeat;
    width: 30px;
    background-position: center;
    height: 30px;
}
li {
    width: 5px;
}
#emoji {
    background-image: url(../public/emoticon.png);
    opacity: 60%;
    transition: 0.3s;
}
#clip:hover, #emoji:hover, #add_card:hover, #mention:hover {
    transition: 0.3s;
    opacity: 100%;
}
.content {
    padding: 4px 7px 6px 7px;
    background-color: white;
    border-radius: 4px;
    display: flex;
    min-height: 25px;
}
input {
    padding: 4px 7px 6px 7px;
    background-color: white;
    border-radius: 4px;
    border: none;
    outline: none;
    display: flex;
    min-height: 25px;
}
.content p {
    margin: 0;
}




.div_comment2 {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 4px 7px;
    background-color: white;
    border-radius: 4px;
    min-height: 25px;
    box-shadow: none;
    transition: 0.3s;
}
.comment_head {
    display: flex;
    width: 100%;
}
h4 {
    color: var(--ds-text,#172b4d);
    margin: 7px 0;
    font-size: 15px;
    font-weight: bold;
}
img {
    height: 30px;
    width: 30px;
    margin: 0 10px 0px 0px;
}
.comment_content {
    /* display: flex; */
    /* flex-direction: column; */
    /* width: 100%; */
    /* justify-content: flex-start; */
    /* padding: 5px; */
}
input {
    cursor: pointer;
    border: none;
    outline: none;
    height: auto;
    background-color: unset;
    font-family: 'Roboto';
    min-height: 24px;
    font-weight: 600;
}

/* IMPORT FROM CREATECOMMENT */
.button_div2 {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.button_div2 button {
    text-decoration: none;
    background-color: #0000001a;
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
button:hover {
    background-color: #2b732b8f;
    color: white;
    transition: 0.3s;
}
#clip, #emoji, #add_card, #mention, #cancel {
    background-color: unset;
    background-size: 40%;
    background-repeat: no-repeat;
    width: 35px;
    background-position: center;
    height: 35px;
}
#cancel {
    background-image: url(../public/close.png);
}
#clip {
    background-image: url(../public/paper-clip.png);
}
#emoji {
    background-image: url(../public/emoticon.png);
}
#add_card {
    background-image: url(../public/tab.png);
}
#mention {
    background-image: url(../public/arobase.png);
    background-size: 70%;
}
#clip:hover, #emoji:hover, #add_card:hover, #mention:hover, #cancel:hover {
    background-color: #0000001a;
    transition: 0.3s;
}
/* END CREATECOMMENT */
</style>