import {
  API_GET_ALL_FUNCTIONNALITIES,
  API_GET_ALL_ROLES,
  API_OBTENIR_LISTE_DE_TOUTES_LES_DEMANDES_ADHESIONS,
  API_RECUPERER_LISTE_GARES_PAR_COMPAGNIE,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";
import { showErrorMessage } from "@/functionnalities/messages/messageProcess";
import axios from "axios";
import $ from "jquery";
// API GET ALL FUNCTIONNALITIES PERMISSIONS
export const getAllPermissionApi = async (body, headers) => {
  let permissions = [];
  await axios
    .post(API_GET_ALL_FUNCTIONNALITIES, body, { headers: headers })
    .then((response) => {
      if (response.status == 200) {
        if (response.data.status.code != 800) {
          //this.errorMsg = response.data.status.message;
          $(".alert-error").fadeIn();
          setTimeout(function () {
            $(".alert-error").fadeOut();
          }, 4000);
        } else {
          permissions = response.data.items;
        }
      } else {
        permissions = [];
        //this.errorMsg = "Erreur";
        $(".alert-error").fadeIn();
        setTimeout(function () {
          $(".alert-error").fadeOut();
        }, 4000);
      }
    })
    .catch((e) => {
      permissions = [];
      console.log(e);
      //this.errorMsg = e;
    });

  return permissions;
};
// API GET ALL COMPAGNIES CREATED
export const getCompagniesAvailableApi = async (body, headers) => {
  let compagnieList = [];
  try {
    await axios
      .post(API_OBTENIR_LISTE_DE_TOUTES_LES_DEMANDES_ADHESIONS, body, {
        headers: HEADERS(headers),
      })
      .then((response) => {
        compagnieList = response.data.items;
      })
      .catch((e) => {
        console.log(e);
        showErrorMessage();
      });
  } catch (error) {
    showErrorMessage();
    console.log(error);
  }
  return compagnieList;
};

// API GET ALL USERS ROLES
export const getUserRoleApi = async (body, headers) => {
  let userRoles = [];
  try {
    await axios
      .post(API_GET_ALL_ROLES, body, {
        headers: HEADERS(headers),
      })
      .then((response) => {
        userRoles = response.data.items;
      })
      .catch((e) => {
        console.log(e);
        showErrorMessage();
      });
  } catch (error) {
    showErrorMessage();
    console.log(error);
  }
  return userRoles;
};

// API GET STATIONS
export const getStationApi = async (body, headers) => {
  let stationList = [];
  try {
    await axios
      .post(API_RECUPERER_LISTE_GARES_PAR_COMPAGNIE, body, {
        headers: HEADERS(headers),
      })
      .then((response) => {
        stationList = response.data.items;
      })
      .catch((e) => {
        console.log(e);
        showErrorMessage();
      });
  } catch (error) {
    showErrorMessage();
    console.log(error);
  }
  return stationList;
};
