# Structure du projet LaCitadelle

## 1. Présentation

LaCitadelle est un site statique construit principalement avec des pages HTML, des feuilles CSS, du JavaScript et des médias locaux (audio, vidéo et images). Les pages sont reliées entre elles par des liens HTML classiques. Le projet ne présente pas de configuration de compilation ou de gestionnaire de dépendances à sa racine : il peut être hébergé comme un site statique.

## 2. Arborescence fonctionnelle

```text
laCitadelle/
├── index.html                  # Accueil : radio et messages récents
├── jeux.html                   # Entrée vers les jeux
├── themes.html                 # Index des enseignements par thème
├── audios.html                 # Choix d'une année d'archives audio
├── audios_2022.html            # Archives audio 2022
├── audios_2023.html            # Archives audio 2023
├── audios_2024.html            # Archives audio 2024
├── audios_2025.html            # Liste de thèmes/messages 2025
├── audios_2026.html            # Liste de thèmes/messages 2026
├── videos.html                 # Entrée vers les albums vidéo
├── piano.html                  # Piano interactif principal
├── pianoExpert.html            # Page piano complémentaire
├── pianoForrm.html             # Page/formulaire piano
├── qu-aurai-fait-Jésus.html    # Page vidéo à la racine
├── amour-parfait.html          # Page vidéo à la racine
├── triaining.html              # Page d'entraînement aux cartes
│
├── album/                      # Lecteurs et contenus vidéo par album
│   ├── amour-parfait.html
│   ├── qu-aurai-fait-Jésus.html
│   └── triaining.html
├── audio/                      # Fichiers audio, essentiellement MP3/WAV
│   ├── imagesMMCJ/
│   └── traitement/
├── css/                        # Styles principaux du site
│   ├── style.css
│   ├── styleCartes.css
│   ├── styleList.css
│   ├── stylePiano.css
│   └── stylePlaylist.css
├── image/                      # Pochettes et autres images du site
│   └── css/                     # Copie/ancienne variante de feuilles CSS
├── imagePiano/                 # Images du piano (mains, etc.)
├── imagesMMCJ/                 # Images des cartes des jeux
├── jeux/                       # Pages interactives des jeux
│   ├── questionsorales.html
│   └── versetsbiblique.html
├── pianoDataSet/               # Sons préenregistrés du piano
├── pipe/                       # Ressources complémentaires (dont imagesMMCJ)
├── script/                     # Scripts du site et du piano
│   ├── script.js
│   ├── scriptcartes.js
│   ├── scriptPiano.js
│   ├── scriptPiano1.js
│   ├── scriptPiano3.js
│   ├── scriptPianoDataSet.js
│   ├── scriptPlaylist.js
│   ├── Folder/
│   └── module/
│       ├── musique.js
│       └── musique1.js
├── theme/                      # Pages de contenu/thèmes
├── theme2026/                  # Thèmes et messages 2026
└── videos/                     # Fichiers vidéo
```

Cette arborescence résume les dossiers fonctionnels. Des fichiers de contenu supplémentaires existent dans `theme/`, `audio/`, `image/`, `videos/` et d'autres répertoires ; il faut les conserver lorsqu'ils sont référencés par les pages.

## 3. Organisation des pages

- **Accueil** : `index.html` présente la radio et des messages récents.
- **Navigation principale** : les pages d'index `jeux.html`, `themes.html`, `audios.html` et `videos.html` exposent les sous-sections. Le menu commun pointe aussi vers `piano.html`.
- **Archives audio** : `audios.html` renvoie vers les pages annuelles. Les pages 2022–2024 regroupent les enregistrements par mois; les pages 2025–2026 listent surtout des enseignements et des thèmes.
- **Thèmes** : `themes.html` renvoie vers les pages HTML de `theme/`. Les contenus 2026 se trouvent dans `theme2026/` et sont référencés depuis `audios_2026.html`.
- **Jeux** : `jeux.html` renvoie vers les jeux de cartes bibliques dans `jeux/`. Ces pages utilisent les images de `imagesMMCJ/` et intègrent leur logique JavaScript dans la page.
- **Albums vidéo** : `videos.html` renvoie vers les pages de `album/`; les fichiers vidéo sont dans `videos/`.
- **Piano** : `piano.html` contient l'interface du clavier et charge `script/scriptPiano1.js` en module. Les scripts de piano importent des modules depuis `script/module/`; d'autres pages et scripts traitent des données musicales et des sons de `pianoDataSet/`.

## 4. Dépendances et ressources partagées

- `css/style.css` fournit la mise en page et la navigation communes.
- `css/styleCartes.css` complète les pages de cartes; `css/styleList.css` les pages à listes; `css/stylePiano.css` l'interface piano; `css/stylePlaylist.css` les lecteurs vidéo.
- `script/script.js` gère les accordéons utilisés sur certaines pages d'archives et de thèmes.
- `script/scriptPiano*.js` contient les comportements du piano; `script/module/musique.js` et `musique1.js` apportent des fonctions musicales.
- Les pages utilisent aussi des ressources externes comme Google Fonts, Font Awesome et un flux de radio en ligne. Leur affichage ou leur lecture demande une connexion Internet.
- Les fichiers multimédias peuvent être volumineux. Pour une copie complète, reprendre les fichiers eux-mêmes, pas seulement les dossiers HTML/CSS/JS.

## 5. Monter ou restaurer le site

1. Créer un dossier racine `laCitadelle/` et y placer les pages HTML de premier niveau.
2. Créer les sous-dossiers listés ci-dessus en gardant exactement leur orthographe et leur casse.
3. Copier les feuilles CSS dans `css/`, les scripts dans `script/` et leurs modules dans `script/module/`.
4. Copier les médias dans leurs dossiers respectifs : `audio/`, `videos/`, `image/`, `imagePiano/`, `imagesMMCJ/` et `pianoDataSet/`.
5. Conserver les dossiers de contenus `theme/`, `theme2026/`, `jeux/` et `album/`, ainsi que leurs pages HTML.
6. Servir le dossier racine comme racine du site web. Les liens des pages sont relatifs : si un fichier ou un dossier change de place, les chemins `href`, `src` et les imports JavaScript concernés doivent être mis à jour.
7. Vérifier les pages depuis leurs index et tester les médias, le menu, les accordéons, les cartes et le piano.

Aucune étape de compilation n'est nécessaire pour les pages HTML/CSS/JS observées. Comme le piano utilise des modules JavaScript ES, un serveur HTTP local est préférable à l'ouverture directe du fichier en `file://` (les restrictions du navigateur peuvent bloquer les imports de modules). En production, héberger les fichiers sur un serveur web statique en préservant les chemins relatifs.

## 6. Points de vigilance relevés

- **Respect des chemins** : certaines pages utilisent des chemins différents selon leur niveau de dossier. Depuis `theme/` ou `jeux/`, les ressources communes sont généralement référencées avec `../`; depuis la racine, elles le sont sans préfixe.
- **Références à contrôler** : quelques pages contiennent des chemins de médias ou de scripts qui semblent incohérents avec l'arborescence (par exemple `../audio/` depuis une page à la racine, ou `video/` au singulier alors que le dossier observé est `videos/`). Vérifier chaque lien avec le nom et l'emplacement réels du fichier avant déploiement.
- **Dossier CSS historique** : `image/css/` contient des feuilles CSS dupliquées. Les pages principales observées chargent plutôt `css/`; ne supprimer la copie historique qu'après avoir recherché toutes ses références.
- **Contenus manquants ou incomplets** : plusieurs pages et scripts ont des variantes et certaines références peuvent viser des fichiers absents du dépôt. Un contrôle des liens, images, imports et médias reste à faire après copie.
- **Encodage des noms** : conserver les accents, espaces et apostrophes des noms de fichiers, ou mettre à jour tous les liens qui les utilisent.

## 7. Contrôle rapide après installation

- Ouvrir `index.html`, puis suivre les menus vers Jeux, Thèmes, Audios, Vidéos et Piano.
- Vérifier les pages annuelles et quelques lecteurs audio/vidéo.
- Tester les cartes dans `jeux/versetsbiblique.html` et `jeux/questionsorales.html`.
- Tester le clavier et les commandes dans `piano.html` après lancement via HTTP local.
- Corriger toute erreur 404 dans la console du navigateur en vérifiant la casse et les chemins relatifs.
