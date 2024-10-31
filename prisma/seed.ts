import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const alice = await prisma.user.upsert({
    where: { email: 'alice@dartmouth.edu' },
    update: {},
    create: {
      email: 'alice@dartmouth.edu',
      password: 'securepassword123',
      userName: 'alice123',
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@dartmouth.edu' },
    update: {},
    create: {
      email: 'bob@dartmouth.edu',
      password: 'securepassword123',
      userName: 'bob456',
    },
  });

  // Seed Terms
  const F23 = await prisma.term.upsert({
    where: { name: 'F23' },
    update: {},
    create: {
      name: 'F23',
    },
  });

  const S24 = await prisma.term.upsert({
    where: { name: 'S24' },
    update: {},
    create: {
      name: 'S24',
    },
  });

  // Seed Professors
  const profSmith = await prisma.professor.upsert({
    where: { professorName: 'Dr. Smith' },
    update: {},
    create: {
      professorName: 'Dr. Smith',
    },
  });

  const profJohnson = await prisma.professor.upsert({
    where: { professorName: 'Dr. Johnson' },
    update: {},
    create: {
      professorName: 'Dr. Johnson',
    },
  });

  // Seed Courses
  const COSC001 = await prisma.course.upsert({
    where: { code: 'COSC001' },
    update: {},
    create: {
      code: 'COSC001',
      courseName: 'Introduction to Programming and Computation',
      description: 'This course introduces computational concepts that are fundamental to computer science and are useful for the sciences, social sciences, engineering, and digital arts. Students will write their own interactive programs to analyze data, process text, draw graphics, manipulate images, and simulate physical systems. Problem decomposition, program efficiency, and good programming style are emphasized throughout the course. No prior programming experience is assumed.',
      distrib: ['SCI'],
      worldCulture: ['NW'],
      professors: {
        connect: [{ id: profSmith.id }],
      },
      terms: {
        connect: [{ id: F23.id }],
      },
    },
  });

  const COSC010 = await prisma.course.upsert({
    where: { code: 'COSC010' },
    update: {},
    create: {
      code: 'COSC010',
      courseName: 'Problem Solving via Object-Oriented Programming',
      description: 'Motivated by problems that arise in a variety of disciplines, this course examines concepts and develops skills in solving computational problems. Topics covered include abstraction (how to hide details), modularity (how to decompose problems), data structures (how to efficiently organize data), and algorithms (procedures for solving problems). Laboratory assignments are implemented using object-oriented programming techniques.',
      distrib: ['tla'],
      worldCulture: [],
      professors: {
        connect: [{ id: profJohnson.id }],
      },
      terms: {
        connect: [{ id: S24.id }],
      },
    },
  });

  // Seed Course Prerequisites
  await prisma.coursePrerequisite.upsert({
    where: {
      courseId_prerequisiteId: {
        courseId: COSC010.id,
        prerequisiteId: COSC001.id,
      },
    },
    update: {},
    create: {
      courseId: COSC010.id,
      prerequisiteId: COSC001.id, // Ensure this is the correct prerequisite
    },
});

  // Seed Reviews
  const review1 = await prisma.review.create({
    data: {
      userId: alice.id,
      courseId: COSC001.id,
      professorId: profSmith.id,
      content: 'Great introduction to calculus!',
      rating: 5,
      grade: 'A',
      termId: F23.id,
    },
  });

  const review2 = await prisma.review.create({
    data: {
      userId: bob.id,
      courseId: COSC010.id,
      professorId: profJohnson.id,
      content: 'Engaging lectures and insightful readings.',
      rating: 4,
      grade: 'B+',
      termId: S24.id,
    },
  });

  // Seed Course Grade Stats
  await prisma.courseGradeStat.upsert({
    where: {
        courseId_termId: {
            courseId: COSC001.id,
            termId: F23.id,
        },
    },
    update: {},
    create: {
        courseId: COSC001.id,
        termId: F23.id,
        medianGrade: 4.8, // e.g., A-
    },
});

await prisma.courseGradeStat.upsert({
    where: {
        courseId_termId: {
            courseId: COSC010.id,
            termId: S24.id,
        },
    },
    update: {},
    create: {
        courseId: COSC010.id,
        termId: S24.id,
        medianGrade: 3.2, // e.g., B+
    },
});

  console.log({ alice, bob, F23, S24, profSmith, profJohnson, COSC001, COSC010, review1, review2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
