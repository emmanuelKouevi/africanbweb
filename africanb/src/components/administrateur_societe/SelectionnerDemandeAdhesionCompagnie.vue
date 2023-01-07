<template>
    <v-app>
        <v-card>
            <v-card-title class="title-card">DEMANDES D'ADHESION EN ATTENTE
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="compagnieTransportList"
                :search="search">

                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon title="editer" color="blue" small class="mr-2" @click="editCompagnieTransport(item)">mdi-pencil</v-icon>
                    <v-icon title="valider" color="success" small class="mr-2" @click="editCompagnieTransport(item)">mdi-async</v-icon>                       
                    <v-icon title="supprimer" color="red" small class="mr-2" @click="supprimerProduitLogement(item)">mdi-delete</v-icon>
                </template>
            
            </v-data-table>
        </v-card>
    </v-app>
</template>

<script>
export default {
    name:'SelectionnerDemandeAdhesionCompagnie',
    data(){
        return{
            search : '',
            compagnieTransportList : [],
            headers:[
                {text : 'reference' , value : 'id'},
                {text : 'Designation' , value : 'designation'},
                {text : 'Status' , value : 'statusActuel'},
                {text : 'Actions' , value : 'actions' , sortable : false}
            ]
        }
    },
}
</script>

<style scoped>
    .title-card{
        font-weight: bold;
        color: black;
        font-size: 17px;
    }
</style>