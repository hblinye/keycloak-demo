<template>
  <div>
    <h5> New Inventory </h5>
    <inventory-form :inventory="inventory"></inventory-form>
  </div>
</template>

<script>
import { Inventory } from '../../models/inventory'
export default {
  data () {
    return {
      inventory: new Inventory()
    }
  }
}
</script>

