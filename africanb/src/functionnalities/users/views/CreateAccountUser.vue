<template>
  <v-app id="inspire">
    <div class="container">
      <div class="row">
        <span class="create_account_title">CRÉER UN COMPTE.</span>
      </div>
      <div class="row">
        <span class="subtitle_account"
          >Paramétrez le niveau d'accès des différents comptes dès leur
          création.</span
        >
      </div>
      <br />

      <div class="row">
        <div class="col-lg-7">
          <v-card>
            <v-card-text>
              <div class="row">
                <span class="user_section">Rôle de l'utilisateur</span>
              </div>
              <br />
              <div class="container">
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label"
                    >Sélectionner le role.
                  </label>
                  <select
                    class="form-select col-lg-7 user_field"
                    aria-label="Default select example"
                    v-model="userRoleCode"
                  >
                    <option v-for="(role, r) in userRoleToShow" :key="r">
                      {{ role.libelle }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="container">
                <UserTypeAdminCompagnie
                  v-if="
                    userRoleCode === 'Role Administrateur Compagnie Transport'
                  "
                />
              </div>
              <br />
            </v-card-text>
          </v-card>
        </div>

        <div class="col-lg-5">
          <div class="row">
            <div
              class="col-lg-12"
              v-if="
                $store.state.userAuthentified.roleCode ===
                'RoleAdminSocieteMere'
              "
            >
              <ListOfCompagnies />
            </div>
            <div
              class="col-lg-12"
              :hidden="
                userRoleCode === 'Role Administrateur Compagnie Transport' ||
                userRoleCode == null
              "
              v-if="
                $store.state.userAuthentified.roleCode ===
                  'RoleAdminCompagnieTransport' ||
                $store.state.userAuthentified.roleCode ===
                  'RoleAdminSocieteMere'
              "
            >
              <ListOfStations />
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import {
  ROLE_ADMIN_COMPAGNIE_TRANSPORT,
  ROLE_ADMIN_SOCIETE_MERE,
  ROLE_AGENT_GARE,
  ROLE_BAGAGISTE,
  ROLE_UTI_GARE_COMPAGNIE_TRANSPORT,
  ROLE_UTI_SIMPLE,
} from "@/components/globalConfig/constUsersRoles";
import { getUserRoleApi } from "@/functionnalities/common/services/commonApi";
import ListOfCompagnies from "@/functionnalities/common/views/ListOfCompagnies.vue";
import ListOfStations from "@/functionnalities/common/views/ListOfStations.vue";
import { showErrorMessage } from "@/functionnalities/messages/messageProcess";
import UserTypeAdminCompagnie from "../widgets/create_account/UserTypeAdminCompagnie.vue";

export default {
  name: "CreateAccountUser.vue",
  components: {
    ListOfCompagnies,
    ListOfStations,
    UserTypeAdminCompagnie,
  },
  data() {
    return {
      errorMsg: null,
      successMsg: null,

      userRoleCode: null,

      overlay: false,

      compagnieSellerUser: {
        nom: null,
        prenoms: null,
        login: null,
        email: null,
        compagnieTransportRaisonSociale: null,
        gareDesignation: null,
        roleCode: null,
      },

      roleList: [],

      userRoleToShow: [],
    };
  },

  methods: {
    async getAllUserRole() {
      try {
        const userRoles = await getUserRoleApi(
          {},
          this.$store.state.userAuthentified.token
        );
        this.roleList = userRoles;
        if (
          this.$store.state.userAuthentified.roleCode ===
          ROLE_ADMIN_SOCIETE_MERE
        ) {
          this.roleList.forEach((element) => {
            if (
              element.code !== ROLE_ADMIN_SOCIETE_MERE &&
              element.code !== ROLE_UTI_SIMPLE &&
              element.code !== ROLE_UTI_GARE_COMPAGNIE_TRANSPORT &&
              element.code !== ROLE_AGENT_GARE &&
              element.code !== ROLE_BAGAGISTE
            ) {
              this.userRoleToShow.push(element);
            }
          });
        }

        if (
          this.$store.state.userAuthentified.roleCode ===
          ROLE_ADMIN_COMPAGNIE_TRANSPORT
        ) {
          this.roleList.forEach((element) => {
            if (
              element.code !== ROLE_ADMIN_COMPAGNIE_TRANSPORT &&
              element.code !== ROLE_ADMIN_SOCIETE_MERE &&
              element.code !== ROLE_UTI_SIMPLE
            ) {
              this.userRoleToShow.push(element);
            }
          });
        }
      } catch (error) {
        showErrorMessage();
      }
    },
  },

  mounted() {
    this.getAllUserRole();
  },
};
</script>

<style scoped>
#inspire {
  background: #eeeeee;
}

.create_account_title {
  font-family: "Montserrat";
  font-size: 25px;
  font-weight: bold;
  opacity: 0.9;
}

.subtitle_account {
  font-family: "Montserrat";
  font-size: 15px;
}

.user_section {
  font-size: 15px;
  font-family: "Montserrat";
  font-weight: bold;
  opacity: 0.7;
}

.form-label {
  font-family: "Montserrat";
}

.user_field {
  font-family: "Montserrat";
}
</style>
