<script setup>
import { ref } from 'vue';
import CommentItem from '../components/CommentItem.vue'
import CreateComment from '../components/CreateComment.vue'

let propComment = ref([]);
function addpropComment(value) {
    propComment.value = value;
}

</script>

<template >
    <section class="comment_section">
        <CreateComment
        @comment="addpropComment"
        />
        <CommentItem
        :test="propComment"
        />
    </section>
</template>

<style scoped>
.comment_section {
    background-color: #f4f5f7;
    width: 600px;
    margin: auto;
    padding: 10px;
    border-radius: 0px 0px 10px 10px;
}
</style>