import { parse } from "@dotenvx/dotenvx";
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const submitToGPT = async (request) => {
  const prompt = generatePrompt(request);

  const raw = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an assistant helping me write beautiful, narrative text for my homebrew D&D campaign.",
      },
      { role: "user", content: prompt },
    ],
  });

  return { prompt, ...parseContent(raw) };
};

function parseContent(raw) {
  const content = raw.choices[0].message.content;
  const trimmed = content.substring(7, content.length - 3);
  return JSON.parse(trimmed);
}

function generatePrompt(request) {
  const text = [
    `Generate boxed text for a Dungeons & Dragons session in a custom setting.`,
    `First, I'll need a description of travel conditions (1 to 2 short sentences). The season is ${request.season}. The party is in a region called ${request.region}. The biome type is ${request.biome}.`,
    `${
      request.combatFlag === "on"
        ? "Next, I need you to generate a combat encounter (1 to 2 short sentences). Try to include more than one type of enemy and other complicating factors."
        : ""
    }`,
    `${
      request.nonCombatFlag === "on"
        ? "Finally, I need you to generate a noncombat encounter as well (1 to 2 short sentences). It can be a social interaction, puzzle, skill challenge, environmental hazard, mystery, random event, or anything else that doesn't involve combat."
        : ""
    }`,
    `Deliver your response in JSON format with the following key values: travelConditions (string), combatEncounter (string), nonCombatEncounter (string).`,
  ];
  return text.join(" ");
}

export { submitToGPT };
