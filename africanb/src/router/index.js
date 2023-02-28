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

import connexion from '../components/authentification/ConnexionUtilisateur.vue'
import inscription from '../components/authentification/InscriptionUtilisateur.vue'

import creerOffreVoyage from '../components/administration_compagnie_transport/CreerOffreVoyage'
import creerVilleEscale from '../components/administration_compagnie_transport/CreerVilleEscale'
import programmerOffreVoyage from '../components/administration_compagnie_transport/ProgrammerOffreVoyage'
import creerModeTarif from '../components/administration_compagnie_transport/CreerModeTarif'
import creerDemandeAdhesion from '../components/administration_compagnie_transport/CreerDemandeAdhesion'
import selectionnerOffreVoyage from '../components/administration_compagnie_transport/SelectionnerOffreVoyage'
import modifierOffreVoyage from '../components/administration_compagnie_transport/ModifierOffreVoyage'
import rattacherJourSemaineOffreVoyage from '../components/administration_compagnie_transport/RattacherJourSemaineOffreVoyage'
import creerProprieteCaracteristiqueOffreVoyage from '../components/administration_compagnie_transport/CreerProprieteCaracteristiqueOffreVoyage'

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
    component: connexion
  },
  {
    path: '/inscription',
    name: 'inscription',
    component: inscription
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
