<template>
  <div>
    <v-card rounded="lg" elevation="3" v-if="role !== undefined">
      <v-card-text>
        <div class="container">
          <div class="row">
            <span class="text_role_libelle">{{ role.libelle }}</span>
          </div>
          <div class="row">
            <div class="col-lg-4">
              <v-btn small text color="#159e72" @click="editUserRole(role)"
                ><span class="">Éditer</span></v-btn
              >
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-dialog v-model="isOpenDialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="add_role_title">Editer un rôle</span>
        </v-card-title>
        <v-card-subtitle>Modifier un rôle utilisateur</v-card-subtitle>
        <v-card-text>
          <v-container>
            <div class="row">
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label"
                    >Désignation du rôle
                  </label>
                  <input
                    type="text"
                    class="form-control col-lg-12 role_field"
                    id="exampleInputEmail1"
                    v-model="roleObject.libelle"
                  />
                </div>
              </div>

              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label"
                    >Code du rôle
                  </label>
                  <input
                    type="text"
                    class="form-control col-lg-12 role_field"
                    id="exampleInputEmail1"
                    v-model="roleObject.code"
                  />
                </div>
              </div>
            </div>
            <br />
            <p class="add_role_title">Permissions</p>
            <v-data-table
              :headers="permissionHeaders"
              :items="permissionSelected"
              :single-select="singleSelect"
              item-key="code"
              show-select
              class="elevation-1"
            >
              <template v-slot:top>
                <v-switch
                  v-model="singleSelect"
                  label="Single select"
                  class="pa-3"
                ></v-switch>
              </template>
            </v-data-table>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small color="secondary" text @click="isOpenDialog = false">
            Fermer
          </v-btn>
          <v-btn small color="#159e72" btn @click="submit">
            <span class="text_btn">Enregistrer</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
  API_CREATE_USER_ROLE,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";
import {
  showErrorMessage,
  showSuccessMessage,
} from "@/modules/messages/messageProcess";
import axios from "axios";

export default {
  name: "RoleItem.vue",
  props: {
    role: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      successMsg: null,
      errorMsg: null,
      overlay: false,

      isOpenDialog: false,
      singleSelect: false,
      permissionSelected: [],
      permissionHeaders: [{ text: "Libelle", value: "libelle" }],

      roleObject: {
        code: "",
        libelle: "",
      },

      userRoleDataToSend: {
        datas: [],
      },
    };
  },

  methods: {
    // SOUMETTRE MODIFICATION D'UN RÔLE
    submit() {
      let isReadyToSubmit =
        this.roleObject.libelle != null &&
        this.roleObject.libelle.length > 0 &&
        this.roleObject.code != null &&
        this.roleObject.code.length > 0;
      if (!isReadyToSubmit) {
        this.errorMsg = "Les champs de modifications sont vides";
        showErrorMessage();
      } else {
        this.updateRole();
      }
    },

    // MODIFIER UN ROLE VIA API
    async updateRole() {
      this.userRoleDataToSend.datas.push(this.roleObject);
      this.overlay = true;
      await axios
        .put(API_CREATE_USER_ROLE, this.userRoleDataToSend, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status.code == 800) {
              this.successMsg = response.data.status.message;
              showSuccessMessage();
            } else {
              this.errorMsg = response.data.status.message;
              showErrorMessage();
            }
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          showErrorMessage();
        })
        .finally(() => {
          this.userRoleDataToSend.datas = [];
          this.isOpenDialog = false;
          this.overlay = false;
          this.$router.go(0);
        });
    },

    // EDIT A USER ROLE
    editUserRole(role) {
      this.roleObject = Object.assign({}, role);
      this.isOpenDialog = true;
    },
  },
};
</script>

<style scoped>
.text_role_libelle {
  font-family: "Montserrat";
  font-weight: bold;
  color: black;
}

.text_btn {
  color: white;
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

.role_field {
  font-family: "Montserrat";
}
</style>
