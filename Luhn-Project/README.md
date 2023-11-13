
# Luhn project

L'algorithme de Luhn ou formule de Luhn, également connu sous le nom d'algorithme "modulus 10" ou "mod 10", est une formule de somme de contrôle (checksum) simple utilisée pour valider une variété de numéros d'identification, tels que les numéros de carte de crédit, les numéros IMEI et les numéros d'assurance sociale canadienne.

Elle a été créée dans les années 1960 par Hans Peter Luhn, ingénieur allemand chez IBM, comme méthode de validation des numéros d'identification. Elle est devenue célèbre notamment en raison de son adoption par les sociétés de cartes de crédit juste après sa création.

L'algorithme est dans le domaine public et est largement utilisé aujourd'hui. Il ne s'agit pas d'une fonction de hachage sécurisée sur le plan cryptographique ; il a été conçu pour protéger contre les erreurs accidentelles, et non contre les attaques malveillantes. 

La plupart des cartes de crédit et de nombreux numéros d'identification gouvernementaux utilisent cet algorithme comme une méthode simple pour distinguer les numéros valides des successions de numéros aléatoires.

# First part 

Votre programme doit prendre en paramètre n'importe quel nombre après un flag -c et vérifier sa validité.

Vous devez afficher OK si le nombre est un code de Luhn valide et KO s'il ne l'est pas.
En cas d'erreur, votre programme doit afficher un message explicatif.
Exemple : 
~/luhn> ts-node luhn.ts -c 5140256942783546 | cat -e
KO$
~/luhn> ts-node luhn.ts -c 5140256942783646 | cat -e
OK$

# Second part 

Le but de cette deuxième partie est d'ajouter une fonctionnalité à votre programme: compléter le code passé en paramètre.

Vous devez complétez le nombre donné en paramètre avec le flag -f en affichant le chiffre manquant.

Exemple : 
~/luhn> ts-node luhn.ts -f 192924593889831 | cat -e
6$

