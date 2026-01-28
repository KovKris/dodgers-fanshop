<template>
  <v-app-bar app color="primary" dark elevation="4">
    <v-app-bar-title class="d-flex align-center">
      <router-link to="/" class="logo-link">
        <v-icon size="40" class="mr-2">mdi-baseball</v-icon>
        <span class="text-h5 font-weight-bold">LA DODGERS</span>
      </router-link>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <div class="d-none d-md-flex">
      <v-btn
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        text
        class="mx-1"
      >
        <v-icon left>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
    </div>

    <v-btn icon @click="cartStore.toggleCart()" class="ml-2">
      <v-badge
        :content="cartStore.totalItems"
        :model-value="cartStore.totalItems > 0"
        color="secondary"
      >
        <v-icon>mdi-cart</v-icon>
      </v-badge>
    </v-btn>

    <v-app-bar-nav-icon
      class="d-md-none"
      @click="drawer = !drawer"
    ></v-app-bar-nav-icon>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    location="left"
    temporary
    class="d-md-none"
  >
    <v-list>
      <v-list-item
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        @click="drawer = false"
      >
        <template v-slot:prepend>
          <v-icon>{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { useCartStore } from '../stores/cart'

export default {
  name: 'NavigationBar',
  data() {
    return {
      drawer: false,
      menuItems: [
        { title: 'Domov', path: '/', icon: 'mdi-home' },
        { title: 'Obchod', path: '/shop', icon: 'mdi-store' },
        { title: 'O nás', path: '/about', icon: 'mdi-information' },
        { title: 'Kontakt', path: '/contact', icon: 'mdi-email' }
      ]
    }
  },
  setup() {
    const cartStore = useCartStore()
    return { cartStore }
  }
}
</script>

<style scoped>
.logo-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
}
</style>
