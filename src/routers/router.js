import Vue from 'vue/dist/vue.js';
import VueRouter from 'vue-router';
import Home from '../components/home/Home.vue';
import EditorDetail from '../components/editor/EditorDetail.vue';
import Register from '../components/author/Register.vue';
import Login from '../components/author/Login.vue';
import DetailArticle from '../components/editor/DetailArticle.vue';
import Setting from '../components/setting/setting.vue';
import Profile from '../components/profile/Profile.vue';

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
        {
            path:'/settings',
            name: 'settings',
            component: Setting,
        },
        {
            path:'/:username',
            name:'myarticle',
            component: Profile
        },
        {
            path:'/:username/favorites',
            name:'favorites',
            component: Profile
        }
    ]
})

export default router;