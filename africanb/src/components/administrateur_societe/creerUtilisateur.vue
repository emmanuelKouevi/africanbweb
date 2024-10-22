<template>
  <v-app>
    <v-form @submit.prevent="submitForm">
      <v-card class="mx-auto" max-width="1000">
        <v-card-title
          ><h6>CREER UN COMPTE (GESTION DE LA PLATEFORME)</h6></v-card-title
        >
        <v-card-subtitle class="litle_title"
          >Création d'utilisateurs pour la meilleur gestion de votre
          plateforme</v-card-subtitle
        >

        <v-card-text>
          <form>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label"
                >Sélectionner le role de l'utilisateur
              </label>
              <select
                class="form-select col-lg-6"
                aria-label="Default select example"
                v-model="userRoleCode"
              >
                <option
                  v-for="(role, r) in userRoleList"
                  :key="r"
                  :value="role.code"
                >
                  {{ role.libelle }}
                </option>
              </select>
            </div>
            <v-divider></v-divider>

            <div v-if="userRoleCode == 'RoleUtiGareCompagnieTransport'">
              <div class="row">
                <div class="col-lg-4">
                  <label for="exampleInputEmail1" class="form-label">Nom</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    v-model.trim="$v.userSeller.nom.$model"
                  />
                </div>
                <div class="col-lg-5">
                  <label for="exampleInputEmail1" class="form-label"
                    >Prenom(s)</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    v-model.trim="$v.userSeller.prenoms.$model"
                  />
                </div>
              </div>
              <br />
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label"
                  >E-mail</label
                >
                <input
                  name=""
                  id=""
                  type="email"
                  class="form-control col-lg-9"
                  v-model.trim="$v.userSeller.email.$model"
                />
              </div>
              <div class="row">
                <div class="col-lg-4">
                  <label for="exampleInputEmail1" class="form-label"
                    >Login</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    v-model.trim="$v.userSeller.login.$model"
                  />
                </div>
                <div class="col-lg-5">
                  <label for="exampleInputEmail1" class="form-label"
                    >Gare</label
                  >
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    v-model.trim="$v.userSeller.gareDesignation.$model"
                  >
                    <option
                      v-for="(station, st) in stations"
                      :key="st"
                      :value="station.designation"
                    >
                      {{ station.designation }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div v-else-if="userRoleCode == 'Administrateur de Compagnie'">
              <div class="row">
                <div class="col-lg-4">
                  <label for="exampleInputEmail1" class="form-label">Nom</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    v-model.trim="$v.userObject.nom.$model"
                  />
                </div>
                <div class="col-lg-5">
                  <label for="exampleInputEmail1" class="form-label"
                    >Prenom(s)</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    v-model.trim="$v.userObject.prenoms.$model"
                  />
                </div>
              </div>
              <br />
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label"
                  >E-mail</label
                >
                <input
                  name=""
                  id=""
                  type="email"
                  class="form-control col-lg-9"
                  v-model.trim="$v.userObject.email.$model"
                />
              </div>
              <div class="row">
                <div class="col-lg-4">
                  <label for="exampleInputEmail1" class="form-label"
                    >Login</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    v-model.trim="$v.userObject.login.$model"
                  />
                </div>
                <div class="col-lg-5">
                  <label for="exampleInputEmail1" class="form-label"
                    >Compagnie</label
                  >
                  <input type="text" id="" class="form-control" />
                </div>
              </div>
            </div>

            <div v-else>
              <div class="row">
                <div class="col-lg-4">
                  <label for="exampleInputEmail1" class="form-label">Nom</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    v-model.trim="$v.userObject.nom.$model"
                  />
                </div>
                <div class="col-lg-5">
                  <label for="exampleInputEmail1" class="form-label"
                    >Prenom(s)</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    v-model.trim="$v.userObject.prenoms.$model"
                  />
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col-lg-6">
                  <label for="exampleInputEmail1" class="form-label"
                    >E-mail</label
                  >
                  <input type="email" id="" class="form-control" />
                </div>
                <div class="col-lg-3">
                  <label for="exampleInputEmail1" class="form-label"
                    >Login</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    v-model.trim="$v.userObject.nom.$model"
                  />
                </div>
              </div>
            </div>
          </form>
        </v-card-text>

        <v-card-actions>
          <v-btn type="button" small outlined color="secondary"
            ><span>REINITIALISER</span></v-btn
          >
          <v-btn type="submit" text small outlined color="primary"
            ><span>CREER UTILISATEUR</span></v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
    <v-alert
      class="myalert alert-error"
      type="error"
      width="350px"
      dismissible
      >{{ errorMsg }}</v-alert
    >
    <v-alert
      class="myalert alert-success"
      type="success"
      width="350px"
      dismissible
      >{{ successMsg }}</v-alert
    >
    <v-overlay :value="overlay"
      ><v-progress-circular indeterminate size="64"></v-progress-circular
    ></v-overlay>
  </v-app>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import { required, email, minLength } from "vuelidate/lib/validators";
import {
  API_GET_ALL_ROLES,
  API_CREATE_USER,
  HEADERS,
  API_RECUPERER_LISTE_GARES_PAR_COMPAGNIE,
} from "../globalConfig/globalConstConfig";
export default {
  name: "creerUtilisateur",
  data() {
    return {
      errorMsg: null,
      successMsg: null,
      overlay: null,

      userRoleList: [],

      stations: [],

      userDataToSend: {
        datas: [],
      },

      userRoleCode: "",

      userObject: {
        nom: null,
        prenoms: null,
        login: null,
        email: null,
        roleCode: null,
      },

      userSeller: {
        nom: null,
        prenoms: null,
        login: null,
        email: null,
        roleCode: null,
        gareDesignation: null,
      },
    };
  },

  validations: {
    userObject: {
      nom: {
        required,
        minLength: minLength(2),
      },

      prenoms: {
        required,
        minLength: minLength(2),
      },

      login: {
        required,
        minLength: minLength(2),
      },

      email: {
        required,
        email,
      },
    },

    userSeller: {
      nom: {
        required,
        minLength: minLength(2),
      },

      prenoms: {
        required,
        minLength: minLength(2),
      },

      login: {
        required,
        minLength: minLength(2),
      },

      email: {
        required,
        email,
      },

      gareDesignation: {
        required,
      },
    },
  },

  methods: {
    //SOUMISSION DU FORMULAIRE
    submitForm() {
      this.$v.$touch();
      if (this.userRoleCode == "RoleUtiGareCompagnieTransport") {
        if (this.$v.userSeller.$invalid) {
          this.errorMsg =
            "Certaines informations requises n'ont pas été renseigné";
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 2000);
        } else {
          this.createUser();
        }
      } else {
        if (this.$v.userObject.$invalid) {
          this.errorMsg =
            "Certaines informations requises n'ont pas été renseigné";
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 2000);
        } else {
          this.createUser();
        }
      }
    },

    // CREER UN UTILISATEUR

    async createUser() {
      this.overlay = true;
      if (this.userRoleCode == "RoleUtiGareCompagnieTransport") {
        this.userSeller.roleCode = this.userRoleCode;
        this.userDataToSend.datas.push(this.userSeller);
      } else {
        this.userObject.roleCode = this.userRoleCode;
        this.userDataToSend.datas.push(this.userObject);
      }
      await axios
        .post(API_CREATE_USER, this.userDataToSend, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status.code == 800) {
              this.successMsg = response.data.status.message;
              $(".alert-success").fadeIn();
              setTimeout(function () {
                $(".alert-success").fadeOut();
              }, 4000);
              this.userDataToSend.datas = [];
            } else {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 3000);
              this.userDataToSend.datas = [];
            }
          } else if (response.status == 204) {
            this.warningMsg = "Erreur , lors de la création";
            $(".alert-warning").fadeIn();
            setTimeout(function () {
              $(".alert-warning").fadeOut();
            }, 3000);
            this.userDataToSend.datas = [];
          } else {
            this.errorMsg = "Erreur , opération de création impossible";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 3000);
            this.userDataToSend.datas = [];
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 3000);
          this.userDataToSend.datas = [];
        })
        .finally(() => {
          this.overlay = false;
        });
    },

    // RECUPERER LA LISTE DES ROLES DÉFINIS
    async getAllUsersRoles() {
      await axios
        .post(
          API_GET_ALL_ROLES,
          {},
          { headers: HEADERS(this.$store.state.userAuthentified.token) }
        )
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status.code != 800) {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 4000);
            } else {
              this.userRoleList = response.data.items;
            }
          } else {
            this.errorMsg = "Erreur";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 4000);
          }
        })
        .catch((e) => {
          this.errorMsg = e;
        });
    },

    // RECUPERER LA LISTE DES ROLES DÉFINIS
    async getAllStationByCompany() {
      await axios
        .post(
          API_RECUPERER_LISTE_GARES_PAR_COMPAGNIE,
          {
            data: {
              compagnieTransportRaisonSociale:
                this.$store.state.userAuthentified
                  .compagnieTransportRaisonSociale,
            },
          },
          { headers: HEADERS(this.$store.state.userAuthentified.token) }
        )
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status.code != 800) {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 4000);
            } else {
              this.stations = response.data.items;
            }
          } else {
            this.errorMsg = "Erreur";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 4000);
          }
        })
        .catch((e) => {
          this.errorMsg = e;
        });
    },
  },

  computed: {
    //CONTRAINTES SUR LES CHAMPS DE SAISIES

    usernameError() {
      const errors = [];
      if (!this.$v.userObject.nom.$dirty) return errors;
      !this.$v.userObject.nom.required &&
        errors.push("Le nom de l'utilsateur est obligatoire.");
      !this.$v.userObject.nom.minLength &&
        errors.push("Au moins 2 caractères.");
      return errors;
    },

    surnameError() {
      const errors = [];
      if (!this.$v.userObject.prenoms.$dirty) return errors;
      !this.$v.userObject.prenoms.required &&
        errors.push("Le prenom de l'utilsateur est obligatoire.");
      !this.$v.userObject.prenoms.minLength &&
        errors.push("Au moins 2 caractères.");
      return errors;
    },

    loginError() {
      const errors = [];
      if (!this.$v.userObject.login.$dirty) return errors;
      !this.$v.userObject.login.required &&
        errors.push("Le login de l'utilsateur est obligatoire.");
      !this.$v.userObject.login.minLength &&
        errors.push("Au moins 2 caractères.");
      return errors;
    },

    emailError() {
      const errors = [];
      if (!this.$v.userObject.email.$dirty) return errors;
      !this.$v.userObject.email.required &&
        errors.push("L'email de l'utilsateur est obligatoire.");
      !this.$v.userObject.email.email &&
        errors.push("Format adresse e-mail incorrect.");
      return errors;
    },

    roleCodeError() {
      const errors = [];
      if (!this.$v.userObject.roleCode.$dirty) return errors;
      !this.$v.userObject.roleCode.required &&
        errors.push("Veuillez selectionner un rôle.");
      return errors;
    },

    // CONTRAINTE DE L ENTITE VENDEUR DE COMPAGNIE TRANSPORT

    usernameSellerError() {
      const errors = [];
      if (!this.$v.userSeller.nom.$dirty) return errors;
      !this.$v.userSeller.nom.required &&
        errors.push("Le nom de l'utilsateur est obligatoire.");
      !this.$v.userSeller.nom.minLength &&
        errors.push("Au moins 2 caractères.");
      return errors;
    },

    surnameSellerError() {
      const errors = [];
      if (!this.$v.userSeller.prenoms.$dirty) return errors;
      !this.$v.userSeller.prenoms.required &&
        errors.push("Le prenom de l'utilsateur est obligatoire.");
      !this.$v.userSeller.prenoms.minLength &&
        errors.push("Au moins 2 caractères.");
      return errors;
    },

    loginSellerError() {
      const errors = [];
      if (!this.$v.userSeller.login.$dirty) return errors;
      !this.$v.userSeller.login.required &&
        errors.push("Le login de l'utilsateur est obligatoire.");
      !this.$v.userSeller.login.minLength &&
        errors.push("Au moins 2 caractères.");
      return errors;
    },

    emailSellerError() {
      const errors = [];
      if (!this.$v.userSeller.email.$dirty) return errors;
      !this.$v.userSeller.email.required &&
        errors.push("L'email de l'utilsateur est obligatoire.");
      !this.$v.userSeller.email.email &&
        errors.push("Format adresse e-mail incorrect.");
      return errors;
    },

    roleCodeSellerError() {
      const errors = [];
      if (!this.$v.userSeller.roleCode.$dirty) return errors;
      !this.$v.userSeller.roleCode.required &&
        errors.push("Veuillez selectionner un rôle.");
      return errors;
    },

    gareDesignationSellerError() {
      const errors = [];
      if (!this.$v.userSeller.gareDesignation.$dirty) return errors;
      !this.$v.userSeller.gareDesignation.required &&
        errors.push("Veuillez selectionner un rôle.");
      return errors;
    },
  },

  mounted() {
    this.getAllUsersRoles();
    this.getAllStationByCompany();
  },
};
</script>

<style scoped>
.myalert {
  display: none;
  z-index: 1900;
}

.alert-success {
  position: fixed;
  top: 25px;
  right: 2%;
  width: 25%;
}

.alert-error {
  position: fixed;
  top: 25px;
  right: 2%;
  width: 25%;
}

.alert-warning {
  position: fixed;
  top: 25px;
  right: 2%;
  width: 25%;
}

.myInput {
  font-family: "Times New Roman", Times, serif;
  color: grey;
  font-size: 15px;
}

.litle_title {
  font-family: "Times New Roman", Times, serif;
}
</style>
