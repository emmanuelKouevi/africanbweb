<template>
  <div>
    <div class="row">
      <span class="user_section">Information du compte</span>
    </div>
    <br />
    <div class="row">
      <div class="col-lg-5">
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Nom: </label>
          <input
            type="text"
            class="form-control col-lg-11 user_field"
            id="exampleInputEmail1"
            v-model="userSeller.nom"
          />
        </div>
      </div>

      <div class="col-lg-7">
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label"
            >Prénom(s):
          </label>
          <input
            type="text"
            class="form-control col-lg-10 user_field"
            id="exampleInputEmail1"
            v-model="userSeller.prenoms"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6">
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label"
            >Compagnie (Raison sociale):</label
          >
          <input
            disabled
            v-if="
              $store.state.userAuthentified.roleCode ===
              'RoleAdminCompagnieTransport'
            "
            type="text"
            class="form-control col-lg-9 user_field"
            id="exampleInputEmail1"
            :value="
              $store.state.userAuthentified.compagnieTransportRaisonSociale
            "
          />
          <input
            v-else
            type="text"
            class="form-control col-lg-9 user_field"
            id="exampleInputEmail1"
            v-model="userSeller.compagnieTransportRaisonSociale"
          />
        </div>
      </div>

      <div class="col-lg-6">
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Gare:</label>

          <input
            type="text"
            class="form-control col-lg-9 user_field"
            id="exampleInputEmail1"
            v-model="userSeller.gareDesignation"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6">
        <label for="exampleInputEmail1" class="form-label">E-mail:</label>
        <input
          type="text"
          class="form-control col-lg-12 user_field"
          id="exampleInputEmail1"
          v-model="userSeller.email"
        />
      </div>
      <div class="col-lg-6">
        <label for="exampleInputEmail1" class="form-label">Login:</label>
        <input
          type="text"
          class="form-control col-lg-7 user_field"
          id="exampleInputEmail1"
          v-model="userSeller.login"
        />
      </div>
    </div>
    <br /><br /><br />
    <div class="float-right">
      <v-btn btn small color="secondary"><span>Reinitialiser</span></v-btn
      >&nbsp;&nbsp;
      <v-btn type="submit" color="success" btn small @click="submit()"
        ><span>Créer le compte</span></v-btn
      >
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
  </div>
</template>

<script>
import $ from "jquery";
import { creatingUserApi } from "../../services/userApi";

export default {
  name: "UserTypeManager.vue",
  data() {
    return {
      errorMsg: null,
      successMsg: null,
      overlay: false,

      userSeller: {
        nom: null,
        prenoms: null,
        login: null,
        email: null,
        compagnieTransportRaisonSociale: null,
        gareDesignation: null,
        roleCode: "RoleUtiGareCompagnieTransport",
      },

      userCreateToSend: {
        datas: [],
      },
    };
  },

  methods: {
    // Soumission du formulaire de création d'un utilisateur
    submit() {
      if (
        this.$store.state.userAuthentified.roleCode ===
        "RoleAdminCompagnieTransport"
      ) {
        this.userSeller.compagnieTransportRaisonSociale =
          this.$store.state.userAuthentified.compagnieTransportRaisonSociale;
      }
      let isReadyToSubmit =
        (this.userSeller.nom != null || this.userSeller.nom == "") &&
        (this.userSeller.prenoms != null || this.userSeller.prenoms == "") &&
        (this.userSeller.login != null || this.userSeller.login == "") &&
        (this.userSeller.email != null || this.userSeller.email == "") &&
        (this.userSeller.compagnieTransportRaisonSociale != null ||
          this.userSeller.compagnieTransportRaisonSociale == "");

      if (!isReadyToSubmit) {
        this.errorMsg = "Veuillez renseigner correctement le formulaire !!!";
        $(".alert-error").fadeIn();
        setTimeout(function () {
          $(".alert-error").fadeOut();
        }, 4000);
      } else {
        this.userCreateToSend.datas.push(this.userSeller);
        this.createUser();
      }
    },

    // Création d'un utilisateur
    async createUser() {
      try {
        const isCreated = await creatingUserApi(
          this.userCreateToSend,
          this.$store.state.userAuthentified.token,
          this.overlay
        );
        if (isCreated) {
          this.successMsg = "Compté crée avec succès";
        } else {
          this.errorMsg = "Erreur lors de la création du compte";
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        }
        console.log(isCreated);
      } catch (error) {
        console.log(error);
        this.errorMsg = error;
      }
    },
  },
};
</script>

<style scoped>
.form-label {
  font-family: "Montserrat";
}

.user_field {
  font-family: "Montserrat";
}

.user_section {
  font-size: 15px;
  font-family: "Montserrat";
  font-weight: bold;
  opacity: 0.7;
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
</style>
