const { Router } = require("express");
const { Op } = require("sequelize");
const finance = require("../models/finance");
const Language = require("../models").language;
const Skill = require("../models").translationSkill;
const Profile = require("../models").profile;
const Finance = require("../models").finance;
const Availability = require("../models").availability;
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
  const originalLanguage = req.query.originalLanguage;
  const nativeLanguage = req.query.nativeLanguage;
  try {
    const originalLanguageforId = await Language.findOne({
      where: { title: originalLanguage },
    });
    const nativeLanguageforId = await Language.findOne({
      where: { title: nativeLanguage },
    });
    const originalLanguageId = originalLanguageforId.dataValues.id;
    const nativeLanguageId = nativeLanguageforId.dataValues.id;

    const profiles = await Profile.findAndCountAll({
      include: [
        { model: User, attributes: ["fullName", "imageUrl"] },
        { model: Finance, attributes: ["centsPerWord"] },
        { model: Availability, attributes: ["date"], raw: true },
        {
          model: Skill,
          where: {
            [Op.and]: [{ originalLanguageId }, { nativeLanguageId }],
          },
          include: [
            { model: Language, as: "originalLanguage" },
            { model: Language, as: "nativeLanguage" },
          ],
        },
      ],
    });
    res.status(200).send({ message: "success", profiles });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "ERROR something went wrong" });
  }
});

//get pricing based on selected profile
router.get("/pricing", async (req, res) => {
  const profileId = req.query.profileId;
  try {
    const profile = await Profile.findByPk(profileId, {
      include: [{ model: Finance, attributes: ["centsPerWord"] }],
    });
    res.status(200).send({ message: "success", pricing: profile.finance });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "ERROR something went wrong" });
  }
});

module.exports = router;
