import { Router } from 'express';
import {
  validateBody,
  validateParams,
} from '../middlewares/validation.middleware';
import { upload } from '../middlewares/upload.middleware';
import {
  createMovieSchema,
  updateMovieSchema,
  movieIdSchema,
} from '../schemas/movie.schema';
import { createMovie, getAllMovies } from '../controllers/movies.controller';

const router = Router();

router.get('/', getAllMovies);
router.post(
  '/',
  upload.single('poster'),
  validateBody(createMovieSchema),
  createMovie,
);

export default router;
