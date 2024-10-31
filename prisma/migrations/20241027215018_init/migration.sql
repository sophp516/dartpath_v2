-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userName" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
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
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "distrib" TEXT[],
    "worldCulture" TEXT[],

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
CREATE TABLE "_CourseToProfessor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CourseTerms" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

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

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursePrerequisite" ADD CONSTRAINT "CoursePrerequisite_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursePrerequisite" ADD CONSTRAINT "CoursePrerequisite_prerequisiteId_fkey" FOREIGN KEY ("prerequisiteId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseGradeStat" ADD CONSTRAINT "CourseGradeStat_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseGradeStat" ADD CONSTRAINT "CourseGradeStat_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToProfessor" ADD CONSTRAINT "_CourseToProfessor_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToProfessor" ADD CONSTRAINT "_CourseToProfessor_B_fkey" FOREIGN KEY ("B") REFERENCES "Professor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseTerms" ADD CONSTRAINT "_CourseTerms_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseTerms" ADD CONSTRAINT "_CourseTerms_B_fkey" FOREIGN KEY ("B") REFERENCES "Term"("id") ON DELETE CASCADE ON UPDATE CASCADE;
