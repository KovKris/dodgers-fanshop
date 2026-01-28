<template>
  <v-footer color="primary" dark class="pa-6">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <h3 class="mb-3">LA Dodgers Fan Shop</h3>
          <p>Oficiálny fanúšikovský obchod s licencovanými produktmi LA Dodgers.</p>
        </v-col>
        
        <v-col cols="12" md="4">
          <h3 class="mb-3">Rýchle odkazy</h3>
          <v-list color="transparent" dense>
            <v-list-item
              v-for="link in quickLinks"
              :key="link.path"
              :to="link.path"
              class="px-0"
            >
              {{ link.title }}
            </v-list-item>
          </v-list>
        </v-col>
        
        <v-col cols="12" md="4">
          <h3 class="mb-3">Sledujte nás</h3>
          <div class="d-flex">
            <v-btn
              v-for="social in socialLinks"
              :key="social.icon"
              :icon="social.icon"
              :href="social.url"
              target="_blank"
              class="mr-2"
              size="small"
            ></v-btn>
          </div>
        </v-col>
      </v-row>
      
      <v-divider class="my-4"></v-divider>
      
      <v-row>
        <v-col cols="12" class="text-center">
          <p class="mb-0">
            © {{ currentYear }} LA Dodgers Fan Shop. Všetky práva vyhradené.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  data() {
    return {
      currentYear: new Date().getFullYear(),
      quickLinks: [
        { title: 'Domov', path: '/' },
        { title: 'Obchod', path: '/shop' },
        { title: 'O nás', path: '/about' },
        { title: 'Kontakt', path: '/contact' }
      ],
      socialLinks: [
        { icon: 'mdi-facebook', url: 'https://facebook.com' },
        { icon: 'mdi-twitter', url: 'https://twitter.com' },
        { icon: 'mdi-instagram', url: 'https://instagram.com' },
        { icon: 'mdi-youtube', url: 'https://youtube.com' }
      ]
    }
  }
}
</script>
