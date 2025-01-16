import { addEventListeners } from "./days-travel.js";

document.body.classList.remove("no-js");
document.body.classList.add("js");

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    document.body.classList.add("is-complete");
    document.body.classList.remove("is-loading");
  }
};

addEventListeners();
