<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

// QuillEditor.activeEditor.setContent("<p>Hello world!</p>");
const prop = defineProps({
    text:{
        type: String
    }
}) 
let text ="";

function updatequill(event){

    console.log(QuillEditor)

    console.log("event", event);
    console.log('quill content =>',event.target.value)
    text += event.data
    console.log("text", text);
}
</script>

<template>
    <input type="text" v-model="text" placeholder="text" @input="updatequill">
 
<QuillEditor theme="snow" :content="prop.text" contentType="html" :readOnly=false v-model="text" @input="updatequill"
 ></QuillEditor>

</template>