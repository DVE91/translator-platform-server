const { Router } = require("express");
const Language = require("../models").language;
const Translator = require("../models").profile;
const User = require("../models").user;

const router = new Router();

router.get("/languages", async (req, res) => {
  const limit = req.query.limit || 30;
  const offset = req.query.offset || 0;
  const languages = await Language.findAndCountAll({
    limit,
    offset,
    attributes: ["originalLanguage", "nativeLanguage"],
  });
  res.status(200).send({ message: "success", languages });
});

router.get("/translators", async (req, res) => {
  const limit = req.query.limit || 30;
  const offset = req.query.offset || 0;
  const profiles = await Translator.findAndCountAll({
    limit,
    offset,
    include: { model: User, attributes: ["fullName", "imageUrl"] },
    include: {
      model: Language,
      attributes: ["originalLanguage", "nativeLanguage"],
    },
  });
  res.status(200).send({ message: "success", profiles });
});

module.exports = router;
