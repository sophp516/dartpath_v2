import { CourseModel } from "./db.interface";

export interface UserModel {
    id: number;
    email: string;
    password: string;
    majorId: number;
    minorId: number;
    mainDraftId: number;
    draftId: number[];
    PublishedDraftId: number;
    color0: string;
    color1: string;
    color2: string;
}

export interface UserCourseModel {
    id: number;
    userId: number;
    courseInfo: CourseModel;
    color: number;
}

export interface UserTermModel {
    id: number;
    userId: number;
    comment: string;
    onOffStatus: boolean;
    courseList: UserCourseModel[];
}

export interface UserDraftModel {
    id: number;
    title: string;
    termList: UserTermModel[];
}