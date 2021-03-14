<template>
    <div class="addPost">
      <form @submit.prevent="createPost">
          <label>TITRE (obligatoire)</label><br>
          <input type="text" v-model="title"><br>
          <label>Text</label><br>
          <input type="text" v-model="content"><br>
          <label>Image a uploader</label><br>
          <input type="text" v-model="imageUrl"><br>
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
           console.log(localStorage.getItem("userToken"))
           
           
           axios.post('http://localhost:3000/api/posts', {post:JSON.stringify(newPost)},{
               headers:{
                   authorization:'Bearer ' + localStorage.getItem('userToken')
               }
           })
            .then(res =>{
                console.log("truc")
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