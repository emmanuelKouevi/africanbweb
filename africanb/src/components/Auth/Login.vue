<template>
  <v-app id="inspire">
    <div class="row">
      <div class="box_login">
        <v-card
          class="animate__animated animate__backInLeft animate__delay-1s"
          max-height="550"
          width="500"
          elevation="5"
        >
          <div class="text-center">
            <img src="../../assets/urbanGo.png" alt="" height="150" />
          </div>
          <div class="text-center">
            <span class="welcome_text">BIENVENUE</span>
          </div>
          <v-card-subtitle class="text-subtitle"
            >Connectez-vous pour administrer vos réservations et finaliser vos
            opérations. </v-card-subtitle
          ><br />
          <v-card-text>
            <v-form @submit.prevent="login">
              <div class="mb-3">
                <v-text-field
                  append-icon="mdi-account"
                  height="5"
                  type="text"
                  class="input"
                  v-model.trim="$v.userLogin.login.$model"
                  placeholder="Adresse e-mail ou pseudo"
                  outlined
                  color="teal"
                  dense
                ></v-text-field>
              </div>

              <div class="mb-3">
                <v-text-field
                  class="input"
                  :type="passwordIsVisible ? 'text' : 'password'"
                  v-model.trim="$v.userLogin.password.$model"
                  placeholder="Mot de passe"
                  dense
                  :append-icon="passwordIsVisible ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="passwordIsVisible = !passwordIsVisible"
                  outlined
                  color="teal"
                ></v-text-field>

                <div class="float-right">
                  <span class="font-weight-bold forget_password"
                    >Mot de passe oublié ?</span
                  >
                </div>
                <br />

                <div class="row p-3" v-if="isLoading == false">
                  <v-btn type="submit" color="#159d73"
                    ><span class="btn-login">SE CONNECTER</span></v-btn
                  >
                </div>

                <div class="row p-3" v-else>
                  <div class="text-center">
                    <v-progress-circular
                      indeterminate
                      color="teal"
                      size="32"
                    ></v-progress-circular>
                  </div>
                </div>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </div>
    </div>
    <v-overlay :value="overlay"
      ><v-progress-circular indeterminate size="64"></v-progress-circular
    ></v-overlay>
  </v-app>
</template>

<script>
import axios from "axios";
import { API_LOGIN_USER } from "../globalConfig/globalConstConfig";
import { required } from "vuelidate/lib/validators";
import $ from "jquery";
export default {
  name: "LoginVue",
  data() {
    return {
      overlay: false,
      passwordIsVisible: false,
      isLoading: false,

      userLoginData: {
        data: {
          login: null,
          password: null,
        },
      },

      userLogin: {
        login: null,
        password: null,
      },
    };
  },

  validations: {
    userLogin: {
      login: {
        required,
      },

      password: {
        required,
      },
    },
  },

  methods: {
    //SOUMISSION FORMULAIRE
    submitForm() {},

    // SERVICE WEB PERMETTANT DE SE CONNECTER ET D'ACCEDER À SON ESPACE PERSONNEL
    async login() {
      this.userLoginData.data.login = this.userLogin.login;
      this.userLoginData.data.password = this.userLogin.password;
      this.isLoading = true;
      await axios
        .post(API_LOGIN_USER, this.userLoginData, {
          headers: {
            server_id: "backend@africanb",
            client_id: "frontend@africanb",
          },
        })
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status.code == 800) {
              this.$store.commit("LOGIN_USER");
              this.$store.commit("SET_USER_AUTHENTIFIED", response.data.item);
              const user_info = JSON.stringify(response.data.item);
              localStorage.setItem("auth", true);
              localStorage.setItem("token_user", user_info);
              this.$router.push({ name: "tableauBord" });
            } else {
              this.$swal.fire(
                "Connexion échouée",
                "Error lors de la connexion",
                "error"
              );
            }
          } else {
            this.$swal.fire(
              "Connexion Impossible",
              "Problème interne",
              "error"
            );
          }
        })
        .catch((e) => {
          this.$swal.fire("Connexion Impossible", e, "error");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    /**
     * Cette methode permettra de détecter si nous sommes sur la page de connexion (/connexion).
     * Si c'est le cas , l'utilisateur perd sa session et sera invité de saisir
     * à nouveau ses paramètres de connexion
     */
    initializeSession() {},
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
      $(".img_auth").slideDown();
    }, 600);

    setTimeout(function () {
      $(".login_box").toggle("slide:left");
    }, 1000);
  },
};
</script>

<style scoped>
.body_login {
  padding-top: 90px;
}

.presentation {
  background-image: url("../../assets/inside_bus.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.connexion_text {
  color: black;
  text-align: center;
  font-family: "Montserrat";
  font-size: 20px;
}

.password_forget {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 20px;
  color: black;
  opacity: 0.9;
  font-weight: bolder;
}

.dont_have_account {
  font-size: 15px;
  font-family: "Montserrat";
}

.new_asking {
  font-size: 15px;
  font-family: "Montserrat";
  color: teal;
  cursor: pointer;
}

.forget_password:hover {
  cursor: pointer;
  color: teal;
}

.footer {
  color: white;
}

.connectez-vous {
  font-size: 25px;
  font-weight: bold;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}

.welcome_text {
  letter-spacing: 2px;
  color: black;
  font-size: 20px;
  font-family: "Montserrat";
  font-weight: bold;
  opacity: 0.75;
}

.input {
  border-radius: 10px;
  font-size: 15px;
  font-family: "Montserrat";
}

.box_login {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-login {
  color: white;
}

.text-subtitle {
  font-family: "Montserrat";
  text-align: center;
  font-size: 16px;
}
</style>
