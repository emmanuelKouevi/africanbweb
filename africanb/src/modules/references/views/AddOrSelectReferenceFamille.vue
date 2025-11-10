<template>
  <v-app>
    <div class="container">
      <div class="row">
        <h3 class="main_title">Gestion des familles de reference.</h3>
        <small class="subtitle"
          >Gérez efficacement vos différentes familles de reference.</small
        >
      </div>
      <br />
      <div class="row">
        <div class="col-lg-12">
          <v-card>
            <v-card-title
              ><span class="main_title"
                >Liste des familles réferences disponibles.</span
              >
              <v-spacer></v-spacer>
              <!--BOITE DE DIALOGUE POUR LES PRIX -->
              <v-dialog
                v-model="addNewReferenceDialog"
                persistent
                max-width="600px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn x-small color="secondary" v-bind="attrs" v-on="on">
                    Nouvelle reference
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="dialog_title"
                      >Ajouter une nouvelle famille de réferences</span
                    >
                  </v-card-title>
                  <v-card-text>
                    <form>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="mb-3">
                            <label
                              for="exampleInputPassword1"
                              class="form-label"
                              >Désignation:</label
                            >

                            <input
                              type="text"
                              class="form-control content_form input_field"
                              v-model.trim="
                                $v.referenceFamilleObject.designation.$model
                              "
                              name=""
                              id=""
                            />
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="mb-3">
                            <label
                              for="exampleInputPassword1"
                              class="form-label"
                              >Description:</label
                            >

                            <input
                              type="text"
                              class="form-control content_form input_field"
                              v-model.trim="
                                $v.referenceFamilleObject.description.$model
                              "
                              name=""
                              id=""
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      small
                      color="secondary"
                      @click="closeDialogReference()"
                    >
                      Annuler
                    </v-btn>
                    <v-btn small color="#159d71" @click="submitForm()">
                      <span class="save_btn">Enregistrer</span>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- FIN DE BOITE DE DIALOGUE -->
            </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="referenceFamilleList"
                :search="search"
              >
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon
                    title="supprimer"
                    color="red"
                    small
                    class="mr-2"
                    @click="supprimerBus(item)"
                    >mdi-delete</v-icon
                  >
                </template>
              </v-data-table>
            </v-card-text>
            <br />
          </v-card>
        </div>
      </div>
    </div>

    <v-alert
      class="myalert alert-success"
      type="success"
      width="350px"
      dismissible
      >{{ successMsg }}</v-alert
    >

    <v-alert
      class="myalert alert-error"
      type="error"
      width="350px"
      dismissible
      >{{ errorMsg }}</v-alert
    >
    <v-overlay :value="overlay"
      ><v-progress-circular indeterminate size="64"></v-progress-circular
    ></v-overlay>
  </v-app>
</template>

<script>
import {
  API_CREATE_REFERENCE_FAMILLE,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";
import {
  showErrorMessage,
  showSuccessMessage,
} from "@/modules/messages/messageProcess";
import axios from "axios";
import { required } from "vuelidate/lib/validators";
export default {
  name: "AddOrSelectReferenceFamille",
  data() {
    return {
      overlay: false,
      errorMsg: null,
      successMsg: null,
      addNewReferenceDialog: false,

      headers: [
        { text: "Référence", value: "designation" },
        { text: "Description", value: "description" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      search: "",

      referenceFamilleDataToSend: {
        datas: [],
      },

      referenceFamilleObject: {
        designation: null,
        description: null,
      },

      referenceFamilleList: [],
    };
  },

  validations: {
    referenceFamilleObject: {
      designation: {
        required,
      },
      description: {
        required,
      },
    },
  },

  methods: {
    reinitializeReferenceData() {
      this.referenceFamilleObject.designation = null;
      this.referenceFamilleObject.description = null;
    },

    // Close dialog allows creating family reference
    closeDialogReference() {
      this.reinitializeReferenceData();
      this.addNewReferenceDialog = false;
    },

    // Submit form to create new reference family
    submitForm() {
      this.$v.$touch();
      if (this.$v.referenceFamilleObject.$invalid) {
        this.errorMsg = " Veuillez entrer les informations requises !!!";
        showErrorMessage();
      } else {
        this.apiCreateReferenceFamily();
      }
    },

    // API call to create new reference family
    async apiCreateReferenceFamily() {
      this.overlay = true;
      this.referenceFamilleDataToSend.datas.push(this.referenceFamilleObject);
      await axios
        .post(API_CREATE_REFERENCE_FAMILLE, this.referenceFamilleDataToSend, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.data.status.code == 800) {
            this.successMsg = response.data.status.message;
            showSuccessMessage();
            this.referenceFamilleDataToSend.datas = [];
          }
        })
        .catch((e) => {
          this.referenceFamilleDataToSend.datas = [];
          this.errorMsg = e;
          showErrorMessage();
        })
        .finally(() => {
          this.closeDialogReference();
          this.referenceFamilleDataToSend.datas = [];
          this.overlay = false;
        });
    },
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

h4 {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

h5 {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 13px;
}

.my_input {
  font-family: "Montserrat";
  font-weight: bolder;
  color: #596275;
}

.dialog_title {
  font-family: "Montserrat";
  font-weight: 600;
}

.save_btn {
  color: white;
}
</style>
