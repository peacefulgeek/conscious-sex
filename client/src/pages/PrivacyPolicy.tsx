import { Link } from "wouter";

export default function PrivacyPolicy() {
  return (
    <div className="container py-12 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-[oklch(0.22_0.03_40)] mb-8" style={{ fontFamily: "'Bodoni Moda', serif" }}>
        Privacy Policy
      </h1>
      <div className="article-body text-[oklch(0.35_0.05_40)]">
        <p><strong>Last updated:</strong> January 1, 2026</p>

        <h2>What Data We Collect</h2>
        <p>When you subscribe to our newsletter, we collect your email address, the date and time of subscription, and the page from which you subscribed. That is all.</p>

        <h2>How We Store Your Data</h2>
        <p>Email addresses are stored in a JSONL file on our Bunny CDN storage zone. We do not use a database. We do not use third-party email marketing platforms. We do not send emails from this site.</p>

        <h2>Cookies</h2>
        <p>We use a single cookie to remember your cookie consent preference. We use privacy-respecting analytics that do not track individual users or use cookies for tracking.</p>

        <h2>Third-Party Services</h2>
        <p>We use Bunny CDN for content delivery and file storage. We do not use Google Analytics, Google Tag Manager, Facebook Pixel, or any other tracking service.</p>

        <h2>Your Rights</h2>
        <p>You have the right to request deletion of your data at any time. Since we do not send emails, there is nothing to unsubscribe from. If you wish to have your email removed from our records, you may contact us through our parent site.</p>

        <h2>Data Sharing</h2>
        <p>We do not sell, rent, or share your personal information with third parties. Period.</p>

        <h2>Children's Privacy</h2>
        <p>This site contains content about adult topics related to conscious sexuality. It is not intended for individuals under 18 years of age.</p>

        <h2>Changes to This Policy</h2>
        <p>We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date.</p>
      </div>
    </div>
  );
}
