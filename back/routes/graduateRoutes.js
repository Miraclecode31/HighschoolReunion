const express = require("express");
const Graduate = require("../models/Graduate");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, graduationYear, school, cclYear } = req.body;
    const graduate = new Graduate({ name, graduationYear, school, cclYear });
    await graduate.save();
    res.status(201).json(graduate);
  } catch (error) {
    res.status(500).json({ message: "Error adding graduate", error });
  }
});

router.get("/graduationRecords", async (req, res) => {
  const graduationRecords= await Graduate.find({ ...req.body });
  res.status(200).json({ graduationRecords });
});

router.get("/graduationRecords/:id", async (req, res) => {
  try {
      const graduationRecords = await Graduate.findById(req.params.id);
      if (graduationRecords) {
          res.status(200).json({ graduationRecords });
      } else {
          res.status(404).json({ message: "Record not found" });
      }
  } catch (error) {
      res.status(400).send(error);
  }
});

router.put("/graduationRecord/:id", async (req, res) => {
  try {
      const updatedRecord = await GraduationRecord.findByIdAndUpdate(
          req.params.id,
          {
              name: req.body.name,
              graduationYear: req.body.graduationYear,
              school: req.body.school,
              cclYear: req.body.cclYear
          },
          { new: true }
      );

      if (updatedRecord) {
          res.status(200).json({ updatedRecord });
      } else {
          res.status(404).json({ message: "Record not found" });
      }
  } catch (error) {
      res.status(400).send(error);
  }
});
router.get("/", async (req, res) => {
  try {
    const graduates = await Graduate.distinct('school');
    res.json(graduates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching schools", error });
  }
});

router.get("/school/:school", async (req, res) => {
  try {
    const school = req.params.school;
    const graduates = await Graduate.find({ school: school });
    res.json(graduates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching graduates by school", error });
  }
});

router.get("/test", (req, res) => {
  res.status(200).json({ message: "good job" });
});

module.exports = router;
