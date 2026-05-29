import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiCheck, FiStar, FiShield, FiZap, FiArrowRight, 
  FiHelpCircle, FiChevronDown, FiChevronUp
} from 'react-icons/fi';
import './Pricing.css';

const plans = [
  {
    id: 'basic',
    name: 'Essential',
    tagline: 'Perfect for routine maintenance',
    price: 49,
    period: '/service',
    features: [
      'Basic oil & filter change',
      'Multi-point inspection',
      'Tire pressure check',
      'Fluid top-off',
      'Digital service report',
    ],
    cta: 'Get Started',
    popular: false,
    icon: <FiShield />,
  },
  {
    id: 'pro',
    name: 'Professional',
    tagline: 'Most popular for daily drivers',
    price: 129,
    period: '/service',
    features: [
      'Everything in Essential',
      'Full synthetic oil change',
      'Brake inspection & adjustment',
      'Battery health diagnostic',
      'Engine performance scan',
      'Priority scheduling',
      '90-day warranty on parts',
    ],
    cta: 'Choose Professional',
    popular: true,
    icon: <FiStar />,
  },
  {
    id: 'fleet',
    name: 'Fleet Solutions',
    tagline: 'Enterprise-grade for businesses',
    price: 399,
    period: '/month',
    features: [
      'Everything in Professional',
      'Unlimited vehicles',
      'Dedicated service advisor',
      'Fleet analytics dashboard',
      'Bulk discount pricing',
      'On-site mobile service',
      '24/7 emergency support',
      '1-year extended warranty',
    ],
    cta: 'Contact Sales',
    popular: false,
    icon: <FiZap />,
  },
];

const addOns = [
  { name: 'Ceramic Coating', price: 299, desc: 'Long-lasting paint protection' },
  { name: 'Interior Detailing', price: 89, desc: 'Deep clean & sanitize' },
  { name: 'Wheel Alignment', price: 79, desc: 'Precision 4-wheel alignment' },
  { name: 'AC Recharge', price: 119, desc: 'Full evacuation & recharge' },
];

const faqs = [
  { q: 'Can I switch plans later?', a: 'Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect on your next scheduled service.' },
  { q: 'Is there a cancellation fee?', a: 'No. All plans are flexible and you can cancel anytime without penalties. Fleet Solutions requires 30-day notice.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards, bank transfers, and digital wallets including Apple Pay and Google Pay.' },
  { q: 'Do you offer corporate invoicing?', a: 'Yes, Fleet Solutions customers receive monthly itemized invoices with NET-30 payment terms available on request.' },
];

function Pricing() {
  const [billing, setBilling] = useState('per-service');
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="pricing-page">
      {/* Hero */}
      <section className="pricing-hero">
        <div className="container">
          <div className="pricing-hero-content">
            <span className="pricing-badge">Transparent Pricing</span>
            <h1 className="pricing-hero-title">
              Simple Plans,<br />Exceptional Service
            </h1>
            <p className="pricing-hero-subtitle">
              Choose the service tier that fits your needs. No hidden fees, no surprises — just precision-engineered automotive care.
            </p>
            <div className="billing-toggle">
              <button className={billing === 'per-service' ? 'active' : ''} onClick={() => setBilling('per-service')}>Per Service</button>
              <button className={billing === 'monthly' ? 'active' : ''} onClick={() => setBilling('monthly')}>Monthly Plans</button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pricing-cards-section">
        <div className="container">
          <div className="pricing-cards-grid">
            {plans.map(plan => (
              <div key={plan.id} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-ribbon">Most Popular</div>}
                <div className="pricing-card-icon">{plan.icon}</div>
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-tagline">{plan.tagline}</p>
                <div className="plan-price">
                  <span className="currency">$</span>
                  <span className="amount">{plan.price}</span>
                  <span className="period">{plan.period}</span>
                </div>
                <ul className="plan-features">
                  {plan.features.map((feat, i) => (
                    <li key={i}><FiCheck className="check-icon" /> {feat}</li>
                  ))}
                </ul>
                <Link to="/book/all" className={`plan-cta ${plan.popular ? 'cta-primary' : 'cta-outline'}`}>
                  {plan.cta} <FiArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="addons-section">
        <div className="container">
          <div className="section-header-center">
            <h2>Service Add-Ons</h2>
            <p>Enhance any plan with premium extras, available à la carte.</p>
          </div>
          <div className="addons-grid">
            {addOns.map((addon, i) => (
              <div key={i} className="addon-card">
                <div className="addon-info">
                  <h4>{addon.name}</h4>
                  <p>{addon.desc}</p>
                </div>
                <div className="addon-price">
                  <span>${addon.price}</span>
                  <button className="addon-add-btn">+ Add</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pricing-faq-section">
        <div className="container">
          <div className="section-header-center">
            <FiHelpCircle className="section-icon" />
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to help you choose the right plan.</p>
          </div>
          <div className="pricing-faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`pricing-faq-item ${openFaq === i ? 'open' : ''}`}>
                <button className="pricing-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  {openFaq === i ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                <div className="pricing-faq-a">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Pricing;
