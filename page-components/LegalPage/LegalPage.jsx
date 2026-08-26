import PageHero from '../../components/PageHero/PageHero';
import Footer from '../../components/Footer/Footer';
import './LegalPage.css';

export default function LegalPage({ badge, title, breadcrumb, updated, children }) {
  return (
    <main className="legal-page">
      <PageHero badge={badge} title={title} breadcrumb={breadcrumb} />
      <div className="container">
        <div className="legal-page__content">
          <p className="legal-page__updated">Last updated: {updated}</p>
          {children}
        </div>
      </div>
      <Footer />
    </main>
  );
}
