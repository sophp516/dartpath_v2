import { PrismaClient, RequirementType } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Clean the database
  await prisma.$transaction([
    prisma.userCourse.deleteMany(),
    prisma.userTerm.deleteMany(),
    prisma.userDraft.deleteMany(),
    prisma.review.deleteMany(),
    prisma.courseGradeStat.deleteMany(),
    prisma.coursePrerequisite.deleteMany(),
    prisma.courseDistrib.deleteMany(),
    prisma.worldCulture.deleteMany(),
    
    // Then delete junction tables
    prisma.userMajor.deleteMany(),
    prisma.userMinor.deleteMany(),
    
    // Finally delete main tables
    prisma.user.deleteMany(),
    prisma.course.deleteMany(),
    prisma.professor.deleteMany(),
    prisma.term.deleteMany(),
    prisma.major.deleteMany(),
    prisma.minor.deleteMany(),
    prisma.requirementGroup.deleteMany(),
  ])

  // Create Terms
  const terms = await Promise.all([
    prisma.term.create({ data: { name: '23F' } }),
    prisma.term.create({ data: { name: '24W' } }),
    prisma.term.create({ data: { name: '24S' } }),
  ])

  // Create Professors
  const professors = await Promise.all([
    prisma.professor.create({ data: { professorName: 'David Kotz' } }),
    prisma.professor.create({ data: { professorName: 'Deeparnab Chakrabarty' } }),
    prisma.professor.create({ data: { professorName: 'Prasad Jayanti' } }),
  ])

  // Create Courses
  const courses = await Promise.all([
    prisma.course.create({
      data: {
        code: 'COSC 1',
        courseName: 'Introduction to Programming',
        description: 'Learn basics of programming with Python',
        professors: { connect: [{ id: professors[0].id }] },
        terms: { connect: [{ id: terms[0].id }] },
        distribs: {
          create: [{ distrib: 'TLA' }]
        },
        worldCulture: {
          create: [{ worldCulture: 'NW' }]
        }
      }
    }),
    prisma.course.create({
      data: {
        code: 'COSC 10',
        courseName: 'Problem Solving via Object-Oriented Programming',
        description: 'Learn OOP concepts with Java',
        professors: { connect: [{ id: professors[1].id }] },
        terms: { connect: [{ id: terms[1].id }] },
        distribs: {
          create: [{ distrib: 'TAS' }]
        }
      }
    }),
    prisma.course.create({
      data: {
        code: 'COSC 50',
        courseName: 'Software Design and Implementation',
        description: 'Learn software engineering principles',
        professors: { connect: [{ id: professors[2].id }] },
        terms: { connect: [{ id: terms[2].id }] },
        distribs: {
          create: [{ distrib: 'TAS' }]
        }
      }
    })
  ])

  // Create Prerequisites
  await prisma.coursePrerequisite.create({
    data: {
      courseId: courses[2].id,
      prerequisiteId: courses[1].id,
    }
  })

  // Create Course Grade Stats
  await Promise.all([
    prisma.courseGradeStat.create({
      data: {
        courseId: courses[0].id,
        termId: terms[0].id,
        medianGrade: 3.7
      }
    }),
    prisma.courseGradeStat.create({
      data: {
        courseId: courses[1].id,
        termId: terms[1].id,
        medianGrade: 3.5
      }
    }),
    prisma.courseGradeStat.create({
      data: {
        courseId: courses[2].id,
        termId: terms[2].id,
        medianGrade: 3.3
      }
    })
  ])

  // Create Majors
  const majors = await Promise.all([
    prisma.major.create({ data: { majorName: 'Computer Science' } }),
    prisma.major.create({ data: { majorName: 'Digital Arts' } }),
    prisma.major.create({ data: { majorName: 'Engineering Sciences' } })
  ])

  // Create Minors
  const minors = await Promise.all([
    prisma.minor.create({ data: { minorName: 'Human-Centered Design' } }),
    prisma.minor.create({ data: { minorName: 'Digital Arts' } }),
    prisma.minor.create({ data: { minorName: 'Computer Science' } })
  ])

  // Create Requirement Groups
  const reqGroups = await Promise.all([
    prisma.requirementGroup.create({
      data: {
        majorId: majors[0].id,
        name: 'Introductory Courses',
        type: RequirementType.MANDATORY,
        requiredCount: 2,
        codeStart: 1,
        codeEnd: 10,
        department: 'COSC',
        description: 'Required introductory computer science courses',
        courses: { connect: [{ id: courses[0].id }, { id: courses[1].id }] }
      }
    }),
    prisma.requirementGroup.create({
      data: {
        minorId: minors[2].id,
        name: 'Core Courses',
        type: RequirementType.RANGE,
        requiredCount: 3,
        codeStart: 30,
        codeEnd: 50,
        department: 'COSC',
        description: 'Upper-level computer science courses',
        courses: { connect: [{ id: courses[2].id }] }
      }
    }),
    prisma.requirementGroup.create({
      data: {
        majorId: majors[1].id,
        name: 'Foundation Courses',
        type: RequirementType.MANDATORY,
        requiredCount: 1,
        department: 'DART',
        description: 'Required foundation courses for Digital Arts',
      }
    })
  ])

  // Create Users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'john.doe@dartmouth.edu',
        password: 'hashed_password_1',
        userName: 'johndoe',
        color0: '#FF0000',
        color1: '#00FF00',
        color2: '#0000FF',
        mainDraftId: 1
      }
    }),
    prisma.user.create({
      data: {
        email: 'jane.smith@dartmouth.edu',
        password: 'hashed_password_2',
        userName: 'janesmith',
        color0: '#FF00FF',
        color1: '#FFFF00',
        color2: '#00FFFF',
        mainDraftId: 2
      }
    }),
    prisma.user.create({
      data: {
        email: 'bob.wilson@dartmouth.edu',
        password: 'hashed_password_3',
        userName: 'bobwilson',
        color0: '#800000',
        color1: '#008000',
        color2: '#000080',
        mainDraftId: 3
      }
    })
  ])

  // Create User Majors
  await Promise.all([
    prisma.userMajor.create({
      data: {
        userId: users[0].id,
        majorId: majors[0].id,
      }
    }),
    prisma.userMajor.create({
      data: {
        userId: users[1].id,
        majorId: majors[1].id,
      }
    }),
    prisma.userMajor.create({
      data: {
        userId: users[2].id,
        majorId: majors[2].id,
      }
    })
  ])

  // Create User Minors
  await Promise.all([
    prisma.userMinor.create({
      data: {
        userId: users[0].id,
        minorId: minors[0].id,
      }
    }),
    prisma.userMinor.create({
      data: {
        userId: users[1].id,
        minorId: minors[1].id,
      }
    }),
    prisma.userMinor.create({
      data: {
        userId: users[2].id,
        minorId: minors[2].id,
      }
    })
  ])

  // Create User Drafts
  const drafts = await Promise.all([
    prisma.userDraft.create({
      data: {
        userId: users[0].id,
        title: "Fall 2023 Plan",
      }
    }),
    prisma.userDraft.create({
      data: {
        userId: users[1].id,
        title: "Winter 2024 Plan",
      }
    }),
    prisma.userDraft.create({
      data: {
        userId: users[2].id,
        title: "Spring 2024 Plan",
      }
    })
  ])

  // Create User Terms
  const userTerms = await Promise.all([
    prisma.userTerm.create({
      data: {
        userId: drafts[0].id,
        onOffStatus: true,
        comment: "Taking a full course load",
      }
    }),
    prisma.userTerm.create({
      data: {
        userId: drafts[1].id,
        onOffStatus: true,
        comment: "Study abroad term",
      }
    }),
    prisma.userTerm.create({
      data: {
        userId: drafts[2].id,
        onOffStatus: false,
        comment: "Off term",
      }
    })
  ])

  // Create User Courses
  await Promise.all([
    prisma.userCourse.create({
      data: {
        courseId: courses[0].id,
        color: 1,
        userTermId: userTerms[0].id,
      }
    }),
    prisma.userCourse.create({
      data: {
        courseId: courses[1].id,
        color: 2,
        userTermId: userTerms[1].id,
      }
    }),
    prisma.userCourse.create({
      data: {
        courseId: courses[2].id,
        color: 3,
        userTermId: userTerms[2].id,
      }
    })
  ])

  // Create Reviews
  await Promise.all([
    prisma.review.create({
      data: {
        userId: users[0].id,
        courseId: courses[0].id,
        professorId: professors[0].id,
        content: "Great introductory course!",
        rating: 5,
        grade: "A",
        termId: terms[0].id,
      }
    }),
    prisma.review.create({
      data: {
        userId: users[1].id,
        courseId: courses[1].id,
        professorId: professors[1].id,
        content: "Challenging but rewarding",
        rating: 4,
        grade: "B+",
        termId: terms[1].id,
      }
    }),
    prisma.review.create({
      data: {
        userId: users[2].id,
        courseId: courses[2].id,
        professorId: professors[2].id,
        content: "Excellent project-based learning",
        rating: 5,
        grade: "A-",
        termId: terms[2].id,
      }
    })
  ])
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })