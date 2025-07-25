import {
  API_GET_ALL_ROLES,
  API_OBTENIR_LISTE_DE_TOUTES_LES_DEMANDES_ADHESIONS,
  API_RECUPERER_LISTE_GARES_PAR_COMPAGNIE,
  HEADERS,
} from "@/components/globalConfig/globalConstConfig";
import { showErrorMessage } from "@/functionnalities/messages/messageProcess";
import axios from "axios";

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
