<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link disabled" href>Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" v-on:click="getArticleGlobal()">Global Feed</a>
              </li>
              <li class="nav-item" v-show="isTag">
                <a class="nav-link active">#{{tag}}</a>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="(article) in articles" :key="article.updatedAt">
            <div class="article-meta">
              <a href="profile.html">
                <img src="http://i.imgur.com/Qr71crq.jpg" />
              </a>
              <div class="info">
                <a href class="author">{{article.author.username}}</a>
                <span class="date">{{article.updatedAt}}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i>
                {{article.favoritesCount}}
              </button>
            </div>
            <a href class="preview-link">
              <h1>{{article.title}}</h1>
              <p>{{article.body}}</p>
              <span>Read more...</span>
            </a>
          </div>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <a
                class="tag-pill tag-default"
                v-on:click="getArticlesByTag(tag)"
                v-for="(tag) in tags"
                :key="tag"
              >{{tag}}</a>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-9">
            <nav>
              <ul class="pagination">
                <li
                  class="active page-item curpoint"
                  v-for="(pagination,index) in pagination"
                  :key="pagination"
                >
                  <a class="page-link" v-on:click="getItemPage(index)">{{pagination}}</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      tags: [],
      articles: [],
      pagination: [],
      isTag: false,
      tag: ""
    };
  },
  methods: {
    getPagination() {
      for (let i = 1; i <= 50; i++) {
        this.pagination.push(i);
      }
    },
    getItemPage(index) {
      let offset = index * 10;
      axios
        .get(`https://conduit.productionready.io/api/articles`, {
          params: {
            limit: 10,
            offset: offset
          }
        })
        .then(({ data: articles }) => {
          this.articles = articles.articles;
        });
    },
    getArticlesByTag(tag, offset = 0) {
      this.isTag = true;
      this.tag = tag;
      axios
        .get(`https://conduit.productionready.io/api/articles`, {
          params: {
            limit: 10,
            offset: offset,
            tag: tag
          }
        })
        .then(({ data: articles }) => {
          this.articles = articles.articles;
        });
    },
    getArticleGlobal() {
        this.isTag =  false;
      axios
        .get(
          `https://conduit.productionready.io/api/articles?limit=10&offset=0`
        )
        .then(({ data: articles }) => {
          this.articles = articles.articles;
        });
    }
  },
  created() {
    axios
      .get(`https://conduit.productionready.io/api/tags`)
      .then(({ data }) => {
        this.tags = data.tags;
      });
    this.getArticleGlobal();
    this.getPagination();
  }
};
</script>

<style>

</style>