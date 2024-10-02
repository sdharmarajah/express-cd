import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import quizService from '../services/quiz.service';

const getQuizes = catchAsync(async (req, res) => {  
  const filter = pick(req.query, ['title']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await quizService.queryQuizes(filter, options);  
  res.send(result);
});

const getQuizById = catchAsync(async (req, res) => {
  const quiz = await quizService.getQuizById(parseInt(req.params.quizId));
  if (!quiz) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Quiz not found');
  }
  res.send(quiz);
});

const createQuiz = catchAsync(async (req, res) => {
  const quiz = await quizService.createQuiz(req.body);
  res.status(httpStatus.CREATED).send(quiz);
});

export default {
    getQuizes,
    getQuizById,
    createQuiz,
};
