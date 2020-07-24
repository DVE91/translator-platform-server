const { Router } = require("express");
const Language = require("../models").language;
const Translator = require("../models").profile;
const User = require("../models").user;
const Job = require("../models").job;

const router = new Router();

//get all languages in database (for selection in order process)
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

//get the profiles of all translators
router.get("/translators", async (req, res) => {
  const limit = req.query.limit || 30;
  const offset = req.query.offset || 0;
  const profiles = await Translator.findAndCountAll({
    limit,
    offset,
    include: [
      { model: User, attributes: ["fullName", "imageUrl"] },
      {
        model: Language,
        attributes: ["originalLanguage", "nativeLanguage"],
      },
    ],
  });
  res.status(200).send({ message: "success", profiles });
});

//get all jobs based on profile Id
router.get("/user/:id/jobs", async (req, res) => {
  const { id } = req.params;

  console.log(id);
  if (isNaN(parseInt(id))) {
    return res.status(400).send({ message: "Profile id is not a number" });
  }
  const jobs = await Job.findAll({
    where: { profileId: id },
  });

  res.status(200).send({ message: "ok", jobs });
});

//create a new job in the database
router.post("/user/order", async (req, res) => {
  const {
    profileId,
    title,
    type,
    wordCount,
    originalLanguage,
    nativeLanguage,
    originalDocument,
    startingDate,
    endDate,
  } = req.body;

  try {
    const profile = await Translator.findByPk(profileId);

    console.log("WAHATS ID>", profileId);
    console.log("WHATS PROFILE?", profile);

    if (profile === null) {
      return res
        .status(404)
        .send({ message: "This translator profile does not exist" });
    }

    if (
      !title ||
      !type ||
      !wordCount ||
      !originalLanguage ||
      !nativeLanguage ||
      !originalDocument ||
      !startingDate ||
      !endDate
    ) {
      return res
        .status(400)
        .send({ message: "Please fill in all the required fields" });
    }

    const job = await Job.create({
      profileId,
      title,
      type,
      wordCount,
      originalLanguage,
      nativeLanguage,
      originalDocument,
      startingDate,
      endDate,
    });

    return res.status(201).send({ message: "Job created", job });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "ERROR something went wrong" });
  }
});

module.exports = router;
