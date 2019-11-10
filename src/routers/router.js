import Vue from 'vue/dist/vue.js';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import EditorDetail from '../components/editor/EditorDetail.vue';
import Register from '../components/author/Register.vue';
import Login from '../components/author/Login.vue';
import DetailArticle from '../components/editor/DetailArticle.vue';
// import CommentArticle from '../components/editor/CommentArticle.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path:'/home',
            name: 'home',
            component: Home
        },
        {
            path: '/editor/:slug',
            name: 'editEditor',
            component: EditorDetail
        },
        {
            path: '/editor',
            name: 'addEditor',
            component: EditorDetail
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
        }, 
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/article/:slug',
            name:'articleDetail',
            component: DetailArticle,
            props: true
        },
        // {
        //     path:'detail',
        //     name:' detail',
        //     component: CommentArticle
        // }
    ]
})

export default router;