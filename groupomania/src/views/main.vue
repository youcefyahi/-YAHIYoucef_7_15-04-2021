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
          </p>
        </a>
        <a href="backOffice" v-if="this.userData.isAdmin == true"
          >Back-Office</a
        >
        <a href="#" v-on:click="deconnexion()">Déconnexion</a>

        <a href="#" class="icon" @click="myFunction()">
          <i class="fa fa-bars"></i>
        </a>
      </div>
    </header>
    <div id="container">
      <div id="goTop"></div>
      <section>
        <div class="postContainer">
          <a
            class="postBox"
            v-bind:href="'post?id=' + post.id"
            v-for="post in posts"
            v-bind:key="post.id"
          >
            <div class="post">
              <div class="postedBy">
                <h3>Poster par</h3>
                <a v-bind:href="'mur?id=' + post.userId"
                  ><img  v-bind:src="post.profilImg"
                /></a>
                <a v-bind:href="'mur?id=' + post.userId">{{ post.username }}</a>
              </div>

              <div class="postView">
                <h2>{{ post.title }}</h2>
                <img
                  class="machin"
                  v-if="post.imageUrl"
                  v-bind:src="post.imageUrl"
                  alt="image du post"
                />
                <p>{{ post.content }}</p>

                <p>
                  Créé le :<span>{{
                    moment(post.createdAt).format("YYYY-MM-DD")
                  }}</span>
                </p>
                <p>
                  Modifier le :<span>
                    {{ moment(post.updatedAt).format("YYYY-MM-DD") }}</span
                  >
                </p>
              </div>
            </div>
          </a>
        </div>
      </section>
    </div>
    <a id="fleche" href="#goTop"><i class="fas fa-arrow-up"></i></a>
  </div>
</template>

<script>
//let moment = require('moment')

import axios from "axios";
export default {
  name: "mainData",
  data() {
    return {
      //  moment:moment,
      posts: undefined,
      userData: "",
    };
  },

  methods: {
    // // RECUPERER TOUS LES POSTS // //

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

    // // LA DECONNEXION// //
    deconnexion() {
      sessionStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      sessionStorage.removeItem("userSession");

      this.$router.push("/login");
    },
    // // RECUPERER DONNEE DE L UTILISATEUR // //

    getUserData() {
      let id = JSON.parse(sessionStorage.getItem("userInfo")).userId;
      console.log(this.sessionData);

      axios
        .get("http://localhost:3000/api/auth/" + id, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        })
        .then((response) => {
          console.log(response.data.user);
          this.userData = response.data.user;
          console.log(this.userData.id);
        })
       
    },
    // // MENU RESPONSIVE // //
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
    this.getUserData();
  },
};
</script>

<style lang="scss">
body {
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

    .topnav a {
      float: left;
      display: block;
      color: #f2f2f2;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
      font-size: 17px;
      transition: transform 400ms;
      #imgProfil {
        width: 75px;
      }
      &:hover{
       color:rgb(195, 87, 94);
       transform:scale(1.2);
       
      }
    }

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

        .postBox {
          text-decoration: none;
          font-family: "Kanit", sans-serif;
          margin-bottom: 5%;
          border-top: 2px solid black;
          border-bottom: 2px solid black;
          padding-bottom: 75px;

          p {
            font-size: 16px;
          }

          .post {
            width: 100%;
            margin: auto;
            margin-top: 10px;

            transition: transform 400ms;
            width: 700px;
            height: 500px;
            max-width: 700px;
            max-height: 500px;
            &:hover {
              transform: scale(1.1);
              border-top: 3px solid black;
              background-color: rgb(250, 250, 250);
            }
            .postedBy {
              text-align: left;
              a {
                cursor: pointer;
                text-decoration: none;
                &:hover {
                  color: red;
                  cursor: pointer;
                }
                img {
                  width: 50px;
                  border-radius: 40%;
                }
              }
            }

            .postView {
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
  }
  #fleche {
    top: 95%;
    left: 90%;
    visibility: hidden;
    position: fixed;
    .fa-arrow-up {
      color: red;
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

      .topnav {
        display: initial;
      }
      .topnav a:not(:first-child) {
        display: none;
      }
      .topnav a{
        transition: transform none;
        &:hover{
          transform: none;
          color: white;
        }
      }
      .topnav a.icon {
          position: relative;
          top:40px;
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
          .postBox {
            .post {
              width: 100%;
              transition: transform none;
              &:hover {
                transform: none;
                border-top: none;
                background-color: none;
              }
              .postView {
                width: 100%;
                margin: auto;
                img {
                  width: auto;
                  width: 100%;
                  object-fit: contain;
                }
              }
            }
          }
        }
      }
     
    }
     #fleche{
        visibility: visible;
      }
  }
}

@media screen and (min-width: 568px) and (max-width: 1024px)  {
   body {
    min-width: 100%;
    margin: auto;
    header {
      width: 100%;
      display: flex;

      .topnav {
        display: initial;
      }
           .topnav a{
        transition: transform none;
        &:hover{
          transform: none;
          color: white;
        }
      }
      .topnav a:not(:first-child) {
        display: none;
      }
      .topnav a.icon {
          position: relative;
          top:40px;
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
          .postBox {
            .post {
              width: 100%;
              transition: transform none;
              &:hover {
                transform: none;
                border-top: none;
                background-color: none;
              }
              .postView {
                width: 100%;
                margin: auto;
                img {
                  width: auto;
                  width: 100%;
                  object-fit: contain;
                }
              }
            }
          }
        }
      }
     
    }
     #fleche{
        visibility: visible;
      }
  }
}
</style>
