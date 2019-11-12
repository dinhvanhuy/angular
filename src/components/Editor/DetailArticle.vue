<template v-if="article">
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{article.title}}</h1>

        <div class="article-meta">
          <a>
            <img :src="article.author.image" />  
          </a>
          <div class="info">
            <a href class="author">{{article.author.username}}</a>
            <span class="date">{{article.createdAt | formatDate}}</span>
          </div>
          <button v-show="!isShow" class="btn btn-sm btn-outline-secondary" @click="handleFollow()">
            <i class="ion-plus-round"></i>
            {{following}} {{article.author.username}}
          </button>
          <button class="btn btn-sm btn-outline-primary" @click="handleFavorite()" v-show="!isShow">
            <i class="ion-heart"></i>
            &nbsp;&nbsp;
            {{favorited}} Post
            <span
              class="counter"
            >({{article.favoritesCount}})</span>
          </button>
          <button class="btn btn-sm btn-outline-secondary" @click="updateArticle(article.slug)" v-show="isShow">
            <i class="ion-edit"></i>
            &nbsp;
            Edit Article
          </button> &nbsp;
          <button class="btn btn-sm btn-outline-danger" @click="removeArticle(article.slug)" v-show="isShow">
            <i class="ion-trash-a"></i>
            &nbsp;
            Delete Article
          </button>
        </div>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <p>{{article.body}}</p>
          <ul class="tag-list">
        <li class="tag-default tag-pill tag-outline" v-for="item in article.tagList" :key="item">
          {{item}}
        </li>
      </ul>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <div class="article-meta">
          <a>
            <img :src="article.author.image" />
          </a>
          <div class="info">
            <a href class="author">{{article.author.username}}</a>
            <span class="date">{{article.createdAt | formatDate}}</span>
          </div>

          <button class="btn btn-sm btn-outline-secondary"
            @click="handleFollow"
            v-show="!isShow"
          >
            <i class="ion-plus-round"></i>
            &nbsp;
            {{following}} {{article.author.username}}
            <span
              class="counter"
            >{{article.favoritesCount}}</span>
          </button>
          &nbsp;
          <button class="btn btn-sm btn-outline-primary"
          @click="handleFavorite"
          v-show="!isShow"
          >
            <i class="ion-heart"></i>
            &nbsp;
            {{favorited}} Post
            <span
              class="counter"
            >{{article.favoritesCount}}</span>
          </button>
          <button class="btn btn-sm btn-outline-secondary"
          @click="updateArticle" v-show="isShow"
          >
            <i class="ion-edit"></i>
            &nbsp;
            Edit Article
          </button> &nbsp;
          <button class="btn btn-sm btn-outline-danger"
          @click="removeArticle" v-show="isShow">
            <i class="ion-trash-a"></i>
            &nbsp;
            Delete Article
          </button>
        </div>
      </div>
      <CommentArticle :id="slug"></CommentArticle>
    </div>
  </div>
</template>
<script>
import api from "../../services/api";
import CommentArticle from "./CommentArticle.vue";

export default {
  name: "DetailArticle",
  props: ["id"],
  components: {
    CommentArticle
  },
  data() {
    return {
      slug: null,
      article: {
        author: {
          username: "",
          image: null,
          following: false
        },
        createdAt: "",
        body: "",
        title: "",
        slug: "",
        favorited: false,
        tagList: [],
      },
      favorited: "",
      following: "",
      isShow: false
    };
  },
  methods: {
    fetchData() {
      this.slug = this.$route.params.slug;
      api.prototype.get(`/articles/${this.slug}`).then(({ article }) => {
        this.article = article;
        this.following = this.article.author.following ? "Unfollow" : "Follow";
        this.favorited = this.article.favorited ? "Unfavorite" : "Favorite";
        this.auth(this.article.author.username);
      });
    },
    auth(username) {
      let user  = JSON.parse(localStorage.getItem('user'));
      if(user.username === username) {
        this.isShow =  true;
      }
    },
    updateArticle(slug) {
      this.$router.replace({ path: `/editor/${slug}` });
    },
    removeArticle(slug) {
      api.prototype.delete(`/articles/${slug}`).then(() => {
        this.$router.replace({ path: `/home` });
      });
    },
    handleFollow() {
      this.article.author.following = !this.article.author.following;
      this.following = this.article.author.following ? "Unfollow" : "Follow";
      this.article.author.following
        ? api.prototype.post(`/profiles/${this.article.author.username}/follow`)
        : api.prototype.delete(
            `/profiles/${this.article.author.username}/follow`
          );
    },
    handleFavorite() {
      this.article.favorited = !this.article.favorited;
      this.favorited = this.article.favorited ? "Unfavorite" : "Favorite";
      this.article.favorited
        ? api.prototype.post(`/articles/${this.slug}/favorite`)
        : api.prototype.delete(`/articles/${this.slug}/favorite`);
    }
  },
  created() {
    this.fetchData();
  }
};
</script>