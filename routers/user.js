const { Router } = require("express");
const auth = require("../auth/middleware");
const Language = require("../models").language;
const Profile = require("../models").profile;
const User = require("../models").user;
const Job = require("../models").job;

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

//get all jobs based on profile Id
router.get("/user/:id/jobs", auth, async (req, res) => {
  const { id } = req.params;
  const profile = await Profile.findByPk(id);
  console.log("whats profile?", profile);

  if (profile === null) {
    return res.status(404).send({ message: "This profile does not exist" });
  }

  if (!profile.userId === id) {
    return res
      .status(403)
      .send({ message: "You are not authorized to view this." });
  }

  if (isNaN(parseInt(id))) {
    return res.status(400).send({ message: "Profile id is not a number" });
  }

  const jobs = await Job.findAll({
    where: { profileId: id },
  });

  res.status(200).send({ message: "ok", jobs });
});

module.exports = router;
