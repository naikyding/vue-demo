import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => ({
    title: 'pinia main',
    count: 0
  })
})
