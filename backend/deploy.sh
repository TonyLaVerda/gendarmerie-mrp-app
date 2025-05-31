#!/bin/bash

echo "🔄 Début du déploiement..."

# Aller à la racine du projet
cd "$(dirname "$0")/.."

# Ajouter tous les fichiers modifiés du projet
echo "📦 Ajout des fichiers modifiés..."
git add .

# Commit avec la date/heure
echo "📝 Commit des modifications..."
git commit -m "🚀 Déploiement automatique du $(date '+%Y-%m-%d %H:%M:%S')"

# Pull avant le push (avec rebase propre)
echo "🔃 Synchronisation avec GitHub (pull)..."
git pull --rebase

# Push vers le repo
echo "🚀 Envoi sur GitHub (push)..."
git push

# Redémarrer uniquement le backend avec PM2
echo "♻️ Redémarrage du serveur backend (PM2)..."
cd backend
pm2 restart gendarmerie-api

echo "✅ Déploiement terminé avec succès."
