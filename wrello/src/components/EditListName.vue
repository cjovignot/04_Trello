
<script setup>
import { ref } from 'vue';
import WPAPI from 'wpapi'

let prop = defineProps({
    catid: {
        type: Number,

    }
})

const wp = new WPAPI({
  endpoint: import.meta.env.VITE_API_ENDPOINT,
  username: import.meta.env.VITE_USERNAME,
  password: import.meta.env.VITE_PWD,
  });

  const editCategory = (id, newCategoryName) => {
  wp.categories().id(id).update({ name: newCategoryName })
  }
</script>
