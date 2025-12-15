# splitbrain

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Génération de niveaux

Pour créer de nouveaux niveaux, éditez le fichier `src/stores/levels.js` et ajoutez vos niveaux dans le tableau `levels`.

### Structure d'un niveau

Chaque niveau est un objet avec les propriétés suivantes :
- `name` : Le nom du niveau
- `difficulty` : La difficulté (1-3)
- `timeLimit` : La limite de temps en secondes
- `grid1` : La grille pour le joueur A (contrôles ZQSD) / sortie 1 (côté gauche)
- `grid2` : La grille pour le joueur B (touches fléchées) / sortie 2 (côté droit)

Si vous ne fournissez que `grid`, il sera utilisé pour les deux joueurs.

### Légende ASCII

- `#` = mur (impassable)
- `.` = sol (marchable)
- `A` = position de départ du joueur 1 (contrôles ZQSD)
- `B` = position de départ du joueur 2 (touches fléchées)
- `1` = sortie pour le joueur 1
- `2` = sortie pour le joueur 2

### Format des grilles

Chaque grille doit être un tableau de 12 chaînes de caractères, chacune contenant exactement 12 caractères (12x12).

### Exemple de niveau

```javascript
{
  name: 'Mon Niveau',
  difficulty: 2,
  timeLimit: 45,
  grid1: [
    '############',
    '#A.........#',
    '#..........#',
    '#..........#',
    '#..........#',
    '#..........#',
    '#..........#',
    '#..........#',
    '#..........#',
    '#..........#',
    '#1.........#',
    '############'
  ],
  grid2: [
    '############',
    '#.........B#',
    '#..........#',
    '#..........#',
    '#..........#',
    '#..........#',
    '#..........#',
    '#..........#',
    '#..........#',
    '#..........#',
    '#.........2#',
    '############'
  ]
}
```

### Conseils pour créer des niveaux

1. Assurez-vous que chaque grille fait exactement 12x12 caractères
2. Placez toujours les murs (`#`) sur les bords pour créer une bordure
3. Vérifiez qu'il existe un chemin valide entre le point de départ (`A`/`B`) et la sortie (`1`/`2`)
4. Les deux grilles peuvent être identiques ou différentes selon le niveau de difficulté souhaité
5. Testez votre niveau en jouant pour vérifier qu'il est jouable et équilibré
