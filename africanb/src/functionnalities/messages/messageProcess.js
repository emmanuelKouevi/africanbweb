import $ from "jquery";

export const showErrorMessage = () => {
  $(".alert-error").fadeIn();
  setTimeout(function () {
    $(".alert-error").fadeOut();
  }, 4000);
};

export const showSuccessMessage = () => {
  $(".alert-success").fadeIn();
  setTimeout(function () {
    $(".alert-success").fadeOut();
  }, 4000);
};

export const showWarningMessage = () => {
  $(".alert-warning").fadeIn();
  setTimeout(function () {
    $(".alert-warning").fadeOut();
  }, 3000);
};
