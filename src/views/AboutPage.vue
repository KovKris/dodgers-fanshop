<template>
  <div class="about-page">
    <v-container fluid class="hero-section primary pa-0">
      <v-row align="center" justify="center" class="pa-8">
        <v-col cols="12" class="text-center">
          <h1 class="text-h2 font-weight-bold white--text mb-4">
            O nás
          </h1>
          <p class="text-h5 white--text">
            Váš dôveryhodný zdroj LA Dodgers produktov
          </p>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="py-12">
      <v-row>
        <v-col cols="12" md="6">
          <v-card elevation="4" class="pa-6">
            <h2 class="text-h4 font-weight-bold mb-4">Naša história</h2>
            <p class="text-body-1 mb-4">
              LA Dodgers Fan Shop bol založený v roku 2010 s cieľom priniesť fanúšikom LA Dodgers 
              najkvalitnejšie oficiálne licencované produkty. Za tie roky sme vybudovali silnú komunitu 
              verných zákazníkov po celom Slovensku.
            </p>
            <p class="text-body-1 mb-4">
              Naša vízia je byť najlepším miestom pre fanúšikov LA Dodgers, kde nájdu všetko od dresov 
              až po doplnky. Sme hrdí na to, že môžeme slúžiť našej komunite a prinášať im produkty, 
              ktoré milujú.
            </p>
            <p class="text-body-1">
              Všetky naše produkty sú oficiálne licencované MLB a LA Dodgers, čo zaručuje ich autenticitu 
              a kvalitu. Veríme, že naši zákazníci si zaslúžia len to najlepšie.
            </p>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card elevation="4" class="pa-6">
            <h2 class="text-h4 font-weight-bold mb-4">Prečo si vybrať nás?</h2>
            <v-list>
              <v-list-item
                v-for="(reason, index) in reasons"
                :key="index"
                class="mb-2"
              >
                <template v-slot:prepend>
                  <v-icon color="primary" size="large">{{ reason.icon }}</v-icon>
                </template>
                <v-list-item-title class="font-weight-bold">
                  {{ reason.title }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ reason.description }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-8">
        <v-col cols="12">
          <v-card elevation="4" color="grey lighten-5" class="pa-8">
            <h2 class="text-h4 font-weight-bold text-center mb-6">Naše hodnoty</h2>
            <v-row>
              <v-col
                v-for="(value, index) in values"
                :key="index"
                cols="12"
                md="4"
              >
                <div class="text-center">
                  <v-icon :color="value.color" size="64">{{ value.icon }}</v-icon>
                  <h3 class="text-h5 font-weight-bold my-4">{{ value.title }}</h3>
                  <p class="text-body-1">{{ value.description }}</p>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-8">
        <v-col cols="12" class="text-center">
          <h2 class="text-h4 font-weight-bold mb-4">Pripojte sa k našej komunite</h2>
          <p class="text-h6 text-grey mb-6">
            Staňte sa súčasťou rodiny LA Dodgers fanúšikov
          </p>
          <v-btn
            color="secondary"
            size="x-large"
            to="/shop"
          >
            Začať nakupovať
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  data() {
    return {
      reasons: [
        {
          icon: 'mdi-certificate',
          title: 'Oficiálne licencované produkty',
          description: 'Všetky naše produkty sú oficiálne schválené MLB a LA Dodgers.'
        },
        {
          icon: 'mdi-truck-delivery',
          title: 'Rýchle doručenie',
          description: 'Doručujeme do 3-5 pracovných dní po celom Slovensku.'
        },
        {
          icon: 'mdi-shield-check',
          title: 'Bezpečné platby',
          description: 'Vaše transakcie sú u nás v bezpečí.'
        },
        {
          icon: 'mdi-headset',
          title: 'Zákaznícka podpora',
          description: 'Náš tím je tu pre vás každý deň.'
        },
        {
          icon: 'mdi-sync',
          title: 'Jednoduché vrátenie',
          description: '30-dňová záruka vrátenia peňazí.'
        },
        {
          icon: 'mdi-star',
          title: 'Overená kvalita',
          description: 'Tisíce spokojných zákazníkov po celom Slovensku.'
        }
      ],
      values: [
        {
          icon: 'mdi-heart',
          color: 'secondary',
          title: 'Vášeň',
          description: 'Milujeme baseball a LA Dodgers rovnako ako vy.'
        },
        {
          icon: 'mdi-quality-high',
          color: 'primary',
          title: 'Kvalita',
          description: 'Ponúkame len produkty najvyššej kvality.'
        },
        {
          icon: 'mdi-account-group',
          color: 'accent',
          title: 'Komunita',
          description: 'Budujeme silnú komunitu fanúšikov LA Dodgers.'
        }
      ]
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
