<template>
  <div class="post">
    <section>
      <div id="selectPost" v-if="this.post">
        <h1>{{ post.title }}</h1>
        <img v-bind:src="post.imageUrl" alt="Image du post" />
        <p>{{ post.content }}</p>
      </div>
      <div id="selectPostOption">
        <a
          v-if="this.userData.id === this.post.userId ||
              this.userData.isAdmin == true"
          v-bind:href="'postModify?id=' + post.id"
          >Modifier</a
        >

        <button
          v-if="
            this.userData.id === this.post.userId ||
              this.userData.isAdmin == true
          "
          @click="deletePost()"
        >
          Supprimez
        </button>
        <button @click="(reportThisPost = post.id), reportPost()">Signaler le post</button>

      
      </div>

      <div id="selectPostCommentaire">
        <div id="envoieCommentaire">
          <form @submit.prevent="addComment">
            <input type="text" v-model="content" /><br />
            <button>Envoyer Commentaire</button>
          </form>
        </div>
        <div id="lesCommentaires">
          <div
            class="allComments"
            v-for="comment in comments"
            v-bind:key="comment.id"
          >
            <div v-if="comment.postId == post.id">
              <p>{{ comment.content }}</p>
              <button @click="deleteComment(comment.id)">
                Supprimer
              </button>
              <button @click="reporteComment(comment.id)">Signaler</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userData: "",
      post: [],
      comments: this.comments,
      content: "",
      
      
    };
  },
  methods: {
    // // Recuperer LE POST // //
    getOnePost() {
      const params = new URL(document.location).searchParams;
      const id = params.get("id");
      axios
        .get("http://localhost:3000/api/posts/" + id, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        })

        .then((res) => {
          this.post = res.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    // // Recuperer LE POST // //

    // // SUPRIMER LE POST // //
    deletePost() {
      let postId = this.post.id;

      axios
        .delete("http://localhost:3000/api/posts/" + postId, {
          headers: {
            "Content.type": "Bearer " + localStorage.getItem("userToken"),
            Authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        })
        .then((res) => {
          console.log(res.data);
          alert("Votre post a était surpprimer");
          this.$router.push("/main");
        });
    },
    // // SUPRIMER LE POST // //

    // // SIGNALER POST // //

    reportPost() {
    this.post.signaled = true
      axios
        .patch(
          "http://localhost:3000/api/posts/" + this.reportThisPost,
           {post:this.post},

          {
            headers: {
              "Content.type": "Bearer " + localStorage.getItem("userToken"),
              Authorization: "Bearer " + localStorage.getItem("userToken"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);

          alert("Votre article a bien etait signler");
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    // // AJOUTER  LES COMMENTAITRE // //
    addComment() {
      let newComment = {
        content: this.content,
        postId: this.post.id,
      };
      axios
        .post(
          "http://localhost:3000/api/comments/",
          { comment: JSON.stringify(newComment) },
          {
            headers: {
              "Content.type": "Bearer" + localStorage.getItem("userToken"),
              Authorization: "Bearer " + localStorage.getItem("userToken"),
            },
          }
        )
        .then((res) => {
          alert("commenntaire crée !");
          console.log(res.data);
          window.location.reload();
        });
      (err) => {
        console.log(err.response);
      };
    },

    // // AJOUTER LES  COMMENTAITRE // //

    // // AFFICHER LES  COMMENTAITRE // //
    getComment() {
      axios
        .get("http://localhost:3000/api/comments/", {
          headers: {
            "Content.type": "Bearer" + localStorage.getItem("userToken"),
            Authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        })

        .then((res) => {
          this.comments = res.data;
          console.warn(this.comments.id);
          console.warn(this.idComment);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    // // AJOUTER LES  COMMENTAITRE // //

    // // SUPPRIMER LE COMMENTAIRE // //
    deleteComment(id) {
      axios.delete("http://localhost:3000/api/comments/" + id, {
        headers: {
          "Content-type": "Bearer ",
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      });

      alert("bonjour");
      window.location.reload();
      this.getComment();
    },

    // // SUPPRIMER LE COMMENTAIRE // //

    // // SIGNALER LE COMMENTAIRE // //
    reporteComment(id) {
      this.comment.signaled
      axios
        .patch(
          "http://localhost:3000/api/comments/" + id,
         {comment:this.comment},
          {
            headers: {
              "Content.type": "Bearer " + localStorage.getItem("userToken"),
              Authorization: "Bearer " + localStorage.getItem("userToken"),
            },
          }
        )
        .then((res) => {
          console.log(res);
          alert("le commentaire a etait signaler");
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    // // RECUPERER LES DONNER USER // //
    getData() {
    
    let id = JSON.parse(sessionStorage.getItem("userInfo")).userId;
      this.userConnected = JSON.parse(sessionStorage.getItem("userInfo"));
      axios
        .get("http://localhost:3000/api/auth/" + id, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.userData = response.data.user;
          console.log(this.userData.username);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
  // // RECUPERER LES DONNER USER // //

  mounted() {
    this.getOnePost();
    this.getComment();
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.post {
  font-family: "Kanit", sans-serif;
  background-color: rgb(34, 53, 83);
  padding: 5px;
  section {
    margin-right: 10%;
    margin-left: 10%;

    background-color: white;
    #selectPost {
      border-bottom: 4px solid rgb(34, 53, 83);

      img {
        width: 500px;
        height: 500px;
        max-width: 500px;
        max-height: 500px;
        border: 2px solid rgb(34, 53, 83);
      }
    }
    #selectPostOption {
      border-bottom: 4px solid rgb(34, 53, 83);
      margin-top: 15px;
      padding-bottom: 15px;
      button {
        background-color: rgb(34, 53, 83);
        border: 2px solid rgb(34, 53, 83);
        width: 120px;
        height: 30px;
        color: white;
        cursor: pointer;
        transition: transform 500ms;
        &:hover {
          transform: scale(1.2);
        }
      }
      a {
        text-decoration: none;
        color: black;
        background-color: rgb(195, 87, 94);
        border: 2px solid rgb(195, 87, 94);
        width: 120px;
        height: 30px;
        color: white;
        transition: transform 500ms;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
    #selectPostCommentaire {
      #envoieCommentaire {
        padding-top: 20px;
        padding-bottom: 20px;
        form {
          // mettre en ligne // //
          input {
            width: 300px;
            height: 100px;
          }
          button {
            background-color: rgb(195, 87, 94);
            color: white;
            cursor: pointer;
            transition: transform 500ms;
            &:hover {
              transform: scale(1.2);
            }
          }
        }
      }
    }

    #lesCommentaires {
      .allComments {
        background-color: rgb(247, 247, 247);
        box-shadow: 5px 5px 5px 5px;
        margin: 5%;
        transition: transform 500ms;
        &:hover {
          transform: scale(1.1);
        }

        button {
          cursor: pointer;
        }
      }
    }
  }
}

@media screen and (min-width: 320px) and (max-width: 425px) {
  body {
    min-width: 100%;
    margin: auto;
    .post {
      padding: initial;
      section {
        margin: initial;
        #selectPost {
          img {
            width: 100%;
          }
        }
      }
      #lesCommentaires {
        .allComments {
          transition: transform none;
          &:hover {
            transform: none;
          }
        }
      }
    }
  }
}
</style>
