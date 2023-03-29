<script setup>
import CommentItem from '../components/CommentItem.vue'
import CreateComment from '../components/CreateComment.vue'

// defineProps {
//     post:
// }
</script>

<template >
    <section class="comment_section">
        <CreateComment />

        <CommentItem /> <!-- :post="" -->
    </section>
</template>

<style scoped>
.comment_section {
    background-color: #f4f5f7;
    width: 600px;
    margin: auto;
    padding: 10px;
    border-radius: 10px;
}
</style>