<script setup>
import WPAPI from 'wpapi'
defineProps(['title'])
defineEmits(['update:title'])


var data = new WPAPI({
    endpoint: 'http://localhost/wordpress/index.php/wp-json',
    // This assumes you are using basic auth, as described further below
    username: 'wankeradmin',
    password: 'wankerAdmin'
});

const editPost = async () => {
         
         console.log('title = ', title)
         console.log('content = ', content)
     }

</script>

<template>
    <div>form template</div>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
 
</template>