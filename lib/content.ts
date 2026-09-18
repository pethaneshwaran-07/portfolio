import { supabase } from './supabase';
import {
  siteConfig as defaultSiteConfig,
  heroIntro as defaultHeroIntro,
  heroBadges as defaultHeroBadges,
  aboutSection as defaultAboutSection,
  sapModules as defaultSapModules,
  featuredProject as defaultFeaturedProject,
  experienceItems as defaultExperienceItems,
  educationItems as defaultEducationItems,
  skillsCategories as defaultSkillsCategories,
  navLinks as defaultNavLinks,
} from './data';

export interface SiteData {
  siteConfig: typeof defaultSiteConfig;
  heroIntro: string;
  heroBadges: typeof defaultHeroBadges;
  aboutSection: typeof defaultAboutSection;
  sapModules: typeof defaultSapModules;
  featuredProject: typeof defaultFeaturedProject;
  experienceItems: typeof defaultExperienceItems;
  educationItems: typeof defaultEducationItems;
  skillsCategories: typeof defaultSkillsCategories;
}

export const defaultSiteData: SiteData = {
  siteConfig: defaultSiteConfig,
  heroIntro: defaultHeroIntro,
  heroBadges: defaultHeroBadges,
  aboutSection: defaultAboutSection,
  sapModules: defaultSapModules,
  featuredProject: defaultFeaturedProject,
  experienceItems: defaultExperienceItems,
  educationItems: defaultEducationItems,
  skillsCategories: defaultSkillsCategories,
};

const STORAGE_KEY = 'harish_portfolio_live_content';

export async function getLiveSiteData(): Promise<SiteData> {
  try {
    // 1. Try Supabase site_content table
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

  // 2. Fallback to browser localStorage if on client side
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

  // Always save to localStorage on client side as fallback
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    // Trigger custom event so components re-render immediately
    window.dispatchEvent(new Event('portfolio-content-updated'));
  }

  return {
    success: true,
    message: supabaseSaved
      ? 'Content saved and published live to Supabase successfully!'
      : 'Content saved locally in browser state!',
  };
}
