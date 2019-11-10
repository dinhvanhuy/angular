import Vue from 'vue/dist/vue.js';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import Editor from '../components/editor/EditorDetail.vue';
import Register from '../components/author/Register.vue';
import Login from '../components/author/Login.vue';

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
        }
    ]
})

export default router;