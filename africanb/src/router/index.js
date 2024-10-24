import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
//import $store from '@/store'

//AUTHENTIFICAITON
import Login from '@/components/Auth/Login.vue'
//import InterfaceAccordingUserRole from '../views/InterfaceAccordingUserRole'
//SELLER
//import DashboardSeller from "@/components/vendeur/Dashboard.vue"
import EspaceUserAdmin from '../views/EspaceUserAdmin'

import creerCompagnieTransport from '../components/administrateur_societe/CreerCompagnieTransport'
import modifierCompagnieTransport from '../components/administrateur_societe/ModifierCompagnieTransport'
import selectionnerCompagnieTransport from '../components/administrateur_societe/SelectionnerCompagnieTransport'
import selectionnerDemandeAdhesionCompagnie from '../components/administrateur_societe/SelectionnerDemandeAdhesionCompagnie'

import creerPays from '../components/administrateur_societe/CreerPays'
import selectionnerPays from '../components/administrateur_societe/SelectionnerPays'
import creerVille from '../components/administrateur_societe/CreerVille'
import selectionnerVille from '../components/administrateur_societe/SelectionnerVille'
import creerFonctionnalite from '../components/administrateur_societe/creerFonctionnalite'
import creerRoleUtilisateur from '../components/administrateur_societe/creerRoleUtilisateur'
import creerUtilisateur from '../components/administrateur_societe/creerUtilisateur'
import gestionFunctionnalitesEtRoles from '../components/administrateur_societe/gestionFonctionnalitesEtRoles'
import modifierCompteUtilisateur from '../components/administrateur_societe/userProfil'
import resetPasswordUser from '../components/administrateur_societe/changerPassword'
import selectionnerUtilisateur from '../components/administrateur_societe/selectionnerUtilisateur'

//import connexion from '../components/authentification/ConnexionUtilisateur.vue'
//import connexionUtilisateurCompagnieTransport from '../components/administration_compagnie_transport/authentification/connexionUtilisateurCompagnieTransport'

import creerOffreVoyage from '../components/administration_compagnie_transport/CreerOffreVoyage'
import creerVilleEscale from '../components/administration_compagnie_transport/CreerVilleEscale'
import programmerOffreVoyage from '../components/administration_compagnie_transport/ProgrammerOffreVoyage'
import creerModeTarif from '../components/administration_compagnie_transport/CreerModeTarif'
import selectionnerOffreVoyage from '../components/administration_compagnie_transport/SelectionnerOffreVoyage'
import modifierOffreVoyage from '../components/administration_compagnie_transport/ModifierOffreVoyage'
import rattacherJourSemaineOffreVoyage from '../components/administration_compagnie_transport/RattacherJourSemaineOffreVoyage'
import creerProprieteCaracteristiqueOffreVoyage from '../components/administration_compagnie_transport/CreerProprieteCaracteristiqueOffreVoyage'
import modifierModeTarif from '../components/administration_compagnie_transport/ModifierModeTarif'
import modifierVilleEscaleOffreVoyage from '../components/administration_compagnie_transport/ModifierVilleEscaleOffreVoyage'
import modifierJourOffreVoyage from '../components/administration_compagnie_transport/ModifierJourOffreVoyage'
import gestionBagageCompagnieTransport from '../components/administration_compagnie_transport/GestionBagageCompagnieTransport'
import creerGareCompagnieTransport from '../components/administration_compagnie_transport/CreerGareCompagnieTransport'
import selectionnerGareCompagnieTransport from '../components/administration_compagnie_transport/SelectionnerGareCompagnieTransport'
import tableauBord from '../components/Dashboard/TableauBord';
import creerModeAbonnement from '../components/administration_compagnie_transport/CreerModeAbonnement'
import creerModePaiement from '../components/administration_compagnie_transport/CreerModePaiement'
import selectionnerModeAbonnementEtPaiement from '../components/administration_compagnie_transport/SelectionnerModeAbonnementEtPaiement'
import modifierModePaiement from '../components/administration_compagnie_transport/ModifierModePaiement'
import documentAttestationTransport from '../components/administration_compagnie_transport/DocumentAttestationTransport'
import associerBusCompagnieTransport from '../components/administration_compagnie_transport/creerBusCompagnieTransport'
import resetPasswordUserCompagnie from '../components/administration_compagnie_transport/changerPasswordCompagnieTransport.vue'
import userProfilCompagnieTransport from '../components/administration_compagnie_transport/userProfilCompagnieTransport.vue'
import LandingPage from '../components/LandingPage'

// IMPORT FOR ENTITY VENDEUR 
import selectionnerReservationBillet from '../components/vendeur/SelectionnerReservationBillet'
import DetailReservation from '../components/vendeur/DetailReservation'
import selectionnerOffreVoyageReservation from '../components/vendeur/OffreVoyageReservation'
import reservationBillet from '../components/vendeur/ReservationBillet'
import modifierPays from '@/components/administrateur_societe/modifierPays.vue'
import modifierVille from '@/components/administrateur_societe/modifierVille.vue'
import UserInfo from '@/components/UserInfo.vue'
import InfosAdhesion from '@/components/InfosAdhesion.vue'
import InfosAdhesionValide from '@/components/InfosAdhesionValide.vue'
import creerDemandeAdhesion from '../components/CreerDemandeAdhesion'
import creerDemandeAdhesionInterne from '../components/administrateur_societe/CreerDemandeAdhesion copy.vue'
import SelectionnerProgrammeOffreVoyageList from '../components/vendeur/ProgrammeOffreVoyageList.vue'
//import { ROLE_ADMIN_COMPAGNIE_TRANSPORT , ROLE_ADMIN_SOCIETE_MERE } from '../components/globalConfig/constUsersRoles'
Vue.use(VueRouter)


const routes = [
  {
    path:'/LandingPage',
    name:'LandingPage',
    component:LandingPage
  },
  {
    path:'/Login',
    name:'Login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/Partenaires',
    name: 'creerDemandeAdhesion',
    component: creerDemandeAdhesion
  },

  {
    path: '/Accueil',
    name: 'userHome',
    component: EspaceUserAdmin,
    meta: { requiresAuth: true },
    children :[
      {
        path: '/creerOffreVoyage',
        name: 'creerOffreVoyage',
        component: creerOffreVoyage
      },
      {
        path: '/creerVilleEscale',
        name: 'creerVilleEscale',
        component: creerVilleEscale
      },
      {
        path: '/creerModeTarif',
        name: 'creerModeTarif',
        component: creerModeTarif
      },
      {
        path: '/programmeOffreVoyage',
        name: 'programmeOffreVoyage',
        component: programmerOffreVoyage
      },
      {
        path: '/selectionnerOffreVoyage',
        name: 'selectionnerOffreVoyage',
        component: selectionnerOffreVoyage
      },
      {
        path: '/rattacherJourSemaineOffreVoyage',
        name: 'rattacherJourSemaineOffreVoyage',
        component: rattacherJourSemaineOffreVoyage
      },
      {
        path: '/modifierOffreVoyage',
        name: 'modifierOffreVoyage',
        component: modifierOffreVoyage
      },
      {
        path: '/creerProprieteCaracteristiqueOffreVoyage',
        name: 'creerProprieteCaracteristiqueOffreVoyage',
        component: creerProprieteCaracteristiqueOffreVoyage
      },
      {
        path: '/modifierModeTarif',
        name: 'modifierModeTarif',
        component: modifierModeTarif
      },
      {
        path: '/modifierVilleEscaleOffreVoyage',
        name: 'modifierVilleEscaleOffreVoyage',
        component: modifierVilleEscaleOffreVoyage
      },
      {
        path: '/modifierJourOffreVoyage',
        name: 'modifierJourOffreVoyage',
        component: modifierJourOffreVoyage
      },
      {
        path: '/gestionBagageCompagnieTransport',
        name: 'gestionBagageCompagnieTransport',
        component: gestionBagageCompagnieTransport
      },
      {
        path: '/creerGareCompagnieTransport',
        name: 'creerGareCompagnieTransport',
        component: creerGareCompagnieTransport
      },
      {
        path: '/selectionnerGareCompagnieTransport',
        name: 'selectionnerGareCompagnieTransport',
        component: selectionnerGareCompagnieTransport
      },
      {
        path: '/creerModeAbonnement',
        name: 'creerModeAbonnement',
        component: creerModeAbonnement
      },
      {
        path: '/creerModePaiement',
        name: 'creerModePaiement',
        component: creerModePaiement
      },
      {
        path: '/selectionnerModeAbonnementEtPaiement',
        name: 'selectionnerModeAbonnementEtPaiement',
        component: selectionnerModeAbonnementEtPaiement
      },
      {
        path: '/modifierModePaiement',
        name: 'modifierModePaiement',
        component: modifierModePaiement
      },
      {
        path: '/documentAttestationTransport',
        name: 'documentAttestationTransport',
        component: documentAttestationTransport
      },
      {
        path: '/associerBusCompagnieTransport',
        name: 'associerBusCompagnieTransport',
        component: associerBusCompagnieTransport
      },
      {
        path: '/resetPasswordCompagnieTransport',
        name: 'resetPasswordCompagnieTransport',
        component: resetPasswordUserCompagnie
      },
      {
        path: '/userProfilCompagnieTransport',
        name: 'userProfilCompagnieTransport',
        component: userProfilCompagnieTransport
      },
      {
        path: '/tableauBord',
        name: 'tableauBord',
        component: tableauBord
      },
      {
        path: '/creerDemandeAdhesion',
        name: 'creerDemandeAdhesion',
        component: creerDemandeAdhesionInterne
      },
      {
        path: '/creerPays',
        name: 'creerPays',
        component: creerPays
      },
      {
        path: '/Pays/:designation',
        name: 'modifierPays',
        component: modifierPays
      },
      {
        path: '/Ville/:designation',
        name: 'modifierVille',
        component: modifierVille
      },
      {
        path: '/selectionnerPays',
        name: 'selectionnerPays',
        component: selectionnerPays
      },
      {
        path: '/creerCompagnieTransport',
        name: 'creerCompagnieTransport',
        component: creerCompagnieTransport
      },
      { 
        path:'/modifierCompagnieTransport',
        name:'modifierCompagnieTransport',
        component:modifierCompagnieTransport
      },
      {
        path: '/selectionnerCompagnieTransport',
        name: 'selectionnerCompagnieTransport',
        component: selectionnerCompagnieTransport
      },
      {
        path: '/creerVille',
        name: 'creerVille',
        component: creerVille
      },
      {
        path: '/selectionnerVille',
        name: 'selectionnerVille',
        component: selectionnerVille
      },
      {
        path: '/selectionnerDemandeAdhesionCompagnie',
        name: 'selectionnerDemandeAdhesionCompagnie',
        component: selectionnerDemandeAdhesionCompagnie
      },
      {
        path: '/creerFonctionnalite',
        name: 'creerFonctionnalite',
        component: creerFonctionnalite
      },
      {
        path: '/creerRoleUtilisateur',
        name: 'creerRoleUtilisateur',
        component: creerRoleUtilisateur
      },
      {
        path: '/creerUtilisateur',
        name: 'creerUtilisateur',
        component: creerUtilisateur
      },
      {
        path: '/gestionFonctionnalitesEtRoles',
        name: 'gestionFonctionnalitesEtRoles',
        component: gestionFunctionnalitesEtRoles
      },
      {
        path: '/monProfil',
        name: 'monProfil',
        component: modifierCompteUtilisateur
      },
      {
        path: '/resetPassword',
        name: 'resetPassword',
        component: resetPasswordUser
      },
      {
        path: '/selectionnerUtilisateur',
        name: 'selectionnerUtilisateur',
        component: selectionnerUtilisateur
      },
      {
        path: '/selectionnerReservationBillet',
        name: 'selectionnerReservationBillet',
        component: selectionnerReservationBillet
      },
      {
        path: '/selectionnerOffreVoyageReservation',
        name: 'selectionnerOffreVoyageReservation',
        component: selectionnerOffreVoyageReservation
      },
      {
        path: '/reservationBillet',
        name: 'reservationBillet',
        component: reservationBillet
      },
      {
        path: '/userInfo/:nom',
        name: 'userInfo',
        component: UserInfo
      },
      {
        path: '/InfosAdhesion/:raisonSociale',
        name: 'InfosAdhesion',
        component: InfosAdhesion
      },
      {
        path: '/InfosAdhesionValide/:raisonSociale',
        name: 'InfosAdhesionValide',
        component: InfosAdhesionValide
      },
      {
        path: '/detail_reservation',
        name: 'InfosAdhesionValide',
        component: DetailReservation
      },
      {
        path: '/offre_voyage_details',
        name: 'SelectionnerProgrammeOffreVoyageList',
        component: SelectionnerProgrammeOffreVoyageList
      },
    ]  
  },

  /*{
    path: '/connexionUtilisateurCompagnieTransport',
    name: 'connexionUtilisateurCompagnieTransport',
    component: connexionUtilisateurCompagnieTransport
  },*/
  /*{
    path: '/EspaceCompagnieTransport',
    name: 'EspaceCompagnieTransport',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about"  '../views/EspaceCompagnieTransport.vue'),
    meta: { requiresAuth: true, role: ROLE_ADMIN_COMPAGNIE_TRANSPORT },
    children:[
      {
        path: '/creerOffreVoyage',
        name: 'creerOffreVoyage',
        component: creerOffreVoyage
      },
      {
        path: '/creerVilleEscale',
        name: 'creerVilleEscale',
        component: creerVilleEscale
      },
      {
        path: '/creerDemandeAdhesion',
        name: 'creerDemandeAdhesion',
        component: creerDemandeAdhesion
      },
      {
        path: '/creerModeTarif',
        name: 'creerModeTarif',
        component: creerModeTarif
      },
      {
        path: '/programmeOffreVoyage',
        name: 'programmeOffreVoyage',
        component: programmerOffreVoyage
      },
      {
        path: '/selectionnerOffreVoyage',
        name: 'selectionnerOffreVoyage',
        component: selectionnerOffreVoyage
      },
      {
        path: '/rattacherJourSemaineOffreVoyage',
        name: 'rattacherJourSemaineOffreVoyage',
        component: rattacherJourSemaineOffreVoyage
      },
      {
        path: '/modifierOffreVoyage',
        name: 'modifierOffreVoyage',
        component: modifierOffreVoyage
      },
      {
        path: '/creerProprieteCaracteristiqueOffreVoyage',
        name: 'creerProprieteCaracteristiqueOffreVoyage',
        component: creerProprieteCaracteristiqueOffreVoyage
      },
      {
        path: '/modifierModeTarif',
        name: 'modifierModeTarif',
        component: modifierModeTarif
      },
      {
        path: '/modifierVilleEscaleOffreVoyage',
        name: 'modifierVilleEscaleOffreVoyage',
        component: modifierVilleEscaleOffreVoyage
      },
      {
        path: '/modifierJourOffreVoyage',
        name: 'modifierJourOffreVoyage',
        component: modifierJourOffreVoyage
      },
      {
        path: '/gestionBagageCompagnieTransport',
        name: 'gestionBagageCompagnieTransport',
        component: gestionBagageCompagnieTransport
      },
      {
        path: '/creerGareCompagnieTransport',
        name: 'creerGareCompagnieTransport',
        component: creerGareCompagnieTransport
      },
      {
        path: '/selectionnerGareCompagnieTransport',
        name: 'selectionnerGareCompagnieTransport',
        component: selectionnerGareCompagnieTransport
      },
      {
        path: '/creerModeAbonnement',
        name: 'creerModeAbonnement',
        component: creerModeAbonnement
      },
      {
        path: '/creerModePaiement',
        name: 'creerModePaiement',
        component: creerModePaiement
      },
      {
        path: '/selectionnerModeAbonnementEtPaiement',
        name: 'selectionnerModeAbonnementEtPaiement',
        component: selectionnerModeAbonnementEtPaiement
      },
      {
        path: '/modifierModePaiement',
        name: 'modifierModePaiement',
        component: modifierModePaiement
      },
      {
        path: '/documentAttestationTransport',
        name: 'documentAttestationTransport',
        component: documentAttestationTransport
      },
      {
        path: '/associerBusCompagnieTransport',
        name: 'associerBusCompagnieTransport',
        component: associerBusCompagnieTransport
      },
      {
        path: '/resetPasswordCompagnieTransport',
        name: 'resetPasswordCompagnieTransport',
        component: resetPasswordUserCompagnie
      },
      {
        path: '/userProfilCompagnieTransport',
        name: 'userProfilCompagnieTransport',
        component: userProfilCompagnieTransport
      },
      {
        path: '/tableauBord',
        name: 'tableauBord',
        component: tableauBord
      },
    ]
  },*/

  /*{
    path: '/EspaceAdminSociete',
    name: 'EspaceAdminSociete',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about"  '../views/EspaceAdminSociete'),
    meta: { requiresAuth: true, role: ROLE_ADMIN_SOCIETE_MERE },
    children:[
      {
        path: '/creerPays',
        name: 'creerPays',
        component: creerPays
      },
      {
        path: '/selectionnerPays',
        name: 'selectionnerPays',
        component: selectionnerPays
      },
      {
        path: '/creerCompagnieTransport',
        name: 'creerCompagnieTransport',
        component: creerCompagnieTransport
      },
      { 
        path:'/modifierCompagnieTransport',
        name:'modifierCompagnieTransport',
        component:modifierCompagnieTransport
      },
      {
        path: '/selectionnerCompagnieTransport',
        name: 'selectionnerCompagnieTransport',
        component: selectionnerCompagnieTransport
      },
      {
        path: '/creerVille',
        name: 'creerVille',
        component: creerVille
      },
      {
        path: '/selectionnerVille',
        name: 'selectionnerVille',
        component: selectionnerVille
      },
      {
        path: '/selectionnerDemandeAdhesionCompagnie',
        name: 'selectionnerDemandeAdhesionCompagnie',
        component: selectionnerDemandeAdhesionCompagnie
      },
      {
        path: '/creerFonctionnalite',
        name: 'creerFonctionnalite',
        component: creerFonctionnalite
      },
      {
        path: '/creerRoleUtilisateur',
        name: 'creerRoleUtilisateur',
        component: creerRoleUtilisateur
      },
      {
        path: '/creerUtilisateur',
        name: 'creerUtilisateur',
        component: creerUtilisateur
      },
      {
        path: '/gestionFonctionnalitesEtRoles',
        name: 'gestionFonctionnalitesEtRoles',
        component: gestionFunctionnalitesEtRoles
      },
      {
        path: '/monProfil',
        name: 'monProfil',
        component: modifierCompteUtilisateur
      },
      {
        path: '/resetPassword',
        name: 'resetPassword',
        component: resetPasswordUser
      },
      {
        path: '/selectionnerUtilisateur',
        name: 'selectionnerUtilisateur',
        component: selectionnerUtilisateur
      }
    ]
  },*/
  
  /*{
    path: '/connexion',
    name: 'connexion',
    component: connexionUtilisateurCompagnieTransport
  },*/
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// Ajoutez une garde de navigation globale pour vérifier les autorisations
router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem("auth") === "true";
  if (to.matched.some(record => record.meta.requiresAuth && !isAuth)) {
    next({name : 'Login'})
  } else {
    next();
  }
});


export default router



