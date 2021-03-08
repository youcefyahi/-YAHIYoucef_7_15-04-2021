<template>
 <div class="profil">
   <header>
            <nav>
                <img src="../assets/icon-left-font-monochrome-white.png" id="logoGroupania" alt="logo groupania">
                <button>Crée un post</button>
                <a href="#"><img src="../assets/profile-2398782_960_720.webp" id="imgProfil" alt="logo groupania"></a>
                <button>Déconnexion</button>
            </nav>
        </header>
        <div class="container">
            <section>
                <form @submit.prevent="updateProfil">
              <img src="../assets/chaton-errant-768x512.jpeg" width="100px"><br>
              <label>Nom d'utilisateur</label>
              <input  type="text" v-bind:value="userData.username">
              <div id="nomPrenom">
               <label>Votre Nom</label>
               <input  type="text" v-bind:value="userData.lastname">
               <label>Votre Prenom </label>
              <input  type="text" v-bind:value="userData.firstname">
              </div>
               <label>Votre Adresse mail</label>
              <input  type="email" v-bind:value="userData.email"><br>
                  <label>Votre description</label>
              <input type="text" v-bind:value="userData.description">
              <div>
                 
              </div>
<button>Modiifiez</button> 
                </form>
               <button>Suprimez votre profil</button>
            </section>
        </div>
 </div>
</template>

<style lang="scss">
header{
    border: 2px solid red;
    background-color:rgb(0, 0, 0);
    nav{
      display: flex;
      justify-content: space-around;
    #logoGroupania{
        width: 75px;
    }
    #imgProfil{
        width: 75px;
          &:hover{
              box-shadow: 10px 10px 10px 10px red;
          }
    }
      button{
          background-color:rgb(0, 153, 255);
          color: white;
          border-radius: 10px;
          cursor: pointer;
          &:hover{
              box-shadow: 10px 10px 10px 10px red;
          }

      }
    }
}
</style>

<script>
 
import axios from'axios'
export default {
    name:"profil",
    data(){
        return{
            userData:JSON.parse(sessionStorage.getItem("userConnected"))
        }
    },
    methods:{
        updateProfil(){
            let modifyUser={
                email:this.email,
                biographie:this.biographie,
                firstname:this.firstname,
                lastname:this.lastname,
                username:this.username
            }
                  axios.patch('http://localhost:3000/api/routes/profil',modifyUser)
                  .then(res =>{
                      console.log(res.config.data)
                      sessionStorage.setItem('userConnected',res.config.data)
                  }, err=>{
                      console.log(err.response)
                  })
        }
    }
   
   

 
  
}
     
</script>