#!/bin/bash
echo "🔄 Début du déploiement..."

# Aller à la racine du projet
cd "$(dirname "$0")/.."

echo "📦 Ajout des fichiers modifiés..."
git add .

echo "📝 Commit des modifications..."
git commit -m "Déploiement automatique du $(date '+%Y-%m-%d %H:%M:%S')"

echo "🔃 Synchronisation avec GitHub (pull)..."
git pull --rebase

echo "🚀 Envoi sur GitHub (push)..."
git push

echo "♻️ Redémarrage du serveur backend (PM2)..."
cd backend
pm2 restart gendarmerie-api --update-env

echo "✅ Déploiement terminé avec succès."
