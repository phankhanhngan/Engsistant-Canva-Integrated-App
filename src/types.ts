export enum Role {
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  UNKNOWN = 'UNKNOWN',
}

export interface ClassInfo {
  name: string;
  id: string;
  descriptionHeading: string;
  description?: string;
  alternateLink: string;
  driveLink: string;
  color?: string;
  googleCourseId?: string;
  students?: {
    authId: string;
    email: string;
    name: string;
    role: Role;
    photo: string;
    googleRefreshToken: string;
    classes: ClassInfo[];
  }[];
}

export interface GrammarLesson {
  id: string;
  name: string;
  usage: string;
  exampleMeta: string[];
  isMarked: boolean;
}

export interface VocabularyLesson {
  id: string;
  word: string;
  meaning: string;
  exampleMeta: string[];
  antonymMeta: string[];
  synonymMeta: string[];
  pronunciationAudio: string;
  imageUrl: string;
  pronunciationWritten: string;
  functionalLabel: string;
  isMarked: boolean;
}

export interface Lesson {
  status: 'PENDING' | 'READY';
  id: string;
  sharedLink: string;
  description: string;
  name: string;
  level: string;
  class: {
    id: string;
    name: string;
  };
  grammars: GrammarLesson[];
  vocabularies: VocabularyLesson[];
  cover: string;
  color: string;
}

export interface UserProfile {
  email: string;
  name: string;
  photo: string;
  role: Role;
  id: string;
  googleId?: string;
  numberOfClasses: number;
  numberOfLessons: number;
}
