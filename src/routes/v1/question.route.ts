import express from 'express';
import auth from '../../middlewares/auth';
// import validate from '../../middlewares/validate';
// import { userValidation } from '../../validations';
import { questionController } from '../../controllers';

const router = express.Router();

router.route('/').get(auth('getQuestions'), questionController.getQuestions);

router
  .route('/:questionId')
  .get(auth('getQuestion'), questionController.getQuestion);


router.route('/:questionId').put(auth('updateQuestion'), questionController.updateQuestion);

export default router;