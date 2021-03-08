<template>
    <div class="addPost">
      <form @submit.prevent="createPost">
          <label>TITRE (obligatoire)</label><br>
          <input type="text"><br>
          <label>Text</label><br>
          <input type="text"><br>
          <label>Image a uploader</label><br>
          <input type="text"><br>
            <button>POSTER</button>
      </form>
    </div>
</template>

<style lang="scss"></style>

<script>
import axios from 'axios'
export default {
    name:"assPost",
    data(){
        return{
            title:'',
            content:'',
            imageUrl:''
        }
    },
    methods:{
        createPost(){
            let newPost ={
                title:this.title,
                content:this.content,
                imageUrl:this.imageUrl
            }
           console.log(newPost)
           axios.post('http://localhost:3000/api/posts',newPost)
            .then(res =>{
                console.log(res.config.data)
                alert('post crée')
                this.$router.push('/main')
            }, err =>{
                console.log(err.response)
            }) 
        },
    }
}
</script>