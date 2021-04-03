<template>
  <div class="profil">
    <form v-if="this.userData">
      <label>Votre nom d'utilisateur</label><br />
      <input
        v-model="userData.username"
        v-bind:placeholder="userData.username"
        type="text"
      /><br />
      <label>image de profil</label><br />
    <input
        v-model="userData.profilImg"
        v-bind:placeholder="userData.profilImg"
        type="text"
      /><br />

      <label>Nom</label><br />
      <input
        v-model="userData.lastname"
        v-bind:placeholder="userData.lastname"
        type="text"
      /><br />
      <label>Prenom</label><br />
      <input
        v-model="userData.firstname"
        v-bind:placeholder="userData.firstname"
        type="text"
      /><br />
      <label>Votre description</label><br />
      <input
        v-model="userData.biographie"
        v-bind:placeholder="userData.biographie"
        type="text"
      /><br />
      <button @click="modifyUser()">Modifier</button>
      <button @click="deleteUser()">Supprimer</button>
    </form>
    <button @click="defineAsAdmin()">Devenir admin</button>
  </div>
</template>

<style lang="scss">
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
</style>

<script>
import axios from "axios";
export default {
  name: "User",
  data() {
    return {

      userData:null
     
    };
  },

  methods: {
    getData() {
    const params = new URL(document.location).searchParams;
      const id = params.get("id");
      axios
        .get("http://localhost:3000/api/auth/"+id, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        })
        .then((response) => {
          console.log(response.data.user);
          this.userData = response.data.user;
          console.log(this.userData.id);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    deleteUser() {
   
      axios
        .delete("http://localhost:3000/api/auth/"+this.userData.id, {
          headers: {
            "Content-type": "application/json",
            authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        })
        .then((res) => {
          alert("compte suprimer avec succees");

          console.log(res);

          sessionStorage.removeItem("userInfo");
          localStorage.removeItem("userToken");
          sessionStorage.removeItem("userSession");
          alert("Compte supprimer");
          this.$router.push("/login");
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    modifyUser() {
      console.log(this.userData);
      axios
        .patch(
          "http://localhost:3000/api/auth/"+this.userData.id,
          { user: this.userData },
          {
            headers: {
              "Content-type": "application/json",
              authorization: "Bearer " + localStorage.getItem("userToken"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);

          alert("votre compte a été modifié avec succès");
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    defineAsAdmin(){
      this.userData.isAdmin = true
      axios
      .patch(
         "http://localhost:3000/api/auth/"+this.userData.id,{user:this.userData},
           {
            headers: {
              "Content-type": "application/json",
              authorization: "Bearer " + localStorage.getItem("userToken"),
            },
          }
      )
      .then((res)=>{
        console.log(res)
        alert("profil passer administrateur")
      })
      .catch((err)=>{
        console.log(err.response)
      })
    }
  },

  mounted() {
    this.getData();
  },
};
</script>
