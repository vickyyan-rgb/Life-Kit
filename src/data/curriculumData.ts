import { CategoryRegion, FullCurriculumLesson, CategoryId } from '../types';
import { MONEY_PAPERWORK_LESSONS } from './categories/moneyPaperwork';
import {
  WORK_CAREER_LESSONS,
  DRIVING_TRANSPORTATION_LESSONS,
  HEALTH_WELLBEING_LESSONS,
  HOME_EVERYDAY_LESSONS,
  EDUCATION_NEXT_LESSONS,
  COMMUNITY_RELATIONSHIPS_LESSONS,
} from './categories/otherCategories';

export const WORLD_CATEGORIES: CategoryRegion[] = [
  {
    id: 'work_career',
    primaryCategory: 'Work & Career',
    destinationName: 'Career Town',
    landmarkCues: 'Café, studio, workplace, farmland mill',
    themeDescription: 'Master transferable skills, résumés, job applications, and workplace success.',
    mapCoordinates: { x: 54, y: 45 },
    accentColor: '#ffe600',
    iconName: 'Briefcase',
    lessons: WORK_CAREER_LESSONS,
  },
  {
    id: 'money_paperwork',
    primaryCategory: 'Money & Paperwork',
    destinationName: 'Money Harbor',
    landmarkCues: 'Bank, trade market, sailing ship, document center',
    themeDescription: 'Understand paychecks, credit building, taxes, budgeting, and scam defense.',
    mapCoordinates: { x: 88, y: 55 },
    accentColor: '#39ff14',
    iconName: 'Coins',
    lessons: MONEY_PAPERWORK_LESSONS,
  },
  {
    id: 'driving_transportation',
    primaryCategory: 'Driving & Transportation',
    destinationName: 'Mobility Trails',
    landmarkCues: 'Canyon road, transit stop, mine railway, suspension bridge',
    themeDescription: 'Navigate transit passes, state driver licenses, vehicle costs, and roadside emergencies.',
    mapCoordinates: { x: 18, y: 68 },
    accentColor: '#ff007f',
    iconName: 'Car',
    lessons: DRIVING_TRANSPORTATION_LESSONS,
  },
  {
    id: 'health_wellbeing',
    primaryCategory: 'Health & Wellbeing',
    destinationName: 'Wellbeing Gardens',
    landmarkCues: 'Desert oasis clinic, botanical gardens, rest springs',
    themeDescription: 'Navigate healthcare settings, book appointments, understand insurance terms, and self-advocate.',
    mapCoordinates: { x: 22, y: 20 },
    accentColor: '#00f0ff',
    iconName: 'HeartPulse',
    lessons: HEALTH_WELLBEING_LESSONS,
  },
  {
    id: 'home_everyday',
    primaryCategory: 'Home & Everyday Life',
    destinationName: 'Home Village',
    landmarkCues: 'Country cottages, water well, kitchen, shared spaces',
    themeDescription: 'Understand household costs, inspect lease terms, roommate dynamics, and everyday routines.',
    mapCoordinates: { x: 42, y: 52 },
    accentColor: '#ff7700',
    iconName: 'Home',
    lessons: HOME_EVERYDAY_LESSONS,
  },
  {
    id: 'education_next',
    primaryCategory: 'Education & Next Steps',
    destinationName: 'Discovery Campus',
    landmarkCues: 'Jungle stepped pyramid library, observatory, skill workshops',
    themeDescription: 'Compare college, trade schools, and work pathways, apply for FAFSA aid, and advocate for yourself.',
    mapCoordinates: { x: 64, y: 82 },
    accentColor: '#7928ca',
    iconName: 'GraduationCap',
    lessons: EDUCATION_NEXT_LESSONS,
  },
  {
    id: 'community_relationships',
    primaryCategory: 'Community & Relationships',
    destinationName: 'Community Square',
    landmarkCues: 'Snowy igloo plaza, fellowship gathering circle, civic center',
    themeDescription: 'Practice healthy boundary communication, volunteering, community blood drives, and civic involvement.',
    mapCoordinates: { x: 80, y: 20 },
    accentColor: '#00f0ff',
    iconName: 'Users',
    lessons: COMMUNITY_RELATIONSHIPS_LESSONS,
  },
];

export function getCategoryById(id: CategoryId): CategoryRegion | undefined {
  return WORLD_CATEGORIES.find((cat) => cat.id === id);
}

export function getAllLessons(): FullCurriculumLesson[] {
  return WORLD_CATEGORIES.flatMap((c) => c.lessons);
}
