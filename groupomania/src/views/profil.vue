<template>
  <div class="profil">
    <header>
      <nav>
        <img
          src="../assets/icon-left-font-monochrome-white.png"
          id="logoGroupania"
          alt="logo groupania"
        />
        <button>Crée un post</button>
        <a href="#"
          ><img
            src="../assets/profile-2398782_960_720.webp"
            id="imgProfil"
            alt="logo groupania"
        /></a>
        <button>Déconnexion</button>
      </nav>
    </header>
    <div class="container">
      <form>
        <input
          type="text"
          id="username"
          name="username"
          v-bind:value="user.data.username"
        /><br />
        <input
          type="text"
          id="lastName"
          name="lastName"
          v-bind:value="user.data.lastName"
        />
        <input
          type="text"
          id="lastName"
          name="lastName"
          v-bind:value="user.data.fisrtname"
        /><br />
        <input
          type="email"
          id="email"
          name="email"
          v-bind:value="user.data.email"
        />
      </form>
    </div>
  </div>
</template>

<style lang="scss">
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
      &:hover {
        box-shadow: 10px 10px 10px 10px red;
      }
    }
    button {
      background-color: rgb(0, 153, 255);
      color: white;
      border-radius: 10px;
      cursor: pointer;
      &:hover {
        box-shadow: 10px 10px 10px 10px red;
      }
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
      user: null,
    };
  },

  methods: {
    getData() {
      axios
        .get("http://localhost:3000/api/auth/users/", {
          headers: {
            authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        })
        .then((res) => {
          console.log(res.data);
          this.user = res;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },

  mounted() {
    this.getData();
  },
};
</script>
