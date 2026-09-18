import { supabase } from './supabase';
import {
  siteConfig as defaultSiteConfig,
  heroIntro as defaultHeroIntro,
  heroBadges as defaultHeroBadges,
  aboutNarrative as defaultAboutNarrative,
  sapModules as defaultSapModules,
  experiences as defaultExperiences,
  education as defaultEducation,
  skillCategories as defaultSkillCategories,
  navLinks as defaultNavLinks,
} from './data';

export interface SkillCategoryItem {
  icon?: string;
  title: string;
  color?: string;
  footer?: string;
  skills: string[];
}

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  color?: string;
  tasks: { icon: string; text: string }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  color?: string;
  focus: string;
}

export interface SiteData {
  siteConfig: typeof defaultSiteConfig;
  heroIntro: string;
  heroBadges: typeof defaultHeroBadges;
  aboutNarrative: typeof defaultAboutNarrative;
  sapModules: typeof defaultSapModules;
  experiences: ExperienceItem[];
  education: EducationItem[];
  skillCategories: SkillCategoryItem[];
}

export const defaultSiteData: SiteData = {
  siteConfig: defaultSiteConfig,
  heroIntro: defaultHeroIntro,
  heroBadges: defaultHeroBadges,
  aboutNarrative: defaultAboutNarrative,
  sapModules: defaultSapModules,
  experiences: defaultExperiences as any,
  education: defaultEducation as any,
  skillCategories: defaultSkillCategories as any,
};

const STORAGE_KEY = 'harish_portfolio_live_content';

export async function getLiveSiteData(): Promise<SiteData> {
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('content')
      .eq('id', 1)
      .maybeSingle();

    if (!error && data?.content) {
      return {
        ...defaultSiteData,
        ...data.content,
      };
    }
  } catch (err) {
    console.warn('Supabase content fetch warning, using fallback:', err);
  }

  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      try {
        return {
          ...defaultSiteData,
          ...JSON.parse(cached),
        };
      } catch (e) {
        // ignore parse error
      }
    }
  }

  return defaultSiteData;
}

export async function saveLiveSiteData(newData: SiteData): Promise<{ success: boolean; message: string }> {
  let supabaseSaved = false;

  try {
    const { error } = await supabase
      .from('site_content')
      .upsert({ id: 1, content: newData, updated_at: new Date().toISOString() });

    if (!error) {
      supabaseSaved = true;
    }
  } catch (err) {
    console.warn('Supabase save failed:', err);
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    window.dispatchEvent(new Event('portfolio-content-updated'));
  }

  return {
    success: true,
    message: supabaseSaved
      ? 'Content saved and published live to Supabase successfully!'
      : 'Content saved locally in browser state!',
  };
}
