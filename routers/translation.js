const { Router } = require("express");
const Language = require("../models").language;
const Skill = require("../models").translationSkill;
const Profile = require("../models").profile;
const User = require("../models").user;

const router = new Router();

//get all languages in database (for selection in order process)
router.get("/languages", async (req, res) => {
  const limit = req.query.limit || 30;
  const offset = req.query.offset || 0;
  const languages = await Language.findAndCountAll({
    limit,
    offset,
  });
  res.status(200).send({ message: "success", languages });
});

//get the profiles of all translators with their language skills
router.get("/translators", async (req, res) => {
  const limit = req.query.limit || 500;
  const offset = req.query.offset || 0;
  const profiles = await Profile.findAndCountAll({
    limit,
    offset,
    include: [
      { model: User, attributes: ["fullName", "imageUrl"] },
      {
        model: Skill,
        include: [
          { model: Language, as: "originalLanguage" },
          { model: Language, as: "nativeLanguage" },
        ],
      },
    ],
  });
  res.status(200).send({ message: "success", profiles });
});

module.exports = router;
