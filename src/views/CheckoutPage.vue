<template>
  <v-container class="checkout-page py-8">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 font-weight-bold mb-2">Pokladňa</h1>
        <p class="text-h6 text-grey mb-6">Dokončite vašu objednávku</p>
      </v-col>
    </v-row>

    <v-row v-if="cartStore.items.length > 0">
      <v-col cols="12" md="8">
        <v-card elevation="4" class="pa-6 mb-6">
          <h2 class="text-h5 font-weight-bold mb-4">Dodacie údaje</h2>
          
          <v-form ref="deliveryForm" v-model="deliveryValid">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="delivery.firstName"
                  label="Meno *"
                  :rules="requiredRules"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="delivery.lastName"
                  label="Priezvisko *"
                  :rules="requiredRules"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-text-field
              v-model="delivery.email"
              label="Email *"
              :rules="emailRules"
              variant="outlined"
              type="email"
              class="mb-4"
            ></v-text-field>

            <v-text-field
              v-model="delivery.phone"
              label="Telefón *"
              :rules="requiredRules"
              variant="outlined"
              class="mb-4"
            ></v-text-field>

            <v-text-field
              v-model="delivery.street"
              label="Ulica a číslo domu *"
              :rules="requiredRules"
              variant="outlined"
              class="mb-4"
            ></v-text-field>

            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="delivery.city"
                  label="Mesto *"
                  :rules="requiredRules"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="delivery.zip"
                  label="PSČ *"
                  :rules="requiredRules"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-textarea
              v-model="delivery.note"
              label="Poznámka k objednávke"
              variant="outlined"
              rows="3"
            ></v-textarea>
          </v-form>
        </v-card>

        <v-card elevation="4" class="pa-6">
          <h2 class="text-h5 font-weight-bold mb-4">Spôsob platby</h2>
          
          <v-radio-group v-model="selectedPayment">
            <v-radio
              v-for="payment in paymentMethods"
              :key="payment.value"
              :value="payment.value"
            >
              <template v-slot:label>
                <div class="d-flex align-center">
                  <v-icon :color="payment.color" class="mr-2">{{ payment.icon }}</v-icon>
                  <div>
                    <div class="font-weight-bold">{{ payment.title }}</div>
                    <div class="text-caption">{{ payment.description }}</div>
                  </div>
                </div>
              </template>
            </v-radio>
          </v-radio-group>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card elevation="4" class="pa-6 sticky-card">
          <h2 class="text-h5 font-weight-bold mb-4">Súhrn objednávky</h2>
          
          <v-list>
            <v-list-item
              v-for="item in cartStore.items"
              :key="item.id"
              class="px-0"
            >
              <template v-slot:prepend>
                <v-avatar size="50" rounded>
                  <v-img :src="item.image" :alt="item.name"></v-img>
                </v-avatar>
              </template>

              <v-list-item-title class="font-weight-bold">
                {{ item.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ item.quantity }}x {{ formatPrice(item.price) }}
              </v-list-item-subtitle>

              <template v-slot:append>
                <div class="font-weight-bold">
                  {{ formatPrice(item.price * item.quantity) }}
                </div>
              </template>
            </v-list-item>
          </v-list>

          <v-divider class="my-4"></v-divider>

          <div class="d-flex justify-space-between mb-2">
            <span>Medzisúčet:</span>
            <span>{{ formatPrice(cartStore.totalPrice) }}</span>
          </div>

          <div class="d-flex justify-space-between mb-2">
            <span>Doprava:</span>
            <span>{{ formatPrice(shippingCost) }}</span>
          </div>

          <v-divider class="my-4"></v-divider>

          <div class="d-flex justify-space-between mb-4">
            <span class="text-h6 font-weight-bold">Celkom:</span>
            <span class="text-h6 font-weight-bold primary--text">
              {{ formatPrice(totalWithShipping) }}
            </span>
          </div>

          <v-btn
            block
            color="secondary"
            size="x-large"
            @click="completeOrder"
            :disabled="!deliveryValid"
          >
            Dokončiť objednávku
          </v-btn>

          <v-btn
            block
            variant="text"
            class="mt-2"
            to="/shop"
          >
            Pokračovať v nákupe
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12" class="text-center py-12">
        <v-icon size="64" color="grey">mdi-cart-outline</v-icon>
        <h3 class="text-h5 mt-4">Váš košík je prázdny</h3>
        <p class="text-grey mb-4">Pridajte produkty do košíka pre dokončenie objednávky</p>
        <v-btn color="primary" to="/shop">
          Prejsť do obchodu
        </v-btn>
      </v-col>
    </v-row>

    <!-- Success Dialog -->
    <v-dialog v-model="showSuccess" max-width="600" persistent>
      <v-card>
        <v-card-title class="text-h4 text-center pa-8">
          <v-icon color="success" size="80" class="mb-4">mdi-check-circle</v-icon>
          <div>Objednávka prijatá!</div>
        </v-card-title>
        <v-card-text class="text-center px-8">
          <p class="text-h6 mb-4">Ďakujeme za vašu objednávku!</p>
          <p class="text-body-1 mb-2">Číslo objednávky: <strong>{{ orderNumber }}</strong></p>
          <p class="text-body-1">Potvrdzujúci email bol odoslaný na <strong>{{ delivery.email }}</strong></p>
        </v-card-text>
        <v-card-actions class="pa-6">
          <v-btn color="primary" block @click="closeSuccessDialog" size="large">
            Zavrieť
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'

export default {
  name: 'CheckoutPage',
  setup() {
    const cartStore = useCartStore()
    const router = useRouter()
    
    return {
      cartStore,
      router
    }
  },
  data() {
    return {
      deliveryValid: false,
      showSuccess: false,
      orderNumber: '',
      delivery: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        zip: '',
        note: ''
      },
      selectedPayment: 'card',
      paymentMethods: [
        {
          value: 'card',
          title: 'Platobná karta',
          description: 'Okamžité potvrdenie',
          icon: 'mdi-credit-card',
          color: 'primary'
        },
        {
          value: 'transfer',
          title: 'Bankový prevod',
          description: 'Platba po potvrdení',
          icon: 'mdi-bank',
          color: 'secondary'
        },
        {
          value: 'cod',
          title: 'Dobierka',
          description: 'Platba pri prevzatí',
          icon: 'mdi-cash',
          color: 'accent'
        }
      ],
      requiredRules: [
        v => !!v || 'Toto pole je povinné'
      ],
      emailRules: [
        v => !!v || 'Email je povinný',
        v => /.+@.+\..+/.test(v) || 'Email musí byť platný'
      ],
      shippingCost: 4.99
    }
  },
  computed: {
    totalWithShipping() {
      return this.cartStore.totalPrice + this.shippingCost
    }
  },
  methods: {
    formatPrice(price) {
      return `${price.toFixed(2)} €`
    },
    async completeOrder() {
      const isValid = await this.$refs.deliveryForm.validate()
      
      if (isValid) {
        this.orderNumber = 'DO' + Date.now()
        
        console.log('Order completed:', {
          orderNumber: this.orderNumber,
          delivery: this.delivery,
          payment: this.selectedPayment,
          items: this.cartStore.items,
          total: this.totalWithShipping
        })
        
        this.showSuccess = true
      }
    },
    closeSuccessDialog() {
      this.showSuccess = false
      this.cartStore.clearCart()
      this.router.push('/')
    }
  }
}
</script>

<style scoped>
.sticky-card {
  position: sticky;
  top: 80px;
}
</style>
