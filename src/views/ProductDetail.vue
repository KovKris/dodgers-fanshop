<template>
  <v-container class="product-detail py-8">
    <v-row v-if="product">
      <v-col cols="12">
        <v-btn
          variant="text"
          @click="goBack"
          class="mb-4"
        >
          <v-icon left>mdi-arrow-left</v-icon>
          Späť na obchod
        </v-btn>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="4">
          <v-img
            :src="product.image"
            :alt="product.name"
            height="500"
            cover
          >
            <v-chip
              v-if="!product.inStock"
              color="error"
              class="ma-4"
            >
              Vypredané
            </v-chip>
            <v-chip
              v-if="product.featured"
              color="secondary"
              class="ma-4"
            >
              Top produkt
            </v-chip>
          </v-img>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="4" class="pa-6">
          <v-chip color="accent" class="mb-4">{{ product.category }}</v-chip>
          
          <h1 class="text-h3 font-weight-bold mb-4">{{ product.name }}</h1>
          
          <div class="text-h4 font-weight-bold primary--text mb-6">
            {{ formatPrice(product.price) }}
          </div>

          <v-divider class="my-4"></v-divider>

          <h3 class="text-h6 font-weight-bold mb-2">Popis</h3>
          <p class="text-body-1 mb-6">{{ product.description }}</p>

          <h3 class="text-h6 font-weight-bold mb-2">Dostupné veľkosti</h3>
          <v-chip-group v-model="selectedSize" mandatory class="mb-6">
            <v-chip
              v-for="size in product.sizes"
              :key="size"
              :value="size"
              filter
              color="primary"
            >
              {{ size }}
            </v-chip>
          </v-chip-group>

          <v-divider class="my-4"></v-divider>

          <div class="d-flex align-center mb-4">
            <span class="text-h6 mr-4">Množstvo:</span>
            <v-btn
              icon
              size="small"
              @click="decreaseQuantity"
              :disabled="quantity <= 1"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <span class="mx-4 text-h6">{{ quantity }}</span>
            <v-btn
              icon
              size="small"
              @click="increaseQuantity"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>

          <v-btn
            block
            color="secondary"
            size="x-large"
            :disabled="!product.inStock"
            @click="addToCart"
            class="mb-4"
          >
            <v-icon left>mdi-cart-plus</v-icon>
            Pridať do košíka
          </v-btn>

          <v-alert
            v-if="!product.inStock"
            type="error"
            variant="tonal"
          >
            Tento produkt je momentálne vypredaný
          </v-alert>
        </v-card>
      </v-col>

      <v-col cols="12" class="mt-8">
        <h2 class="text-h4 font-weight-bold mb-6">Súvisiace produkty</h2>
        <v-row>
          <v-col
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            cols="12"
            sm="6"
            md="3"
          >
            <ProductCard :product="relatedProduct" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12" class="text-center py-12">
        <v-icon size="64" color="error">mdi-alert-circle</v-icon>
        <h3 class="text-h5 mt-4">Produkt nenájdený</h3>
        <v-btn color="primary" class="mt-4" to="/shop">
          Späť na obchod
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
import { useProductStore } from '../stores/products'
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'

export default {
  name: 'ProductDetail',
  components: {
    ProductCard
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup() {
    const productStore = useProductStore()
    const cartStore = useCartStore()
    const router = useRouter()

    return {
      productStore,
      cartStore,
      router
    }
  },
  data() {
    return {
      quantity: 1,
      selectedSize: null
    }
  },
  computed: {
    product() {
      return this.productStore.getProductById(this.id)
    },
    relatedProducts() {
      if (!this.product) return []
      return this.productStore.products
        .filter(p => p.category === this.product.category && p.id !== this.product.id)
        .slice(0, 4)
    }
  },
  methods: {
    formatPrice(price) {
      return `${price.toFixed(2)} €`
    },
    increaseQuantity() {
      this.quantity++
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },
    addToCart() {
      for (let i = 0; i < this.quantity; i++) {
        this.cartStore.addToCart(this.product)
      }
      this.cartStore.openCart()
    },
    goBack() {
      this.router.push('/shop')
    }
  },
  mounted() {
    if (this.product && this.product.sizes.length > 0) {
      this.selectedSize = this.product.sizes[0]
    }
  }
}
</script>
