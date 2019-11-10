<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ul class="error-messages">
            <li v-if="!$v.title.required && submited">title can't be blank</li>
            <li v-if="!$v.description.required && submited">description can't be blank</li>
            <li v-if="!$v.body.required && submited">body can't be blank</li>
          </ul>
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model.trim="$v.title.$model"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model.trim="$v.description.$model"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model.trim="$v.body.$model"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="contextTag"
                  @keyup.enter="addTag(contextTag)"
                />
                <div class="tag-list">
                  <span class="tag-default tag-pill" v-for="(tag,index) in tags" :key="tag">
                    {{tag}}
                    <i class="ion-close-round" @click="removeTag(index)">x</i>
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="handleArticle"
              >Publish Article</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../../services/api";
import router from "../../routers/router";
import { required } from "vuelidate/lib/validators";

export default {
  name: "EditorDetail",
  data() {
    return {
      title: "",
      body: "",
      description: "",
      submited: false,
      slug: "",
      tags: [],
      contextTag: ""
    };
  },
  validations: {
    title: {
      required
    },
    body: {
      required
    },
    description: {
      required
    }
  },
  methods: {
    fetchArticle() {
      this.slug = this.$route.params.slug;
      if (this.slug !== undefined) {
        api.prototype.get(`/articles/${this.slug}`).then(({ article }) => {
          this.title = article.title;
          this.body = article.body;
          this.description = article.description;
          this.tags = article.tagList;
        });
      }
    },
    handleArticle() {
      this.submited = true;
      const article = {
        article: {
          title: this.title,
          body: this.body,
          description: this.description,
          tagList: this.tags
        }
      };
      
      if (this.$v.$invalid) {
        return;
      }

      if (this.slug === undefined) {
        api.prototype.post(`/articles`, article).then(({ article }) => {
          router.replace({
            path: `/article/${article.slug}`
          });
        });
      } else {
        api.prototype.put(`/articles/${this.slug}`, article).then(() => {
          router.replace({
            path: `/article/${this.slug}`
          });
        });
      }
    },
    addTag(contextTag) {
      this.tags.push(contextTag);
      this.contextTag = "";
    },
    removeTag(i) {
      this.tags = this.tags.filter((item, index) => {
        if (index !== i) {
          return item;
        }
      });
    }
  },
  created() {
    this.fetchArticle();
  }
};
</script>