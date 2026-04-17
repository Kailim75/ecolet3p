# Runbook — Rotation des clés Supabase

**Contexte** — Le fichier `.env` a été committé dans l'historique Git (premier commit `f9c8db0` par gpt-engineer-app[bot]). Les clés exposées sont la `anon/publishable` key et l'URL du projet (deux informations publiques par design côté Supabase), mais par hygiène nous devons :

1. Retirer `.env` de l'index Git à venir (déjà fait dans `.gitignore` + création de `.env.example`).
2. Rotater la clé publishable.
3. Vérifier que la `service_role` key n'a **jamais** été committée.
4. Purger optionnellement `.env` de l'historique.

> ⚠️ Aucune des étapes ci-dessous n'a été exécutée automatiquement : elles nécessitent un accès au dashboard Supabase et/ou des opérations destructives sur l'historique Git. À faire manuellement par Karim.

---

## 1. Vérifier les fuites dans l'historique

```bash
# Lister tous les fichiers .env ayant existé dans le repo
git log --all --full-history --source -- .env .env.* | head -40

# Rechercher la présence accidentelle de `service_role` dans tout l'historique
git log --all -p -S "service_role" -- . | head -80

# Rechercher toute JWT Supabase dans l'historique
git log --all -p -S "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" -- . | head -40
```

Résultat attendu : seules les clés **anon/publishable** doivent apparaître. Si une clé `service_role` apparaît, **stop everything** et rotater immédiatement.

## 2. Retirer `.env` du tracking (sans perdre le fichier local)

```bash
git rm --cached .env
git commit -m "chore(security): stop tracking .env, add .env.example template"
git push
```

## 3. Rotater la clé Supabase anon/publishable

Dashboard Supabase → Project Settings → API → "Project API keys" → **Reset anon public key**.

Puis mettre à jour :
- `.env` local
- Variables d'environnement sur l'hébergeur de prod (Lovable / Vercel / autre)
- GitHub Secrets si utilisés en CI

## 4. (Optionnel mais recommandé) Purger `.env` de l'historique

⚠️ **Destructif : réécrit l'historique, invalide les forks/PR ouvertes.**

```bash
# Option moderne recommandée : git-filter-repo
brew install git-filter-repo
git filter-repo --path .env --invert-paths
git push --force-with-lease origin main
```

Prévenir tous les collaborateurs de ré-cloner.

## 5. Ajouter un garde-fou pré-commit

```bash
# Installer gitleaks ou husky + gitleaks pour bloquer tout nouveau commit .env
brew install gitleaks
gitleaks detect --source . --verbose
```

Ajouter un pre-commit hook `.husky/pre-commit` :
```sh
#!/usr/bin/env sh
gitleaks protect --staged --verbose --redact
```

## 6. Checklist finale

- [ ] `.env` absent de `git ls-files` (`git ls-files | grep env`)
- [ ] Clé anon rotée côté Supabase
- [ ] Nouvelle clé déployée en prod
- [ ] Aucune occurrence de `service_role` dans `git log --all -p`
- [ ] `gitleaks detect` renvoie 0 leaks
- [ ] Collaborateurs prévenus si l'historique a été purgé
