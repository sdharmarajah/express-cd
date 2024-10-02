import { config } from "dotenv";
config(); // Load environment variables from .env file

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const UserRoles = {
  MANAGER: 'MANAGER',
  QUIZ_CREATOR: 'QUIZ_CREATOR',
  MODERATOR: 'MODERATOR',
  SINHALA_TRANSLATOR: 'SINHALA_TRANSLATOR',
  SINHALA_TRANSLATOR_CHECKER: 'SINHALA_TRANSLATOR_CHECKER',
  TAMIL_TRANSLATOR: 'TAMIL_TRANSLATOR',
  TAMIL_TRANSLATOR_CHECKER: 'TAMIL_TRANSLATOR_CHECKER',
  ILLUSTRATOR: 'ILLUSTRATOR'
}

export const encryptPassword = async (password: string) => {
  const encryptedPassword = await bcrypt.hash(password, 8);
  return encryptedPassword;
};

const prisma = new PrismaClient();

async function main() {
  const usersData = [
    { email: "manager@example.com", name: "MANAGER", role: UserRoles.MANAGER },
    { email: "moderator@example.com", name: "MODERATOR", role: UserRoles.MODERATOR },
    { email: "quiz_creator@example.com", name: "QUIZ_CREATOR", role: UserRoles.QUIZ_CREATOR },
    { email: "si_translator@example.com", name: "SINHALA_TRANSLATOR", role: UserRoles.SINHALA_TRANSLATOR },
    { email: "si_translator_checker@example.com", name: "SINHALA_TRANSLATOR_CHECKER", role: UserRoles.SINHALA_TRANSLATOR_CHECKER },
    { email: "ta_translator@example.com", name: "TAMIL_TRANSLATOR", role: UserRoles.TAMIL_TRANSLATOR },
    { email: "ta_translator_checker@example.com", name: "TAMIL_TRANSLATOR_CHECKER", role: UserRoles.TAMIL_TRANSLATOR_CHECKER },
    { email: "illustrator@example.com", name: "ILLUSTRATOR", role: UserRoles.ILLUSTRATOR },
  ];

  // Create users
  for (const userData of usersData) {
    await prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name,
        password: await encryptPassword("password123"),
        role: userData.role,
      },
    });
  }

  // You can add token creation here if needed

  console.log("Data seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
