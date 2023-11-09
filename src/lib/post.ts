import axios from 'axios';
import duplicatedRequestErrorMessage from '../constants/duplicatedRequestErrorMessage';
import { baseUrl } from '../constants/api';

function cleanServerResponse<T>(data: string | T) {
  if (typeof data === 'string') {
    const cleanedResponse = data.replace(/```json|```/g, '').trim();

    try {
      return JSON.parse(cleanedResponse);
    } catch (e) {
      console.error('Failed to parse JSON:', e);
    }
  } else {
    return data;
  }
}

let isGenerating = false;
async function post<T>(path: string, data: T) {
  if (isGenerating) {
    return Promise.reject(new Error(duplicatedRequestErrorMessage));
  }
  isGenerating = true;
  try {
    const response = await axios.post(`${baseUrl}${path}`, data);

    return cleanServerResponse(response.data);
  } catch (error) {
    return Promise.reject(error);
  } finally {
    isGenerating = false;
  }
}
export default post;
