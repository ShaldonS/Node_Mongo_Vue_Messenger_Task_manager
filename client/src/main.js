// import { createApp } from 'vue'
import { createApp } from 'vue/dist/vue.esm-bundler';
import App from './App.vue'

// import { createRouter, createWebHistory } from 'vue-router'
// import TodoList from "@/components/TodoList.vue";
// import Messenger from "@/views/Messenger.vue";

// const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     {
//       path: '/',
//       name: '',
//       component: Messenger,
//     },
//     {
//       path: '/todoList',
//       name: 'TodoList',
//       component: TodoList,
//     },
//     {
//       path: '/messenger',
//       name: 'messenger',
//       component: Messenger,
//     },
//   ]
// })
import router from './router'

// const Foo = { template: '<div>foo</div>' }

createApp(App).use(router)
.use(router)
.mount('#app')

