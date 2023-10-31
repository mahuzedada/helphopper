export type Tone = 'Formal' | 'Friendly' | 'Enthusiastic';

export interface ICoverLetter {
  tone: Tone;
  content: string;
}

export interface CandidateAndJobInfoDto {
  firstName: string;
  lastName: string;
  resumeText: string;
  jdText: string;
  tone: Tone;
}
