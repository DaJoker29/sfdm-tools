#!/usr/bin/env node

function rollStats() {
  const rolls = [rollSix(), rollSix(), rollSix(), rollSix()];
  const lowest = Math.min(...rolls);
  const sum = rolls.reduce((acc, cur) => acc + cur, 0) - lowest;

  return sum;
}

function rollSix() {
  return Math.floor(Math.random() * 6) + 1;
}

function rollSet(count) {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(rollStats());
  }

  console.log(result);
  const sum = result.reduce((acc, cur) => acc + cur, 0);
  console.log(`Sum: ${sum}`);
}

rollSet(6);
