'use client';

import { useState, useEffect } from 'react';
import { getLiveSiteData, defaultSiteData, SiteData } from './content';

export function usePortfolioContent() {
  const [data, setData] = useState<SiteData>(defaultSiteData);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const liveData = await getLiveSiteData();
    setData(liveData);
    setLoading(false);
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener('portfolio-content-updated', handleUpdate);
    return () => window.removeEventListener('portfolio-content-updated', handleUpdate);
  }, []);

  return { data, loading, reload: loadData };
}
