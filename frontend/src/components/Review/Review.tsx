import React from 'react';

interface ReviewProps {
    review: {
        id: number;
        content: string;
        courseId: number;
        grade?: string;
        rating: number;
        termId: number;
        userId: number;
    };
}

const Review: React.FC<ReviewProps> = ({ review }) => {
    return (
        <div>
            <p>{review.content}</p>
            <p>Grade: {review.grade}</p>
            <p>Rating: {review.rating}</p>
            <p>Term ID: {review.termId}</p>
        </div>
    );
};

export default Review;