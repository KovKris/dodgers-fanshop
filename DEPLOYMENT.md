# Návod na nasadenie na GitHub Pages

## Krok 1: Vytvorenie GitHub repozitára

1. Vytvorte nový repozitár na GitHub.com
2. Pomenujte ho napríklad `dodgers-fanshop`
3. Nastavte ho ako verejný (Public)

## Krok 2: Inicializácia Git lokálne

```bash
cd dodgers-fanshop
git init
git add .
git commit -m "Initial commit - LA Dodgers Fan Shop"
```

## Krok 3: Pripojenie na GitHub

```bash
git remote add origin https://github.com/[your-username]/dodgers-fanshop.git
git branch -M main
git push -u origin main
```

## Krok 4: Nastavenie GitHub Pages

1. Choďte na váš repozitár na GitHub
2. Kliknite na **Settings** (Nastavenia)
3. V ľavom menu nájdite **Pages**
4. V sekcii **Build and deployment**:
   - Source: **GitHub Actions**

## Krok 5: Automatické nasadenie

Po nastavení GitHub Actions sa stránka automaticky nasadí pri každom push do main branch.

1. GitHub Actions workflow sa automaticky spustí
2. Aplikácia sa zbuilduje
3. Automaticky sa nasadí na GitHub Pages

Vaša stránka bude dostupná na:
```
https://[your-username].github.io/dodgers-fanshop/
```

## Aktualizácia vite.config.js

Uistite sa, že v `vite.config.js` je správne nastavený `base`:

```javascript
export default defineConfig({
  base: '/dodgers-fanshop/', // názov vášho repozitára
  // ...
})
```

## Alternatívne: Manuálne nasadenie

Ak nechcete použiť GitHub Actions, môžete nasadiť manuálne:

```bash
# Build projektu
npm run build

# Nasadenie pomocou gh-pages
npm install -g gh-pages
gh-pages -d dist
```

## Riešenie problémov

### Stránka sa nezobrazuje správne
- Skontrolujte `base` v `vite.config.js`
- Skontrolujte `history` mód v `router/index.js`

### 404 pri refresh stránky
- GitHub Pages nepodporuje SPA routing
- Riešenie: použite hash router alebo custom 404 handling

### Build zlyhá
- Skontrolujte Node.js verziu (vyžaduje sa 18+)
- Skúste vymazať `node_modules` a `package-lock.json` a znovu nainštalovať

## Overenie nasadenia

1. Otvorte váš repozitár na GitHub
2. Kliknite na **Actions** tab
3. Mali by ste vidieť workflow "Deploy to GitHub Pages"
4. Po úspešnom dokončení kliknite na **Deployments** v pravom bočnom paneli
5. Kliknite na "github-pages" pre zobrazenie URL

## Poznámky

- Pri každom push do main branch sa automaticky spustí nové nasadenie
- Deployment trvá zvyčajne 1-3 minúty
- Zmeny sa prejavia okamžite po dokončení deploymentu
