const generate = async function (req, res, next) {
  try {
    console.log(req.body);
    const { season, region, combatFlag, nonCombatFlag } = req.body;
    res.json(req.body);
  } catch (err) {
    next(err);
  }
};

export { generate };
