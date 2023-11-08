import axios from 'axios';
import { CandidateAndJobInfoDto } from './types';

const baseUrl = 'http://localhost:4089/ask';
// const baseUrl = 'https://purefitapi.procamp.dev/ask';

let isGeneratingCoverLetter = false;
export const generateCoverLetter = async (
  data: CandidateAndJobInfoDto
): Promise<any> => {
  if (isGeneratingCoverLetter) {
    return Promise.reject(new Error('A request is already in progress.'));
  }
  isGeneratingCoverLetter = true;
  try {
    const response = await axios.post(`${baseUrl}/cover-letter`, data);

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  } finally {
    isGeneratingCoverLetter = false;
  }
};

let isGeneratingSkillGapAnalysis = false;
export const generateSkillGapAnalysis = async (
  data: CandidateAndJobInfoDto
): Promise<any> => {
  if (isGeneratingSkillGapAnalysis) {
    return Promise.reject(new Error('A request is already in progress.'));
  }
  isGeneratingSkillGapAnalysis = true;
  try {
    const response = await axios.post(`${baseUrl}/skill-gap-analysis`, data);

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  } finally {
    isGeneratingSkillGapAnalysis = false;
  }
};
