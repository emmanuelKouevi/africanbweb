import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

import creerCompagnieTransport from '../components/administrateur_societe/CreerCompagnieTransport'
import modifierCompagnieTransport from '../components/administrateur_societe/ModifierCompagnieTransport'
import selectionnerCompagnieTransport from '../components/administrateur_societe/SelectionnerCompagnieTransport'
import selectionnerDemandeAdhesionCompagnie from '../components/administrateur_societe/SelectionnerDemandeAdhesionCompagnie'

import creerPays from '../components/administrateur_societe/CreerPays'
import selectionnerPays from '../components/administrateur_societe/SelectionnerPays'
import creerVille from '../components/administrateur_societe/CreerVille'
import selectionnerVille from '../components/administrateur_societe/SelectionnerVille'

//import connexion from '../components/authentification/ConnexionUtilisateur.vue'
import inscription from '../components/authentification/InscriptionUtilisateur.vue'
import connexionUtilisateurCompagnieTransport from '../components/administration_compagnie_transport/authentification/connexionUtilisateurCompagnieTransport'

import creerOffreVoyage from '../components/administration_compagnie_transport/CreerOffreVoyage'
import creerVilleEscale from '../components/administration_compagnie_transport/CreerVilleEscale'
import programmerOffreVoyage from '../components/administration_compagnie_transport/ProgrammerOffreVoyage'
import creerModeTarif from '../components/administration_compagnie_transport/CreerModeTarif'
import creerDemandeAdhesion from '../components/administration_compagnie_transport/CreerDemandeAdhesion'
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
import tableauBord from '../components/administration_compagnie_transport/TableauBord';
import creerModeAbonnement from '../components/administration_compagnie_transport/CreerModeAbonnement'
import creerModePaiement from '../components/administration_compagnie_transport/CreerModePaiement'
import selectionnerModeAbonnementEtPaiement from '../components/administration_compagnie_transport/SelectionnerModeAbonnementEtPaiement'
import modifierModePaiement from '../components/administration_compagnie_transport/ModifierModePaiement'
import documentAttestationTransport from '../components/administration_compagnie_transport/DocumentAttestationTransport'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/EspaceCompagnieTransport',
    name: 'EspaceCompagnieTransport',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/EspaceCompagnieTransport.vue'),
    children:[
      {
        path: '/connexionUtilisateurCompagnieTransport',
        name: 'connexionUtilisateurCompagnieTransport',
        component: connexionUtilisateurCompagnieTransport
      },
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
        path: '/tableauBord',
        name: 'tableauBord',
        component: tableauBord
      },
    ]
  },

  {
    path: '/EspaceAdminSociete',
    name: 'EspaceAdminSociete',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/EspaceAdminSociete'),
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
    ]
  },
  
  {
    path: '/connexion',
    name: 'connexion',
    component: connexionUtilisateurCompagnieTransport
  },
  {
    path: '/inscription',
    name: 'inscription',
    component: inscription
  },

  /*{
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true, roles: ['admin', 'user'] } // Exemple de garde d'authentification et de rôles
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true, roles: ['admin'] } // Exemple de garde d'authentification et de rôles
  },*/
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Définition d'une garde de navigation globale

//router.beforeEach((to, from, next) => {
//  const isLoggedIn =true /* Vérifier si l'utilisateur est connecté */;
//  const userRoles = []/* Obtenir les rôles de l'utilisateur */;
  
//  if (to.meta.requiresAuth && !isLoggedIn) {
    // Redirection vers la page de connexion si l'utilisateur n'est pas connecté
//    next('/login');
 // } else if (to.meta.roles && !hasRequiredRoles(userRoles, to.meta.roles)) {
    // Redirection vers une page d'erreur ou une page par défaut si l'utilisateur n'a pas les rôles requis
   // next('/error');
 // } else {
    // Continuer vers la route demandée
   // next();
 // }
//});

// Méthode utilitaire pour vérifier si l'utilisateur a les rôles requis
/*function hasRequiredRoles(userRoles, requiredRoles) {
  return userRoles.some(role => requiredRoles.includes(role));
}*/



export default router



