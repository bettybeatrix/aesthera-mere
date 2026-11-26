"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { treatmentResults, type ResultPhoto } from "@/data/results";
import styles from "./ResultsGallery.module.css";

const PREVIEW_COUNT = 4;
type ComparisonItem = { id: string; title: string; photo: ResultPhoto };
type ResultSet = { id: string; title: string; photos: ComparisonItem[] };

// Each TreatmentResult record represents one source case/client.
// Keep every angle in that record together, even when the BEFORE files differ.
const resultSets: ResultSet[] = treatmentResults.map((result) => ({
  id: result.id,
  title: result.title,
  photos: result.photos.map((photo, index) => ({
    id: result.id + "-" + index,
    title: result.title,
    photo,
  })),
}));

const treatmentNames = Array.from(new Set(resultSets.map((result) => result.title)));

function Comparison({ item, enlarged = false, eager = false }: {
  item: ComparisonItem; enlarged?: boolean; eager?: boolean;
}) {
  const stacked = item.photo.layout === "stacked";
  const sizes = enlarged
    ? stacked ? "(max-width: 700px) 88vw, 880px" : "(max-width: 700px) 44vw, 430px"
    : stacked ? "(max-width: 700px) 90vw, 50vw" : "(max-width: 700px) 44vw, 25vw";
  return (
    <div className={styles.comparison + " " + (stacked ? styles.stacked : "") + " " + (enlarged ? styles.enlarged : "")} role="group" aria-label={item.title + ", " + item.photo.view}>
      {(["before", "after"] as const).map((side) => <figure key={side} className={styles.photoPanel}>
        <figcaption>{side === "before" ? "Before" : "After"}</figcaption>
        <div className={styles.imageViewport}>
          <Image src={item.photo[side]} alt={side + " " + item.title + ", " + item.photo.view}
            fill sizes={sizes} quality={90} preload={eager} className={styles.photo} />
        </div>
      </figure>)}
    </div>
  );
}

function Chevron({ previous = false }: { previous?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d={previous ? "m14 6-6 6 6 6" : "m10 6 6 6-6 6"} /></svg>;
}

function ResultViewer({ item, position, total, onClose, onPrevious, onNext }: {
  item: ComparisonItem; position: number; total: number;
  onClose: () => void; onPrevious: () => void; onNext: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="result-viewer-title" aria-describedby="result-viewer-note"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") { event.preventDefault(); onPrevious(); }
        if (event.key === "ArrowRight") { event.preventDefault(); onNext(); }
      }}>
      <div className={styles.dialogContent}>
        <div className={styles.dialogHeader}>
          <div>
            <p className={styles.viewerEyebrow}>Before & after</p>
            <h2 id="result-viewer-title">{item.title}</h2>
            <p className={styles.viewerView}>{item.photo.view}</p>
          </div>
          <button type="button" autoFocus onClick={onClose} className={styles.iconButton} aria-label="Close result"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg></button>
        </div>
        <div className={styles.viewerPhotoArea}><Comparison item={item} enlarged /></div>
        <div className={styles.viewerFooter}>
          <p id="result-viewer-note">Results vary per individual.</p>
          {total > 1 && <div className={styles.viewerControls}>
            <button type="button" className={styles.iconButton} aria-label="Previous photo of the same client" onClick={onPrevious}><Chevron previous /></button>
            <span aria-live="polite">{position} / {total}</span>
            <button type="button" className={styles.iconButton} aria-label="Next photo of the same client" onClick={onNext}><Chevron /></button>
          </div>}
        </div>
      </div>
    </dialog>
  );
}

export default function ResultsGallery() {
  const [filter, setFilter] = useState("All treatments");
  const [expanded, setExpanded] = useState(false);
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const closeViewer = useCallback(() => setSelectedSetId(null), []);

  const filtered = useMemo(
    () => resultSets.filter((item) => filter === "All treatments" || item.title === filter),
    [filter]
  );
  const visible = expanded ? filtered : filtered.slice(0, PREVIEW_COUNT);
  const visibleGroups = treatmentNames
    .map((title) => ({ title, items: visible.filter((item) => item.title === title) }))
    .filter((group) => group.items.length);
  const selectedSet = visible.find((item) => item.id === selectedSetId);
  const selected = selectedSet?.photos[selectedPhotoIndex] ?? selectedSet?.photos[0];

  function openSet(setId: string) {
    setSelectedPhotoIndex(0);
    setSelectedSetId(setId);
  }

  function changePhoto(direction: number) {
    if (!selectedSet || selectedSet.photos.length < 2) return;
    setSelectedPhotoIndex((index) => (index + direction + selectedSet.photos.length) % selectedSet.photos.length);
  }

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.heroEyebrow}>Aesthera Mère · Client Gallery</p>
        <h1>Real <em>results.</em></h1>
        <p>Explore individual before-and-after journeys by treatment.</p>
      </header>
      <section className={styles.gallery} aria-label="Before-and-after gallery">
        <div className={styles.toolbar}>
          <label className={styles.filterLabel}>
            <span className={styles.srOnly}>Filter results by treatment</span>
            <select value={filter} onChange={(event) => { setFilter(event.target.value); setExpanded(false); }}>
              <option>All treatments</option>{treatmentNames.map((title) => <option key={title}>{title}</option>)}
            </select>
          </label>
          <p className={styles.resultCount} role="status">{filtered.length} {filtered.length === 1 ? "client result" : "client results"}</p>
        </div>
        <div id="results-grid" className={styles.groups}>
          {visibleGroups.map((group) => <section key={group.title} className={styles.resultGroup + " " + (group.items.length > 1 ? styles.wideGroup : "")} aria-label={group.title + " results"}>
            <div className={styles.groupHeading}><h2>{group.title}</h2><span>{group.items.length} {group.items.length === 1 ? "case" : "cases"}</span></div>
            <div className={styles.groupGrid}>
              {group.items.map((set) => {
                const cover = set.photos[0];
                return <article key={set.id}>
                  <button type="button" className={styles.resultCard} onClick={() => openSet(set.id)} aria-label={"View " + set.title + " result, " + set.photos.length + " comparisons"} aria-haspopup="dialog">
                    <Comparison item={cover} eager={visible.indexOf(set) < 2} />
                    <div className={styles.cardMeta}>
                      <span>{cover.photo.view}</span>
                      {set.photos.length > 1 && <span className={styles.multipleBadge}>{set.photos.length} views <Chevron /></span>}
                      <span className={styles.cardOpen}>View details <Chevron /></span>
                    </div>
                  </button>
                </article>;
              })}
            </div>
          </section>)}
        </div>
        {filtered.length > visible.length && <div className={styles.moreResults}><button type="button" className={styles.viewAll} aria-expanded={expanded} aria-controls="results-grid" onClick={() => setExpanded(true)}>View more</button></div>}
        {expanded && filtered.length > PREVIEW_COUNT && <div className={styles.moreResults}><button type="button" className={styles.viewAll} onClick={() => setExpanded(false)}>Show less</button></div>}
        <p className={styles.resultsNote}>Individual results vary. Images are shared for illustrative purposes and do not guarantee identical outcomes.</p>
      </section>
      <section className={styles.stylePreview} aria-labelledby="style-preview-title">
        <div className={styles.stylePreviewHeading}>
          <p className={styles.viewerEyebrow}>Visual direction</p>
          <h2 id="style-preview-title">Pearl silk photo styling</h2>
          <p>AI-generated styling mockups for the Ultraformer MPT gallery background. These are visual references only, not actual client photographs or treatment results.</p>
        </div>
        <div className={styles.stylePreviewGrid}>
          <figure><Image src="/images/results/mockups/ultraformer-right-angle-ai-mockup.webp" alt="AI-generated right-angle portrait styling mockup on pearl-white silk" width={720} height={960} /><figcaption>Right angle · styling mockup</figcaption></figure>
          <figure><Image src="/images/results/mockups/ultraformer-left-angle-ai-mockup.webp" alt="AI-generated left-angle portrait styling mockup on pearl-white silk" width={720} height={960} /><figcaption>Left angle · styling mockup</figcaption></figure>
        </div>
      </section>
      {selected && <ResultViewer item={selected} position={selectedPhotoIndex + 1} total={selectedSet?.photos.length ?? 1} onClose={closeViewer} onPrevious={() => changePhoto(-1)} onNext={() => changePhoto(1)} />}
    </div>
  );
}
