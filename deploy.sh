#!/bin/bash

echo "🔄 Début du déploiement..."

# Aller à la racine du projet
cd ~/gendarmerie-mrp-app/gendarmerie-mrp-app || exit

# Étape 1 : Ajouter tous les fichiers (tracked + untracked)
git add .

# Étape 2 : Commit avec un message standard
git commit -m "🔁 MàJ auto via deploy.sh"

# Étape 3 : Pull avec rebase pour éviter les conflits
git pull --rebase origin main

# Étape 4 : Push vers GitHub
git push origin main

# Étape 5 : Redémarrer l’API avec les dernières variables d'environnement
pm2 restart gendarmerie-api --update-env

echo "✅ Déploiement terminé avec succès."

