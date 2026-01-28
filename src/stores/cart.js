import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    isCartOpen: false
  }),
  
  getters: {
    totalItems: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },
    
    totalPrice: (state) => {
      return state.items.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0)
    },
    
    cartItemsCount: (state) => {
      return state.items.length
    }
  },
  
  actions: {
    addToCart(product) {
      const existingItem = this.items.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.items.push({
          ...product,
          quantity: 1
        })
      }
      
      this.saveToLocalStorage()
    },
    
    removeFromCart(productId) {
      const index = this.items.findIndex(item => item.id === productId)
      if (index !== -1) {
        this.items.splice(index, 1)
      }
      this.saveToLocalStorage()
    },
    
    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(productId)
        } else {
          item.quantity = quantity
        }
      }
      this.saveToLocalStorage()
    },
    
    clearCart() {
      this.items = []
      this.saveToLocalStorage()
    },
    
    toggleCart() {
      this.isCartOpen = !this.isCartOpen
    },
    
    openCart() {
      this.isCartOpen = true
    },
    
    closeCart() {
      this.isCartOpen = false
    },
    
    saveToLocalStorage() {
      localStorage.setItem('dodgers-cart', JSON.stringify(this.items))
    },
    
    loadFromLocalStorage() {
      const savedCart = localStorage.getItem('dodgers-cart')
      if (savedCart) {
        this.items = JSON.parse(savedCart)
      }
    }
  }
})
