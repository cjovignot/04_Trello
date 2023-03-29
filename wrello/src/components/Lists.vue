
<script setup> 
 import { ref, onMounted, nextTick } from 'vue';
 import WPAPI from 'wpapi';

 let categories = ref([])
 let showForm = ref(false)
 let categoryInput = ref(null);
 
 fetch('http://localhost/wordpress/index.php/wp-json/wp/v2/categories')
        .then(response => response.json())
        .then(data => categories.value = data);

  function toggleShowForm() {
    showForm.value = !showForm.value;
    if (showForm.value) {
        nextTick(() => {
          categoryInput.value.focus()
        })
    }

  }

  const wp = new WPAPI({
  endpoint: 'http://localhost/wordpress/index.php/wp-json/',
  username: 'wankeradmin',
  password: 'wankerAdmin',
  });

  // wp.posts().param("categories", 1).get().then((posts) => console.log("POST =>", posts))

  
    let categoryName = ref('');
    const createCategory = async () => {
      try {
        const category = await wp.categories().create({
          name: categoryName.value,
          // slug: categoryName.value.toLowerCase().replace(/ /g, '-'),
        });
        categories.value.push(category);
        console.log(categories);
        console.log(`Created category with ID ${category.id}`);
      } catch (err) {
        console.error(`Error creating category: ${err.message}`);
      }
      return { categoryName, createCategory };
    }

  const deleteCategory = async (id) => {
  try {
    const result = await wp.categories().id(id).delete({ force: true });
    categories.value = categories.value.filter((category) => category.id !== id);
    console.log(`Deleted category with ID ${id}`);
  } catch (err) {
    console.error(`Error deleting category: ${err.message}`);
  }
};

 </script>

<template>
    <div>
      <h1>Lists</h1>
        <div class="list">
         <div v-for="(category,index) in categories" :key="index" class="note" >
          <div>
            <h2>{{ category.name }} </h2>
            <!-- <CardList :catid="category.id" /> -->
            <button @click="deleteCategory(category.id)">Delete</button>
          </div>
        </div>
        <div class="ajout" @click="toggleShowForm">Ajouter une liste
          <div v-if="showForm" class="form">
            <div class="input-wrapper">
              <input type="text" placeholder="categorie name" ref="categoryInput" v-model="categoryName">
            </div>
            <button @click="createCategory" class="submitbutton">Ajouter une liste</button>
            <button class="cancelbutton">Cancel</button>
          </div>  
        </div>
      </div>
        </div>

  </template>
  

  
  <style>
  body {
    background-color: grey;
  }

  .list {
    justify-content: initial;
    gap: 20px;
    width: auto;
    height: 200px;
    display: flex;
  }
  .note {
    background-color: #ebecf0;
    padding: 10px;
    margin: 5px;
    margin: 0px;
    border-radius: 3px;
  }
  .ajout {
  border-radius: 3px;
  height: auto;
  min-height: 32px;
  padding: 4px;
  cursor: pointer;
  background-color: #ebecf05e;
  }
  .ajout:hover {
    background-color: #ebecf0cc;
  }
  .form {
    display: flex;
    flex-direction: column;
  }
  .input-wrapper {
    margin-bottom: 10px;
  }
  .submitbutton {
    background-color: #026aa7;
    color:#ffffff;
  }
  .cancelbutton {
    background-color: #cccccc;
    color: #ffffff;
  }
  

  /* .note{
    background: #F3B242;
    padding: 20px;
    border-radius: 20px;
    margin: 10px auto;
    width: 400px;
    height: 300px;
    cursor: pointer;
    color: #444;
    white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis
    
  }
  .note :hover {
  }
  .nomove :hover {
    display: block;
  }
  /* .allnotes {
    display: ;
  } */ 
  </style>