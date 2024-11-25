import React, { useState, useEffect } from "react";
import { useDrop } from 'react-dnd';
import { UserTermModel, UserCourseModel } from "../../models/user.interface";
import Course from "../Course/Course";
import { CourseModel } from "../../models/db.interface";

interface TermProps {
    term: UserTermModel;
    termIndex: number;
    setTermList: React.Dispatch<React.SetStateAction<UserTermModel[]>>;
}

const Term: React.FC<TermProps> = ({ term, termIndex, setTermList }) => {
    const { onOffStatus, courseList, comment, id: termId } = term;  // Initialize courseList as empty array
    const [courseInput, setCourseInput] = useState('')
    const [courseMatches, setCourseMatches] = useState<CourseModel[]>()
    const [courseId, setCourseId] = useState()

    useEffect(() => {
        // Do not fetch if the input is empty
        if (!courseInput) {
            setCourseMatches([]);  // Clear previous matches when input is empty
            return;
        }

        // Set up debouncing for the input
        const timer = setTimeout(() => {
            fetchCourseMatch();
        }, 500); // Delay in ms before the fetch is triggered

        // Clean up the previous timer on every input change to avoid unnecessary API calls
        return () => clearTimeout(timer);
    }, [courseInput]);


    const [{ isOver }, drop] = useDrop({
        accept: 'COURSE',
        drop: (draggedItem: { course: UserCourseModel, initialTerm: number }) => {
            console.log("Dropping course:", draggedItem.course, "into term index:", termIndex);

            // Prevent drop if it's in the same term
            if (draggedItem.initialTerm === termIndex) return;

            const newCourseList = [...courseList, draggedItem.course];

            // Update term list by moving course to target term
            setTermList((prevTerms) => {
                const updatedTerms = [...prevTerms];

                // Remove course from its initial term
                const initialTerm = updatedTerms[draggedItem.initialTerm];
                initialTerm.courseList = initialTerm.courseList.filter(
                    (course) => course.id !== draggedItem.course.id
                );

                // Add course to the target term
                updatedTerms[termIndex].courseList = newCourseList;

                return updatedTerms;
            });
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    const handleAddCourse = async () => {
        if (!courseId) return;
        try {
            const response = await fetch(`/api/profile/terms/${termId}?courseId=${courseId}`, {
                method: 'PUT',  // Specify the method as PUT
                headers: {
                    'Content-Type': 'application/json',  // Specify the content type (if you're sending JSON)
                },
                body: JSON.stringify({ termId })  // Send data in the request body
            });

            if (response.ok) {
                const updatedTerm = await response.json();
                console.log(updatedTerm);
            } else {
                console.error(`Failed to update term: ${response.status}`);
            }

        } catch (error) {
            console.log(error)
        }
    }

    const fetchCourseMatch = async () => {
        if (!courseInput) {
            setCourseMatches([]);
            return;
        }

        try {
            const response = await fetch(`/api/course/search?textQuery=${courseInput}`);
            
            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Received search results:", data);
            setCourseMatches(data.courses)

        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    }

    const handleCourseClick = (courseCode: string, courseId) => {
        setCourseInput(courseCode)
        setCourseId(courseId)
    }

    return (
        <div
            ref={drop}
            className="term"
            style={{ backgroundColor: isOver ? '#e0e0e0' : '' }}
        >   
            {courseList?.length == 0 && <p>add a course</p>}
            {!onOffStatus ? (
                courseList?.map((course) => {
                    return <Course key={course.id} course={course.course} initialTerm={termIndex} />
                })
            ) : (
                <div>{comment}</div>
            )}
            <div className="flex flex-row">
                <div className="flex flex-col">
                <input type="text" value={courseInput} placeholder="enter class name/code" onChange={(event) => setCourseInput(event.target.value)}></input>
                {courseInput && (
                    courseMatches?.length == 0 ?
                    <p>No matching courses</p>
                    : courseMatches?.map((course) => {
                        return (
                            <div onClick={() => handleCourseClick(course.code, course.id)} key={course.id}>{course.code}</div>
                        )
                    })
                )}
                </div>
                <button onClick={handleAddCourse}>+</button>
            </div>
        </div>
    );
};

export default Term;