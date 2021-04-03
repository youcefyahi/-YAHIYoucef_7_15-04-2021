<template>
  <div class="backOffice">
    <h1>PAGE ADMINISTATEUR</h1>
    <h2>Nos administrateur</h2>
    <div v-for="userData in userDatas" v-bind:key="userData.id">
      <div v-if="userData.isAdmin == true">
        <p>{{ userData.email }}</p>
        <p>{{ userData.username }}</p>
        <a v-bind:href="'profil?id=' + userData.id">Aller a la page</a>
      </div>
    </div>
    <div v-for="item in signaledPosts" v-bind:key="item.id"></div>
    
<h2>Les Post sigbnaler</h2>
    <div v-for="signaledPost in signaledPosts" v-bind:key="signaledPost.id">
      <div v-if="signaledPost.signaled">
        <p>{{ signaledPost.title }}</p>
        <a v-bind:href="'post?id=' + signaledPost.id">Aller au post</a>
      </div>
    </div>
    <h2>les commentaire signalée</h2>
    <div>
      
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
    };
  },
  methods: {
    getAllReportedPost() {
      axios
        .get("http://localhost:3000/api/posts/", {
          headers: {
            authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        })
        .then((res) => {
          console.log(res.data.posts);
          this.signaledPosts = res.data;
          console.log(this.signaledPosts);
        })
        .catch((err) => {
          console.log(err.reponse);
        });
    },
    getAdminUser() {
      axios
        .get("http://localhost:3000/api/auth/", {
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
  },

  mounted() {
    this.getAllReportedPost();
    this.getAdminUser();
  },
};
</script>

<style></style>
