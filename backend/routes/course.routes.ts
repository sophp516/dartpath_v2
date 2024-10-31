import express, { Request, Response } from "express";
import { getSearchResults, getCourseDetail, getPrerequisitesForCourse } from "../controllers/course.controllers";

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
    // Extracting query parameters and ensuring they are strings
    const distribs = req.query.distribs as string[] | undefined;
    const worldCulture = req.query.worldCulture as string[] | undefined;
    const textQuery = req.query.textQuery as string | undefined;

    // Convert query parameters to appropriate types if necessary
    const distribsArray = Array.isArray(distribs) ? distribs : distribs ? [distribs] : [];
    const worldCultureArray = Array.isArray(worldCulture) ? worldCulture : worldCulture ? [worldCulture] : [];

    try {
        const searchResults = await getSearchResults(distribsArray, worldCultureArray, textQuery);
        res.json(searchResults); // Send search results as JSON
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/fetch", async (req: Request, res: Response) => {
    const courseId = req.query.courseId as string;

    try {
        const courseDetail = await getCourseDetail(courseId);
        res.json(courseDetail);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/prereq", async (req: Request, res: Response) => {
    const courseId = req.query.courseId as string;
    
    try {
        const prereqs = await getPrerequisitesForCourse(courseId)
        res.json(prereqs)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

router.get("/term", async (req: Request, res: Response) => {
    
})



export default router;