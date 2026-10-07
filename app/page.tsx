/* Native images keep the supplied SVG icons at their intrinsic size. */
/* eslint-disable @next/next/no-img-element */
import { siteName } from "./site";

const features = [
  { id: "supervisor", title: "Supervisor", body: "Monitors activity to identify project roadblocks", icon: "icon-supervisor.svg" },
  { id: "team-builder", title: "Team Builder", body: "Scans our talent network to create the optimal team for your project", icon: "icon-team-builder.svg" },
  { id: "karma", title: "Karma", body: "Regularly evaluates our talent to ensure quality", icon: "icon-karma.svg" },
  { id: "calculator", title: "Calculator", body: "Uses data from past projects to provide better delivery estimates", icon: "icon-calculator.svg" },
];

export default function Home() {
  return (
    <>
      <main>
        <header className="intro">
          <h1>
            <span className="intro-light">Reliable, efficient delivery</span>
            <span className="intro-strong">Powered by Technology</span>
          </h1>
          <p>Our Artificial Intelligence powered tools use millions of project data points to ensure that your project is successful</p>
        </header>
        <ul className="features" aria-label="Features">
          {features.map(feature => (
            <li key={feature.id} className={`feature feature-${feature.id}`}>
              <article aria-labelledby={`${feature.id}-title`}>
                <h2 id={`${feature.id}-title`}>{feature.title}</h2>
                <p>{feature.body}</p>
                <img src={`/images/${feature.icon}`} width="64" height="64" alt="" />
              </article>
            </li>
          ))}
        </ul>
      </main>
      <footer><span className="site-name">{siteName}</span>. Challenge by <a href="https://www.frontendmentor.io/challenges/four-card-feature-section-weK1eFYK">Frontend Mentor</a>. Built by <a href="https://royeradames.com">Royer Adames</a>.</footer>
    </>
  );
}
