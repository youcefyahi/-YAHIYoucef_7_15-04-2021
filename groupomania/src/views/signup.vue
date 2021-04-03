<template>
    <div class="testvuelidate">
        <img src="../assets/icon-above-font.png" alt="Logo groupomania"/>
        <form @submit.prevent="submitForm">
            <label>Votre Pseudo</label><br>
            <input type="text" v-model="username"><br>
           <label>Votre email</label><br>
            <input type="email" v-model="email"><br>
            <label>Votre mot de passe</label><br>
            <input type="password" v-model="password"><br>
             
             
            <input id="submitButton" type="submit">
        </form>
        
      
    </div>
</template>

<style lang="scss">
body{
    /*! minireset.css v0.0.6 | MIT License | github.com/jgthms/minireset.css */html,body,p,ol,ul,li,dl,dt,dd,blockquote,figure,fieldset,legend,textarea,pre,iframe,hr,h1,h2,h3,h4,h5,h6{margin:0;padding:0}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal}ul{list-style:none}button,input,select,textarea{margin:0}html{box-sizing:border-box}*,*::before,*::after{box-sizing:inherit}img,video{height:auto;max-width:100%}iframe{border:0}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}td:not([align]),th:not([align]){text-align:left}
.testvuelidate{
    img{
        width: 25%;
    }
    form{
        label{
            font-size: 20px;
            font-weight: bold;
        }
        input{
            width: 60%;
            margin-bottom: 10px;
            margin-top: 10px;
            border-radius: 10px;
            height: 20px;
          
            &:not(:focus):invalid{
                background-color:red ;
            }
        }
        #submitButton{
            width: 10%;
            cursor: pointer;
            &:hover{
                transition: transform 400ms;
                transform:scale(1.25);
            }
            
        }
    }
}
}
</style>

<script>
import { required,email } from 'vuelidate/lib/validators'
import axios from 'axios';
export default {
    data:() =>({
        email:'',
        password:'',
        biographie:'',
        firstname:'',
        lastname:'',
        username:'',
        isAdmin:0,
        id:''
       
    }),
    validations:{
        email:{
            required,
            email
        },
        password:{
            required,
          
        },
        username:{
            required,
        }
      
    },
    methods:{           
        submitForm(){
            let newUser ={
               
                email:this.email,
                password:this.password,
                biographie:this.biographie,
                firstname:this.firstname,
                lastname:this.lastname,
                username:this.username,
                isAdmin:this.isAdmin,
                id:this.id
              
               
            }
            console.log(newUser)
           axios.post('http://localhost:3000/api/auth/signup',newUser)
            .then(response =>{
              alert("ca marche");
          let userInfo = JSON.stringify(response.data);
          let userToken = JSON.stringify(response.data.token);
          let userSession=  JSON.stringify(this.user)
          sessionStorage.setItem("userInfo", userInfo);
           sessionStorage.setItem("userSession", userSession);
          localStorage.setItem("userToken", response.data.token);
          console.log(userToken);
        this.$router.push("/main")
            })
            .catch((err) =>{
                console.log(err.response)
            })
      
           
        },
        
    }
}


</script>