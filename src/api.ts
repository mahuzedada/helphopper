import axios from 'axios';
import { CandidateAndJobInfoDto } from './types';

export const generateCoverLetter = async (
  data: CandidateAndJobInfoDto
): Promise<any> => {
  try {
    const response = await axios.post(
      // "https://purefitapi.procamp.dev/ask/cover-letter",
      'http://localhost:4089/ask/cover-letter',
      data
    );

    return response.data;
  } catch (error) {
    console.error('Error sending diet plan data:', error);
  }
};
export const generateSkillGapAnalysis = async (
  data: CandidateAndJobInfoDto
): Promise<any> => {
  try {
    const response = await axios.post(
      // "https://purefitapi.procamp.dev/ask/cover-letter",
      'http://localhost:4089/ask/skill-gap',
      data
    );

    return response.data;
  } catch (error) {
    console.error('Error sending diet plan data:', error);
  }
};
