import s from './UniverseDetails.module.css';

const brands = [['nextdotjs', 'Next.js'], ['react', 'React'], ['shopify', 'Shopify'], ['n8n', 'n8n'], ['make', 'Make'], ['wordpress', 'WordPress']];
export function TechnologyLogos() {
  return <div className={s.technologies} aria-label="Tecnologías con las que construimos">{brands.map(([slug, name]) => <div key={slug}><img src={`/brands/${slug}.svg`} alt="" width="38" height="38" loading="lazy" /><span>{name}</span></div>)}</div>;
}
