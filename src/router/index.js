import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@views/Home";
import System from "@views/system/Index";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/system',
        name: 'system',
        component: System
    }
]

const router = new VueRouter({
    routes
})

export default router
