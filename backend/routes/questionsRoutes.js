import express from 'express';
import { getQuestions } from '../controllers/questionsController.js';

const questionsRouter = express.Router();

questionsRouter.get('/', getQuestions);

export default questionsRouter;