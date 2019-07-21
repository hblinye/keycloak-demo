<template>
  <div>
    <h3> Inventory Page </h3>
    <div>
      <h5> New Inventory </h5>
      <label>
        name:
        <input type="text" v-model="inventory.name"/>
      </label>
      <button @click="save(inventory)">Submit</button>
      <button @click="inventory.reset()">Reset</button>
    </div>
    <div>
      <h4 v-if="list && list.length > 0"> Inventory List </h4>
      <p v-for="(inv, index) in list" :key="index">
        <label>
          name:
          <input type="text" v-model="inv.name"/>
        </label>
        <button @click="saveInventory(inv)">update</button>
        <button @click="destroy(inv)">delete</button>
        <button @click="inv.reset()">reset</button>
      </p>
    </div>
  </div>
</template>

<script>
import { Inventory } from '../../models/inventory'
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      inventory: new Inventory()
    }
  },
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
