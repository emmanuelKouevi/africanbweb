<template>
    <v-app>
        <v-card>
            <v-card-title class="title-card">LISTE DES COMPAGNIES
                <v-spacer></v-spacer>
                <v-btn color="primary" height="30px"><v-icon>mdi-plus</v-icon>Nouvelle Compagnie</v-btn>
               
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
    name:'SelectionnerCompagnieTransport',
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