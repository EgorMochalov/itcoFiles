import { createRouter,createWebHashHistory } from "vue-router";

import MainPage from './components/MainPage.vue'
import TaskPage from './components/TaskPage.vue'

export default createRouter({
    history:createWebHashHistory(),
    routes:[
        {path:'/',component:MainPage},
        {path:'/task',component:TaskPage}
    ] 
})