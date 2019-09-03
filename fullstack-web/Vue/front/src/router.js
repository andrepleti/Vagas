import Vue from 'vue'
import Router from 'vue-router'
import Posts from './components/Post/Posts.vue'
import EditPost from './components/Post/EditPost.vue'
import Categories from './components/Category/Categories.vue'
import EditCategory from './components/Category/EditCategory.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        component: Posts
    }, {
        path: '/Categorias',
        component: Categories
    }, {
        path: '/Editar/:id',
        component: EditPost,
        props: true
    }, {
        path: '/categorias/Editar/:id',
        component: EditCategory,
        props: true
    }]
})