<template>
  <nav>
    <router-link to="/messenger">Мессенджер</router-link>
    <router-link to="/todoList">Менеджер задач</router-link>
  </nav>
  <router-view/>
</template>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: black;
}
nav {
  background: #ffddbf;
  padding: 10px;
  border-bottom: 1px solid black;
  margin-bottom: 5px;
}
nav a {
  padding: 10px;
  font-weight: bold;
  color: black;
  text-decoration: none;
  background: #f1f1f1 !important;
  display: inline-block;
  transform: skew(-6deg);
  border: 1px solid black;
  border-radius: 7px;
  margin-right: 10px;
}
nav a:hover{
  background:white;
}
nav a.router-link-exact-active {
  color: white;
  background: #1976d2 !important;
}
</style>
