import express from 'express';
import auth from '../../middlewares/auth';
// import validate from '../../middlewares/validate';
// import { userValidation } from '../../validations';
import { quizController } from '../../controllers';

const router = express.Router();

router.route('/').get(auth('getQuizes'), quizController.getQuizes);

router
  .route('/:quizId')
  .get(auth('getQuiz'), quizController.getQuizById);

router.route('/').post(auth('createQuiz'), quizController.createQuiz);

export default router;