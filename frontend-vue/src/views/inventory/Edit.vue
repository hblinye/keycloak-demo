<template>
  <div>
    <h5> Edit Inventory </h5>
    <inventory-form v-if="!!inventory" :inventory="inventory">
      <p><label>id: {{ inventory.id }}</label></p>
      <p><label>key: {{ inventory.accessKey }}</label></p>
    </inventory-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data () {
    return {
      inventory: null
    }
  },
  methods: {
    ...mapActions('inventory', ['getDetail'])
  },
  mounted () {
    this.$nextTick(async () => {
      this.inventory = await this.getDetail(this.$route.params.id)
    })
  }
}
</script>

