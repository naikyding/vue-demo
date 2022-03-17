<template>
  <div class="main-bg h-screen flex justify-center items-center flex-col bg-gray-100">
    <div class="main">
      <!-- title -->
      <h1 class="text-white text-xl mb-3">{{ todoStore.title }}</h1>

      <!-- 新增 todo -->
      <div>
        <input
          type="text"
          class="border rounded-2xl py-1 focus:border-sky-500 focus:ring-sky-500 px-5"
          placeholder="Enter next task"
          v-model="todoStore.form.content"
          @keyup.enter="todoStore.addItem(todoStore.form)"
        />
      </div>

      <!-- list -->
      <ul class="mt-5 bg-white rounded-md">
        <li class="px-4 py-3">
          <!-- 篩選類別 -->
          <button
            class="border border-green-200 mx-1 rounded-md px-3"
            :class="[{ 'bg-green-400 text-white': todoStore.activeType === button}]"
            v-for="button in todoStore.typeAry"
            :key="button"
            @click="todoStore.activeType = button"
          >
            {{ button }}
          </button>
        </li>

        <!-- 列表內容 -->
        <li
          v-for="item in todoStore.filterList"
          class="flex px-4 py-3 hover:bg-green-100"
          :key="item.id"
        >
          <!-- done -->
          <div class="done flex-none flex justify-center items-center">
            <input
              class="cursor-pointer"
              type="checkbox"
              :checked="item.status"
              @click="todoStore.doneItem(item.id)"
            />
          </div>

          <!-- 內容 -->
          <div
            @dblclick="todoStore.editItem(item.id)"
            class="content flex-1 text-left px-2"
          >
          <input
            class="border rounded-md py-1 focus:border-sky-500 focus:ring-sky-500 px-3"
            v-show="todoStore.editItemForm.id === item.id"
            type="text"
            v-model="todoStore.editItemForm.content"
            @keyup.enter="todoStore.updateItem(item, todoStore.editItemForm.content)"
            @blur="todoStore.updateItem(item, todoStore.editItemForm.content)"
          >
            <span
              v-show="todoStore.editItemForm.id !== item.id"
              :class="[{done: item.status}]"
            >{{item.content}}</span>
          </div>

          <!-- 操作 -->
          <div class="operate flex-none">
            <!-- EDIT -->
            <svg
              @click="todoStore.editItem(item.id)"
              xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>

            <!-- DELETE -->
            <svg
              @click="todoStore.delItem(item.id)"
              xmlns="http://www.w3.org/2000/svg"
              class="ml-2 h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

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

    const todoSessionStorage = JSON.parse(sessionStorage.getItem('todoData'))
    if (todoSessionStorage) {
      const { title, list } = todoSessionStorage
      todoStore.$patch((state) => {
        state.title = title
        state.list = list
      })
    }

    todoStore.$subscribe((mutation, state) => {
      sessionStorage.setItem('todoData', JSON.stringify(state))
    })

    return {
      todoStore
    }
  }
}
</script>

<style scoped>
.main-bg {
  /* background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%); */
}

.done {
  text-decoration:line-through;
}
.wh-30 {
  width: 30px;
  height: 30px;
}
</style>
