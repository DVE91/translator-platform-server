const { Router } = require("express");
const auth = require("../auth/middleware");
const Language = require("../models").language;
const Profile = require("../models").profile;
const User = require("../models").user;
const Job = require("../models").job;
const Finance = require("../models").finance;
const Payment = require("../models").payment;
const Skill = require("../models").translationSkill;
const ProfileSkill = require("../models").profileTranslationSkills;

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
    id,
    fullName,
    emailAddress,
    paid,
    totalPrice,
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
      !endDate ||
      !fullName ||
      !emailAddress ||
      !paid
    ) {
      return res
        .status(400)
        .send({ message: "Please fill in all the required fields" });
    }

    let newUser;
    let newPayment;
    if (!id) {
      newUser = await User.create({
        fullName,
        emailAddress,
        isTranslator: false,
      });
      newPayment = await Payment.create({
        userId: newUser.id,
        profileId,
        totalPrice,
        paid,
      });
    } else {
      newPayment = await Payment.create({
        userId: id,
        profileId,
        totalPrice,
        paid,
      });
    }

    const job = await Job.create({
      profileId,
      paymentId: newPayment.id,
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

    if (profile === null) {
      return res.status(404).send({ message: "This profile does not exist" });
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

//get all finance info based on user Id
router.get("/user/:id/finance", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await Profile.findOne({
      where: { userId: id },
    });
    const profileId = profile.dataValues.id;

    if (profile === null) {
      return res.status(404).send({ message: "This profile does not exist" });
    }
    const finances = await Finance.findOne({
      where: { profileId },
    });

    res.status(200).send({ message: "ok", finances });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "ERROR something went wrong" });
  }
});

//update specific finance row with cents per word
router.patch("/user/:userId/finance/:financeId", auth, async (req, res) => {
  const { userId, financeId } = req.params;
  try {
    const toBeUpdatedFinance = await Finance.findByPk(financeId);
    const profile = await Profile.findOne({
      where: { userId },
    });
    const profileId = profile.dataValues.id;

    if (toBeUpdatedFinance === null) {
      return res
        .status(404)
        .send({ message: "Finance information not found." });
    }
    await toBeUpdatedFinance.update({ ...req.body });

    const finances = await Finance.findOne({
      where: { profileId },
    });

    return res.status(200).send({ message: "success!", finances });
  } catch (error) {
    console.log("error", error);
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
    const jobs = await Job.findAll({
      where: { profileId },
      include: [
        {
          model: Payment,
          attributes: ["totalPrice"],
          include: { model: User, attributes: ["fullName", "emailAddress"] },
        },
      ],
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
      include: [
        {
          model: Payment,
          attributes: ["totalPrice"],
          include: { model: User, attributes: ["fullName", "emailAddress"] },
        },
      ],
    });

    return res.status(200).send({ message: "success!", jobs });
  } catch (error) {
    console.log("error", error);
    return res.status(400).send({ message: "ERROR something went wrong" });
  }
});

//create new translation skill
router.post("/user/:id/skills", auth, async (req, res) => {
  const { id } = req.params;
  const { originalLanguage, nativeLanguage } = req.body;
  try {
    const profileforId = await Profile.findOne({
      where: { userId: id },
    });
    const profileId = profileforId.dataValues.id;

    const originalLanguageforId = await Language.findOne({
      where: { title: originalLanguage },
    });
    const nativeLanguageforId = await Language.findOne({
      where: { title: nativeLanguage },
    });

    const originalLanguageId = originalLanguageforId.dataValues.id;
    const nativeLanguageId = nativeLanguageforId.dataValues.id;

    const translationSkill = await Skill.create({
      originalLanguageId,
      nativeLanguageId,
    });
    await ProfileSkill.create({
      profileId,
      translationSkillId: translationSkill.dataValues.id,
    });

    const skillQuery = await Profile.findByPk(profileId, {
      include: [
        {
          model: Skill,
          include: [
            { model: Language, as: "originalLanguage" },
            { model: Language, as: "nativeLanguage" },
          ],
        },
      ],
    });
    const skills = skillQuery.dataValues.translationSkills;
    res.status(200).send({ message: "ok", skills });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "ERROR something went wrong" });
  }
});

//get all translation skills based on user Id
router.get("/user/:id/skills", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const profileforId = await Profile.findOne({
      where: { userId: id },
    });
    const profileId = profileforId.dataValues.id;

    if (!profileId === id) {
      return res
        .status(403)
        .send({ message: "You are not authorized to view this." });
    }

    const skillQuery = await Profile.findByPk(profileId, {
      include: [
        {
          model: Skill,
          include: [
            { model: Language, as: "originalLanguage" },
            { model: Language, as: "nativeLanguage" },
          ],
        },
      ],
    });

    const skills = skillQuery.dataValues.translationSkills;

    res.status(200).send({ message: "ok", skills });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "ERROR something went wrong" });
  }
});

//delete skill by skillId
router.delete("/user/:id/skills/:skillId", auth, async (req, res) => {
  const { id, skillId } = req.params;
  try {
    const profileforId = await Profile.findOne({
      where: { userId: id },
    });
    const profileId = profileforId.dataValues.id;

    if (!profileId === id) {
      return res
        .status(403)
        .send({ message: "You are not authorized to do this." });
    }

    const toDelete = await Skill.findByPk(skillId);
    if (!toDelete) {
      res.status(404).send("Translation skillset not found");
    } else {
      const deleted = await toDelete.destroy();
      res.status(200).send({ message: "ok", deleted });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "ERROR something went wrong" });
  }
});

module.exports = router;
