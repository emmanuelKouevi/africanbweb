<template>
  <div v-if="permissions !== undefined">
    <v-card>
      <v-card-title>
        <v-text-field
          class="col-lg-3"
          dense
          outlined
          rounded
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="permissionDialog" max-width="700px" persistent>
          <template v-slot:activator="{ on, attrs }">
            <v-btn small v-bind="attrs" v-on="on" btn color="#159e72"
              ><span class="add_permission_text"
                >Ajouter une permission</span
              ></v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="form_title">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <div class="row">
                  <div class="col-lg-7">
                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label"
                        >Désignation de la permission:
                      </label>
                      <input
                        type="text"
                        class="form-control col-lg-12 permission_field"
                        id="exampleInputEmail1"
                        v-model="editedItem.libelle"
                      />
                    </div>
                  </div>

                  <div class="col-lg-5" :hidden="editedIndex !== -1">
                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label"
                        >Code:
                      </label>
                      <input
                        type="text"
                        class="form-control col-lg-12 permission_field"
                        id="exampleInputEmail1"
                        v-model="editedItem.code"
                      />
                    </div>
                  </div>
                </div>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                small
                color="secondary"
                btn
                @click="closeDialogPermission()"
              >
                Cancel
              </v-btn>
              <v-btn color="#159e72" btn @click="submit" small
                ><span class="add_permission_text">Save</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-card-text>
        <div class="container">
          <v-data-table
            :headers="headers"
            :items="permissions ?? []"
            :search="search"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon
                title="supprimer"
                color="#374d74"
                small
                class="mr-2"
                @click="editPermission(item)"
                >mdi-pencil</v-icon
              >
            </template>
          </v-data-table>
        </div>
      </v-card-text>
    </v-card>

    <v-alert
      rounded="lg"
      class="myalert alert-error"
      type="error"
      width="350px"
      dismissible
      >{{ errorMsg }}</v-alert
    >
    <v-alert
      rounded="lg"
      class="myalert alert-success"
      type="success"
      width="350px"
      dismissible
      >{{ successMsg }}</v-alert
    >
    <v-overlay :value="overlay"
      ><v-progress-circular indeterminate size="64"></v-progress-circular
    ></v-overlay>
  </div>
</template>

<script>
import {
  API_CREER_FUNCTIONNALITY,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";
import {
  showErrorMessage,
  showSuccessMessage,
} from "@/modules/messages/messageProcess";
import axios from "axios";
export default {
  name: "PermissionList.vue",
  props: {
    permissions: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      successMsg: null,
      errorMsg: null,
      overlay: false,
      search: "",

      permissionDialog: false,

      editedIndex: -1,

      editedItem: {
        code: null,
        libelle: null,
      },

      defaultItem: {
        code: null,
        libelle: null,
      },

      functionnalityToSend: {
        datas: [],
      },

      headers: [
        { text: "Réference", value: "code" },
        { text: "Libelle", value: "libelle" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },

  methods: {
    // SOUMISSION DU FORMULAIRE D'ENREGISTREMENT
    async submit() {
      let isReadyToSubmit =
        (this.editedItem.libelle != null || this.editedItem.libelle == "") &&
        (this.editedItem.code != null || this.editedItem.code == "");

      if (!isReadyToSubmit) {
        this.errorMsg =
          "Veuillez entrer le libelle et le code de la permission";
        showErrorMessage();
      } else {
        if (this.editedIndex !== -1) {
          this.changePermission();
        } else {
          this.savePermission();
        }
      }
    },
    // ENREGISTREMENT OU MODIFICATION D'UNE PERMISSION.
    async savePermission() {
      console.log("NOus sommes dans la création");
      this.overlay = true;
      this.functionnalityToSend.datas.push(this.editedItem);
      await axios
        .post(API_CREER_FUNCTIONNALITY, this.functionnalityToSend, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status.code == 800) {
              this.successMsg = response.data.status.message;
              showSuccessMessage();
              this.functionnalityToSend.datas = [];
            } else {
              this.errorMsg = response.data.status.message;
              showSuccessMessage();
              this.functionnalityToSend.datas = [];
              this.closeDialogPermission();
              this.$emit("update-permissions");
            }
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          showSuccessMessage();
          this.functionnalityToSend.datas = [];
        })
        .finally(() => {
          this.overlay = false;
          this.$emit("update-permissions");
          this.closeDialogPermission();
        });
    },

    async changePermission() {
      console.log("NOus sommes dans l'edition");
      this.overlay = true;
      this.functionnalityToSend.datas.push(this.editedItem);
      await axios
        .put(API_CREER_FUNCTIONNALITY, this.functionnalityToSend, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status.code == 800) {
              this.successMsg = response.data.status.message;
              showSuccessMessage();
              this.functionnalityToSend.datas = [];
            } else {
              this.errorMsg = response.data.status.message;
              showSuccessMessage();
              this.functionnalityToSend.datas = [];
              this.closeDialogPermission();
            }
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          showSuccessMessage();
          this.functionnalityToSend.datas = [];
        })
        .finally(() => {
          this.overlay = false;
          this.$emit("update-permissions");
          this.closeDialogPermission();
        });
    },

    // EDITION D'UNE PERMISSION
    editPermission(item) {
      this.editedIndex = this.permissions.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.permissionDialog = true;
    },

    // FERMER LA BOITE DE DIALOG PERMETTANT LA CRÉATION ET LA MODIFICATION D'UNE PERMISSION
    closeDialogPermission() {
      this.permissionDialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Ajout de permission"
        : "Edition de permission";
    },
  },

  mounted() {},
};
</script>

<style scoped>
.add_permission_text {
  color: white;
}

.form_title {
  font-weight: bold;
  font-family: "Montserrat";
}

.permission_field {
  font-family: "Montserrat";
}

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
</style>
