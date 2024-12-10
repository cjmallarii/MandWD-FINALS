const express = require("express");

const router = express.Router();
const courseController = require("../controllers/Course-Controllers.js");


router.post("/", courseController.addCourse);


router.get("/all", courseController.getAllCourses);


router.get("/all/active", courseController.getAllActiveCourses);


router.get("/all/inactive", courseController.getAllInactiveCourses);


router.get("/search/:courseId", courseController.getSpecificCourse);


router.put("/archive/:courseId", courseController.archiveCourse);


router.put("/activate/:courseId", courseController.activateCourse);




module.exports = router;