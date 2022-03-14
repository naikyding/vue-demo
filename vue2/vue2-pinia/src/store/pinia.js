import { defineStore } from 'pinia'

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
