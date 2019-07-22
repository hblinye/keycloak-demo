<template>
  <div id="app">
    <h3>
      <router-link :to="{name: 'home'}">Home</router-link> |
      <router-link :to="{name: 'inventory_index'}">Inventory</router-link>
    </h3>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
