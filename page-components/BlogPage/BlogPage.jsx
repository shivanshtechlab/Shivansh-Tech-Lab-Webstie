'use client'

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import PageHero from '../../components/PageHero/PageHero';
import Footer from '../../components/Footer/Footer';
import { blogPosts } from '../../data/blog';
import './BlogPage.css';

const allCategories = ['All', ...Array.from(new Set(blogPosts.map((p) => p.category)))];

function FeaturedPost({ post }) {
  return (
    <motion.article
      className="bp__featured"
      style={{ '--bp-color': post.color }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
    >
      <div className="bp__featured-bg" style={{ background: `linear-gradient(135deg, ${post.color}18, ${post.color}05)` }} aria-hidden="true" />
      <div className="bp__featured-top-line" aria-hidden="true" />
      <div className="bp__featured-content">
        <div className="bp__featured-meta">
          <span className="bp__post-category" style={{ color: post.color }}>{post.category}</span>
          <span className="bp__post-meta-sep" aria-hidden="true">·</span>
          <span className="bp__post-date">{post.date}</span>
          <span className="bp__post-meta-sep" aria-hidden="true">·</span>
          <span className="bp__post-read">{post.readTime}</span>
        </div>
        <h2 className="bp__featured-title">{post.title}</h2>
        <p className="bp__featured-excerpt">{post.excerpt}</p>
        <div className="bp__featured-footer">
          <div className="bp__post-author">
            <div className="bp__author-avatar" style={{ background: `linear-gradient(135deg, ${post.color}, rgba(0,217,255,0.5))` }}>
              {post.author.avatar}
            </div>
            <span className="bp__author-name">{post.author.name}</span>
          </div>
          <div className="bp__featured-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="bp__tag">{tag}</span>
            ))}
          </div>
          <Link href="/contact" className="bp__featured-cta" style={{ '--bp-color': post.color }}>
            Read Article
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function BlogCard({ post, index }) {
  return (
    <motion.article
      className="bp__card"
      style={{ '--bp-color': post.color }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -4 }}
    >
      <div className="bp__card-top-line" aria-hidden="true" />
      <div className="bp__card-color-strip" style={{ background: post.color }} aria-hidden="true" />
      <div className="bp__card-body">
        <div className="bp__card-meta">
          <span className="bp__post-category" style={{ color: post.color }}>{post.category}</span>
          <span className="bp__post-read">{post.readTime}</span>
        </div>
        <h3 className="bp__card-title">{post.title}</h3>
        <p className="bp__card-excerpt">{post.excerpt}</p>
        <div className="bp__card-tags">
          {post.tags.map((tag) => (
            <span key={tag} className="bp__tag">{tag}</span>
          ))}
        </div>
        <div className="bp__card-footer">
          <div className="bp__post-author">
            <div className="bp__author-avatar" style={{ background: `linear-gradient(135deg, ${post.color}, rgba(0,217,255,0.5))` }}>
              {post.author.avatar}
            </div>
            <div className="bp__author-info">
              <span className="bp__author-name">{post.author.name}</span>
              <span className="bp__post-date">{post.date}</span>
            </div>
          </div>
          <Link href="/contact" className="bp__card-link">
            Read
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState('idle');

  const handleSubscribe = useCallback((e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSubStatus('error');
      return;
    }
    setSubStatus('loading');
    setTimeout(() => {
      setSubStatus('success');
      setEmail('');
    }, 1000);
  }, [email]);

  const [featured, ...rest] = blogPosts;

  const filtered = activeCategory === 'All'
    ? rest
    : rest.filter((p) => p.category === activeCategory);

  return (
    <main className="bp">
      <PageHero
        badge="INSIGHTS"
        title="Insights & Innovation"
        titleHighlight="Innovation"
        subtitle="Thoughts, tutorials, and perspectives on technology, design, and digital business from the Shivansh Tech Lab team."
        breadcrumb="Blog"
      />

      {/* Featured Post */}
      <section className="bp__featured-section">
        <div className="container">
          <motion.div
            className="bp__section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="bp__section-title">Featured <span className="gradient-text">Article</span></h2>
          </motion.div>
          <FeaturedPost post={featured} />
        </div>
      </section>

      {/* All Posts */}
      <section className="bp__posts-section">
        <div className="container">
          <motion.div
            className="bp__section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="bp__section-title">More <span className="gradient-text">Articles</span></h2>
          </motion.div>

          {/* Category Filters */}
          <div className="bp__filters">
            {allCategories.map((cat) => (
              <button
                key={cat}
                className={`bp__filter-btn ${activeCategory === cat ? 'bp__filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="bp__grid">
            {filtered.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bp__newsletter">
        <div className="container">
          <motion.div
            className="bp__newsletter-box"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="bp__newsletter-glow" aria-hidden="true" />
            <div className="bp__newsletter-content">
              <span className="bp__newsletter-badge">Newsletter</span>
              <h2 className="bp__newsletter-title">Stay Ahead of the <span className="gradient-text">Curve</span></h2>
              <p className="bp__newsletter-desc">
                Get the latest insights on technology, design, and digital business delivered to your inbox monthly. No spam, ever.
              </p>
              <form className="bp__newsletter-form" onSubmit={handleSubscribe} noValidate>
                <div className={`bp__newsletter-field ${subStatus === 'error' ? 'bp__newsletter-field--error' : ''} ${subStatus === 'success' ? 'bp__newsletter-field--success' : ''}`}>
                  <input
                    type="email"
                    className="bp__newsletter-input"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setSubStatus('idle'); }}
                    aria-label="Email for newsletter"
                    disabled={subStatus === 'loading' || subStatus === 'success'}
                  />
                  <button
                    type="submit"
                    className="bp__newsletter-btn"
                    disabled={subStatus === 'loading' || subStatus === 'success'}
                  >
                    {subStatus === 'loading' ? (
                      <span className="bp__spinner" aria-hidden="true" />
                    ) : subStatus === 'success' ? (
                      'Subscribed!'
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </div>
                {subStatus === 'error' && (
                  <p className="bp__newsletter-msg bp__newsletter-msg--error">Please enter a valid email address.</p>
                )}
                {subStatus === 'success' && (
                  <p className="bp__newsletter-msg bp__newsletter-msg--success">You're in! Welcome to the community.</p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
