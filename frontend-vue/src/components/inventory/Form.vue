<template>
  <div>
    <slot></slot>
    <label>
      name:
      <input type="text" v-model="inventory.name"/>
    </label>
    <button @click="save(inventory)">Submit</button>
    <button @click="inventory.reset()">Reset</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: ['inventory'],
  methods: {
    ...mapActions('inventory', ['save'])
  }
}
</script>
