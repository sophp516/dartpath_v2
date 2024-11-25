import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Review from "../../components/Review/Review";
import Navbar from "../../components/Navbar/Navbar";
import { CourseModel, ReviewModel } from "../../models/db.interface";

interface LocationState {
    profId?: string;
    professorName?: string;
}

const ProfDetail = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { profId, professorName } = (location.state as LocationState) || {};
    const [courses, setCourses] = useState<CourseModel[]>()
    const [reviews, setReviews] = useState<ReviewModel[]>();

    const handleNavigateToCourseDetail = (courseId: string) => {
        navigate('coursedetail', {
            state: {
                courseId
            }
        })
    }

    useEffect(() => {
        if (!profId) return

        const fetchTeachingHistory = async () => {
            try {
                const response = await fetch(`/api/prof/courses?profId=${profId}`);
                if (!response.ok) throw new Error("Failed to fetch course details");

                const courseData = await response.json();
                setCourses(courseData)
            } catch (error) {
                console.error("Error fetching course details:", error);
            }
        }
        fetchTeachingHistory();
    }, [])

    useEffect(() => {
        if (!profId) return

        const fetchProfReview = async () => {
            try {
                const response = await fetch(`/api/prof/reviews?profId=${profId}`);
                if (!response.ok) throw new Error("Failed to fetch course details");

                const reviewData = await response.json();
                setReviews(reviewData)
            } catch (error) {
                console.error("Error fetching course details:", error);
            }
        }
        fetchProfReview();
    }, [])

    return (
        <div>
            <Navbar />
            <h2>{professorName}</h2>
            <div>
                <h2>Courses</h2>
                {courses && courses.length > 0 ?
                courses.map((course) => {
                    return (
                        <div key={course.id} onClick={() => handleNavigateToCourseDetail(course.id)}>{`${course.code}: ${course.courseName}`}</div>
                    )
                })
                : <p>No course information</p>}
            </div>
            <div>
                <h2>Reviews</h2>
                {reviews && reviews.length > 0 ?
                reviews.map((review) => {
                    return (
                        <Review 
                            key={review.id}
                            review={review}/>
                    )
                })
                : <p>No course information</p>}
            </div>
        </div>
    )
}

export default ProfDetail
