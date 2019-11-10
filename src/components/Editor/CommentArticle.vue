<template v-if="comments.length > 0" >
  <div class="row">
    <div class="col-xs-12 col-md-8 offset-md-2">
      <form class="card comment-form">
        <div class="card-block">
          <textarea class="form-control" placeholder="Write a comment..." rows="3"
          v-model="comment"
          ></textarea>
        </div>
        <div class="card-footer">
          <img :src="image" class="comment-author-img" />
          <button class="btn btn-sm btn-primary" @click="addComent">Post Comment</button>
        </div>
      </form>

      <div class="card" v-for="comment in listComents" :key="comment.username">
        <div class="card-block">
          <p
            class="card-text"
          >{{comment.body}}</p>
        </div>
        <div class="card-footer">
          <a href class="comment-author">
            <img :src="comment.author.image" class="comment-author-img" />
          </a>
          &nbsp;
          <a href class="comment-author">{{comment.author.username}}</a>
          <span class="date-posted">{{comment.createdAt}}</span>
           <span class="mod-options" @click="removeComments(comment.id)">
            <i class="ion-trash-a" v-if="comment.author.username == username">Delete</i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../../services/api";
export default {
  name: "CommentArticle",
   props: ['id'],
  data() {
    return {
      slug: this.id,
      comment:'',
      comments: {
        author: {
          image: null,
          username: ''
        },
        body:'',
        createdAt: '',
      },
      listComents: [],
      image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
      username: ''
    };
  },
  methods: {
    fetchComments() {
      api.prototype.get(`/articles/${this.slug}/comments`)
      .then(({comments}) => {
        this.listComents =  comments;
      })
    },
    addComent() {
      const comment  =  {
        comment: {
        body: this.comment
        }
      }
      api.prototype.post(`/articles/${this.slug}/comments`, comment)
      .then(() => {
        this.fetchComments();
        this.comment = '';
      })
    },
    removeComments(id) {
      api.prototype.delete(`/articles/${this.slug}/comments/${id}`)
      .then(() => {
        this.fetchComments();
      })
    },
    auth() {
      let user  = JSON.parse(localStorage.getItem('user'));
      this.username = user['username'];
      if(user.image) {
        this.image =  user['image'];
      }
    },
  },
  created() {
    this.fetchComments();
    this.auth();
  }
};
</script>