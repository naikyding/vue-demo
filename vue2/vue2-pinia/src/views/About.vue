<template>
  <div>
    {{title}}
    {{stateData}}
    <div>
    {{piniaStore.count}}

    <button> + </button>

    <input type="text" v-model="piniaStore.title">

    <p>這是解構獲取的值: {{ count }}</p>

    <!-- getters -->
    <div>
      <p>{{ piniaStore.doubleCount }}</p>
      <p>{{ piniaStore.doubleCountPlusOne }}</p>
      <p>
        {{ piniaStore.getUserById(3) }}
      </p>
    </div>
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

    piniaStore.$subscribe((mutation, state) => {
      console.log(mutation.type, mutation.storeId, mutation.payload)
      console.log(mutation)
    })

    // computed 獲取 state (響應)
    const count = computed(() => piniaStore.count)

    // 修改方式一:
    piniaStore.count = 111
    console.log(`第一種修後 ${piniaStore.count}`)

    // 修改方式二 $patch (物件)
    piniaStore.$patch({
      count: 222
    })
    console.log(`第二種修改後 ${piniaStore.count}`)

    setTimeout(() => {
      // 修改方式三 $patch (函式)
      piniaStore.$patch((state) => {
        state.count = 333
        console.log(`第三種修改後 ${piniaStore.count}`)
      })
    }, 3000)

    return {
      title: 'Pinia',
      stateData,
      piniaStore,
      count
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
