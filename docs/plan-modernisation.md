# Plan d'action : moderniser neuroharmonics.fr

> Statut : **implémenté le 6 octobre 2026** (phases 0 à 4, hors audit Lighthouse et Search Console, à faire après mise en ligne).
> Rédigé le 6 octobre 2026, mis à jour le même jour après arbitrages.

### Décisions actées
- **HTML pur**, sans générateur ni étape de build.
- **Aucun son ni démo audio sur le site** : l'écoute se fait dans l'application.
- **Le script de suivi `websites-monitoring` reste.**
- **Le logo actuel est conservé.**

---

## 1. Diagnostic : pourquoi le site fait daté

### Visuel
- **Fond « neurones électriques bleus » en image de stock** (`wave-image.jpg`) avec parallax `background-attachment: fixed`. C'est l'image qu'on trouve sur tous les sites « cerveau » depuis 2012.
- **Glassmorphism partout** (`.glass-card` : flou, bordure blanche translucide, ombre portée, carte qui se soulève au survol alors qu'on ne peut pas cliquer dessus).
- **Bleu Material `#2196F3` + jaune `#ffd600`** : c'est la palette par défaut d'Android en 2015, sans aucune intention particulière.
- **Boutons en pilule avec ombre colorée** (`.cta-primary`), liens de navigation en pilules blanches.
- **Fonctions des ondes en liste à puces** dans une carte, à côté d'un schéma de stock en dégradé arc-en-ciel (`cinq-ondes.jpg`).
- **Footer bleu vif avec texte noir**, `© 2025` codé en dur.
- Les **polices ne se chargent pas** : le `@import` Google Fonts est placé à la fin de `styles.css`, or un `@import` doit être en tête de fichier, sinon il est ignoré. Le site s'affiche donc en Arial.

### Contenu
- Ton marketing générique (« application révolutionnaire », « états cérébraux optimaux ») qui sonne creux et **promet plus que ce que la science établit**. La recherche sur les battements binauraux donne des résultats mitigés, et un lecteur averti décroche.
- Page d'accueil sans `<h1>` ni proposition claire : on ne comprend pas en 3 secondes *ce que c'est*, *pour qui*, ni *qu'il faut un casque*.
- Des sources faibles : un article étudiant (Eukaryon 2025) est mis au même niveau qu'une publication de *Frontiers*.

### Technique
- **Styles inline partout** dans le HTML, ce qui rend toute refonte pénible.
- **i18n par échange d'`innerHTML` côté client** : la version anglaise n'existe pas pour Google (pas d'URL dédiée, pas de `hreflang`), le choix de langue n'est pas mémorisé, et le HTML est stocké dans des attributs.
- Images JPG/PNG non optimisées, sans `width`/`height` (décalages de mise en page). `logo.png` pèse 130 Ko pour un affichage de 50 px de haut. Des images non référencées traînent dans le dépôt.
- Pas d'Open Graph ni de Twitter Card (aperçu vide quand le lien est partagé), pas de données structurées pour l'application.
- Menu hamburger sans `aria-expanded` ni gestion du focus, animations sans `prefers-reduced-motion`.
- ~~Casse incohérente de `Application.html`~~ : vérifié, git suit bien `application.html`, pas de problème.

---

## 2. Direction artistique : « Le carnet d'acoustique »

### L'idée
Le battement binaural a été décrit en **1839 par Heinrich Wilhelm Dove**, à l'époque des planches gravées de physique, des diapasons et des résonateurs de Helmholtz. Le site doit ressembler à **une planche de revue scientifique, ou à un carnet de laboratoire**, pas à une app de bien-être.

Le site *explique et donne envie* ; l'application *fait entendre*. Cette répartition est assumée : le site est un objet de lecture calme et précis.

Trois partis pris :

1. **Le papier plutôt que le néon.** Fond clair couleur papier, encre presque noire, traits fins. Tous les sites « cerveau » sont sombres et lumineux ; un fond clair et sobre les distingue tout de suite. Un **mode nuit** suit automatiquement la préférence du système (`prefers-color-scheme`) et peut être forcé par un bouton : c'est une encre sur papier sombre, pas un fond spatial.
2. **Deux oreilles, deux couleurs.** Toute l'identité repose sur **gauche / droite**. Une couleur pour l'oreille gauche, une pour l'oreille droite, et le battement (la différence) en encre. On ne les mélange jamais en dégradé : elles se *superposent*, comme deux tracés sur une planche.
3. **Les chiffres sont des héros.** `460 Hz`, `464 Hz`, `4 Hz` : les fréquences s'affichent en grand, en chiffres tabulaires monospace, comme sur un cadran. Ce sont elles qui servent d'illustration, à la place des photos de stock.

### Intégrer le logo actuel
Le logo est une image (cerveau beige sur fond bleu électrique), donc très chargée. Plutôt que de le combattre, on le **traite comme une vignette collée dans le carnet** :
- Affiché **petit** dans l'en-tête (32 à 40 px de haut), dans un **cadre net d'1 px couleur encre**, découpé en rectangle ou en cercle. Ce n'est jamais un fond ni une image de hero.
- Accolé au **nom « NeuroHarmonics » composé en texte** (serif), qui porte l'essentiel de l'identité.
- La palette lui répond : le **bleu de Prusse** de l'oreille droite reprend le bleu du logo, et le **papier** fait écho au beige du cerveau. Le logo s'intègre ainsi sans dissoner.
- Optimisation : export en WebP/AVIF à 2× la taille d'affichage (au lieu de 130 Ko), avec `width`/`height`. Le fichier source reste intact.

### Palette (indicative)

| Rôle | Jour (papier) | Nuit |
|---|---|---|
| Fond | `#F2EEE5` papier | `#14151A` encre |
| Texte | `#1C1C21` | `#E8E3D8` |
| Trait secondaire / grille | `#1C1C21` à 15 % | `#E8E3D8` à 15 % |
| **Oreille gauche** | `#C8432B` vermillon | `#E86A4F` |
| **Oreille droite** | `#2A4FA8` bleu de Prusse | `#7B9BE8` |
| Surlignage ponctuel | `#E9D27A` (papier surligné) | `#5A4E22` |

Ce sont des aplats uniquement : aucun dégradé, aucune ombre portée, aucun flou d'arrière-plan. Le contraste AA est à vérifier pour chaque couleur sur les deux fonds (ajuster les teintes si besoin).

### Typographie
- **Titres et texte courant** : une serif éditoriale avec du caractère, comme *Newsreader* ou *Source Serif 4*. Elle donne le côté revue scientifique ou livre de vulgarisation.
- **Chiffres, fréquences, étiquettes, navigation** : un mono technique, comme *IBM Plex Mono*, en remplacement de *Share Tech Mono* qui fait « hacker » de 2010.
- Polices **auto-hébergées** en `woff2` dans `fonts/`, déclarées en `@font-face` en tête de CSS, avec `font-display: swap` et un `<link rel="preload">` pour la police de texte.

### Éléments graphiques signature
- **La planche du battement** (voir §3) : l'illustration centrale du site.
- **Règle de fréquences logarithmique** (0,5 → 100 Hz) avec graduations, qui remplace la liste à puces et le schéma arc-en-ciel des ondes.
- **Grille millimétrée** très légère en fond de certaines sections, comme du papier de traceur (motif CSS en `repeating-linear-gradient` à 1 px, qui produit des lignes nettes et pas un dégradé visible).
- **Tracés sinusoïdaux en SVG** dessinés au trait (1,5 px), qui servent de séparateurs de section.
- **Annotations en marge**, façon notes de revue : sources, précisions, avertissements. Elles sont dans la marge sur grand écran et sous le paragraphe sur mobile.
- **Légendes de figures** numérotées (« Fig. 1 : … ») sous chaque illustration et capture.
- Boutons **rectangulaires à coins vifs (2 px max), bordure d'1 px**, avec un état survol qui s'inverse (fond encre, texte papier). Pas de pilule ni d'ombre.

### Ce qu'on s'interdit (liste anti-cliché)
- ❌ Dégradés (fonds, textes, boutons), y compris les « mesh gradients » et les halos flous.
- ❌ Glassmorphism, `backdrop-filter`, cartes flottantes avec ombre.
- ❌ Toute nouvelle image de stock de cerveau, de neurones ou de méditation (le logo est la seule exception, et il est encadré).
- ❌ Grille de 3 cartes avec icône + titre + texte, et les « bento grids ».
- ❌ Fondu au défilement sur chaque bloc.
- ❌ Emojis comme icônes, les ✨.
- ❌ Les mots « révolutionnaire », « optimiser », « débloquez votre potentiel ».

---

## 3. La pièce maîtresse : une planche, pas une démo

Sans son sur le site, l'illustration doit **faire comprendre le phénomène d'un coup d'œil**. Elle remplace la photo de hero et l'animation SVG actuelle de la page Battements binauraux.

### « Fig. 1 : le battement binaural »
Un grand **SVG statique**, dessiné au trait comme une planche gravée :

```
  G  460 Hz  ∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿   (vermillon)
  D  464 Hz  ∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿  (bleu de Prusse)
             ─────────────────────────────────────────
  Perçu      ◖▬▬▬▬◗    ◖▬▬▬▬◗    ◖▬▬▬▬◗    ◖▬▬▬▬◗     (encre : enveloppe)
              ├─── 1/4 s ───┤
                         464 − 460 = 4 Hz
```

- Deux sinusoïdes de fréquences proches, une par oreille, puis **l'enveloppe de battement** perçue par le cerveau, avec la soustraction écrite en grands chiffres monospace.
- Les sinusoïdes sont **calculées et écrites une fois** dans le HTML (on peut les générer avec un petit script local, puis coller le résultat). Le site n'a pas de JS pour ça.
- Une **seule animation**, facultative : le tracé se dessine une fois au chargement (`stroke-dashoffset`, 1,5 s), puis reste fixe. Elle est désactivée sous `prefers-reduced-motion`.
- Légende et « G » / « D » écrits en toutes lettres, pour que l'information ne repose jamais sur la seule couleur. Un `<title>` et une `<desc>` dans le SVG décrivent la figure pour les lecteurs d'écran.

### La règle des cinq bandes
```
  ├──┼──────┼───────┼──────────┼─────────────┼──────────┤
  0,5  DELTA  4 THÊTA 8  ALPHA  13    BÊTA    30  GAMMA  100 Hz
       sommeil  rêverie  détente     attention     traitement
```
- Échelle **logarithmique** graduée, en HTML/CSS (une liste `<ol>` stylée, pas d'image), donc lisible par Google et par les lecteurs d'écran.
- Chaque bande montre sa plage en Hz et un usage formulé honnêtement (« associée à… »).
- Sur mobile, la règle devient **verticale**, comme un thermomètre de laboratoire.
- Sous la règle : « Choisissez votre bande dans l'application » et le badge Play Store. Le site décrit, l'app fait écouter.

---

## 4. Contenu et architecture

### Arborescence
| Fichier FR | Fichier EN | Rôle |
|---|---|---|
| `index.html` | `en/index.html` | Accueil : planche, proposition, téléchargement |
| `comprendre.html` | `en/understand.html` | Le phénomène, les 5 bandes, ce que dit la science (remplace `battements-binauraux.html`) |
| `application.html` | `en/app.html` | Captures, fonctionnalités, badge Play Store, FAQ |
| `a-propos.html` | `en/about.html` | L'auteur, la démarche, contact (remplace `auteur.html`) |
| `confidentialite.html` | `en/privacy.html` | Politique de confidentialité |

- Les liens internes **gardent l'extension `.html`** (ex. `/comprendre.html`), pour que le site marche avec n'importe quel serveur statique, y compris `python -m http.server`. Un premier essai avec `cleanUrls` de Vercel cassait les liens hors de Vercel ; il a été abandonné.
- Un `vercel.json` contient seulement les **redirections 301** depuis `battements-binauraux.html` et `auteur.html`.
- Le sélecteur de langue devient un **simple lien** vers la page équivalente (FR ↔ EN). `js/script.js` perd toute la partie i18n.

### Page d'accueil, de haut en bas
1. **En-tête** : logo encadré + nom, navigation à 4 liens, lien FR/EN, bascule jour/nuit.
2. **Accroche** en `<h1>`, par exemple : *« Deux sons légèrement différents, un dans chaque oreille. Votre cerveau entend le troisième. »* Puis une ligne qui dit ce qu'est l'app : *« NeuroHarmonics génère des battements binauraux sur Android. Gratuit, sans compte, avec un casque. »* Puis le badge Play Store.
3. **Fig. 1** : la planche du battement (§3).
4. **Les 5 bandes** sur la règle de fréquences.
5. **L'application** : 2 captures dans un cadre de téléphone dessiné au trait, 3 faits (gratuite, sans compte, aucune donnée collectée par l'app), et le badge.
6. **Précautions** : casque obligatoire, déconseillé en cas d'épilepsie, jamais en conduisant. Courtes et visibles, ce qui renforce la crédibilité.
7. **Pied de page** : sobre, en encre sur papier, liens, contact, année.

### Réécriture éditoriale
- Ton **curieux et précis**, celui de la vulgarisation scientifique plutôt que de la promesse bien-être.
- Une section **« Ce que dit la recherche »** nuancée sur la page Comprendre : effets observés sur l'anxiété et l'attention dans certaines études, preuves d'entraînement cortical inégales. Sources à privilégier, à vérifier au moment de la rédaction :
  - Garcia-Argibay, Santed & Reales (2019), méta-analyse, *Psychological Research*.
  - Ingendoh, Posny & Heine (2023), revue systématique, *PLOS ONE*.
  - On garde *Frontiers in Neuroscience* (2017) et on place l'article étudiant Eukaryon en lecture complémentaire, ou on le retire.
- Les références sont présentées en **notes numérotées**, façon article.
- Chaque page a un vrai `<h1>` et des balises `<title>` descriptives (pas « Accueil »).
- Politique de confidentialité : vrais `<h2>`/`<h3>` au lieu des paragraphes ciblés en CSS par leur texte. Elle doit rester **cohérente avec le script de suivi** : la politique couvre l'application, mais si une section « site web » est ajoutée, elle doit mentionner la mesure d'audience.

### Visuels
- **Supprimés du site** : `wave-image.jpg` (fond de neurones), `cinq-ondes.jpg` (remplacé par la règle), `binaural-beats.jpg` (remplacé par la planche).
- `privacy.jpg` : à retirer, car une page juridique n'a pas besoin d'illustration.
- `author.jpg` : conservé, mais en rectangle avec un fin cadre encre, pas en cercle avec ombre.
- **Captures de l'app** : conservées, dans un cadre de téléphone au trait, sans ombre. L'interface de l'app (boutons bleus Material) contrastera avec le site. Ce n'est pas le sujet ici, mais la palette G/D pourrait plus tard servir de base à une refonte de l'app.
- Images non référencées par le site (`ethnique-adolescent-couche-sur-l.jpg`, `Presentation_1024_500.jpg`, `Capture*_*.jpg`, `logo_512_512.jpg`) : ce sont probablement des visuels pour le Play Store. On les **déplace dans un dossier `store/`** hors du site, plutôt que de les supprimer.

---

## 5. Socle technique (HTML pur)

### Gérer la duplication sans build
Sans générateur, en-tête et pied de page seront recopiés dans **10 pages** (5 FR + 5 EN). Pour que ça reste maîtrisable :
- Un fichier de référence `docs/gabarit.html` contient le `<head>`, l'en-tête et le pied de page canoniques, avec des commentaires `<!-- HEADER START -->` / `<!-- HEADER END -->`.
- Les mêmes balises de commentaire entourent ces blocs dans chaque page. On peut ainsi remplacer le bloc partout d'un coup avec un rechercher-remplacer.
- La page active est signalée par `aria-current="page"`, la seule différence d'en-tête d'une page à l'autre.
- On n'injecte **pas** l'en-tête en JavaScript (pas de `fetch`) : ça ferait clignoter l'affichage et nuirait au référencement.

### CSS
- Une feuille unique `css/styles.css`, réécrite de zéro, organisée par couches : `@layer reset, tokens, base, layout, components, pages`.
- **Variables CSS** pour la palette, les espacements et la typographie. Le thème nuit passe par `prefers-color-scheme` et par un attribut `data-theme` sur `<html>` quand la bascule est utilisée.
- **Zéro style inline**, et zéro `<style>` dans les pages (l'animation SVG actuelle part dans la feuille).
- Mise en page en CSS Grid avec une colonne de texte de 60 à 70 caractères et une colonne de marge pour les notes. Typographie fluide avec `clamp()`, mobile d'abord.
- `prefers-reduced-motion` respecté.

### JavaScript
`js/script.js` est réduit à l'essentiel, sans dépendance, environ 40 lignes :
- **Bascule jour/nuit**, mémorisée dans `localStorage` (dans un `try/catch`). Un petit script inline dans le `<head>` applique le thème avant l'affichage, pour éviter le flash.
- **Menu mobile** accessible : `<button aria-expanded aria-controls>`, fermeture avec Échap, retour du focus. Si la navigation à 4 liens tient sur une ligne en 360 px, on supprime carrément le hamburger.
- **Année du pied de page** : écrite en dur et mise à jour une fois par an, ou insérée par une ligne de JS avec repli texte.
- Le **script de suivi** reste en bas de chaque page, inchangé.

### Performance et SEO
- Images en **WebP** (et AVIF si utile) via `<picture>`, avec `width`/`height` et `loading="lazy"` sous la ligne de flottaison. La conversion se fait une fois en local, et les fichiers convertis sont commités.
- Balises **Open Graph / Twitter** dans chaque page, avec une image de partage 1200×630 dédiée : la planche du battement sur fond papier, avec le logo.
- **JSON-LD `MobileApplication`** (nom, système Android, prix 0, lien Play Store) sur l'accueil et la page Application.
- `<link rel="alternate" hreflang="fr|en|x-default">` et `canonical` sur chaque page.
- `sitemap.xml` mis à jour à la main avec les 10 URL et leurs alternates de langue.
- Objectif : **Lighthouse ≥ 95** sur les 4 axes, page d'accueil sous 200 Ko hors polices.

### Accessibilité
- Contraste AA vérifié pour toutes les combinaisons de couleurs.
- Gauche/droite toujours écrits (« G », « D »), jamais signalés par la seule couleur.
- Lien d'évitement « Aller au contenu », focus visible (contour encre de 2 px), ordre de lecture logique.

### Divers
- `robots.txt` à vérifier après le changement d'URL.

---

## 6. Feuille de route

### Phase 0 : préparation (½ journée)
- [x] Déplacer les visuels Play Store dans `store/`.
- [x] Télécharger et auto-héberger les polices.
- [x] Créer `vercel.json` (redirections).

### Phase 1 : fondations visuelles (1 jour)
- [x] Nouvelle `styles.css` : tokens jour/nuit, échelle typographique, espacements, couches.
- [x] Gabarit de référence `docs/gabarit.html` : `<head>`, en-tête avec logo encadré, navigation, pied de page.
- [x] Composants : bouton, lien, note en marge, légende de figure, cadre de téléphone, séparateur sinusoïdal, grille millimétrée.
- [x] Nouveau `script.js` : bascule de thème, menu.

### Phase 2 : illustrations (1 jour)
- [x] Planche « Fig. 1 » en SVG : sinusoïdes calculées, enveloppe, annotations, version nuit.
- [x] Règle logarithmique des 5 bandes, horizontale et verticale.
- [x] Cadres de téléphone pour les captures.
- [x] Image Open Graph 1200×630.
- [x] Conversion WebP de toutes les images conservées (dont le logo).

### Phase 3 : contenus (1 jour)
- [x] Réécriture FR de toutes les pages (ton, structure, `<h1>`).
- [x] Section « Ce que dit la recherche » avec les sources vérifiées.
- [x] Bloc précautions.
- [x] Création des pages `en/` (traduction).
- [x] Mise en forme de la politique de confidentialité.

### Phase 4 : finitions et mise en ligne (½ journée)
- [x] Open Graph, JSON-LD, `hreflang`, `canonical`, sitemap.
- [x] Vérification que les 10 pages ont un en-tête et un pied de page identiques au gabarit.
- [ ] Audit Lighthouse et accessibilité, tests mobile à 360 px, en mode jour et en mode nuit.
- [ ] Vérification des redirections et du script de suivi après mise en production.
- [ ] Soumission du nouveau sitemap dans Google Search Console.

**Total estimé : environ 4 jours de travail.**

---

## 7. Critères de réussite
- Un visiteur comprend **ce qu'est l'app, comment marche un battement binaural et qu'il lui faut un casque** en moins de 10 secondes, sans rien écouter.
- Le site ne ressemble à **aucun autre site de bien-être ou de « brain app »**. Test simple : flouter une capture, on doit encore y reconnaître NeuroHarmonics grâce au papier, aux deux couleurs et aux chiffres.
- Le logo actuel s'intègre sans jurer.
- La version anglaise est indexée séparément.
- Lighthouse ≥ 95, et aucune affirmation du site n'est plus forte que ce que disent les sources citées.
