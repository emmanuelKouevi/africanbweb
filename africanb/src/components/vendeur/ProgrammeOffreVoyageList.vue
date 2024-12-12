<template>
  <v-app id="inspire">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-10">
          <v-card elevation="5">
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="designation_offre">
                      {{ offreVoyage.designation }}</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>Type l'offre:</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold">{{
                      offreVoyage.typeOffreVoyageDesignation
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>Départ :</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold">{{
                      offreVoyage.villeDepartDesignation
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>Destination :</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold">{{
                      offreVoyage.villeDestinationDesignation
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </div>
      </div>
      <br />

      <div class="container-fluid">
        <h4>
          PROGRAMMES ASSOCIÉS À L' OFFRE DE VOYAGE ({{
            offreVoyage.designation
          }})
        </h4>
        <br /><br />

        <div class="row" v-for="(programme, p) in programmeList" :key="p">
          <div class="col-lg-10">
            <v-card rounded="xl" elevation="3">
              <v-card-text>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold"
                      >Programme n°{{ p + 1 }}</v-list-item-title
                    >
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-menu bottom right>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on"
                          ><v-icon>mdi-dots-horizontal</v-icon></v-btn
                        >
                      </template>

                      <v-list>
                        <v-list-item link @click="toBookTicket(offreVoyage)">
                          <v-list-item-action
                            ><v-icon color="primary"
                              >mdi-pencil</v-icon
                            ></v-list-item-action
                          >
                          <v-list-item-subtitle
                            >Faire une réservation</v-list-item-subtitle
                          >
                        </v-list-item>

                        <v-list-item
                          link
                          @click="toExportReport(programme.designation)"
                        >
                          <v-list-item-action
                            ><v-icon>mdi-file</v-icon></v-list-item-action
                          >
                          <v-list-item-subtitle
                            >Exporter le rapport</v-list-item-subtitle
                          >
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-list-item-action>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>Réference:</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold">{{
                      programme.designation
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>Jour de départ:</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold">{{
                      programme.dateDepart
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>Jour d'arrivée:</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold">{{
                      programme.dateArrivee
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>Bus:</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold">{{
                      programme.numeroBus
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle
                      >Nombre de places:</v-list-item-subtitle
                    >
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-subtitle class="font-weight-bold">{{
                      programme.nombrePlaceDisponible
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import {
  HEADERS,
  API_GENERATE_REPORT,
  API_RECUPERER_PROGRAMME_PAR_OFFRE_VOYAGE,
} from "../globalConfig/globalConstConfig";
export default {
  name: "ProgrammeOffreVoyageList",
  data() {
    return {
      offreVoyage: {
        id: null,
        designation: null,
        description: null,
        compagnieTransportRaisonSociale: null,
        typeOffreVoyageDesignation: null,
        villeDepartDesignation: null,
        villeDestinationDesignation: null,
      },

      offreVoyageObject: {
        data: {
          designation: null,
        },
      },

      reportGenerated: {
        data: {
          programmeDesignation: null,
        },
      },

      programmeList: [],
    };
  },

  methods: {
    async convertToBase64(byte) {
      window.open(
        "data:application/pdf;base64," + byte,
        "_blank",
        "fullscreen=yes"
      );
    },

    //OBTENIR LA LISTE DES PROGRAMMES PAR OFFRE DE VOYAGE
    async getPlanningByOffersTravel() {
      await axios
        .post(
          API_RECUPERER_PROGRAMME_PAR_OFFRE_VOYAGE,
          this.offreVoyageObject,
          { headers: HEADERS(this.$store.state.userAuthentified.token) }
        )
        .then((response) => {
          if (response.data.status.code == 800) {
            this.programmeList = response.data.items;
          } else {
            this.programmeList = [];
          }
        })
        .catch((e) => {
          this.errorMsg = e;
          this.programmeList = [];
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        });
    },

    //Exporter le rapport en PDF
    async toExportReport(designationProgramme) {
      this.reportGenerated.data.programmeDesignation = designationProgramme;
      await axios
        .post(API_GENERATE_REPORT, this.reportGenerated, {
          headers: HEADERS(this.$store.state.userAuthentified.token),
        })
        .then((response) => {
          console.log(response);
          if (designationProgramme == null) {
            this.$swal.fire(
              "Erreur",
              "Impossible de télécharger le rapport",
              "error"
            );
          } else if (response.data.hasError == true) {
            this.$swal.fire("Erreur", "Une erreur s'est produite", "error");
          } else {
            this.convertToBase64(response.data.item.contentBase64);
          }
        })
        .catch((e) => {
          this.errorMsg = e;
        });
    },

    storeOffreVoyageItem(item) {
      const parsedOffreSelected = JSON.stringify(item);
      localStorage.setItem("offreVoyageSelected", parsedOffreSelected);
    },

    toBookTicket(offreVoyage) {
      this.storeOffreVoyageItem(offreVoyage);
      this.$router.push({ path: "/reservationBillet" });
    },

    async retrieveOffreSelected() {
      if (localStorage.getItem("offreVoyageSelected")) {
        try {
          const offreVoyageEditing = JSON.parse(
            localStorage.getItem("offreVoyageSelected")
          );
          this.offreVoyage.id = offreVoyageEditing.id;
          this.offreVoyage.designation = offreVoyageEditing.designation;
          this.offreVoyage.description = offreVoyageEditing.description;
          this.offreVoyage.typeOffreVoyageDesignation =
            offreVoyageEditing.typeOffreVoyageDesignation;
          this.offreVoyage.villeDepartDesignation =
            offreVoyageEditing.villeDepartDesignation;
          this.offreVoyage.villeDestinationDesignation =
            offreVoyageEditing.villeDestinationDesignation;
          this.offreVoyageObject.data.designation =
            this.offreVoyage.designation;
          await this.getPlanningByOffersTravel();
        } catch (error) {
          localStorage.removeItem("offreVoyage");
        }
      }
    },
  },

  mounted() {
    this.retrieveOffreSelected();
  },
};
</script>

<style scoped>
.designation_offre {
  font-weight: 700;
  color: #303952;
  font-size: xx-large;
}
</style>
