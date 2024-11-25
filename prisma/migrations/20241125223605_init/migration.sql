-- CreateEnum
CREATE TYPE "RequirementType" AS ENUM ('MANDATORY', 'RANGE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "mainDraftId" INTEGER NOT NULL,
    "color0" TEXT NOT NULL,
    "color1" TEXT NOT NULL,
    "color2" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Major" (
    "id" SERIAL NOT NULL,
    "majorName" TEXT NOT NULL,

    CONSTRAINT "Major_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Minor" (
    "id" SERIAL NOT NULL,
    "minorName" TEXT NOT NULL,

    CONSTRAINT "Minor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMajor" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "majorId" INTEGER NOT NULL,

    CONSTRAINT "UserMajor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMinor" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "minorId" INTEGER NOT NULL,

    CONSTRAINT "UserMinor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDraft" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "UserDraft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTerm" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "onOffStatus" BOOLEAN NOT NULL,
    "comment" TEXT NOT NULL,
    "draftId" INTEGER,

    CONSTRAINT "UserTerm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCourse" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "color" INTEGER NOT NULL,
    "userTermId" INTEGER NOT NULL,

    CONSTRAINT "UserCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "professorId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "grade" TEXT,
    "termId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professor" (
    "id" SERIAL NOT NULL,
    "professorName" TEXT NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseDistrib" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "distrib" TEXT NOT NULL,

    CONSTRAINT "CourseDistrib_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "worldCulture" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "worldCulture" TEXT NOT NULL,

    CONSTRAINT "worldCulture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoursePrerequisite" (
    "courseId" INTEGER NOT NULL,
    "prerequisiteId" INTEGER NOT NULL,

    CONSTRAINT "CoursePrerequisite_pkey" PRIMARY KEY ("courseId","prerequisiteId")
);

-- CreateTable
CREATE TABLE "Term" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Term_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseGradeStat" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "termId" INTEGER NOT NULL,
    "medianGrade" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CourseGradeStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequirementGroup" (
    "id" SERIAL NOT NULL,
    "majorId" INTEGER,
    "minorId" INTEGER,
    "name" TEXT NOT NULL,
    "type" "RequirementType" NOT NULL,
    "requiredCount" INTEGER NOT NULL,
    "codeStart" INTEGER,
    "codeEnd" INTEGER,
    "department" TEXT,
    "description" TEXT NOT NULL,

    CONSTRAINT "RequirementGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CourseToProfessor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CourseTerms" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CourseRequirements" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserMajor_userId_majorId_key" ON "UserMajor"("userId", "majorId");

-- CreateIndex
CREATE UNIQUE INDEX "UserMinor_userId_minorId_key" ON "UserMinor"("userId", "minorId");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_professorName_key" ON "Professor"("professorName");

-- CreateIndex
CREATE UNIQUE INDEX "Course_code_key" ON "Course"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Term_name_key" ON "Term"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CourseGradeStat_courseId_termId_key" ON "CourseGradeStat"("courseId", "termId");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToProfessor_AB_unique" ON "_CourseToProfessor"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToProfessor_B_index" ON "_CourseToProfessor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseTerms_AB_unique" ON "_CourseTerms"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseTerms_B_index" ON "_CourseTerms"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseRequirements_AB_unique" ON "_CourseRequirements"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseRequirements_B_index" ON "_CourseRequirements"("B");

-- AddForeignKey
ALTER TABLE "UserMajor" ADD CONSTRAINT "UserMajor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMajor" ADD CONSTRAINT "UserMajor_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMinor" ADD CONSTRAINT "UserMinor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMinor" ADD CONSTRAINT "UserMinor_minorId_fkey" FOREIGN KEY ("minorId") REFERENCES "Minor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDraft" ADD CONSTRAINT "fk_userdraft_user" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDraft" ADD CONSTRAINT "fk_userdraft_publishedUser" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTerm" ADD CONSTRAINT "UserTerm_draftId_fkey" FOREIGN KEY ("draftId") REFERENCES "UserDraft"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourse" ADD CONSTRAINT "UserCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourse" ADD CONSTRAINT "UserCourse_userTermId_fkey" FOREIGN KEY ("userTermId") REFERENCES "UserTerm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseDistrib" ADD CONSTRAINT "CourseDistrib_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "worldCulture" ADD CONSTRAINT "worldCulture_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursePrerequisite" ADD CONSTRAINT "CoursePrerequisite_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursePrerequisite" ADD CONSTRAINT "CoursePrerequisite_prerequisiteId_fkey" FOREIGN KEY ("prerequisiteId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseGradeStat" ADD CONSTRAINT "CourseGradeStat_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseGradeStat" ADD CONSTRAINT "CourseGradeStat_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequirementGroup" ADD CONSTRAINT "RequirementGroup_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequirementGroup" ADD CONSTRAINT "RequirementGroup_minorId_fkey" FOREIGN KEY ("minorId") REFERENCES "Minor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToProfessor" ADD CONSTRAINT "_CourseToProfessor_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToProfessor" ADD CONSTRAINT "_CourseToProfessor_B_fkey" FOREIGN KEY ("B") REFERENCES "Professor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseTerms" ADD CONSTRAINT "_CourseTerms_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseTerms" ADD CONSTRAINT "_CourseTerms_B_fkey" FOREIGN KEY ("B") REFERENCES "Term"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseRequirements" ADD CONSTRAINT "_CourseRequirements_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseRequirements" ADD CONSTRAINT "_CourseRequirements_B_fkey" FOREIGN KEY ("B") REFERENCES "RequirementGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
