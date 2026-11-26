// data.js — the ledger's figures.
// Every number on The Union Ledger lives here, with the agency that
// published it and the year it covers. One vintage per series: where a
// series was revised after publication, the source line names the vintage
// in use and no other vintage is mixed in. October 2025 has no official
// unemployment rate and no official CPI — the monthly series below carry
// null for that month, and the charts draw the gap instead of joining
// across it. A figure computed from two published figures is labelled
// "derived" wherever it appears.

export const SITE = {
  title: 'The Union Ledger',
  motto: 'The United States, measured.',
  dateline: 'Figures as published · November 2026',
  place: 'United States of America',
};

// Hero rows: [big figure, what it is, detail line, source line, link].
// The first row is the headline; the second row is the rest of the
// country's ledger, so the homepage carries eight figures at a glance.
export const HERO_TOP = [
  ['340.1m', 'People', '1 July 2024 · +1.0% on a year earlier', 'U.S. Census Bureau, Vintage 2024', '#/population'],
  ['$29.38T', 'GDP, 2024', 'Nominal · real growth +3.0%', 'Bureau of Economic Analysis, 2026 annual update', '#/economy'],
  ['4.1%', 'Unemployment', 'October 2026 · payrolls +165,000', 'Bureau of Labor Statistics, Oct 2026', '#/jobs'],
  ['79.0 yrs', 'Life expectancy', '2024 · a record high', 'CDC/NCHS, Mortality in the United States 2024', '#/health'],
];

export const HERO_MORE = [
  ['$918.4bn', 'Trade deficit', 'Goods & services, 2024 · up 17% on 2023', 'U.S. Census Bureau & BEA, Feb 2025', '#/trade'],
  ['$37.6T', 'Federal debt', 'End of FY2025 · up $2.2T in the year', 'U.S. Treasury / GAO, FY2025', '#/debt'],
  ['$83,730', 'Median household income', '2024 · real median, CPS ASEC', 'U.S. Census Bureau, Sep 2025', '#/income'],
  ['10.6%', 'Poverty rate', '2024 · down 0.4 points on 2023', 'U.S. Census Bureau, Sep 2025', '#/income'],
];

// Monthly series as [month, value]; null means the month was not published.
export const UNEMPLOYMENT = [
  ['Jan', 4.0], ['Feb', 4.2], ['Mar', 4.2], ['Apr', 4.2], ['May', 4.3],
  ['Jun', 4.1], ['Jul', 4.3], ['Aug', 4.3], ['Sep', 4.4], ['Oct', null],
  ['Nov', 4.5], ['Dec', 4.4],
];

export const CPI = [
  ['Jan', 3.0], ['Feb', 2.8], ['Mar', 2.4], ['Apr', 2.3], ['May', 2.4],
  ['Jun', 2.7], ['Jul', 2.7], ['Aug', 2.9], ['Sep', 3.0], ['Oct', null],
  ['Nov', 2.7], ['Dec', 2.7],
];

// The sections, in reading order. `no` is the folio number printed at the
// top of the page; `figure` is the one number that stands for the section.
export const SECTIONS = [
  { no: '01', slug: 'population', title: 'Population', figure: '340.1m', blurb: 'People, 1 July 2024 — the fastest growth since 2001.' },
  { no: '02', slug: 'economy', title: 'Economy', figure: '$29.38T', blurb: 'Nominal GDP, 2024 — real growth +3.0%.' },
  { no: '03', slug: 'income', title: 'Income', figure: '$83,730', blurb: 'Median household income, 2024 — poverty 10.6%.' },
  { no: '04', slug: 'jobs', title: 'Jobs', figure: '4.1%', blurb: 'Unemployment, October 2026 — payrolls +165,000.' },
  { no: '05', slug: 'prices', title: 'Prices', figure: '~2.7%', blurb: 'CPI inflation, 2025 annual average.' },
  { no: '06', slug: 'trade', title: 'Trade', figure: '$918.4bn', blurb: 'Goods and services deficit, 2024.' },
  { no: '07', slug: 'health', title: 'Health', figure: '79.0 yrs', blurb: 'Life expectancy, 2024 — a record high.' },
  { no: '08', slug: 'education', title: 'Education', figure: '87.4%', blurb: 'High-school graduation rate, 2022–23.' },
  { no: '09', slug: 'energy', title: 'Energy', figure: '4.30T kWh', blurb: 'Electricity generated, 2024.' },
  { no: '10', slug: 'debt', title: 'Government debt', figure: '$37.6T', blurb: 'Total federal debt, end of FY2025.' },
];

export const POPULATION = {
  total: '340.1 million',
  growth: '+3.3m',
  growthNote: 'People added in the year to 1 July 2024 — the fastest annual growth since 2001. The 2020 census counted 331.5 million.',
  migration: '2.8m',
  migrationNote: 'Net international migration in 2023–24, the driver of the year’s growth.',
  // [state, millions, share of the U.S. population % — derived, rounded].
  // The five together hold 127.04 million people, 37.4% of the country.
  states: [
    ['California', 39.43, 11.6],
    ['Texas', 31.29, 9.2],
    ['Florida', 23.37, 6.9],
    ['New York', 19.87, 5.8],
    ['Pennsylvania', 13.08, 3.8],
  ],
  statesTotal: ['Five largest states', 127.04, 37.4],
  statesNote: 'Millions of people, 1 July 2024. Shares are derived from the published populations and rounded to one decimal place.',
  source: 'U.S. Census Bureau, Vintage 2024 Population Estimates',
};

export const ECONOMY = {
  // [year, nominal GDP $T, real growth % (null where not shown)].
  gdpYears: [
    ['2023', 27.83, null],
    ['2024', 29.38, 3.0],
    ['2025', 30.86, 2.3],
  ],
  perCapita: '~$86,400',
  perCapitaNote: 'GDP per person in 2024, derived from $29.38 trillion divided by 340.1 million people.',
  revisionNote: 'GDP for 2024 was revised in the 2026 annual update: first published as $29.18 trillion with 2.8% real growth. This page uses the revised vintage throughout.',
  source: 'Bureau of Economic Analysis, NIPA Table 1.1.5 (2026 annual update)',
};

export const INCOME = {
  median: '$83,730',
  medianNote: 'Real median household income, 2024. In 2023 it was $82,690 — the change is not statistically significant.',
  poverty: '10.6%',
  povertyNote: 'Official poverty rate, 2024 — down 0.4 percentage points on 2023 (11.0%).',
  spm: '12.9%',
  spmNote: 'Supplemental Poverty Measure, 2024. It counts taxes, transfers and the cost of essentials the official measure leaves out.',
  source: 'U.S. Census Bureau, Income, Poverty and Health Insurance Coverage 2024 (CPS ASEC, released 9 September 2025)',
};

export const JOBS = {
  rate: '4.1%',
  rateNote: 'Unemployment rate, October 2026 — down from 4.2% in September 2026.',
  payrolls: '+165,000',
  payrollsNote: 'Nonfarm payroll jobs added in October 2026, against an average of +48,000 a month over the prior 12 months.',
  participation: '61.9%',
  participationNote: 'Labour-force participation, October 2026. Civilian labour force 170.7 million.',
  employed: '163.6m',
  employedNote: 'People in work, October 2026, of a 170.7 million labour force.',
  unemployed: '7.1m',
  unemployedNote: 'People without work but looking, October 2026.',
  empPop: '59.3%',
  empPopNote: 'Employment–population ratio, October 2026: the share of the population aged 16 and over in work.',
  gapNote: 'October 2025 has no official rate: BLS collected no data from 1 October to 12 November 2025. The chart leaves the month blank rather than guessing.',
  source: 'Bureau of Labor Statistics, Employment Situation, October 2026 (released 6 November 2026)',
};

export const PRICES = {
  annual: '~2.7%',
  annualNote: 'CPI inflation in 2025, annual average (2.63% on the BLS average basis).',
  sep2026: '3.7%',
  sep2026Note: 'CPI, September 2026, year on year — the latest monthly print in this vintage. Shown with its year, apart from the 2025 series below.',
  latest: [
    ['September 2025', '+3.0%'],
    ['November 2025', '+2.7%'],
    ['December 2025', '+2.7%'],
  ],
  latestNote: 'Latest clean monthly year-on-year prints. October 2025 was not published — see the gap note on the Jobs page.',
  source: 'Bureau of Labor Statistics, Consumer Price Index',
};

export const TRADE = {
  deficit: '$918.4bn',
  deficitNote: 'Goods and services deficit, 2024 — up 17% on 2023.',
  goodsDeficit: '$1.21T',
  goodsDeficitNote: 'Goods deficit, a record.',
  services: '$293bn',
  servicesNote: 'Services surplus, 2024 — the offset to the goods deficit.',
  exports: '$3.19T',
  exportsNote: 'Exports of goods and services, a record. Goods exports $2.08T.',
  imports: '$4.11T',
  importsNote: 'Imports of goods and services, a record. Goods imports $3.30T.',
  china: '$295.4bn',
  chinaNote: 'Largest bilateral goods deficit: China.',
  // Ledger of the 2024 balance, billions of dollars (published figures).
  // The overall balance is the last row, as a ledger's total is.
  balance: [
    ['Exports, goods and services', '3,190'],
    ['Imports, goods and services', '4,110'],
    ['Balance, goods only', '−1,210'],
    ['Balance, services only', '+293'],
    ['Goods balance with China', '−295.4'],
    ['Balance, goods and services', '−918.4'],
  ],
  vintageNote: 'This page uses the original February 2025 release. A June 2026 annual revision put the 2024 deficit at $885.5bn; the two vintages are not mixed here.',
  source: 'U.S. Census Bureau & BEA, U.S. International Trade in Goods and Services, Annual 2024 (February 2025)',
};

export const HEALTH = {
  life: '79.0 years',
  lifeNote: 'Life expectancy at birth, 2024 — a record high, up 0.6 years from 78.4 in 2023. Men 76.5 years, women 81.4.',
  deathRate: '722.1',
  deathRateNote: 'Age-adjusted death rate per 100,000 people in 2024, down from 750.5 in 2023.',
  uninsured: '8.0%',
  uninsuredNote: '27.1 million people had no health insurance in 2024; 92.0% had coverage.',
  // [coverage type, % of people].
  coverage: [
    ['Employment-based', 53.8],
    ['Medicare', 19.1],
    ['Medicaid', 17.6],
  ],
  coverageNote: 'Share of people covered, by type of insurance, 2024. Shares overlap: some people hold more than one type.',
  source: 'CDC/NCHS, Mortality in the United States 2024 · U.S. Census Bureau, Health Insurance Coverage 2024',
};

export const EDUCATION = {
  graduation: '87.4%',
  graduationNote: 'Public high-school graduation rate (adjusted cohort graduation rate), school year 2022–23.',
  context: 'The rate has risen steadily since the measure began: it stood at 79% in 2010–11, the first year it was collected, and reached 87.4% in 2022–23. The four-year cohort measure counts students who graduate on time with a regular diploma.',
  source: 'National Center for Education Statistics, Condition of Education',
};

export const ENERGY = {
  generation: '4.30T kWh',
  generationNote: 'Electricity generated in the United States, 2024.',
  // [source, % of generation].
  mix: [
    ['Natural gas', 43],
    ['Renewables', 23],
    ['Nuclear', 18],
    ['Coal', 15],
    ['Petroleum', 0.4],
  ],
  mixNote: 'Share of electricity generation, 2024.',
  // [renewable source, % of all generation].
  renewables: [
    ['Wind', 10.5],
    ['Hydro', 5.5],
    ['Solar', 5.1],
  ],
  renewablesNote: 'Wind, hydro and solar together supplied 21.1% of generation; all renewables supplied 23%.',
  production: '103.31',
  productionNote: 'Quadrillion BTU of total primary energy produced in 2024.',
  source: 'U.S. Energy Information Administration, U.S. Energy Facts 2024',
};

export const DEBT = {
  total: '$37.6T',
  totalNote: 'Total federal debt at the end of fiscal year 2025 (30 September 2025).',
  increase: '+$2.2T',
  increaseNote: 'Added to the total federal debt during FY2025.',
  public: '$30.3T',
  publicNote: 'Debt held by the public.',
  intra: '$7.4T',
  intraNote: 'Intragovernmental holdings — debt the government owes to itself, mostly the Social Security trust funds.',
  deficit: '$1.8T',
  deficitNote: 'Federal budget deficit in fiscal year 2025.',
  // Ledger of the FY2025 debt, trillions of dollars (published figures,
  // rounded to one decimal: the components sum to $37.7 trillion against
  // a published total of $37.6 trillion).
  ledger: [
    ['Total federal debt', '37.6'],
    ['Held by the public', '30.3'],
    ['Intragovernmental', '7.4'],
    ['Budget deficit, FY2025', '1.8'],
    ['Debt added in FY2025', '2.2'],
  ],
  source: 'U.S. Treasury / GAO, Schedules of Federal Debt, FY2025',
};
