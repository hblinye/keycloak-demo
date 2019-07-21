<template>
  <div>
    <h5> New Inventory </h5>
    <label>
      name:
      <input type="text" v-model="inventory.name"/>
    </label>
    <button @click="save(inventory)">Submit</button>
    <button @click="inventory.reset()">Reset</button>
  </div>
</template>

<script>
import { Inventory } from '../../models/inventory'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      inventory: new Inventory()
    }
  },
  methods: {
    ...mapActions('inventory', ['load', 'save', 'destroy'])
  }
}
</script>

