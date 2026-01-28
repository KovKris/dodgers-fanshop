import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [
      {
        id: 1,
        name: 'Dodgers Home Jersey',
        category: 'Dresy',
        price: 89.99,
        image: '/dodgers-fanshop/home-jersey.png',
        description: 'Oficiálny domáci dres LA Dodgers s autentickým dizajnom a vysokou kvalitou materiálu.',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        inStock: true,
        featured: true
      },
      {
        id: 2,
        name: 'Dodgers Away Jersey',
        category: 'Dresy',
        price: 89.99,
        image: '/dodgers-fanshop/away-jersey.png',
        description: 'Oficiálny hosťujúci dres LA Dodgers v šedej farbe.',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        inStock: true,
        featured: true
      },
      {
        id: 3,
        name: 'Dodgers Baseball Cap',
        category: 'Čiapky',
        price: 34.99,
        image: '/dodgers-fanshop/cap.png',
        description: 'Klasická baseballová šiltovka s logom LA Dodgers.',
        sizes: ['One Size'],
        inStock: true,
        featured: true
      },
      {
        id: 4,
        name: 'Dodgers T-Shirt',
        category: 'Tričká',
        price: 29.99,
        image: '/dodgers-fanshop/t-shirt.png',
        description: 'Pohodlné bavlnené tričko s logom LA Dodgers.',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        inStock: true,
        featured: false
      },
      {
        id: 5,
        name: 'Dodgers Hoodie',
        category: 'Mikiny',
        price: 64.99,
        image: '/dodgers-fanshop/hoodie.png',
        description: 'Teplá mikina s kapucňou a logom LA Dodgers.',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        inStock: true,
        featured: true
      },
      {
        id: 6,
        name: 'Dodgers Jacket',
        category: 'Bundy',
        price: 99.99,
        image: '/dodgers-fanshop/jacket.png',
        description: 'Štýlová bunda LA Dodgers pre chladnejšie dni.',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        inStock: true,
        featured: false
      },
      {
        id: 7,
        name: 'Dodgers Beanie',
        category: 'Čiapky',
        price: 24.99,
        image: '/dodgers-fanshop/beanie.png',
        description: 'Zimná čiapka s logom LA Dodgers.',
        sizes: ['One Size'],
        inStock: true,
        featured: false
      },
      {
        id: 8,
        name: 'Dodgers Scarf',
        category: 'Doplnky',
        price: 19.99,
        image: '/dodgers-fanshop/scarf.png',
        description: 'Fanúšikovská šál LA Dodgers.',
        sizes: ['One Size'],
        inStock: true,
        featured: false
      },
      {
        id: 9,
        name: 'Dodgers Baseball',
        category: 'Doplnky',
        price: 14.99,
        image: '/dodgers-fanshop/baseball.png',
        description: 'Oficiálna baseballová lopta s logom LA Dodgers.',
        sizes: ['One Size'],
        inStock: true,
        featured: false
      },
      {
        id: 10,
        name: 'Dodgers Backpack',
        category: 'Doplnky',
        price: 49.99,
        image: '/dodgers-fanshop/backpack.png',
        description: 'Praktický batoh s logom LA Dodgers.',
        sizes: ['One Size'],
        inStock: true,
        featured: false
      },
      {
        id: 11,
        name: 'Dodgers Socks',
        category: 'Doplnky',
        price: 12.99,
        image: '/dodgers-fanshop/socks.png',
        description: 'Set 3 párov ponožiek s logom LA Dodgers.',
        sizes: ['S', 'M', 'L'],
        inStock: true,
        featured: false
      },
      {
        id: 12,
        name: 'Dodgers Mug',
        category: 'Doplnky',
        price: 16.99,
        image: '/dodgers-fanshop/mug.png',
        description: 'Keramický hrnček s logom LA Dodgers.',
        sizes: ['One Size'],
        inStock: false,
        featured: false
      }
    ],
    selectedCategory: 'Všetky',
    searchQuery: ''
  }),
  
  getters: {
    filteredProducts: (state) => {
      let filtered = state.products
      
      if (state.selectedCategory !== 'Všetky') {
        filtered = filtered.filter(p => p.category === state.selectedCategory)
      }
      
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase()
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
        )
      }
      
      return filtered
    },
    
    featuredProducts: (state) => {
      return state.products.filter(p => p.featured)
    },
    
    categories: (state) => {
      const cats = new Set(state.products.map(p => p.category))
      return ['Všetky', ...Array.from(cats)]
    },
    
    getProductById: (state) => {
      return (id) => state.products.find(p => p.id === parseInt(id))
    }
  },
  
  actions: {
    setCategory(category) {
      this.selectedCategory = category
    },
    
    setSearchQuery(query) {
      this.searchQuery = query
    },
    
    clearFilters() {
      this.selectedCategory = 'Všetky'
      this.searchQuery = ''
    }
  }
})
