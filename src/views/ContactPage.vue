<template>
  <div class="contact-page">
    <v-container fluid class="hero-section primary pa-0">
      <v-row align="center" justify="center" class="pa-8">
        <v-col cols="12" class="text-center">
          <h1 class="text-h2 font-weight-bold white--text mb-4">
            Kontaktujte nás
          </h1>
          <p class="text-h5 white--text">
            Sme tu pre vás
          </p>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="py-12">
      <v-row>
        <v-col cols="12" md="6">
          <v-card elevation="4" class="pa-6">
            <h2 class="text-h4 font-weight-bold mb-6">Kontaktný formulár</h2>
            
            <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
              <v-text-field
                v-model="form.name"
                label="Meno a priezvisko *"
                :rules="nameRules"
                variant="outlined"
                class="mb-4"
              ></v-text-field>

              <v-text-field
                v-model="form.email"
                label="Email *"
                :rules="emailRules"
                variant="outlined"
                type="email"
                class="mb-4"
              ></v-text-field>

              <v-text-field
                v-model="form.phone"
                label="Telefón"
                variant="outlined"
                class="mb-4"
              ></v-text-field>

              <v-select
                v-model="form.subject"
                :items="subjects"
                label="Predmet *"
                :rules="subjectRules"
                variant="outlined"
                class="mb-4"
              ></v-select>

              <v-textarea
                v-model="form.message"
                label="Správa *"
                :rules="messageRules"
                variant="outlined"
                rows="5"
                class="mb-4"
              ></v-textarea>

              <v-btn
                type="submit"
                color="secondary"
                size="large"
                block
                :disabled="!valid"
              >
                Odoslať správu
              </v-btn>
            </v-form>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card elevation="4" class="pa-6 mb-6">
            <h2 class="text-h4 font-weight-bold mb-6">Kontaktné informácie</h2>
            
            <v-list>
              <v-list-item
                v-for="(info, index) in contactInfo"
                :key="index"
                class="mb-2"
              >
                <template v-slot:prepend>
                  <v-icon :color="info.color" size="large">{{ info.icon }}</v-icon>
                </template>
                <v-list-item-title class="font-weight-bold">
                  {{ info.title }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ info.value }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>

          <v-card elevation="4" class="pa-6">
            <h2 class="text-h5 font-weight-bold mb-4">Otváracie hodiny</h2>
            <v-list density="compact">
              <v-list-item
                v-for="(day, index) in openingHours"
                :key="index"
              >
                <template v-slot:prepend>
                  <v-icon size="small">mdi-clock-outline</v-icon>
                </template>
                <v-list-item-title>
                  {{ day.day }}: {{ day.hours }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-8">
        <v-col cols="12">
          <v-card elevation="4" color="grey lighten-5" class="pa-8">
            <h2 class="text-h4 font-weight-bold text-center mb-4">Často kladené otázky</h2>
            <v-expansion-panels>
              <v-expansion-panel
                v-for="(faq, index) in faqs"
                :key="index"
              >
                <v-expansion-panel-title class="font-weight-bold">
                  {{ faq.question }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  {{ faq.answer }}
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Success Dialog -->
    <v-dialog v-model="showSuccess" max-width="500">
      <v-card>
        <v-card-title class="text-h5 text-center pa-6">
          <v-icon color="success" size="64" class="mb-4">mdi-check-circle</v-icon>
          <div>Správa odoslaná!</div>
        </v-card-title>
        <v-card-text class="text-center">
          Ďakujeme za vašu správu. Ozveme sa vám čo najskôr.
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="showSuccess = false">
            Zavrieť
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ContactPage',
  data() {
    return {
      valid: false,
      showSuccess: false,
      form: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      },
      nameRules: [
        v => !!v || 'Meno je povinné',
        v => (v && v.length >= 3) || 'Meno musí mať aspoň 3 znaky'
      ],
      emailRules: [
        v => !!v || 'Email je povinný',
        v => /.+@.+\..+/.test(v) || 'Email musí byť platný'
      ],
      subjectRules: [
        v => !!v || 'Predmet je povinný'
      ],
      messageRules: [
        v => !!v || 'Správa je povinná',
        v => (v && v.length >= 10) || 'Správa musí mať aspoň 10 znakov'
      ],
      subjects: [
        'Otázka o produkte',
        'Stav objednávky',
        'Vrátenie tovaru',
        'Technická podpora',
        'Iné'
      ],
      contactInfo: [
        {
          icon: 'mdi-map-marker',
          color: 'primary',
          title: 'Adresa',
          value: 'Slovenská 123, 949 01 Nitra, Slovensko'
        },
        {
          icon: 'mdi-phone',
          color: 'secondary',
          title: 'Telefón',
          value: '+421 123 456 789'
        },
        {
          icon: 'mdi-email',
          color: 'accent',
          title: 'Email',
          value: 'info@dodgersfanshop.sk'
        },
        {
          icon: 'mdi-web',
          color: 'primary',
          title: 'Web',
          value: 'www.dodgersfanshop.sk'
        }
      ],
      openingHours: [
        { day: 'Pondelok - Piatok', hours: '9:00 - 18:00' },
        { day: 'Sobota', hours: '10:00 - 14:00' },
        { day: 'Nedeľa', hours: 'Zatvorené' }
      ],
      faqs: [
        {
          question: 'Ako dlho trvá doručenie?',
          answer: 'Štandardné doručenie trvá 3-5 pracovných dní. Expresné doručenie je dostupné za príplatok.'
        },
        {
          question: 'Aké sú možnosti platby?',
          answer: 'Akceptujeme platby kartou, bankovým prevodom a na dobierku.'
        },
        {
          question: 'Môžem vrátiť tovar?',
          answer: 'Áno, máte 30 dní na vrátenie tovaru v pôvodnom stave.'
        },
        {
          question: 'Sú produkty originálne?',
          answer: 'Áno, všetky naše produkty sú oficiálne licencované MLB a LA Dodgers.'
        }
      ]
    }
  },
  methods: {
    async submitForm() {
      if (this.valid) {
        await this.$refs.form.validate()
        
        console.log('Form submitted:', this.form)
        
        this.showSuccess = true
        
        this.$refs.form.reset()
        this.form = {
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        }
      }
    }
  }
}
</script>

<style scoped>
.hero-section {
  min-height: 300px;
  background: linear-gradient(135deg, #005A9C 0%, #003D7A 100%);
}
</style>
