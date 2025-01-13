const endpoint = "/api/journey";
const form = document.querySelector("#travelOptions");

const journey = () => {
  form.addEventListener("submit", submitListener);
};

export default journey;

async function submitListener(e) {
  e.preventDefault();

  const formData = new FormData(form);

  const season = formData.get("season");
  const region = formData.get("region");
  const combatFlag = formData.get("combatFlag");
  const nonCombatFlag = formData.get("nonCombatFlag");

  const data = {
    season,
    region,
    combatFlag,
    nonCombatFlag,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(endpoint, options).then((response) =>
    response.json()
  );

  console.log(response);

  const windElement = document.querySelector("#wind-output");
  const tempElement = document.querySelector("#temp-output");
  const overviewElement = document.querySelector("#overview-output");
  const bannerElement = document.querySelector("#banner-output > img");

  windElement.textContent = response.weatherWind;
  tempElement.textContent = response.weatherTemp;
  overviewElement.textContent = response.weatherOverview;
  bannerElement.src = `/img/${response.weatherBanner}`;
  bannerElement.alt = response.weatherOverview;
}
