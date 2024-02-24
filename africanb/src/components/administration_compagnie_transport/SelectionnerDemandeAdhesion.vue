<template>
    <v-app>
        <v-container fluid>
            <v-card>
            <v-card-title class="title-card">VOS DEMANDES D'ADHESIONS
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Rechercher" single-line hide-details></v-text-field>               
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="demandeAdhesionList"
                :search="search"
            ></v-data-table>
        </v-card>
        </v-container>
    </v-app>
</template>

<script>
export default {
    name:"SelectionnerDemandeAdhesion",
    data(){
        return{
            search : '',
            demandeAdhesionList : [],
            headers:[
                {text : 'reference' , value : 'id'},
                {text : 'Designation' , value : 'designation'},
                {text : 'Status' , value : 'statusActuel'},
                {text : 'Actions' , value : 'actions' , sortable : false}
            ]
        }
    }
}
</script>