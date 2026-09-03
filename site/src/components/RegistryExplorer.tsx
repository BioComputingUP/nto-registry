import { useEffect, useMemo, useRef, useState } from "react";
import type { Artefact, OpusRafDomain } from "../lib/types";
import { ICONS } from "../lib/icons";

interface Props {
  artefacts: Artefact[];
  categories: string[];
  infrastructureInfo: Record<string, { name: string; url: string }>;
  pidInfraIds: string[];
}

type StatusFilter = "any" | "active";

const CATEGORY_COLOR_VAR: Record<string, string> = {
  Data: "--cat-data",
  Training: "--cat-training",
  Software: "--cat-software",
  "Research support": "--cat-research-support",
  "Peer review": "--cat-peer-review",
};

function categoryColor(category: string) {
  return `var(${CATEGORY_COLOR_VAR[category] ?? "--color-navy-800"})`;
}

// The OPUS Research Assessment Framework's domains are a fixed, external
// 4-item taxonomy (https://zenodo.org/records/14672476) — unlike `categories`
// (a prop derived from the live catalogue), this list isn't data-driven and
// never grows without a deliberate code change.
const OPUS_DOMAINS: OpusRafDomain[] = ["Research", "Education", "Leadership", "Valorisation"];

const OPUS_DOMAIN_COLOR_VAR: Record<OpusRafDomain, string> = {
  Research: "--opus-research",
  Education: "--opus-education",
  Leadership: "--opus-leadership",
  Valorisation: "--opus-valorisation",
};

function opusDomainColor(domain: OpusRafDomain | undefined) {
  return `var(${domain ? OPUS_DOMAIN_COLOR_VAR[domain] : "--color-gray-600"})`;
}

const OPUS_RAF_URL = "https://zenodo.org/records/14672476";

export default function RegistryExplorer({ artefacts, categories, infrastructureInfo, pidInfraIds }: Props) {
  const pidInfraIdSet = useMemo(() => new Set(pidInfraIds), [pidInfraIds]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("any");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [pendingScrollId, setPendingScrollId] = useState<string | null>(null);
  const [opusView, setOpusView] = useState(false);
  const [opusInfoOpen, setOpusInfoOpen] = useState(false);
  const opusInfoRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = artefacts.filter((a) => {
      if (category !== "all") {
        const value = opusView ? a["opus-raf-domain"] : a.category;
        if (value !== category) return false;
      }
      if (statusFilter !== "any") {
        const hasStatus = a["supporting-infrastructure"].some((ref) => ref.status === statusFilter);
        if (!hasStatus) return false;
      }
      if (!q) return true;
      const haystack = [
        a.artefact,
        a.explanation,
        ...a.activities,
        ...a.examples.map((e) => e.name),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
    // Regroup into OPUS domain order (Research/Education/Leadership/
    // Valorisation) when viewing by OPUS RAF, rather than leaving cards in
    // the catalogue's native NTO-category order — Array.sort is stable, so
    // cards within the same domain keep their original relative order.
    if (opusView) {
      result.sort(
        (a, b) =>
          OPUS_DOMAINS.indexOf(a["opus-raf-domain"] as OpusRafDomain) -
          OPUS_DOMAINS.indexOf(b["opus-raf-domain"] as OpusRafDomain)
      );
    }
    return result;
  }, [artefacts, query, category, statusFilter, opusView]);

  // Deep-link support: pages like the homepage link here with
  // ?category=Data so the relevant filter is already applied on arrival, and
  // pages like Get Started link with ?artefact=<id> to land pre-expanded on
  // one specific card (e.g. to check its PID-registration infrastructure).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedCategory = params.get("category");
    if (requestedCategory && categories.includes(requestedCategory)) {
      setCategory(requestedCategory);
    }
    const requestedArtefact = params.get("artefact");
    if (requestedArtefact && artefacts.some((a) => a.id === requestedArtefact)) {
      setExpanded((prev) => new Set(prev).add(requestedArtefact));
      setPendingScrollId(requestedArtefact);
    }
  }, [categories, artefacts]);

  // Scroll only once the target card is actually in the DOM (post-filter,
  // post-expand), rather than guessing at a fixed delay. Depends on
  // `filtered` so it re-checks after the list/expansion state settles.
  useEffect(() => {
    if (!pendingScrollId) return;
    const el = document.getElementById(`registry-card-${pendingScrollId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setPendingScrollId(null);
    }
  }, [pendingScrollId, filtered]);

  // Dismiss the OPUS RAF info popover on outside click or Escape, so it
  // behaves like a standard disclosure popover rather than staying pinned
  // open until the info button is clicked again.
  useEffect(() => {
    if (!opusInfoOpen) return;
    function handlePointerDown(e: MouseEvent) {
      if (opusInfoRef.current && !opusInfoRef.current.contains(e.target as Node)) {
        setOpusInfoOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpusInfoOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [opusInfoOpen]);

  function toggleOpusView() {
    setOpusView((prev) => !prev);
    // A selected NTO category isn't a valid OPUS domain value and vice versa
    // — reset rather than risk a stale filter silently hiding everything.
    setCategory("all");
  }

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="registry-explorer">
      <div className="registry-filters card">
        <div className="view-toggle-row">
          <label className="view-toggle">
            <input type="checkbox" role="switch" checked={opusView} onChange={toggleOpusView} />
            <span className="view-toggle-track" aria-hidden="true">
              <span className="view-toggle-thumb" />
            </span>
            <span className="view-toggle-label">View by OPUS RAF domain</span>
          </label>

          <div className="view-info" ref={opusInfoRef}>
            <button
              type="button"
              className="view-info-btn"
              aria-expanded={opusInfoOpen}
              aria-controls="registry-view-info-panel"
              aria-label="What is the OPUS RAF?"
              onClick={() => setOpusInfoOpen((v) => !v)}
            >
              <span aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS.info }} />
            </button>
            <div
              className={`view-info-panel${opusInfoOpen ? " is-open" : ""}`}
              id="registry-view-info-panel"
              role="tooltip"
            >
              <p className="view-info-intro">
                An alternative view of these outputs, grouped by OPUS RAF's four assessment domains.
              </p>
              <ul className="view-info-list">
                <li><strong>Research</strong> — proposals, methods, data, software, publications, peer review.</li>
                <li><strong>Education</strong> — courses, resources, teaching, supervision, skills development.</li>
                <li><strong>Leadership</strong> — leading people/projects, management roles, recognised expertise.</li>
                <li><strong>Valorisation</strong> — science communication, collaboration, exploitation &amp; entrepreneurship.</li>
              </ul>
              <a href={OPUS_RAF_URL} target="_blank" rel="noopener">
                Full definitions on Zenodo
              </a>
            </div>
          </div>
        </div>

        <div className="filter-field">
          <label htmlFor="registry-search">Search</label>
          <input
            id="registry-search"
            type="search"
            placeholder="Search outputs, activities, examples…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="filter-field">
          <label htmlFor="registry-category">{opusView ? "OPUS RAF domain" : "Category"}</label>
          <select id="registry-category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">{opusView ? "All domains" : "All categories"}</option>
            {(opusView ? OPUS_DOMAINS : categories).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-field">
          <label htmlFor="registry-status">Credit-capture status</label>
          <select
            id="registry-status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          >
            <option value="any">Any</option>
            <option value="active">Has active infrastructure</option>
          </select>
        </div>
        {(query || category !== "all" || statusFilter !== "any") && (
          <button
            type="button"
            className="btn btn-outline filter-clear"
            onClick={() => {
              setQuery("");
              setCategory("all");
              setStatusFilter("any");
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      <p className="result-count" role="status">
        {filtered.length} of {artefacts.length} output types
      </p>

      <div className="grid grid-2 registry-grid">
        {filtered.map((a) => {
          const isOpen = expanded.has(a.id);
          const categoryBadgeColor = categoryColor(a.category);
          // When viewing by OPUS RAF, that domain becomes the card's primary
          // colour (border + solid badge) since it's now the active grouping
          // lens, and the NTO category demotes to the secondary outlined
          // badge — otherwise toggling the view wouldn't visibly regroup
          // anything beyond the filter dropdown.
          const primaryColor = opusView ? opusDomainColor(a["opus-raf-domain"]) : categoryBadgeColor;
          return (
            <article className="card registry-card" id={`registry-card-${a.id}`} key={a.id} style={{ borderColor: primaryColor }}>
              <div className="registry-card-header">
                <div className="registry-card-badges">
                  {opusView && a["opus-raf-domain"] ? (
                    <>
                      <span className="badge badge-category" style={{ background: primaryColor }}>
                        {a["opus-raf-domain"]}
                      </span>
                      <span
                        className="badge badge-secondary"
                        style={{ borderColor: categoryBadgeColor, color: categoryBadgeColor }}
                      >
                        {a.category}
                      </span>
                    </>
                  ) : (
                    <span className="badge badge-category" style={{ background: categoryBadgeColor }}>{a.category}</span>
                  )}
                </div>
                <h3>{a.artefact}</h3>
              </div>
              <p>{a.explanation}</p>

              <button type="button" className="btn btn-outline registry-toggle" onClick={() => toggle(a.id)} aria-expanded={isOpen}>
                {isOpen ? "Hide details" : "Show details"}
              </button>

              {isOpen && (
                <div className="registry-card-details">
                  <div className="details-top-row">
                    <div className="details-block">
                      <h4><span className="details-icon" dangerouslySetInnerHTML={{ __html: ICONS.flag }} />Activities</h4>
                      <ul className="activity-list">
                        {a.activities.map((act, i) => (
                          <li key={i}>{act}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="details-block">
                      <h4><span className="details-icon" dangerouslySetInnerHTML={{ __html: ICONS.link }} />Examples</h4>
                      <div className="example-chips">
                        {a.examples.map((ex, i) =>
                          ex.url ? (
                            <a key={i} className="example-chip" href={ex.url} target="_blank" rel="noopener">
                              {ex.name}
                            </a>
                          ) : (
                            <span key={i} className="example-chip example-chip-plain">
                              {ex.name}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="details-block details-block-infra">
                    <h4><span className="details-icon" dangerouslySetInnerHTML={{ __html: ICONS.server }} />Supporting infrastructure</h4>
                    {(() => {
                      const visible = a["supporting-infrastructure"].filter(
                        (ref) => ref.status === "active" && pidInfraIdSet.has(ref["infrastructure-id"])
                      );
                      if (visible.length === 0) {
                        return <p className="infra-empty">No active Publishing &amp; PID Provision infrastructure yet.</p>;
                      }
                      return (
                        <ul className="infra-list">
                          {visible.map((ref, i) => {
                            const info = infrastructureInfo[ref["infrastructure-id"]];
                            return (
                              <li key={i}>
                                {info?.url ? (
                                  <a className="infra-name infra-name-link" href={info.url} target="_blank" rel="noopener">
                                    {info.name}
                                  </a>
                                ) : (
                                  <span className="infra-name">{info?.name ?? ref["infrastructure-id"]}</span>
                                )}
                                <span className="infra-capture">{ref["capture-function"]}</span>
                              </li>
                            );
                          })}
                        </ul>
                      );
                    })()}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="empty-state">No output types match your filters. Try clearing them.</p>
      )}
    </div>
  );
}
