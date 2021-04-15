<template>
  <div class="post">
    <div id="goTop"></div>
    <section>
      <a id="breadcrumb" href="main">/Acceuil</a>
      <div id="selectPost" v-if="this.post">
        <h1>{{ post.title }}</h1>
        <img v-if="post.imageUrl" v-bind:src="post.imageUrl" alt="Image du post" />
        <p>{{ post.content }}</p>
      </div>
      <div id="selectPostOption">
        <button
          v-if="
            this.sessionData.id == post.userId ||
              this.sessionData.isAdmin == true
          "
        >
          <a v-bind:href="'postModify?id=' + post.id">Modifier</a>
        </button>

        <button
          id="deleteOption"
          v-if="
            this.sessionData.id == post.userId ||
              this.sessionData.isAdmin == true
          "
          @click="deletePost()"
        >
          Supprimez
        </button>
        <button
          v-if="post.signaled == false"
          id="signaledOption"
          @click="(reportThisPost = post.id), reportPost()"
        >
          Signaler le post
        </button>
        <button
          v-if="post.signaled == true"
          id="signaledOption"
          @click="(dereportThisPost = post.id), dereportPost()"
        >
        Dé-signaliser
        </button>
      </div>
      <span id="signaledPostMessage" v-if="post.signaled == true">
        ATTNETION CE POST ETAIT a SIGNALER</span
      >
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
              <h4>Commenter par:</h4>
              <div class="commenByInfo">
                <img v-bind:src="comment.profilImg" />
                <p>{{ comment.username }}</p>
              </div>

              <p>{{ comment.content }}</p>
              <button
                class="deleteComment"
                v-if="
                  sessionData.id == comment.userId ||
                    this.sessionData.isAdmin == true
                "
                @click="deleteComment(comment.id)"
              >
                Supprimer
              </button>
              <button
              v-if="comment.signaled == false"
                class="reporteComment"
                @click="reporteComment((comId = comment.id))"
              >
                Signaler
              </button>
               <button
               v-if="comment.signaled == true"
                class="reporteComment"
                @click="deReporteComment((comId = comment.id))"
              >
                Dé-Signaler
              </button>
            </div>
          </div>
        </div>
      </div>
      <a id="fleche" href="#goTop"><i class="fas fa-arrow-up"></i></a>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      post: "",
      comments: null,
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
          if (this.post === null) {
            this.$router.push("/page404");
          }
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
      this.post.signaled = true;
      axios
        .patch(
          "http://localhost:3000/api/posts/" + this.reportThisPost,
          { post: this.post },

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

    
    dereportPost() {
      this.post.signaled = false;
      axios
        .patch(
          "http://localhost:3000/api/posts/" + this.reportThisPost,
          { post: this.post },

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
        profilImg: this.sessionData.profilImg,
        username: this.sessionData.username,
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
      const params = new URL(document.location).searchParams;
      const postId = params.get("id");
      axios
        .get("http://localhost:3000/api/comments/commentPost/" + postId, {
          headers: {
            "Content.type": "Bearer" + localStorage.getItem("userToken"),
            Authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        })

        .then((res) => {
          this.comments = res.data;
          console.log(this.comments);
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
       window.location.reload();
    },

    // // SUPPRIMER LE COMMENTAIRE // //

    // // SIGNALER LE COMMENTAIRE // //
    reporteComment(id) {
      this.comments[0].signaled = true;
      console.log(id);

      axios
        .patch(
          "http://localhost:3000/api/comments/" + id,
          { comment: this.comments[0] },
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
     deReporteComment(id) {
      this.comments[0].signaled = false;
      console.log(id);

      axios
        .patch(
          "http://localhost:3000/api/comments/" + id,
          { comment: this.comments[0] },
          {
            headers: {
              "Content.type": "Bearer " + localStorage.getItem("userToken"),
              Authorization: "Bearer " + localStorage.getItem("userToken"),
            },
          }
        )
        .then((res) => {
          console.log(res);
          alert("le commentaire n'est pas  signaler");
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    // // RECUPERER LES DONNER USER // //

    sessionData() {
      this.sessionData = JSON.parse(localStorage.getItem("userSession")).user;
      console.warn(this.sessionData.profilImg);
    },
  },
  // // RECUPERER LES DONNER USER // //

  mounted() {
    this.getOnePost();
    this.getComment();
    this.sessionData();
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
    #breadcrumb {
      text-decoration: none;
      position: relative;
      right: 45%;
    }

    background-color: white;
    #selectPost {
      border-bottom: 4px solid rgb(34, 53, 83);

      img {
        width: 500px;
        height: 500px;
        max-width: 500px;
        max-height: 500px;
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
      #deleteOption {
        background-color: rgb(195, 87, 94);
        border: 2px solid rgb(195, 87, 94);
      }
      #signaledOption {
        background-color: red;
        border: 2px solid red;
      }
      a {
        text-decoration: none;
        width: 100%;
        color: white;
      }
    }

    #signaledPostMessage {
      color: red;
      font-weight: bold;
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
      #lesCommentaires {
        .allComments {
          img {
            width: 50px;
            border-radius: 10px;
          }
          .commenByInfo {
            display: flex;
            justify-content: center;
            margin-top: 10px;
            margin-bottom: 10px;
          }
          .deleteComment {
            background-color: rgb(195, 87, 94);
            border: 2px solid rgb(195, 87, 94);
            color: white;
            margin-right: 10px;
            transition: transform 500ms;
            &:hover {
              transform: scale(1.2);
            }
          }
          .reporteComment {
            background-color: rgb(34, 53, 83);
            border: 2px solid rgb(34, 53, 83);
            transition: transform 500ms;
            margin-left: 10px;
            color: white;
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
          margin-bottom: 25px;
          img {
            width: 100%;
            object-fit: contain;
            height: 250px;
          }
        }
        #selectPostOption {
          button {
            transition: transform none;
            &:hover {
              transform: none;
            }
          }
        }
        #fleche {
          visibility: visible;
        }
      }

      #selectPostCommentaire {
        #envoieCommentaire {
          form {
            button {
              transition: transform none;
              &:hover {
                transform: none;
              }
            }
          }
        }
      }

      #lesCommentaires {
        .allComments {
          .commentBy {
            .commenByInfo {
              display: flex;
              color: red;
            }
          }
          transition: transform none;
          &:hover {
            transform: none;
          }

        
        }
      }
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 1024px)  {
 body {
    min-width: 100%;
    margin: auto;
    .post {
      padding: initial;
      section {
        margin: initial;
        #selectPost {
          margin-bottom: 25px;
          img {
            width: 100%;
            object-fit: contain;
            height: 250px;
          }
        }
        #selectPostOption {
          button {
            transition: transform none;
            &:hover {
              transform: none;
            }
          }
        }
        #fleche {
          visibility: visible;
        }
      }

      #selectPostCommentaire {
        #envoieCommentaire {
          form {
            button {
              transition: transform none;
              &:hover {
                transform: none;
              }
            }
          }
        }
      }

      #lesCommentaires {
        .allComments {
          .commentBy {
            .commenByInfo {
              display: flex;
              color: red;
            }
          }
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
