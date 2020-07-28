const { Router } = require("express");
const auth = require("../auth/middleware");
const Language = require("../models").language;
const Profile = require("../models").profile;
const User = require("../models").user;
const Job = require("../models").job;
const Skill = require("../models").translationSkill;

const router = new Router();

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
    const profile = await Profile.findByPk(profileId);

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

//get all profile info based on user Id
router.get("/user/:id/profile", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await Profile.findOne({
      where: { userId: id },
    });
    const profileId = profile.dataValues.id;

    if (profile === null) {
      return res.status(404).send({ message: "This profile does not exist" });
    }

    if (!profileId === id) {
      return res
        .status(403)
        .send({ message: "You are not authorized to view this." });
    }

    if (isNaN(parseInt(id))) {
      return res.status(400).send({ message: "id is not a number" });
    }

    res.status(200).send({ message: "ok", profile });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "ERROR something went wrong" });
  }
});

//get all jobs based on user Id
router.get("/user/:id/jobs", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await Profile.findOne({
      where: { userId: id },
    });
    const profileId = profile.dataValues.id;

    if (profile === null) {
      return res.status(404).send({ message: "This profile does not exist" });
    }

    if (!profileId === id) {
      return res
        .status(403)
        .send({ message: "You are not authorized to view this." });
    }

    const jobs = await Job.findAll({
      where: { profileId },
    });

    res.status(200).send({ message: "ok", jobs });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "ERROR something went wrong" });
  }
});

//get all skills based on user Id
router.get("/user/:id/skills", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await Profile.findOne({
      where: { userId: id },
    });
    const profileId = profile.dataValues.id;

    if (!profileId === id) {
      return res
        .status(403)
        .send({ message: "You are not authorized to view this." });
    }

    const jobs = await Job.findAll({
      where: { profileId },
    });

    res.status(200).send({ message: "ok", jobs });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "ERROR something went wrong" });
  }
});

//update translated document in specific job
router.patch("/user/:userId/jobs/:jobId", auth, async (req, res) => {
  const { userId, jobId } = req.params;
  try {
    const toBeUpdatedJob = await Job.findByPk(jobId);
    const profile = await Profile.findOne({
      where: { userId },
    });
    const profileId = profile.dataValues.id;

    if (toBeUpdatedJob === null) {
      return res.status(404).send({ message: "Job not found." });
    }
    await toBeUpdatedJob.update({ ...req.body });

    const jobs = await Job.findAll({
      where: { profileId },
    });

    return res.status(200).send({ message: "success!", jobs });
  } catch (error) {
    console.log("here?", error);
    return res.status(400).send({ message: "ERROR something went wrong" });
  }
});

module.exports = router;
