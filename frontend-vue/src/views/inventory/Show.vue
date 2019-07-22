<template>
  <div>
    <div v-if="!!inventory">
      <h5> Inventory Detail </h5>
      <p>
        <label>
          name:
          {{ inventory.name }}
        </label>
      </p>
      <p>
        <label>
          key:
          {{ inventory.accessKey }}
        </label>
      </p>
      <p>
        <button @click="edit">Edit</button>
        <button @click="destroy(inventory)">Delete</button>
      </p>
    </div>
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
    ...mapActions('inventory', ['getDetail', 'destroy']),
    edit () {
      this.$router.push({name: 'inventory_edit', params: {id: this.inventory.id}})
    }
  },
  mounted () {
    this.$nextTick(async () => {
      this.inventory = await this.getDetail(this.$route.params.id)
    })
  },
  watch: {
    async '$route.params' (to) {
      this.inventory = await this.getDetail(to.id)
    }
  }
}
</script>
