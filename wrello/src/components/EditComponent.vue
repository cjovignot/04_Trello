<script setup>
import { ref } from 'vue';
import WPAPI from 'wpapi';
import { useRoute } from 'vue-router';
// Plugin for toaster
import { createToaster } from "@meforma/vue-toaster";
// Plugin to display comment relative time
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import * as calendar from 'dayjs/plugin/calendar';

dayjs.extend(relativeTime);
dayjs.extend(calendar)

// CONST for plugins
const toaster = createToaster({ /* options */ });
const toggle = ref(true);
const route = useRoute();

// Fetch API
let comments = ref([]);
function fetchComment() {
    const wp = new WPAPI({
       endpoint: import.meta.env.VITE_API_ENDPOINT,
       username: import.meta.env.VITE_USERNAME,
       password: import.meta.env.VITE_PWD,
    });
    wp.comments().param("post", route.params.id).get().then((all_comments) => { comments.value = all_comments })
}
fetchComment();
</script>

<template>
    <div class="div_comment2" v-show='!toggle'>
            <h4 name="author_name">{{ comment.author_name }}</h4>
        <div class="comment_head">
            <div class="comment_content">
                <textarea class="content" type="text" v-model="comment.content.rendered"></textarea>
            </div>
        </div>
        <div class="button_div2">
            <div style="display: flex; align-items: center">
                <button v-on:click="editComment(comment.content.rendered, comment.id)" action="submit">Enregistrer</button>
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
</template>