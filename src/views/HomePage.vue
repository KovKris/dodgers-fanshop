<template>
  <div class="home-page">
    <!-- Hero Section -->
    <v-container fluid class="hero-section primary pa-0">
      <v-row align="center" justify="center" class="pa-8">
        <v-col cols="12" class="text-center">
          <h1 class="text-h2 text-md-h1 font-weight-bold white--text mb-4">
            LA DODGERS FAN SHOP
          </h1>
          <p class="text-h5 text-md-h4 white--text mb-6">
            Oficiálne licencované produkty pre pravých fanúšikov
          </p>
          <v-btn
            color="secondary"
            size="x-large"
            to="/shop"
          >
            Nakupovať teraz
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="my-12">
      <v-row>
        <v-col cols="12" class="text-center mb-8">
          <h2 class="text-h3 font-weight-bold mb-4">Top produkty</h2>
          <p class="text-h6 text-grey">Najobľúbenejšie produkty našich fanúšikov</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          v-for="product in featuredProducts"
          :key="product.id"
          cols="12"
          sm="6"
          md="4"
        >
          <ProductCard :product="product" />
        </v-col>
      </v-row>

      <v-row class="mt-8">
        <v-col cols="12" class="text-center">
          <v-btn
            color="primary"
            size="large"
            to="/shop"
          >
            Zobraziť všetky produkty
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid class="info-section grey lighten-4 py-12">
      <v-container>
        <v-row>
          <v-col
            v-for="(feature, index) in features"
            :key="index"
            cols="12"
            md="4"
          >
            <v-card elevation="0" class="text-center pa-6">
              <v-icon :color="feature.color" size="64">{{ feature.icon }}</v-icon>
              <h3 class="text-h5 font-weight-bold my-4">{{ feature.title }}</h3>
              <p class="text-body-1">{{ feature.description }}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
import { useProductStore } from '../stores/products'

export default {
  name: 'HomePage',
  components: {
    ProductCard
  },
  setup() {
    const productStore = useProductStore()
    return { productStore }
  },
  data() {
    return {
      features: [
        {
          icon: 'mdi-shield-check',
          color: 'primary',
          title: 'Oficiálne licencované',
          description: 'Všetky naše produkty sú oficiálne licencované MLB a LA Dodgers.'
        },
        {
          icon: 'mdi-truck-fast',
          color: 'secondary',
          title: 'Rýchle doručenie',
          description: 'Doručíme vám vaše objednávky do 3-5 pracovných dní.'
        },
        {
          icon: 'mdi-star',
          color: 'accent',
          title: 'Kvalita',
          description: 'Garantujeme kvalitu všetkých našich produktov.'
        }
      ]
    }
  },
  computed: {
    featuredProducts() {
      return this.productStore.featuredProducts
    }
  },
  mounted() {
    this.productStore.clearFilters()
  }
}
</script>

<style scoped>
.hero-section {
  min-height: 400px;
  background: linear-gradient(135deg, #005A9C 0%, #003D7A 100%);
}

.info-section {
  background-color: #f5f5f5;
}
</style>
