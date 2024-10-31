import express, { Request, Response } from "express";
import { fetchProfReview, fetchTeachingHistory } from "../controllers/prof.controllers";

const router = express.Router();

router.get('/reviews', async (req, res) => {
    const profId = req.query.profId as string
    
    try {
        const profReviews = await fetchProfReview(profId)
        res.json(profReviews)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

})

router.get('/courses', async (req, res) => {
    const profId = req.query.profId as string

    try {
        const profCourses = await fetchTeachingHistory(profId)
        res.json(profCourses)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

export default router;