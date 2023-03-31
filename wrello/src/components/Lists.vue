
<script setup> 
 import { ref, onMounted, nextTick } from 'vue';
 import CardList from '../components/CardsList.vue'
 import WPAPI from 'wpapi';
 import EditListName from '../components/EditListName.vue'

 let categories = ref([])
 let showForm = ref(false)
 let categoryInput = ref(null);
 let showInput = ref(false)
 let newCategoryName = ref('');

 let categoryNameToRename = ref("");
 
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

  function toggleShowInput(categoryName) {
    showInput.value = !showInput.value;
    categoryNameToRename = categoryName;
  };

  

  const wp = new WPAPI({
  endpoint: import.meta.env.VITE_API_ENDPOINT,
  username: import.meta.env.VITE_USERNAME,
  password: import.meta.env.VITE_PWD,
  });
  function updateCat(){
    wp.categories().get().then((data) => { categories.value = data; }); //fetch get all categories

  // wp.posts().param("categories", 1).get().then((posts) => console.log("POST =>", posts))
}
  
    let categoryName = ref('');       //fetch create category
    const createCategory = async () => {
      try {
        const category = await wp.categories().create({
          name: categoryName.value,
          // slug: categoryName.value.toLowerCase().replace(/ /g, '-'),
        });
        // categories.value.push(category);
        updateCat();
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




const editCategory = (id, newCategoryName) => {
  wp.categories().id(id).update({ name: newCategoryName })
   
   updateCat();
  } ;
updateCat()
</script>

<template>
<div>
  <h1>Wanker's Cards</h1>
    <div class="list">
      <div v-for="(category, index) in categories" :key="index" class="note" >
      <div>
        <div class="listheader">
          <h2 @click="toggleShowInput(category.name)">{{ category.name }} </h2>
            <div v-if="showInput !== false && categoryNameToRename == category.name">
              <input type="text" :placeholder= "category.name" v-model="newCategoryName">
              <button @click="editCategory(category.id, newCategoryName)" class="submitbutton">Changer nom de la liste</button>
            </div>
              <button @click="deleteCategory(category.id)" class="deletebutton">Supprimer</button>
            </div>
            <hr style="margin: 3px 0 6px 0;">
        <CardList :catid="category.id" />
      </div>
    </div>
    <div class="ajout" @click="toggleShowForm">Ajouter une liste
      <div v-if="showForm" class="form">
        <div class="input-wrapper">
          <input type="text" placeholder="categorie name" v-model="categoryName" ref="categoryInput" >
        </div>
        <div class="list_btn">
          <button id="cancel" class="cancelbutton">Annuler</button>
          <button id="addbtn" @click="createCategory" class="submitbutton">Ajouter une liste</button>
        </div>
      </div>  
    </div>
  </div>
</div>
</template>
  

  
<style>
.listheader {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
h2 {
  font-size: 100%;
  line-height: 24px;
  font-weight: 500;
  cursor: pointer;
}

body {
  background-color: grey;
}

.list {
  justify-content: initial;
  gap: 20px;
  width: auto;
  display: flex;
}
.list_btn {
  display: flex;
  justify-content: space-between;
  transition: 0.3s;
}
#cancel:hover {
  background-color: red;
  transition: 0.3s;
}
#addbtn:hover {
  background-color: green;
  transition: 0.3s;
}
.list_btn button {
  width: auto;
  border-radius: 4px;
  border: none;
  padding: 5px 10px;
  transition: 0.3s;
}
.list_btn button:hover {
  cursor: pointer;
  transition: 0.3s;
}
.note {
  background-color: #ebecf0;
  padding: 10px;
  margin: 0px;
  border-radius: 3px;
  display: inline-table;
  width: 215px;
  height: fit-content;
}
.ajout {
  border-radius: 3px;
  height: fit-content;
  min-height: 32px;
  padding: 4px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: #ebecf0b8;
}
.ajout:hover {
  background-color: #ebecf0cc;
}
.form {
  display: flex;
  flex-direction: column;
  margin: 10px 0;
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
  background-color: #0000002e;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  padding: 3px 8px;
  transition: 0.3s;
}
.deletebutton:hover {
  transition: 0.3s;
  background-color: rgb(222 60 75);
  color: white;
  font-weight: 500;
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