export interface AvatarConfig {
  skinColor: string;
  hairStyle: 'messy' | 'short' | 'curly' | 'ponytail' | 'buzz' | 'long' | 'undercut';
  hairColor: string;
  outfit: 'streetwear' | 'scholar' | 'casual' | 'cyberpunk' | 'formal';
  outfitColor: string;
  expression: 'confident' | 'curious' | 'chill' | 'cheerful' | 'focused';
  accessory: 'none' | 'headphones' | 'glasses' | 'backpack' | 'cap' | 'beanie';
  companion: 'none' | 'fox' | 'owl' | 'bot' | 'coco';
}

export type LearningPriority =
  | 'moving_out'
  | 'first_job'
  | 'credit_building'
  | 'money_mastery'
  | 'tax_basics'
  | 'health_adulting';

export interface UserProfile {
  name: string;
  age: number; // 14 - 21
  gender: string;
  country: string;
  city: string;
  avatar: AvatarConfig;
  level: number;
  xp: number;
  coins: number;
  unlockedZones: string[]; // Zones where fog of war is cleared
  knownTopics: string[]; // From initial questionnaire
  priority: LearningPriority;
  completedLessons: string[]; // Lesson IDs that user completed
  activeDailyQuestId: string;
  dailyStreak: number;
  lastActiveDate: string;
  soundEnabled: boolean;
  categoryStamps?: string[]; // Category passport stamps earned
}

export interface ScenarioOption {
  text: string;
  feedback: string;
  isCorrect: boolean;
  impact: string;
}

export interface InteractiveDocPreview {
  type: 'w2_form' | 'lease_agreement' | 'credit_card_bill' | 'paystub' | 'budget_sheet';
  title: string;
  highlightClause: string;
  details: { label: string; value: string; caution?: boolean }[];
}

export interface Lesson {
  id: string;
  zoneId: string;
  title: string;
  estimatedMinutes: number;
  xpReward: number;
  coinsReward: number;
  summary: string;
  keyTakeaways: string[];
  docPreview?: InteractiveDocPreview;
  scenario: {
    title: string;
    narrative: string;
    question: string;
    options: ScenarioOption[];
  };
}

export interface Zone {
  id: string;
  name: string;
  title: string;
  tagline: string;
  description: string;
  themeColor: string;
  accentColor: string;
  mapCoordinates: { x: number; y: number };
  iconName: string;
  topics: string[];
  recommendedAge: string;
  npcMentor: {
    name: string;
    role: string;
    quote: string;
    avatarBg: string;
    emoji: string;
  };
  landmark: string;
  lessons: Lesson[];
}

export interface QuestionnaireQuestion {
  id: string;
  zoneId: string;
  topicTitle: string;
  question: string;
  subtitle: string;
  options: {
    label: string;
    detail: string;
    confersKnowledge: boolean;
    xpGranted: number;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'mentor';
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    zoneId?: string;
  };
}

export type AppStage =
  | 'SWORD_START'
  | 'NAME_STEP'
  | 'DETAILS_STEP'
  | 'AVATAR_CUSTOMIZE'
  | 'AVATAR_SHOWCASE'
  | 'KNOWLEDGE_QUESTIONNAIRE'
  | 'MAP_SANDBOX';

// --- NEW EXPLORE & CATEGORY JOURNEY TYPES ---

export type CategoryId =
  | 'work_career'
  | 'money_paperwork'
  | 'driving_transportation'
  | 'health_wellbeing'
  | 'home_everyday'
  | 'education_next'
  | 'community_relationships';

export type LessonState =
  | 'current'
  | 'available'
  | 'in_progress'
  | 'completed'
  | 'locked'
  | 'refresh_suggested';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ConceptScreen {
  title: string;
  body: string;
  highlightTerms?: { term: string; definition: string }[];
  documentSample?: {
    title: string;
    type: string;
    fields: { label: string; value: string; caution?: boolean; tip?: string }[];
  };
  cocoTip?: string;
}

export interface PracticeActivity {
  title: string;
  prompt: string;
  options: {
    id: string;
    label: string;
    feedback: string;
    isRecommended: boolean;
  }[];
}

export interface FullCurriculumLesson {
  id: string;
  categoryId: CategoryId;
  order: number; // 1 to 5
  title: string;
  description: string;
  learningObjectives: string[];
  prerequisiteIds: string[];
  estimatedMinutes: number;
  applicableJurisdiction?: string;
  openingSituation: {
    title: string;
    narrative: string;
    reflectionPrompt: string;
  };
  conceptScreens: ConceptScreen[];
  practiceActivity: PracticeActivity;
  takeaways: string[];
  quizQuestions: QuizQuestion[];
  reward: {
    xp: number;
    coins: number;
  };
}

export interface CategoryRegion {
  id: CategoryId;
  primaryCategory: string; // e.g. "Work & Career"
  destinationName: string; // e.g. "Career Town"
  landmarkCues: string; // e.g. "Café, studio, workplace"
  themeDescription: string;
  mapCoordinates: { x: number; y: number }; // percentage coords (0-100)
  accentColor: string;
  iconName: string;
  lessons: FullCurriculumLesson[];
}
