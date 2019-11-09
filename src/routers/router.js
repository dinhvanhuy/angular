import Vue from 'vue/dist/vue.js';

// import Router from 'vue-router';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import Editor from '../components/Editor/EditorDetail.vue';
// const Foo = { template: '<div>foo</div>' }
// const Bar = { template: '<div>bar</div>' }
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path:'/home',
            name: 'home',
            component: Home
        },
        {
            path: '/editor',
            name: 'editor',
            component: Editor
        }
        // {
        //     path: '/editor',
        //     name: 'editor'
        // }
    ]
})

export default router;