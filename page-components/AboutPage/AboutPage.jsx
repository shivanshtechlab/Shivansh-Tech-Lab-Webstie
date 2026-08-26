'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';
import PageHero from '../../components/PageHero/PageHero';
import Footer from '../../components/Footer/Footer';
import FounderSection from '../../components/FounderSection/FounderSection';
import { team } from '../../data/team';
import './AboutPage.css';

const companyStats = [
  { value: '100+', label: 'Projects Delivered' },
  { value: '50+', label: 'Happy Clients' },
  { value: '10+', label: 'Years Experience' },
  { value: '98%', label: 'Satisfaction Rate' },
];

const values = [
  {
    icon: '💡',
    title: 'Innovation',
    desc: 'We embrace cutting-edge technologies and creative thinking to solve problems in ways others haven\'t imagined.',
    color: '#6C63FF',
  },
  {
    icon: '✨',
    title: 'Quality',
    desc: 'Every line of code, every pixel, every interaction — crafted to meet the highest standards of excellence.',
    color: '#00D9FF',
  },
  {
    icon: '⚡',
    title: 'Speed',
    desc: 'Rapid delivery without cutting corners. We use Agile practices to ship fast and iterate faster.',
    color: '#7C3AED',
  },
  {
    icon: '🤝',
    title: 'Partnership',
    desc: 'We don\'t just build for you — we build with you. Your success is our success.',
    color: '#00E676',
  },
];

const timeline = [
  { year: '2015', title: 'Founded', desc: 'Shivansh Tech Lab born in a small office with 3 developers and a mission to redefine digital excellence.' },
  { year: '2017', title: 'First Enterprise Client', desc: 'Landed our first Fortune 500 client and delivered a 300-person ERP system in record time.' },
  { year: '2019', title: '50+ Team', desc: 'Grew to 50+ specialists across design, engineering, AI, and cloud infrastructure.' },
  { year: '2021', title: 'International Expansion', desc: 'Opened offices in London, Dubai, and Singapore — serving clients across 15+ countries.' },
  { year: '2023', title: 'AI Division', desc: 'Launched dedicated AI/ML division, delivering GPT-powered enterprise solutions.' },
  { year: '2025', title: '100+ Projects', desc: 'Surpassed 100 successful project deliveries with 98% client satisfaction rate.' },
];

function TeamCard({ member, index }) {
  return (
    <motion.div
      className="ap__team-card"
      style={{ '--ap-color': member.color }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.08 }}
      whileHover={{ y: -4 }}
    >
      <div className="ap__team-card-top-line" aria-hidden="true" />
      <div className="ap__team-avatar" style={{ background: `linear-gradient(135deg, ${member.color}, rgba(0,217,255,0.6))` }}>
        {member.avatar}
      </div>
      <h3 className="ap__team-name">{member.name}</h3>
      <span className="ap__team-role">{member.role}</span>
      <p className="ap__team-bio">{member.bio}</p>
      <div className="ap__team-skills">
        {member.skills.map((skill) => (
          <span key={skill} className="ap__team-skill">{skill}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <main className="ap">
      <PageHero
        badge="WHO WE ARE"
        title="We Are Shivansh Tech Lab"
        titleHighlight="Shivansh Tech Lab"
        subtitle="A team of passionate builders, designers, and strategists on a mission to create digital experiences that define tomorrow."
        breadcrumb="About"
      />

      <FounderSection />

      {/* Story Section */}
      <section className="ap__story">
        <div className="container">
          <div className="ap__story-grid">
            <motion.div
              className="ap__story-content"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <span className="ap__story-badge">Our Story</span>
              <h2 className="ap__story-title">Built by Builders, <span className="gradient-text">For Builders</span></h2>
              <p className="ap__story-text">
                Shivansh Tech Lab was founded in 2015 with a simple belief: great software should be accessible to any business, regardless of size. What started as a 3-person team in a co-working space has grown into a global agency with offices across 4 continents.
              </p>
              <p className="ap__story-text">
                Our mission is to transform ambitious ideas into world-class digital products. We combine deep technical expertise with design thinking and business strategy to deliver solutions that don't just work — they win.
              </p>
              <p className="ap__story-text">
                Today, we're proud to have delivered 100+ projects across 15+ countries, partnering with startups and Fortune 500 companies alike to build the future of digital business.
              </p>
            </motion.div>

            <motion.div
              className="ap__story-stats"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <div className="ap__stats-grid">
                {companyStats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    className="ap__stat"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <span className="ap__stat-value gradient-text">{s.value}</span>
                    <span className="ap__stat-label">{s.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="ap__values">
        <div className="container">
          <motion.div
            className="ap__section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="ap__section-title">Our Core <span className="gradient-text">Values</span></h2>
            <p className="ap__section-sub">The principles that guide every decision we make</p>
          </motion.div>
          <div className="ap__values-grid">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className="ap__value-card"
                style={{ '--ap-color': v.color }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="ap__value-icon-wrap">
                  <span className="ap__value-icon">{v.icon}</span>
                </div>
                <h3 className="ap__value-title">{v.title}</h3>
                <p className="ap__value-desc">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="ap__team">
        <div className="container">
          <motion.div
            className="ap__section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="ap__section-title">Meet the <span className="gradient-text">Team</span></h2>
            <p className="ap__section-sub">The brilliant minds behind every project</p>
          </motion.div>
          <div className="ap__team-grid">
            {team.map((member, i) => (
              <TeamCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="ap__timeline">
        <div className="container">
          <motion.div
            className="ap__section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="ap__section-title">Our <span className="gradient-text">Journey</span></h2>
            <p className="ap__section-sub">A decade of growth, innovation, and impact</p>
          </motion.div>

          <div className="ap__timeline-track">
            <div className="ap__timeline-line" aria-hidden="true" />
            {timeline.map((event, i) => (
              <motion.div
                key={event.year}
                className={`ap__timeline-item ${i % 2 === 0 ? 'ap__timeline-item--left' : 'ap__timeline-item--right'}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <div className="ap__timeline-dot" aria-hidden="true" />
                <div className="ap__timeline-card">
                  <span className="ap__timeline-year gradient-text">{event.year}</span>
                  <h3 className="ap__timeline-title">{event.title}</h3>
                  <p className="ap__timeline-desc">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ap__cta-section">
        <div className="container">
          <motion.div
            className="ap__cta-box"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="ap__cta-glow" aria-hidden="true" />
            <h2 className="ap__cta-title">Want to Be Part of Our <span className="gradient-text">Story?</span></h2>
            <p className="ap__cta-desc">Join us as a client, partner, or team member. Let's build something legendary.</p>
            <div className="ap__cta-actions">
              <Link href="/contact" className="ap__cta-btn ap__cta-btn--primary">Start a Project</Link>
              <Link href="/portfolio" className="ap__cta-btn ap__cta-btn--ghost">Our Work</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
