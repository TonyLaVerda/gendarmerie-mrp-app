#!/bin/bash

echo "🚀 Déploiement complet de l'application Gendarmerie RP..."

# Étape 1 : Se placer à la racine du projet
cd "$(dirname "$0")" || exit 1

# Étape 2 : Synchronisation avec GitHub
echo "📦 Pull depuis GitHub..."
git add .
git commit -m "💾 Sauvegarde temporaire avant pull" || true
git pull origin main --rebase || exit 1

# Étape 3 : Build frontend
echo "🛠️ Build du frontend..."
cd gendarmerie-mrp-app || exit 1
npm install
npm run build || exit 1
cd ..

# Étape 4 : Redémarrage du backend
echo "♻️ Redémarrage du backend avec PM2..."
cd backend || exit 1
npm install
pm2 restart gendarmerie-api || exit 1
cd ..

# Étape 5 : Lancement ou redémarrage du serveur frontend (Express)
echo "🚀 Lancement du frontend avec PM2..."
pm2 start frontend-server.js --name gendarmerie-frontend || pm2 restart gendarmerie-frontend

echo "✅ Déploiement terminé avec succès."
