import { useMemo, useState } from 'react';
import { Plus, Minus, ShoppingCart, Sparkles, Award } from 'lucide-react';
import { crewMembers } from '../data/seedData';
import './CrewBooking.css';

function CrewCard({ crew, quantity, onAdd, onRemove }) {
  return (
    <article className="crew-card">
      <div className="crew-card__badge">{crew.category}</div>
      <div className="crew-card__title-wrap">
        <h3 className="crew-card__name">{crew.name}</h3>
        <span className="crew-card__price">₹{crew.price.toLocaleString('en-IN')}</span>
      </div>
      <p className="crew-card__desc">{crew.description}</p>

      <div className="crew-card__footer">
        <div className="crew-card__counter">
          <button className="icon-btn" onClick={() => onRemove(crew.id)} disabled={!quantity} aria-label={`Remove one ${crew.name}`}>
            <Minus size={16} />
          </button>
          <span className="crew-card__quantity">{quantity || 0}</span>
          <button className="icon-btn" onClick={() => onAdd(crew.id)} aria-label={`Add one ${crew.name}`}>
            <Plus size={16} />
          </button>
        </div>
        <button className="btn btn-outline crew-card__add" onClick={() => onAdd(crew.id)}>
          Add to cart
        </button>
      </div>
    </article>
  );
}

export default function CrewBooking() {
  const [cart, setCart] = useState({});

  const selectedItems = useMemo(
    () => crewMembers.filter(item => cart[item.id] > 0),
    [cart]
  );

  const subtotal = useMemo(
    () => selectedItems.reduce((sum, item) => sum + item.price * cart[item.id], 0),
    [selectedItems, cart]
  );

  const handleAdd = (id) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleRemove = (id) => {
    setCart(prev => {
      const next = { ...prev };
      if (!next[id] || next[id] <= 1) {
        delete next[id];
      } else {
        next[id] -= 1;
      }
      return next;
    });
  };

  return (
    <div className="crew-page page-enter">
      <section className="crew-hero section crew-hero--bright">
        <div className="container crew-hero__container">
          <div className="crew-hero__content">
            <span className="section-label">Custom Crew Booking</span>
            <h1 className="section-title">Create your ideal crew</h1>
            <p className="crew-hero__text">
              Book photographers, videographers and technicians together. Add roles to your crew cart and get a live quotation instantly.
            </p>
            <div className="crew-hero__features">
              <div className="feature-pill">
                <Sparkles size={18} /> Bright & vibrant team selection
              </div>
              <div className="feature-pill">
                <Award size={18} /> Transparent pricing from the shared document
              </div>
            </div>
          </div>
          <div className="crew-hero__visual">
            <img src="/wedding_gallery_1.png" alt="Crew booking illustration" />
          </div>
        </div>
      </section>

      <section className="section crew-selection">
        <div className="container crew-selection__layout">
          <div className="crew-selection__panel">
            <div className="section-header">
              <span className="section-label">Team members</span>
              <h2 className="section-title">Choose the crew you need</h2>
              <p className="section-subtitle">
                Select from photographers, videographers and technicians to build a full crew that fits your event.
              </p>
            </div>

            <div className="crew-grid">
              {crewMembers.map(member => (
                <CrewCard
                  key={member.id}
                  crew={member}
                  quantity={cart[member.id] || 0}
                  onAdd={handleAdd}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          </div>

          <aside className="crew-quote-panel glass-card">
            <div className="quote-panel__heading">
              <ShoppingCart size={20} />
              <div>
                <p className="quote-panel__label">Quotation</p>
                <h3 className="quote-panel__title">Your live crew estimate</h3>
              </div>
            </div>

            {selectedItems.length === 0 ? (
              <p className="quote-panel__empty">
                Add crew members from the list to see your customized quote appear here.
              </p>
            ) : (
              <div className="quote-panel__content">
                <div className="quote-panel__items">
                  {selectedItems.map(item => (
                    <div key={item.id} className="quote-panel__item">
                      <div>
                        <span className="quote-panel__item-name">{item.name}</span>
                        <span className="quote-panel__item-count">x{cart[item.id]}</span>
                      </div>
                      <span className="quote-panel__item-price">₹{(item.price * cart[item.id]).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>

                <div className="quote-panel__summary">
                  <div className="quote-panel__summary-row">
                    <span>Subtotal</span>
                    <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="quote-panel__summary-row quote-panel__summary-total">
                    <span>Total quotation</span>
                    <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                <button className="btn btn-primary quote-panel__cta">Request this crew</button>
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}
