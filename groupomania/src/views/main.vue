<template>
  <div class="main">
    <header>
      <nav>
        <img
          src="../assets/icon-left-font-monochrome-white.png"
          id="logoGroupania"
          alt="logo groupania"
        />
        <button>Crée un post</button>
        <a href="profil.vue"
          ><img
            src="../assets/profile-2398782_960_720.webp"
            id="imgProfil"
            alt="logo groupania"
        /></a>
        <button>Déconnexion</button>
      </nav>
    </header>
    <div id="container">
      <section>
        <div class="postContainer">
          <a v-bind:href="'post?id='+item.id"
            v-for="item in posts"
            v-bind:key="item.id"
           
          >
            <div class="post">
              <h3>{{ item.title }}</h3>
              <img v-bind:src="item.imageUrl" alt="image du post" />
              <p>{{ item.content }}</p>
              <p>Mettre le nombre de commentaire ici</p>
            </div>
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss">
body {
  /*! minireset.css v0.0.6 | MIT License | github.com/jgthms/minireset.css */
  html,
  body,
  p,
  ol,
  ul,
  li,
  dl,
  dt,
  dd,
  blockquote,
  figure,
  fieldset,
  legend,
  textarea,
  pre,
  iframe,
  hr,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 100%;
    font-weight: normal;
  }
  ul {
    list-style: none;
  }
  button,
  input,
  select,
  textarea {
    margin: 0;
  }
  html {
    box-sizing: border-box;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  img,
  video {
    height: auto;
    max-width: 100%;
  }
  iframe {
    border: 0;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  td,
  th {
    padding: 0;
  }
  td:not([align]),
  th:not([align]) {
    text-align: left;
  }

  header {
    border: 2px solid red;
    background-color: rgb(0, 0, 0);
    nav {
      display: flex;
      justify-content: space-around;
      #logoGroupania {
        width: 75px;
      }
      #imgProfil {
        width: 75px;
      }
      button {
        background-color: rgb(0, 153, 255);
        color: white;
        border-radius: 10px;
        cursor: pointer;
      }
    }
  }
  #container {
    section {
      a {
        text-decoration: none;
        color: black;

        p {
          font-size: 16px;
        }

        .post {
          width: 50%;
          margin: auto;
          margin-top: 10px;
          border-bottom: 2px solid black;
          border-top: 2px solid black;
          h3 {
            font-size: 21px;
            font-weight: bold;
          }
          p {
            font-size: 16px;
          }

          img {
            width: 40%;
          }
        }
      }
    }
  }
}
</style>

<script>
import axios from "axios";
export default {
  name: "mainData",
  data() {
    return {
      posts: undefined,
    };
  },


  methods: {
      getPostData(){
          axios
      .get("http://localhost:3000/api/posts/", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        console.log(res.data);
        this.posts = res.data;
        console.log(this.posts);

        localStorage.getItem("userToken");
      })
      .catch((error) => {
        console.log(error.response);
      });
      }
  },

    mounted() {
    this.getPostData()
  },
};
</script>
