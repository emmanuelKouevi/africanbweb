<template>
    <v-app>
        <v-main>

            <v-container>

                <v-card elevation="5">
                    <v-card-title>CREER UNE OFFRE DE VOYAGE</v-card-title>
                    <v-card-subtitle>Mettre en ligne un nouvel offre de voyage</v-card-subtitle>
                    
                    <v-expansion-panels multiple>

                        <v-expansion-panel>
                            <v-expansion-panel-header class="font-weight-bold">INFORMATION(S) GÉNÉRALE(S) SUR L'OFFRE</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-container fluid>
                                    <v-row>
                                        <v-col><v-text-field color="teal" label="Désignation" ></v-text-field></v-col>
                                    </v-row>
                                    <br>
                                    <v-row>
                                        <v-col><v-textarea color="teal" label="Description" dense></v-textarea></v-col>
                                    </v-row>
                                    <br>
                                    <v-row>
                                        <v-col cols="6"><v-select color="teal" prefix="De :" label="Ville de départ"></v-select></v-col>
                                        <v-col cols="6"><v-select color="teal" prefix="Vers :" label="ville d'arrivée"></v-select></v-col>
                                    </v-row>
                                    <br>
                                    <v-row>
                                        <v-col cols="6"><v-select color="teal" label="Type de voyage" dense></v-select></v-col>
                                        <v-col cols="6">
                                            <v-dialog transition="dialog-top-transition" max-width="700">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn color="secondary" rounded small v-bind="attrs" v-on="on">Ajouter des villes escales &nbsp;<v-icon>mdi-plus-circle</v-icon></v-btn>
                                                </template>

                                                <template v-slot:default="dialog">
                                                    <v-card>
                                                        <v-toolbar color="black" dark><span class="font-weight-bold">PARAMÈTRAGE DES VILLES D'ESCALES</span></v-toolbar>
                                                        <v-card-text>
                                                            <v-container fluid>
                                                                <v-subheader>
                                                                    Définissez l'ordre et vos villes pour les escales
                                                                    <v-spacer></v-spacer>
                                                                    <v-btn small rounded icon title="Ajouter une ville" @click="ajouterNouvelleVilleEscale()"><v-icon color="black" size="20">mdi-plus</v-icon></v-btn>
                                                                </v-subheader>
                                                                <v-row justify="space-between" v-for="ville , index in villesEscalesList" :key="index">
                                                                    <v-col cols="3"><v-text-field color="black" dense outlined rounded type="number" min="0" label="N° Ordre"></v-text-field></v-col>
                                                                    <v-col cols="6"><v-select dense outlined rounded label="Sélectionnez la ville"></v-select></v-col>
                                                                    <v-col><v-btn icon dense><v-icon color="primary">mdi-pencil</v-icon></v-btn></v-col>
                                                                    <v-col><v-btn icon dense @click="supprimerVilleEscale(index)"><v-icon color="red">mdi-delete</v-icon></v-btn></v-col>
                                                                </v-row>
                                                            </v-container>
                                                        </v-card-text>
                                                        <v-card-actions class="justify-end">
                                                            <v-btn text @click="dialog.value = false">Effectuer</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </template>
                                            </v-dialog>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel>
                            <v-expansion-panel-header class="font-weight-bold">PROGRAMME DE L'OFFRE</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-subheader>Programmez vos offres de voyages
                                    <v-spacer></v-spacer>
                                    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn rounded small color="secondary" dark v-bind="attrs" v-on="on"><v-icon>mdi-calendar-sync</v-icon> Programmer une offre</v-btn>
                                        </template>

                                        <v-card>
                                            <v-toolbar dark dense color="teal">
                                                <v-btn icon dark @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
                                                <v-toolbar-title><span class="font-weight-bold">Programmer une offre</span></v-toolbar-title>
                                                <v-spacer></v-spacer>
                                                <v-toolbar-items>
                                                    <v-btn dark text @click="dialog = false">Save</v-btn>
                                                </v-toolbar-items>
                                            </v-toolbar><br>

                                            <v-container>
                                                <v-row>                                          
                                                    <v-col cols="12" sm="6">
                                                        <v-text-field disabled rounded outlined dense color="teal" v-model="dateRangeText" label="Jour de la semaine" prepend-icon="mdi-calendar" readonly></v-text-field>
                                                    </v-col>

                                                    <v-col cols="12" sm="6">
                                                        <v-date-picker color="teal" v-model="dates"></v-date-picker>
                                                    </v-col>
                                                </v-row>
                                            </v-container>

                                            <v-divider></v-divider>

                                            <v-container>
                                                <v-row>
                                                    <v-col>
                                                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                                            :return-value.sync="date" transition="scale-transition" offset-y
                                                            min-width="auto" >

                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-text-field v-model="date" label="Date de départ" prepend-icon="mdi-calendar"
                                                                    readonly v-bind="attrs" v-on="on">
                                                                </v-text-field>
                                                            </template>

                                                            <v-date-picker v-model="date" no-title scrollable>
                                                                <v-spacer></v-spacer>
                                                                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                                                <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                                            </v-date-picker>
                                                        </v-menu>
                                                    </v-col>

                                                    <v-col>
                                                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                                            :return-value.sync="date" transition="scale-transition" offset-y
                                                            min-width="auto" >

                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-text-field v-model="date" label="Date d'arrivée" prepend-icon="mdi-calendar"
                                                                    readonly v-bind="attrs" v-on="on">
                                                                </v-text-field>
                                                            </template>

                                                            <v-date-picker v-model="date" no-title scrollable>
                                                                <v-spacer></v-spacer>
                                                                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                                                <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                                            </v-date-picker>
                                                        </v-menu>
                                                    </v-col>
                                                </v-row>

                                                <v-row>
                                                    <v-col>
                                                        <v-menu ref="menu" v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                                                            :return-value.sync="time" transition="scale-transition" offset-y max-width="290px"
                                                            min-width="290px">

                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-text-field v-model="heureDepart" label="Heure de départ" prepend-icon="mdi-clock-time-four-outline"
                                                                    readonly v-bind="attrs" v-on="on">
                                                                </v-text-field>
                                                            </template>
                                                            <v-time-picker v-if="menu2" v-model="heureDepart" full-width 
                                                                @click:minute="$refs.menu.save(heureDepart)">
                                                            </v-time-picker>
                                                        </v-menu>
                                                    </v-col>

                                                    <v-col>
                                                        <v-menu ref="menu" v-model="menu3" :close-on-content-click="false" :nudge-right="40"
                                                            :return-value.sync="time" transition="scale-transition" offset-y max-width="290px"
                                                            min-width="290px">

                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-text-field v-model="heureDepart" label="Heure d'arrivée'" prepend-icon="mdi-clock-time-four-outline"
                                                                    readonly v-bind="attrs" v-on="on">
                                                                </v-text-field>
                                                            </template>
                                                            <v-time-picker v-if="menu3" v-model="heureArrivee" full-width 
                                                                @click:minute="$refs.menu.save(heureArrivee)">
                                                            </v-time-picker>
                                                        </v-menu>
                                                    </v-col>
                                                </v-row>
                                            </v-container>
                                            
                                            <v-divider></v-divider>
                                        </v-card>
                                    </v-dialog>
                                </v-subheader>
                                
                            </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel>
                            <v-expansion-panel-header class="font-weight-bold">PRIX DE L'OFFRE</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-container fluid>
                                    <v-row>
                                        <v-col cols="6"><v-select color="teal" label="Mode de l'offre"></v-select></v-col>
                                        <v-col cols="6"><v-text-field color="teal" suffix="Francs CFA" label="Prix de l'offre"></v-text-field></v-col>
                                    </v-row>
                                </v-container>
                            </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel>
                            <v-expansion-panel-header class="font-weight-bold">CARACTERISTIQUES DE L'OFFRE</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-row>
                                    <v-col>
                                        <v-checkbox label="Wifi à bord" color="teal" value="red" hide-details></v-checkbox>
                                    </v-col>
                                    <v-col>
                                        <v-checkbox label="Prise éléctrique" color="teal" value="red" hide-details></v-checkbox>
                                    </v-col>
                                </v-row>
                            </v-expansion-panel-content>
                        </v-expansion-panel>

                </v-expansion-panels>
                
                </v-card>

                <br>

                <v-row justify="space-around">
                    <v-col cols="6"><v-btn outlined rounded><v-icon>mdi-sync</v-icon> REINITIALISER</v-btn></v-col>
                    <v-col cols="6"><v-btn outlined rounded dark color="teal"><v-icon>mdi-check</v-icon> CRÉER L'OFFRE</v-btn></v-col>                
                </v-row>

            </v-container>

        </v-main>
    </v-app>
</template>

<script>
export default {
    name:"CreerOffreVoyage",
    data(){
        return{
            villesEscalesList:[],
            dialog: false,
            date:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            time:null,
            heureArrivee:null,
            heureDepart:null,
            menu2:false,
            menu3:false
        }
    },

    methods:{

        ajouterNouvelleVilleEscale(){
            var nouvelleVille = {}
            this.villesEscalesList.push(nouvelleVille);
        },

        supprimerVilleEscale(position){
            this.villesEscalesList.splice(position , 1);
        }

    },

    computed: {
        dateRangeText () {
            return this.dates
        },
    },

}
</script>

<style scoped>

</style>