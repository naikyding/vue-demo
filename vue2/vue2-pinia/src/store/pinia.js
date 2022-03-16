import { defineStore } from 'pinia'

const resetFormData = () => ({
  id: null,
  content: null,
  status: false
})

const generateId = () =>
  Date.now().toString(36)

const findItemIndex = (id, list) =>
  list.indexOf(list.find(item => item.id === id))

const filterItemById = (id, list) =>
  list.find(item => item.id === id)

export const useTodoStore = defineStore('todo', {
  state: () => ({
    title: 'TODOs',

    // 新增的項目
    form: {
      status: false,
      content: null,
      id: null
    },

    // 修改的項目
    editItemForm: {},

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

    addItem (addItemData) {
      addItemData.id = generateId()
      this.list = [...this.list, addItemData]
      this.form = { ...resetFormData() }
    },

    doneItem (id) {
      const item = filterItemById(id, this.list)
      item.status = !item.status
    },

    delItem (id) {
      this.list.splice(findItemIndex(id, this.list), 1)
    },

    editItem (id) {
      this.editItemForm = filterItemById(id, this.list)
    },

    updateItem (item, content) {
      console.log(item, content)
      item.content = content
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
