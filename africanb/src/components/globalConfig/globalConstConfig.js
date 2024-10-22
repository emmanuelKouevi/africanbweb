// URL A UTILISER POUR LES API
export const BASE_URL = "https://localhost:8443/";
//export const BASE_URL ="https://africanbrg-1c70f693e9c8.herokuapp.com/"

export const HEADERS = (token) => {
  return {
    server_id: "backend@africanb",
    client_id: "frontend@africanb",
    Authorization: "Bearer" + " " + token,
    //is_admin: "isAdmin",
  };
};

export const HEADERS_ADMIN = () => {
  return {
    server_id: "backend@africanb",
    client_id: "frontend@africanb",
    is_admin: "isAdmin",
  };
};

// ------------------ OPERATION SUR LES COMPAGNIE DE TRANSPORT --------------------------- //

export const API_CREER_COMPAGNIE_TRANSPORT = `${BASE_URL}compagnieTransport`;
export const API_MODIFIER_COMPAGNIE_TRANSPORT = `${BASE_URL}compagnieTransport`;
export const API_SUPPRIMER_COMPAGNIE_TRANSPORT = `${BASE_URL}compagnieTransport`;
export const API_RECUPERER_LISTE_COMPAGNIE_TRANSPORT = `${BASE_URL}compagnieTransport/getAllProcessingCompagnies`;
export const API_VALIDER_DEMANDE_ADHESION_COMPAGNIE = `${BASE_URL}compagnieTransport/validateAdhesionRequestCompagny`;

// ------------------------ COMMONS API WEB SERVICE ------------------------------------------//

export const API_CREER_PAYS = `${BASE_URL}pays`;
export const API_CREER_VILLE = `${BASE_URL}villes`;
export const API_OBTENIR_LISTE_DES_VILLES_DISPONIBLE = `${BASE_URL}villes/getAllCities`;
export const API_OBTENIR_LISTE_DES_PAYS_DISPONIBLE = `${BASE_URL}pays/getAllPays`;
export const API_OBTENIR_REFERENCE_PAR_PAR_FAMILLE = `${BASE_URL}references/getReferenceByReferenceFamille`;

// ------------------------------- APIS ADMINISTRATEUR COMPAGNIE DE TRANSPORT ----------------------------------//
export const API_OBTENIR_LISTE_DES_DEMANDES_ADHESIONS_VALIDEES = `${BASE_URL}compagnieTransport/getAllValidedCompagnies`;
export const API_OBTENIR_LISTE_DE_TOUTES_LES_DEMANDES_ADHESIONS = `${BASE_URL}compagnieTransport/getAllProcessingCompagnies`;

//-------------------------------- APIs OFFRE DE VOYAGE---------------------------------------------------------------------//

export const API_CREER_OFFRE_VOYAGE = `${BASE_URL}offreVoyages`;
export const API_RECUPERER_LISTE_OFFRE_VOYAGE = `${BASE_URL}offreVoyages/getTravelOfferByCompagnieTransport`;
export const API_RATTACHER_PRIX_OFFRE_VOYAGE = `${BASE_URL}prixOffreVoyages`;
export const API_ACTIVER_OFFRE_DE_VOYAGE = `${BASE_URL}offreVoyages/toActiveTravelOffer`;
export const API_CREER_PROGRAMME_OFFRE_VOYAGE = `${BASE_URL}programmes`;
export const API_CREER_VILLES_ESCALES_OFFRE_VOYAGE = `${BASE_URL}villeEscales`;
export const API_RECUPERER_PRIX_PAR_OFFRE_VOYAGE = `${BASE_URL}prixOffreVoyages/getPrixTravelOfferByOffreVoyageDesignation`;
export const API_RECUPERER_VILLE_ESCALE_PAR_OFFRE_VOYAGE = `${BASE_URL}villeEscales/getVilleByOffreVoyageDesignation`;
export const API_CREER_JOUR_SEMAINE_OFFRE_VOYAGE = `${BASE_URL}jourSemaines`;
export const API_OBENIR_JOUR_SEMAINE_PAR_OFFRE_VOYAGE = `${BASE_URL}jourSemaines/getJourSemaineByVoyageDesignation`;
export const API_OBTENIR_LISTE_PROPRIETE_OFFRE_VOYAGE = `${BASE_URL}proprieteOffreVoyages/getAllProprieteOffreVoyage`;
export const API_CREER_CARACTERISTIQUES_OFFRE_VOYAGE = `${BASE_URL}valeurCaracteristiqueOffreVoyages`;
export const API_RECUPERER_PROPRIETE_PAR_OFFRE_VOYAGE = `${BASE_URL}valeurCaracteristiqueOffreVoyages/getAllValeurCaracteristiqueOffreVoyageByOffreVoyageDesignation`;
export const API_ASSOCIER_BUS_OFFRE_VOYAGE = `${BASE_URL}bus`;
export const API_RECUPERER_LISTE_BUS_PAR_OFFRE_VOYAGE = `${BASE_URL}bus/getBusByOffreVoyage`;

//-------------------------------- APIs GESTION DES BAGAGES---------------------------------------------------------------------//

export const API_CREER_BAGAGE = `${BASE_URL}bagages`;

// --------------------------------APIs GESTION DES GARES ----------------------------------------------------------------------//
export const API_CREER_GARE_COMPAGNIE_TRANSPORT = `${BASE_URL}gares`;
export const API_RECUPERER_LISTE_GARES_PAR_COMPAGNIE = `${BASE_URL}gares/getGareByCompagnieTransportRaisonScoiale`;

//---------------------------------APIs MODE D'ABONNEMENT ET DE PAIEMENT ---------------------------------------------------//
export const API_CREER_MODE_ABONNEMENT = `${BASE_URL}modeAbonnements`;
export const API_OBTENIR_MODE_ABONNEMENT_PAR_COMPAGNIE = `${BASE_URL}modeAbonnements/getModeAbonnementByCompagnieTransport`;
export const API_CREER_MODE_PAIEMENT = `${BASE_URL}modePaiements`;
export const API_OBTENIR_MODE_PAIEMENT_PAR_COMPAGNIE = `${BASE_URL}modePaiements/getModePaiementByCompagnieTransport`;

export const API_MODIFIER_MODE_PAIEMENT = `${BASE_URL}modePaiements`;

// ---------------------------------- DOCUMENT COMPAGNIE TRANSPORT -------------------------------------------------//

export const API_CREER_DOCUMENT_TRANSPORT = `${BASE_URL}compagnieTransport/uploadAttestionTransport`;

//--------------------------------------ROLES ET FONCTIONNALITÉS---------------------------------------------------------------//

export const API_CREER_FUNCTIONNALITY = `${BASE_URL}functionalities`;
export const API_GET_ALL_FUNCTIONNALITIES = `${BASE_URL}functionalities/getAll`;
export const API_GET_FUNCTIONNALITY_BY_ROLE = `${BASE_URL}functionalities/getFunctionalitiesByRole`;

// --------------------------------------- USER (CONNEXION , ACCOUNT , ETC) ------------------------------------------------------------------//

export const API_LOGIN_USER = `${BASE_URL}users/login`;
export const API_UPDATE_USER = `${BASE_URL}users`;
export const API_ACTIVATE_USER = `${BASE_URL}users/activeUser`;
export const API_RESET_PASSWORD_USER = `${BASE_URL}users/resetPasswordUser`;
export const API_CREATE_USER = `${BASE_URL}users`;
export const API_GET_ALL_USERS_CREATED = `${BASE_URL}users/getAll`;
export const API_LOGOUT = `${BASE_URL}users/logout`;

//---------------------------------------- ROLES UTILISATEURS -----------------------------------------------------------------------//

export const API_CREATE_USER_ROLE = `${BASE_URL}roles`;
export const API_GET_ALL_ROLES = `${BASE_URL}roles/getAll`;
export const API_GET_FUNCTIONNALITY_BY_USER_ROLE = `${BASE_URL}functionalities/getFunctionalitiesByRole`;

// RESERVATION
export const API_RESERVER_PROGRAMME_OFFRE = `${BASE_URL}reservationBilletVoyages`;
export const API_CREATE_HISTORIQUE_PAIEMENT = `${BASE_URL}historiquePaiements`;
export const API_GET_RESERVATIONS_BY_SELLER = `${BASE_URL}reservationBilletVoyages/getReservationByUserGare`;
export const API_GET_RESERVATIONS_BY_ADMIN_TP = `${BASE_URL}reservationBilletVoyages/getReservationByAdminCompagnieTransport`;
export const API_GENERATE_TICKET = `${BASE_URL}reservationBilletVoyages/generateBilletBase64`;
export const API_GENERATE_REPORT = `${BASE_URL}reservationBilletVoyages/generateReservationReportBase64`;
