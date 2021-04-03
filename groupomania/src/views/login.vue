<template>
  <div class="login">
    <img src="../assets/icon-above-font.png" alt="Logo groupomania" />
    <form @submit.prevent="login">
      <label>Votre email</label><br />
      <input type="email" v-model="user.email" /><br />
      <label>Votre mot de passe</label><br />
      <input type="password" v-model="user.password" /><br />
      <button>Connexion</button>
    </form>
  </div>
</template>

<script>
//import { required,email } from 'vuelidate/lib/validators'
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      user: { email: "", password: "" },
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:3000/api/auth/login", this.user, {})
        .then((response) => {
          alert("ca marche");
          let userInfo = JSON.stringify(response.data);
          let userToken = JSON.stringify(response.data.token);
          let userSession=  JSON.stringify(this.user)
          sessionStorage.setItem("userInfo", userInfo);
           sessionStorage.setItem("userSession", userSession);
          localStorage.setItem("userToken", response.data.token);
          console.log(userToken);
          alert(userSession);
          this.$router.push("/main");
        })
        .catch((error) => {
          alert(error);
        });
    },

    truc() {
      console.log("truc");
    },
  },
};
</script>

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
  .login {
    img {
      width: 25%;
    }
    form {
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

        &:not(:focus):invalid {
          background-color: red;
        }
      }
      button {
        width: 10%;
        cursor: pointer;
        &:hover {
          transition: transform 400ms;
          transform: scale(1.25);
        }
      }
    }
  }
}
</style>
