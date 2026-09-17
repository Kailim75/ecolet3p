/**
 * Préposition « de » élidée devant une voyelle ou un h muet : « session d'octobre »,
 * « session de mars ». Les noms de mois venant des données ou de toLocaleDateString,
 * la règle doit être appliquée à l'affichage.
 */
export const de = (mot: string): string => (/^[aeiouyhàâäéèêëîïôöûü]/i.test(mot.trim()) ? "d'" : "de ");
