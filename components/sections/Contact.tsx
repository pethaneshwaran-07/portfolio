'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Download, ExternalLink, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { siteConfig } from '@/lib/data';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { submitContactMessage } from '@/app/actions/contact';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const res = await submitContactMessage(formState);

    if (res.success) {
      setStatus('success');
      setFormState({ name: '', email: '', phone: '', message: '' });
    } else {
      setStatus('error');
      setErrorMessage(res.error || 'Failed to submit message to Supabase.');
    }
  };

  return (
    <section className="w-full px-6 lg:px-8 py-8 bg-surface-container-lowest scroll-mt-20" id="contact">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        <SectionHeading
          label="Immediate Availability"
          title="Let's Connect"
          description="Interested in full-time opportunities, trainee positions, and associate roles in SAP Finance (FI/FICO) and Enterprise Accounting."
          align="center"
        />

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email */}
          <ScrollReveal delay={0.1}>
            <a
              href={`mailto:${siteConfig.email}`}
              className="p-6 bg-surface-container-low hover:bg-surface-container transition-all duration-300 rounded-xl flex flex-col items-center text-center gap-2 shadow-sm group h-full"
            >
              <div className="w-12 h-12 rounded-full bg-primary-container/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <span className="text-label-sm text-on-surface-variant uppercase font-semibold">Email Address</span>
              <span className="text-headline-sm text-on-surface font-semibold break-all">{siteConfig.email}</span>
              <span className="text-label-sm text-primary mt-1 inline-flex items-center gap-1">
                Send Direct Email <ExternalLink size={12} />
              </span>
            </a>
          </ScrollReveal>

          {/* Phone */}
          <ScrollReveal delay={0.2}>
            <a
              href={`tel:${siteConfig.phone}`}
              className="p-6 bg-surface-container-low hover:bg-surface-container transition-all duration-300 rounded-xl flex flex-col items-center text-center gap-2 shadow-sm group h-full"
            >
              <div className="w-12 h-12 rounded-full bg-secondary-container/20 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone size={24} />
              </div>
              <span className="text-label-sm text-on-surface-variant uppercase font-semibold">Direct Mobile</span>
              <span className="text-headline-sm text-on-surface font-semibold">{siteConfig.phoneDisplay}</span>
              <span className="text-label-sm text-secondary mt-1 inline-flex items-center gap-1">
                Call Directly <Phone size={12} />
              </span>
            </a>
          </ScrollReveal>

          {/* Location */}
          <ScrollReveal delay={0.3}>
            <div className="p-6 bg-surface-container-low rounded-xl flex flex-col items-center text-center gap-2 shadow-sm h-full">
              <div className="w-12 h-12 rounded-full bg-tertiary-container/20 text-tertiary flex items-center justify-center">
                <MapPin size={24} />
              </div>
              <span className="text-label-sm text-on-surface-variant uppercase font-semibold">Location Base</span>
              <span className="text-headline-sm text-on-surface font-semibold">{siteConfig.location}</span>
              <span className="text-label-sm text-tertiary mt-1">Open to Relocation / Pan-India</span>
            </div>
          </ScrollReveal>
        </div>

        {/* Supabase Connected Contact Form */}
        <ScrollReveal delay={0.2}>
          <div className="p-6 sm:p-8 bg-surface-container rounded-2xl border border-outline-variant/30 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                <h3 className="text-headline-md text-on-surface">Send Message to Harish</h3>
              </div>
              <p className="text-body-sm text-on-surface-variant">
                Messages are directly stored in Supabase backend database for immediate review.
              </p>
            </div>

            {status === 'success' ? (
              <div className="p-6 bg-primary-container/15 border border-primary/40 rounded-xl flex flex-col items-center text-center gap-2 text-primary">
                <CheckCircle2 size={36} />
                <h4 className="text-headline-sm font-semibold">Message Received Successfully!</h4>
                <p className="text-body-sm text-on-surface-variant">
                  Thank you for reaching out. Harish will review your inquiry and respond shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 px-4 py-1.5 bg-primary-container text-on-primary-container text-label-sm rounded-lg hover:bg-cobalt transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {status === 'error' && (
                  <div className="p-4 bg-error-container/20 border border-error/40 rounded-lg flex items-center gap-2 text-error text-body-sm">
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-sm text-on-surface-variant">
                      Your Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Recruiter / Company Name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/40 focus:border-primary rounded-lg text-on-surface text-body-sm outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-sm text-on-surface-variant">
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="recruiter@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/40 focus:border-primary rounded-lg text-on-surface text-body-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-label-sm text-on-surface-variant">
                    Mobile Number <span className="text-on-surface-variant/60">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/40 focus:border-primary rounded-lg text-on-surface text-body-sm outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-label-sm text-on-surface-variant">
                    Message / Opportunity Details <span className="text-primary">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe job role, requirements, or discussion details..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/40 focus:border-primary rounded-lg text-on-surface text-body-sm outline-none resize-none transition-colors"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary-container hover:bg-cobalt text-on-primary-container text-label-md rounded-lg transition-all shadow-md disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Sending to Supabase...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Submit Inquiry</span>
                      </>
                    )}
                  </button>

                  <a
                    href={siteConfig.resumeUrl}
                    download
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-surface-container-highest hover:bg-surface-bright text-on-surface text-label-md rounded-lg transition-colors border border-outline-variant/30"
                  >
                    <Download size={18} />
                    <span>Download Official Resume (PDF)</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </ScrollReveal>

        {/* Professional Social Links (Configured via siteConfig) */}
        {(siteConfig.linkedin || siteConfig.github) && (
          <ScrollReveal delay={0.3}>
            <div className="flex items-center justify-center gap-6 pt-2 text-on-surface-variant">
              {siteConfig.linkedin && (
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-primary transition-colors text-label-md"
                >
                  <ExternalLink size={16} />
                  <span>LinkedIn Profile</span>
                </a>
              )}
              {siteConfig.linkedin && siteConfig.github && (
                <span className="text-surface-container-highest">•</span>
              )}
              {siteConfig.github && (
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-primary transition-colors text-label-md"
                >
                  <ExternalLink size={16} />
                  <span>GitHub Portfolio</span>
                </a>
              )}
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
