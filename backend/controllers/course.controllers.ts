import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const getSearchResults = async (distribs: string[], worldCulture: string[], textQuery?: string) => {
    const whereClause: Prisma.CourseWhereInput = {
        AND: [
            textQuery
                ? {
                    OR: [
                        { code: { contains: textQuery, mode: 'insensitive' } },
                        { courseName: { contains: textQuery, mode: 'insensitive' } },
                    ],
                }
                : undefined,
            distribs.length > 0 ? { distribs: { some: { distrib: { in: distribs } } } } : undefined,
            worldCulture.length > 0 ? { worldCulture: { some: { worldCulture: { in: worldCulture } } } } : undefined,
        ].filter(Boolean),  // Ensures no undefined entries
    };

    console.log("Search parameters:", { distribs, worldCulture, textQuery });
    console.log("Constructed whereClause:", whereClause);

    try {
        const courseSearchResults = await prisma.course.findMany({ where: whereClause });
        const profSearchResults = textQuery
            ? await prisma.professor.findMany({
                where: { professorName: { contains: textQuery, mode: 'insensitive' } },
            })
            : [];

        return { courses: courseSearchResults, professors: profSearchResults };
    } catch (error) {
        console.error("Error in getSearchResults:", error);
        throw new Error("Failed to fetch search results.");
    }
};

export const getCourseDetail = async (courseId: string) => {
    try {
        const courseDetail = await prisma.course.findUnique({
            where: { id: parseInt(courseId) },
            include: {
                professors: true,
                terms: true,
                reviews: true,
                prerequisites: { include: { prerequisite: true } },
                gradeStats: true,
                requirementGroups: true, // Include requirement groups if necessary
                distribs: {
                    select: { distrib: true } // Select only the distrib name
                },
                worldCulture: {
                    select: { worldCulture: true } // Select only the world culture name
                },
            },
        });

        if (!courseDetail) throw new Error(`Course with ID ${courseId} not found.`);
        return courseDetail;
    } catch (error) {
        console.error("Error retrieving course details:", error);
        throw error;
    }
};

export const getPrerequisitesForCourse = async (courseId: string) => {
    try {
        const courseWithPrereqs = await prisma.coursePrerequisite.findMany({
            where: { 
                courseId: parseInt(courseId)
            },
            include: {
                prerequisite: true // This will get the actual prerequisite course details
            }
        });
        
        return courseWithPrereqs.map(prereq => prereq.prerequisite);
    } catch (error) {
        console.error("Error retrieving course details:", error);
        throw error;
    }
};

export const getTerm = async (termId: string) => {
    try {
        const termData = await prisma.term.findUnique({
            where: { id: parseInt(termId) },
            include: {
                courses: true,
                gradeStats: true,
            },
        });
        return termData;
    } catch (error) {
        console.error("Error retrieving term data:", error);
        throw error;
    }
};