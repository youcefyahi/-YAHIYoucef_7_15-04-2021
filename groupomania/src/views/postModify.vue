<template>
  <div class="postModify">
    <p>testt modificateur d un post unique</p>
    <form v-if="this.post" @submit.prevent="modifyPost()">
      <label>TITRE (obligatoire)</label><br />
      <input type="text" v-model="post.title" /><br />
      <label>Text</label><br />
      <input type="text" v-model="post.content" /><br />
      <label>Image a uploader</label><br />
      <input type="text" v-model="post.imageUrl" /><br />
      <button>MODIFIER</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "modifyPost",
  data() {
    return {
      post:this.post,
    
      
    };
  },
  methods: {
    getOldPostData() {
      const params = new URL(document.location).searchParams;
      const id = params.get("id");
      let token = localStorage.getItem("userToken");
      console.log(id);
      console.log(params);
      axios
        .get("http://localhost:3000/api/posts/" + id, {
          headers: {
            "Content.type": "Bearer " + token,
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.post = res.data;
          console.log(this.post);
        })
        .catch((error) => {
          console.log(error.respose);
        });
    },

    modifyPost() {
      const params = new URL(document.location).searchParams;
      const id = params.get("id");
      axios.patch(
        "http://localhost:3000/api/posts/" + id,
        { post: this.post },
        {
          headers: {
            "Content-type": "application/json",
            authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        }
      )
      .then((res) =>{
       console.log(res.data);
        alert('Votre article a bien etait mise a jour')
        alert(this.post.id)
     
      })
      .catch((err) =>{
        console.log(err.response)
      })
    
    },
  },

  mounted() {
    this.getOldPostData();
  },
};
</script>
