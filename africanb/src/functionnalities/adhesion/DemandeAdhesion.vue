<template>
  <v-app id="inspire">
    <div class="row">
      <div class="col-lg-8 presentation"></div>
      <div class="col-lg-4 pl-6">
        <div class="container p-5">
          <v-img
            @click="$router.push({ path: '/' }).catch(() => {})"
            max-height="100"
            max-width="100"
            src="../../assets/UB.jpg"
          ></v-img>
          <div>
            <span class="welcome_text"
              >Remplissez ce formulaire pour la demande de votre adhésion.</span
            >
          </div>
          <br />

          <div class="row">
            <form class="row g-3" @submit.prevent="submitForm">
              <v-container fluid>
                <div class="mb-3">
                  <v-text-field
                    class="input"
                    dense
                    outlined
                    color="teal"
                    placeholder="Référence de votre adhésion"
                    :error-messages="designationCompagnieErrors"
                    v-model.trim="$v.compagnieTransport.designation.$model"
                    @input="$v.compagnieTransport.designation.$touch()"
                    @blur="$v.compagnieTransport.designation.$touch()"
                  >
                  </v-text-field>
                </div>

                <div class="mb-3">
                  <v-textarea
                    class="input"
                    dense
                    outlined
                    color="teal"
                    placeholder="Description"
                    :error-messages="descriptionCompagnieErrors"
                    v-model.trim="$v.compagnieTransport.description.$model"
                    @input="$v.compagnieTransport.description.$touch()"
                    @blur="$v.compagnieTransport.description.$touch()"
                  ></v-textarea>
                </div>

                <div class="mb-3">
                  <v-text-field
                    class="input"
                    dense
                    outlined
                    color="teal"
                    append-icon="mdi-email"
                    placeholder="E-mail de votre compagnie"
                    :error-messages="emailCompagnieErrors"
                    v-model.trim="$v.compagnieTransport.email.$model"
                    @input="$v.compagnieTransport.email.$touch()"
                    @blur="$v.compagnieTransport.email.$touch()"
                  >
                  </v-text-field>
                </div>

                <div class="row">
                  <div class="col-lg-6">
                    <v-select
                      class="input"
                      dense
                      outlined
                      placeholder="Où vous localiser ?"
                      :items="villesList"
                      color="teal"
                      item-text="designation"
                      item-value="designation"
                      :error-messages="villeCompagnieErrors"
                      v-model.trim="
                        $v.compagnieTransport.villeDesignation.$model
                      "
                      @input="$v.compagnieTransport.villeDesignation.$touch()"
                      @blur="$v.compagnieTransport.villeDesignation.$touch()"
                    >
                    </v-select>
                  </div>

                  <div class="col-lg-6">
                    <v-text-field
                      class="input"
                      dense
                      outlined
                      color="teal"
                      prefix="+225"
                      append-icon="mdi-phone"
                      placeholder="N° de Téléphone"
                      :error-messages="telephoneCompagnieErrors"
                      v-model.trim="$v.compagnieTransport.telephone.$model"
                      @input="$v.compagnieTransport.telephone.$touch()"
                      @blur="$v.compagnieTransport.telephone.$touch()"
                    >
                    </v-text-field>
                  </div>
                </div>

                <div class="mb-3">
                  <v-text-field
                    class="input"
                    dense
                    outlined
                    color="teal"
                    placeholder="le sigle de la compagnie"
                    :error-messages="sigleCompagnieErrors"
                    v-model.trim="$v.compagnieTransport.sigle.$model"
                    @input="$v.compagnieTransport.sigle.$touch()"
                    @blur="$v.compagnieTransport.sigle.$touch()"
                  >
                  </v-text-field>
                </div>

                <div class="mb-3">
                  <v-text-field
                    class="input"
                    dense
                    outlined
                    color="teal"
                    placeholder="Entrer une raison sociale"
                    :error-messages="raisonSocialeCompagnieErrors"
                    v-model.trim="$v.compagnieTransport.raisonSociale.$model"
                    @input="$v.compagnieTransport.raisonSociale.$touch()"
                    @blur="$v.compagnieTransport.raisonSociale.$touch()"
                  >
                  </v-text-field>
                </div>

                <v-divider height="36"></v-divider>

                <div>
                  <span class="font-weight-bold file_provider"
                    >Document à fournir</span
                  >
                </div>
                <br />

                <div class="mb-3">
                  <v-file-input
                    class="input"
                    v-model="logoSelected"
                    show-size
                    outlined
                    dense
                    accept="image/*"
                    placeholder="Logo de la compagnie"
                  ></v-file-input>
                </div>
                <br />

                <div class="mb-3">
                  <v-file-input
                    class="input"
                    v-model="attestationSelected"
                    show-size
                    outlined
                    accept="application/pdf"
                    dense
                    placeholder="Attestation de transport"
                  ></v-file-input>
                </div>

                <div class="row p-3" v-if="isLoading == false">
                  <v-btn type="submit" color="teal" outlined
                    >DEMANDER VOTRE ADHÉSION</v-btn
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
              </v-container>
            </form>
            <v-divider></v-divider>
          </div>
          <div class="row">
            <span class="dont_have_account text-center"
              >Vous avez déja un compte ?
              <small
                class="new_asking"
                @click="$router.push({ path: '/Login' }).catch(() => {})"
                >Connectez-vous</small
              ></span
            >
          </div>
        </div>
      </div>
    </div>

    <br />

    <v-footer class="footer" dark>
      <v-container fluid>
        <v-row>
          <v-col class="text-center">
            <span class="font-weight-bold"
              >© copyright 2023 - African bus. Tous droits réservés</span
            >
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
    <v-overlay :value="overlay"
      ><v-progress-circular indeterminate size="64"></v-progress-circular
    ></v-overlay>
  </v-app>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import {
  API_CREER_COMPAGNIE_TRANSPORT,
  API_OBTENIR_LISTE_DES_VILLES_DISPONIBLE,
} from "@/components/globalConfig/globalConstConfig";
import {
  required,
  minLength,
  maxLength,
  email,
} from "vuelidate/lib/validators";
export default {
  name: "LoginVue",
  data() {
    return {
      successMsg: null,
      errorMsg: null,
      warningMsg: null,
      overlay: false,

      logoSelected: null,
      attestationSelected: null,

      isLoading: false,

      defaultObject: {},
      villesList: [],

      objectContainList: {
        datas: [],
      },

      compagnieTransport: {
        designation: null,
        description: null,
        raisonSociale: null,
        email: null,
        sigle: null,
        telephone: null,
        villeDesignation: null,
        documentDTOS: [],
      },

      attestationTransportDocumentModel: {
        compagnieTransportRaisonSociale: null,
        typeDocument: null,
        content: null,
        typeMime: null,
      },

      logoDocumentModel: {
        compagnieTransportRaisonSociale: null,
        typeDocument: null,
        content: null,
        typeMime: null,
      },
    };
  },

  validations: {
    compagnieTransport: {
      designation: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(150),
      },

      description: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(150),
      },

      email: {
        required,
        email,
      },

      raisonSociale: {
        required,
      },

      sigle: {
        required,
      },

      villeDesignation: {
        required,
      },

      telephone: {
        required,
      },
    },
  },

  methods: {
    reinitForm() {
      this.compagnieTransport.designation = null;
      this.compagnieTransport.description = null;
      this.compagnieTransport.email = null;
      this.compagnieTransport.raisonSociale = null;
      this.compagnieTransport.sigle = null;
      this.compagnieTransport.telephone = null;
      this.compagnieTransport.villeDesignation = null;
    },

    // OBTENIR LA LISTE DES VILLES DISPONIBLES
    async obtenirListeVillesDispo() {
      await axios
        .post(API_OBTENIR_LISTE_DES_VILLES_DISPONIBLE, this.defaultObject, {
          headers: {
            server_id: "backend@africanb",
            client_id: "frontend@africanb",
          },
        })
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

    convertirEnBase64(file, documentModel) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        documentModel.content = reader.result.split(",")[1];
      };
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

    // SOUMETTRE LE FORMULAIRE
    submitForm() {
      this.$v.$touch();
      if (this.$v.compagnieTransport.$invalid) {
        this.errorMsg = "Des informations sont manquantes";
        $(".alert-error").fadeIn();
        setTimeout(function () {
          $(".alert-error").fadeOut();
        }, 3000);
      } else {
        this.creerDemandeAdhesion();
      }
    },

    // CREATION D'UNE DEMANDE D'ADHESION
    async creerDemandeAdhesion() {
      this.logoDocumentModel.compagnieTransportRaisonSociale =
        this.compagnieTransport.raisonSociale;
      this.logoDocumentModel.typeDocument = "LOGO";
      this.convertirEnBase64(this.logoSelected, this.logoDocumentModel);
      this.logoDocumentModel.typeMime = this.returnTypeMime(this.logoSelected);

      this.attestationTransportDocumentModel.typeDocument =
        "ATTESTATION_TRANSPORT";
      this.attestationTransportDocumentModel.compagnieTransportRaisonSociale =
        this.compagnieTransport.raisonSociale;
      this.convertirEnBase64(
        this.attestationSelected,
        this.attestationTransportDocumentModel
      );
      this.attestationTransportDocumentModel.typeMime = this.returnTypeMime(
        this.attestationSelected
      );
      this.compagnieTransport.documentDTOS.push(
        this.attestationTransportDocumentModel
      );
      this.compagnieTransport.documentDTOS.push(this.logoDocumentModel);
      this.isLoading = true;
      this.objectContainList.datas.push(this.compagnieTransport);
      this.overlay = true;
      await axios
        .post(API_CREER_COMPAGNIE_TRANSPORT, this.objectContainList, {
          headers: {
            server_id: "backend@africanb",
            client_id: "frontend@africanb",
            is_admin: "isAdmin",
          },
        })
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            if (response.data.status.code == 800) {
              this.successMsg = response.data.status.message;
              this.$swal.fire(
                this.successMsg,
                "Votre demande a été pris en compte!",
                "success"
              );
            } else {
              this.errorMsg = response.data.status.message;
              this.$swal.fire(
                this.errorMsg,
                "Erreur lors la création de votre demande",
                "error"
              );
            }
          } else if (response.status == 204) {
            this.warningMsg = "Erreur , lors de la création";
            this.$swal.fire(
              this.warning,
              "Erreur lors la création de votre demande",
              "warning"
            );
          } else {
            this.errorMsg = "Erreur , opération de création impossible";
            this.$swal.fire(
              this.errorMsg,
              "Erreur lors la création de votre demande",
              "error"
            );
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          this.$swal.fire(
            this.errorMsg,
            "Erreur lors la création de votre demande",
            "error"
          );
        })
        .finally(() => {
          this.reinitForm();
          this.overlay = false;
          this.isLoading = false;
        });
    },
  },

  computed: {
    // GESTION DES CONTRAINTES DE CHAMPS D'ENTREES POUR LA CREATION D'UNE COMPAGNIE DE TRANSPORT

    designationCompagnieErrors() {
      const errors = [];
      if (!this.$v.compagnieTransport.designation.$dirty) return errors;
      !this.$v.compagnieTransport.designation.maxLength &&
        errors.push("La designation ne doit pas dépasser 600 caractères");
      !this.$v.compagnieTransport.designation.required &&
        errors.push("La désignation est obligatoire.");
      !this.$v.compagnieTransport.designation.required &&
        errors.push("La désignation doit avoir au minimum 8 caractères.");
      return errors;
    },

    descriptionCompagnieErrors() {
      const errors = [];
      if (!this.$v.compagnieTransport.description.$dirty) return errors;
      !this.$v.compagnieTransport.description.maxLength &&
        errors.push("La description ne doit pas dépasser 600 caractères");
      !this.$v.compagnieTransport.description.required &&
        errors.push("La déscription est obligatoire.");
      !this.$v.compagnieTransport.description.required &&
        errors.push("La déscription doit avoir au minimum 8 caractères.");
      return errors;
    },

    raisonSocialeCompagnieErrors() {
      const errors = [];
      if (!this.$v.compagnieTransport.raisonSociale.$dirty) return errors;
      !this.$v.compagnieTransport.raisonSociale.required &&
        errors.push("La raison sociale est obligatoire est obligatoire.");
      return errors;
    },

    sigleCompagnieErrors() {
      const errors = [];
      if (!this.$v.compagnieTransport.sigle.$dirty) return errors;
      !this.$v.compagnieTransport.sigle.required &&
        errors.push("Le sigle est obligatoire est obligatoire.");
      return errors;
    },

    villeCompagnieErrors() {
      const errors = [];
      if (!this.$v.compagnieTransport.villeDesignation.$dirty) return errors;
      !this.$v.compagnieTransport.villeDesignation.required &&
        errors.push("La ville est obligatoire est obligatoire.");
      return errors;
    },

    telephoneCompagnieErrors() {
      const errors = [];
      if (!this.$v.compagnieTransport.telephone.$dirty) return errors;
      !this.$v.compagnieTransport.telephone.required &&
        errors.push("Le numéro de téléphone est obligatoire.");
      return errors;
    },
    emailCompagnieErrors() {
      const errors = [];
      if (!this.$v.compagnieTransport.email.$dirty) return errors;
      !this.$v.compagnieTransport.email.required &&
        errors.push("Le champ email est obligatoire");
      !this.$v.compagnieTransport.email.email && errors.push("exemple@xyz.com");
      return errors;
    },
  },

  mounted() {
    this.obtenirListeVillesDispo();
  },
};
</script>

<style scoped>
.body_login {
  padding-top: 90px;
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
  font-size: 16px;
  font-family: "Montserrat";
  font-weight: bold;
}

.input {
  border-radius: 7px;
  font-family: "Montserrat";
}

.file_provider {
  font-size: 18px;
  font-family: "Montserrat";
}
</style>
