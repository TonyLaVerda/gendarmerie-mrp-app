#!/bin/bash

<<<<<<< HEAD
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
=======
echo "🚀 Déploiement de l'application Gendarmerie RP..."

# Aller à la racine backend
cd "$(dirname "$0")/backend" || exit 1

# Pull dernière version depuis GitHub
echo "📦 Mise à jour du code depuis GitHub..."
git pull origin main || exit 1

# Installer les dépendances si besoin
echo "📦 Installation des dépendances npm..."
npm install || exit 1

# Redémarrage via PM2
echo "🔁 Redémarrage de l'API avec PM2..."
pm2 restart gendarmerie-api || exit 1

echo "✅ Déploiement terminé avec succès !"
>>>>>>> 88d47a9 (💾 Sauvegarde temporaire avant pull)
