import React, { useState } from 'react';
import providerPhoto from './assets/provider-photo.png';

const ASSET = 'https://raw.githubusercontent.com/uxrightway/assets/main/';
const recommendationBenefits = ASSET+'recommendedforyou/Activity_card_Medical_Benefit.png';
const recommendationWellness = ASSET+'recommendedforyou/Activity_card_Mindfulness.png';
const menuItems = [['Navigation/Home.svg','Home'],['Navigation/Get Care.svg','Get Care'],['Navigation/Benefits.svg','Benefits'],['Navigation/Bill.svg','Bill Support'],['UserProfile.svg','Profile & Settings'],['Navigation/Inbox.svg','Inbox']];
const quickActions = [['Find Doctor Icon.svg','blue','Find a Doctor','or Facility'],['Calnder.svg','purple','Schedule','Appointment'],['Benefits Support Icon.svg','yellow','Benefits','Support'],['Billing Questions Icon.svg','orange','Billing','Questions'],['Clinical Guidance Icon.svg','green','Clinical','Guidance']];

function Progress({ actionNeeded = false }) {
  return <div className="status-wrap" aria-label={actionNeeded ? 'Submitted, action needed, not completed' : 'Submitted, in progress, not completed'}>
    <div className="status-track"><span className="status-dot complete">✓</span><i/><span className={'status-dot '+(actionNeeded?'attention':'complete')}>{actionNeeded?'!':'✓'}</span><i/><span className="status-dot"/></div>
    <div className="status-labels"><span>Submitted</span><span>{actionNeeded?'Action Needed':'In Progress'}</span><span>Completed</span></div>
  </div>;
}

function Recommendation({ image, tag, title, body, action, onDismiss }) {
  return <article className="recommendation" style={{backgroundImage:'url('+image+')'}}>
    <a className="recommendation-card-link" href={'#recommendation-'+tag.toLowerCase().replaceAll(' ','-')} aria-label={'Open '+tag+' recommendation'}/>
    <div className="recommendation-content"><div className="recommendation-top"><span className="tag">{tag}</span><button className="dismiss" onClick={onDismiss} aria-label={'Dismiss '+tag+' recommendation'}>×</button></div>
    <div className="recommendation-copy"><h3>{title}</h3><p>{body}</p></div></div><div className="recommendation-action"><button className="pill" aria-label={action+' for '+tag}>{action}</button></div>
  </article>;
}

export default function App() {
  const [recommendations,setRecommendations]=useState([true,true,true]);
  const [announcement,setAnnouncement]=useState('');
  const dismissRecommendation=(index,label)=>{
    setRecommendations(current=>current.map((visible,itemIndex)=>itemIndex===index?false:visible));
    setAnnouncement(label+' recommendation dismissed');
  };
  return <>
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
    <header className="topbar"><div className="topbar-inner"><a className="logo-link" href="#home" aria-label="Rightway home"><img className="logo" src={ASSET+'RightWayLogo.svg'} alt=""/></a><div className="header-actions"><button type="button" aria-label="Open member ID"><img src={ASSET+'ID.svg'} alt=""/></button><button type="button" aria-label="Open profile and settings"><img src={ASSET+'UserProfile.svg'} alt=""/></button></div></div></header>
    <main className="shell" id="main-content" tabIndex="-1">
      <aside className="sidebar"><nav aria-label="Primary navigation">{menuItems.map(([icon,label],index)=><a className={index===0?'active':''} href={'#'+label.toLowerCase().replaceAll(' ','-').replace('&','and')} aria-current={index===0?'page':undefined} key={label}><img src={ASSET+icon} alt=""/><span>{label}</span>{label==='Inbox'&&<b aria-label="1 unread message">1</b>}</a>)}</nav><div className="powered"><span>Powered by</span><img src={ASSET+'WordmarkRightway.svg'} alt="Rightway"/></div></aside>
      <section className="content">
        <section className="guide card" aria-labelledby="guide-heading"><div className="guide-photo"><img src={ASSET+'avatarPharmacyHealthGuide.png'} alt="Rightway Pharmacy Guide"/><span aria-label="Available" role="img"/></div><div className="guide-content"><h1 id="guide-heading">Our <strong>Pharmacy Guides</strong> are humans, here to help. <span className="heart" aria-hidden="true">❤</span></h1><div className="guide-actions">{[['Chat.svg','Chat'],['Call.svg','Call'],['Inbox.svg','Inbox']].map(([icon,label])=><button key={label} aria-label={label+' with a Pharmacy Guide'}><span><img src={ASSET+icon} alt=""/></span>{label}</button>)}</div></div></section>
        <section className="quick card" aria-labelledby="quick-heading"><h2 id="quick-heading">How can we help you today?</h2><div className="action-grid">{quickActions.map(([icon,color,line1,line2])=><button key={line1+'-'+line2} aria-label={line1+' '+line2}><span className={'quick-icon '+color}><img src={ASSET+icon} alt=""/></span><strong>{line1}<br/>{line2}</strong></button>)}</div></section>
        <section className="requests card" aria-labelledby="requests-heading">
          <div className="section-head"><h2 id="requests-heading">Current requests (3)</h2><a href="#past-requests">Past Requests</a></div>
          <article className="request appointment-request"><a className="request-card-link" href="#appointment-confirmed" aria-label="Open Appointment Confirmed request"/><div className="request-title"><span className="request-icon purple"><img src={ASSET+'Calnder.svg'} alt=""/><i aria-hidden="true">✓</i></span><h3>Appointment Confirmed</h3></div><div className="appointment-panel"><div className="provider-group"><img src={providerPhoto} alt="Dr Joshua Parker"/><div className="doctor"><strong>Dr Joshua Parker</strong><small>Dermatologist</small></div></div><div className="appointment-meta"><span><img src={ASSET+'Appointment Date.svg'} alt=""/>Dec 12, 2025</span><span><img src={ASSET+'clock-filled.svg'} alt=""/>10:00 AM</span></div></div></article>
          <article className="request progress-request"><a className="request-card-link" href="#dental-care-recommendations" aria-label="Open Dental Care Recommendations request"/><div className="request-summary"><span className="request-icon blue"><img src={ASSET+'Find Doctor Icon.svg'} alt=""/></span><div><h3>Dental Care Recommendations</h3><small>Submitted Dec 5, 2025</small></div></div><Progress/></article>
          <article className="request progress-request action-needed"><a className="request-card-link" href="#november-pharmacy-bill-support" aria-label="Open November Pharmacy Bill Support request"/><div className="request-main-row"><div className="request-summary"><span className="request-icon orange"><img src={ASSET+'Billing Questions Icon.svg'} alt=""/></span><div><h3>November Pharmacy Bill Support</h3><small>Submitted Dec 5, 2025</small></div></div><Progress actionNeeded/></div><button className="alert-link" aria-label="Continue November Pharmacy Bill Support in chat">More information needed. Continue in Bill Support Chat. <span aria-hidden="true">→</span></button></article>
        </section>
        <section className="recommended" aria-labelledby="recommended-heading"><h2 id="recommended-heading">Recommended for you</h2><div className="recommend-grid">{recommendations[0]&&<Recommendation image={recommendationBenefits} tag="Healthcare Benefits" title="Get ready for your next checkup." body="Prepare for your upcoming appointments by reviewing your 2026 healthcare benefits." action="Start Now" onDismiss={()=>dismissRecommendation(0,'Healthcare Benefits')}/>} {recommendations[1]&&<Recommendation image={recommendationWellness} tag="Wellness" title="Mindfulness & stress relief program." body="Simple ways to feel calmer." action="Sign Up" onDismiss={()=>dismissRecommendation(1,'Wellness')}/>} {recommendations[2]&&<Recommendation image={ASSET+'recommendedforyou/Activity_card_PBM_Benefit.png'} tag="Health Management" title="Manage your Diabetes and Maximize your Savings." body="Better diabetes care at lower cost." action="Sign Up" onDismiss={()=>dismissRecommendation(2,'Health Management')}/>}</div></section>
      </section>
    </main>
  </>;
}
