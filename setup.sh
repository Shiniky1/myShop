#!/bin/bash

# Pasul 1: Inițializare proiect Node.js
git init
npm init -y

# Pasul 2: Instalare Webpack
npm install webpack webpack-cli --save-dev

# Pasul 3: Instalare module necesare
npm i html-webpack-plugin --save-dev
npm i copy-webpack-plugin mini-css-extract-plugin autoprefixer css-loader
npm i postcss-loader sass sass-loader style-loader --save-dev
npm i babel-loader
npm i bootstrap bootstrap-icons jquery @popperjs/core --save


# Creează directorul pentru fonturi dacă nu există
mkdir -p src/assets/scss/fonts

# Copiază fișierele fonturilor din CDN
curl -o src/assets/scss/fonts/bootstrap-icons.woff https://cdn.jsdelivr.net/npm/bootstrap-icons/font/fonts/bootstrap-icons.woff
curl -o src/assets/scss/fonts/bootstrap-icons.woff2 https://cdn.jsdelivr.net/npm/bootstrap-icons/font/fonts/bootstrap-icons.woff2
curl -o src/assets/scss/fonts/bootstrap-icons.ttf https://cdn.jsdelivr.net/npm/bootstrap-icons/font/fonts/bootstrap-icons.ttf
curl -o src/assets/scss/fonts/bootstrap-icons.svg https://cdn.jsdelivr.net/npm/bootstrap-icons/font/fonts/bootstrap-icons.svg
# Pasul 4: Creare directoare
mkdir -p dist src src/assets src/js src/assets/scss src/assets/images
mkdir -p src/js/components src/js/contexts

# Pasul 5: Creare fișiere
touch src/index.html src/index.js src/about.js src/js/main.js src/assets/scss/styles.scss webpack.config.js
touch src/js/components/Component.js src/js/components/App.js src/js/components/About.js src/js/components/CartItem.js
touch src/js/components/CartList.js src/js/components/Footer.js src/js/components/Header.js
touch src/js/components/ProductItem.js src/js/components/ProductList.js
touch src/js/contexts/CartContext.js

# Pasul 6: Configurare Git (dacă este necesar)
touch .gitignore
echo "node_modules/" >> .gitignore
git rm -r --cached node_modules

# Pasul 7: Adăugare scripturi în package.json
echo 'Adaugă manual scripturile în package.json:
"scripts": {
  "dev": "webpack build --mode=development",
  "build": "webpack build --mode=production",
  "test": "echo \"Error: no test specified\" && exit 1"
}'