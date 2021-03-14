<template>
  <div class="post">
    <div id="selectPost" v-if="this.postDatas">
      <h1>{{ this.postDatas.title }}</h1>
      <img v-bind:src="this.postDatas.imageUrl" alt="Image du post" />
      <p>{{ this.postDatas.content }}</p>
    </div>
    <div id="selectPostOption">
      <button>On verra</button> <button>Moddifer</button
      ><button v-on:click="deletePost()">Supprimez</button>
    </div>

    <div id="selectPostCommentaire">
      <div id="envoieCommentaire">
        <form>
          <input type="text" />
          <button>Envoyer Commentaire</button>
        </form>
      </div>
      <div id="lesCommentaires">
        <p>
          Afficher les commentaire ici avec les pseudo et photo de profil peut
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      postDatas: undefined,
    };
  },
  methods: {
     // // Recuperer LE POST // //
    getOnePost() {
      const params = new URL(document.location).searchParams;
      const id = params.get("id");
      console.log(id);
      console.log(params);
      axios
        .get("http://localhost:3000/api/posts/" + id, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        })

        .then((res) => {
          console.log(res.data);
          this.postDatas = res.data;
          
          console.log(this.postDatas.id);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
     // // Recuperer LE POST // //

     // // SUPRIMER LE POST // //
  deletePost(){
    const params = new URL(document.location).searchParams;
      const id = params.get("id");
    axios
    
    .delete("http://localhost:3000/api/posts/" + id, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("userToken"),
            
          },
          
       
        })
     .then(response =>{
      
    
     delete this.postDatas.id
    console.log(response)
     })
        .catch((error) =>{
          console.log(error.response)
        })
    
  }
  // // SUPRIMER LE POST // //

  },

  mounted() {
    this.getOnePost();
  },
};
</script>
