<template>
  <div>
    <h4 v-if="list && list.length > 0"> Inventory List </h4>
    <p v-for="(inv, index) in list" :key="index">
      <label>
        name:
        <input type="text" v-model="inv.name"/>
      </label>
      <button @click="save(inv)">update</button>
      <button @click="destroy(inv)">delete</button>
      <button @click="inv.reset()">reset</button>
    </p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  mounted () {
    this.$nextTick(() => {
      this.load()
    })
  },
  computed: {
    ...mapGetters({
      list: 'inventory/list'
    })
  },
  methods: {
    ...mapActions('inventory', ['load', 'save', 'destroy'])
  }
}
</script>

