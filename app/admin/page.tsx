'use client';

import { useState, useEffect } from 'react';
import { Lock, Save, RotateCcw, Trash2, Plus, ExternalLink, MessageSquare, Check, ShieldCheck, User, Briefcase, Award, Layers, FileText } from 'lucide-react';
import { getLiveSiteData, saveLiveSiteData, defaultSiteData, SiteData } from '@/lib/content';
import { supabase } from '@/lib/supabase';

interface ContactMessage {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export default function AdminPage() {
  const [passcode, setPasscode] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'skills' | 'experience' | 'messages'>('profile');
  
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  useEffect(() => {
    // Check if already authenticated in this session
    const sessionAuth = sessionStorage.getItem('admin_authenticated');
    if (sessionAuth === 'true') {
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      loadContent();
      fetchMessages();
    }
  }, [authenticated]);

  const loadContent = async () => {
    const data = await getLiveSiteData();
    setSiteData(data);
  };

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        setMessages(data);
      }
    } catch (err) {
      console.warn('Error fetching messages:', err);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      await supabase.from('contact_messages').delete().eq('id', id);
      setMessages(messages.filter((m) => m.id !== id));
    } catch (err) {
      alert('Failed to delete message.');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'harish2026' || passcode === 'admin123' || passcode === '9345530058') {
      setAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect Admin Passcode. Try again!');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus(null);
    const result = await saveLiveSiteData(siteData);
    setSaving(false);
    if (result.success) {
      setSaveStatus({ type: 'success', msg: result.message });
      setTimeout(() => setSaveStatus(null), 4000);
    } else {
      setSaveStatus({ type: 'error', msg: 'Failed to save updates.' });
    }
  };

  const handleResetDefault = () => {
    if (confirm('Are you sure you want to reset all content back to original resume data?')) {
      setSiteData(defaultSiteData);
      saveLiveSiteData(defaultSiteData);
      alert('Site data reset to defaults!');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-6 text-on-surface">
        <div className="w-full max-w-md bg-surface-container/90 backdrop-blur-xl border border-outline-variant/30 rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col items-center gap-3 text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary-container/20 border border-primary/30 flex items-center justify-center text-primary">
              <Lock size={28} />
            </div>
            <h1 className="text-title-lg font-bold text-on-surface">Client Admin Dashboard</h1>
            <p className="text-body-md text-on-surface-variant">
              Enter passcode to manage portfolio content & recruiter messages.
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="text-label-md text-on-surface-variant mb-1.5 block">Passcode</label>
              <input
                type="password"
                placeholder="Enter passcode (harish2026)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 bg-surface-container-high border border-outline-variant/40 rounded-xl text-on-surface focus:outline-none focus:border-primary transition-colors text-body-md"
              />
            </div>

            {authError && (
              <p className="text-error text-label-md bg-error-container/20 p-3 rounded-lg border border-error/30 text-center">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-primary-container hover:bg-cobalt text-on-primary-container text-label-lg font-bold rounded-xl transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              <ShieldCheck size={20} /> Access Admin Dashboard
            </button>
          </form>

          <p className="text-label-sm text-on-surface-variant/60 text-center mt-6">
            Default Passcode: <code className="text-primary font-mono font-bold">harish2026</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      {/* Top Navbar */}
      <header className="bg-surface-container border-b border-outline-variant/30 px-6 py-4 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <h1 className="text-title-md font-bold text-on-surface uppercase tracking-wider">
              {siteData.siteConfig.name} — Admin Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant text-label-md rounded-lg transition-colors flex items-center gap-1.5"
            >
              <ExternalLink size={16} /> View Live Site
            </a>

            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-primary-container hover:bg-cobalt text-on-primary-container text-label-md font-bold rounded-lg transition-all shadow-md shadow-primary/20 flex items-center gap-2 disabled:opacity-50"
            >
              <Save size={16} /> {saving ? 'Saving...' : 'Save & Publish Live'}
            </button>

            <button
              onClick={handleResetDefault}
              className="px-3.5 py-2 bg-error-container/20 hover:bg-error-container/40 text-error text-label-md rounded-lg transition-colors flex items-center gap-1.5 border border-error/30"
              title="Reset to default resume data"
            >
              <RotateCcw size={16} /> Reset
            </button>
          </div>
        </div>
      </header>

      {/* Save Notification */}
      {saveStatus && (
        <div
          className={`px-6 py-3 text-center text-label-lg font-semibold transition-all ${
            saveStatus.type === 'success' ? 'bg-primary-container text-on-primary-container' : 'bg-error-container text-error'
          }`}
        >
          {saveStatus.msg}
        </div>
      )}

      {/* Main Admin Content */}
      <div className="max-w-7xl mx-auto w-full px-6 py-8 flex-1 flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 flex flex-col gap-2">
          {[
            { id: 'profile', label: 'Profile & Contact', icon: User },
            { id: 'projects', label: 'Projects', icon: Briefcase },
            { id: 'skills', label: 'Skills Matrix', icon: Layers },
            { id: 'experience', label: 'Experience & Education', icon: Award },
            { id: 'messages', label: `Messages (${messages.length})`, icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-label-lg font-medium transition-all text-left ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-bold shadow-md shadow-primary/10'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <Icon size={18} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        <div className="flex-1 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-xl">
          {/* TAB 1: PROFILE & CONTACT */}
          {activeTab === 'profile' && (
            <div className="flex flex-col gap-6">
              <h2 className="text-title-lg font-bold text-on-surface border-b border-outline-variant/30 pb-3">
                Profile Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-label-md text-on-surface-variant mb-1 block">Full Name</label>
                  <input
                    type="text"
                    value={siteData.siteConfig.name}
                    onChange={(e) =>
                      setSiteData({
                        ...siteData,
                        siteConfig: { ...siteData.siteConfig, name: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-surface-container border border-outline-variant/40 rounded-xl text-on-surface text-body-md"
                  />
                </div>

                <div>
                  <label className="text-label-md text-on-surface-variant mb-1 block">Tagline / Role</label>
                  <input
                    type="text"
                    value={siteData.siteConfig.tagline}
                    onChange={(e) =>
                      setSiteData({
                        ...siteData,
                        siteConfig: { ...siteData.siteConfig, tagline: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-surface-container border border-outline-variant/40 rounded-xl text-on-surface text-body-md"
                  />
                </div>

                <div>
                  <label className="text-label-md text-on-surface-variant mb-1 block">Email Address</label>
                  <input
                    type="text"
                    value={siteData.siteConfig.email}
                    onChange={(e) =>
                      setSiteData({
                        ...siteData,
                        siteConfig: { ...siteData.siteConfig, email: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-surface-container border border-outline-variant/40 rounded-xl text-on-surface text-body-md"
                  />
                </div>

                <div>
                  <label className="text-label-md text-on-surface-variant mb-1 block">Phone Number</label>
                  <input
                    type="text"
                    value={siteData.siteConfig.phoneDisplay}
                    onChange={(e) =>
                      setSiteData({
                        ...siteData,
                        siteConfig: {
                          ...siteData.siteConfig,
                          phoneDisplay: e.target.value,
                          phone: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-surface-container border border-outline-variant/40 rounded-xl text-on-surface text-body-md"
                  />
                </div>

                <div>
                  <label className="text-label-md text-on-surface-variant mb-1 block">Location</label>
                  <input
                    type="text"
                    value={siteData.siteConfig.location}
                    onChange={(e) =>
                      setSiteData({
                        ...siteData,
                        siteConfig: { ...siteData.siteConfig, location: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-surface-container border border-outline-variant/40 rounded-xl text-on-surface text-body-md"
                  />
                </div>

                <div>
                  <label className="text-label-md text-on-surface-variant mb-1 block">Portrait Photo URL</label>
                  <input
                    type="text"
                    value={siteData.siteConfig.portraitUrl}
                    onChange={(e) =>
                      setSiteData({
                        ...siteData,
                        siteConfig: { ...siteData.siteConfig, portraitUrl: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-surface-container border border-outline-variant/40 rounded-xl text-on-surface text-body-md"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="text-label-md text-on-surface-variant mb-1 block">Hero Introduction Text</label>
                <textarea
                  rows={3}
                  value={siteData.heroIntro}
                  onChange={(e) => setSiteData({ ...siteData, heroIntro: e.target.value })}
                  className="w-full px-4 py-2.5 bg-surface-container border border-outline-variant/40 rounded-xl text-on-surface text-body-md"
                />
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
                <h2 className="text-title-lg font-bold text-on-surface">Projects Management</h2>
                <button
                  onClick={() => {
                    const newProj = {
                      id: `proj_${Date.now()}`,
                      title: 'New SAP FI Project',
                      category: 'SAP FI / Financial Accounting',
                      period: '2026',
                      scope: 'Custom SAP Implementation & Configuration',
                      summary: 'Enter project summary description here.',
                      achievements: ['Configured GL, AP, AR modules', 'Executed end-to-end testing'],
                      tags: ['SAP FI', 'GL', 'AP', 'AR'],
                      featured: true,
                    };
                    setSiteData({
                      ...siteData,
                      featuredProject: newProj,
                    });
                  }}
                  className="px-3 py-1.5 bg-primary-container text-on-primary-container text-label-md rounded-lg flex items-center gap-1 font-semibold"
                >
                  <Plus size={16} /> Edit Featured Project
                </button>
              </div>

              <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col gap-4">
                <h3 className="text-title-md font-bold text-primary">Featured Project Details</h3>

                <div>
                  <label className="text-label-sm text-on-surface-variant block mb-1">Project Title</label>
                  <input
                    type="text"
                    value={siteData.featuredProject.title}
                    onChange={(e) =>
                      setSiteData({
                        ...siteData,
                        featuredProject: { ...siteData.featuredProject, title: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 bg-surface-container-high border border-outline-variant/40 rounded-lg text-on-surface"
                  />
                </div>

                <div>
                  <label className="text-label-sm text-on-surface-variant block mb-1">Scope</label>
                  <input
                    type="text"
                    value={siteData.featuredProject.scope}
                    onChange={(e) =>
                      setSiteData({
                        ...siteData,
                        featuredProject: { ...siteData.featuredProject, scope: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 bg-surface-container-high border border-outline-variant/40 rounded-lg text-on-surface"
                  />
                </div>

                <div>
                  <label className="text-label-sm text-on-surface-variant block mb-1">Summary</label>
                  <textarea
                    rows={3}
                    value={siteData.featuredProject.summary}
                    onChange={(e) =>
                      setSiteData({
                        ...siteData,
                        featuredProject: { ...siteData.featuredProject, summary: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 bg-surface-container-high border border-outline-variant/40 rounded-lg text-on-surface"
                  />
                </div>

                <div>
                  <label className="text-label-sm text-on-surface-variant block mb-1">
                    Key Achievements (comma separated)
                  </label>
                  <input
                    type="text"
                    value={siteData.featuredProject.achievements.join(', ')}
                    onChange={(e) =>
                      setSiteData({
                        ...siteData,
                        featuredProject: {
                          ...siteData.featuredProject,
                          achievements: e.target.value.split(',').map((s) => s.trim()),
                        },
                      })
                    }
                    className="w-full px-4 py-2 bg-surface-container-high border border-outline-variant/40 rounded-lg text-on-surface"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SKILLS MATRIX */}
          {activeTab === 'skills' && (
            <div className="flex flex-col gap-6">
              <h2 className="text-title-lg font-bold text-on-surface border-b border-outline-variant/30 pb-3">
                Skills Taxonomy Matrix
              </h2>

              {siteData.skillsCategories.map((cat, catIdx) => (
                <div key={cat.title} className="p-4 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col gap-3">
                  <h3 className="text-title-md font-bold text-primary">{cat.title}</h3>
                  <div>
                    <label className="text-label-sm text-on-surface-variant block mb-1">
                      Skills List (comma separated)
                    </label>
                    <input
                      type="text"
                      value={cat.skills.join(', ')}
                      onChange={(e) => {
                        const updatedCats = [...siteData.skillsCategories];
                        updatedCats[catIdx].skills = e.target.value.split(',').map((s) => s.trim());
                        setSiteData({ ...siteData, skillsCategories: updatedCats });
                      }}
                      className="w-full px-4 py-2 bg-surface-container-high border border-outline-variant/40 rounded-lg text-on-surface"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: EXPERIENCE & EDUCATION */}
          {activeTab === 'experience' && (
            <div className="flex flex-col gap-6">
              <h2 className="text-title-lg font-bold text-on-surface border-b border-outline-variant/30 pb-3">
                Experience & Academic Background
              </h2>

              <div className="flex flex-col gap-4">
                <h3 className="text-title-md font-bold text-primary">Work Experience</h3>
                {siteData.experienceItems.map((exp, idx) => (
                  <div key={idx} className="p-4 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-label-sm text-on-surface-variant block">Role</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => {
                            const updated = [...siteData.experienceItems];
                            updated[idx].role = e.target.value;
                            setSiteData({ ...siteData, experienceItems: updated });
                          }}
                          className="w-full px-3 py-1.5 bg-surface-container-high border border-outline-variant/40 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="text-label-sm text-on-surface-variant block">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const updated = [...siteData.experienceItems];
                            updated[idx].company = e.target.value;
                            setSiteData({ ...siteData, experienceItems: updated });
                          }}
                          className="w-full px-3 py-1.5 bg-surface-container-high border border-outline-variant/40 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: RECRUITER MESSAGES */}
          {activeTab === 'messages' && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
                <h2 className="text-title-lg font-bold text-on-surface">Submitted Recruiter Messages</h2>
                <span className="px-3 py-1 bg-primary-container text-on-primary-container text-label-md rounded-full font-bold">
                  {messages.length} Messages
                </span>
              </div>

              {messages.length === 0 ? (
                <div className="py-12 text-center text-on-surface-variant bg-surface-container/40 rounded-xl border border-dashed border-outline-variant/40">
                  <MessageSquare size={36} className="mx-auto mb-2 text-on-surface-variant/40" />
                  <p className="text-body-lg font-medium">No contact messages received yet.</p>
                  <p className="text-body-md text-on-surface-variant/70">
                    Messages submitted from your portfolio website will appear here in real-time.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-5 bg-surface-container rounded-xl border border-outline-variant/40 flex flex-col gap-3 shadow-md"
                    >
                      <div className="flex items-start justify-between gap-4 border-b border-outline-variant/20 pb-3">
                        <div>
                          <h3 className="text-title-md font-bold text-on-surface">{msg.name}</h3>
                          <div className="flex flex-wrap items-center gap-3 text-label-md text-primary mt-0.5">
                            <span>{msg.email}</span>
                            {msg.phone && <span>• {msg.phone}</span>}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-label-sm text-on-surface-variant">
                            {new Date(msg.created_at).toLocaleDateString()}
                          </span>
                          <button
                            onClick={() => deleteMessage(msg.id)}
                            className="p-1.5 text-error hover:bg-error-container/20 rounded-lg transition-colors"
                            title="Delete message"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>

                      {msg.subject && (
                        <p className="text-label-lg font-semibold text-on-surface">
                          Subject: {msg.subject}
                        </p>
                      )}

                      <p className="text-body-md text-on-surface-variant bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/20 whitespace-pre-wrap">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
