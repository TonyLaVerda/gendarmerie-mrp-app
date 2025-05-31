#!/bin/bash

echo "🔄 Début du déploiement..."

# Étape 1 : Ajout des fichiers modifiés (tout le projet)
git add .

# Étape 2 : Commit avec horodatage
git commit -m "Déploiement automatique du $(date '+%Y-%m-%d %H:%M:%S')"

# Étape 3 : Pull (synchronisation)
echo "🔃 Synchronisation avec GitHub (pull)..."
git pull --rebase

# Étape 4 : Push vers GitHub
echo "🚀 Envoi sur GitHub (push)..."
git push

# Étape 5 : Redémarrage backend uniquement
echo "♻️ Redémarrage du serveur backend (PM2)..."
cd backend
pm2 restart gendarmerie-api --update-env

echo "✅ Déploiement terminé avec succès."
