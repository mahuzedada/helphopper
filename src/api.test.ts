import axios from 'axios';
import { generateCoverLetter, generateSkillGapAnalysis } from './api';

jest.mock('axios');

describe('API Calls', () => {
  const mockData = {
    ali: 'baba',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('generateCoverLetter', () => {
    it('successfully fetches data', async () => {
      const mockedAxios = axios as jest.Mocked<typeof axios>;
      mockedAxios.post.mockResolvedValueOnce({
        data: 'Mocked cover letter data',
      });

      const result = await generateCoverLetter(mockData);
      expect(result).toBe('Mocked cover letter data');
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://localhost:4089/ask/cover-letter',
        mockData
      );
    });

    it('handles error gracefully', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      const mockedAxios = axios as jest.Mocked<typeof axios>;
      mockedAxios.post.mockRejectedValueOnce(new Error('Mocked error'));

      const result = await generateCoverLetter(mockData);
      expect(result).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error sending diet plan data:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  describe('generateSkillGapAnalysis', () => {
    it('successfully fetches data', async () => {
      const mockedAxios = axios as jest.Mocked<typeof axios>;
      mockedAxios.post.mockResolvedValueOnce({ data: 'Mocked skill gap data' });

      const result = await generateSkillGapAnalysis(mockData);
      expect(result).toBe('Mocked skill gap data');
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://localhost:4089/ask/skill-gap',
        mockData
      );
    });

    it('handles error gracefully', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      const mockedAxios = axios as jest.Mocked<typeof axios>;
      mockedAxios.post.mockRejectedValueOnce(new Error('Mocked error'));

      const result = await generateSkillGapAnalysis(mockData);
      expect(result).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error sending diet plan data:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });
});
