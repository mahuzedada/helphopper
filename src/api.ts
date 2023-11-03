import axios from 'axios';
import { CandidateAndJobInfoDto } from './types';

let isGeneratingCoverLetter = false;
export const generateCoverLetter = async (
  data: CandidateAndJobInfoDto
): Promise<any> => {
  if (isGeneratingCoverLetter) {
    return Promise.reject(
      new Error('Cover letter generation is already in progress.')
    );
  }
  isGeneratingCoverLetter = true;
  try {
    const response = await axios.post(
      // "https://purefitapi.procamp.dev/ask/cover-letter",
      'http://localhost:4089/ask/cover-letter',
      data
    );

    return response.data;
  } catch (error) {
    console.error('Error sending diet plan data:', error);
  } finally {
    isGeneratingCoverLetter = false;
  }
};

let isGeneratingSkillGapAnalysis = false;
export const generateSkillGapAnalysis = async (
  data: CandidateAndJobInfoDto
): Promise<any> => {
  if (isGeneratingSkillGapAnalysis) {
    return Promise.reject(
      new Error('Cover letter generation is already in progress.')
    );
  }
  isGeneratingSkillGapAnalysis = true;
  try {
    const response = await axios.post(
      // "https://purefitapi.procamp.dev/ask/cover-letter",
      'http://localhost:4089/ask/skill-gap',
      data
    );

    return response.data;
  } catch (error) {
    console.error('Error sending diet plan data:', error);
  } finally {
    isGeneratingSkillGapAnalysis = false;
  }
};
