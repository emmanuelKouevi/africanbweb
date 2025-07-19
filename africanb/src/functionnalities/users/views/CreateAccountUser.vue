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
                    class="form-select col-lg-6 user_field"
                    aria-label="Default select example"
                  >
                    <option></option>
                  </select>
                </div>
              </div>
              <br />

              <div class="row">
                <span class="user_section">Information du compte</span>
              </div>
              <br />
              <div class="container">
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label"
                    >Nom:
                  </label>
                  <input
                    type="text"
                    class="form-control col-lg-6 user_field"
                    id="exampleInputEmail1"
                  />
                </div>

                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label"
                    >Prénom(s):
                  </label>
                  <input
                    type="text"
                    class="form-control col-lg-8 user_field"
                    id="exampleInputEmail1"
                  />
                </div>

                <div class="row">
                  <div class="col-lg-6">
                    <label for="exampleInputEmail1" class="form-label"
                      >E-mail:</label
                    >
                    <input
                      type="text"
                      class="form-control col-lg-12 user_field"
                      id="exampleInputEmail1"
                    />
                  </div>
                  <div class="col-lg-6">
                    <label for="exampleInputEmail1" class="form-label"
                      >Login:</label
                    >
                    <input
                      type="text"
                      class="form-control col-lg-7 user_field"
                      id="exampleInputEmail1"
                    />
                  </div>
                </div>
                <br /><br /><br />
                <div class="float-right">
                  <v-btn btn small color="secondary"
                    ><span>Reinitialiser</span></v-btn
                  >&nbsp;&nbsp;
                  <v-btn type="submit" color="success" btn small
                    ><span>Créer le compte</span></v-btn
                  >
                </div>
              </div>
              <br />
            </v-card-text>
          </v-card>
        </div>

        <div class="col-lg-5">
          <ListOfCompagnies />
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import ListOfCompagnies from "@/functionnalities/common/views/ListOfCompagnies.vue";

export default {
  name: "CreateAccountUser.vue",
  components: {
    ListOfCompagnies,
  },
  data() {
    return {};
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
