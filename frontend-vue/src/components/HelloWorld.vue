<template>
  <div class="hello">
    <h1>Welcome to Your Vue.js App</h1>
    <input ref="inventory-input" placeholder="inventory name..." v-model="inventory.name" />
    <button v-on:click="createInventory">create</button>
    <button v-on:click="fetchInfoMethod">fetchInfo</button><br>
    <div v-if="selectedInfo">
    <input ref="selected-input" v-model="selectedInfo.name" />
      <button v-on:click="updateInventory">update</button>
      <button v-on:click="deleteInventory">delete</button>
    </div>
    <div v-if="infos">
    <h3>Inventory List</h3>
      <ul>
        <li v-for="(info, index) in infos" :key="index" @click="selectInventory(info)">
          {{ info.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Inventory } from '../models/inventory'
export default {
  name: 'HelloWorld',
  props: ['msg'],
  data() {
    return {
      inventory: new Inventory()
    }
  },
  methods: {
    fetchInfoMethod() {
      this.$store.dispatch('fetchInfo')
    },
    createInventory() {
      this.$store.dispatch('saveInventory', this.inventory)
    },
    updateInventory() {
      this.$store.dispatch('saveInventory', this.selectedInfo)
    },
    deleteInventory() {
      this.$store.dispatch('deleteInventory', this.selectedInfo)
    },
    selectInventory(inventory) {
      this.$store.dispatch('selectInventory', inventory)
    }
  },
  computed: {
    infos () {
      return this.$store.getters.getInfo
    },
    selectedInfo () {
      return this.$store.getters.getSelectedInfo
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
