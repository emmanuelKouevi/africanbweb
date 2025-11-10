<template>
  <v-app id="inspire">
    <div class="container">
      <div class="row">
        <h3 class="main_title">Détail sur la référence famille.</h3>
        <small class="subtitle"></small>
      </div>
      <br />
      <div class="row">
        <div class="col-lg-12">
          <v-card>
            <v-card-title
              ><span class="main_title">Reference famille sélectionnée.</span>
              <v-spacer></v-spacer>
              <!--BOITE DE DIALOGUE -->
              <v-dialog
                v-model="addNewReferenceDialog"
                persistent
                max-width="600px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn x-small color="secondary" v-bind="attrs" v-on="on">
                    Ajouter une reference
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="dialog_title"
                      >Créer une nouvelle référence</span
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
                                $v.referenceObject.designation.$model
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
                                $v.referenceObject.description.$model
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
            <br />
          </v-card>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import { API_CREATE_REFERENCE } from "@/components/globalConfig/globalConstConfig";
import { required } from "vuelidate/lib/validators";
export default {
  name: "ReferenceFamilleDetail",
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

      referenceDataToSend: {
        datas: [],
      },

      referenceObject: {
        designation: null,
        description: null,
        referenceFamilleDesignation: null,
      },

      referenceFamilleList: [],
    };
  },

  validations: {
    referenceObject: {
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
      this.referenceObject.designation = null;
      this.referenceObject.description = null;
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
    async apiCreateReference() {
      this.overlay = true;
      this.referenceDataToSend.datas.push(this.referenceObject);
      await axios
        .post(API_CREATE_REFERENCE, this.referenceDataToSend, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.data.status.code == 800) {
            this.successMsg = response.data.status.message;
            showSuccessMessage();
            this.referenceDataToSend.datas = [];
          }
        })
        .catch((e) => {
          this.referenceDataToSend.datas = [];
          this.errorMsg = e;
          showErrorMessage();
        })
        .finally(() => {
          this.closeDialogReference();
          this.referenceDataToSend.datas = [];
          this.overlay = false;
        });
    },
  },
};
</script>

<style scoped></style>
