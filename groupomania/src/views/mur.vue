<template>
  <div class="mur">
    <div id="goTop"></div>
    <a href="main">/..Acceuil</a>
    <h1 v-if="userData">Les actus de {{ userData.username }}</h1>
    <h2 v-if="hisPosts.length == null">
      {{ userData.username }} n as puplier encore aucun article post pour le
      moment
    </h2>
        <a id="fleche" href="#goTop"><i class="fas fa-arrow-up"></i></a>
    <section v-for="hisPost in hisPosts" v-bind:key="hisPost.id">
      <article v-if="hisPost.userId == userData.id">
        <div class="hisPost">
          <a class="hisPostLink" v-bind:href="'post?id=' + hisPost.id">
            <h2>{{ hisPost.title }}</h2>
            <img
              v-if="hisPost.imageUrl"
              v-bind:src="hisPost.imageUrl"
              alt="image des article"
            />
            <p v-if="hisPost.content">{{ hisPost.content }}</p>
          </a>
        </div>
        <div class="hisPostDetails">
          <p>
            Créé le :<span>{{ hisPost.createdAt }}</span>
          </p>
          <p>
            Modifier le :<span> {{ hisPost.updatedAt }}</span>
          </p>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "testApi",
  data() {
    return {
      hisPosts: "",
      userData: "",
    };
  },

  methods: {
    getHisData() {
      const params = new URL(document.location).searchParams;
      const id = params.get("id");
      console.log(id);
      axios
        .get("http://localhost:3000/api/auth/" + id, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        })
        .then((response) => {
          console.log(response.data.user);
          this.userData = response.data.user;
          console.log(this.userData);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    getHisPosts() {
      axios
        .get("http://localhost:3000/api/posts/", {
          headers: {
            authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        })
        .then((res) => {
          console.log(res.data);
          this.hisPosts = res.data;
          console.log(this.hisPosts);

          localStorage.getItem("userToken");
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
  mounted() {
    this.getHisPosts();
    this.getHisData();
  },
};
</script>

<style lang="scss">

.mur{

    #fleche {
    top: 95%;
    left: 90%;
    visibility: hidden;
    position: fixed;
    .fa-arrow-up {
      color: red;
    }
  }
}
.hisPost {
  width: 100%;
  margin: auto;
  margin-top: 10px;
  transition: transform 400ms;
  width: 700px;
  height: 450px;
  max-width: 700px;
  max-height: 450px;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  &:hover {
    transform: scale(1.1);
    background-color: rgb(250, 250, 250);
  }
  a {
    text-decoration: none;
  }
  img {
    width: 500px;
    height: 350px;
    max-width: 500px;
    max-height: 350px;
  }
}

@media screen and (min-width: 320px) and (max-width: 425px) {
.mur{
    #fleche {
      visibility: visible;
    }
}

  .hisPost {
 
     width: 92%;
       transition: transform none;
       &:hover{
         transform: none;
         background-color: none;
       }
    a {
    
      img {
        max-width: 100%;
        min-width: 100%;
        width: 100%;
        margin: auto;
        object-fit: cover;
      }
    }
  }
}

@media screen and (min-width: 568px) and (max-width: 1024px){
  .mur{
    #fleche{
      visibility: visible;
    }
  }
  
  .hisPost {
 
     width: 92%;
       transition: transform none;
       &:hover{
         transform: none;
         background-color: none;
       }
    a {
    
      img {
        max-width: 100%;
        min-width: 100%;
        width: 100%;
        margin: auto;
        object-fit: cover;
      }
    }
  }
}
</style>
