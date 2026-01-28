<template>
  <v-card elevation="2" class="mb-4">
    <v-card-title>Kategórie</v-card-title>
    <v-divider></v-divider>
    <v-list>
      <v-list-item
        v-for="category in categories"
        :key="category"
        @click="selectCategory(category)"
        :class="{ 'v-list-item--active': isActive(category) }"
      >
        <v-list-item-title>{{ category }}</v-list-item-title>
        <template v-slot:append>
          <v-chip
            v-if="isActive(category)"
            color="primary"
            size="small"
          >
            <v-icon size="small">mdi-check</v-icon>
          </v-chip>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { useProductStore } from '../stores/products'

export default {
  name: 'CategoryFilter',
  setup() {
    const productStore = useProductStore()
    return { productStore }
  },
  computed: {
    categories() {
      return this.productStore.categories
    }
  },
  methods: {
    selectCategory(category) {
      this.productStore.setCategory(category)
    },
    isActive(category) {
      return this.productStore.selectedCategory === category
    }
  }
}
</script>
