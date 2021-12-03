export function closeAllModals() {
  document.querySelector("[data-bs-dismiss=modal]").click();

  // // get modals
  const modals = document.getElementsByClassName("btn-close");

  // // on every modal change state like in hidden modal
  for (let i = 0; i < modals.length; i++) {
    modals[i].click();
  }

  // document.body.classList.remove("modal-open");
  // document.body.style = "";

  // // get modal backdrops
  // const modalsBackdrops = document.getElementsByClassName("modal-backdrop");

  // // remove every modal backdrop
  // for (let i = 0; i < modalsBackdrops.length; i++) {
  //   document.body.removeChild(modalsBackdrops[i]);
  // }
}
