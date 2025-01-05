<template>
  <v-app>
    <v-form @submit.prevent="submitForm">
      <v-card class="mx-auto" max-width="1000">
        <v-card-title><h4>MON PROFIL</h4></v-card-title>
        <v-card-subtitle>Modifier votre compte utilisateur</v-card-subtitle>
        <v-card-text>
          <v-container>
            <div class="row">
              <div class="col-lg-6">
                <v-avatar size="150" color="grey">
                  <v-img
                    v-if="pictureProfilBase64"
                    :src="pictureProfilBase64"
                  ></v-img>
                </v-avatar>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-4">
                <v-file-input
                  class="input"
                  @change="convertirEnBase64"
                  v-model="pictureProfilSelected"
                  show-size
                  accept="image/jpeg, image/png"
                  dense
                  placeholder="photo de profil"
                ></v-file-input>
              </div>
              <div class="col-lg-3">
                <v-btn color="primary" btn @click="sendProfilPicture"
                  ><v-icon>mdi-check</v-icon></v-btn
                >
              </div>
            </div>
            <br /><br /><br />
            <v-row>
              <v-col
                ><v-text-field
                  class="myInput"
                  :error-messages="usernameError"
                  v-model.trim="$v.userUpdating.nom.$model"
                  placeholder="Nom"
                  color="teal"
                  outlined
                  dense
                ></v-text-field
              ></v-col>
              <v-col
                ><v-text-field
                  class="myInput"
                  :error-messages="surnameError"
                  v-model.trim="$v.userUpdating.prenoms.$model"
                  placeholder="Prenoms"
                  color="teal"
                  outlined
                  dense
                ></v-text-field
              ></v-col>
            </v-row>

            <v-row>
              <v-col
                ><v-text-field
                  class="myInput"
                  :error-messages="loginError"
                  v-model.trim="$v.userUpdating.login.$model"
                  color="teal"
                  placeholder="Pseudo"
                  outlined
                  dense
                ></v-text-field
              ></v-col>
              <v-col
                ><v-text-field
                  disabled
                  class="myInput"
                  v-model="userUpdatingMail"
                  placeholder="E-mail"
                  color="teal"
                  outlined
                  dense
                ></v-text-field
              ></v-col>
            </v-row>

            <v-row>
              <v-col
                ><v-text-field
                  disabled
                  class="myInput"
                  v-model="userUpdating.roleLibelle"
                  placeholder="Role"
                  color="teal"
                  outlined
                  dense
                ></v-text-field
              ></v-col>
            </v-row>
          </v-container>

          <div class="float-right">
            <v-btn type="button" @click="reinitForm()" color="secondary"
              >REINITIALISER</v-btn
            >&nbsp;&nbsp;
            <v-btn type="submit" color="success">ENREGISTRER</v-btn>
          </div>
          <br /><br />
        </v-card-text>
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
import {
  API_SEND_DOCUMENTS,
  API_UPDATE_USER,
  HEADERS,
} from "../globalConfig/globalConstConfig";
import { required, minLength } from "vuelidate/lib/validators";
import $ from "jquery";
export default {
  name: "userProfil",
  data() {
    return {
      errorMsg: null,
      successMsg: null,
      overlay: null,

      pictureProfilSelected: null,
      pictureProfilBase64: null,
      imageContent: null,
      imageFile: null,

      userDataUpdating: {
        datas: [],
      },

      userUpdating: {
        id: null,
        nom: null,
        prenoms: null,
        login: null,
        roleCode: null,
        roleLibelle: null,
      },

      userUpdatingMail: null,

      documentToSend: {
        datas: [],
      },

      pictureProfilModel: {
        compagnieTransportRaisonSociale: null,
        typeDocument: null,
        content: null,
        typeMime: null,
      },
    };
  },

  validations: {
    userUpdating: {
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
    },
  },

  methods: {
    reinitForm() {
      this.userUpdating.id = this.$store.state.userAuthentified.id;
      this.userUpdating.nom = this.$store.state.userAuthentified.nom;
      this.userUpdating.prenoms = this.$store.state.userAuthentified.prenoms;
      this.userUpdating.login = this.$store.state.userAuthentified.login;
      this.userUpdating.roleCode = this.$store.state.userAuthentified.roleCode;
      this.userUpdating.roleLibelle =
        this.$store.state.userAuthentified.roleLibelle;
      this.userUpdatingMail = this.$store.state.userAuthentified.email;
    },

    returnTypeMime(file) {
      var formatTypeMime = "";
      if (file.type == "image/png") {
        formatTypeMime = "FORMAT_PNG";
      }
      if (file.type == "image/jpeg") {
        formatTypeMime = "FORMAT_PNG";
      }
      if (file.type == "image/gif") {
        formatTypeMime = "FORMAT_GIF";
      }
      if (file.type == "application/pdf") {
        formatTypeMime = "FORMAT_PDF";
      }
      return formatTypeMime;
    },

    // SOUMETTRE FORMULAIRE
    submitForm() {
      this.$v.$touch();
      if (this.$v.userUpdating.$invalid)
        this.errorMsg = "Certains champs sont requis";
      else this.updateUserProfil();
    },

    async convertirEnBase64(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.pictureProfilBase64 = e.target.result;
        this.pictureProfilModel.content =
          this.pictureProfilBase64.split(",")[1];
      };
    },
    async sendProfilPicture() {
      this.overlay = true;
      this.pictureProfilModel.compagnieTransportRaisonSociale =
        this.$store.state.userAuthentified.compagnieTransportRaisonSociale;
      this.pictureProfilModel.typeDocument = "PHOTO_PROFIL";
      this.pictureProfilModel.typeMime = this.returnTypeMime(
        this.pictureProfilSelected
      );
      console.log(this.pictureProfilModel);
      this.documentToSend.datas.push(this.pictureProfilModel);
      await axios
        .post(API_SEND_DOCUMENTS, this.documentToSend, {
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
              //this.documentToSend.datas = [];
              //this.attestationTransportSelected = null;
            } else {
              this.errorMsg = response.data.status.message;
              $(".alert-error").fadeIn();
              setTimeout(function () {
                $(".alert-error").fadeOut();
              }, 3000);
              //this.documentToSend.datas = [];
              //this.attestationTransportSelected = null;
            }
          } else {
            this.errorMsg = "Impossible de changer la photo de profil";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 3000);
            //this.documentToSend.datas = [];
            //this.attestationTransportSelected = null;
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 3000);
          //this.documentToSend.datas = [];
          //this.attestationTransportSelected = null;
        })
        .finally(() => {
          this.overlay = false;
        });
    },

    async retrieveUserInfo() {
      /**
       * RECUPERER LES DONNÉES UTILISATEURS
       */
      if (this.$store.state.userAuthentified !== null) {
        this.userUpdating.id = this.$store.state.userAuthentified.id;
        this.userUpdating.nom = this.$store.state.userAuthentified.nom;
        this.userUpdating.prenoms = this.$store.state.userAuthentified.prenoms;
        this.userUpdating.login = this.$store.state.userAuthentified.login;
        this.userUpdating.roleCode =
          this.$store.state.userAuthentified.roleCode;
        this.userUpdating.roleLibelle =
          this.$store.state.userAuthentified.roleLibelle;
        this.userUpdatingMail = this.$store.state.userAuthentified.email;
      }
    },

    //MODIFIER COMPTE UTILISATEUR
    async updateUserProfil() {
      this.overlay = true;
      this.userDataUpdating.datas.push(this.userUpdating);
      await axios
        .put(API_UPDATE_USER, this.userDataUpdating, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status.code == 800) {
              this.successMsg = response.data.status.message;
              this.$swal.fire(
                "Modification reussie",
                this.successMsg,
                "success"
              );
              this.userDataUpdating.datas = [];
              this.$store.commit("UPDATE_USER_PROFIL", response.data.items[0]);
            } else {
              this.errorMsg = response.data.status.message;
              this.$swal.fire("Operation Echoué", this.errorMsg, "error");
              this.userDataUpdating.datas = [];
            }
          } else if (response.status == 204) {
            this.warningMsg = "Erreur , lors de la création";
            $(".alert-warning").fadeIn();
            setTimeout(function () {
              $(".alert-warning").fadeOut();
            }, 3000);
            this.userDataUpdating.datas = [];
          } else {
            this.errorMsg = "Erreur , opération de création impossible";
            $(".alert-error").fadeIn();
            setTimeout(function () {
              $(".alert-error").fadeOut();
            }, 3000);
            this.userDataUpdating.datas = [];
          }
        })
        .catch((e) => {
          this.$swal.fire("Operation Echoué", e, "error");
          this.userDataToSend.datas = [];
        })
        .finally(() => {
          this.overlay = false;
        });
    },
  },

  computed: {
    //CONTRAINTES SUR LES CHAMPS DE SAISIES

    usernameError() {
      const errors = [];
      if (!this.$v.userUpdating.nom.$dirty) return errors;
      !this.$v.userUpdating.nom.required &&
        errors.push("Le nom de l'utilsateur est obligatoire.");
      !this.$v.userUpdating.nom.minLength &&
        errors.push("Au moins 2 caractères.");
      return errors;
    },

    surnameError() {
      const errors = [];
      if (!this.$v.userUpdating.prenoms.$dirty) return errors;
      !this.$v.userUpdating.prenoms.required &&
        errors.push("Le prenom de l'utilsateur est obligatoire.");
      !this.$v.userUpdating.prenoms.minLength &&
        errors.push("Au moins 2 caractères.");
      return errors;
    },

    loginError() {
      const errors = [];
      if (!this.$v.userUpdating.login.$dirty) return errors;
      !this.$v.userUpdating.login.required &&
        errors.push("Le login de l'utilsateur est obligatoire.");
      !this.$v.userUpdating.login.minLength &&
        errors.push("Au moins 2 caractères.");
      return errors;
    },
  },

  mounted() {
    this.retrieveUserInfo();
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
  font-weight: bolder;
  color: grey;
  font-size: 15px;
}
</style>
