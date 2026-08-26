'use client'

import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import Button from '../../components/Button/Button';
import { blogPosts } from '../../data/blog';
import './BlogPreview.css';

function AuthorAvatar({ avatar, name, color = '#6C63FF' }) {
  return (
    <div className="blog-author">
      <div className="blog-author__avatar" style={{ background: color }}>
        {avatar}
      </div>
      <span className="blog-author__name">{name}</span>
    </div>
  );
}

function CategoryBadge({ category, color }) {
  return (
    <span className="blog-category" style={{ color, borderColor: `${color}40`, background: `${color}12` }}>
      {category}
    </span>
  );
}

function FeaturedPost({ post }) {
  return (
    <ScrollReveal variant="fadeLeft">
      <article className="blog-featured">
        <div className="blog-featured__image" style={{ '--post-color': post.color }}>
          <div className="blog-featured__image-blur" />
          <div className="blog-featured__image-text">{post.category}</div>
          <div className="blog-featured__image-overlay" />
          <span className="blog-featured__label">Featured</span>
        </div>
        <div className="blog-featured__body">
          <div className="blog-featured__meta">
            <CategoryBadge category={post.category} color={post.color} />
            <div className="blog-featured__tags">
              {post.tags.map(t => (
                <span key={t} className="blog-tag">#{t}</span>
              ))}
            </div>
          </div>
          <h3 className="blog-featured__title">{post.title}</h3>
          <p className="blog-featured__excerpt">{post.excerpt}</p>
          <div className="blog-featured__footer">
            <AuthorAvatar avatar={post.author.avatar} name={post.author.name} color={post.color} />
            <div className="blog-featured__date-time">
              <span>{post.date}</span>
              <span className="blog-featured__dot">·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
          <a href="#blog" className="blog-featured__read-btn" style={{ '--btn-color': post.color }}>
            Read Article
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 10h10M11 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </article>
    </ScrollReveal>
  );
}

function SmallPost({ post, delay }) {
  return (
    <ScrollReveal variant="fadeRight" delay={delay}>
      <article className="blog-small" style={{ '--post-color': post.color }}>
        <div className="blog-small__image">
          <div className="blog-small__image-blur" />
          <span className="blog-small__image-label">{post.category}</span>
        </div>
        <div className="blog-small__body">
          <div className="blog-small__meta">
            <CategoryBadge category={post.category} color={post.color} />
            <span className="blog-small__read-time">{post.readTime}</span>
          </div>
          <h4 className="blog-small__title">{post.title}</h4>
          <p className="blog-small__excerpt">{post.excerpt}</p>
          <div className="blog-small__footer">
            <AuthorAvatar avatar={post.author.avatar} name={post.author.name} color={post.color} />
            <span className="blog-small__date">{post.date}</span>
          </div>
        </div>
        <div className="blog-small__hover-glow" />
      </article>
    </ScrollReveal>
  );
}

export default function BlogPreview() {
  const [featured, ...rest] = blogPosts;

  return (
    <section className="blog-section" id="blog">
      <div className="blog-section__bg">
        <div className="blog-section__glow blog-section__glow--1" />
        <div className="blog-section__glow blog-section__glow--2" />
      </div>

      <div className="container">
        <ScrollReveal>
          <SectionTitle
            badge="BLOG"
            title="Insights From Our Experts"
            subtitle="Deep dives into technology, design, and strategy from the team building tomorrow's software today."
          />
        </ScrollReveal>

        <div className="blog-layout">
          <div className="blog-layout__featured">
            <FeaturedPost post={featured} />
          </div>
          <div className="blog-layout__grid">
            {rest.map((post, i) => (
              <SmallPost key={post.id} post={post} delay={i * 0.1} />
            ))}
          </div>
        </div>

        <ScrollReveal delay={0.2}>
          <div className="blog-cta">
            <Button variant="outline" size="lg" as="a" href="#blog">
              Read All Articles
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16, marginLeft: '0.5rem' }}>
                <path d="M5 10h10M11 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
