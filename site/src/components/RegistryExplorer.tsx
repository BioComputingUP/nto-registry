import { useEffect, useMemo, useState } from "react";
import type { Artefact } from "../lib/types";

interface Props {
  artefacts: Artefact[];
  categories: string[];
  infrastructureNames: Record<string, string>;
}

type StatusFilter = "any" | "active";

// For now, only show these infrastructure platforms on registry cards, and
// only where the credit-capture pathway is already active — no "planned"
// entries are shown here (that nuance still lives on the Infrastructure
// page, which lists every platform regardless of status).
const VISIBLE_INFRA_IDS = new Set(["apicuron", "orcid", "bip-scholar"]);

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

export default function RegistryExplorer({ artefacts, categories, infrastructureNames }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("any");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  // Deep-link support: pages like the homepage link here with
  // ?category=Data so the relevant filter is already applied on arrival.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("category");
    if (requested && categories.includes(requested)) {
      setCategory(requested);
    }
  }, [categories]);

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
            <article className="card registry-card" key={a.id} style={{ borderColor: color }}>
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
                  <div>
                    <h4>Corresponding activities</h4>
                    <ul>
                      {a.activities.map((act, i) => (
                        <li key={i}>{act}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4>Examples</h4>
                    <ul>
                      {a.examples.map((ex, i) => (
                        <li key={i}>
                          {ex.url ? (
                            <a href={ex.url} target="_blank" rel="noopener">
                              {ex.name}
                            </a>
                          ) : (
                            ex.name
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4>Supporting infrastructure</h4>
                    {(() => {
                      const visible = a["supporting-infrastructure"].filter(
                        (ref) => ref.status === "active" && VISIBLE_INFRA_IDS.has(ref["infrastructure-id"])
                      );
                      if (visible.length === 0) {
                        return <p className="infra-empty">No active infrastructure from APICURON, ORCID, or BIP! Scholar yet.</p>;
                      }
                      return (
                        <ul className="infra-list">
                          {visible.map((ref, i) => (
                            <li key={i}>
                              <strong>{infrastructureNames[ref["infrastructure-id"]] ?? ref["infrastructure-id"]}</strong>
                              <span className="infra-capture"> — {ref["capture-function"]}</span>
                            </li>
                          ))}
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
