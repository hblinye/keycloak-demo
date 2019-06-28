<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input ref="inventory-input" placeholder="inventory name..." v-model="inventoryName" />
    <button v-on:click="createInventory">create</button>
    <button v-on:click="fetchInfoMethod">fetchInfo</button>
    <div v-if="infos">
    <h3>Inventory List</h3>
      <ul>
        <li v-for="(info, index) in infos" :key="index">
          {{ info.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: ['msg'],
  data() {
    return {
      inventoryName: null
    }
  },
  methods: {
    fetchInfoMethod() {
      this.$store.dispatch('fetchInfo')
    },
    createInventory() {
      this.$store.dispatch('createInventory', this.inventoryName)
    }
  },
  computed: {
    infos () {
      return this.$store.getters.getInfo
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
