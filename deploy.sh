#!/bin/bash

echo "🔄 Début du déploiement..."

# Étape 1 : Pull depuis GitHub
echo "📦 [FRONT] Pull depuis GitHub..."
git pull origin main || { echo "❌ Erreur pull GitHub"; exit 1; }

# Étape 2 : Installer les dépendances
echo "📥 [FRONT] Installation des dépendances..."
npm install || { echo "❌ Erreur npm install"; exit 1; }

# Étape 3 : Build Vite
echo "⚙️ [FRONT] Build production avec Vite..."
npm run build || { echo "❌ Erreur build Vite"; exit 1; }

# Étape 4 : Copier le build dans /var/www/html
echo "🚚 [FRONT] Copie vers /var/www/html..."
rm -rf /var/www/html/*
cp -r dist/* /var/www/html/

# Étape 5 : Redémarrer API avec PM2
echo "🔁 [API] Redémarrage de l'API via PM2..."
cd backend
pm2 restart gendarmerie-api

echo "✅ Déploiement terminé avec succès."
