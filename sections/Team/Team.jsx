'use client'

import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { team } from '../../data/team';
import './Team.css';

const SocialIcon = ({ type }) => {
  const icons = {
    linkedin: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    twitter: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
      </svg>
    ),
    github: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
      </svg>
    ),
    dribbble: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" stroke="white" strokeWidth="0" />
      </svg>
    ),
    instagram: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  };
  return <span className="team-social-icon">{icons[type]}</span>;
};

function TeamCard({ member, delay }) {
  return (
    <ScrollReveal variant="scaleUp" delay={delay}>
      <div className="team-card" style={{ '--member-color': member.color }}>
        {/* Front Face */}
        <div className="team-card__front">
          <div className="team-card__glow" />
          <div className="team-card__avatar" style={{ background: member.color }}>
            <span>{member.avatar}</span>
          </div>
          <h3 className="team-card__name">{member.name}</h3>
          <p className="team-card__role">{member.role}</p>
          <p className="team-card__bio">{member.bio}</p>
          <div className="team-card__skills">
            {member.skills.map((s) => (
              <span key={s} className="team-card__skill">{s}</span>
            ))}
          </div>
          <div className="team-card__flip-hint">Hover to connect →</div>
        </div>

        {/* Back Face */}
        <div className="team-card__back">
          <div className="team-card__back-glow" />
          <div className="team-card__avatar team-card__avatar--back" style={{ background: member.color }}>
            <span>{member.avatar}</span>
          </div>
          <h3 className="team-card__name team-card__name--back">{member.name}</h3>
          <p className="team-card__role team-card__role--back">{member.role}</p>
          <div className="team-card__connect-label">Connect with me</div>
          <div className="team-card__socials">
            {Object.entries(member.social).map(([type, href]) => (
              <a key={type} href={href} className="team-card__social-link" target="_blank" rel="noopener noreferrer" aria-label={type}>
                <SocialIcon type={type} />
              </a>
            ))}
          </div>
          <div className="team-card__skills team-card__skills--back">
            {member.skills.map((s) => (
              <span key={s} className="team-card__skill team-card__skill--back" style={{ borderColor: member.color, color: member.color }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function Team() {
  return (
    <section className="team-section" id="team">
      <div className="team-section__bg">
        <div className="team-section__glow team-section__glow--1" />
        <div className="team-section__glow team-section__glow--2" />
      </div>
      <div className="container">
        <ScrollReveal>
          <SectionTitle
            badge="OUR TEAM"
            title="The Brilliant Minds Behind Shivansh Tech Lab"
            subtitle="A hand-picked team of world-class engineers, designers, and strategists united by one mission: building exceptional software."
          />
        </ScrollReveal>

        <div className="team-grid">
          {team.map((member, i) => (
            <TeamCard key={member.id} member={member} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
