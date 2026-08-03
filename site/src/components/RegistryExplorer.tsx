import { useEffect, useMemo, useState } from "react";
import type { Artefact } from "../lib/types";
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

export default function RegistryExplorer({ artefacts, categories, infrastructureInfo, pidInfraIds }: Props) {
  const pidInfraIdSet = useMemo(() => new Set(pidInfraIds), [pidInfraIds]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("any");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [pendingScrollId, setPendingScrollId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return artefacts.filter((a) => {
      if (category !== "all" && a.category !== category) return false;
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
  }, [artefacts, query, category, statusFilter]);

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
          <label htmlFor="registry-category">Category</label>
          <select id="registry-category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All categories</option>
            {categories.map((c) => (
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
          const color = categoryColor(a.category);
          return (
            <article className="card registry-card" id={`registry-card-${a.id}`} key={a.id} style={{ borderColor: color }}>
              <div className="registry-card-header">
                <span className="badge badge-category" style={{ background: color }}>{a.category}</span>
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
