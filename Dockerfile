# Étape 1 : base de l'image
FROM node:20

# Étape 2 : créer le répertoire de travail
WORKDIR /app

# Étape 3 : copier les fichiers de ton projet
COPY package*.json ./
RUN npm install

# Étape 4 : copier le reste des fichiers
COPY . .
RUN npm run build

# Étape 5 : exposer le port utilisé par l'app
EXPOSE 3000

# Étape 6 : commande de lancement
CMD ["npm", "start"]