<template>
    <v-app>
        <v-navigation-drawer app v-model="drawer" :mini-variant.sync="mini">
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
                    <v-list-item-title>TABLEAU DE BORD</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list>
            
            <v-list dense nav v-for="menu in buildComponentFromFunctionnalities" :key="menu.title">
                <v-list-item link @click="$router.push({path:menu.navigation}).catch(() => {})">
                <v-list-item-icon>
                    <v-icon color="teal">{{ menu.icon }}</v-icon>
                </v-list-item-icon>
        
                <v-list-item-content>
                    <v-list-item-title>{{ menu.title.toUpperCase() }}</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app color="white">
            <v-app-bar-nav-icon color="dark" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>
                <v-img max-height="50px" max-width="75px" src="../assets/logo_africanbus.jpg"></v-img>
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
                            <v-list-item-title>{{ $store.state.userAuthentified.prenoms }}  {{ $store.state.userAuthentified.nom }}</v-list-item-title>
                            <v-list-item-subtitle>{{ $store.state.userAuthentified.email }}</v-list-item-subtitle>
                        </v-list-item-content>
                        </v-list-item>
                    </v-list>
        
                    <v-divider></v-divider>
        
                    <v-list>
                        <v-list-item link @click="$router.push({name:'userProfilCompagnieTransport'}).catch(() => {})">
                            <v-list-item-icon>
                                <v-icon>mdi-account-cog</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title><span class="font-weight-thin">Mon profil</span></v-list-item-title>
                        </v-list-item>

                        <v-list-item link @click="$router.push({name:'resetPasswordCompagnieTransport'}).catch(() => {})">
                            <v-list-item-icon>
                                <v-icon>mdi-account-key</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title><span class="font-weight-thin">Changer le mot de passe</span></v-list-item-title>
                        </v-list-item>
            
                        <v-list-item link>
                            <v-list-item-icon>
                                <v-icon>mdi-logout</v-icon>
                            </v-list-item-icon>
                            <v-dialog v-model="dialogLogout" persistent max-width="290">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-list-item-title v-on="on" v-bind="attrs" class="font-weight-thin">Déconnexion</v-list-item-title>
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
    </v-app>
</template>

<script>
import axios from 'axios';
import { API_GET_FUNCTIONNALITY_BY_ROLE , HEADERS } from '../components/globalConfig/globalConstConfig'
import { FUNCTIONNALITY_CREATE_OFFRE_VOYAGE , FUNCTIONNALITY_CREATE_VILLE , FUNCTIONNALITY_LISTING_VILLE , FUNCTIONNALITY_RATTACHE_ATTESTION_TRANSPORT } from '../components/globalConfig/constFunctionnalies'
import { FUNCTIONNALITY_CREATE_USER_FUNCTION , FUNCTIONNALITY_CREATE_USER_ROLE , FUNCTIONNALITY_CREATE_USER_ACCOUNT , FUNCTIONNALITY_DEMANDE_ADHESION} from '../components/globalConfig/constFunctionnalies'
import { FUNCTIONNALITY_CREATE_PAYS , FUNCTIONNALITY_LISTING_PAYS } from '../components/globalConfig/constFunctionnalies'
export default {
    name:'EspaceUI',
    data(){
        return{
            menuProfil:false,
            dialogLogout : false,
            mini:true,
            drawer: true,
            functionnalitiesListByUserRole : [],
            functionnalitiesListComponents : []
        }
    },

    methods :{

        //RECUPERER LA LISTE DE TOUTES LES FONCTIONNALITÉS CREES
        async getAllFunctionnalitiesByUserRole(){
            await axios.post(API_GET_FUNCTIONNALITY_BY_ROLE, { data : { code : this.$store.state.userAuthentified.roleCode } }, { headers : HEADERS } ).then((response) => {
                if (response.status == 200) {
                    if (response.data.status.code == 800) {
                        this.functionnalitiesListByUserRole = response.data.items;
                        console.log(this.functionnalitiesListByUserRole)
                    }
                }
            }).catch((e) => {
                console.log(e)
            })
        },

        // METHODE PERMETTANT À UN UTILISATEUR DE SE DECONNECTER
        logout() {
            this.$store.commit('DESTROY_SESSION_USER');
            this.$router.replace('/')
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
                if (element.code == FUNCTIONNALITY_CREATE_VILLE) {
                    var createTownFunction = { title : 'CREER UNE VILLE' , icon : 'mdi-town-hall' , navigation : '/creerVille' };
                    globalFunctionnalities.push(createTownFunction);
                }
                if (element.code == FUNCTIONNALITY_LISTING_VILLE) {
                    var createTownSelected = { title : 'GESTION DES VILLES' , icon : 'mdi-town-hall' , navigation : '/selectionnerVille' };
                    globalFunctionnalities.push(createTownSelected);
                }

                if (element.code == FUNCTIONNALITY_CREATE_PAYS) {
                    var createCountryFunction = { title : 'CREER UN PAYS' , icon : 'mdi-town-hall' , navigation : '/creerPays' };
                    globalFunctionnalities.push(createCountryFunction);
                }

                if (element.code == FUNCTIONNALITY_LISTING_PAYS) {
                    var createCountrySelected = { title : 'GESTION DES PAYS' , icon : 'mdi-town-hall' , navigation : '/selectionnerPays' };
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
            });
            return globalFunctionnalities ; 
        }

    },

    mounted(){
        this.getAllFunctionnalitiesByUserRole();
    }
}
</script>