#!/bin/bash

echo "🚀 Début du déploiement final..."

# 1. Nettoyage ESLint + Correction OpenAI + Clean returns + Build
echo "🛠️ Lancement de fix-final.sh pour nettoyage et build..."
./fix-final.sh

if [ $? -ne 0 ]; then
  echo "❌ Build échoué, déploiement arrêté."
  exit 1
fi

# 2. Commit des changements
echo "📝 Ajout et commit des changements..."
git add .
git commit -m "chore: final deploy - clean + build ok"

# 3. Push sur GitHub
echo "📤 Pushing vers GitHub..."
git push

echo "🎯 Push terminé, Vercel va détecter le push et relancer automatiquement un build de déploiement."

echo "✅ Déploiement complet terminé !"
