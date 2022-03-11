<template>
  <div>
    {{title}}
    {{stateData}}
    <div>
    {{piniaStore.count}}

    <button> + </button>

    <input type="text" v-model="piniaStore.title">
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'
import store from '@/store/vuex'
import { useStore } from '@/store/pinia'

export default {
  setup () {
    const stateData = computed(() => store.state.data)

    const piniaStore = useStore()
    console.log(piniaStore.title)

    setTimeout(() => {
      piniaStore.$patch({
        count: 999
      })
    }, 3000)

    return {
      title: 'Pinia',
      stateData,
      piniaStore

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
