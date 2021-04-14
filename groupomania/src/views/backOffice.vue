<template>
  <div class="backOffice">
    <h1>PAGE Back-Office</h1>
  

    <div class="allUser">
<h2>Tous Nos utilissateur</h2>
<div v-for="allUserData in allUserDatas" :key="allUserData.id" class="allUserData">
<div class="user">
  <p>Email de l'user:{{allUserData.email}}</p>
    pseudo de l'utilisateur : {{allUserData.username}}<br>
    <a v-bind:href="'profil?id=' + allUserData.id">Accedez a ces données profil</a>
</div>
</div>
    </div>

    <h2>Nos Administrateur</h2>
    <div
      class="userAdmin"
      v-for="userData in userDatas"
      v-bind:key="userData.id"
    >

      <div class="userAdminInfo">
        <p>Email de l'utilisatteur administrateur: {{ userData.email }}</p>
        <p>Pseudo de l'utilisatteur administrateur: {{ userData.username }}</p>
        <a v-bind:href="'profil?id=' + userData.id">Aller a la page</a>
      </div>
    </div>

    <h2>Les Post sigbnaler</h2>
    <div
      class="signaledPosts"
      v-for="signaledPost in signaledPosts"
      :key="signaledPost.id"
    >
      <div>
        <h3>{{ signaledPost.title }}</h3>
        <a v-bind:href="'post?id=' + signaledPost.id">Aller au post</a>
      </div>
    </div>
    <h2>les commentaire signalée</h2>
    <div
      class="signaledComment"
      v-for="signaledComment in signaledComments"
      :key="signaledComment.id"
    >
      <div>
        <h3>{{ signaledComment.content }}</h3>
        <a v-bind:href="'post?id=' + signaledComment.postId">Aller au post</a>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "truc",
  data() {
    return {
      signaledPosts: [],
      item: "",
      userDatas: "",
      signaledComments: "",
      allUserDatas:"",
    
    };
  },
  methods: {
    getAllReportedPost() {
      axios
        .get("http://localhost:3000/api/posts/signaled/" + true, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        })
        .then((res) => {
          this.signaledPosts = res.data;
          console.log(res);
          console.log(this.signaledPosts);
        })
        .catch((err) => {
          console.log(err.reponse);
        });
    },
    getAdminUser() {
      axios
        .get("http://localhost:3000/api/auth/isAdmin/" + true, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.userDatas = response.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    getAllReportedComment() {
      axios
        .get("http://localhost:3000/api/comments/signaled/" + true, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        })
        .then((res) => {
          this.signaledComments = res.data;
          console.log(res);
          console.log(this.signaledComments);
        })
        .catch((err) => {
          console.log(err.reponse);
        });
    },

    getAllUser(){
      axios
      .get("http://localhost:3000/api/auth/",{
         headers: {
            authorization: "Bearer " + localStorage.getItem("userToken"),
          },
      })
        .then((response) => {
          console.log(response.data);
          this.allUserDatas = response.data;
          console.log(this.allUserDatas);
        })
         .catch((error) => {
          console.log(error.response);
        });
    }
  },

  mounted() {
       this.getAllUser()
    this.getAllReportedPost();
    this.getAdminUser();
    this.getAllReportedComment();
 
  },
};
</script>

<style lang="scss">
body {
  .backOffice {

    .allUser{
      .user{
          border: 2px solid black;
      width: 65%;
      margin: auto;
      background-color: rgb(247, 247, 247);
      box-shadow: 5px 5px 5px 5px;
      margin-bottom: 2%;
      margin-top: 2%;
      a{
         text-decoration: none;
        color: black;
        cursor: pointer;

        &:hover {
          color: red;
          text-decoration: underline;
        }
      }
      }
    }
    .userAdmin {
      border: 2px solid black;
      width: 65%;
      margin: auto;
      background-color: rgb(247, 247, 247);
      box-shadow: 5px 5px 5px 5px;
      margin-bottom: 2%;
      margin-top: 2%;

      a {
        text-decoration: none;
        color: black;
        cursor: pointer;

        &:hover {
          color: red;
          text-decoration: underline;
        }
      }
    }
    .signaledPosts {
      border: 2px solid black;
      width: 30%;
      margin: auto;
      background-color: rgb(247, 247, 247);
      box-shadow: 5px 5px 5px 5px;
      margin-bottom: 2%;
      margin-top: 2%;
      a {
        text-decoration: none;
        color: black;
        cursor: pointer;
        &:hover {
          color: red;
          text-decoration: underline;
        }
      }
    }

    .signaledComment {
      border: 2px solid black;
      width: 30%;
      margin: auto;
      background-color: rgb(247, 247, 247);
      box-shadow: 5px 5px 5px 5px;
      margin-bottom: 2%;
      margin-top: 2%;
      a {
        text-decoration: none;
        color: black;
        cursor: pointer;
        &:hover {
          color: red;
          text-decoration: underline;
        }
      }
    }
  }
}

@media screen and (min-width: 320px) and (max-width: 425px) {
  .backOffice {
    .userAdmin {
      width: 100%;
      border: 2px solid green;
      .userAdminInfo {
        width: 100%;
  
      }
    }
  }
}

@media screen and (min-width: 568px) and (max-width: 1024px)  {
    .backOffice {
    .userAdmin {
      width: 100%;
      border: 2px solid green;
      .userAdminInfo {
        width: 100%;
        color: red;
        border: 2px solid red;
      }
    }
  }
}
</style>
