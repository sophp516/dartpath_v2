import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Review from "../../components/Review/Review";

interface LocationState {
    courseId?: string;
}

interface CourseGradeStat {
    id: number;
    courseId: number;
    termId: number;
    medianGrade: number;
}

interface CoursePrerequisite {
    courseId: number;         
    prerequisiteId: number;    
}

interface Review {
    id: number;              
    userId: number;        
    courseId: number;     
    content: string;       
    rating: number;        
    grade?: string;    
    termId: number;       
}

interface Professor {
    id: string,
    professorName: string,
}

interface Course {
    id: number;                // Change to number as per Prisma model
    code: string;
    courseName: string;
    description: string;
    distrib: string[];
    worldCulture: string[];
    reviews: Review[];
    professors: Professor[];
    gradeStats: CourseGradeStat[];          // Include grade stats
    prerequisites: CoursePrerequisite[];    // Include prerequisites
}

const CourseDetail = () => {
    const location = useLocation();
    const { courseId } = (location.state as LocationState) || {};
    const [course, setCourse] = useState<Course | null>(null);
    const [prereqs, setPrereqs] = useState<Course[] | []>();
    console.log(course);

    useEffect(() => {
        if (!courseId) return;

        const fetchCourseDetail = async () => {
            try {
                const response = await fetch(`/api/course/fetch?courseId=${courseId}`);
                if (!response.ok) throw new Error("Failed to fetch course details");

                const courseData = await response.json();
                setCourse(courseData);
            } catch (error) {
                console.error("Error fetching course details:", error);
            }
        };

        fetchCourseDetail();
    }, [courseId]);

    useEffect(() => {
        if (!courseId) return;

        const fetchPrereqs = async () => {
            try {
                const response = await fetch(`/api/course/prereq?courseId=${courseId}`);
                if (!response.ok) throw new Error("Failed to fetch course details");

                const prereqsData = await response.json();
                setPrereqs(prereqsData);
            } catch (error) {
                console.error("Error fetching course prereqs:", error);
            }
        }
        fetchPrereqs();
    }, [])

    return (
        <div>
            <div>
                <h2>{`${course?.code}: ${course?.courseName}`}</h2>
                <p>{course?.description}</p>
                <p>Distribution Areas: {course?.distrib.length > 0 ? course?.distrib.join(", ").toUpperCase() : "N/A"}</p>
                    <p>World Culture: {course?.worldCulture.length > 0 ? course?.worldCulture.join(", ").toUpperCase() : "N/A"}</p>
                    <h2>Grade Stats</h2>
                    {course?.gradeStats.map(stat => (
                        <div key={stat.id}>
                            <p>Term ID: {stat.termId}</p>
                            <p>Median Grade: {stat.medianGrade}</p>
                        </div>
                    ))}
                    <h2>Prerequisites</h2>
                    {prereqs && prereqs.length > 0 ? (
                        prereqs
                            .filter(prereq => prereq.id !== course?.id)  // Filter out self-references
                            .map(prereq => (
                                <p key={prereq.id}>
                                    {prereq.code}: {prereq.courseName}
                                </p>
                            ))
                    ) : (
                        <p>No prerequisites</p>
                    )}
            </div>
            <div>
                <div>
                <h2>Professors</h2>
                {course?.professors.map((professor) => {
                    return <p>{professor.professorName}</p>
                })}
                </div>
                <h2>Reviews</h2>
                {course?.reviews.map((review) => {
                    return <Review 
                                key={review.id}
                                review={review}
                                />
                })}
            </div>
        </div>
    )
}

export default CourseDetail;
