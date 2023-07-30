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
                <v-list-item link @click="$router.push({path:'/associerBusCompagnieTransport'}).catch(() => {})">
                <v-list-item-icon>
                    <v-icon color="teal">{{ menu.icon }}</v-icon>
                </v-list-item-icon>
        
                <v-list-item-content>
                    <v-list-item-title>{{ menu.title }}</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list>

        </v-navigation-drawer>
    </v-app>
</template>

<script>
import axios from 'axios';
import { API_GET_ALL_FUNCTIONNALITIES , HEADERS } from '../components/globalConfig/globalConstConfig'
export default {
    name:'EspaceUI',
    data(){
        return{
            mini:true,
            drawer: true,
            functionnalitiesListByUserRole : [],
            functionnalitiesListComponents : []
        }
    },

    methods :{

        //RECUPERER LA LISTE DE TOUTES LES FONCTIONNALITÉS CREES
        async getAllFunctionnalitiesByUserRole(){
            await axios.post(API_GET_ALL_FUNCTIONNALITIES, { data : { code : this.$store.state.userAuthentified.roleCode } }, { headers : HEADERS } ).then((response) => {
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

    },

    computed:{

        buildComponentFromFunctionnalities(){
            var globalFunctionnalities = [];
            this.functionnalitiesListByUserRole.forEach(element => {
                console.log(element)
                if (element.code == "FunctionnalityValidateTicket") {
                    console.log("ok")
                    var menuFonction = { title : 'Test Fonctionnalité' , icon : 'mdi-magnify' , navigation : '/creerOffreVoyage' };
                    globalFunctionnalities.push(menuFonction);
                }
            });
            console.log(globalFunctionnalities.length)
            return globalFunctionnalities ; 
        }

    },

    mounted(){
        this.getAllFunctionnalitiesByUserRole()
    }
}
</script>