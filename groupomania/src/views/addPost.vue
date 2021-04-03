<template>
  <div class="addPost">
    <div id="breadcrumb">
      <ul>
        <li>
          <a href="main">/..Acceuil</a>
        </li>
      </ul>
    </div>
    <form @submit.prevent="createPost">
      <label>TITRE (obligatoire)</label><br />
      <input type="text" v-model="title" /><br />
      <label>Text</label><br />
      <input type="text" v-model="content" /><br />
      <label>Image a uploader</label><br />
      <input type="text" v-model="imageUrl" /><br />
      <button>POSTER</button>
    </form>
  </div>
</template>

<style lang="scss"></style>

<script>
import axios from "axios";
export default {
  name: "assPost",
  data() {
    return {
      title: "",
      content: "",
      imageUrl: "",
    };
  },
  methods: {
    createPost() {
      let newPost = {
        title: this.title,
        content: this.content,
        imageUrl: this.imageUrl,
      };
      console.log(localStorage.getItem("userToken"));

      axios
        .post(
          "http://localhost:3000/api/posts",
          { post: JSON.stringify(newPost) },
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("userToken"),
            },
          }
        )
        .then(
          (res) => {
            console.log("truc");
            console.log(res.config.data);
            alert("post crée");
            this.$router.push("/main");
          },
          (err) => {
            console.log(err.response);
          }
        );
    },
  },
};
</script>
<style lang="scss">
.addPost {
  #breadcrumb {
    width: 10%;
    ul {
      list-style-type: none;
      li {
        a {
          text-decoration: none;
          color: black;
          font-size: 16px;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
  form {
    margin-top: 15%;
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
