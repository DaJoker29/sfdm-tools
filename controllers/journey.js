import { SEASONS } from "../data/seasons.js";
import weather from "../data/weather.js";

const newJourney = async function (req, res, next) {
  try {
    console.log(
      `Request recieved from id: ${
        Object.prototype.hasOwnProperty.call(req, "user")
          ? req.user.googleID
          : "Unauthenticated"
      }`
    );
    const { season, region, combatFlag, nonCombatFlag } = req.body;
    const { weatherWind, weatherTemp, weatherOverview, weatherBanner } =
      calculateWeather(season);

    const response = {
      weatherWind,
      weatherTemp,
      weatherOverview,
      weatherBanner,
    };
    res.json(response);
  } catch (err) {
    next(err);
  }
};

export { newJourney };

function calculateWeather(season) {
  console.log(`Season: ${season}`);

  const seasonDetails = SEASONS[season];

  const weatherCategory = getWeatherCat(
    seasonDetails.chanceOfWeather,
    Math.random() * 100
  );

  const weatherWind = selectRandom(weather.WIND);
  console.log(`Weather Wind: ${weatherWind}`);

  const weatherTemp = selectRandom(weather.TEMP);
  console.log(`Weather Temp: ${weatherTemp}`);

  const weatherOverview = selectRandom(weather.WEATHER[weatherCategory]);
  console.log(`Weather Overview: ${weatherOverview}`);

  const weatherBanner = weather.BANNER[weatherCategory];
  console.log(`Weather Banner: ${weatherBanner}`);

  return { weatherWind, weatherTemp, weatherOverview, weatherBanner };
}

function getWeatherCat(chanceArr, rand) {
  console.log(`Determining weather: ${rand}`);
  for (let i = 0; i < chanceArr.length; i++) {
    if (rand < chanceArr[i].weight) {
      console.log(`Outcome: ${chanceArr[i].weather}`);
      return chanceArr[i].weather;
    }
    rand -= chanceArr[i].weight;
  }
}

function selectRandom(array) {
  return array.at(Math.floor(Math.random() * array.length));
}
