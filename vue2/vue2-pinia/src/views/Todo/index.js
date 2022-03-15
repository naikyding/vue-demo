import { useTodoStore } from '@/store/pinia'
const todoStore = useTodoStore()

export const getTitle = () => todoStore.title

export const getTodoList = () => todoStore.list

export const addTodo = (todoData) => {
  todoStore.addTodoItem(todoData)
}

export const todoItemDone = (index) => {
  todoStore.doneTodoItem(index)
}

export const deleteItem = (index) => {
  todoStore.delItem(index)
}

export const subscribeStore = () => todoStore.$subscribe((mutation, state) => {
  console.log(mutation)
  sessionStorage.setItem('todoList', JSON.stringify(state))
})

export const initStore = (sessionData) => todoStore.initList(sessionData)
