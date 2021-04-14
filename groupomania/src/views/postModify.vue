<template>
  <div class="postModify">
    <h1>Modification de votre Post</h1>
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
//import { required, minLength, alphaNum } from "vuelidate/lib/validators";
export default {
  name: "modifyPost",
  data() {
    return {
      post: this.post,
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
      axios
        .patch(
          "http://localhost:3000/api/posts/" + id,
          { post: this.post },
          {
            headers: {
              "Content-type": "application/json",
              authorization: "Bearer " + localStorage.getItem("userToken"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          alert("Votre article a bien etait mise a jour");
          this.$router.push("post?id=" + id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mounted() {
    this.getOldPostData();
  },
};
</script>

<style lang="scss" scoped>
.postModify {
  form {
    margin-top: 4%;
    label {
      font-size: 20px;
      font-weight: bold;
    }
    input {
      width: 60%;
      margin-bottom: 10px;
      margin-top: 10px;
      border-radius: 10px;
      height: 20px;
      transition: transform 400ms;
      &:focus {
        transform: scale(1.2);
        box-shadow: 5px 15px 5px rgb(34, 53, 83);
      }

      &:not(:focus):invalid {
        background-color: red;
      }
    }
    button {
      background-color: #c3575e;
      color: white;
      font-weight: bold;
      font-size: 20px;
      border-radius: 5px;
      transition: transform 400ms;
      &:hover {
        transform: scale(1.2);
        box-shadow: 5px 15px 5px rgb(34, 53, 83);
      }
    }
  }
}
</style>
