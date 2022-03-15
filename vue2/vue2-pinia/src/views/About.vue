<template>
  <div>
    {{title}}
    {{stateData}}
    <div>
    {{piniaStore.count}}

    <button> + </button>

    <input type="text" v-model="piniaStore.title">

    <p>這是解構獲取的值: {{ count }}</p>

    <hr/>

    <!-- getters -->
    <div>
      <p>{{ piniaStore.doubleCount }}</p>
      <p>{{ piniaStore.doubleCountPlusOne }}</p>
      <p>
        {{ piniaStore.getUserById(3) }}
      </p>
    </div>

    <hr/>

    <!-- actions -->
    <div>
      <p>{{count}}</p>
      <button @click="piniaStore.addCount(300)">+300</button>
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
      // console.log(mutation.type, mutation.storeId, mutation.payload)
      // console.log(mutation)
    })

    // computed 獲取 state (響應)
    const count = computed(() => piniaStore.count)

    // 修改方式一:
    piniaStore.count = 111
    // console.log(`第一種修後 ${piniaStore.count}`)

    // 修改方式二 $patch (物件)
    piniaStore.$patch({
      count: 222
    })
    // console.log(`第二種修改後 ${piniaStore.count}`)

    setTimeout(() => {
      // 修改方式三 $patch (函式)
      piniaStore.$patch((state) => {
        state.count = 333
        // console.log(`第三種修改後 ${piniaStore.count}`)
      })
    }, 3000)

    //  actions

    // 監聽 actions $onAction (回傳值為「移除監聽」函式)
    const unSubscribeActions = piniaStore.$onAction(({
      name, // action 名稱
      store, // store 的實例，與 piniaStore 是一樣的東西 (在更新之前的狀態)
      args, // 傳到 action 的參數 (以陣例顯示)
      after, // 結束之後的 callback 函式
      onError // 如果這個 action 錯誤執行的函式
    }) => {
      console.log(
        `action 名稱: ${name}`)
      console.log(args)
      console.log(store)

      after(() => {
        console.log(`actions 執行完成的 count ${store.count}`)
      })
    },
    // 卸載組件後，仍監聽 (第二參數)
    true)

    console.log(unSubscribeActions)
    // setTimeout(() => {
    //   // 回傳值為「移除監聽」函式
    //   unSubscribeActions()
    // }, 5000)

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
