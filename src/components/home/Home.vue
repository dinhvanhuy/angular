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
                <a
                  class="nav-link curpoint"
                  :class="{active: type==1}"
                  v-if="isView"
                  @click="getYourFeed()"
                >Your Feed</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link curpoint"
                  @click="getArticleGlobal()"
                  :class="{active: type==2}"
                >Global Feed</a>
              </li>
              <li class="nav-item" v-show="isTag">
                <a class="nav-link curpoint" :class="{active:type==3}">#{{tag}}</a>
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="(article, index) in articles"
            :key="article.updatedAt"
          >
            <div class="article-meta">
              <router-link :to="{path: `/${article.author.username}`}">
                <img :src="article.author.image" />
              </router-link>
              <div class="info">
                <router-link class="author" :to="{path:`${article.author.username}`}">{{article.author.username}}</router-link>
                <span class="date">{{article.updatedAt}}</span>
              </div>
              <button
                class="btn btn-sm pull-xs-right"
                :class="{'btn-primary':article.favorited, 'btn-outline-primary': !article.favorited }"
                @click="updateFavirote(article.slug, index)"
              >
                <i class="ion-heart"></i>
                {{article.favoritesCount}}
              </button>
            </div>
            <a href class="preview-link">
              <h1>{{article.title}}</h1>
              <p>{{article.body}}</p>
              <router-link :to="{path: `/article/${article.slug}`}"><span>Read more...</span></router-link>
            </a>
          </div>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <a
                class="tag-pill tag-default curpoint"
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
                  class="page-item curpoint"
                  :class="{active:index==i}"
                  v-for="(pagination,i) in pagination"
                  :key="pagination"
                >
                  <a class="page-link" v-on:click="getItemPage(i)">{{pagination}}</a>
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
import api from "../../services/api";

export default {
  name: "Home",
  data() {
    return {
      tags: [],
      articles: [],
      pagination: [],
      isTag: false,
      tag: "",
      isView: false,
      index: 0,
      type: 1
    };
  },
  methods: {
    getPagination(n) {
      this.pagination.length = 0;
      for (let i = 1; i <= Math.ceil(n / 10); i++) {
        this.pagination.push(i);
      }
    },

    updateFavirote(slug, index) {
      this.articles = this.articles.map((item, i) => {
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

    getItemPage(index) {
      this.index = index;
      let offset = index * 10;
      const params = {
        limit: 10,
        offset: offset
      };

      if (this.type == 1 && !this.isTag) {
        api.prototype.get(`/articles/feed`, params).then(res => {
          this.articles = res.articles;
        });
      } else if (this.type == 2 && !this.isTag) {
        api.prototype.get(`/articles`, params).then(res => {
          this.articles = res.articles;
        });
      } else {
        this.getArticlesByTag(this.tag, offset);
      }
    },

    getArticlesByTag(tag, offset = 0) {
      if (this.tag != tag) {
        this.index = 0;
      }
      this.isTag = true;
      this.type = 3;
      this.tag = tag;
      const params = {
        limit: 10,
        offset: offset,
        tag: tag
      };
      api.prototype.get(`/articles`, params).then(res => {
        this.articles = res.articles;
        this.getPagination(res.articlesCount);
      });
    },

    getArticleGlobal(offset = 0) {
      this.index = 0;
      this.type = 2;
      this.isTag = false;
      const params = {
        limit: 10,
        offset: offset
      };
      api.prototype.get(`/articles`, params).then(res => {
        this.articles = res.articles;
        this.getPagination(res.articlesCount);
      });
    },

    getYourFeed(offset = 0) {
      this.type = 1;
      this.index = 0;
      this.isTag = false;
      const params = {
        limit: 10,
        offset: offset
      };
      this.isView = true;
      api.prototype.get(`/articles/feed`, params).then(res => {
        this.articles = res.articles;
        this.getPagination(res.articlesCount);
      });
    },

    getTags() {
      api.prototype.get(`/tags`).then(({ tags }) => {
        this.tags = tags;
      });
    },

    getAuth() {
      const user = localStorage.getItem("user");
      if (user != null) {
        this.isView = true;
      }
    }
  },

  created() {
    this.getAuth();
    if (this.isView) {
      this.getYourFeed(this.index);
    } else {
      this.getArticleGlobal(this.index);
    }
    this.getTags();
  }
};
</script>

<style>
.curpoint {
  cursor: pointer;
}
</style>