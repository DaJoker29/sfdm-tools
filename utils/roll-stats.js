#!/usr/bin/env node

const COUNT = 4; // total number of dice rolled
const SIDES = 6; // What sided die is rolled
const LOWEST = 1; // The number of dice being dropped

function rollStat(count, sides, lowest) {
  let rolls = [];

  for (let i = 0; i < count; i++) {
    rolls.push(rollDice(sides));
  }

  rolls = rolls.sort((a, b) => b - a);
  rolls.splice(rolls.length - lowest, lowest);

  const sum = rolls.reduce((acc, cur) => acc + cur, 0);

  return sum;
}

function rollDice(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function rollSet(count) {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(rollStat(COUNT, SIDES, LOWEST));
  }

  console.log(result);
  const sum = result.reduce((acc, cur) => acc + cur, 0);
  console.log(`Sum: ${sum}`);

  if (sum < 72) {
    console.log(
      "This set has a lower average then the Standard Array. You may want to reroll or use the array instead."
    );
  }
}

rollSet(6);
