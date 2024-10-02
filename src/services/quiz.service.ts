import { Quiz } from "@prisma/client";
import prisma from "../client";

/**
 * Query for quizes
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<Quiz[]>}
 */
const queryQuizes = async (
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: "asc" | "desc";
  }
): Promise<Quiz[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? "desc";
  const quizes = await prisma.quiz.findMany({
    include: { questions: true },
  });
  return quizes;
};

/**
 * Get question by id
 * @param {ObjectId} id
 * @returns {Promise<Question | null>}
 * */
const getQuizById = async (id: number): Promise<Quiz | null> => {
  return prisma.quiz.findUnique({
    where: { id },
    include: { questions: true },
  });
};

const createQuiz = async (data: any): Promise<Quiz> => {
  return prisma.quiz.create({
    data,
  });
};

export default {
  queryQuizes,
  getQuizById,
  createQuiz,
};
