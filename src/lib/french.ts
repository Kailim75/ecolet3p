/**
 * Préposition « de » élidée devant une voyelle : « session d'octobre », « session de mars ».
 * Le h n'est pas traité (muet ou aspiré selon le mot) : ne passer que des mots dont
 * l'élision ne dépend que de la voyelle initiale, comme les noms de mois.
 */
export const de = (mot: string): string => (/^[aeiouàâäéèêëîïôöûü]/i.test(mot.trim()) ? "d'" : "de ");
