<template >
  <div>
    <div class="article-preview" v-for="(article, index) in listArticle" :key="article.slug">
      <div class="article-meta">
        <a>
          <img :src="article.author.image" />
        </a>
        <div class="info">
          <router-link  class="author" :to="{path:`/${article.author.username}`}">{{article.author.username}}</router-link>
          <span class="date">{{article.createdAt}}</span>
        </div>
        <button
          class="btn btn-outline-primary btn-sm pull-xs-right"
          @click="updateFavirote(article.slug, index)"
        >
          <i class="ion-heart"></i>
          {{article.favoritesCount}}
        </button>
      </div>
      <a href class="preview-link">
        <h1>{{article.title}}</h1>
        <p>{{article.body}}</p>
       <router-link :to="{path:`/article/${article.slug}`}"> <span>Read more...</span></router-link>
      </a>
    </div>
    <Pagination v-if="articlesCount> 0" :articlesCounts="articlesCount"></Pagination>
  </div>
</template>
<script>
import api from "../../services/api";
import EventBus from "../../services/event-bus";
import Pagination from "./Pagination";
export default {
  name: "ListArticle",
  props: ["articlesCounts", 'userName'],
  components: { Pagination },

  data() {
    return {
      pagination: [],
      index: 0,
      listArticle: [],
      type: 1,
      username: this.userName,
      articlesCount: 0,
      isShow: false,
    };
  },

  created() {
    this.$router.onReady(this.getArticle);
    
  },

  methods: {
    auth(username) {
      let user  = JSON.parse(localStorage.getItem('user'));
      if(user.username === username) {
        this.isShow =  true;
      }
    },
    getArticle(offset = 0) {
      this.auth(this.username);
      const params = {
        limit: 10,
        offset: offset
      };
      if (this.$route.name == "myarticle") {
        params["author"] = this.$route.params.username;
        api.prototype.get(`/articles`, params).then(res => {
          this.listArticle = res.articles;
          this.articlesCount = res.articlesCount;
        });
      } else {
        params["favorited"] = this.$route.params.username;
        api.prototype.get(`/articles`, params).then(res => {
          this.listArticle = res.articles;
          this.articlesCount = res.articlesCount;
        });
      }
    },
     updateFavirote(slug, index) {
      this.listArticle = this.listArticle.map((item, i) => {
        if (index == i) {
          item.favorited ? item.favoritesCount-- : item.favoritesCount++;
          item.favorited = !item.favorited;
          item.favorited
            ? api.prototype.post(`/articles/${slug}/favorite`)
            : api.prototype.delete(`/articles/${slug}/favorite`);
        }
        return item;
      });
    },
  },
  mounted() {
    /* eslint-disable */
    EventBus.$on("numberPage", index => {
      this.getArticle(index * 10);
    });
  },
  watch: {
    $route(to, from) {
      this.getArticle();
    }
  }
};
</script>