// data.js — every figure on The Union Ledger, with its source and year.
// All figures were checked against their primary source (Census, BEA, BLS,
// Treasury/GAO, CDC/NCHS, NCES, EIA). One vintage per series; where a series
// was revised, the vintage used is stated in the source line. No figure here
// is a model estimate presented as an official release.

export const SITE = {
  name: 'The Union Ledger',
  tagline: 'The United States, measured.',
  dateline: 'Figures as published · November 2026',
  country: 'United States of America',
};

export const HERO = [
  {
    value: '340.1m',
    label: 'People',
    detail: '1 July 2024 · +1.0% on a year earlier',
    source: 'U.S. Census Bureau, Vintage 2024',
    route: '#/population',
  },
  {
    value: '$29.38T',
    label: 'GDP, 2024',
    detail: 'Nominal · real growth +3.0%',
    source: 'Bureau of Economic Analysis, 2026 annual update',
    route: '#/economy',
  },
  {
    value: '4.1%',
    label: 'Unemployment',
    detail: 'October 2026 · payrolls +165,000',
    source: 'Bureau of Labor Statistics, Oct 2026',
    route: '#/jobs',
  },
  {
    value: '79.0 yrs',
    label: 'Life expectancy',
    detail: '2024 · a record high',
    source: 'CDC/NCHS, Mortality in the United States 2024',
    route: '#/health',
  },
];

// Monthly unemployment rate, 2025 (%). October is null: BLS published no
// October 2025 rate — no data was collected 1 Oct–12 Nov 2025 during the
// federal funding lapse. The gap is shown as a gap, never filled in.
export const UNEMPLOYMENT_2025 = [
  { m: 'Jan', v: 4.0 }, { m: 'Feb', v: 4.2 }, { m: 'Mar', v: 4.2 },
  { m: 'Apr', v: 4.2 }, { m: 'May', v: 4.3 }, { m: 'Jun', v: 4.1 },
  { m: 'Jul', v: 4.3 }, { m: 'Aug', v: 4.3 }, { m: 'Sep', v: 4.4 },
  { m: 'Oct', v: null }, { m: 'Nov', v: 4.5 }, { m: 'Dec', v: 4.4 },
];

// CPI-U, year-on-year %, 2025. October is null for the same reason as above.
export const CPI_2025 = [
  { m: 'Jan', v: 3.0 }, { m: 'Feb', v: 2.8 }, { m: 'Mar', v: 2.4 },
  { m: 'Apr', v: 2.3 }, { m: 'May', v: 2.4 }, { m: 'Jun', v: 2.7 },
  { m: 'Jul', v: 2.7 }, { m: 'Aug', v: 2.9 }, { m: 'Sep', v: 3.0 },
  { m: 'Oct', v: null }, { m: 'Nov', v: 2.7 }, { m: 'Dec', v: 2.7 },
];

export const POPULATION = {
  total: '340.1 million',
  totalNote: 'The 2020 census counted 331.5 million; growth since then has been driven by migration, not births.',
  driver: 'Growth was driven by net international migration: 2.8 million people in 2023–24.',
  states: [
    { name: 'California', v: 39.43 },
    { name: 'Texas', v: 31.29 },
    { name: 'Florida', v: 23.37 },
    { name: 'New York', v: 19.87 },
    { name: 'Pennsylvania', v: 13.08 },
  ],
  statesNote: 'The five largest states hold about 39% of the country. Figures are millions, Vintage 2024.',
  source: 'U.S. Census Bureau, Vintage 2024 Population Estimates',
};

export const ECONOMY = {
  gdp: [
    { year: '2023', v: 27.83 },
    { year: '2024', v: 29.38 },
    { year: '2025', v: 30.86 },
  ],
  gdpNote: 'Nominal GDP, trillions of dollars. Real growth: +3.0% in 2024 and +2.3% in 2025.',
  perCapita: '~$86,400',
  perCapitaNote: 'GDP per person in 2024, derived from $29.38 trillion divided by 340.1 million people.',
  revisionNote: 'GDP for 2024 was revised in the 2026 annual update (first published as $29.18 trillion, 2.8% real growth). This page uses the revised vintage throughout.',
  source: 'Bureau of Economic Analysis, NIPA Table 1.1.5 (2026 annual update)',
};

export const JOBS = {
  rate: '4.1%',
  rateNote: 'Unemployment rate, October 2026 — down from 4.2% in September 2026.',
  payrolls: '+165,000',
  payrollsNote: 'Nonfarm payroll jobs added in October 2026, against an average of +48,000 a month over the prior 12 months.',
  labourForce: '170.7m',
  employed: '163.6m',
  unemployed: '7.1m',
  participation: '61.9%',
  empPop: '59.3%',
  detailNote: 'Civilian labour force 170.7 million; 163.6 million employed, 7.1 million unemployed. Labour-force participation 61.9%; employment–population ratio 59.3%.',
  gapNote: 'October 2025 has no official rate: BLS collected no data from 1 October to 12 November 2025. The chart leaves the month blank rather than guessing.',
  source: 'Bureau of Labor Statistics, Employment Situation, October 2026 (released 6 November 2026)',
};

export const PRICES = {
  annual: '~2.7%',
  annualNote: 'CPI inflation in 2025, annual average (2.63% on the BLS average basis).',
  latest: [
    { label: 'September 2025', v: '+3.0%' },
    { label: 'November 2025', v: '+2.7%' },
    { label: 'December 2025', v: '+2.7%' },
  ],
  latestNote: 'Latest clean monthly year-on-year prints. October 2025 was not published — see the gap note on the Jobs page.',
  source: 'Bureau of Labor Statistics, Consumer Price Index',
};

export const TRADE = {
  deficit: '$918.4bn',
  deficitNote: 'Goods and services deficit, 2024 — up 17% on 2023.',
  goodsDeficit: '$1.21T',
  goodsDeficitNote: 'Goods deficit, a record. The services surplus was $293bn.',
  exports: '$3.19T',
  exportsNote: 'Exports of goods and services, a record. Goods exports $2.08T.',
  imports: '$4.11T',
  importsNote: 'Imports of goods and services, a record. Goods imports $3.30T.',
  china: '$295.4bn',
  chinaNote: 'Largest bilateral goods deficit: China.',
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
  coverage: [
    { name: 'Employment-based', v: 53.8 },
    { name: 'Medicare', v: 19.1 },
    { name: 'Medicaid', v: 17.6 },
  ],
  coverageNote: 'Share of people covered, by type of insurance, 2024. Shares overlap: some people hold more than one type.',
  source: 'CDC/NCHS, Mortality in the United States 2024 · U.S. Census Bureau, Health Insurance Coverage 2024',
};

export const EDUCATION = {
  graduation: '87.4%',
  graduationNote: 'Public high-school graduation rate (adjusted cohort graduation rate), school year 2022–23.',
  context: 'The rate has risen steadily for a decade: it stood at 79% in 2010–11. The four-year cohort measure counts students who graduate on time with a regular diploma.',
  source: 'National Center for Education Statistics, Condition of Education',
};

export const ENERGY = {
  generation: '4.30T kWh',
  generationNote: 'Electricity generated in the United States, 2024.',
  mix: [
    { name: 'Natural gas', v: 43 },
    { name: 'Renewables', v: 23 },
    { name: 'Nuclear', v: 18 },
    { name: 'Coal', v: 15 },
    { name: 'Petroleum', v: 0.4 },
  ],
  mixNote: 'Share of electricity generation, 2024. Within renewables: wind 10.5%, hydro 5.5%, solar 5.1%.',
  production: '103.31',
  productionNote: 'Quadrillion BTU of total primary energy produced in 2024.',
  source: 'U.S. Energy Information Administration, U.S. Energy Facts 2024',
};

export const DEBT = {
  total: '$37.6T',
  totalNote: 'Total federal debt at the end of fiscal year 2025 (30 September 2025), up $2.2 trillion in the year.',
  public: '$30.3T',
  publicNote: 'Debt held by the public.',
  intra: '$7.4T',
  intraNote: 'Intragovernmental holdings — debt the government owes to itself, mostly the Social Security trust funds.',
  deficit: '$1.8T',
  deficitNote: 'Federal budget deficit in fiscal year 2025.',
  source: 'U.S. Treasury / GAO, Schedules of Federal Debt, FY2025',
};

export const SECTIONS = [
  { route: '#/population', title: 'Population', figure: '340.1m', blurb: 'People, 1 July 2024 — the fastest growth since 2001.' },
  { route: '#/economy', title: 'Economy', figure: '$29.38T', blurb: 'Nominal GDP, 2024 — real growth +3.0%.' },
  { route: '#/jobs', title: 'Jobs', figure: '4.1%', blurb: 'Unemployment, October 2026 — payrolls +165,000.' },
  { route: '#/prices', title: 'Prices', figure: '~2.7%', blurb: 'CPI inflation, 2025 annual average.' },
  { route: '#/trade', title: 'Trade', figure: '$918.4bn', blurb: 'Goods and services deficit, 2024.' },
  { route: '#/health', title: 'Health', figure: '79.0 yrs', blurb: 'Life expectancy, 2024 — a record high.' },
  { route: '#/education', title: 'Education', figure: '87.4%', blurb: 'High-school graduation rate, 2022–23.' },
  { route: '#/energy', title: 'Energy', figure: '4.30T kWh', blurb: 'Electricity generated, 2024.' },
  { route: '#/debt', title: 'Government debt', figure: '$37.6T', blurb: 'Total federal debt, end of FY2025.' },
];
