export interface CourseModel {
    id: number;                // Change to number as per Prisma model
    code: string;
    courseName: string;
    description: string;
    distrib: string[];
    worldCulture: string[];
    reviews: ReviewModel[];
    professors: ProfessorModel[];
    gradeStats: CourseGradeStatModel[];          // Include grade stats
    prerequisites: CoursePrerequisiteModel[];    // Include prerequisites
}

export interface ReviewModel {
    id: number;              
    userId: number;        
    courseId: number;     
    content: string;       
    rating: number;        
    grade?: string;    
    termId: number;       
}

export interface ProfessorModel {
    id: string,
    professorName: string,
}

export interface CourseGradeStatModel {
    id: number;
    courseId: number;
    termId: number;
    medianGrade: number;
}

export interface CoursePrerequisiteModel {
    courseId: number;         
    prerequisiteId: number;    
}
