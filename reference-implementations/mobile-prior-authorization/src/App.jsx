import React, { useState } from "react";
const B = "https://raw.githubusercontent.com/uxrightway/assets/main/";
const events = [
  ["Denied-1.svg", "Prior authorization denied", "Jun 15, 2026"],
  ["Fax.svg", "Fax sent to your provider", "Jun 14, 2026"],
  ["RequestInfo.svg", "Request for more information", "Jun 13, 2026"],
  ["called-Provider%20Icon.svg", "Called your provider", "Jun 14, 2026"],
  ["Fax.svg", "Fax sent to your provider", "Jun 13, 2026"],
  [
    "PriorAuthorizationRequest.svg",
    "Prior authorization requested",
    "Jun 12, 2026",
  ],
];
export default function App() {
  const [open, setOpen] = useState(true);
  return (
    <main className="phone">
      <header className="top">
        <button className="round">
          <img src={B + "Back.svg"} alt="Back" />
        </button>
        <div className="top-right">
          <button className="avatar">
            <img src={B + "RightwayAvatarCircle.png"} alt="Pharmacy Guide" />
            <i />
            <b>1</b>
          </button>
          <button className="round">
            <img src={B + "Call.svg"} alt="Call" />
          </button>
        </div>
      </header>
      <h1>Prior Authorization</h1>
      <section className="drug-card">
        <span className="denied">
          <img src={B + "Denied.svg"} alt="" />
          DENIED
        </span>
        <h2>Ozempic</h2>
        <p className="subtitle">Semaglutide injection · 1 mg / 0.74 mL pen</p>
        <div className="chips">
          <span>
            <img src={B + "Provider%20Icon.svg"} alt="" />
            Dr. Robert Smith
          </span>
          <a href="tel:9713547134">
            <img src={B + "CallOutline.svg"} alt="" />
            (971) 354-7134
          </a>
        </div>
        <div className="case">
          <div>
            <strong className="icon">
              <img src={B + "CaseFolder.svg"} alt="" />
            </strong>
            <p>
              <small>Case ID</small>
              <b>97345621</b>
            </p>
          </div>
          <hr />
          <div>
            <strong className="icon">
              <img src={B + "Calnder.svg"} alt="" />
            </strong>
            <p>
              <small>Request Date</small>
              <b>Jun 12, 2026</b>
            </p>
          </div>
        </div>
      </section>
      <section className="activity-card">
        <article className="latest">
          <div className="latest-copy">
            <label>LATEST UPDATE</label>
            <h3>
              Prior authorization not
              <br />
              approved
            </h3>
            <p>
              <b>{"{Reason for denial}"}</b>
              <br />
              You can find a covered medicine that doesn’t require a prior
              authorization or appeal this decision by chatting with a pharmacy
              guide.
            </p>
            <time>Jun 15, 2026</time>
          </div>
          <img
            className="support-image"
            src={B + "PriorAuthNotApproveSupportingImage.png"}
            alt="Prior authorization letter"
          />
          <div className="next">
            <label>NEXT STEP</label>
            <button>
              <img src={B + "ChatOutline.svg"} alt="" />
              Explore Your Options
            </button>
          </div>
        </article>
        <div className="timeline-head">
          <h3>Activity Timeline</h3>
          <button onClick={() => setOpen(!open)} aria-expanded={open}>
            <span>{open ? "Hide" : "Show"}</span>
            <img src={B + "Chevron.svg"} alt="" />
          </button>
        </div>
        {open && (
          <ol className="timeline">
            {events.map((e, i) => (
              <li className={i === 0 ? "current" : ""} key={e[1]}>
                <i>
                  <img src={B + e[0]} alt="" />
                </i>
                <p>
                  <b>{e[1]}</b>
                  <time>{e[2]}</time>
                </p>
              </li>
            ))}
          </ol>
        )}
      </section>
      <aside className="learn">
        <span>
          <img src={B + "Layer_23.svg"} alt="" />
        </span>
        <div>
          <h4>WHAT IS A PRIOR AUTHORIZATION?</h4>
          <p>
            It's a review your insurance does to make sure a medication or
            service is medically necessary and covered under your plan.
          </p>
          <a href="#">
            Learn More <img src={B + "arrow-left-regular%201.svg"} alt="" />
          </a>
        </div>
      </aside>
    </main>
  );
}
