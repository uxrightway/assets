import React, { useState } from "react";
const A = "https://raw.githubusercontent.com/uxrightway/assets/main/";
export default function App() {
  const [recs, setRecs] = useState([true, true]);
  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <img className="logo" src={A + "RightWayLogo.svg"} alt="Rightway" />
          <div className="header-actions">
            <button>
              <img src={A + "ID.svg"} alt="Member ID" />
            </button>
            <button>
              <img src={A + "UserProfile.svg"} alt="Profile" />
            </button>
          </div>
        </div>
      </header>
      <main className="shell">
        <aside className="sidebar">
          <nav>
            {[
              ["Navigation/Home.svg", "Home"],
              ["Doctor.svg", "Get Care"],
              ["Navigation/Benefits.svg", "Benefits"],
              [null, "Bill Support"],
              ["UserProfile.svg", "Profile & Settings"],
              ["Navigation/Inbox.svg", "Inbox"],
            ].map((x, i) => (
              <a className={i === 0 ? "active" : ""} href="#" key={x[1]}>
                {x[0] ? (
                  <img src={A + x[0]} alt="" />
                ) : (
                  <span className="drawn-icon">$</span>
                )}
                <span>{x[1]}</span>
                {i === 5 && <b>1</b>}
              </a>
            ))}
          </nav>
          <p className="powered">
            Powered by <strong>Rightway</strong>
          </p>
        </aside>
        <section className="content">
          <section className="guide card">
            <div className="guide-photo">
              <img
                src="https://raw.githubusercontent.com/uxrightway/assets/main/avatarPharmacyHealthGuide.png"
                alt="Your Health Guide"
              />
              <span />
            </div>
            <div className="guide-content">
              <p>
                Our <strong>Health Guides</strong> are humans, here to help.{" "}
                <span className="heart">♥</span>
              </p>
              <div className="guide-actions">
                {[
                  ["Chat.svg", "Chat"],
                  ["Call.svg", "Call"],
                  ["Inbox.svg", "Inbox"],
                ].map((x) => (
                  <button key={x[1]}>
                    <span>
                      <img src={A + x[0]} alt="" />
                    </span>
                    {x[1]}
                  </button>
                ))}
              </div>
            </div>
          </section>
          <section className="quick card">
            <h2>How can we help you today?</h2>
            <div className="action-grid">
              {[
                ["Doctor.svg", "blue", "Find a Doctor", "or Facility"],
                [null, "purple", "Schedule", "Appointment"],
                ["Navigation/Benefits.svg", "yellow", "Benefits", "Support"],
                [null, "orange", "Billing", "Questions"],
                [null, "green", "Clinical", "Guidance"],
              ].map((x) => (
                <button key={x[2]}>
                  <span className={`icon ${x[1]}`}>
                    {x[0] ? <img src={A + x[0]} alt="" /> : "▣"}
                  </span>
                  <strong>
                    {x[2]}
                    <br />
                    {x[3]}
                  </strong>
                </button>
              ))}
            </div>
          </section>
          <section className="requests card">
            <div className="section-head">
              <h2>Current requests (5)</h2>
              <a href="#">Past Requests</a>
            </div>
            <div className="request-grid">
              <article className="request appointment">
                <h3>
                  <span className="calendar">
                    ▣<i>✓</i>
                  </span>
                  Appointment Confirmed
                </h3>
                <div className="doctor-row">
                  <img
                    src="https://raw.githubusercontent.com/uxrightway/assets/main/avatarPharmacyHealthGuide.png"
                    alt="Dr Joshua Parker"
                  />
                  <div>
                    <strong>Dr Joshua Parker</strong>
                    <small>Dermatologist</small>
                  </div>
                </div>
                <div className="appointment-meta">
                  <span>▣ Dec 12, 2025</span>
                  <span>◷ 10:00 AM</span>
                </div>
              </article>
              <article className="request progress-card">
                <h3>
                  <span className="provider-circle">
                    <img src={A + "Doctor.svg"} alt="" />
                  </span>
                  <span>
                    {"{CareType} Recommendations"}
                    <small>Submitted Dec 5, 2025</small>
                  </span>
                </h3>
                <div className="progress">
                  <span className="done">✓</span>
                  <i />
                  <span className="done">✓</span>
                  <i />
                  <span />
                </div>
                <div className="progress-labels">
                  <span>Submitted</span>
                  <span>In Progress</span>
                  <span>Completed</span>
                </div>
              </article>
            </div>
          </section>
          <section className="recommended">
            <h2>Recommended for you</h2>
            <div className="recommend-grid">
              {recs[0] && (
                <article
                  className="recommend"
                  style={{
                    backgroundImage:
                      "url('https://raw.githubusercontent.com/uxrightway/assets/main/recommendedforyou/Activity_card_Medical_Benefit.png')",
                  }}
                >
                  <div>
                    <span className="tag">Healthcare Benefits</span>
                    <button
                      className="dismiss"
                      onClick={() => setRecs([false, recs[1]])}
                    >
                      ×
                    </button>
                  </div>
                  <h3>Get ready for your next checkup.</h3>
                  <p>
                    Prepare for your upcoming appointments by reviewing your
                    2026 healthcare benefits.
                  </p>
                  <button className="pill">Start Now</button>
                </article>
              )}
              {recs[1] && (
                <article
                  className="recommend"
                  style={{
                    backgroundImage:
                      "url('https://raw.githubusercontent.com/uxrightway/assets/main/recommendedforyou/Activity_card_Mindfulness.png')",
                  }}
                >
                  <div>
                    <span className="tag">Wellness</span>
                    <button
                      className="dismiss"
                      onClick={() => setRecs([recs[0], false])}
                    >
                      ×
                    </button>
                  </div>
                  <h3>Mindfulness &amp; stress relief program.</h3>
                  <p>Simple ways to feel calmer.</p>
                  <button className="pill">Sign Up</button>
                </article>
              )}
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
