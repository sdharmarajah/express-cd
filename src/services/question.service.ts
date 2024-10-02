import { Question } from "@prisma/client";
import prisma from "../client";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError";

/**
 * Query for questions
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<Question[]>}
 */
const queryQuestions = async (
  filter: any,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: "asc" | "desc";
  }
): Promise<Question[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? "desc";    
  const questions = await prisma.question.findMany({
    where: {
      rejected: filter.rejected == "true" ? true : false,
      quiz_id: filter.quiz_id == 0 ? null : filter.quiz_id,
    },
  });
  return questions;
};

/**
 * Get question by id
 * @param {ObjectId} id
 * @returns {Promise<Question | null>}
 * */
const getQuestionById = async (id: number): Promise<Question | null> => {
  return prisma.question.findUnique({
    where: { id },
  });
};


const updateQuestion = async (questionId: number, data: any) => {
  const question = await prisma.question.update({
    where: { id: questionId },
    data,
  });
  return question;
};

export default {
  queryQuestions,
  getQuestionById,
  updateQuestion
};
