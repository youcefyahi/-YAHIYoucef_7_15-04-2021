<template>
  <div class="main">
    <header>
      <div class="topnav" id="myTopnav">
        <a href="main"
          ><img
            src="../assets/icon-left-font-monochrome-white.png"
            id="logoGroupania"
            alt="logo groupania"
        /></a>
        <a href="addPost">Crée un post</a>
        <a v-bind:href="'profil?id=' + this.userData.id"
          ><img
            v-bind:src="this.userData.profilImg"
            id="imgProfil"
            alt="logo groupania"
          />
          <p id="username" v-if="this.userData">
            {{ this.userData.username }}
          </p>
          <p id="admin" v-if="this.userData.isAdmin == true">
            [ADMIN]
          </p></a
        >
        <a href="#" v-on:click="deconnexion()">Déconnexion</a>

        <a href="#" class="icon" @click="myFunction()">
          <i class="fa fa-bars"></i>
        </a>
      </div>
    </header>
    <div id="container">
      <section>
        <div class="postContainer">
          <a
            v-bind:href="'post?id=' + post.id"
            v-for="post in posts"
            v-bind:key="post.id"
          >
            <div class="post">
              <h2>{{ post.title }}</h2>
              <img
                v-if="post.imageUrl"
                v-bind:src="post.imageUrl"
                alt="image du post"
              />
              <p>{{ post.content }}</p>
            </div>
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "mainData",
  data() {
    return {
      posts: undefined,
      userData: "",
    };
  },

  methods: {
    getPostData() {
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
    },
    deconnexion() {
      sessionStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      sessionStorage.removeItem("userSession");

      this.$router.push("/login");
    },
    getData() {
      let id = JSON.parse(sessionStorage.getItem("userInfo")).userId;
      this.userConnected = JSON.parse(sessionStorage.getItem("userInfo"));
      axios
        .get("http://localhost:3000/api/auth/" + id, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        })
        .then((response) => {
          console.log(response.data.user);
          this.userData = response.data.user;
          console.log(this.userData.username);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    getPostUser() {
     
      axios
        .get("http://localhost:3000/api/auth/" + this.item.userId, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        })
        .then((response) => {
          console.log(response.data.user);
          this.postUser = response.data;
          console.log(this.postUser);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    myFunction() {
      var x = document.getElementById("myTopnav");
      if (x.className === "topnav") {
        x.className += " responsive";
      } else {
        x.className = "topnav";
      }
    },
  },

  mounted() {
    this.getPostData();
    this.getData();
    this.getPostUser();
  },
};
</script>

<style lang="scss">
body {
  /*! minireset.css v0.0.6 | MIT License | github.com/jgthms/minireset.css */

  header {
    border-radius: 5px;
    background-color: rgb(34, 53, 83);
    position: fixed;
    z-index: 1;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;

    #logoGroupania {
      width: 110px;
    }
    .topnav {
      overflow: hidden;
      width: 100%;
      justify-content: space-between;
      display: flex;
    }

    /* Style the links inside the navigation bar */
    .topnav a {
      float: left;
      display: block;
      color: #f2f2f2;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
      font-size: 17px;
      #imgProfil {
        width: 75px;
      }
    }

    /* Add an active class to highlight the current page */

    /* Hide the link that should open and close the topnav on small screens */
    .topnav .icon {
      display: none;
    }
  }
  #container {
    display: flex;
    section {
      width: 700px;
      height: 450px;
      max-width: 700px;
      max-height: 450px;
      margin: auto;
      padding-top: 160px;
      .postContainer {
        display: flex;
        flex-direction: column-reverse;
      }

      a {
        text-decoration: none;
        font-family: "Kanit", sans-serif;
        margin-bottom: 5%;

        p {
          font-size: 16px;
        }

        .post {
          width: 100%;
          margin: auto;
          margin-top: 10px;
          border-bottom: 2px solid black;
          border-top: 2px solid black;
          transition: transform 400ms;
          width: 700px;
          height: 450px;
          max-width: 700px;
          max-height: 450px;
          &:hover {
            transform: scale(1.1);
            border-top: 3px solid black;
            background-color: rgb(250, 250, 250);
          }

          h2 {
            font-size: 21px;
            font-weight: bold;
            color: black;
          }
          p {
            font-size: 16px;
            color: black;
            font-family: "Kanit", sans-serif;
          }

          img {
            width: 500px;
            height: 350px;
            max-width: 500px;
            max-height: 350px;
          }
        }
      }
    }
  }
}

@media screen and (min-width: 320px) and (max-width: 425px) {
  body {
    min-width: 100%;
    margin: auto;
    header {
      width: 100%;
      display: flex;
      transition: transform 400ms;
      .topnav {
        display: initial;
      }
      .topnav a:not(:first-child) {
        display: none;
      }
      .topnav a.icon {
        float: right;
        display: block;
      }
      .topnav.responsive {
        position: relative;
      }
      .topnav.responsive a.icon {
        position: absolute;
        right: 0;
        top: 0;
      }
      .topnav.responsive a {
        float: none;
        display: block;
        text-align: left;
      }
    }

    #container {
      section {
        .postContainer {
        }
        a {
          margin-bottom: 80px;
          .post {
            width: 80%;
            margin: auto;
            img {
              max-width: 100%;
              object-fit: cover;
            }
          }
        }
      }
    }
  }
}
</style>
