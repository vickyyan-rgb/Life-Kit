import { FullCurriculumLesson } from '../../types';

export const MONEY_PAPERWORK_LESSONS: FullCurriculumLesson[] = [
  {
    id: 'money_1',
    categoryId: 'money_paperwork',
    order: 1,
    title: 'Understand Your Paycheck',
    description: 'Distinguish gross pay, deductions, and take-home pay on your first paystub.',
    learningObjectives: [
      'Calculate the difference between gross pay and net pay',
      'Identify FICA (Social Security & Medicare) mandatory deductions',
      'Verify hours and wage rate on a paystub',
    ],
    prerequisiteIds: [],
    estimatedMinutes: 4,
    openingSituation: {
      title: 'The Missing $180 Mystery',
      narrative: 'You worked 40 hours at $15/hr at your first summer job. You expected $600 in your bank account, but when the deposit lands, it is only $492. Did your employer shortchange you?',
      reflectionPrompt: 'Why is your direct deposit less than hourly wage times hours worked?',
    },
    conceptScreens: [
      {
        title: 'Gross Pay vs. Net Pay',
        body: 'Gross pay is the total amount you earn before any taxes or deductions are subtracted (e.g. 40 hours × $15 = $600). Net pay (also called take-home pay) is what actually gets deposited into your bank account after mandatory federal, state, and payroll withholdings.',
        highlightTerms: [
          { term: 'Gross Pay', definition: 'Total earnings before any taxes or deductions are taken out.' },
          { term: 'Net Pay', definition: 'Take-home money deposited into your bank account after all deductions.' },
        ],
        cocoTip: "Let's look at this together: FICA is mandatory federal law. That money funds Social Security and Medicare.",
      },
      {
        title: 'Decoding the Deductions (FICA & Withholdings)',
        body: 'Every legal W-2 paycheck has automatic deductions. FICA is 7.65% (6.2% Social Security + 1.45% Medicare). Federal and state income tax withholdings are pre-payments towards your annual tax bill based on the Form W-4 you filled out.',
        documentSample: {
          title: 'Sample Paystub · Apex Retail Co.',
          type: 'paystub',
          fields: [
            { label: 'Gross Earnings (40 hrs @ $15.00)', value: '$600.00' },
            { label: 'Federal Income Tax Withholding', value: '-$42.00', tip: 'Refundable if you earn under standard deduction!' },
            { label: 'FICA - Social Security (6.2%)', value: '-$37.20', caution: true },
            { label: 'FICA - Medicare (1.45%)', value: '-$8.70', caution: true },
            { label: 'State Income Tax Withholding', value: '-$20.10' },
            { label: 'Net Take-Home Pay', value: '$492.00' },
          ],
        },
      },
    ],
    practiceActivity: {
      title: 'Check Your Paystub Accuracy',
      prompt: 'You notice your paystub lists 35 hours worked, but your punch-clock app recorded 40 hours. What should you do?',
      options: [
        {
          id: 'opt_1',
          label: 'Ignore it because taxes probably ate the remaining 5 hours.',
          feedback: 'Taxes are percentages of earnings, not missing logged hours! You must be paid for every hour worked.',
          isRecommended: false,
        },
        {
          id: 'opt_2',
          label: 'Politely message your manager or payroll with a screenshot of your timecard.',
          feedback: 'Spot on! Payroll errors happen frequently. Showing your time log gets the missing 5 hours corrected on your next check.',
          isRecommended: true,
        },
      ],
    },
    takeaways: [
      'Gross Pay = Hours × Wage; Net Pay = What actually reaches your bank account.',
      'FICA (7.65%) is mandatory federal law and cannot be opted out of.',
      'Always review your paystub each pay period to verify hours and rates are accurate.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'What is the key difference between Gross Pay and Net Pay?',
        options: [
          'Gross pay is what you take home; net pay is before taxes.',
          'Gross pay is total earned before deductions; net pay is actual take-home cash.',
          'There is no difference; they are different names for the same number.',
        ],
        correctIndex: 1,
        explanation: 'Gross pay is total earnings before any deductions. Net pay is the final amount deposited into your account.',
      },
      {
        id: 'q2',
        question: 'Which deduction is legally required for Social Security and Medicare from every W-2 employee?',
        options: ['401(k) voluntary match', 'FICA payroll taxes', 'Union initiation dues'],
        correctIndex: 1,
        explanation: 'FICA (Federal Insurance Contributions Act) deducts 6.2% for Social Security and 1.45% for Medicare.',
      },
      {
        id: 'q3',
        question: 'If you earned $800 gross and your paystub shows $120 total deductions, what is your net pay?',
        options: ['$800', '$920', '$680'],
        correctIndex: 2,
        explanation: '$800 Gross - $120 Deductions = $680 Net Take-Home Pay.',
      },
    ],
    reward: { xp: 120, coins: 30 },
  },
  {
    id: 'money_2',
    categoryId: 'money_paperwork',
    order: 2,
    title: 'Debit, Credit, and Borrowing',
    description: 'Understand where money comes from, how credit scores work, and avoiding high-interest traps.',
    learningObjectives: [
      'Contrast debit cards (your own money) with credit cards (borrowed money)',
      'Explain APR (Annual Percentage Rate) and the grace period',
      'Learn how to build credit without paying a cent of interest',
    ],
    prerequisiteIds: ['money_1'],
    estimatedMinutes: 5,
    openingSituation: {
      title: 'The Swiped Plastic Surprise',
      narrative: 'Your friend got their first credit card with a $1,000 limit. They think of it as "free extra spending money" and pay only the $25 minimum each month. Within a year, interest piles up to hundreds of dollars.',
      reflectionPrompt: 'What happens when you only pay the minimum balance on a credit card?',
    },
    conceptScreens: [
      {
        title: 'Debit vs. Credit: Know the Source',
        body: 'A debit card draws immediately from cash already in your bank checking account. If your balance is $50, you cannot spend $80 without hefty overdraft fees. A credit card is a short-term loan from the bank. If you pay the full balance before the monthly due date, you pay 0% interest!',
        highlightTerms: [
          { term: 'Debit Card', definition: 'Spends money directly from your checking account; no debt is created.' },
          { term: 'Credit Card', definition: 'A revolving loan line; requires repayment each monthly billing cycle.' },
          { term: 'Statement Balance', definition: 'The total charges incurred during that billing cycle.' },
        ],
        cocoTip: "Here's the detail to check: If you pay your FULL statement balance every month, you get credit perks without paying interest!",
      },
      {
        title: 'The APR & Minimum Payment Trap',
        body: 'Credit cards typically charge 22% to 29% APR. If you carry a $1,000 balance and only pay the $25 minimum, it can take over 5 years and cost $600+ in pure interest fees.',
        documentSample: {
          title: 'Credit Card Statement Warning Box',
          type: 'credit_card_bill',
          fields: [
            { label: 'Current Balance', value: '$1,200.00' },
            { label: 'Minimum Payment Due', value: '$35.00' },
            { label: 'APR Interest Rate', value: '26.99%', caution: true },
            { label: 'Pay Full Balance Cost', value: '$0 interest charged' },
            { label: 'Minimum-Only Payoff Time', value: '7 Years + $890 Interest!', caution: true },
          ],
        },
      },
    ],
    practiceActivity: {
      title: 'Smart Card Usage Decision',
      prompt: 'You want to build a strong credit score for renting your future apartment. Which strategy accomplishes this best?',
      options: [
        {
          id: 'opt_1',
          label: 'Carry a balance each month because banks like seeing you owe money.',
          feedback: 'Myth! Carrying a balance only wastes your money on interest. Credit bureaus care about on-time payments, not unpaid interest.',
          isRecommended: false,
        },
        {
          id: 'opt_2',
          label: 'Put a small subscription (like Spotify $11/mo) on the card and set autopay for the full balance.',
          feedback: 'Excellent! Perfect 100% on-time payment history and low utilization without paying a penny of interest.',
          isRecommended: true,
        },
      ],
    },
    takeaways: [
      'Credit is borrowed money, not free cash.',
      'Always pay the statement balance in full to avoid 25%+ APR interest.',
      'On-time payments are the #1 factor in your credit score.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Where does money come from when you pay using a Debit card?',
        options: [
          'A loan granted by the credit card issuer',
          'Directly from your personal bank checking account',
          'From your future paycheck advance',
        ],
        correctIndex: 1,
        explanation: 'Debit cards immediately subtract funds from your linked checking account.',
      },
      {
        id: 'q2',
        question: 'How can you use a credit card to build credit without paying any interest?',
        options: [
          'Never use the card after activating it',
          'Make small purchases and pay the statement balance in full every month',
          'Only make the minimum payment each month',
        ],
        correctIndex: 1,
        explanation: 'Paying the statement balance in full before the grace period ends incurs zero interest charges.',
      },
      {
        id: 'q3',
        question: 'What is APR on a credit card?',
        options: [
          'Annual Percentage Rate (the yearly cost of borrowing unpaid money)',
          'Automated Payment Receipt',
          'Account Protection Registration',
        ],
        correctIndex: 0,
        explanation: 'APR represents the annual cost of carrying debt on the card.',
      },
    ],
    reward: { xp: 120, coins: 30 },
  },
  {
    id: 'money_3',
    categoryId: 'money_paperwork',
    order: 3,
    title: 'Plan a Simple Budget',
    description: 'Structure income, essentials, flexible spending, and emergency savings with zero stress.',
    learningObjectives: [
      'Apply the 50/30/20 benchmark rule for realistic budgeting',
      'Distinguish fixed essentials from variable flexible wants',
      'Establish a starter emergency buffer fund',
    ],
    prerequisiteIds: ['money_2'],
    estimatedMinutes: 4,
    openingSituation: {
      title: 'The Mid-Month Zero Balance',
      narrative: 'Maya makes $1,600/month. By the 18th of every month, her checking account drops below $20, leaving her stressed about bus fare and phone bills until the next payday.',
      reflectionPrompt: 'How can a simple plan keep money in your account all month long?',
    },
    conceptScreens: [
      {
        title: 'The 50 / 30 / 20 Framework',
        body: 'A trusted rule of thumb for young adults: 50% for Needs (rent, basic groceries, transport, phone bill); 30% for Wants (takeout, gaming, clothes, outings); 20% for Savings and debt buffer. You can adjust the ratios to match your real life.',
        highlightTerms: [
          { term: 'Fixed Expenses', definition: 'Bills that stay identical every month (rent, phone plan, insurance).' },
          { term: 'Variable Expenses', definition: 'Costs that fluctuate based on choices (groceries, dining, entertainment).' },
          { term: 'Emergency Buffer', definition: 'Cash reserved exclusively for unexpected events (car tire puncture, urgent copay).' },
        ],
        cocoTip: "Let's look at this together: Even saving $25 from each paycheck builds peace of mind!",
      },
      {
        title: 'Inspectable Starter Budget',
        body: 'Categorize your expenses before payday so your dollars have a destination before impulse spending happens.',
        documentSample: {
          title: 'Monthly Spending Plan ($1,600 Net Income)',
          type: 'budget_sheet',
          fields: [
            { label: '50% Needs (Rent, Utilities, Food, Bus)', value: '$800.00' },
            { label: '30% Wants (Streaming, Dining Out, Hobbies)', value: '$480.00' },
            { label: '20% Savings (Emergency Fund, Future Goal)', value: '$320.00' },
            { label: 'Total Planned', value: '$1,600.00 (Balanced)' },
          ],
        },
      },
    ],
    practiceActivity: {
      title: 'Expense Classification Challenge',
      prompt: 'Which of the following is categorized as a true "Need" (essential) rather than a "Want"?',
      options: [
        {
          id: 'opt_1',
          label: 'Unlimited monthly high-tier coffee shop passes and gaming subscriptions.',
          feedback: 'Enjoyable, but non-essential! If money gets tight, these can be paused.',
          isRecommended: false,
        },
        {
          id: 'opt_2',
          label: 'Prescription medication and reliable public transit pass to get to work.',
          feedback: 'Spot on! Needs are vital for health, safety, and maintaining your livelihood.',
          isRecommended: true,
        },
      ],
    },
    takeaways: [
      'A budget is not a restriction—it gives you permission to spend without guilt.',
      'Categorize into Needs (50%), Wants (30%), and Savings (20%).',
      'Track subscriptions; small $9 recurring charges add up fast.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Under the 50/30/20 guideline, what category should receive about 50% of your take-home pay?',
        options: ['Entertainment and vacations', 'Needs and essentials (housing, food, basic transport)', 'Stock market investments'],
        correctIndex: 1,
        explanation: '50% covers baseline survival and employment necessities.',
      },
      {
        id: 'q2',
        question: 'Which of the following is considered a fixed expense?',
        options: ['Monthly apartment rent', 'Weekly restaurant meals', 'Weekend concert tickets'],
        correctIndex: 0,
        explanation: 'Apartment rent is contractual and stays the exact same dollar amount each month.',
      },
      {
        id: 'q3',
        question: 'What is the primary purpose of an emergency buffer fund?',
        options: [
          'To buy luxury shopping items during seasonal sales',
          'To handle unexpected urgent expenses without turning to high-interest debt',
          'To lock money away so it can never be touched',
        ],
        correctIndex: 1,
        explanation: 'Emergency funds prevent surprises from wrecking your financial stability.',
      },
    ],
    reward: { xp: 120, coins: 30 },
  },
  {
    id: 'money_4',
    categoryId: 'money_paperwork',
    order: 4,
    title: 'Understand Tax-Filing Basics',
    description: 'Learn the purpose of filing, documents to gather, and where to verify whether filing is required.',
    learningObjectives: [
      'Know what Form W-2 and 1099 are and when you receive them',
      'Understand the IRS standard deduction threshold',
      'Access 100% free official tax filing programs (IRS Free File)',
    ],
    prerequisiteIds: ['money_3'],
    estimatedMinutes: 5,
    applicableJurisdiction: 'Federal IRS & US State Requirements',
    openingSituation: {
      title: 'The Tax Envelope in the Mail',
      narrative: 'In late January, an envelope marked "IMPORTANT TAX RETURN DOCUMENT ENCLOSED" arrives. Your friend tells you: "If you earned under $14,000, throw it in the drawer, taxes don\'t apply to you!"',
      reflectionPrompt: 'Could ignoring this document mean forfeiting hundreds of dollars of your own money?',
    },
    conceptScreens: [
      {
        title: 'Why You May Be Owed Money',
        body: 'Even if your total income is below the mandatory filing threshold, filing a tax return is the ONLY legal method to claim back any Federal Income Tax withheld from your paychecks (Box 2 on your W-2). Millions of young Americans lose money each year by not filing!',
        highlightTerms: [
          { term: 'W-2 Form', definition: 'Annual wage summary sent by employers by January 31 showing earnings and taxes withheld.' },
          { term: 'Tax Refund', definition: 'A check or deposit returning taxes you overpaid throughout the calendar year.' },
          { term: 'IRS Free File', definition: 'Free, guided tax software provided by IRS partnerships for incomes under $79,000.' },
        ],
        cocoTip: 'You can ask for clarification: Never pay $100 for commercial software if you are an eligible student or beginner!',
      },
      {
        title: 'Documents Checklist to Gather',
        body: 'Before filing, collect your government photo ID, Social Security Number, W-2 forms from all jobs, and your bank routing and account number for rapid direct deposit.',
        documentSample: {
          title: 'W-2 Key Boxes to Locate',
          type: 'w2_form',
          fields: [
            { label: 'Box 1: Wages, tips, other comp', value: '$6,400.00' },
            { label: 'Box 2: Federal income tax withheld', value: '$450.00', tip: 'This is the potential refund money!' },
            { label: 'Box 17: State income tax', value: '$110.00' },
          ],
        },
      },
    ],
    practiceActivity: {
      title: 'Tax Filing Choice Challenge',
      prompt: 'You worked part-time and earned $4,200 total this year. Box 2 of your W-2 shows $380 was withheld. What should you do?',
      options: [
        {
          id: 'opt_1',
          label: 'Do not file because you earned under the standard deduction limit.',
          feedback: 'If you do not file, the IRS keeps your $380 withheld tax forever!',
          isRecommended: false,
        },
        {
          id: 'opt_2',
          label: 'File a simple return through IRS Free File to claim your $380 refund check.',
          feedback: 'Correct! Because your taxable liability is $0, you receive 100% of the $380 back in your bank account.',
          isRecommended: true,
        },
      ],
    },
    takeaways: [
      'Employers must mail or provide W-2s by January 31.',
      'Filing is how you claim back money withheld from your paychecks.',
      'Use IRS Free File or VITA (Volunteer Income Tax Assistance) for $0 free filing.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'By what date are US employers required to issue your Form W-2?',
        options: ['April 15', 'January 31', 'December 31'],
        correctIndex: 1,
        explanation: 'Federal law requires employers to provide W-2s by January 31 for the preceding tax year.',
      },
      {
        id: 'q2',
        question: 'If you earned under the filing threshold but taxes were withheld in Box 2, how do you get that money back?',
        options: [
          'Ask your manager for cash out of the register',
          'File a federal tax return to request a tax refund',
          'It is permanently lost to the government',
        ],
        correctIndex: 1,
        explanation: 'Filing a tax return is the official mechanism for the IRS to issue your refund.',
      },
      {
        id: 'q3',
        question: 'What is IRS Free File?',
        options: [
          'A paid commercial audit service',
          'An official program providing certified free tax software for eligible filers',
          'A lottery for cash prizes',
        ],
        correctIndex: 1,
        explanation: 'IRS Free File lets eligible filers prepare and e-file federal tax returns completely free.',
      },
    ],
    reward: { xp: 120, coins: 30 },
  },
  {
    id: 'money_5',
    categoryId: 'money_paperwork',
    order: 5,
    title: 'Spot Scams and Hidden Costs',
    description: 'Recognize suspicious requests, recurring charges, and traps targeting first-time earners.',
    learningObjectives: [
      'Identify classic red flags (urgency, gift cards, wire requests)',
      'Inspect subscription terms and dark patterns',
      'Know what steps to take if you suspect your account has been compromised',
    ],
    prerequisiteIds: ['money_4'],
    estimatedMinutes: 5,
    openingSituation: {
      title: 'The "Immediate Wire" Job Offer',
      narrative: 'A text message offers a remote assistant job paying $45/hr. They send you a photo of a $2,000 cashier check, asking you to deposit it and immediately wire $500 back for "home office equipment".',
      reflectionPrompt: 'Why would an employer ask you to wire your own money for equipment?',
    },
    conceptScreens: [
      {
        title: 'Red Flags of Financial Scams',
        body: 'Legitimate employers and government agencies (like the IRS or police) will NEVER: demand immediate payment via gift cards or crypto, ask you to deposit a check and wire money back, or pressure you with immediate arrest threats.',
        highlightTerms: [
          { term: 'Fake Check Scam', definition: 'A deposited check bounces days later; you are held responsible for money sent.' },
          { term: 'Phishing', definition: 'Fake messages mimicking real banks or services to steal logins or SSNs.' },
          { term: 'Dark Patterns', definition: 'Deceptive UX tricks like hidden recurring subscription checkouts.' },
        ],
        cocoTip: "Here's the detail to check: If someone demands payment in Apple gift cards or crypto, it is 100% a scam.",
      },
      {
        title: 'Protecting Your Financial Identity',
        body: 'Never share your full Social Security Number, bank login codes, or two-factor authentication tokens over SMS or unverified calls. Enable two-factor authentication on your banking app.',
      },
    ],
    practiceActivity: {
      title: 'Scam Detection Drill',
      prompt: 'You receive an urgent email from "Your Bank Security" saying your debit card is suspended. It contains a link to "Verify Identity Now". What should you do?',
      options: [
        {
          id: 'opt_1',
          label: 'Click the link immediately and enter your card PIN to unfreeze it.',
          feedback: 'Dangerous! Phishing sites mimic bank login pages to steal your credentials.',
          isRecommended: false,
        },
        {
          id: 'opt_2',
          label: 'Do not click the link. Open your bank app directly or call the number on the back of your card.',
          feedback: 'Perfect! Always initiate contact through trusted official channels on the back of your physical card.',
          isRecommended: true,
        },
      ],
    },
    takeaways: [
      'Never send money to claim a prize or start a remote job.',
      'Banks will never ask for your password or one-time code over the phone.',
      'Check bank statements monthly for unauthorized $4.99 - $14.99 recurring subscriptions.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Which payment method demanded by a stranger is almost guaranteed to be a scam?',
        options: ['Store gift cards or cryptocurrency wire', 'Standard bank direct deposit', 'Cash register receipt'],
        correctIndex: 0,
        explanation: 'Gift cards and irreversible crypto transactions are favorite tools of fraudsters.',
      },
      {
        id: 'q2',
        question: 'If you receive an urgent message about a locked account, how should you verify it?',
        options: [
          'Reply to the text with your password',
          'Call the official phone number printed on the back of your physical debit card',
          'Click the link and type your Social Security Number',
        ],
        correctIndex: 1,
        explanation: 'Using the contact number printed on the back of your physical card bypasses fraudulent links.',
      },
      {
        id: 'q3',
        question: 'What happens in a fake check scam?',
        options: [
          'The bank permanently keeps the extra funds for you',
          'The fake check bounces days later, and you are held liable for any money wired out',
          'The sender sends a second bonus check',
        ],
        correctIndex: 1,
        explanation: 'Federal law makes funds temporarily available, but when the counterfeit check bounces, the bank deducts the full amount from your account.',
      },
    ],
    reward: { xp: 150, coins: 50 },
  },
];
