<script setup>
import Card from '../components/CardsUnit.vue'
import comments from '../components/CommentList.vue'
</script>


<template>
  <div id="overlay">
    <div class="card">

      <Card />
      <comments />
    </div>
</div>
</template>


<style>
.card {
  display: flex;
  flex-direction: column;
  margin: 70px auto;
  z-index: 999;
}
#overlay {
  width: 100%;
  min-height: 94vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.57);
  z-index: 900;
}
</style>
