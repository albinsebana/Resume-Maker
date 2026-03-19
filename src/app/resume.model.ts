export interface PersonalInfo {
  fullName:  string;
  jobTitle:  string;
  email:     string;
  phone:     string;
  location:  string;
  website:   string;
  linkedin:  string;
  portfolio: string;
  linkedinMask:   boolean;
  linkedinLabel:  string;
  portfolioMask:  boolean;
  portfolioLabel: string;
  websiteMask:    boolean;
  websiteLabel:   string;
  summary:   string;
  photo?:    string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  grade: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
  customCategory?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export interface SoftSkill {
  id: string;
  name: string;
}

// ── Per-section style configs ──────────────────────────────────────
export interface PersonalStyle {
  nameFontSize:      number;
  nameFontWeight:    string;
  jobTitleFontSize:  number;
  jobTitleColor:     string;
  contactFontSize:   number;
  summaryFontSize:   number;
  summaryLineHeight: number;
  summaryTopGap:     number;  // gap above SUMMARY section (px)
  summaryPadding:    number;  // padding above/below summary text (px)
}

export interface ExperienceStyle {
  titleFontSize:    number;
  titleFontWeight:  string;
  companyFontSize:  number;
  companyColor:     string;
  dateFontSize:     number;
  bulletChar:       string;
  bulletFontSize:   number;
  bulletLineHeight: number;
  entrySpacing:     number;
}

export interface EducationStyle {
  titleFontSize:       number;
  titleFontWeight:     string;
  institutionFontSize: number;
  institutionColor:    string;
  dateFontSize:        number;
  entrySpacing:        number;
}

export interface SkillStyle {
  categoryFontSize:   number;
  categoryFontWeight: string;
  skillFontSize:      number;
  showSkillBars:      boolean;
  tagBordered:        boolean;
  rowGap:             number;
  headerSkillGap:     number;
  tagPaddingH:        number;
}

export interface ProjectStyle {
  titleFontSize:    number;
  titleFontWeight:  string;
  techFontSize:     number;
  bulletChar:       string;
  bulletFontSize:   number;
  bulletLineHeight: number;
  cardBackground:   boolean;
}

export interface LanguageStyle {
  tagBordered: boolean;
  fontSize:    number;
  tagPaddingH: number;  // horizontal padding inside tag (px)
  tagPaddingV: number;  // vertical padding inside tag (px)
  tagGap:      number;  // gap between tags (px)
}

export interface SoftSkillStyle {
  tagBordered: boolean;
  fontSize:    number;
  tagPaddingH: number;
  tagPaddingV: number;
  tagGap:      number;
}

// ── Global style config ────────────────────────────────────────────
export interface StyleConfig {
  accentColor:          string;
  fontFamily:           string;
  pagePadding:          number;
  pageTopPadding:       number;  // ← top padding only (mm)
  sectionSpacing:       number;
  sectionTitleSize:     number;
  sectionTitleWeight:   string;
  headingFontSize:      number;
  bodyFontSize:         number;
  headingFontWeight:    string;
  lineHeight:           number;
  langTagBordered:      boolean;
  softSkillTagBordered: boolean;
  personal:   PersonalStyle;
  experience: ExperienceStyle;
  education:  EducationStyle;
  skills:     SkillStyle;
  projects:   ProjectStyle;
  languages:  LanguageStyle;
  softSkills: SoftSkillStyle;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences:  Experience[];
  education:    Education[];
  skills:       Skill[];
  projects:     Project[];
  languages:    Language[];
  softSkills:   SoftSkill[];
  styleConfig:  StyleConfig;
}