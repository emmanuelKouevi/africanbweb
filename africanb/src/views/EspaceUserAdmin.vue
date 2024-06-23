<template>
    <v-app id="inspire">
        <v-navigation-drawer app v-model="drawer" width="350">
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-thin">{{ $store.state.userAuthentified.compagnieTransportRaisonSociale }}</v-list-item-title>
                    <v-list-item-subtitle>Société AFRICANB</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense nav>
                <v-list-item link @click="$router.push({path:'/tableauBord'}).catch(() => {})">
                <v-list-item-icon>
                    <v-icon color="teal">mdi-view-dashboard</v-icon>
                </v-list-item-icon>
        
                <v-list-item-content>
                    <v-list-item-title class="list-item-title">TABLEAU DE BORD</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list>

            <!--
            <v-list>

                <v-list-group v-for="item in items" :key="item.title" v-model="item.active" :prepend-icon="item.icon" no-action>

                    <template v-slot:activator>
                        <v-list-item-content><v-list-item-title v-text="item.title"></v-list-item-title></v-list-item-content>
                    </template>
  
                    <v-list-item link v-for="child in item.items" :key="child.title">
                        <v-list-item-content>
                            <v-list-item-title @click="$router.push({path:child.navigation}).catch(() => {})" v-text="child.title"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                </v-list-group>

            </v-list> -->

            
            
            <v-list dense nav v-for="menu in buildComponentFromFunctionnalities" :key="menu.title">
                <v-list-item link @click="$router.push({path:menu.navigation}).catch(() => {})">
                <v-list-item-icon>
                    <v-icon color="teal">{{ menu.icon }}</v-icon>
                </v-list-item-icon>
        
                <v-list-item-content>
                    <v-list-item-title class="list-item-title">{{ menu.title.toUpperCase() }}</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-system-bar app color="teal">
            <v-spacer></v-spacer>
            <v-btn text><span class="lang">FR</span></v-btn>&nbsp;&nbsp;
            <v-divider vertical></v-divider>&nbsp;&nbsp;
            <v-btn text><span class="lang">EN</span></v-btn>&nbsp;&nbsp;
        </v-system-bar>

        <v-app-bar app color="white">
            <v-app-bar-nav-icon color="dark" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>
                <v-img max-height="50px" max-width="75px" src="../assets/UB.jpg"></v-img>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-menu v-model="menuProfil" :close-on-content-click="false" :nudge-width="200" offset-x>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon color="transparent" v-bind="attrs" v-on="on"><v-avatar size="30"><v-img src="../assets/undraw_profile.svg"></v-img></v-avatar></v-btn>
                </template>
        
                <v-card>
                    <v-list>
                        <v-list-item>  
                        <v-list-item-content>
                            <v-list-item-title class="simple_title">{{ $store.state.userAuthentified.prenoms }}  {{ $store.state.userAuthentified.nom }}</v-list-item-title>
                            <v-list-item-subtitle class="simple_title">{{ $store.state.userAuthentified.email }}</v-list-item-subtitle>
                        </v-list-item-content>
                        </v-list-item>
                    </v-list>
        
                    <v-divider></v-divider>
        
                    <v-list>
                        <v-list-item link @click="$router.push({name:'userProfilCompagnieTransport'}).catch(() => {})">
                            <v-list-item-icon>
                                <v-icon>mdi-account-cog</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title><span class="simple_title">Mon profil</span></v-list-item-title>
                        </v-list-item>

                        <v-list-item link @click="$router.push({name:'resetPasswordCompagnieTransport'}).catch(() => {})">
                            <v-list-item-icon>
                                <v-icon>mdi-account-key</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title><span class="simple_title">Changer le mot de passe</span></v-list-item-title>
                        </v-list-item>
            
                        <v-list-item link>
                            <v-list-item-icon>
                                <v-icon>mdi-logout</v-icon>
                            </v-list-item-icon>
                            <v-dialog v-model="dialogLogout" persistent max-width="290">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-list-item-title v-on="on" v-bind="attrs" class="simple_title">Déconnexion</v-list-item-title>
                                </template>
                                <v-card>
                                    <v-card-title class="text-h5">Voulez-vous vraiment vous déconnecter ?</v-card-title>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="primary" @click="dialogLogout = false" text>Annuler</v-btn>
                                        <v-btn color="primary" @click="logout" text>Accepter</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
        </v-app-bar>

        <v-main>
            <!-- Provides the application the proper gutter -->
            <router-view></router-view> 
        </v-main>
    </v-app>
</template>

<script>
import axios from 'axios';
import { API_GET_FUNCTIONNALITY_BY_ROLE , HEADERS } from '../components/globalConfig/globalConstConfig'
import { FUNCTIONNALITY_CREATE_OFFRE_VOYAGE , FUNCTIONNALITY_CREATE_VILLE , FUNCTIONNALITY_LISTING_VILLE , FUNCTIONNALITY_RATTACHE_ATTESTION_TRANSPORT , FUNCTIONNALITY_CREATE_JOUR_OFFRE_VOYAGE , FUNCTIONNALITY_CREATE_PROGRAMME_OFFRE_VOYAGE } from '../components/globalConfig/constFunctionnalies'
import { FUNCTIONNALITY_CREATE_USER_FUNCTION , FUNCTIONNALITY_CREATE_USER_ROLE , FUNCTIONNALITY_CREATE_USER_ACCOUNT , FUNCTIONNALITY_DEMANDE_ADHESION , FUNCTIONNALITY_CREATE_PAYS , FUNCTIONNALITY_LISTING_PAYS } from '../components/globalConfig/constFunctionnalies'
import { FUNCTIONNALITY_CREATE_VILLE_ESCALE , FUNCTIONNALITY_CREATE_PRIX_OFFRE_VOYAGE , FUNCTIONNALITY_CREATE_BUS_OFFRE_VOYAGE , FUNCTIONNALITY_LIST_ADHESION } from '../components/globalConfig/constFunctionnalies'
import { FUNCTIONNALITY_CREATE_CARACTERISTIQUE_OFFRE_VOYAGE , FUNCTIONNALITY_CREATE_GARE_TRANSPORT , FUNCTIONNALITY_LISTING_GARE_TRANSPORT, FUNCTIONNALITY_CREATE_BAGAGE , } from '../components/globalConfig/constFunctionnalies'
import { FUNCTIONNALITY_CREATE_MODE_ABONNEMENT , FUNCTIONNALITY_CREATE_MODE_PAIEMENT , FUNCTIONNALITY_LISTING_MODE_PAIEMENT , FUNCTIONNALITY_LISTING_OFFRE_VOYAGE } from '../components/globalConfig/constFunctionnalies'
import { FUNCTIONNALITY_RESERVING_FROM_OFFRE_VOYAGE , FUNCTIONNALITY_SELECTION_RESERVATION_TICKET , FUNCTIONNALITY_MANAGE_ALL_ACCOUNT_USER , FUNCTIONNALITY_MANAGING_ROLE_AND_FUNCTIONNALITY } from '../components/globalConfig/constFunctionnalies'
export default {
    name:'EspaceUI',
    data(){
        return{
            menuProfil:false,
            dialogLogout : false,
            mini:true,
            drawer: true,
            functionnalitiesListByUserRole : [],
            functionnalitiesListComponents : [],

            items: [

                {
                    icon: 'mdi-ticket',
                    items: [
                        { title : 'CREER UNE OFFRE DE VOYAGE' , icon : 'mdi-train-car' , navigation : '/creerOffreVoyage', funct: "FUNCTIONNALITY_CREATE_OFFRE_VOYAGE" },
                        { title : 'VOIR MES OFFRES ENREGISTRÉS' , icon : 'mdi-ticket' , navigation : '/selectionnerOffreVoyage' },
                        { title : 'PROPRIETE OFFRE DE VOYAGE' , icon : 'mdi-feature-search' , navigation : '/creerProprieteCaracteristiqueOffreVoyage' }
                    ],
                    title: 'OFFRES DE VOYAGES',
                },

                {
                    icon: 'mdi-silverware-fork-knife',
                    active: true,
                    items: [
                        { title : 'CREER UNE VILLE' , icon : 'mdi-domain' , navigation : '/creerVille' },
                        { title : 'TARIFER UNE OFFRE' , icon : 'mdi-currency-usd' , navigation : '/creerModeTarif' },
                        { title : 'CREER UNE GARE' , icon : 'mdi-subway' , navigation : '/creerGareCompagnieTransport' },
                        { title : 'GESTION DES GARES' , icon : 'mdi-store-cog' , navigation : '/selectionnerGareCompagnieTransport' }
                    ],
                    title: 'LOCALITÉ',
                },

                {
                    icon: 'mdi-silverware-fork-knife',
                    active: true,
                    items: [
                        { title : 'DATER UNE OFFRE DE VOYAGE' , icon : 'mdi-calendar' , navigation : '/rattacherJourSemaineOffreVoyage' },
                        { title : 'TARIFER UNE OFFRE' , icon : 'mdi-currency-usd' , navigation : '/creerModeTarif' },
                        { title : 'PROGRAMMER UNE OFFRE' , icon : 'mdi-clock-outline' , navigation : '/programmeOffreVoyage' },
                    ],
                    title: 'PLANIFICATIONS DES OFFRES',
                },

                {
                    action: 'mdi-school',
                    items: [
                        { title : 'DÉLIVRER UN BUS' , icon : 'mdi-bus' , navigation : '/associerBusCompagnieTransport' },
                    ],
                    title: 'GESTIONS DES BUS',
                },

                {
                    action: 'mdi-human-male-female-child',
                    items: [
                        { title : 'ROLE UTILISATEUR' , icon : 'mdi-account-credit-card' , navigation : '/creerRoleUtilisateur' },
                        { title : 'GERER LES COMPTES' , icon : 'mdi-account-credit-card' , navigation : '/selectionnerUtilisateur'},
                        { title : 'AJOUTER UN MEMBRE' , icon : 'mdi-account-plus' , navigation : '/creerUtilisateur' }

                    ],
                    title: 'GESTIONS DES UTILISATEURS',
                },

                {
                    action: 'mdi-bottle-tonic-plus',
                    items: [
                        { title : 'AJOUTER DES FONCTIONNALITÉS' , icon : 'mdi-cog' , navigation : '/creerFonctionnalite' },
                        { title : 'ROLE ET FONCTIONNALITÉ' , icon : 'mdi-account-credit-card' , navigation : '/gestionFonctionnalitesEtRoles'}
                    ],
                    title: 'PARAMÈTRES',
                },

                {
                    action: 'mdi-briefcase',
                    items: [
                        { title : 'CREER MODE ABONNEMENT' , icon : 'mdi-bank-transfer-out' , navigation : '/creerModeAbonnement' },
                        { title : 'CREER MODE DE PAIEMENT' , icon : 'mdi-account-credit-card' , navigation : '/creerModePaiement' },
                        { title : 'MODE ABONNEMENT ET PAIEMENT' , icon : 'mdi-cash-sync' , navigation : '/selectionnerModeAbonnementEtPaiement' }
                    ],
                    title: 'ABONNEMENT ET PAIEMENT',
                },

                {
                    action: 'mdi-briefcase',
                    items: [
                        { title : 'DEMANDE D\'ADHESION' , icon : 'mdi-newspaper-check' , navigation : '/creerDemandeAdhesion' },
                        { title : 'LISTE DES DEMANDES D\'ADHESION' , icon : 'mdi-account-credit-card' , navigation : '/selectionnerDemandeAdhesionCompagnie' },
                        { title : 'DOCUMENT DE TRANSPORT' , icon : 'mdi-file-chart-check' , navigation : '/documentAttestationTransport' }
                    ],
                    title: 'AUTRES OPÉRATIONS',
                },

                {
                    action: 'mdi-tag',
                    items: [
                        { title : 'CONSULTER LES OFFRES' , icon : 'mdi-train-car' , navigation : '/selectionnerOffreVoyageReservation' },
                        { title : 'GESTION DES RESERVATIONS' , icon : 'mdi-clipboard-list' , navigation : '/selectionnerReservationBillet'},

                    ],
                    title: 'ESPACE VENDEUR',
                },
            ],
        }
    },

    methods :{

        // RECUPERER LES DONNNES DE L'UTILISATEUR CONNECTÉ POUR LA SAUVEGARDE DE SA SESSION
        storeSessionUser(){
            if(localStorage.getItem('token_user')){
                const userConnected = JSON.parse(localStorage.getItem('token_user'));
                this.$store.state.userAuthentified = userConnected;
            }
        },

        //RECUPERER LA LISTE DES FONCTIONNALITÉS PAR ROLE UTILISATEURS
        async getAllFunctionnalitiesByUserRole(){
            this.storeSessionUser();
            await axios.post(API_GET_FUNCTIONNALITY_BY_ROLE, { data : { code : this.$store.state.userAuthentified.roleCode } }
            , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code == 800) {
                        this.functionnalitiesListByUserRole = response.data.items;
                    }
                }
            }).catch((e) => {
                console.log(e)
            })
        },

        // Bloquer la session de l'utilisateur
        destroyLocalSession(){
            if(localStorage.getItem("token_user")){
                localStorage.removeItem("token_user");
                localStorage.setItem("auth",false);
            }
        },

        // METHODE PERMETTANT À UN UTILISATEUR DE SE DECONNECTER
        logout() {
            this.destroyLocalSession();
            this.$store.commit('DESTROY_SESSION_USER');
            this.$router.replace('/')
        },

        checkIfFunctionnalityExist(functionnality){
            var exist = false;
            this.functionnalitiesListByUserRole.forEach(element => {
                if (element.funct == functionnality) {
                    exist = true
                }
            });
            return exist;
        },

    },

    computed:{


        buildComponentFromFunctionnalities(){
            var globalFunctionnalities = [];
            this.functionnalitiesListByUserRole.forEach(element => {
                if (element.code == FUNCTIONNALITY_CREATE_OFFRE_VOYAGE) {
                    var createOffreVoyageFunction = { title : 'CREER UNE OFFRE DE VOYAGE' , icon : 'mdi-train-car' , navigation : '/creerOffreVoyage' };
                    globalFunctionnalities.push(createOffreVoyageFunction);
                }
                if (element.code == FUNCTIONNALITY_LISTING_OFFRE_VOYAGE) {
                    var listingOffreVoyageFunction = { title : 'VOIR MES OFFRES ENREGISTRÉS' , icon : 'mdi-ticket' , navigation : '/selectionnerOffreVoyage' };
                    globalFunctionnalities.push(listingOffreVoyageFunction);
                }
                if (element.code == FUNCTIONNALITY_CREATE_VILLE) {
                    var createTownFunction = { title : 'CREER UNE VILLE' , icon : 'mdi-domain' , navigation : '/creerVille' };
                    globalFunctionnalities.push(createTownFunction);
                }
                if (element.code == FUNCTIONNALITY_LISTING_VILLE) {
                    var createTownSelected = { title : 'GESTION DES VILLES' , icon : 'mdi-office-building-cog' , navigation : '/selectionnerVille' };
                    globalFunctionnalities.push(createTownSelected);
                }

                if (element.code == FUNCTIONNALITY_CREATE_PAYS) {
                    var createCountryFunction = { title : 'CREER UN PAYS' , icon : 'mdi-town-hall' , navigation : '/creerPays' };
                    globalFunctionnalities.push(createCountryFunction);
                }

                if (element.code == FUNCTIONNALITY_LISTING_PAYS) {
                    var createCountrySelected = { title : 'GESTION DES PAYS' , icon : 'mdi-wrench-cog' , navigation : '/selectionnerPays' };
                    globalFunctionnalities.push(createCountrySelected);
                }

                if (element.code == FUNCTIONNALITY_RATTACHE_ATTESTION_TRANSPORT) {
                    var bindTravelFile = { title : 'DOCUMENT DE TRANSPORT' , icon : 'mdi-file-chart-check' , navigation : '/documentAttestationTransport' };
                    globalFunctionnalities.push(bindTravelFile);
                }
                if (element.code == FUNCTIONNALITY_CREATE_USER_ROLE) {
                    var userRoleFunction = { title : 'GESTION DES ROLES' , icon : 'mdi-account-key' , navigation : '/creerRoleUtilisateur' };
                    globalFunctionnalities.push(userRoleFunction);
                }
                if (element.code == FUNCTIONNALITY_CREATE_USER_FUNCTION) {
                    var userFunction = { title : 'AJOUTER DES FONCTIONNALITÉS' , icon : 'mdi-cog' , navigation : '/creerFonctionnalite' };
                    globalFunctionnalities.push(userFunction);
                }
                if (element.code == FUNCTIONNALITY_CREATE_USER_ACCOUNT) {
                    var userAccountFunction = { title : 'AJOUTER UN MEMBRE' , icon : 'mdi-account-plus' , navigation : '/creerUtilisateur' };
                    globalFunctionnalities.push(userAccountFunction);
                }
                if (element.code == FUNCTIONNALITY_DEMANDE_ADHESION) {
                    var demandAdhesionFunction = { title : 'DEMANDE D\'ADHESION' , icon : 'mdi-newspaper-check' , navigation : '/creerDemandeAdhesion' };
                    globalFunctionnalities.push(demandAdhesionFunction);
                }
                if (element.code == FUNCTIONNALITY_CREATE_JOUR_OFFRE_VOYAGE) {
                    var daterOffreFunction = { title : 'DATER UNE OFFRE DE VOYAGE' , icon : 'mdi-calendar' , navigation : '/rattacherJourSemaineOffreVoyage' };
                    globalFunctionnalities.push(daterOffreFunction);
                }
                if (element.code == FUNCTIONNALITY_CREATE_PROGRAMME_OFFRE_VOYAGE) {
                    var programmeOffreFunction = { title : 'PROGRAMMER UNE OFFRE' , icon : 'mdi-clock-outline' , navigation : '/programmeOffreVoyage' };
                    globalFunctionnalities.push(programmeOffreFunction);
                }
                if (element.code == FUNCTIONNALITY_CREATE_VILLE_ESCALE) {
                    var creerVilleEscaleFunction = { title : 'CREER VILLE ESCALE' , icon : 'mdi-city-switch' , navigation : '/creerVilleEscale' };
                    globalFunctionnalities.push(creerVilleEscaleFunction);
                }
                if (element.code == FUNCTIONNALITY_CREATE_PRIX_OFFRE_VOYAGE) {
                    var tariferOffreFunction = { title : 'TARIFER UNE OFFRE' , icon : 'mdi-currency-usd' , navigation : '/creerModeTarif' };
                    globalFunctionnalities.push(tariferOffreFunction);
                }
                if (element.code == FUNCTIONNALITY_CREATE_BUS_OFFRE_VOYAGE) {
                    var creerBusOffreFunction = { title : 'DÉLIVRER UN BUS' , icon : 'mdi-bus' , navigation : '/associerBusCompagnieTransport' };
                    globalFunctionnalities.push(creerBusOffreFunction);
                }
                if (element.code == FUNCTIONNALITY_CREATE_CARACTERISTIQUE_OFFRE_VOYAGE) {
                    var createFeatureOffre = { title : 'PROPRIETE OFFRE DE VOYAGE' , icon : 'mdi-feature-search' , navigation : '/creerProprieteCaracteristiqueOffreVoyage' };
                    globalFunctionnalities.push(createFeatureOffre);
                }
                if (element.code == FUNCTIONNALITY_CREATE_GARE_TRANSPORT) {
                    var creerGareFunction = { title : 'CREER UNE GARE' , icon : 'mdi-subway' , navigation : '/creerGareCompagnieTransport' };
                    globalFunctionnalities.push(creerGareFunction);
                }
                if (element.code == FUNCTIONNALITY_LISTING_GARE_TRANSPORT) {
                    var gestionGareFunction = { title : 'GESTION DES GARES' , icon : 'mdi-store-cog' , navigation : '/selectionnerGareCompagnieTransport' };
                    globalFunctionnalities.push(gestionGareFunction);
                }
                if (element.code == FUNCTIONNALITY_CREATE_BAGAGE) {
                    var creerBagageFunction = { title : 'AFFECTER DES BAGAGES' , icon : 'mdi-bag-checked' , navigation : '/gestionBagageCompagnieTransport' };
                    globalFunctionnalities.push(creerBagageFunction);
                }
                if (element.code == FUNCTIONNALITY_CREATE_MODE_ABONNEMENT) {
                    var creerModeAbonnement = { title : 'CREER MODE ABONNEMENT' , icon : 'mdi-bank-transfer-out' , navigation : '/creerModeAbonnement' };
                    globalFunctionnalities.push(creerModeAbonnement);
                }
                if (element.code == FUNCTIONNALITY_CREATE_MODE_PAIEMENT) {
                    var creerModePaiement = { title : 'CREER MODE DE PAIEMENT' , icon : 'mdi-account-credit-card' , navigation : '/creerModePaiement' };
                    globalFunctionnalities.push(creerModePaiement);
                }
                if (element.code == FUNCTIONNALITY_LIST_ADHESION) {
                    var listAdhesionDisponible = { title : 'LISTE DES DEMANDES D\'ADHESION' , icon : 'mdi-account-credit-card' , navigation : '/selectionnerDemandeAdhesionCompagnie' };
                    globalFunctionnalities.push(listAdhesionDisponible);
                }
                if (element.code == FUNCTIONNALITY_CREATE_USER_FUNCTION) {
                    var creerUserFunctionnality = { title : 'FONCTIONNALITÉ UTILISATEUR' , icon : 'mdi-account-credit-card' , navigation : '/creerFonctionnalite' };
                    globalFunctionnalities.push(creerUserFunctionnality);
                }
                if (element.code == FUNCTIONNALITY_CREATE_USER_ROLE) {
                    var creerUserRole = { title : 'ROLE UTILISATEUR' , icon : 'mdi-account-credit-card' , navigation : '/creerRoleUtilisateur' };
                    globalFunctionnalities.push(creerUserRole);
                }
                if (element.code == FUNCTIONNALITY_MANAGING_ROLE_AND_FUNCTIONNALITY) {
                    var manageRoleAndFunctionnality = { title : 'ROLE ET FONCTIONNALITÉ' , icon : 'mdi-account-credit-card' , navigation : '/gestionFonctionnalitesEtRoles'};
                    globalFunctionnalities.push(manageRoleAndFunctionnality);
                }
                if (element.code == FUNCTIONNALITY_MANAGE_ALL_ACCOUNT_USER) {
                    var manageAllUserAccount = { title : 'GERER LES COMPTES' , icon : 'mdi-account-credit-card' , navigation : '/selectionnerUtilisateur'};
                    globalFunctionnalities.push(manageAllUserAccount);
                }
                if (element.code == FUNCTIONNALITY_LISTING_MODE_PAIEMENT) {
                    var gestionPaiementEtAbonnementFunction = { title : 'MODE ABONNEMENT ET PAIEMENT' , icon : 'mdi-cash-sync' , navigation : '/selectionnerModeAbonnementEtPaiement' };
                    globalFunctionnalities.push(gestionPaiementEtAbonnementFunction);
                }
                if (element.code == FUNCTIONNALITY_RESERVING_FROM_OFFRE_VOYAGE) {
                    var selectingFromTravel = { title : 'CONSULTER LES OFFRES' , icon : 'mdi-train-car' , navigation : '/selectionnerOffreVoyageReservation' };
                    globalFunctionnalities.push(selectingFromTravel);
                }
                if (element.code == FUNCTIONNALITY_SELECTION_RESERVATION_TICKET) {
                    var managingReservation = { title : 'GESTION DES RESERVATIONS' , icon : 'mdi-clipboard-list' , navigation : '/selectionnerReservationBillet' };
                    globalFunctionnalities.push(managingReservation);
                }
            });
            return globalFunctionnalities ; 
        },


    },

    mounted(){
        this.getAllFunctionnalitiesByUserRole();
    }
}
</script>

<style scoped>
    .lang{
        color: white;
    }

    .list-item-title{
        font-family: 'Raleway';
        font-size: 20px;
        
    }

    .simple_title{
        font-family: 'Raleway';
    }
</style>