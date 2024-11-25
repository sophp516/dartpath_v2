import React from "react";
import { useDrag } from "react-dnd";
import { UserCourseModel } from "../../models/user.interface";

interface CourseItemProps {
    course: UserCourseModel;
    initialTerm: number;
}

const Course: React.FC<CourseItemProps> = ({ course, initialTerm }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'COURSE',
        item: { course, initialTerm: initialTerm },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                padding: '5px',
                backgroundColor: '#f9f9f9',
                border: '1px solid #ddd',
                cursor: 'move'
            }}
        >
            {course.code}
        </div>
    );
};

export default Course;