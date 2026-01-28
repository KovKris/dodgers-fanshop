import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ShopPage from '../views/ShopPage.vue'
import ProductDetail from '../views/ProductDetail.vue'
import AboutPage from '../views/AboutPage.vue'
import ContactPage from '../views/ContactPage.vue'
import CheckoutPage from '../views/CheckoutPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { title: 'Domov - LA Dodgers Fan Shop' }
  },
  {
    path: '/shop',
    name: 'Shop',
    component: ShopPage,
    meta: { title: 'Obchod - LA Dodgers Fan Shop' }
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    meta: { title: 'Produkt - LA Dodgers Fan Shop' },
    props: true
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
    meta: { title: 'O nás - LA Dodgers Fan Shop' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage,
    meta: { title: 'Kontakt - LA Dodgers Fan Shop' }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutPage,
    meta: { title: 'Pokladňa - LA Dodgers Fan Shop' }
  }
]

const router = createRouter({
  history: createWebHistory('/dodgers-fanshop/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'LA Dodgers Fan Shop'
  next()
})

export default router
