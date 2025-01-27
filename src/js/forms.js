import { SEASONS } from "../../data/seasons.js";
import { REGIONS } from "../../data/regions.js";

const buildFormFields = async () => {
  const seasonSelect = document.getElementById("season-select");
  const regionSelect = document.getElementById("region-select");

  for (const season in SEASONS) {
    const option = document.createElement("option");
    option.value = season;
    option.text = SEASONS[season].label;
    seasonSelect.appendChild(option);
  }

  for (const region in REGIONS) {
    const option = document.createElement("option");
    option.value = region;
    option.text = `${REGIONS[region].label} (${REGIONS[region].biome})`;
    regionSelect.appendChild(option);
  }
};

export { buildFormFields };
