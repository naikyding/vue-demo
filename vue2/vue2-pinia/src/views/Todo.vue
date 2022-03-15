<template>
  <div>
    <h1 class="text-green-300">{{ todoStore.title }}</h1>
  </div>
</template>

<script>
import { useTodoStore } from '@/store/pinia'

export default {
  setup () {
    const todoStore = useTodoStore()

    return { todoStore }
  }
}
</script>

<style lang="scss" scoped>

</style>
