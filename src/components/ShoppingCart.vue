<template>
  <div class="shopping-cart pa-4">
    <div class="d-flex align-center justify-space-between mb-4">
      <h2>Nákupný košík</h2>
      <v-btn icon @click="cartStore.closeCart()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>

    <v-divider></v-divider>

    <div v-if="cartStore.items.length === 0" class="text-center py-8">
      <v-icon size="64" color="grey">mdi-cart-outline</v-icon>
      <p class="text-h6 mt-4">Váš košík je prázdny</p>
    </div>

    <v-list v-else>
      <v-list-item
        v-for="item in cartStore.items"
        :key="item.id"
        class="mb-2"
      >
        <template v-slot:prepend>
          <v-avatar size="60" rounded>
            <v-img :src="item.image" :alt="item.name"></v-img>
          </v-avatar>
        </template>

        <v-list-item-title class="font-weight-bold">
          {{ item.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ formatPrice(item.price) }}
        </v-list-item-subtitle>

        <template v-slot:append>
          <div class="d-flex align-center">
            <v-btn
              icon
              size="small"
              @click="decreaseQuantity(item)"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <span class="mx-2">{{ item.quantity }}</span>
            <v-btn
              icon
              size="small"
              @click="increaseQuantity(item)"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn
              icon
              size="small"
              color="error"
              class="ml-2"
              @click="removeItem(item.id)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </template>
      </v-list-item>
    </v-list>

    <div v-if="cartStore.items.length > 0">
      <v-divider class="my-4"></v-divider>

      <div class="d-flex justify-space-between mb-2">
        <span>Položky:</span>
        <span>{{ cartStore.totalItems }}</span>
      </div>

      <div class="d-flex justify-space-between mb-4">
        <span class="text-h6 font-weight-bold">Celkom:</span>
        <span class="text-h6 font-weight-bold primary--text">
          {{ formatPrice(cartStore.totalPrice) }}
        </span>
      </div>

      <v-btn
        block
        color="secondary"
        size="large"
        @click="goToCheckout"
      >
        Prejsť na pokladňu
      </v-btn>

      <v-btn
        block
        variant="text"
        class="mt-2"
        @click="clearCart"
      >
        Vyprázdniť košík
      </v-btn>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'

export default {
  name: 'ShoppingCart',
  setup() {
    const cartStore = useCartStore()
    const router = useRouter()

    return {
      cartStore,
      router
    }
  },
  methods: {
    formatPrice(price) {
      return `${price.toFixed(2)} €`
    },
    increaseQuantity(item) {
      this.cartStore.updateQuantity(item.id, item.quantity + 1)
    },
    decreaseQuantity(item) {
      this.cartStore.updateQuantity(item.id, item.quantity - 1)
    },
    removeItem(id) {
      this.cartStore.removeFromCart(id)
    },
    clearCart() {
      if (confirm('Naozaj chcete vyprázdniť košík?')) {
        this.cartStore.clearCart()
      }
    },
    goToCheckout() {
      this.cartStore.closeCart()
      this.router.push('/checkout')
    }
  }
}
</script>

<style scoped>
.shopping-cart {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
