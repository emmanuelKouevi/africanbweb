// URL A UTILISER POUR LES API

export const BASE_URL = "http://localhost:8080/";


// ------------------ OPERATION SUR LES COMPAGNIE DE TRANSPORT --------------------------- //

export const API_CREER_COMPAGNIE_TRANSPORT = `${BASE_URL}compagnieTransport`
export const API_MODIFIER_COMPAGNIE_TRANSPORT = `${BASE_URL}compagnieTransport`
export const API_SUPPRIMER_COMPAGNIE_TRANSPORT = `${BASE_URL}compagnieTransport`
export const API_RECUPERER_LISTE_COMPAGNIE_TRANSPORT = `${BASE_URL}compagnieTransport/getAllProcessingCompagnies`

export const API_VALIDER_DEMANDE_ADHESION_COMPAGNIE = `${BASE_URL}compagnieTransport/validateAdhesionRequestCompagny`




// ------------------------ COMMONS API WEB SERVICE ------------------------------------------//

export const API_CREER_PAYS = `${BASE_URL}pays`
export const API_CREER_VILLE = `${BASE_URL}villes`
export const API_OBTENIR_LISTE_DES_VILLES_DISPONIBLE = `${BASE_URL}villes/getAllCities`
export const API_OBTENIR_LISTE_DES_PAYS_DISPONIBLE = `${BASE_URL}pays/getAllPays`



// ------------------------------- APIS ADMINISTRATEUR COMPAGNIE DE TRANSPORT ----------------------------------//

