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
                :search="search"
            ></v-data-table>
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