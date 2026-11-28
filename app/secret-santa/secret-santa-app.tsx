"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./secret-santa.module.css";

type Wishlist = {
  gift_ideas: string[];
  preferred_colors: string;
  preferred_style: string;
  avoid: string;
  notes: string;
};
type MeResponse = {
  participant: { id: string; name: string };
  wishlist: Wishlist | null;
  hasDrawn: boolean;
  drawStarted: boolean;
  recipient: { name: string; wishlist: Wishlist | null } | null;
  progress: { submitted: number; total: number };
};
const emptyWishlist: Wishlist = {
  gift_ideas: ["", "", ""],
  preferred_colors: "",
  preferred_style: "",
  avoid: "",
  notes: "",
};

export default function SecretSantaApp() {
  const [accessCode, setAccessCode] = useState("");
  const [data, setData] = useState<MeResponse | null>(null);
  const [wishlist, setWishlist] = useState<Wishlist>(emptyWishlist);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [drawBusy, setDrawBusy] = useState(false);
  const [drawAnimationOpen, setDrawAnimationOpen] = useState(false);
  const [drawAnimationDone, setDrawAnimationDone] = useState(false);
  const [error, setError] = useState("");

  const loadMe = useCallback(async () => {
    const response = await fetch("/api/secret-santa/me", { cache: "no-store" });
    if (!response.ok) {
      setData(null);
      setLoading(false);
      return;
    }
    const result = (await response.json()) as MeResponse;
    setData(result);
    if (result.wishlist) {
      setWishlist({
        ...result.wishlist,
        gift_ideas: [...result.wishlist.gift_ideas, "", "", ""].slice(0, 3),
      });
      setEditing(false);
    } else {
      setWishlist(emptyWishlist);
      setEditing(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => { void loadMe(); }, [loadMe]);

  useEffect(() => {
    if (!data) return;
    const timer = window.setInterval(() => { void loadMe(); }, 15000);
    return () => window.clearInterval(timer);
  }, [data, loadMe]);

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/secret-santa/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessCode: accessCode.trim().toUpperCase() }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Unable to sign in.");
      setAccessCode("");
      await loadMe();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to sign in.");
    }
    setBusy(false);
  }

  async function saveWishlist(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (data?.drawStarted) {
      setError("The draw has started. Wishlists can no longer be edited.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/secret-santa/wishlist", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...wishlist, giftIdeas: wishlist.gift_ideas }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Unable to save your wishlist.");
      await loadMe();
      setSuccessOpen(true);
      setEditing(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to save your wishlist.");
    }
    setBusy(false);
  }

  async function drawMyRecipient() {
    if (drawBusy || data?.progress.submitted !== data?.progress.total) return;
    setDrawBusy(true);
    setError("");
    setDrawAnimationDone(false);
    setDrawAnimationOpen(true);
    try {
      const response = await fetch("/api/secret-santa/draw", { method: "POST" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "The draw is not available yet.");
      await new Promise((resolve) => window.setTimeout(resolve, 4200));
      await loadMe();
      setDrawAnimationDone(true);
    } catch (e) {
      setDrawAnimationOpen(false);
      setError(e instanceof Error ? e.message : "Unable to draw your recipient.");
    }
    setDrawBusy(false);
  }

  async function signOut() {
    setBusy(true);
    await fetch("/api/secret-santa/logout", { method: "POST" });
    setData(null);
    setWishlist(emptyWishlist);
    setEditing(false);
    setSuccessOpen(false);
    setBusy(false);
  }

  function updateGift(index: number, value: string) {
    setWishlist((current) => {
      const gift_ideas = [...current.gift_ideas];
      gift_ideas[index] = value;
      return { ...current, gift_ideas };
    });
  }

  if (loading) return <main className={styles.page}><div className={styles.loading}>Preparing your Secret Santa...</div></main>;

  return (
    <main className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />
      <header className={styles.header}>
        <p className={styles.brand}>AESTHERA MÈRE</p>
        <p className={styles.brandSub}>BEAUTY CREATIONS</p>
        <div className={styles.rule}><span>✧</span></div>
        <p className={styles.eyebrow}>YEAR-END PARTY 2026</p>
        <h1>Secret Santa</h1>
        <p className={styles.tagline}>A little wish, a little surprise.</p>
        <div className={styles.eventMeta}><span>DECEMBER 16, 2026</span><i /><span>ROMULO CAFÉ · BGC</span></div>
      </header>

      {!data ? (
        <section className={styles.panel}>
          <div className={styles.panelIcon}>✧</div>
          <p className={styles.kicker}>A PRIVATE GIFT EXCHANGE</p>
          <h2>Welcome to Secret Santa</h2>
          <p className={styles.intro}>Enter your personal access code to create your wishlist and discover your assigned recipient when the draw is ready.</p>
          <form onSubmit={signIn} className={styles.form}>
            <label htmlFor="access-code">Your private access code</label>
            <input id="access-code" value={accessCode} onChange={(event) => setAccessCode(event.target.value.toUpperCase())} placeholder="ENTER ACCESS CODE" autoComplete="one-time-code" required maxLength={16} />
            {error && <p className={styles.error}>{error}</p>}
            <button disabled={busy} type="submit">{busy ? "Checking..." : "Continue"}</button>
          </form>
          <p className={styles.privacy}>Your access code is personal. Please don't share it with anyone.</p>
        </section>
      ) : (
        <section className={styles.dashboard}>
          <div className={styles.welcomeRow}>
            <div><p className={styles.kicker}>YOUR SECRET SANTA SPACE</p><h2>Hello, {data.participant.name}.</h2></div>
            <button className={styles.textButton} onClick={signOut} disabled={busy}>Sign out</button>
          </div>

          <div className={styles.budgetCard}>
            <div><span>GIFT BUDGET</span><strong>₱500</strong></div>
            <p>One thoughtful gift. A little surprise.</p>
          </div>

          {data.hasDrawn && data.recipient ? (
            <div className={styles.recipientCard + " " + styles.revealCard}>
              <p className={styles.kicker}>YOUR SECRET RECIPIENT</p>
              <h3>{data.recipient.name}</h3>
              <p className={styles.secretNote}>Your Secret Santa assignment is ready. Keep it a secret!</p>
              <div className={styles.wishDetails}>
                <h4>Their wishlist</h4>
                {data.recipient.wishlist?.gift_ideas?.length ? <ul>{data.recipient.wishlist.gift_ideas.map((gift, index) => <li key={index}>{gift}</li>)}</ul> : <p>No gift ideas added.</p>}
                {data.recipient.wishlist?.preferred_colors && <p><b>Preferred colors:</b> {data.recipient.wishlist.preferred_colors}</p>}
                {data.recipient.wishlist?.preferred_style && <p><b>Preferred style:</b> {data.recipient.wishlist.preferred_style}</p>}
                {data.recipient.wishlist?.avoid && <p><b>Please avoid:</b> {data.recipient.wishlist.avoid}</p>}
                {data.recipient.wishlist?.notes && <p><b>Additional notes:</b> {data.recipient.wishlist.notes}</p>}
              </div>
            </div>
          ) : (
            <div className={styles.drawCard}>
              <p className={styles.kicker}>THE SECRET DRAW</p>
              <h3>{data.drawStarted ? "The draw is ready!" : "Your recipient will be revealed here."}</h3>
              <p>{data.drawStarted ? "Your assignment is being prepared. Refresh this page shortly." : "The draw becomes available once everyone has submitted a wishlist. Each participant draws their own recipient."}</p>
              <div className={styles.progress}><span style={{ width: `${Math.min(100, (data.progress.submitted / Math.max(1, data.progress.total)) * 100)}%` }} /></div>
              <small>{data.progress.submitted} of {data.progress.total} wishlists submitted</small>
              {data.progress.submitted === data.progress.total && !data.hasDrawn && <button className={styles.drawButton} type="button" onClick={drawMyRecipient} disabled={drawBusy}><span className={styles.drawButtonIcon}>✧</span>{drawBusy ? "Drawing your name..." : "Draw My Secret Santa"}<span className={styles.drawButtonHint}>Tap to reveal your surprise</span></button>}
              {error && <p className={styles.error}>{error}</p>}
            </div>
          )}

          {data.wishlist ? (
            <section className={styles.savedWishlist}>
              <div className={styles.savedHeader}>
                <div><p className={styles.kicker}>YOUR WISHLIST</p><h3>Wishlist details</h3></div>
                {!data.drawStarted && <button className={styles.editButton} type="button" onClick={() => { setError(""); setEditing(true); }}>Edit wishlist</button>}
              </div>
              {!editing ? (
                <div className={styles.savedContent}>
                  <ul>{data.wishlist.gift_ideas.map((gift, index) => <li key={index}>{gift}</li>)}</ul>
                  {data.wishlist.preferred_colors && <p><b>Preferred colors:</b> {data.wishlist.preferred_colors}</p>}
                  {data.wishlist.preferred_style && <p><b>Preferred style:</b> {data.wishlist.preferred_style}</p>}
                  {data.wishlist.avoid && <p><b>Please avoid:</b> {data.wishlist.avoid}</p>}
                  {data.wishlist.notes && <p><b>Additional notes:</b> {data.wishlist.notes}</p>}
                  {data.drawStarted && <p className={styles.lockedNote}>The draw has started. Your wishlist is now locked and cannot be edited.</p>}
                </div>
              ) : (
                <form onSubmit={saveWishlist} className={styles.panelForm}>
                  <p className={styles.helper}>You can edit your wishlist until the organizer starts the draw.</p>
                  {wishlist.gift_ideas.map((gift, index) => (
                    <div className={styles.field} key={index}>
                      <label htmlFor={`gift-${index}`}>Gift idea {index + 1}</label>
                      <input id={`gift-${index}`} value={gift} onChange={(event) => updateGift(index, event.target.value)} placeholder="e.g. skincare, tumbler, book..." maxLength={120} />
                    </div>
                  ))}
                  <div className={styles.field}><label htmlFor="colors">Preferred colors</label><input id="colors" value={wishlist.preferred_colors} onChange={(event) => setWishlist({ ...wishlist, preferred_colors: event.target.value })} placeholder="e.g. white, silver, neutrals" maxLength={160} /></div>
                  <div className={styles.field}><label htmlFor="style">Preferred style or interests</label><input id="style" value={wishlist.preferred_style} onChange={(event) => setWishlist({ ...wishlist, preferred_style: event.target.value })} placeholder="e.g. minimalist, cozy, practical" maxLength={160} /></div>
                  <div className={styles.field}><label htmlFor="avoid">Things you'd rather not receive</label><input id="avoid" value={wishlist.avoid} onChange={(event) => setWishlist({ ...wishlist, avoid: event.target.value })} placeholder="Optional" maxLength={300} /></div>
                  <div className={styles.field}><label htmlFor="notes">Additional notes</label><textarea id="notes" value={wishlist.notes} onChange={(event) => setWishlist({ ...wishlist, notes: event.target.value })} placeholder="Sizes, preferences, or helpful details..." rows={3} maxLength={500} /></div>
                  {error && <p className={styles.error}>{error}</p>}
                  <div className={styles.formActions}>
                    <button className={styles.cancelButton} type="button" onClick={() => { setEditing(false); setError(""); void loadMe(); }}>Cancel</button>
                    <button type="submit" disabled={busy}>{busy ? "Saving..." : "Save wishlist"}</button>
                  </div>
                </form>
              )}
            </section>
          ) : (
            <form onSubmit={saveWishlist} className={styles.panelForm}>
              <div><p className={styles.kicker}>YOUR WISHLIST</p><h3>What would you love to receive?</h3><p className={styles.helper}>Add up to three gift ideas within the ₱500 budget.</p></div>
              {wishlist.gift_ideas.map((gift, index) => (
                <div className={styles.field} key={index}>
                  <label htmlFor={`gift-${index}`}>Gift idea {index + 1}</label>
                  <input id={`gift-${index}`} value={gift} onChange={(event) => updateGift(index, event.target.value)} placeholder="e.g. skincare, tumbler, book..." maxLength={120} />
                </div>
              ))}
              <div className={styles.field}><label htmlFor="colors">Preferred colors</label><input id="colors" value={wishlist.preferred_colors} onChange={(event) => setWishlist({ ...wishlist, preferred_colors: event.target.value })} placeholder="e.g. white, silver, neutrals" maxLength={160} /></div>
              <div className={styles.field}><label htmlFor="style">Preferred style or interests</label><input id="style" value={wishlist.preferred_style} onChange={(event) => setWishlist({ ...wishlist, preferred_style: event.target.value })} placeholder="e.g. minimalist, cozy, practical" maxLength={160} /></div>
              <div className={styles.field}><label htmlFor="avoid">Things you'd rather not receive</label><input id="avoid" value={wishlist.avoid} onChange={(event) => setWishlist({ ...wishlist, avoid: event.target.value })} placeholder="Optional" maxLength={300} /></div>
              <div className={styles.field}><label htmlFor="notes">Additional notes</label><textarea id="notes" value={wishlist.notes} onChange={(event) => setWishlist({ ...wishlist, notes: event.target.value })} placeholder="Sizes, preferences, or helpful details..." rows={3} maxLength={500} /></div>
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit" disabled={busy || data.drawStarted}>{busy ? "Saving..." : "Save my wishlist"}</button>
            </form>
          )}
          <p className={styles.footerNote}>Your wishlist is only shared with the person assigned to you.</p>
        </section>
      )}


      {drawAnimationOpen && (
        <div className={styles.drawModalBackdrop} role="presentation">
          <section className={styles.drawModal} role="dialog" aria-modal="true" aria-labelledby="draw-modal-title">
            {!drawAnimationDone ? (
              <>
                <p className={styles.kicker}>AESTHERA MÈRE · SECRET SANTA 2026</p>
                <h2 id="draw-modal-title">The excitement begins...</h2>
                <p className={styles.drawModalCopy}>Your Secret Santa is being revealed. Good luck!</p>
                <div className={styles.drawReel} aria-label="Names spinning in the Secret Santa draw">
                  <div className={styles.reelTrack}>
                    {["Ma'am Zophia","Sir Jace","Sir Lui","Ma'am Tarah","Ma'am Chi","Ma'am Mae","Ma'am Danna","Ma'am Acel","Sir Popoy","Doc Ian","Doc Raine","Cianna","James", "Ma'am Zophia","Sir Jace","Sir Lui","Ma'am Tarah","Ma'am Chi","Ma'am Mae","Ma'am Danna","Ma'am Acel","Sir Popoy","Doc Ian","Doc Raine","Cianna","James"].map((name,index)=><div className={styles.reelName} key={index}>{name}</div>)}
                  </div>
                  <div className={styles.reelMarker}>✧</div>
                </div>
                <div className={styles.drawLoading}><span/><span/><span/></div>
                <p className={styles.drawModalCopy}>Finding your one special match...</p>
              </>
            ) : (
              <>
                <div className={styles.drawFinishedIcon}>✧</div>
                <p className={styles.kicker}>YOUR SECRET SANTA MATCH IS READY</p>
                <h2 id="draw-modal-title">It's a match!</h2>
                <p className={styles.drawModalCopy}>Your recipient has been revealed below. Keep it a secret!</p>
                <button type="button" onClick={() => setDrawAnimationOpen(false)}>View my recipient</button>
              </>
            )}
          </section>
        </div>
      )}

      {successOpen && (
        <div className={styles.modalBackdrop} role="presentation" onClick={() => setSuccessOpen(false)}>
          <section className={styles.successModal} role="dialog" aria-modal="true" aria-labelledby="save-success-title" onClick={(event) => event.stopPropagation()}>
            <div className={styles.modalSparkle}>✧</div>
            <p className={styles.kicker}>A LITTLE WISH, A LITTLE SURPRISE</p>
            <h2 id="save-success-title">Wishlist saved!</h2>
            <p>Your wishlist has been successfully saved. You can view it anytime and edit it before the draw begins.</p>
            <button type="button" onClick={() => setSuccessOpen(false)}>Lovely, thank you</button>
          </section>
        </div>
      )}
      <footer className={styles.footer}>AESTHERA MÈRE BEAUTY CREATIONS <span>✧</span> GLITZ & GLAM 2026</footer>
    </main>
  );
}
