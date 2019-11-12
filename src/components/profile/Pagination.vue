<template>
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
</template>
<script>
import EventBus from '../../services/event-bus';
export default {
  name: "Pagination",
  props: ['articlesCounts'],
  data() {
    return {
      pagination: [],
      index: 0,
    };
  },
  created() {
    this.getPagination(this.articlesCounts);
  },
  methods: {
     getPagination(n) {
      this.pagination.length = 0;
      for (let i = 1; i <= Math.ceil(n / 10); i++) {
        this.pagination.push(i);
      }
    },
    getItemPage(index) {
      this.index = index;
      EventBus.$emit('numberPage', index);
    }

  }, 

};
</script>