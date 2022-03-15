<template>
  <div>
    <h1 class="text-green-300 text-xl mb-3">{{ todoStore.title }}</h1>

    <!-- input -->
    <div>
      <input
        type="text"
        class="border rounded-md py-1 focus:border-sky-500 focus:ring-sky-500 px-3"
        placeholder="Add for anything"
        v-model.trim="todoStore.form.content"
        @keyup.enter="todoStore.addItem(todoStore.form)"
      />
      <button
        @click="todoStore.addItem(todoStore.form)"
        class="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
        ADD
      </button>
    </div>

<!-- list -->
  <div class="grid grid-cols-4">
    <ul class="mt-10 col-span-2 col-start-2 text-left">
      <li v-for="(item, index) in todoStore.list" :key="index">
        <label>
          <input type="checkbox" :checked="item.status" @click="todoStore.doneTodoItem(index)">
          <!-- <input
            class="border rounded-md py-1 focus:border-sky-500 focus:ring-sky-500 px-3"
            type="text"
            :value=""
            @dbclick="todoStore.editItem(index)"
          /> -->
        </label>

        <button class="rounded-xl px-2 py-1 bg-green-400 text-white text-xs mx-3">EDIT</button>
        <button @click="todoStore.delItem(index)" class="rounded-xl px-2 py-1 bg-red-500 text-white text-xs">DEL</button>
      </li>
    </ul>
  </div>

  </div>
</template>

<script>
import { useTodoStore } from '@/store/pinia'

export default {
  setup () {
    const todoStore = useTodoStore()

    const { title, list } = JSON.parse(sessionStorage.getItem('todoData'))
    todoStore.$patch((state) => {
      state.title = title
      state.list = list
    })

    todoStore.$subscribe((mutation, state) => {
      console.log('state 更新於 sessionStorage!')
      sessionStorage.setItem('todoData', JSON.stringify(state))
    })

    return {
      todoStore
    }
  }
}
</script>

<style scoped>
.done {
  text-decoration:line-through;
}
.wh-30 {
  width: 30px;
  height: 30px;
}
</style>
