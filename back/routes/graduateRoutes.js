const express = require("express");
const mongoose = require("mongoose");
const Graduate = require("../models/Graduate");

const router = express.Router();

router.get("/schools", async (req, res) => {
  console.log("List of schools...");
  try {
    const graduates = await Graduate.distinct("school"); 
    res.status(200).json(graduates); 
  } catch (error) {
    res.status(500).json({ message: "Error fetching schools", error });
  }
});

router.get("/graduationRecords", async (req, res) => {
  try {
    const graduationRecords = await Graduate.find(req.query); 
    res.status(200).json(graduationRecords);
  } catch (error) {
    res.status(500).json({ message: "Error fetching graduation records", error });
  }
});

router.get("/graduationRecords/:id", async (req, res) => {
  try {
    const graduationRecord = await Graduate.findById(req.params.id); 
    if (graduationRecord) {
      res.status(200).json(graduationRecord);
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    res.status(400).send(error); 
  }
});

router.post("/graduationRecords", async (req, res) => {
  try {
    const { name, graduationYear, school, cclYear, comment } = req.body;

    if (!comment) {
      return res.status(400).json({ message: "Comment message is required" }); 
    }

    const graduate = new Graduate({ name, graduationYear, school, cclYear, comment });
    await graduate.save();
    res.status(201).json(graduate); 
  } catch (error) {
    res.status(500).json({ message: "Error adding graduate", error });
  }
});

router.put("/graduationRecords/:id", async (req, res) => {
  try {
    const updatedRecord = await Graduate.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        graduationYear: req.body.graduationYear,
        school: req.body.school,
        cclYear: req.body.cclYear,
        comment: req.body.comment, 
      },
      { new: true } 
    );

    if (updatedRecord) {
      res.status(200).json(updatedRecord); 
    } else {
      res.status(404).json({ message: "Record not found" }); 
    }
  } catch (error) {
    res.status(400).send(error); 
  }
});

router.delete("/graduationRecords/:id", async (req, res) => {
  try {
    const deletedRecord = await Graduate.findByIdAndDelete(req.params.id);
    if (deletedRecord) {
      res.status(200).json({ message: "Graduation record deleted successfully" });
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting graduation record", error });
  }
});

router.get("/school/:schoolId", async (req, res) => {
  try {
    const { schoolId } = req.params;
    const schoolObjectId = mongoose.Types.ObjectId(schoolId); 
    const graduates = await Graduate.find({ school: schoolObjectId });

    if (graduates.length > 0) {
      res.status(200).json(graduates); 
    } else {
      res.status(404).json({ message: `No graduates found for school with ID ${schoolId}` });
    }
  } catch (error) {
    console.error("Error fetching graduates by school:", error);
    res.status(500).json({ message: "Error fetching graduates by school", error });
  }
});

module.exports = router;
