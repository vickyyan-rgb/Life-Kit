import { FullCurriculumLesson, CategoryId } from '../../types';

// Helper to quickly build standard interactive lessons
function createLesson(
  id: string,
  categoryId: CategoryId,
  order: number,
  title: string,
  desc: string,
  objectives: string[],
  prereqs: string[],
  situation: { title: string; narrative: string },
  concept: { title: string; body: string; tip: string },
  practice: { prompt: string; options: { label: string; feedback: string; isCorrect: boolean }[] },
  quiz: { q: string; opts: string[]; correct: number; exp: string }[]
): FullCurriculumLesson {
  return {
    id,
    categoryId,
    order,
    title,
    description: desc,
    learningObjectives: objectives,
    prerequisiteIds: prereqs,
    estimatedMinutes: 4,
    openingSituation: {
      title: situation.title,
      narrative: situation.narrative,
      reflectionPrompt: 'How would you approach this situation?',
    },
    conceptScreens: [
      {
        title: concept.title,
        body: concept.body,
        cocoTip: concept.tip,
      },
    ],
    practiceActivity: {
      title: 'Practical Scenario Challenge',
      prompt: practice.prompt,
      options: practice.options.map((opt, i) => ({
        id: `opt_${i}`,
        label: opt.label,
        feedback: opt.feedback,
        isRecommended: opt.isCorrect,
      })),
    },
    takeaways: [
      'Take proactive steps before urgent deadlines arrive.',
      'Always verify official requirements directly with credible sources.',
      'Ask clarifying questions when in doubt—advocacy is a strength.',
    ],
    quizQuestions: quiz.map((item, idx) => ({
      id: `${id}_q${idx + 1}`,
      question: item.q,
      options: item.opts,
      correctIndex: item.correct,
      explanation: item.exp,
    })),
    reward: { xp: 120, coins: 25 },
  };
}

export const WORK_CAREER_LESSONS: FullCurriculumLesson[] = [
  createLesson(
    'work_1',
    'work_career',
    1,
    'Discover Your Transferable Skills',
    'Identify useful skills from school, sports, volunteering, and everyday responsibilities.',
    ['Map informal activities to professional skill terms', 'Translate team projects into teamwork and leadership bullet points'],
    [],
    { title: 'The "No Experience" Dilemma', narrative: 'You open a job board and see "1-2 years experience required" for an entry-level barista role. You wonder if babysitting and school club work count.' },
    { title: 'Transferable Skills in Action', body: 'Employers value soft skills like communication, reliability, problem-solving, and adaptability. Organizing family schedules or captaining a school squad proves work ethic.', tip: "Coco's tip: Babysitting shows reliability, emergency handling, and negotiation!" },
    { prompt: 'How should you list high school club fundraising on your application?', options: [{ label: 'Leave it off because it was not a 9-to-5 paid company.', feedback: 'Club leadership shows real budgeting and organization!', isCorrect: false }, { label: 'Describe it with metrics: "Coordinated 4 fundraisers raising $850 for school equipment."', feedback: 'Spot on! Quantifiable achievements catch recruiters\' eyes.', isCorrect: true }] },
    [
      { q: 'What is a transferable skill?', opts: ['A skill that only works at one specific company', 'A skill you can apply across different roles and fields', 'A skill that requires a doctorate degree'], correct: 1, exp: 'Transferable skills travel with you across jobs.' },
      { q: 'Which is a strong example of showing reliability without a formal past job?', opts: ['Never doing chores', 'Two years of perfect attendance and soccer team captaincy', 'Watching videos on workplace culture'], correct: 1, exp: 'Demonstrated consistency in commitments shows reliability.' },
      { q: 'Why are numbers and metrics useful on an application?', opts: ['They look like math homework', 'They provide concrete evidence of your impact', 'Computers reject applications with letters'], correct: 1, exp: 'Metrics make achievements tangible.' },
    ]
  ),
  createLesson(
    'work_2',
    'work_career',
    2,
    'Build Your First Résumé',
    'Understand sections and describe your experience with clarity and honesty.',
    ['Structure contact info, summary, education, and skills', 'Use active action verbs (built, organized, assisted)'],
    ['work_1'],
    { title: 'The Blank Page Fear', narrative: 'You open a word doc and stare at a white screen wondering what fonts, margins, and sections belong on a professional 1-page résumé.' },
    { title: 'The 1-Page Résumé Blueprint', body: 'Keep it to 1 clean page. Include Contact Info, Education (with expected graduation year), Experience & Projects, and Skills. Always proofread for typos.', tip: 'Coco: Keep fonts simple (Calibri, Arial) and avoid giant unreadable graphics.' },
    { prompt: 'Which bullet point is strongest for a lawn mowing or babysitting role?', options: [{ label: 'Did yard stuff for neighbors sometimes.', feedback: 'Too vague and passive.', isCorrect: false }, { label: 'Maintained 6 regular neighborhood clients with 100% on-time service and weekly scheduling.', feedback: 'Specific, professional, and demonstrates client trust!', isCorrect: true }] },
    [
      { q: 'What is the recommended length for an entry-level high school/college résumé?', opts: ['1 page', '4 pages with photo collages', 'Half a paragraph'], correct: 0, exp: 'Hiring managers spend 7 seconds scanning; 1 page is standard.' },
      { q: 'Which action verb sounds most professional?', opts: ['Messed around with', 'Spearheaded / Coordinated', 'Looked at'], correct: 1, exp: 'Action verbs demonstrate ownership.' },
      { q: 'Should you include an unprofessional email address like gamer9999@xyz.com?', opts: ['Yes, it shows personality', 'No, use a clean professional format like firstname.lastname@email.com', 'Leave email blank'], correct: 1, exp: 'First impressions matter on contact headers.' },
    ]
  ),
  createLesson(
    'work_3',
    'work_career',
    3,
    'Apply and Check the Opportunity',
    'Read a posting, follow application instructions, and verify an employer.',
    ['Check company legitimacy and avoid ghost job scams', 'Tailor application answers to specific posting criteria'],
    ['work_2'],
    { title: 'The Too-Good-To-Be-True Listing', narrative: 'A message offers $38/hr for "package tester" with zero interview required, but asks for your driver’s license number immediately.' },
    { title: 'Vetting Legitimate Job Opportunities', body: 'Verify company addresses on Google Maps and LinkedIn. Legitimate employers interview you via video or in person before asking for tax paperwork.', tip: 'Coco: If an employer asks you to pay for your own background check upfront via crypto, walk away!' },
    { prompt: 'What is the best way to tailor your application to a posting?', options: [{ label: 'Copy-paste the entire job description in white text', feedback: 'Automated scanners detect keyword stuffing.', isCorrect: false }, { label: 'Align your real projects with 2-3 specific skills listed in their requirements', feedback: 'Shows genuine attention and fit for the role.', isCorrect: true }] },
    [
      { q: 'What is a major red flag in an online job offer?', opts: ['Offering paid training', 'Asking for your bank login or fee before interview', 'Holding an in-person interview'], correct: 1, exp: 'Legitimate employers never ask for payment to apply.' },
      { q: 'Where can you verify if a company is real?', opts: ['State business registries, official website, and company LinkedIn', 'Only in chat forums', 'Nowhere online'], correct: 0, exp: 'Official state registries and verified domains confirm legitimacy.' },
      { q: 'Why should you read the entire posting before submitting?', opts: ['Some postings include specific subject lines or test questions', 'It is a legal contract', 'To memorize the office address'], correct: 0, exp: 'Following special submission instructions proves attention to detail.' },
    ]
  ),
  createLesson(
    'work_4',
    'work_career',
    4,
    'Practice an Interview',
    'Build clear STAR examples and prepare thoughtful questions for the interviewer.',
    ['Apply the STAR method (Situation, Task, Action, Result)', 'Formulate 2 smart questions to ask the interviewer'],
    ['work_3'],
    { title: 'The Interview Jitters', narrative: 'The interviewer asks: "Tell me about a time you handled a difficult conflict." Your mind goes blank.' },
    { title: 'The STAR Method Formula', body: 'Situation (set scene) -> Task (your goal) -> Action (what YOU specifically did) -> Result (the positive outcome). Practice keeping answers under 90 seconds.', tip: 'Coco: Always prepare 2 questions to ask them, like: "What does success look like in the first 90 days?"' },
    { prompt: 'When an interviewer asks "Do you have any questions for us?", what is the smartest response?', options: [{ label: '"Nope, I think you covered everything!"', feedback: 'Missed opportunity to show engagement!', isCorrect: false }, { label: '"What are the biggest challenges a new person in this role faces in their first month?"', feedback: 'Shows genuine curiosity, maturity, and preparedness.', isCorrect: true }] },
    [
      { q: 'What does STAR stand for?', opts: ['Start, Think, Act, Repeat', 'Situation, Task, Action, Result', 'Speak, Talk, Ask, Review'], correct: 1, exp: 'STAR structures storytelling concisely.' },
      { q: 'How long should an interview answer ideally last?', opts: ['10 seconds', '1 to 2 minutes', '15 minutes straight'], correct: 1, exp: 'Concise answers maintain listener engagement.' },
      { q: 'When should you send a polite thank-you email following an interview?', opts: ['Never', 'Within 24 hours', 'Three months later'], correct: 1, exp: 'A thank-you note within 24 hours reinforces professionalism.' },
    ]
  ),
  createLesson(
    'work_5',
    'work_career',
    5,
    'Start Work Confidently',
    'Understand onboarding, workplace expectations, and how to ask for clarification.',
    ['Navigate Form I-9 and W-4 tax paperwork on Day 1', 'Communicate proactively when unsure of instructions'],
    ['work_4'],
    { title: 'First Day on the Floor', narrative: 'You get shown the supply closet and assigned three tasks, but the register system looks like alien hieroglyphics.' },
    { title: 'Asking Questions is a Superpower', body: 'Employers expect newcomers to ask questions! Keep a small notepad. Writing down passwords, procedures, and manager preferences shows dedication.', tip: 'Coco: It is 100x better to ask for a 2-minute demo than to guess and break equipment.' },
    { prompt: 'You make a mistake on your first week and drop a tray of dishes. What is the best reaction?', options: [{ label: 'Blame the floor wax and hide in the break room.', feedback: 'Avoids responsibility and hurts team trust.', isCorrect: false }, { label: 'Apologize briefly, help clean it up immediately, and ask how to stack them safely next time.', feedback: 'Demonstrates accountability, composure, and growth mindset!', isCorrect: true }] },
    [
      { q: 'What documents do you usually need to bring on your first day for Form I-9 verification?', opts: ['Photo ID and Social Security card or US Passport', 'High school report card', 'Library card'], correct: 0, exp: 'I-9 requires proof of identity and employment authorization.' },
      { q: 'Why is carrying a small notebook on your first week recommended?', opts: ['To doodle when bored', 'To jot down procedures, codes, and training notes', 'It is legally required'], correct: 1, exp: 'Taking notes reduces repetitive questions and boosts retention.' },
      { q: 'How should you communicate if you wake up with a 102° fever on a workday?', opts: ['Ghost and turn off your phone', 'Call/text your manager as early as possible according to company policy', 'Wait until 3 hours into your shift'], correct: 1, exp: 'Early notification gives managers time to find coverage.' },
    ]
  ),
];

// Helper to quickly build placeholder/curriculum modules for remaining 5 categories
export function generateCategoryLessons(categoryId: CategoryId, prefix: string, lessonTitles: [string, string][]): FullCurriculumLesson[] {
  return lessonTitles.map(([title, desc], idx) =>
    createLesson(
      `${prefix}_${idx + 1}`,
      categoryId,
      idx + 1,
      title,
      desc,
      [`Master key principles of ${title}`, `Apply practical problem-solving in everyday scenarios`],
      idx === 0 ? [] : [`${prefix}_${idx}`],
      { title: `Real-World Check: ${title}`, narrative: `You encounter an everyday situation where understanding ${title.toLowerCase()} saves you time, stress, and money.` },
      { title: `Essential Guidance for ${title}`, body: `${desc}. Learn the basic rules, requirements, and best practices to navigate this milestone smoothly.`, tip: `Coco's tip: When dealing with ${title.toLowerCase()}, always keep written notes and verify details!` },
      { prompt: `What is the most responsible way to handle ${title.toLowerCase()}?`, options: [{ label: 'Guess without checking official rules.', feedback: 'Guessing often leads to unexpected penalties or delays.', isCorrect: false }, { label: 'Check official requirements and ask trusted advisors or official support.', feedback: 'Spot on! Thorough preparation yields the best outcome.', isCorrect: true }] },
      [
        { q: `What is the core takeaway regarding ${title}?`, opts: [`Preparation and understanding official requirements prevent costly mistakes`, `It can be ignored completely`, `It only matters after age 40`], correct: 0, exp: 'Proactive learning builds confidence and capability.' },
        { q: `Who should you consult for verified guidance?`, opts: [`Random social media comments`, `Official government, healthcare, or institutional resources`, `Unknown forum threads`], correct: 1, exp: 'Official sources provide legally accurate, up-to-date guidance.' },
        { q: `Why is keeping organized records beneficial?`, opts: [`It is not helpful`, `It provides proof and saves time during future applications or reviews`, `It takes up phone storage`], correct: 1, exp: 'Documentation protects your rights and streamlines future steps.' },
      ]
    )
  );
}

export const DRIVING_TRANSPORTATION_LESSONS: FullCurriculumLesson[] = generateCategoryLessons('driving_transportation', 'drive', [
  ['Find Your Transportation Options', 'Compare transport choices based on access, cost, and personal schedule needs.'],
  ['Understand Your State’s Driving Path', 'Locate official permit/licence requirements, age brackets, and testing rules.'],
  ['Prepare for an Application', 'Understand how to find current document checklists and DMV appointment procedures.'],
  ['Understand Driving Costs', 'Explore fuel, maintenance, insurance concepts, registration fees, and ownership costs.'],
  ['Prepare for Unexpected Situations', 'Locate official guidance and emergency support for breakdowns and minor collisions.'],
]);

export const HEALTH_WELLBEING_LESSONS: FullCurriculumLesson[] = generateCategoryLessons('health_wellbeing', 'health', [
  ['Find the Right Place to Ask for Help', 'Understand different care settings (Urgent Care vs. Primary Care vs. ER) and where to seek guidance.'],
  ['Book an Appointment', 'Practice gathering insurance details, ID, and clearly explaining the reason for a clinic visit.'],
  ['Prepare for a Conversation With a Clinician', 'Organize questions, symptoms, medications, and relevant notes ahead of your visit.'],
  ['Understand Healthcare Paperwork', 'Introduce common insurance terms like copay, deductible, and Explanation of Benefits (EOB).'],
  ['Ask for Support and Clarification', 'Practice asking about confusing medication instructions, privacy, and community resources.'],
]);

export const HOME_EVERYDAY_LESSONS: FullCurriculumLesson[] = generateCategoryLessons('home_everyday', 'home', [
  ['Understand the Cost of a Household', 'Identify common one-time security deposits, monthly rent, and recurring utilities.'],
  ['Search for Housing Carefully', 'Evaluate rental listings, verify landlords, and recognize common wire scams.'],
  ['Read Before You Agree', 'Learn which rental lease terms, pet clauses, guest policies, and maintenance rules to inspect.'],
  ['Share a Home', 'Practice discussing chores, split bills, quiet hours, and respectful roommate boundaries.'],
  ['Build Everyday Routines', 'Plan grocery shopping, basic meal prep, laundering, and household organization on a schedule.'],
]);

export const EDUCATION_NEXT_LESSONS: FullCurriculumLesson[] = generateCategoryLessons('education_next', 'edu', [
  ['Explore Different Pathways', 'Compare 4-year college, community college, trade apprenticeships, and direct workforce entry.'],
  ['Compare Options Thoughtfully', 'Consider total net cost, time horizon, career outcomes, and personal learning preferences.'],
  ['Plan an Application', 'Organize deadlines, transcripts, recommendation letters, and application portals systematically.'],
  ['Understand Financial Support', 'Learn about FAFSA, grants, scholarships, subsidized loans, and verifying official aid.'],
  ['Ask for Help and Advocate for Yourself', 'Practice emailing professors, visiting financial aid offices, and accessing tutoring support.'],
]);

export const COMMUNITY_RELATIONSHIPS_LESSONS: FullCurriculumLesson[] = generateCategoryLessons('community_relationships', 'comm', [
  ['Communicate Your Needs', 'Practice clear requests, active listening, and constructive disagreement with friends and coworkers.'],
  ['Set and Respect Boundaries', 'Recognize mutual consent, peer pressure, and comfortable ways to say "no" respectfully.'],
  ['Find a Volunteering Opportunity', 'Match your interests, schedule, and skills with verified local non-profit groups.'],
  ['Explore Blood Donation', 'Learn how to check eligibility, health questionnaires, and prepare for community blood drives.'],
  ['Participate in Your Community', 'Explore civic participation, voter registration requirements, and local town hall meetings.'],
]);
