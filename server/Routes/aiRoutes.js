import express from 'express'
import protect from '../Middleware/authMiddleware.js';
import { ehanceProfessionalSummary, enhanceJobDescription, uploadResume } from '../Controllers/aiController.js';

const aiRouter = express.Router();

aiRouter.post('/enhance-pro-sum',protect, ehanceProfessionalSummary);
aiRouter.post('/enhance-job-desc',protect, enhanceJobDescription);
aiRouter.post('/upload-resume',protect, uploadResume);


export default aiRouter;