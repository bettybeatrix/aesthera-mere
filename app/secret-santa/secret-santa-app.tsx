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
  const [message, setMessage] = useState("");
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
    setWishlist(result.wishlist ? {
      ...result.wishlist,
      gift_ideas: [...result.wishlist.gift_ideas, "", "", ""].slice(0, 5),
    } : emptyWishlist);
    setLoading(false);
  }, []);

  useEffect(() => { void loadMe(); }, [loadMe]);

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const response = await fetch("/api/secret-santa/access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accessCode: accessCode.trim().toUpperCase() }),
    });
    const result = await response.json();
    if (!response.ok) {
      setError(result.error ?? "Unable to sign in.");
      setBusy(false);
      return;
    }
    setAccessCode("");
    await loadMe();
    setBusy(false);
  }

  async function saveWishlist(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    const response = await fetch("/api/secret-santa/wishlist", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...wishlist,
        giftIdeas: wishlist.gift_ideas,
      }),
    });
    const result = await response.json();
    if (!response.ok) setError(result.error ?? "Unable to save your wishlist.");
    else {
      setMessage("Your wishlist has been saved.");
      await loadMe();
    }
    setBusy(false);
  }

  async function signOut() {
    setBusy(true);
    await fetch("/api/secret-santa/logout", { method: "POST" });
    setData(null);
    setWishlist(emptyWishlist);
    setMessage("");
    setBusy(false);
  }

  function updateGift(index: number, value: string) {
    setWishlist((current) => {
      const gift_ideas = [...current.gift_ideas];
      gift_ideas[index] = value;
      return { ...current, gift_ideas };
    });
  }

  if (loading) {
    return <main className={styles.page}><div className={styles.loading}>Preparing your Secret Santa...</div></main>;
  }

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
        <div className={styles.eventMeta}>
          <span>DECEMBER 16, 2026</span><i /> <span>ROMULO CAFÉ · BGC</span>
        </div>
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
            <div className={styles.recipientCard}>
              <p className={styles.kicker}>YOUR SECRET RECIPIENT</p>
              <h3>{data.recipient.name}</h3>
              <p className={styles.secretNote}>Keep it a secret until gift exchange night!</p>
              <div className={styles.wishDetails}>
                <h4>Wishlist</h4>
                {data.recipient.wishlist?.gift_ideas?.length ? (
                  <ul>{data.recipient.wishlist.gift_ideas.map((gift, index) => <li key={index}>{gift}</li>)}</ul>
                ) : <p>No gift ideas added yet.</p>}
                {data.recipient.wishlist?.preferred_colors && <p><b>Preferred colors:</b> {data.recipient.wishlist.preferred_colors}</p>}
                {data.recipient.wishlist?.preferred_style && <p><b>Preferred style:</b> {data.recipient.wishlist.preferred_style}</p>}
                {data.recipient.wishlist?.avoid && <p><b>Please avoid:</b> {data.recipient.wishlist.avoid}</p>}
                {data.recipient.wishlist?.notes && <p><b>Additional notes:</b> {data.recipient.wishlist.notes}</p>}
              </div>
            </div>
          ) : (
            <div className={styles.drawCard}>
              <p className={styles.kicker}>THE SECRET DRAW</p>
              <h3>{data.hasDrawn ? "Your draw is being prepared." : "Your recipient will be revealed here."}</h3>
              <p>{data.hasDrawn ? "Please refresh in a moment." : "The organizer will start the draw once all wishlists have been submitted. You won't be able to see anyone else's assignment."}</p>
              <div className={styles.progress}><span style={{ width: `${Math.min(100, (data.progress.submitted / Math.max(1, data.progress.total)) * 100)}%` }} /></div>
              <small>{data.progress.submitted} of {data.progress.total} wishlists submitted</small>
            </div>
          )}

          <form onSubmit={saveWishlist} className={styles.panelForm}>
            <div><p className={styles.kicker}>YOUR WISHLIST</p><h3>What would you love to receive?</h3><p className={styles.helper}>Add up to five gift ideas within the ₱500 budget.</p></div>
            {wishlist.gift_ideas.map((gift, index) => (
              <div className={styles.field} key={index}>
                <label htmlFor={`gift-${index}`}>Gift idea {index + 1}{index < 3 ? " *" : " (optional)"}</label>
                <input id={`gift-${index}`} value={gift} onChange={(event) => updateGift(index, event.target.value)} placeholder={index === 0 ? "e.g. skincare, tumbler, book..." : "Another gift idea"} maxLength={120} />
              </div>
            ))}
            <div className={styles.field}><label htmlFor="colors">Preferred colors</label><input id="colors" value={wishlist.preferred_colors} onChange={(event) => setWishlist({ ...wishlist, preferred_colors: event.target.value })} placeholder="e.g. white, silver, neutrals" maxLength={160} /></div>
            <div className={styles.field}><label htmlFor="style">Preferred style or interests</label><input id="style" value={wishlist.preferred_style} onChange={(event) => setWishlist({ ...wishlist, preferred_style: event.target.value })} placeholder="e.g. minimalist, cozy, practical" maxLength={160} /></div>
            <div className={styles.field}><label htmlFor="avoid">Things you'd rather not receive</label><input id="avoid" value={wishlist.avoid} onChange={(event) => setWishlist({ ...wishlist, avoid: event.target.value })} placeholder="Optional" maxLength={300} /></div>
            <div className={styles.field}><label htmlFor="notes">Additional notes</label><textarea id="notes" value={wishlist.notes} onChange={(event) => setWishlist({ ...wishlist, notes: event.target.value })} placeholder="Sizes, preferences, or helpful details..." rows={3} maxLength={500} /></div>
            {error && <p className={styles.error}>{error}</p>}
            {message && <p className={styles.success}>{message}</p>}
            <button type="submit" disabled={busy}>{busy ? "Saving..." : "Save my wishlist"}</button>
          </form>
          <p className={styles.footerNote}>Your wishlist is only shared with the person assigned to you.</p>
        </section>
      )}
      <footer className={styles.footer}>AESTHERA MÈRE BEAUTY CREATIONS <span>✧</span> GLITZ & GLAM 2026</footer>
    </main>
  );
}
