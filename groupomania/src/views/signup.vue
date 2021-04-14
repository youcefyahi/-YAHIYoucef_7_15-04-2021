<template>
  <div class="testvuelidate">
    <img src="../assets/icon-above-font.png" alt="Logo groupomania" />
    <form @submit.prevent="submitForm">
      <label>Votre Pseudo</label><br />
      <span v-if="!$v.username.required && $v.username.$dirty"
        >besion du pseudo
      </span>
      <span v-if="!$v.username.alphaNum && $v.username.$dirty">bizar</span>
      <input type="text" v-model="username" /><br />

      <label>Votre email</label><br />
      <input type="email" v-model="email" /><br />
      <span v-if="(!$v.email.required || !$v.email.email) && $v.email.$dirty"
        >email nécessaire
      </span>

      <label>Votre mot de passe</label><br />
      <input type="password" v-model="password" /><br />
      <span v-if="!$v.password.required && $v.password.$dirty"
        >mot de passe nécessaire</span
      >
      <span v-if="!$v.password.minLength && $v.password.$dirty"
        >mot de passe doit etre entre
        {{ $v.password.$params.minLength.min }}</span
      >
      <span v-if="!$v.password.alphaNum && $v.password.$dirty"
        >mot de passe chelou</span
      >

      <input id="submitButton" value="S'inscrire" type="submit" />
    </form>
    <div id="goToLogin">
      <p>Déja menmbre de Groupomania ? pour vous connectée c est ici..</p>
      <a href="login">s'Identifiée</a>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, alphaNum } from "vuelidate/lib/validators";

import axios from "axios";
export default {
  data: () => ({
    email: "",
    password: "",
    biographie: "",
    firstname: "",
    lastname: "",
    username: "",
    isAdmin: 0,
    id: "",
  }),
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(5),
      alphaNum,
    },
    username: {
      required,

      alphaNum,
    },
  },
  methods: {
    submitForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log(`username: ${this.username}`);
        let newUser = {
          email: this.email,
          password: this.password,
          biographie: this.biographie,
          firstname: this.firstname,
          lastname: this.lastname,
          username: this.username,
          isAdmin: this.isAdmin,
          id: this.id,
        };

        axios
          .post("http://localhost:3000/api/auth/signup", newUser)
          .then((response) => {
                 let userInfo = JSON.stringify(response.data);
            let userToken = JSON.stringify(response.data.token);
            
               sessionStorage.setItem("userInfo", userInfo);

            localStorage.setItem("userToken", response.data.token);
            console.log(userToken);

            let id = JSON.parse(sessionStorage.getItem("userInfo")).userId;
            axios
              .get("http://localhost:3000/api/auth/" + id, {
                headers: {
                  authorization: "Bearer " + localStorage.getItem("userToken"),
                },
              })
              .then((res) => {
                console.log(res);
                let userSession = JSON.stringify(res.data);
                sessionStorage.setItem("userSession", userSession);
              })
              .catch((error) => {
                console.log(error.response);
              });

            this.$router.push("/main");
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
    },
  },
};
</script>

<style lang="scss">
body {
  /*! minireset.css v0.0.6 | MIT License | github.com/jgthms/minireset.css */

  .testvuelidate {
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
      #submitButton {
        width: 25%;
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
