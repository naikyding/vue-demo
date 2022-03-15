<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="piniaStore.addCount(300)">+300</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { useStore } from '@/store/pinia'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },

  setup () {
    const piniaStore = useStore()

    return {
      piniaStore
    }
  }
}
</script>
