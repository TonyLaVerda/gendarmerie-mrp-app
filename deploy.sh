#!/bin/bash

echo "🔄 Début du déploiement..."

cd ~/gendarmerie-mrp-app/gendarmerie-mrp-app || exit

# Étape 1 : Ajout des modifications
echo "📦 Ajout des fichiers modifiés..."
git add .

# Étape 2 : Commit avec message automatique horodaté
echo "📝 Commit des modifications..."
git commit -m "Déploiement automatique du $(date '+%Y-%m-%d %H:%M:%S')"

# Étape 3 : Pull pour éviter les conflits
echo "🔃 Synchronisation avec GitHub (pull)..."
git pull --rebase origin main

# Étape 4 : Push des changements
echo "🚀 Envoi sur GitHub (push)..."
git push origin main

# Étape 5 : Redémarrage de l’API backend
echo "♻️ Redémarrage du serveur backend (PM2)..."
pm2 restart gendarmerie-api --update-env

echo "✅ Déploiement terminé avec succès."
