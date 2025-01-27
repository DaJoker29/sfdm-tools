import { listNarratives } from "./narrative.js";

const checkAuth = async () => {
  const response = await fetch("/profile").then((response) => response.json());

  if (response.message === "No user found") {
    document.body.classList.remove("is-authenticated");
    document.body.classList.add("is-guest");
    return null;
  } else {
    document.body.classList.add("is-authenticated");
    document.body.classList.remove("is-guest");

    try {
      await listNarratives(response);
    } catch (err) {
      console.error(err);
    }

    return response;
  }
};

export { checkAuth };
