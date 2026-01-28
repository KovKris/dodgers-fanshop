<template>
  <v-app>
    <NavigationBar />
    
    <v-main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
    
    <FooterComponent />
    
    <v-navigation-drawer
      v-model="cartStore.isCartOpen"
      location="right"
      temporary
      width="400"
    >
      <ShoppingCart />
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'
import FooterComponent from './components/FooterComponent.vue'
import ShoppingCart from './components/ShoppingCart.vue'
import { useCartStore } from './stores/cart'

export default {
  name: 'App',
  components: {
    NavigationBar,
    FooterComponent,
    ShoppingCart
  },
  setup() {
    const cartStore = useCartStore()
    
    return {
      cartStore
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
