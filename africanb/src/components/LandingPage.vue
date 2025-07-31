<template>
  <v-app id="inspire">
    <nav class="navbar">
      <div class="container-fluid">
        <a class="navbar-brand">
          <img
            src="../assets/urbanGo.png"
            height="140"
            width="150"
            alt=""
            class="animate__animated animate__backInLeft animate__delay-1s"
          />
        </a>
        <ul class="nav nav-pills justify-content-end">
          <li class="nav-item">
            <a class="nav-link" href="#aboutUs-section" aria-current="page"
              >À PROPOS</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#our-services">SERVICES</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#partner-section">NOUS CONTACTER</a>
          </li>

          &nbsp;&nbsp;
          <li class="nav-item">
            <v-btn color="#159e72" @click="goToLoginPage"
              ><span>SE CONNECTER</span>&nbsp;&nbsp;<v-icon color="white"
                >mdi-login</v-icon
              ></v-btn
            >
          </li>
        </ul>
      </div>
    </nav>

    <div class="container" id="top-header">
      <div class="container-fluid" id="top-header">
        <div class="row header text-center">
          <div class="col-lg-7">
            <img
              class="animate__animated animate__backInLeft animate__slower"
              src="../assets/urban.jpg"
              height="400px"
              alt=""
            />
            <h1 class="font-weight-bold enough">
              Réservez vos billets en un clic !!!
            </h1>
            <br />

            <div class="content_text">
              <p>
                Découvrez la nouvelle façon de réserver vos billets de
                transport, spectacles et événements. Une interface intuitive,
                des prix transparents et une confirmation instantanée. Votre
                prochaine aventure commence maintenant, sans stress ni
                complication.
              </p>
            </div>
          </div>

          <div class="col-lg-5" id="img_header">
            <v-card
              color="white"
              class="animate__animated animate__backInDown animate__delay-2s"
            >
              <v-card-title
                ><span class="scheduled_travel"
                  >Planifiez vos voyages en toute sérénité</span
                ></v-card-title
              >
              <v-card-text>
                <div class="row">
                  <div class="col-lg-5">
                    <select
                      class="form-select scheduled_input"
                      aria-label="Default select example"
                      aria-placeholder="Départ"
                    >
                      <option>Départ</option>
                    </select>
                  </div>
                  <div class="col-lg-2">
                    <v-btn color="#159e72"
                      ><v-icon color="white" size="30">mdi-sync</v-icon></v-btn
                    >
                  </div>
                  <div class="col-lg-5">
                    <select
                      class="form-select scheduled_input"
                      aria-label="Default select example"
                      aria-placeholder="Destination"
                    >
                      <option>Destination</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-8">
                    <input
                      type="date"
                      class="form-control scheduled_input"
                      placeholder="Date de départ"
                    />
                  </div>
                  <div class="col-lg-3">
                    <v-btn text color="#159e72"
                      ><v-icon>mdi-magnify</v-icon
                      ><span>Rechercher</span></v-btn
                    >
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid aboutUs_background">
      <div class="container">
        <div class="row justify-content-center">
          <h1 class="section_title" id="aboutUs-section">
            <v-icon color="#2C3A47" size="64">mdi-menu-right</v-icon>À PROPOS
          </h1>
        </div>
        <br />

        <div
          class="container"
          data-aos="flip-right"
          data-aos-delay="1000"
          data-aos-duration="800"
        >
          <span id="aboutUs_text">
            Urban Bus Ticket’s simplifie vos voyages en autocar à travers la
            Côte d’Ivoire en vous offrant une plateforme intuitive de
            réservation en ligne. Avec nous, réservez facilement, rapidement, et
            en toute sécurité, en profitant d’un large choix d’itinéraires,
            d’horaires et de tarifs compétitifs. Notre mission est de rendre vos
            déplacements en autocar aussi fluides que possible. En collaboration
            avec des transporteurs de confiance, nous assurons flexibilité,
            confort, et tranquillité d’esprit. Que ce soit pour le travail, les
            loisirs, ou une aventure entre amis, chaque étape de votre
            réservation est optimisée pour répondre à vos attentes. Nous sommes
            fiers de fournir une alternative pratique et abordable aux autres
            modes de transport en Côte d’Ivoire. Chez Urban Bus Ticket’s, nous
            vous offrons le confort, la fiabilité et le service client de
            qualité que vous méritez. Merci de voyager avec nous – votre confort
            est notre priorité !
          </span>
        </div>
      </div>
    </div>
    <br />

    <div class="container ourServices">
      <br /><br /><br /><br /><br /><br /><br />
      <div class="row justify-content-center" id="our-services">
        <h1 class="section_title">
          <v-icon color="#2C3A47" size="64">mdi-menu-right</v-icon>NOS SERVICES
        </h1>
      </div>
      <br />
      <div class="container">
        <br />
        <div class="row">
          <div
            class="col-lg-4"
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
            data-aos-delay="500"
          >
            <v-card rounded="xl" elevation="5" height="600px">
              <v-img src="../assets/growth.svg" height="220" cover></v-img>
              <v-divider></v-divider>
              <v-card-title>Simplification de la Réservation 📲</v-card-title>
              <v-card-text>
                Notre mission est de rendre la réservation en autocar aussi
                simple et rapide que possible. Grâce à une interface intuitive
                et sécurisée, nous permettons aux usagers de réserver leur
                trajet en quelques clics. Voyager devient aussi facile que de
                naviguer sur votre téléphone.
              </v-card-text>
            </v-card>
          </div>

          <div
            class="col-lg-4"
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
            data-aos-delay="800"
          >
            <v-card rounded="xl" elevation="5" height="600px">
              <v-img src="../assets/managing.svg" height="220" cover></v-img>
              <v-divider></v-divider>
              <v-card-title>Choix et Flexibilité 🔍</v-card-title>
              <v-card-text>
                Accédez à une grande variété d’itinéraires et de transporteurs.
                Sur notre plateforme, comparez facilement les horaires, tarifs,
                et options de siège proposés par différents transporteurs. Que
                vous voyagiez pour affaires, en famille ou entre amis, trouvez
                l'option idéale pour vous.
              </v-card-text>
            </v-card>
          </div>

          <div
            class="col-lg-4"
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
            data-aos-delay="1100"
          >
            <v-card rounded="xl" elevation="5" height="600px">
              <v-img
                src="../assets/otp-security.svg"
                height="220"
                cover
              ></v-img>
              <v-divider></v-divider>
              <v-card-title
                >Service Client : Accompagnement et Suivi 🤝</v-card-title
              >
              <v-card-text>
                Votre satisfaction est notre priorité. Bien que chaque compagnie
                de transport gère directement son service client, les équipes
                d'Urban Bus Ticket’s travaillent en étroite collaboration avec
                elles pour traiter vos réclamations et s’assurer que vos
                préoccupations soient prises en compte. Nous nous engageons à
                faciliter le dialogue entre les voyageurs et les transporteurs
                pour une expérience de voyage sans souci.
              </v-card-text>
            </v-card>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid partner_background">
      <div class="container">
        <div class="row justify-content-center">
          <h1 class="section_title" id="partner-section">
            <v-icon color="#2C3A47" size="64">mdi-menu-right</v-icon>PARTENARIAT
          </h1>
        </div>
        <br />

        <div class="container">
          <div class="row">
            <v-card> </v-card>
            <div class="col-lg-7">
              <div>
                Chez Urban Bus Ticket’s, nous nous engageons à fournir un
                service clientèle exceptionnel, répondant aux questions et aux
                préoccupations de nos clients avec rapidité et efficacité. Nous
                sommes là pour accompagner nos clients à chaque étape de leur
                voyage, de la réservation initiale à l'arrivée à destination.
                Nous sommes fiers de jouer un rôle dans la facilitation des
                voyages en autocar, en offrant aux voyageurs une alternative
                pratique et abordable aux autres modes de transport. Chez Urban
                Bus Ticket’s, nous sommes déterminés à rendre chaque voyage
                aussi agréable que possible, en offrant la commodité, la
                fiabilité et le service de qualité que nos clients méritent.
                Merci de nous faire confiance pour vos besoins de voyage en
                autocar.
              </div>
              <br />
              <v-btn
                class="partner_btn"
                @click="
                  $router.push({ path: '/DemandeAdhesion' }).catch(() => {})
                "
                small
                btn
                ><span class="adhesion">DEMANDER VOTRE ADHÉSION</span></v-btn
              >
            </div>

            <div
              class="col-lg-5"
              data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-delay="300"
              data-aos-offset="0"
              data-aos-duration="1500"
            >
              <v-card rounded="xl" max-height="">
                <v-img src="../assets/partner.jpg" height="400" cover></v-img>
              </v-card>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
    <br />

    <v-footer color="secondary">
      <v-container fluid>
        <v-row>
          <v-col class="text-center">
            <span class="copyright"
              >© copyright 2023 - Urban Bus Ticket. Tous droits réservés</span
            >
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import $ from "jquery";
export default {
  name: "LandingVue",

  methods: {
    // GO TO LOGIN PAGE TO GET INTEFACE USER
    goToLoginPage() {
      this.$router.push({ path: "/Login" });
    },

    // GO TO LOGIN PAGE TO GET INTEFACE USER
    goToAdhesionPage() {
      this.$router.push({ path: "/Partenaires" });
    },

    scrollToForm() {
      document
        .querySelector("#aboutUs_text")
        .scrollIntoView({ behavior: "smooth" });
    },
  },

  computed: {
    //GESTION DES CONTRAINTES (SAISIE UTILISATEUR)
    usernameError() {
      const errors = [];
      if (!this.$v.userLogin.login.$dirty) return errors;
      !this.$v.userLogin.login.required &&
        errors.push("Entrer votre pseudo ou e-mail de connexion.");
      return errors;
    },

    passwordError() {
      const errors = [];
      if (!this.$v.userLogin.password.$dirty) return errors;
      !this.$v.userLogin.password.required &&
        errors.push("Entrer votre mot de passe.");
      return errors;
    },
  },

  mounted() {
    setTimeout(function () {
      $(".enough").toggle("slide:left");
    }, 1500);

    setTimeout(function () {
      $(".content_text").slideDown();
    }, 2100);
  },
};
</script>

<style lang="scss" scoped>
.scheduled_travel {
  font-weight: 700;
  opacity: 0.8;
  font-family: "Montserrat";
}

.scheduled_input {
  font-family: "Montserrat";
}
.aboutUs {
  background-color: #dfe4ea;
  margin: auto;
  padding-top: 50px;
  height: 20%;
}

.header {
  padding-top: 150px;
  padding-bottom: 150px;
}

.btn {
  background: linear-gradient(#0c2461, #079992);
}

.content_text {
  text-align: start;
  display: none;
  font-size: 25px;
  font-weight: 300;
  font-family: "Montserrat";
  font-size: 22px;
  word-spacing: 2px;
}

.enough {
  color: #2c3a47;
  display: none;
  font-family: "Montserrat";
  font-size: 25px;
  text-align: start;
}

#african_bt {
  background: linear-gradient(to right, #159e72, #0c2461);
  font-size: 20px;
  font-weight: bold;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text_header {
  padding-top: 100px;
}

/*.navbar-brand {
  background: linear-gradient(to right, #079992, #0c2461);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}*/

.nav-link {
  font-family: "Montserrat";
  font-weight: bold;
  color: #2c3a47;
}

.nav-link:hover {
  font-family: "Montserrat";
  font-weight: bold;
  transform: scale(1.14);
  color: #079992;
}

.nav-item button {
  color: white;
  font-weight: bold;
}

/*.nav-item button:hover {
  font-weight: bold;
}

.nav-item:hover {
  font-weight: bold;
  font-size: 16px;
}

.section {
  color: #192a56;
  font-size: 35px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}*/

.avatar {
  color: black;
  font-weight: bold;
  font-size: 25px;
}

.onglets {
  font-size: 12px;
  font-weight: bold;
}

.onglets :hover {
  font-size: 16px;
  cursor: pointer;
}

.aboutMe_content {
  color: black;
  font-size: 20px;
}

.icon_owner {
  font-size: 40px;
  font-weight: bold;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}

.agence {
  font-weight: bold;
  color: #303952;
}

.libelle_application {
  font-size: 12px;
}

#odc {
  color: orange;
  font-weight: bold;
}

.competences {
  text-align: center;
  color: black;
}

.skill_libelle {
  text-align: center;
  font-weight: 600;
  color: black;
}

.card_skill :hover {
  cursor: pointer;
  background: #273c75;
  .icon_skill {
    color: white;
  }
  .skill_libelle {
    color: white;
  }
}

.text-h5 {
  color: white;
  font-weight: 400;
  font-style: italic;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

.author {
  color: #636e72;
  font-weight: thin;
  font-style: italic;
  font-size: 25px;
}

.section_contact {
  text-align: center;
  margin-top: 75px;
}

.contact_form {
  opacity: 0.9;
  border-radius: 2%;
  margin-top: 50px;
}

.btn_form {
  background: #192a56;
  color: white;
  font-weight: bold;
}

.my_input {
  font-weight: bolder;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

.agreement {
  color: white;
}

.checkbox {
  color: white;
}

.form-check-label {
  color: white;
}

.copyright {
  color: white;
  font-size: 18px;
  font-family: Georgia, "Times New Roman", Times, serif;
}

.link {
  color: white;
  text-decoration: none;
}

.button_to_top {
  border-radius: 50px;
  height: 100%;
  top: 75%;
  right: 0;
  margin-right: 15px;
  position: fixed;
  z-index: 2500;
  visibility: hidden;
}

#urban_text {
  color: #192a56;
}

#ticket_text {
  color: teal;
}

.offres {
  background: linear-gradient(#0c2461, #159e72);
}

.content_offre_text {
  color: white;
}

.content_offre_text:hover {
  color: white;
  font-weight: bold;
}

#aboutUs_text {
  text-align: center;
  font-size: 25px;
  color: #2c3e50;
  font-family: "Roboto";
  opacity: 0.8;
}

.section_title {
  font-size: 30px;
  font-family: "Oswald";
  color: #2c3a47;
}

.text_service {
  padding-top: 900px;
}

.text_service {
  font-size: 19px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

#top-header {
  padding-bottom: 100px;
}

.aboutUs_background {
  background: linear-gradient(#ecf0f1, white);
}

.contactUs_background {
  background-image: url("../assets/nous\ contacter.jpg");
}

.partner_background {
  padding-top: 160px;
  background: linear-gradient(white, #ecf0f1);
}

.partner_btn {
  background: linear-gradient(#0c2461, #079992);
}

.adhesion {
  color: white;
}
</style>
