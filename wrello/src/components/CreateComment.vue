<script setup>
import {ref} from 'vue';
import WPAPI from 'wpapi';
import { useRoute } from 'vue-router';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ /* options */ });

let comments = ref([])
const route = useRoute();

let content = "";

const wp = new WPAPI({
       endpoint: import.meta.env.VITE_API_ENDPOINT,
       username: import.meta.env.VITE_USERNAME,
       password: import.meta.env.VITE_PWD,
});

const emit = defineEmits([
    'comment'
])
let a = 1;
let i = ref()
let new_com = ref('');
const createComment = async () => {
    try {
        const comment = await wp.comments().create({
            post: route.params.id,
            author: "1",
            author_name: comments.value.author_name,
            content: content,
            email: import.meta.env.VITE_MAIL,
        });
        await comments.value.push(comment);
        i.value = a++;
        emit('comment', i.value );
        toaster.success('Created comment with id: ' + comment.author_name);
    } catch (err) {
        toaster.error(err.message);
    }
    return { new_com, createComment }
};
</script>

<template>
    <div style="display: flex; margin: 5px 0; margin-bottom: 20px;">
        <img src="../../src/assets/logo.svg" alt="logo">
        <div class="div_comment">
            <div class="comment_head">
                <div class="comment_content">
                    <input name="content" v-model="content" type="text" placeholder="Ecrivez un commentaire...">
                </div>
            </div>
            <div class="button_div">
                <button v-on:click="createComment" action="submit">Enregistrer</button>
                <div>
                    <button id="clip"></button>
                    <button id="mention"></button>
                    <button id="emoji"></button>
                    <button id="add_card"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.div_comment {
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
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: flex-start;
    padding: 5px;
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


.button_div {
    display: flex;
    justify-content: space-between;
    width: 100%;
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
#clip, #emoji, #add_card, #mention {
    background-color: unset;
    background-size: 40%;
    background-repeat: no-repeat;
    width: 35px;
    background-position: center;
    height: 35px;
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
#clip:hover, #emoji:hover, #add_card:hover, #mention:hover {
    background-color: #0000001a;
    transition: 0.3s;
}
</style>