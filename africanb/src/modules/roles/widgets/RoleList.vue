<template>
  <div v-if="roles !== undefined || roles !== null">
    <div class="row">
      <div class="col-lg-4" v-for="(role, r) in roles" :key="r">
        <RoleItem :role="role" />
      </div>
      <div class="col-lg-4">
        <v-card rounded="lg">
          <v-card-title
            ><span class="add_role_card_title">Nouveau rôle</span>
            <v-spacer></v-spacer>
            <v-btn small color="#159e72" @click="isOpenDialog = true"
              ><span class="text_btn">Ajouter un rôle</span></v-btn
            >
          </v-card-title>
          <v-card-subtitle>Ajouter un rôle utilisateur.</v-card-subtitle>
        </v-card>
      </div>
    </div>

    <v-dialog v-model="isOpenDialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="add_role_title">Ajouter un rôle</span>
        </v-card-title>
        <v-card-subtitle>Ajouter un nouveau rôle</v-card-subtitle>
        <v-card-text>
          <v-container>
            <div class="row">
              <div class="col-lg-6">
                <div class="mb-3">
                  <label
                    for="exampleInputPassword1"
                    class="form-label role_field"
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
                    class="form-control col-lg-12 user_field"
                    id="exampleInputEmail1"
                    v-model="roleObject.code"
                  />
                </div>
              </div>
            </div>
            <br />
            <p class="add_role_title">Permissions</p>
            <v-data-table
              v-model="permissionSelected"
              :headers="permissionHeaders"
              :items="permissionList"
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
import { getAllPermissionApi } from "@/modules/common/services/commonApi";
import RoleItem from "./RoleItem.vue";
import {
  showErrorMessage,
  showSuccessMessage,
} from "@/modules/messages/messageProcess";
import axios from "axios";
import {
  API_CREATE_USER_ROLE,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";

export default {
  name: "RoleList.vue",
  props: {
    roles: {
      type: Array,
      default: null,
    },
  },
  components: {
    RoleItem,
  },

  data() {
    return {
      isOpenDialog: false,
      overlay: false,

      errorMsg: "",
      successMsg: "",
      warningMsg: "",

      singleSelect: false,
      permissionSelected: [],
      permissionHeaders: [{ text: "Libelle", value: "libelle" }],

      permissionList: [],

      roleObject: {
        code: null,
        libelle: null,
        datasFunctionalities: [],
      },

      userRoleDataToSend: {
        datas: [],
      },
    };
  },

  methods: {
    reinitialisation() {
      this.permissionSelected = [];
      this.roleObject.code = null;
      this.roleObject.libelle = null;
      this.roleObject.datasFunctionalities = [];
    },

    //SOUMETTRE NOUVEAU ROLE UTILISATEUR
    submit() {
      let isReadyToSubmit =
        (this.roleObject.code != null || this.roleObject.code == "") &&
        (this.roleObject.libelle != null || this.roleObject.libelle == "");
      if (!isReadyToSubmit) {
        this.errorMsg = "Veuillez renseigner les champs obligatoires !!!";
        showErrorMessage();
      } else {
        if (this.permissionSelected.length == 0) {
          this.errorMsg = "Veuillez rattacher des permissions !!";
          showErrorMessage();
        } else {
          this.roleObject.datasFunctionalities = this.permissionList;
          this.addNewRole();
        }
      }
    },

    // RECUPERER LA LISTE DES PERMISSIONS UTILISATEURS DISPONIBLES
    async getFunctionnaliesAvailable() {
      const permissions = await getAllPermissionApi(
        {},
        this.$store.state.userAuthentified.token
      );

      this.permissionList = permissions;
    },

    // ADD A NEW ROLE USER
    async addNewRole() {
      this.userRoleDataToSend.datas.push(this.roleObject);
      this.overlay = true;
      await axios
        .post(API_CREATE_USER_ROLE, this.userRoleDataToSend, {
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
          this.reinitialisation();
          this.isOpenDialog = false;
          this.overlay = false;
          this.$emit("update-roles");
        });
    },
  },

  mounted() {
    this.getFunctionnaliesAvailable();
  },
};
</script>

<style scoped>
.add_role_card_title {
  font-family: "Montserrat";
  font-weight: bold;
  opacity: 0.7;
}

.text_btn {
  color: white;
  font-weight: 400;
}

.add_role_title {
  font-weight: bold;
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

.role_field {
  font-family: "Montserrat";
}
</style>
