<template>

    <v-app id="inspire">

        <v-app-bar app color="teal">
            <v-toolbar-title class="icon_owner">
                <v-img lazy-src="https://picsum.photos/id/11/10/6" max-height="60" max-width="100" src="../assets/UB.jpg"></v-img>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn class="onglets" text><a href="#aboutMe" class="link">À PROPOS</a></v-btn>
            <v-btn class="onglets" text><a href="#skills" class="link">NOS SERVICES</a></v-btn>
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }"><v-btn text dark v-bind="attrs" v-on="on">PARTENAIRES</v-btn></template>
                <v-list>
                    <v-list-item link @click="goToAdhesionPage">
                        <v-list-item-title><v-icon>mdi-account</v-icon>&nbsp;&nbsp;<small>Demander une adhésion</small></v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu> 
            <v-btn class="onglets" text><a href="#contact" class="link">NOUS CONTACTER</a></v-btn>
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }"><v-btn text dark v-bind="attrs" v-on="on">CONNEXION</v-btn></template>
                <v-list>
                    <v-list-item link @click="goToLoginPage">
                        <v-list-item-title><v-icon>mdi-login</v-icon>&nbsp;&nbsp;<small>Se connecter</small></v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu> 

        </v-app-bar>

        <v-parallax height="750" dark src='../assets/other_inside_bus.jpg'>
            <v-row align="center" justify="center">
                <v-col class="text-center"  cols="12">
                    <h1 class="text-h3 font-weight-bold mb-4"><span id="urban_text">URBAN</span> <span id="bus_text">BUS</span> <span id="ticket_text">TICKET'S</span></h1>
                    <h1 class="font-weight-thin mb-4">OFFREZ VOUS DES SERVICES DE QUALITÉS.</h1>
                </v-col>
            </v-row>
        </v-parallax><br><br>

        <v-btn class="button_to_top"  rounded color="#3c6382" bottom ><v-icon size="25" color="white">mdi-arrow-up</v-icon></v-btn>

        <!-- Sizes your content based upon application components -->
        <v-main>
            <v-container fluid>
                <v-sheet>
                    <v-row justify="center" align="center"><h1 class="section" id="aboutMe">À PROPOS DE</h1></v-row><br><br><br>

                    <v-row>
                        <v-col><v-img src="" cover height="350" width="500"></v-img></v-col>

                        <v-col cols>
                            <span class="aboutMe_content font-weight-thin">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores, sunt necessitatibus. Quibusdam deserunt rerum voluptatem ullam, molestiae omnis. Nisi quidem autem perferendis perspiciatis. Necessitatibus dolorum recusandae accusamus? Minus, autem voluptatibus.
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae porro magnam rerum quas? Accusantium aspernatur consectetur tempore hic ab omnis, in, corporis numquam temporibus laboriosam corrupti officia optio quam velit!
                            </span>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-container><br><br><br>

            <div class="container-fluid">
                <v-parallax height="300" dark src='../assets/travel_by_car.jpg'>
                
                </v-parallax>
            </div><br><br><br>

            <v-container fluid>
                <v-sheet>
                    <v-row justify="center" align="center"><h1 class="section" id="skills">NOS SERVICES</h1></v-row><br>
                    <div class="competences font-weight-thin">
                        <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea laboriosam ut at sed? Explicabo impedit voluptate</p>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus laborum quisquam natus molesti </p>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium nihil odio dolorem.</p>
                    </div><br>
                    <v-row>
                        <v-col class="card_skill">

                        </v-col>
                    </v-row>

                    <v-row>
                    
                    </v-row>

                </v-sheet>

                </v-container><br><br><br>

                    <v-container fluid class="mb-5">
                        <v-sheet>
                            <v-row justify="center" align="center"><h1 class="section" id="projects">NOS PARTENAIRES</h1></v-row><br>
                            <v-row justify="center" align="center">
                                <v-col>
                                    <div class="competences font-weight-thin">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, esse! Odit esse quisquam enim laboriosam officia magnam nihil ratione ducimus voluptatem cumque sunt laborum dolore ullam, sequi, quaerat pariatur architecto.</div><br>
                                </v-col>
                            </v-row>
                        </v-sheet>

                    </v-container><br><br><br><br><br><br>


                    <div class="container-fluid">
                        <v-parallax height="870" dark src=''>
                            <div class="section_contact"><h1 id="contact">CONTACTEZ - MOI</h1></div>
                            <span class="text-center">Renseignez ce formulaire de contact, je vous repondrai dans les plus brefs délais</span>
                            <v-row justify="center">
                                <v-col cols="8">
                                    <v-form>
                                        <v-sheet color="black" class="contact_form">
                                            <v-container fluid>
                                                <v-row>
                                                    <v-col><v-text-field class="my_input" dense label="Votre nom" solo></v-text-field></v-col>
                                                    <v-col><v-text-field class="my_input" dense label="Votre Prénom" solo></v-text-field></v-col>
                                                </v-row>

                                                <v-row>
                                                    <v-col><v-text-field class="my_input" dense label="Votre E-mail" solo></v-text-field></v-col>
                                                    <v-col><v-text-field class="my_input" dense label="N° de Téléphone" solo></v-text-field></v-col>                                            
                                                </v-row>

                                                <v-row>
                                                    <v-col><v-text-field class="my_input" dense label="Objet" solo></v-text-field></v-col>
                                                </v-row>

                                                <v-row>
                                                    <v-col><v-textarea class="my_input" dense label="Votre message" solo></v-textarea></v-col>
                                                </v-row>

                                                <v-row>
                                                    <v-col>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
                                                            <label class="form-check-label font-weight-bold" for="flexCheckChecked"> En soumettant ce formulaire, j'accepte que mes données personnelles soient utilisées pour me recontacter. Aucun autre traitement ne sera effectué avec mes informations.</label>
                                                        </div>
                                                    </v-col>
                                                
                                                </v-row>

                                                <v-row>
                                                    <v-col class="text-center"><v-btn class="btn_form" type="submit" color="#192a56">ENVOYER</v-btn></v-col>
                                                </v-row>
                                            </v-container>
                                        </v-sheet>
                                    </v-form>
                                </v-col>

                            </v-row><br>

                            <v-row justify="space-between" align="center">
                                <v-col><v-icon color="white">mdi-email-fast</v-icon> <span class="font-weight-thin">emmanuelhervekouevi@gmail.com</span></v-col>
                                <v-col><v-icon color="white">mdi-cellphone-sound</v-icon> <span class="font-weight-thin">+225 07 89 72 85 01</span></v-col>
                                <v-col><v-icon color="white">mdi-home-city</v-icon> <span class="font-weight-thin">Côte d'Ivoire - Abidjan</span></v-col>
                                <v-col><v-icon color="white">mdi-linkedin</v-icon> <span class="font-weight-thin">Linkedin</span></v-col>
                            </v-row>

                        </v-parallax>

                    </div><br><br><br>

                </v-main>

            <v-footer height="100" color=#2d3436>
                
                <v-container fluid>

                    <v-row>
                        <v-col class="text-center">
                            <span class="copyright">© copyright - Urban Bus Ticket Tous droits réservés</span>
                        </v-col>
                    </v-row>

                </v-container>

            </v-footer>

    </v-app>
</template>

<script>

export default {
    name:"LandingVue",

    methods:{
        // GO TO LOGIN PAGE TO GET INTEFACE USER
        goToLoginPage(){
            this.$router.push({path:"/Login"})
        },

        // GO TO LOGIN PAGE TO GET INTEFACE USER
        goToAdhesionPage(){
            this.$router.push({path:"/Partenaires"})
        }
    },

    computed:{
        
        //GESTION DES CONTRAINTES (SAISIE UTILISATEUR)
        usernameError(){
            const errors = [];
            if (!this.$v.userLogin.login.$dirty) return errors
            !this.$v.userLogin.login.required && errors.push('Entrer votre pseudo ou e-mail de connexion.')
            return errors 
        },

        passwordError(){
            const errors = [];
            if (!this.$v.userLogin.password.$dirty) return errors
            !this.$v.userLogin.password.required && errors.push('Entrer votre mot de passe.')
            return errors 
        }

    },

    mounted(){

    }
}
</script>

<style lang="scss" scoped>

    .section{

        color: #192a56;

        font-size: 35px;

        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    }

    .avatar{

        color: black;

        font-weight: bold;

        font-size: 25px;

    }

    .onglets{

        font-size: 12px;

        font-weight: bold;

    }

    .onglets :hover{

        font-size: 16px;

        cursor: pointer;

    }

    .aboutMe_content{

        color: black;

        font-size: 20px;

    }

    .icon_owner{

        font-size: 40px;

        font-weight: bold;

    }


    .v-card--reveal {

        align-items: center;

        bottom: 0;

        justify-content: center;

        opacity: .8;

        position: absolute;

        width: 100%;

    }

    .agence{

        font-weight: bold;

        color: #303952;
    }

    .libelle_application{

        font-size: 12px; 

    }

    #odc{

        color: orange;

        font-weight: bold;

    }

    .competences{

        text-align: center;

        color: black;

    }

    .skill_libelle{

        text-align: center;

        font-weight: 600;

        color: black;

    }

    .card_skill :hover{

        cursor: pointer;

        background: #273c75;

        .icon_skill{

            color:white

        };
        .skill_libelle{

            color: white;

        }
    }

    .text-h5{

        color: white;

        font-weight: 400;

        font-style: italic;

        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

    }


    .author{

        color: #636e72;

        font-weight: thin;

        font-style: italic;

        font-size: 25px;

    }

    .section_contact{

        text-align: center;

        margin-top: 75px;

    }

    .contact_form{

        opacity: 0.9;

        border-radius: 2%;

        margin-top: 50px;

    }

    .btn_form{

        background: #192a56;

        color: white;

        font-weight: bold;

    }

    .my_input{

        font-weight: bolder;

        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }

    .agreement {

        color: white;

    }

    .checkbox{

        color: white;

    }

    .form-check-label{

        color: white;

    }

    .copyright{

        color: white;

        font-size: 18px;

        font-family: Georgia, 'Times New Roman', Times, serif;

    }

    .link{

        color: white;

        text-decoration: none;

    }

    .button_to_top{

        border-radius: 50px;

        height: 100%;

        top: 75%;

        right: 0;

        margin-right: 15px;

        position: fixed;

        z-index: 2500;

        visibility: hidden;

    }

    #urban_text{
        color: #192a56;
    }

    #ticket_text{
        color: teal;
    }
</style>