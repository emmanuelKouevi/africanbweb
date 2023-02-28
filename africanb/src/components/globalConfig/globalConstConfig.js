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
export const API_OBTENIR_LISTE_DES_DEMANDES_ADHESIONS_VALIDEES = `${BASE_URL}compagnieTransport/getAllValidedCompagnies`


//-------------------------------- APIs OFFRE DE VOYAGE---------------------------------------------------------------------//

export const API_CREER_OFFRE_VOYAGE = `${BASE_URL}offreVoyages`
export const API_RECUPERER_LISTE_OFFRE_VOYAGE = `${BASE_URL}offreVoyages/getTravelOfferByCompagnieTransport`
export const API_RATTACHER_PRIX_OFFRE_VOYAGE = `${BASE_URL}prixOffreVoyages`
export const API_ACTIVER_OFFRE_DE_VOYAGE = `${BASE_URL}offreVoyages/toActiveTravelOffer`
export const API_CREER_PROGRAMME_OFFRE_VOYAGE = `${BASE_URL}programmes`
export const API_CREER_VILLES_ESCALES_OFFRE_VOYAGE = `${BASE_URL}villeEscales`
export const API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE = `${BASE_URL}references/getReferenceByReferenceFamille`
export const API_RECUPERER_PRIX_PAR_OFFRE_VOYAGE = `${BASE_URL}prixOffreVoyages/getPrixTravelOfferByOffreVoyageDesignation`
export const API_RECUPERER_VILLE_ESCALE_PAR_OFFRE_VOYAGE = `${BASE_URL}villeEscales/getVilleByOffreVoyageDesignation`
export const API_CREER_JOUR_SEMAINE_OFFRE_VOYAGE = `${BASE_URL}jourSemaines`
export const API_OBENIR_JOUR_SEMAINE_PAR_OFFRE_VOYAGE = `${BASE_URL}jourSemaines/getJourSemaineByVoyageDesignation`
export const API_OBTENIR_LISTE_PROPRIETE_OFFRE_VOYAGE = `${BASE_URL}proprieteOffreVoyages/getAllProprieteOffreVoyage`
export const API_CREER_CARACTERISTIQUES_OFFRE_VOYAGE = `${BASE_URL}valeurCaracteristiqueOffreVoyages`
