<script setup>
import {ref} from 'vue';
import WPAPI from 'wpapi'
const url = "http://localhost/wordpress/index.php/wp-json/wp/v2/    ";

let title=ref("");
 

     
    const wp = new WPAPI({
  endpoint: 'http://localhost/wordpress/index.php/wp-json/',
  username: 'wankeradmin',
  password: 'wankerAdmin',
  });

  
    let articleName = ref('');
    const createArticle = async () => {
      try {
        const article = await wp.posts().create({
          title: articleName.value,
          content: 'prout',
          status: 'publish'


        
       
        //   slug: articleName.value.toLowerCase().replace(/ /g, '-'),
        });
        console.log(articleName.value)
        console.log(`Created article with ID `);
      } catch (err) {
        console.error(`Error creating article: ${err.message}`);
      }
      return { articleName, createArticle };
    }

//   const deleteCategory = async (id) => {
//   try {
//     const result = await wp.categories().id(id).delete({ force: true });
//     categories.value = categories.value.filter((category) => category.id !== id);
//     console.log(`Deleted category with ID ${id}`);
//   } catch (err) {
//     console.error(`Error deleting category: ${err.message}`);
//   }
// };


</script>
<template>
    <input type="text" name="title" v-model="articleName">
    <button v-on:click="createArticle">Add</button>
</template>