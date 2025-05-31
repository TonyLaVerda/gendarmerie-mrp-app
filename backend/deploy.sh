#!/bin/bash

echo "🔄 Déploiement en cours..."

# Naviguer dans le dossier backend
cd "$(dirname "$0")"

# 1. Pull les dernières modifications
echo "📦 Pull depuis GitHub..."
git pull origin main

# 2. Installer les dépendances si besoin
echo "📦 Installation des dépendances..."
npm install

# 3. Redémarrage de l'API avec PM2 et variables d'env
echo "🚀 Redémarrage de l'API..."
pm2 restart gendarmerie-api --update-env

echo "✅ Déploiement terminé."
