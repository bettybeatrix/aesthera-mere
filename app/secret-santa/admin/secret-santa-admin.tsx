"use client";
import { useState } from "react";
import styles from "../secret-santa.module.css";
type Status = { participants: {name:string;wishlistSubmitted:boolean}[]; total:number; wishlistsSubmitted:number; assignments:number; uniqueRecipients:number; missingGivers:number; missingRecipients:number; selfAssignments:number; drawComplete:boolean };
type Code = {name:string;accessCode:string};
export default function SecretSantaAdmin() {
  const [key,setKey]=useState("");
  const [status,setStatus]=useState<Status|null>(null);
  const [codes,setCodes]=useState<Code[]|null>(null);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");
  const [message,setMessage]=useState("");
  const [demoPairs,setDemoPairs]=useState<{giver:string;recipient:string}[]|null>(null);
  async function request(path:string,method="GET") {
    return fetch(path,{method,headers:{"x-secret-santa-setup-key":key},cache:"no-store"});
  }
  async function refresh() {
    setBusy(true);setError("");setMessage("");
    try { const r=await request("/api/secret-santa/admin/status");const d=await r.json();if(!r.ok)throw new Error(d.error||"Unable to load status.");setStatus(d); }
    catch(e){setError(e instanceof Error?e.message:"Unable to load status.");}
    setBusy(false);
  }
  async function generateCodes() {
    if(!window.confirm("Generate a new set of 13 access codes? Any previously issued codes will stop working."))return;
    setBusy(true);setError("");setMessage("");
    try { const r=await request("/api/secret-santa/admin/codes","POST");const d=await r.json();if(!r.ok)throw new Error(d.error||"Unable to generate codes.");setCodes(d.accessCodes);setMessage(d.message);await refresh(); }
    catch(e){setError(e instanceof Error?e.message:"Unable to generate codes.");}
    setBusy(false);
  }
  async function startDraw() {
    if(!window.confirm("Start the final Secret Santa draw? This cannot be undone."))return;
    setBusy(true);setError("");setMessage("");
    try { const r=await request("/api/secret-santa/draw","POST");const d=await r.json();if(!r.ok)throw new Error(d.error||"The draw failed.");setMessage(d.message);await refresh(); }
    catch(e){setError(e instanceof Error?e.message:"The draw failed.");}
    setBusy(false);
  }
  function previewDummyDraw() {
    const demoNames = Array.from({ length: 13 }, (_, index) => `Test Participant ${String(index + 1).padStart(2, "0")}`);
    const recipients = [...demoNames];
    for (let attempt = 0; attempt < 100; attempt++) {
      for (let i = recipients.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [recipients[i], recipients[j]] = [recipients[j], recipients[i]];
      }
      if (recipients.every((name, index) => name !== demoNames[index])) break;
    }
    setDemoPairs(demoNames.map((giver, index) => ({ giver, recipient: recipients[index] })));
  }
  function downloadCodes() {
    if(!codes)return;
    const csv=["Name,Private Access Code",...codes.map(x=>'"'+x.name.replaceAll('"','""')+'","'+x.accessCode+'"')].join("\n");
    const url=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));const a=document.createElement("a");a.href=url;a.download="secret-santa-private-access-codes.csv";a.click();URL.revokeObjectURL(url);
  }
  return <main className={styles.page}><header className={styles.header}><p className={styles.brand}>AESTHERA MÈRE</p><p className={styles.brandSub}>BEAUTY CREATIONS</p><div className={styles.rule}><span>✧</span></div><p className={styles.eyebrow}>YEAR-END PARTY 2026</p><h1>Organizer</h1><p className={styles.tagline}>Secret Santa control center</p></header>
  <section className={styles.panel}><p className={styles.kicker}>PRIVATE ORGANIZER ACCESS</p><h2>Admin Dashboard</h2><p className={styles.intro}>Enter your private setup key to monitor wishlist submissions and verify the draw. This key is never saved in the browser.</p><form className={styles.form} onSubmit={e=>{e.preventDefault();void refresh();}}><label htmlFor="admin-key">Organizer setup key</label><input id="admin-key" type="password" value={key} onChange={e=>setKey(e.target.value)} autoComplete="off" required/><button disabled={busy||!key}>{busy?"Checking...":"Open dashboard"}</button></form>
  {error&&<p className={styles.error}>{error}</p>}{message&&<p className={styles.success}>{message}</p>}</section>
  {status&&<section className={styles.dashboard} style={{marginTop:18}}><div className={styles.budgetCard}><div><span>WISHLISTS SUBMITTED</span><strong>{status.wishlistsSubmitted}/{status.total}</strong></div><div><span>DRAW ASSIGNMENTS</span><strong>{status.assignments}/{status.total}</strong></div></div>
  <div className={styles.recipientCard}><p className={styles.kicker}>DRAW INTEGRITY CHECK</p><h3>{status.drawComplete?"All assignments valid":status.assignments===0?"Draw not started":"Draw needs review"}</h3><p>Unique recipients: {status.uniqueRecipients}/{status.total}</p><p>Missing givers: {status.missingGivers} · Missing recipients: {status.missingRecipients}</p><p>Self-assignments: {status.selfAssignments}</p><p>{status.drawComplete?"Every participant has exactly one distinct recipient.":"The draw is not yet complete or needs attention."}</p></div>
  <div className={styles.recipientCard}><p className={styles.kicker}>PARTICIPANT CHECKLIST</p>{status.participants.map(p=><div key={p.name} style={{display:"flex",justifyContent:"space-between",gap:12,padding:"9px 0",borderBottom:"1px solid #eee",fontSize:12}}><span>{p.name}</span><strong style={{color:p.wishlistSubmitted?"#55734f":"#999"}}>{p.wishlistSubmitted?"Wishlist submitted":"Pending"}</strong></div>)}</div>
  <div className={styles.panelForm}><h3>Organizer actions</h3><button type="button" onClick={previewDummyDraw} disabled={busy}>Preview sample draw (dummy data)</button><p className={styles.helper}>This is a practice preview using 13 fictional participants. It does not save anything to the database and will not affect the real draw.</p><button type="button" onClick={refresh} disabled={busy}>Refresh status</button><button type="button" onClick={generateCodes} disabled={busy||status.assignments>0}>Generate / replace all 13 access codes</button><button type="button" onClick={startDraw} disabled={busy||status.wishlistsSubmitted!==13||status.assignments>0}>Start final draw</button><p className={styles.helper}>The draw button only activates when all 13 wishlists are submitted and no previous draw exists.</p></div>
  {demoPairs&&<div className={styles.recipientCard}><p className={styles.kicker}>SAMPLE DRAW PREVIEW · DUMMY DATA ONLY</p><h3>Example giver and recipient pairs</h3><p className={styles.helper}>These are fictional names for demonstration. No real participant assignments have been made.</p>{demoPairs.map(pair=><div key={pair.giver} style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:10,padding:"9px 0",borderBottom:"1px solid #eee",fontSize:12}}><span>{pair.giver}</span><span aria-hidden="true">→</span><strong>{pair.recipient}</strong></div>)}<button style={{marginTop:16}} onClick={previewDummyDraw}>Generate another sample</button><button style={{marginTop:8}} onClick={()=>setDemoPairs(null)}>Close preview</button></div>}{codes&&<div className={styles.recipientCard}><p className={styles.kicker}>ONE-TIME ACCESS CODES</p><p className={styles.helper}>Download this list now and send each code privately. It will disappear if you leave or refresh this page.</p>{codes.map(c=><div key={c.name} style={{display:"flex",justifyContent:"space-between",gap:12,padding:"9px 0",borderBottom:"1px solid #eee",fontSize:12}}><span>{c.name}</span><code>{c.accessCode}</code></div>)}<button style={{marginTop:16}} onClick={downloadCodes}>Download access codes (CSV)</button></div>}</section>}
  <footer className={styles.footer}>AESTHERA MÈRE BEAUTY CREATIONS <span>✧</span> GLITZ & GLAM 2026</footer></main>;
}
