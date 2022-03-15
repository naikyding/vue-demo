import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    title: 'TODO LIST',

    // 新增的項目
    form: {
      status: false,
      content: null
    },

    // 修改的項目
    editItem: {},

    // 所有列表資料
    list: [
      {
        content: '123',
        status: false
      }
    ]

  }),

  getters: {},

  actions: {
    initList ({ list, title }) {
      this.list = [...list]
      this.title = title
    },

    addItem (data) {
      this.list.push(data)
      this.form = {
        content: null,
        status: false
      }
    },

    doneTodoItem (index) {
      this.list[index].status = !this.list[index].status
    },

    delItem (index) {
      this.list.splice(index, 1)
    },

    editItem (index) {
      console.log(index)
    }
  }
})

export const useStore = defineStore('main', {
  state: () => ({
    title: 'pinia main',
    count: 0,
    user: [
      { id: 1, name: 'naiky', age: 34 },
      { id: 2, name: 'nico', age: 32 },
      { id: 3, name: 'niki', age: 7 }
    ]
  }),

  getters: {
    // 設置 getters
    doubleCount: (state) => state.count * 2,

    // 訪問其它 getters (不使用箭頭函式)
    doubleCountPlusOne () {
      return this.doubleCount + 1
    },

    // 傳遞參數給 getters
    getUserById: (state) => {
      return (userId) => state.user.find(user => user.id === userId)
    }
  },

  // 業務邏輯功能
  actions: {
    // 修改 state
    addCount (newBalance) {
      this.count += newBalance
    }
  }
})
