import heroPhoto from '../assets/hero-photo.webp'

export default function Hero() {
  return (
    <section id="hero" className="editorial-hero">
      <div className="hero-atmosphere anim-fade-in" />
      <div className="hero-marquee-wrap anim-fade-up" style={{animationDelay:'500ms'}} aria-hidden="true">
        <div className="hero-marquee">
          <span>Devarshi Dixit&nbsp;</span><span>Devarshi Dixit&nbsp;</span>
        </div>
      </div>
      <img className="editorial-portrait anim-rise-in" style={{animationDelay:'300ms'}} src={heroPhoto} alt="Devarshi Dixit" draggable="false" />
      <div className="hero-rule anim-line" style={{animationDelay:'1200ms'}} />
      <div className="hero-footer-left anim-fade-up" style={{animationDelay:'1400ms'}}>
        <span>AI / ML Engineer</span><span>M.Sc. Intelligent Interactive Systems</span><span>Bielefeld, Germany</span>
      </div>
      <div className="hero-footer-right anim-fade-up" style={{animationDelay:'1550ms'}}>
        <span>From experiment to working system</span><span>AI Systems · Evaluation · Deployment</span>
      </div>
      <a className="hero-scroll anim-fade-up" style={{animationDelay:'1700ms'}} href="#featured">Scroll to work ↓</a>
    </section>
  )
}
