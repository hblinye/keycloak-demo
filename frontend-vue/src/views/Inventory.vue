<template>
  <div>
    <h3> Inventory Page </h3>
    <router-link :to="{name: 'inventory_index'}">Index</router-link> | 
    <router-link :to="{name: 'inventory_new'}">New</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>
