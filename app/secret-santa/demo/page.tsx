"use client";
import { useEffect, useState } from "react";
import styles from "../secret-santa.module.css";

const people = ["Ma'am Zophia","Sir Jace","Sir Lui","Ma'am Tarah","Ma'am Chi","Ma'am Mae","Ma'am Danna","Ma'am Acel","Sir Popoy","Doc Ian","Doc Raine","Cianna","James"];
const codes = ["DEMOZOPHIA","DEMOJACE01","DEMOLUI0001","DEMOTARAH01","DEMOCHI00001","DEMOMAE00001","DEMODANNA001","DEMOACEL0001","DEMOPOPOY001","DEMOIAN00001","DEMORAINE001","DEMOCIANNA001","DEMOJAMES0001"];
type State = { wishlists: Record<string,string[]>; assignments: Record<string,string> };
const STORE="aesthera-secret-santa-demo-v1";
export default function SecretSantaDemo() {
 const [state,setState]=useState<State>({wishlists:{},assignments:{}});
 const [loaded,setLoaded]=useState(false);
 const [code,setCode]=useState("");
 const [person,setPerson]=useState<number|null>(null);
 const [ideas,setIdeas]=useState(["","",""]);
 const [error,setError]=useState("");
 const [message,setMessage]=useState("");
 useEffect(()=>{try{const raw=localStorage.getItem(STORE);if(raw)setState(JSON.parse(raw));}catch{}setLoaded(true);},[]);
 function persist(next:State){setState(next);localStorage.setItem(STORE,JSON.stringify(next));}
 function login(e:React.FormEvent){e.preventDefault();const i=codes.indexOf(code.trim().toUpperCase());if(i<0){setError("Demo code not recognized. Check the sample code list.");return;}setPerson(i);setIdeas([...(state.wishlists[people[i]]||[]),"","",""].slice(0,3));setError("");}
 function save(e:React.FormEvent){e.preventDefault();if(person===null)return;const list=ideas.map(x=>x.trim()).filter(Boolean);if(!list.length){setError("Add at least one gift idea.");return;}persist({...state,wishlists:{...state.wishlists,[people[person]]:list}});setMessage("Demo wishlist saved on this browser.");setError("");}
 function draw(){if(Object.keys(state.wishlists).length!==13){setError("Save a wishlist for all 13 demo participants first.");return;}const recipients=[...people];for(let attempt=0;attempt<1000;attempt++){for(let i=recipients.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[recipients[i],recipients[j]]=[recipients[j],recipients[i]];}if(recipients.every((x,i)=>x!==people[i]))break;}persist({...state,assignments:Object.fromEntries(people.map((p,i)=>[p,recipients[i]]))});setMessage("Demo draw complete! Sign in using any demo code to see that participant's private recipient.");setError("");}
 function reset(){if(!window.confirm("Clear all demo wishlists and demo assignments from this browser? Real Secret Santa data will not be affected."))return;const next={wishlists:{},assignments:{}};persist(next);setPerson(null);setCode("");setMessage("Demo data cleared.");}
 if(!loaded)return <main className={styles.page}><div className={styles.loading}>Loading demo...</div></main>;
 const recipient=person===null?null:state.assignments[people[person]];
 return <main className={styles.page}><header className={styles.header}><p className={styles.brand}>AESTHERA MÈRE</p><p className={styles.brandSub}>BEAUTY CREATIONS</p><div className={styles.rule}><span>✧</span></div><p className={styles.eyebrow}>PRIVATE PRACTICE AREA · NOT THE LIVE DRAW</p><h1>Secret Santa Demo</h1><p className={styles.tagline}>Try the participant experience safely.</p></header>
 <section className={styles.panel}><p className={styles.kicker}>DEMO PARTICIPANT LOGIN</p><h2>{person===null?"Sign in as a participant":`Hello, ${people[person]}`}</h2>
 {person===null?<form className={styles.form} onSubmit={login}><label htmlFor="demo-code">Demo access code</label><input id="demo-code" value={code} onChange={e=>setCode(e.target.value.toUpperCase())} placeholder="ENTER DEMO CODE" required/><button type="submit">Log in to demo</button></form>:<><div className={styles.budgetCard}><div><span>GIFT BUDGET</span><strong>₱500</strong></div><p>Demo account only</p></div>
 {recipient?<div className={styles.recipientCard}><p className={styles.kicker}>YOUR DEMO RECIPIENT</p><h3>{recipient}</h3><p>Keep it a secret! This is a simulated assignment, not the real draw.</p><h4>Wishlist</h4><ul>{(state.wishlists[recipient]||[]).map((x,i)=><li key={i}>{x}</li>)}</ul></div>:<div className={styles.drawCard}><p className={styles.kicker}>THE SECRET DRAW</p><h3>Waiting for the demo draw</h3><p>Once the demo organizer runs the sample draw, sign in again to reveal your recipient.</p></div>}
 <form className={styles.panelForm} onSubmit={save}><h3>Your demo wishlist</h3><p className={styles.helper}>Add up to three sample gift ideas.</p>{ideas.map((x,i)=><div className={styles.field} key={i}><label htmlFor={"demo-gift-"+i}>Gift idea {i+1}</label><input id={"demo-gift-"+i} value={x} onChange={e=>setIdeas(old=>old.map((v,j)=>j===i?e.target.value:v))} placeholder="e.g. tumbler, book, skincare"/></div>)}<button type="submit">Save demo wishlist</button></form>
 <button className={styles.textButton} style={{marginTop:14}} onClick={()=>{setPerson(null);setCode("");setMessage("");}}>Sign out / switch participant</button></>}
 {error&&<p className={styles.error}>{error}</p>}{message&&<p className={styles.success}>{message}</p>}
 </section>
 <section className={styles.dashboard} style={{marginTop:18}}><div className={styles.panelForm}><p className={styles.kicker}>DEMO ORGANIZER CONTROLS</p><h3>Practice the full draw</h3><p className={styles.helper}>This demo uses separate fictional test data stored only in this browser. It never contacts or changes the real Secret Santa database.</p><p>{Object.keys(state.wishlists).length} of 13 demo wishlists saved · {Object.keys(state.assignments).length} demo assignments</p><button onClick={draw} disabled={Object.keys(state.wishlists).length!==13}>Run demo draw</button><button onClick={reset}>Reset demo data</button><h4>Demo access codes</h4><p className={styles.helper}>Use these codes to switch between the 13 demo participants on this same browser:</p>{people.map((p,i)=><div key={p} style={{display:"flex",justifyContent:"space-between",gap:8,padding:"7px 0",borderBottom:"1px solid #eee",fontSize:11}}><span>{p}</span><code>{codes[i]}</code></div>)}</div></section>
 <footer className={styles.footer}>DEMO ONLY <span>✧</span> REAL PARTICIPANT DATA IS NOT AFFECTED</footer></main>;
}
