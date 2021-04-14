<template>
  <div v-if="this.userData" class="profil">
    <h1>
      Bonjour:<br />
      <div>
        {{ userData.username }}
        <p v-if="userData.isAdmin == true">[ADMIN]</p>
      </div>
    </h1>
    <img v-bind:src="userData.profilImg" /><br />
    <form @submit.prevent>
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
      <button
        v-if="
          this.sessionData.id == userData.id || this.sessionData.isAdmin == true
        "
        @click="modifyUser()"
      >
        Modifier
      </button>
      <button
        v-if="
          this.sessionData.id == userData.id || this.sessionData.isAdmin == true
        "
        @click="deleteUser()"
      >
        Supprimer
      </button>
    </form>
    <button
      v-if="this.sessionData.isAdmin == true && userData.isAdmin == false"
      @click="defineAsAdmin()"
    >
      Devenir admin
    </button>
    <button
      v-if="this.sessionData.isAdmin == true && userData.isAdmin == true"
      @click="banAsAdmin()"
    >
      Enlever des admin
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "User",
  data() {
    return {
      userData: null,
    };
  },

  methods: {
    getData() {
      const params = new URL(document.location).searchParams;
      const id = params.get("id");
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
        .catch((error) => {
          console.log(error.response);
        });
    },
    deleteUser() {
      axios
        .delete("http://localhost:3000/api/auth/" + this.userData.id, {
          headers: {
            "Content-type": "application/json",
            authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        })
        .then((res) => {


          console.log(res);

          if(this.sessionData.id == this.userData.id){
             sessionStorage.removeItem("userInfo");
          localStorage.removeItem("userToken");
          sessionStorage.removeItem("userSession");
          alert("Compte supprimer");
          this.$router.push("/login");
          }else{
  
          alert("Compte supprimer");
          this.$router.push("/main");
          }

      
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    modifyUser() {
      console.log(this.userData);
      axios
        .patch(
          "http://localhost:3000/api/auth/" + this.userData.id,
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
          document.location.reload();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    sessionData() {
      this.sessionData = JSON.parse(sessionStorage.getItem("userSession")).user;
      console.warn(this.sessionData.id);
    },
    defineAsAdmin() {
      this.userData.isAdmin = true;
      axios
        .patch(
          "http://localhost:3000/api/auth/" + this.userData.id,
          { user: this.userData },
          {
            headers: {
              "Content-type": "application/json",
              authorization: "Bearer " + localStorage.getItem("userToken"),
            },
          }
        )
        .then((res) => {
          console.log(res);
          alert("profil passer administrateur");
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    banAsAdmin() {
      this.userData.isAdmin = false;
      axios
        .patch(
          "http://localhost:3000/api/auth/" + this.userData.id,
          { user: this.userData },
          {
            headers: {
              "Content-type": "application/json",
              authorization: "Bearer " + localStorage.getItem("userToken"),
            },
          }
        )
        .then((res) => {
          console.log(res);
          alert("profil passer administrateur");
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },

  mounted() {
    this.getData();
    this.sessionData();
  },
};
</script>

<style lang="scss">
.profil {
  img {
    width: 20%;
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
  button {
    background-color: rgb(34, 53, 83);
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

@media screen and (min-width: 320px) and (max-width: 425px) {
  .profil {
    form {
      button {
        transition: transform none;
        &:hover {
          transform: none;
          box-shadow: none;
        }
      }
    }
    button{
      transition: transform none;
       &:hover {
          transform: none;
          box-shadow: none;
        }
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 1024px){
  .profil {
    form {
      button {
        transition: transform none;
        &:hover {
          transform: none;
          box-shadow: none;
        }
      }
    }
    button{
      transition: transform none;
       &:hover {
          transform: none;
          box-shadow: none;
        }
    }
  }
}
</style>
