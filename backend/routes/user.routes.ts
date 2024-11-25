import express, { Request, Response } from "express";
import { fetchUserDrafts, updateTermList, createNewDraft, deleteDraft, addCourseToTerm } from "../controllers/user.controllers";
import { AddCourseToTermReq } from "../controllers/user.controllers";

const router = express.Router();

router.get('/drafts', async (req, res) => {
    const userId = req.query.userId as string
    try {
        const draftData = await fetchUserDrafts(parseInt(userId))
        res.json(draftData)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

router.put('/drafts/:id/terms', async (req, res) => {
    const draftId = req.params.id; // Retrieve draftId from the URL parameters
    const { termList } = req.body;
    console.log(termList)

    try {
        const updatedDraft = await updateTermList(draftId, termList); // Await the function call
        res.json(updatedDraft); // Send back the updated draft in response
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.put('/drafts/create', async (req, res) => {
    const userId = req.query.userId as string
    try {
        const newDraft = await createNewDraft(userId)
        res.json(newDraft)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

router.delete('/drafts/delete/:draftId', async (req, res) => {
    const { draftId } = req.params;
    console.log(`Deleting draft with draftId: ${draftId}`);
    try {
        const deletedDraft = await deleteDraft(draftId)
        res.json(deletedDraft);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

router.put('/terms/:termId', async (req, res) => {
    const { termId } = req.params
    const { courseId } = req.query

    if (!courseId || !termId) {
        return res.status(400).json({ error: "courseId and termId are required" });
    }

    try {
        const updatedTerm = await addCourseToTerm({
            courseId: parseInt(courseId as string),
            userTermId: parseInt(termId)
        })
        res.json(updatedTerm)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})


export default router;
