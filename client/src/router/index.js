import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '../components/TodoList.vue'
import Messenger from '../components/MessengerOnline.vue'

const routes = [
  {
    path: '/',
    redirect: '/messenger'
  },
  {
    path: '/todoList',
    name: 'TodoList',
    component: TodoList
  },
  {
    path: '/messenger',
    name: 'messenger',
    component: Messenger
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
