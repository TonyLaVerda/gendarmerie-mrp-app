#!/bin/bash

echo "🔄 Déploiement complet de l'application Gendarmerie MRP..."

# Étape 1 : Ajout des fichiers modifiés (frontend + backend)
git add .

# Étape 2 : Commit avec timestamp
git commit -m "🚀 Déploiement complet du $(date '+%Y-%m-%d %H:%M:%S')"

# Étape 3 : Pull pour synchronisation
echo "🔃 Synchronisation avec GitHub (pull)..."
git pull origin main --rebase

# Étape 4 : Push vers GitHub
echo "🚀 Envoi sur GitHub (push)..."
git push origin main

# Étape 5 : Build du frontend (avec Vite)
echo "🏗️ Construction du frontend (npm run build)..."
npm install
npm run build

# Étape 6 : Redémarrage backend avec les bonnes variables d'env
echo "♻️ Redémarrage du backend avec PM2..."
cd backend
pm2 restart gendarmerie-api --update-env

echo "✅ Déploiement terminé avec succès."
