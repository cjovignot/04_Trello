
<script setup>
import { ref } from 'vue';
import WPAPI from 'wpapi'

let prop = defineProps({
    catid: {
        type: Number,

    }
})

const wp = new WPAPI({
  endpoint: 'http://localhost/wordpress/index.php/wp-json/',
  username: 'wankeradmin',
  password: 'wankerAdmin',
  });

  const editCategory = (id, newCategoryName) => {
  wp.categories().id(id).update({ name: newCategoryName })
  }
</script>
