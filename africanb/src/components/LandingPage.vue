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
            <a class="nav-link" href="#aboutUs-section" aria-current="page"
              >NOS PARTENAIRES</a
            >
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

    <div class="container">
      <div class="row header">
        <div class="col-lg-4">
          <img
            class="animate__animated animate__backInLeft animate__slower animate__delay-1s"
            src="../assets/urban.jpg"
            height="300px"
            alt=""
          />
        </div>
        <div
          class="col-lg-3 animate__animated animate__backInLeft animate__slower animate__delay-2s"
        >
          <vLottiePlayer
            name="workoutMonkeyAnim"
            loop
            :animationData="require('../assets/lotties/arrow.json')"
          />
        </div>
        <div class="col-lg-5" id="img_header">
          <v-card
            color="white"
            class="animate__animated animate__backInDown animate__slower animate__delay-3s"
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
                    <option>Depart</option>
                    <option v-for="(ville, v) in villesList" :key="v">
                      {{ ville.designation }}
                    </option>
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
                    <option v-for="(ville, v) in villesList" :key="v">
                      {{ ville.designation }}
                    </option>
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
                    ><v-icon>mdi-magnify</v-icon><span>Rechercher</span></v-btn
                  >
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="container-fluid" id="top-header">
        <div class="row text-center">
          <div class="col-lg-8">
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
            urbanGo simplifie vos voyages en autocar à travers la Côte d’Ivoire
            en vous offrant une plateforme intuitive de réservation en ligne.
            Avec nous, réservez facilement, rapidement, et en toute sécurité, en
            profitant d’un large choix d’itinéraires, d’horaires et de tarifs
            compétitifs. Notre mission est de rendre vos déplacements en autocar
            aussi fluides que possible. En collaboration avec des transporteurs
            de confiance, nous assurons flexibilité, confort, et tranquillité
            d’esprit. Que ce soit pour le travail, les loisirs, ou une aventure
            entre amis, chaque étape de votre réservation est optimisée pour
            répondre à vos attentes. Nous sommes fiers de fournir une
            alternative pratique et abordable aux autres modes de transport en
            Côte d’Ivoire. Chez Urban Bus Ticket’s, nous vous offrons le
            confort, la fiabilité et le service client de qualité que vous
            méritez. Merci de voyager avec nous – votre confort est notre
            priorité !
          </span>
        </div>
      </div>
    </div>
    <br />

    <div class="container ourServices">
      <br /><br /><br /><br /><br /><br /><br />
      <div class="row justify-content-center" id="our-services">
        <h1 class="section_title">
          <v-icon color="#2C3A47" size="64">mdi-menu-right</v-icon>NOS
          PARTENAIRES
        </h1>
      </div>
      <br />
      <div class="container">
        <br />
        <div class="row">
          <div
            class="text-center"
            data-aos="flip-right"
            data-aos-delay="1000"
            data-aos-duration="800"
          >
            <span id="ourPartner_text">Aucun partenaire pour le moment.</span>
          </div>
        </div>
      </div>
      <br /><br /><br /><br /><br /><br />
    </div>

    <v-footer color="#193462">
      <div class="container">
        <div class="row g-4">
          <!-- Section Contact -->
          <div class="col-lg-4 col-md-6 fade-in-up">
            <h5 class="footer-title">Contact</h5>
            <div class="d-flex flex-column gap-2">
              <a href="mailto:contact@votreapp.com" class="contact-item">
                <div class="contact-icon">
                  <v-icon color="white">mdi-gmail</v-icon>
                </div>
                urbanGo@gmail.com
              </a>
              <a href="tel:+33123456789" class="contact-item">
                <div class="contact-icon">
                  <v-icon color="white">mdi-phone</v-icon>
                </div>
                +337 683441299
              </a>
              <a href="mailto:support@votreapp.com" class="contact-item">
                <div class="contact-icon">
                  <i class="bi bi-chat-dots-fill"></i>
                </div>
                support@urbanGo.com
              </a>
            </div>
          </div>

          <!-- Section App Stores -->
          <div class="col-lg-4 col-md-6 fade-in-up-delay-1">
            <h5 class="footer-title">Téléchargez l'application</h5>
            <p class="text-light mb-3">Disponible sur toutes les plateformes</p>
            <div class="d-flex flex-column gap-2">
              <a href="#" class="store-btn">
                <div class="store-icon">
                  <i class="bi bi-apple"></i>
                </div>
                <div class="store-text d-flex flex-column align-items-start">
                  <small>Télécharger sur</small>
                  <span>App Store</span>
                </div>
              </a>
              <a href="#" class="store-btn">
                <div class="store-icon">
                  <i class="bi bi-google-play"></i>
                </div>
                <div class="store-text d-flex flex-column align-items-start">
                  <small>Disponible sur</small>
                  <span>Google Play</span>
                </div>
              </a>
            </div>
          </div>

          <!-- Section À propos -->
          <div class="col-lg-4 col-md-12 fade-in-up-delay-2">
            <h5 class="footer-title">À propos</h5>
            <div class="text-light">
              <p class="mb-3">
                Une application moderne et intuitive pour vous accompagner au
                quotidien.
              </p>
              <p class="mb-3">Développée avec passion par notre équipe.</p>
              <!-- Réseaux sociaux -->
              <div class="d-flex gap-3">
                <a href="#" class="text-light fs-4" title="Facebook">
                  <v-icon color="white">mdi-facebook</v-icon>
                </a>
                <a href="#" class="text-light fs-4" title="Twitter">
                  <v-icon color="white">mdi-whatsapp</v-icon>
                </a>
                <a href="#" class="text-light fs-4" title="Instagram">
                  <v-icon color="white">mdi-instagram</v-icon>
                </a>
                <a href="#" class="text-light fs-4" title="LinkedIn">
                  <v-icon color="white">mdi-telegram</v-icon>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Bottom -->
        <hr class="my-4" style="border-color: rgba(255, 255, 255, 0.1)" />
        <div class="footer-bottom">
          <div class="row align-items-center">
            <div class="col-md-6">
              <p class="mb-0">
                © 2025 Votre Application. Tous droits réservés.
              </p>
            </div>
            <div class="col-md-6">
              <p class="company-info text-md-end mb-0">
                Votre Entreprise • Conçu et développé avec
                <v-icon color="red">mdi-heart</v-icon>
              </p>
            </div>
          </div>
        </div>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import $ from "jquery";
import axios from "axios";
import VueLottiePlayer from "vue-lottie-player";
import { API_OBTENIR_LISTE_DES_VILLES_DISPONIBLE } from "./globalConfig/globalConstConfig";
export default {
  name: "LandingVue",
  components: {
    vLottiePlayer: VueLottiePlayer,
  },

  data() {
    return {
      defaultObject: {},

      villesList: [],
    };
  },

  methods: {
    // OBTENIR LA LISTE DES VILLES DISPONIBLES
    async obtenirListeVillesDispo() {
      await axios
        .post(API_OBTENIR_LISTE_DES_VILLES_DISPONIBLE, this.defaultObject)
        .then((response) => {
          this.villesList = response.data.items;
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        });
    },

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

    this.obtenirListeVillesDispo();
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

.available {
  color: white;
  font-family: "Montserrat";
  font-size: 20px;
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

.text-light {
  font-family: "Montserrat";
}

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
  font-family: "Montserrat";
}

.facebook {
  color: white;
  font-size: 18px;
  font-family: "Montserrat";
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
  font-family: "Montserrat";
  opacity: 0.8;
}

#ourPartner_text {
  text-align: center;
  font-size: 25px;
  color: #2c3e50;
  font-family: "Montserrat";
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

.footer-custom {
  background: var(--footer-bg);
  color: white;
  position: relative;
  overflow: hidden;
}

.footer-custom::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
}

.footer-title {
  color: white;
  font-family: "Montserrat";
  font-weight: 600;
  position: relative;
  margin-bottom: 1.5rem;
}

.footer-title::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, var(--accent-color), #42a5f5);
  border-radius: 1px;
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  text-decoration: none;
  color: #e3f2fd;
}

.contact-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
  color: var(--accent-color);
  text-decoration: none;
}

.contact-icon {
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, var(--accent-color), #42a5f5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.store-btn {
  background: linear-gradient(135deg, #424242, #616161);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
  text-decoration: none;
  color: white;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.store-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #525252, #757575);
  color: white;
  text-decoration: none;
}

.store-icon {
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #424242;
  font-size: 12px;
  flex-shrink: 0;
}

.store-text small {
  font-size: 0.7rem;
  opacity: 0.8;
}

.store-text span {
  font-size: 0.9rem;
  font-weight: 600;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  font-family: "Montserrat";
}

.company-info {
  color: white;
  font-family: "Montserrat";
  font-size: 0.9rem;
}

/* Animations Bootstrap compatible */
.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

.fade-in-up-delay-1 {
  animation: fadeInUp 0.6s ease-out 0.2s both;
}

.fade-in-up-delay-2 {
  animation: fadeInUp 0.6s ease-out 0.4s both;
}
</style>
