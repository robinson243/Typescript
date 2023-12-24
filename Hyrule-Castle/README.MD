# Installation de Node.js, npm, et Compilation d'un Projet TypeScript

Ce fichier README fournit des instructions étape par étape pour installer Node.js, npm (le gestionnaire de paquets Node.js), TypeScript, et compiler un projet TypeScript.

## 1. Installation de Node.js

### Sur Windows :

1. Téléchargez le [programme d'installation de Node.js](https://nodejs.org/) depuis le site officiel.
2. Exécutez le programme d'installation en suivant les instructions à l'écran.
3. Vérifiez l'installation en ouvrant une fenêtre de terminal (Command Prompt ou PowerShell) et tapez les commandes suivantes :
    ```bash
    node -v
    npm -v
    ```

### Sur macOS :

1. Utilisez [Homebrew](https://brew.sh/) pour installer Node.js en exécutant la commande suivante dans le terminal :
    ```bash
    brew install node
    ```
2. Vérifiez l'installation avec les commandes :
    ```bash
    node -v
    npm -v
    ```

### Sur Linux (Ubuntu) :

1. Utilisez le gestionnaire de paquets pour installer Node.js et npm :
    ```bash
    sudo apt update
    sudo apt install nodejs npm
    ```
2. Vérifiez l'installation :
    ```bash
    node -v
    npm -v
    ```

## 2. Installation de TypeScript

1. Installez TypeScript globalement en utilisant la commande npm :
    ```bash
    npm install -g typescript
    ```
2. Vérifiez l'installation en exécutant :
    ```bash
    tsc -v
    ```

## 3. Compilation du Projet TypeScript
Placez vous dans un des répertoires et faites la commandes: 
```bash
npm install readline-sync
tsc hyrule-castle.ts
node hyrule_castle.js 
```
Et amusez vous !
