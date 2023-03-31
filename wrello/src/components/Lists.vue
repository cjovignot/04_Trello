
<script setup> 
 import { ref, onMounted, nextTick } from 'vue';
 import CardList from '../components/CardsList.vue'
 import WPAPI from 'wpapi';

 let categories = ref([])
 let showForm = ref(false)
 let categoryInput = ref(null);
 let showInput = ref(false)
 let newCategoryName = ref('');
 
//  fetch('http://localhost/wordpress/index.php/wp-json/wp/v2/categories')
//         .then(response => response.json())
//         .then(data => categories.value = data);



  function toggleShowForm() {
    showForm.value = !showForm.value;
    if (showForm.value) {
        nextTick(() => {
          categoryInput.value.focus()
        })
    }
  
  };

  function toggleShowInput() {
    showInput.value = !showInput.value;
    console.log('toto');
  };

  

  const wp = new WPAPI({
  endpoint: 'http://localhost/wordpress/index.php/wp-json/',
  username: 'wankeradmin',
  password: 'wankerAdmin',
  });

  wp.categories().get().then((data) => { categories.value = data; }); //fetch get all categories
  // wp.posts().param("categories", 1).get().then((posts) => console.log("POST =>", posts))

  
    let categoryName = ref('');       //fetch create category
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

  const deleteCategory = async (id) => {       //fetch delete category
  try {
    const result = await wp.categories().id(id).delete({ force: true });
    categories.value = categories.value.filter((category) => category.id !== id);
    console.log(`Deleted category with ID ${id}`);
  } catch (err) {
    console.error(`Error deleting category: ${err.message}`);
  }
};




// const editCategory = (id, newName) => {
//   wp.categories().id(id).update({ name: newName })
//     .then(response => {
//      // console.log(`Category ${category.id} name updated to ${newName}`);
//     })
//     .catch(error => {
//      // console.error(`Error updating category ${category.id} name:`, error);
//     });
// };




 </script>

<template>
    <div>
      <h1>Lists</h1>
        <div class="list">
         <div v-for="(category,index) in categories" :key="index" class="note" >
          <div>
            <div class="listheader">
              <h2 @click="toggleShowInput">{{ category.name }} </h2>
                <!-- <div v-if="showInput">tata -->
                  <!-- <input type="text" placeholder="categorie name" ref="categoryInput" v-model="categoryName"> -->
                  <!-- <button @click="editCategory(category.id, newName)" class="submitbutton">Changer nom de la liste</button> -->
                <!-- </div> -->
                  <button @click="deleteCategory(category.id)" class="deletebutton">Delete</button>
                </div>
            <CardList :catid="category.id" />
          </div>
        </div>
        <div class="ajout" @click="toggleShowForm">Ajouter une liste
          <div v-if="showForm" class="form">
            <div class="input-wrapper">
              <input type="text" placeholder="categorie name" v-model="categoryName" ref="categoryInput" >
            </div>
            <button @click="createCategory" class="submitbutton">Ajouter une liste</button>
            <button class="cancelbutton">Cancel</button>
          </div>  
        </div>
      </div>
        </div>


  </template>
  

  
  <style>
  .listheader {
    display: flex;
    justify-content: space-between;
  }
  h2 {
    font-size: 20px;
    line-height: 24px;
    cursor: pointer;
  }

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
    margin: 0px;
    border-radius: 3px;
    display: inline-table;
    width: 215px;
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
  .deletebutton {
  
  border: none;
  color: #172b4d;
  padding: 1px 0px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
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