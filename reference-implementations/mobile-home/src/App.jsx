import React, { useState } from "react";
const A = "https://raw.githubusercontent.com/uxrightway/assets/main/";
const meds = [
  {
    name: "Enalapril 2.5mg",
    image: "medications/enalapril.png",
    status: "Prior authorization not approved",
    kind: "not-approved",
    option: true,
  },
  {
    name: "Ozempic 4mg",
    image: "medications/ozempic.png",
    status: "Ready to refill",
    kind: "refill",
    pharmacy: "Walgreens",
    logo: "PharmacyLogos/WalgreensLogo.png",
  },
  {
    name: "Ozempic 4mg",
    image: "medications/ozempic.png",
    status: "New medication",
    kind: "new",
    pharmacy: "Walgreens",
    logo: "PharmacyLogos/WalgreensLogo.png",
  },
];
function Guide() {
  return (
    <section className="guide">
      <p>
        Our <strong>Pharmacy Guides</strong> are humans, here to help.{" "}
        <span>♥</span>
      </p>
      <div className="guide-body">
        <div className="guide-actions">
          {[
            ["Chat.svg", "Chat"],
            ["Call.svg", "Call"],
            ["Inbox.svg", "Inbox"],
          ].map(([icon, label]) => (
            <button key={label}>
              <i>
                <img src={A + icon} alt="" />
                {label === "Inbox" && <b>1</b>}
              </i>
              {label}
            </button>
          ))}
        </div>
      <div className="portrait">
        <img
          src={A + "avatarPharmacyHealthGuide.png"}
          alt="Your Pharmacy Guide"
        />
        <span className="portrait-status" aria-label="Available" />
      </div>
      </div>
    </section>
  );
}
function Medication({ m }) {
  return (
    <article className="med-card">
      <div className="status-row">
        <span className={`status-label ${m.kind}`}>{m.status}</span>
        <a href="#">→</a>
      </div>
      <div className="drug-row">
        <img src={A + m.image} alt="" />
        <div className="drug-info">
          <h3>{m.name}</h3>
          <p>♙ {m.option ? "" : "Refills Left 1"}</p>
        </div>
      </div>
      {m.option ? (
        <div className="option-row">
          <span>Options may be available</span>
          <a href="#">Learn More</a>
        </div>
      ) : (
        <div className="pharmacy-row">
          <span>
            <img src={A + m.logo} alt="" />
            {m.pharmacy}
          </span>
          <a className="call" href="#">
            ⌕ Call
          </a>
        </div>
      )}
    </article>
  );
}
export default function App() {
  const [program, setProgram] = useState(true);
  const [recs, setRecs] = useState([true, true]);
  return (
    <main className="phone">
      <section className="hero">
        <div className="status" />
        <div className="top">
          <img src={A + "RightWayLogo.svg"} alt="Rightway" />
          <div>
            <button aria-label="Member ID">
              <img src={A + "Navigation/ID.svg"} alt="" />
            </button>
            <button aria-label="Profile">
              <img src={A + "Navigation/UserProfile.svg"} alt="" />
            </button>
          </div>
        </div>
        <Guide />
      </section>
      <section className="search">
        <h2>Find the lowest drug prices</h2>
        <label>
          <img src={A + "Search.svg"} alt="" />
          <input type="search" placeholder="Enter drug name" />
        </label>
      </section>
      {program && (
        <section className="program">
          <button
            className="close"
            onClick={() => setProgram(false)}
            aria-label="Dismiss"
          >
            ×
          </button>
          <div className="program-copy">
            <div className="program-title">
              <small>You’re Eligible</small>
              <h2>
                Weight management
                <br />
                Program
              </h2>
            </div>
            <a href="#">
              Enter Program <b>→</b>
            </a>
          </div>
          <img src={A + "curveimageWeightManagment.png"} alt="" />
        </section>
      )}
      <section className="quick">
        <h2>How can we help you today?</h2>
        <div>
          {[
            ["PharmacyCoverage.svg", "Find a", "Pharmacy"],
            ["Mailorder.svg", "Switch to Mail", "Order"],
            ["TransferMedication.svg", "Transfer a", "Medication"],
          ].map((x) => (
            <button key={x[1]}>
              <i>
                <img src={A + x[0]} alt="" />
              </i>
              <span>
                {x[1]}
                <br />
                {x[2]}
              </span>
            </button>
          ))}
        </div>
      </section>
      <section className="medications">
        <div className="section-head">
          <h2>Your medications</h2>
          <a href="#">See All</a>
        </div>
        <div id="medicationList">
          {meds.map((m) => (
            <Medication key={m.status} m={m} />
          ))}
        </div>
      </section>
      <section className="recommendations">
        <h2>Recommended for you</h2>
        <div className="recommend-scroll">
          {recs[0] && (
            <article
              style={{
                backgroundImage: `url(${A}recommendedforyou/Activity_card_Medical_Benefit.png)`,
              }}
            >
              <div>
                <span>Healthcare Benefits</span>
                <button onClick={() => setRecs([false, recs[1]])}>×</button>
              </div>
              <h3>Get ready for your next checkup.</h3>
              <p>
                Prepare for your upcoming appointments by reviewing your 2026
                healthcare benefits.
              </p>
              <a href="#">Start now</a>
            </article>
          )}
          {recs[1] && (
            <article
              style={{
                backgroundImage: `url(${A}recommendedforyou/Activity_card_Mindfulness.png)`,
              }}
            >
              <div>
                <span>Wellness</span>
                <button onClick={() => setRecs([recs[0], false])}>×</button>
              </div>
              <h3>Mindfulness &amp; stress relief program.</h3>
              <p>Simple ways to feel calmer.</p>
              <a href="#">Sign up</a>
            </article>
          )}
        </div>
      </section>
      <nav className="bottom-nav">
        {[
          ["Home.svg", "Home"],
          ["Medication.svg", "Medications"],
          ["Benefits.svg", "Benefits"],
          ["Inbox.svg", "Inbox"],
        ].map((x, i) => (
          <a className={i === 0 ? "active" : ""} href="#" key={x[1]}>
            <img src={A + "Navigation/" + x[0]} alt="" />
            <span>{x[1]}</span>
            {i === 0 && <i />}
          </a>
        ))}
      </nav>
    </main>
  );
}
