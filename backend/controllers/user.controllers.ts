import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const fetchUserDrafts = async (userId: number) => {
    try {
        const drafts = await prisma.userDraft.findMany({
            where: { userId },
            include: {
                termList: {
                    include: {
                        courseList: {
                            include: {
                                course: true,
                            },
                        },
                    },
                },
            },
        });
        return drafts;
    } catch (error) {
        console.error("Error fetching drafts:", error);
        return []; // Return an empty array on error
    }
};

export const updateTermList = async (draftId: string, termList) => {
    try {
        const updatedDraft = await prisma.userDraft.update({
            where: { id: parseInt(draftId) }, // Use draftId to find the draft
            data: {
                termList: {
                    updateMany: termList.map((term) => ({
                        where: { id: term.id },  // Match each UserTerm by ID
                        data: {
                            onOffStatus: term.onOffStatus,  // Update onOffStatus
                            comment: term.comment,  // Update comment
                            // Update the courseList by connecting existing UserCourse records
                            courseList: {
                                set: [], // This will clear all the current connections
                                connect: Array.isArray(term.UserCourse) && term.UserCourse.length
                                    ? term.UserCourse.map(course => ({ id: course.id })) // Only call map if it's a valid array
                                    : []  // If UserCourse is not an array or is empty, do not connect anything
                            },
                        },
                    })),
                },
            },
        });
        return updatedDraft; // Return the updated draft
    } catch (error) {
        console.error("Error updating draft terms:", error);
        throw error; // Re-throw error for the calling function to handle
    }
}

export const createNewDraft = async (userId: string) => {
    try {
        // Step 1: Create 16 UserTerm entries with onOffStatus as false and empty courseList
        const userTerms = [];
        for (let i = 0; i < 16; i++) {
            const userTerm = await prisma.userTerm.create({
                data: {
                    userId: parseInt(userId),
                    onOffStatus: false,
                    comment: '', // Set a default comment if needed
                    courseList: {
                        create: [], // Assuming you want an empty array for courseList
                    },
                },
            });
            userTerms.push(userTerm);
        }

        // Step 2: Create the UserDraft with title "Untitled" and reference the created UserTerms
        const userDraft = await prisma.userDraft.create({
            data: {
                userId: parseInt(userId),
                title: 'Untitled',
                termList: {
                    connect: userTerms.map(term => ({ id: term.id })),
                },
            },
        });

        return userDraft;
    } catch (error) {
        console.error("Error creating UserDraft:", error);
        throw error; // Re-throw error after logging
    }
};

export const deleteDraft = async (draftId: string) => {
    try {
        const deletedDraft = await prisma.userDraft.delete({
            where: {
                id: parseInt(draftId),
            },
        });
        return deletedDraft;
    } catch (error) {
        console.error("Error deleting UserDraft:", error);  // Log error message
        throw error;
    }
};

export type AddCourseToTermReq = {
    courseId: number;
    userTermId: number;
}

export const addCourseToTerm =  async (addCourseToTermReq: AddCourseToTermReq) => {
    console.log("addCourseToTermReq:", addCourseToTermReq);
    try { 
        const newUserCourse = await prisma.userCourse.create({
            data: {
              courseId: addCourseToTermReq.courseId,
              color: 3,
              userTermId: addCourseToTermReq.userTermId,
            }
          })
        console.log("Created UserCourse:", newUserCourse);
        const updatedTerm = await prisma.userTerm.update({
            where: {
                id: addCourseToTermReq.userTermId
            },
            data: {
                courseList: {
                    connect: { id: newUserCourse.id }, // Connect the newly created UserCourse
                },
            },
            include: {  // Use include to return the connected `courseList`
                courseList: true,  // Include the courseList field
            },
        })
        console.log("Updated UserTerm:", updatedTerm);
        return updatedTerm

    } catch (error) {
        console.error("Error adding to course to draft:", error);  // Log error message
        throw error;
    }
}