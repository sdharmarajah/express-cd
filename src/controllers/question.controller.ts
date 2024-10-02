import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { questionService } from '../services';

const getQuestions = catchAsync(async (req, res) => {  
  const filter = pick(req.query.filter as {}, ['rejected', 'quiz_id']);  
  const options = pick(req.query, ['sortBy', 'limit', 'page']);  
  const result = await questionService.queryQuestions(filter, options);
  res.send(result);
});

const getQuestion = catchAsync(async (req, res) => {
  const question = await questionService.getQuestionById(parseInt(req.params.questionId));
  if (!question) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
  }
  res.send(question);
});


const updateQuestion = catchAsync(async (req, res) => {
  const question = await questionService.updateQuestion(parseInt(req.params.questionId), req.body);
  res.send(question);
});

export default {
    getQuestions,
    getQuestion,
    updateQuestion
};
