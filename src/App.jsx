import { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  BarChart3,
  Atom,
  BrainCircuit,
  Database,
} from "lucide-react";
import { Meteors } from "@/components/ui/meteors";
import DataAnalysisChart from "./components/charts/DataAnalysisChart";
import ParticleCollisionChart from "./components/charts/ParticleCollisionChart";
import AIModelChart from "./components/charts/AIModelChart";
import collision from "./assets/cms-event.jpg";
import cvae from "./assets/cvae.jpg";
import knee from "./assets/knee.png";
import ice from "./assets/ice.jpg";
import indonesia from "./assets/indonesia.png";
import "./App.css";

const projects = [
  {
    number: "01",
    category: "HIGH-ENERGY PHYSICS · GENERATIVE AI",
    title: "Conditional variational autoencoder (cVAE)",
    text: "A conditional variational autoencoder for exploring fast simulation of calorimeter showers.",
    tags: ["PyTorch", "cVAE", "Simulation"],
    image: cvae,
    url: "https://github.com/amilcar-data/Fast-Calorimeter-Simulation-with-a-Conditional-Variational-Autoencoder-cVAE",
  },
  {
    number: "02",
    category: "ASTROPARTICLE PHYSICS · MACHINE LEARNING",
    title: "Neutrinos in deep ice",
    text: "Exploring IceCube data and machine learning in the study of neutrino events.",
    tags: ["IceCube", "Neutrinos", "Data science"],
    image: ice,
    url: "https://github.com/amilcar-data/IceCube_Neutrinos_in_Deep_Ice",
  },
  {
    number: "03",
    category: "MEDICAL IMAGING · MACHINE LEARNING",
    title: "Knee abnormality detection",
    text: "A Kaggle project combining weak labels from radiology reports with an attention-based MRI image model.",
    tags: ["Computer vision", "NLP", "PyTorch"],
    image: knee,
    url: "https://github.com/amilcar-data/RSNA-Knee-Abnormality-Detection",
  },
  {
    number: "04",
    category: "GEOSCIENCE · DATA VISUALIZATION",
    title: "Mapping earthquakes in Indonesia",
    text: "Mapping seismic activity in Indonesia to explore spatial patterns in earthquake data.",
    tags: ["Geospatial", "Data analysis", "Earthquakes"],
    image: indonesia,
    url: "https://github.com/amilcar-data/Earthquakes_in_Indonesia-Mapping_Seismic_Activity",
  },
];
const skills = [
  {
    icon: Database,
    n: "01",
    title: "Data analysis",
    text: "Turning complex, messy data into meaningful patterns, visual stories, and questions worth asking.",
  },
  {
    icon: Atom,
    n: "02",
    title: "High-energy physics",
    text: "Exploring particle collisions, detector data, and simulation through computational methods.",
  },
  {
    icon: BrainCircuit,
    n: "03",
    title: "Artificial intelligence",
    text: "Building and investigating machine learning models, from classification to generative approaches.",
  },
  {
    icon: BarChart3,
    n: "04",
    title: "Data science & dashboards",
    text: "Connecting statistics, modeling, and interactive visualization to make insights easier to explore.",
  },
];
const charts = {
  standard: { label: "Standard normal", mean: 0, sigma: 1 },
  particles: { label: "Particle masses" },
};

function App() {
  const [view, setView] = useState("standard");
  const active = charts.standard;
  const normal = (x, mean, sigma) =>
    Math.exp(-0.5 * ((x - mean) / sigma) ** 2) /
    (sigma * Math.sqrt(2 * Math.PI));
  const options = {
    chart: {
      type: "spline",
      backgroundColor: "transparent",
      height: 280,
      style: { fontFamily: "inherit" },
    },
    title: { text: null },
    credits: { enabled: false },
    accessibility: { enabled: false },
    xAxis: {
      title: { text: "x", style: { color: "#8396a8" } },
      lineColor: "#334155",
      labels: { style: { color: "#8396a8" } },
    },
    yAxis: {
      title: { text: "Probability density", style: { color: "#8396a8" } },
      gridLineColor: "#1b3040",
      labels: { style: { color: "#8396a8" } },
    },
    legend: { enabled: false },
    tooltip: {
      pointFormat: "Density: <b>{point.y:.4f}</b>",
      backgroundColor: "#101f2c",
      style: { color: "#e3f5f3" },
    },
    plotOptions: {
      series: { marker: { enabled: false }, lineWidth: 2, fillOpacity: 0.12 },
    },
    series: [
      {
        name: "Normal density",
        data: Array.from({ length: 121 }, (_, i) => {
          const x = -6 + i * 0.1;
          return [Number(x.toFixed(1)), normal(x, active.mean, active.sigma)];
        }),
        color: "#70e6ca",
      },
    ],
  };
  // Approximate rest-mass energies (GeV); see the Particle Data Group listings.
  const particleOptions = {
    chart: { type: "line", backgroundColor: "transparent", height: 280, style: { fontFamily: "inherit" } },
    title: { text: null }, credits: { enabled: false }, accessibility: { enabled: false },
    xAxis: { categories: ["t", "H", "Z", "W±", "τ⁻", "μ⁻", "e⁻"], labels: { rotation: -45, style: { color: "#b6cac8", fontSize: "10px" } }, lineColor: "#334155" },
    yAxis: { type: "logarithmic", min: 0.0001, max: 1000, title: { text: "Energy (GeV), log scale", style: { color: "#8396a8" } }, labels: { style: { color: "#8396a8" } }, gridLineColor: "#1b3040" },
    legend: { enabled: false }, tooltip: { pointFormat: "Rest-mass energy: <b>{point.y} GeV</b>", backgroundColor: "#101f2c", style: { color: "#e3f5f3" } },
    plotOptions: { line: { lineWidth: 2, marker: { enabled: true, radius: 4 } } },
    series: [{ name: "Mass energy", color: "#70e6ca", data: [172.5, 125.2, 91.19, 80.4, 1.777, 0.1057, 0.000511] }],
  };
  const learningOptions = {
    chart: {
      type: "spline",
      backgroundColor: "transparent",
      height: 350,
      style: { fontFamily: "inherit" },
    },
    title: {
      text: "Model learning curves",
      style: { color: "#e7f0ef", fontSize: "17px" },
    },
    subtitle: {
      text: "Example training and validation loss",
      style: { color: "#98aeb0" },
    },
    xAxis: {
      title: { text: "Epoch", style: { color: "#98aeb0" } },
      labels: { style: { color: "#98aeb0" } },
      lineColor: "#334155",
    },
    yAxis: {
      title: { text: "Loss", style: { color: "#98aeb0" } },
      labels: { style: { color: "#98aeb0" } },
      gridLineColor: "#243a41",
    },
    legend: { itemStyle: { color: "#b6cac8" } },
    credits: { enabled: false },
    accessibility: { enabled: false },
    tooltip: {
      shared: true,
      backgroundColor: "#101f2c",
      style: { color: "#e3f5f3" },
    },
    plotOptions: { series: { marker: { enabled: false }, pointStart: 1 } },
    series: [
      {
        name: "Training loss",
        data: [1.9, 1.45, 1.12, 0.88, 0.7, 0.57, 0.49, 0.42, 0.37, 0.33],
        color: "#70e6ca",
      },
      {
        name: "Validation loss",
        data: [2.0, 1.55, 1.23, 1.01, 0.85, 0.75, 0.7, 0.68, 0.69, 0.72],
        color: "#f3b66b",
        dashStyle: "ShortDash",
      },
    ],
  };
  return (
    <>
      <main>
        <section id="top" className="hero">
          <div className="meteor-layer">
            <Meteors />
          </div>
          <div className="hero-grid" />
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="status-dot" /> DATA SCIENCE{" "}
                <span className="slash">/</span> AI{" "}
                <span className="slash">/</span> PHYSICS
              </p>
              <h1>
                Finding patterns
                <br />
                <span>in the unseen.</span>
              </h1>
              <p className="hero-intro">
                Hi, I’m <strong>Amilcar Torres.</strong> I explore the
                intersection of data, artificial intelligence, and high-energy
                physics to turn complex questions into meaningful insights.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#projects">
                  Explore my work <ArrowDown size={16} />
                </a>
                <a
                  className="text-link"
                  href="https://github.com/amilcar-data"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub profile <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
            <div
              className="hadron"
              role="img"
              aria-label="Illustration of three quarks connected by gluons"
            >
              <svg viewBox="0 0 400 400" aria-hidden="true">
                <circle className="hadron-halo" cx="200" cy="200" r="155" />
                <path
                  className="gluon"
                  d="M200 74 q-16 14 -2 27 t-2 27 t-2 27 t-2 27 t-2 27"
                />
                <path
                  className="gluon"
                  d="M200 74 q-16 14 -2 27 t-2 27 t-2 27 t-2 27 t-2 27"
                  transform="rotate(120 200 200)"
                />
                <path
                  className="gluon"
                  d="M200 74 q-16 14 -2 27 t-2 27 t-2 27 t-2 27 t-2 27"
                  transform="rotate(240 200 200)"
                />
                <circle className="quark q1" cx="200" cy="74" r="19" />
                <circle className="quark q2" cx="309" cy="263" r="19" />
                <circle className="quark q3" cx="91" cy="263" r="19" />
                <circle className="hadron-center" cx="200" cy="200" r="4" />
              </svg>
              <span>THREE QUARKS / STRONG INTERACTION</span>
            </div>
          </div>
          <div className="hero-bottom">
            <span>SCROLL TO EXPLORE</span>
            <span>COMPUTATION × CURIOSITY</span>
          </div>
        </section>
        <section id="about" className="section about">
          <div className="section-index">
            01 <span>/ ABOUT</span>
          </div>
          <div className="about-content">
            <p className="eyebrow">A LITTLE ABOUT ME</p>
            <h2>
              Curious about the universe.
              <br />
              <em>Driven by data.</em>
            </h2>
            <div className="about-bottom">
              <p>
                I’m a computer science engineer interested in the space where
                scientific thinking and computation meet. I enjoy working with
                data, building models, and finding ways to make complex ideas
                more understandable.
              </p>
              <p>
                From particle physics to real-world datasets, I’m motivated by
                questions that require both technical rigor and a little
                imagination.
              </p>
            </div>
          </div>
        </section>
        <section id="expertise" className="section expertise">
          <div className="section-head">
            <div>
              <p className="eyebrow">02 / WHAT I DO</p>
              <h2>
                From questions
                <br />
                <em>to insight.</em>
              </h2>
            </div>
            <p>
              Four connected disciplines, one goal: understanding the world
              through data.
            </p>
          </div>
          <div className="skills-grid">
            {skills.map(({ icon: Icon, ...s }) => (
              <article className="skill" key={s.n}>
                <div className="skill-top">
                  <Icon size={24} strokeWidth={1.5} />
                  <span>{s.n} / 04</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <div className="skill-line" />
                <div className="skill-chart">
                  <p className="chart-disclaimer">Illustrative visualization</p>
                  {s.n === "01" ? (
                    <DataAnalysisChart />
                  ) : s.n === "02" ? (
                    <ParticleCollisionChart />
                  ) : s.n === "03" ? (
                    <AIModelChart />
                  ) : (
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={learningOptions}
                    />
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="section lab">
          <div className="lab-copy">
            <p className="eyebrow">03 / THE DATA LAB</p>
            <h2>
              Every dataset
              <br />
              <em>has a story.</em>
            </h2>
            <p>
{view === "standard" ? "Explore the normal distribution, a mathematical model used in statistics and physics." : "Compare the rest-mass energies of selected Standard Model particles, from the top quark to the electron."}
            </p>
            <p className="note">
{view === "standard" ? "Calculated from the normal probability density function; not experimental measurements." : <>Approximate values in GeV on a logarithmic scale. Lines connect distinct categories, not intermediate particles. Massless particles and neutrinos are not shown. <a href="https://pdg.lbl.gov/2025/listings/particle_properties.html" target="_blank" rel="noreferrer">Particle Data Group ↗</a></>}
            </p>
          </div>
          <div className="chart-panel">
            <div className="chart-top">
              <span>
                <span className="status-dot" /> INTERACTIVE STUDY
              </span>
              <span>FIG. 01</span>
            </div>
            <div className="chart-title">
              <div>
                <h3>{view === "standard" ? "The normal distribution" : "Particle rest-mass energies"}</h3>
                <p>
{view === "standard" ? <>μ = {active.mean} · σ = {active.sigma} · f(x) = e⁻⁽ˣ⁻μ⁾²⁄²σ² / (σ√2π)</> : "Selected particles · E₀ = mc² · GeV"}
                </p>
              </div>
            </div>
            <div className="chart-tabs" role="group" aria-label="Choose chart">
              {Object.entries(charts).map(([key, item]) => (
                <button
                  key={key}
                  className={view === key ? "active" : ""}
                  onClick={() => setView(key)}
                  aria-pressed={view === key}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <HighchartsReact key={view} highcharts={Highcharts} options={view === "standard" ? options : particleOptions} />
          </div>
        </section>
        <section
          className="physics-banner"
          style={{ "--physics-image": `url(${collision})` }}
        >
          <div className="physics-overlay" />
          <div className="physics-content">
            <p className="eyebrow">A CLOSER LOOK AT THE UNIVERSE</p>
            <h2>
              Big questions.
              <br />
              <em>Small particles.</em>
            </h2>
            <p>
              Using computation to explore the signals left behind by the
              fundamental building blocks of matter.
            </p>
            <span>HIGH-ENERGY PHYSICS / DATA / SIMULATION</span>
            <small className="image-credit">CMS event display · © CERN</small>
          </div>
        </section>
        <section id="projects" className="section projects">
          <div className="section-head">
            <div>
              <p className="eyebrow">04 / SELECTED WORK</p>
              <h2>
                Questions worth
                <br />
                <em>exploring.</em>
              </h2>
            </div>
            <p>
              A selection of work across scientific computing, machine learning,
              and data analysis.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((p) => (
              <article className="project" key={p.number}>
                <div className="project-image">
                  {p.image ? (
                    <img src={p.image} alt="" loading="lazy" />
                  ) : (
                    <div className="project-art" aria-hidden="true">
                      <span>{p.category.split(" · ")[0]}</span>
                    </div>
                  )}
                  <span>{p.number} / 04</span>
                </div>
                <div className="project-body">
                  <p className="project-category">{p.category}</p>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <div className="tags">
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <a
                    className="project-link"
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View repository <ArrowUpRight size={15} />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="project-footer">
            <p>More experiments, code, and ongoing work.</p>
            <a
              className="button secondary"
              href="https://github.com/amilcar-data"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={17} /> Explore GitHub <ArrowUpRight size={15} />
            </a>
          </div>
        </section>
        <section id="contact" className="section contact">
          <p className="eyebrow">05 / LET’S CONNECT</p>
          <h2>
            Have a question
            <br />
            <em>worth exploring?</em>
          </h2>
          <p>
            I’m always interested in conversations about data, AI, scientific
            computing, and opportunities to learn and collaborate.
          </p>
          <a
            className="button primary"
            href="https://github.com/amilcar-data"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={17} /> Connect on GitHub <ArrowUpRight size={15} />
          </a>
        </section>
      </main>
      <footer>
        <a className="footer-brand" href="#top">
          A<span>.</span> TORRES
        </a>
        <span>DATA · AI · PHYSICS</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </>
  );
}
export default App;
