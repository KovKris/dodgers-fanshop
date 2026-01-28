<template>
  <v-container class="shop-page py-8">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 font-weight-bold mb-2">Obchod</h1>
        <p class="text-h6 text-grey mb-6">Preskúmajte našu kolekciu LA Dodgers produktov</p>
      </v-col>
    </v-row>

    <v-row class="mb-6">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="searchQuery"
          label="Hľadať produkty..."
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          clearable
          @update:model-value="updateSearch"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-center justify-end">
        <v-chip class="mr-2">
          Počet produktov: {{ filteredProducts.length }}
        </v-chip>
        <v-btn
          v-if="hasActiveFilters"
          color="error"
          variant="text"
          @click="clearFilters"
        >
          Zrušiť filtre
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        <CategoryFilter />
      </v-col>

      <v-col cols="12" md="9">
        <v-row v-if="filteredProducts.length > 0">
          <v-col
            v-for="product in filteredProducts"
            :key="product.id"
            cols="12"
            sm="6"
            lg="4"
          >
            <ProductCard :product="product" />
          </v-col>
        </v-row>

        <v-row v-else>
          <v-col cols="12" class="text-center py-12">
            <v-icon size="64" color="grey">mdi-magnify</v-icon>
            <h3 class="text-h5 mt-4">Žiadne produkty nenájdené</h3>
            <p class="text-grey">Skúste zmeniť vaše vyhľadávacie kritériá</p>
            <v-btn
              color="primary"
              class="mt-4"
              @click="clearFilters"
            >
              Zrušiť filtre
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
import CategoryFilter from '../components/CategoryFilter.vue'
import { useProductStore } from '../stores/products'

export default {
  name: 'ShopPage',
  components: {
    ProductCard,
    CategoryFilter
  },
  setup() {
    const productStore = useProductStore()
    return { productStore }
  },
  data() {
    return {
      searchQuery: ''
    }
  },
  computed: {
    filteredProducts() {
      return this.productStore.filteredProducts
    },
    hasActiveFilters() {
      return this.productStore.selectedCategory !== 'Všetky' || this.productStore.searchQuery !== ''
    }
  },
  methods: {
    updateSearch(value) {
      this.productStore.setSearchQuery(value || '')
    },
    clearFilters() {
      this.searchQuery = ''
      this.productStore.clearFilters()
    }
  },
  mounted() {
    this.searchQuery = this.productStore.searchQuery
  }
}
</script>
