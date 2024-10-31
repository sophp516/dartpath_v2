import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const fetchTeachingHistory = async (profId: string) => {
    const professorId = Number(profId);
    try {
        const courses = await prisma.course.findMany({
            where: {
                professors: {
                    some: {
                        id: professorId,
                    },
                },
            },
            select: {
                id: true,
                code: true,
                courseName: true,
                terms: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return courses;
    } catch (error) {
        console.error("Error fetching teaching history:", error);
        throw error;
    }
};

export const fetchProfReview = async (profId: string) => {
    const professorId = Number(profId);
    try {
        const reviews = await prisma.review.findMany({
            where: {
                course: {
                    professors: {
                        some: {
                            id: professorId,
                        },
                    },
                },
            },
            select: {
                id: true,
                content: true,
                rating: true,
                grade: true,
                termId: true,
                course: {
                    select: {
                        code: true,
                        courseName: true,
                    },
                },
            },
        });
        return reviews;
    } catch (error) {
        console.error("Error fetching professor reviews:", error);
        throw error;
    }
};