<template>
  <v-card class="product-card" elevation="4">
    <v-img
      :src="product.image"
      :alt="product.name"
      height="250"
      cover
    >
      <v-chip
        v-if="!product.inStock"
        color="error"
        class="ma-2"
        size="small"
      >
        Vypredané
      </v-chip>
      <v-chip
        v-if="product.featured"
        color="secondary"
        class="ma-2"
        size="small"
      >
        Top produkt
      </v-chip>
    </v-img>

    <v-card-title class="text-h6">
      {{ product.name }}
    </v-card-title>

    <v-card-subtitle>
      {{ product.category }}
    </v-card-subtitle>

    <v-card-text>
      <p class="text-truncate">{{ product.description }}</p>
      <div class="text-h5 font-weight-bold primary--text mt-2">
        {{ formatPrice(product.price) }}
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="primary"
        variant="text"
        :to="`/product/${product.id}`"
      >
        Detail
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="secondary"
        :disabled="!product.inStock"
        @click="addToCart"
      >
        <v-icon left>mdi-cart-plus</v-icon>
        Do košíka
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { useCartStore } from '../stores/cart'

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup() {
    const cartStore = useCartStore()
    return { cartStore }
  },
  methods: {
    formatPrice(price) {
      return `${price.toFixed(2)} €`
    },
    addToCart() {
      this.cartStore.addToCart(this.product)
      this.cartStore.openCart()
    }
  }
}
</script>

<style scoped>
.product-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}
</style>
