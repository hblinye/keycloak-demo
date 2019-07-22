<template>
  <div>
    <h4 v-if="list && list.length > 0"> Inventory List </h4>
    <p v-for="(inv, index) in list" :key="index">
      <label>
        name:
        {{ inv.name }}
      </label>
      <button @click="show(inv)">show</button>
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
    ...mapActions('inventory', ['load']),
    show (inventory) {
      this.$router.push({name: 'inventory_show', params: {id: inventory.id}})
    }
  }
}
</script>

