<template>
    <v-app>
        <v-card>
            <v-card-title class="title-card">LISTE DES PAYS
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>               
            </v-card-title>
            
            <v-data-table :headers="headers" :items="paysList" :loading="loading" :search="search">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon title="editer" color="blue" small class="mr-2" @click="editPays(item)">mdi-pencil</v-icon>                       
                    <v-icon title="supprimer" color="red" small class="mr-2" @click="supprimerProduitLogement(item)">mdi-delete</v-icon>
                </template>
            </v-data-table>
            <v-alert class="myalert alert-error" type="error" width="350px" dismissible>{{ errorMsg }}</v-alert>
        </v-card>
    </v-app>
</template>

<script>
import axios from "axios"
import $ from "jquery"
import { API_OBTENIR_LISTE_DES_PAYS_DISPONIBLE , HEADERS } from '../globalConfig/globalConstConfig'
export default {
    name:'SelectionnerPays',
    data(){
        return{
            objectValue : {},
            errorMsg:null,

            loading: true,
            options: {
                index : 0,
                size : 4
            },
            search : '',
            paysList : [],
            headers:[
                {text: 'reference' , value : 'id'},
                {text: 'Designation' , value : 'designation'},
                {text: 'Actions' , value : 'actions' , sortable : false}
            ]
        }
    },

    methods :{
        editPays(pays){
            const parsedPays = JSON.stringify(pays);
            localStorage.setItem('pays', parsedPays);
            this.$router.push({name: "modifierPays" , params:{designation:pays.designation} });
        },


        // RECUPERER LA LISTE DES PAYS ENREGISTRÉS
        async readAllPaysFromApi(){
            this.loading = false
            await axios.post(API_OBTENIR_LISTE_DES_PAYS_DISPONIBLE, this.objectValue , { headers : HEADERS(this.$store.state.userAuthentified.token) }).then((response) => {
                this.paysList = response.data.items
            }).catch((e) => {
                this.errorMsg = e ;
                $(".alert-error").fadeIn();
                setTimeout(function(){
                    $(".alert-error").fadeOut(); 
                }, 4000)
            })
        },
        

        // SUPPRIMER UN PAYS
        supprimerPays(){},
    },

    mounted(){
        this.readAllPaysFromApi()
    }
}
</script>

<style scoped>
    .title-card{
        font-weight: bold;
        color: black;
        font-size: 17px;
    }

    .myalert{
        display: none;
        z-index: 1900;
    }

    .alert-error{
        position: fixed;
        top: 25px;
        right:2%;
        width: 25%;
    }
</style>