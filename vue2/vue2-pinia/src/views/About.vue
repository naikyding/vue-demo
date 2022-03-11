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

    // 修改方式一:
    piniaStore.count = 111
    console.log(`第一種修後 ${piniaStore.count}`)

    // 修改方式二 $patch (物件)
    piniaStore.$patch({
      count: 222
    })
    console.log(`第一種修改後 ${piniaStore.count}`)

    setTimeout(() => {
      // 修改方式三 $patch (函式)
      piniaStore.$patch((state) => {
        state.count = 333
        console.log(`第一種修改後 ${piniaStore.count}`)
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
