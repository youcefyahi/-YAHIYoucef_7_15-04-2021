<template>
  <div class="login">
    <img src="../assets/icon-above-font.png" alt="Logo groupomania" />
    <form @submit.prevent="login">
      <label>Votre email</label><br />
      <input type="email" v-model="email" /><br />
        <span v-if="(!$v.email.required || !$v.email.email) && $v.email.$dirty"
        >email nécessaire<br>
      </span>
      <label>Votre mot de passe</label><br />
      <input type="password" v-model="password" /><br />
       <span v-if="!$v.password.required && $v.password.$dirty"
        >mot de passe nécessaire</span><br>
     <input id="submitButton" value="Ce connecter" type="submit" />
    </form>
    <div id="goToSignup"><p>Votre premiére fois sur Groupomania? n'hésitait pas a nous rejoindre ici</p><a href=signup>Inscription</a> </div>
  </div>
</template>

<script>
import { required,email } from 'vuelidate/lib/validators'


import axios from "axios";
export default {
  name: "login",
  data() {
    return {
email:"",
password:""
    };
  },

  validations:{
    email:{
      required,
      email
    },
    password:{
      required
    }
  },

  methods: {
    login() {
      this.$v.$touch();
      if(!this.$v.$invalid){
        let user ={
          email:this.email,
          password:this.password
        }
        axios
        .post("http://localhost:3000/api/auth/login", user, {})
        .then((response) => {
          alert("ca marche");
          let userInfo = JSON.stringify(response.data);
          let userToken = JSON.stringify(response.data.token);
          
          sessionStorage.setItem("userInfo", userInfo);
         

          localStorage.setItem("userToken", response.data.token);
          console.log(userToken);

          // recupp rinfo // // 
  let id = JSON.parse(sessionStorage.getItem("userInfo")).userId;

      axios
        .get("http://localhost:3000/api/auth/" + id, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        })
        .then((res) => {
        console.log(res)
        let userSession = JSON.stringify(res.data)
        sessionStorage.setItem("userSession",userSession)
        })
        .catch((error) => {
          console.log(error.response);
        });

      
          this.$router.push("/main");
        })
        .catch((error) => {
          alert(error);
        });
      }
      
    },

 

  
  },
};
</script>

<style lang="scss">
body {
 
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
