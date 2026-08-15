"use client";

import SiteImage from "@/app/components/site-image";
import {
  MACHINE_SEARCH_MIN_CHARS,
  foldSearchText,
  searchCatalog,
  type BrandSearchItem,
  type SearchHit,
} from "@/lib/machine-catalog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";

type Props = {
  variant: "hero" | "nav";
  brands?: BrandSearchItem[];
  onOpen?: () => void;
  onNavigate?: () => void;
  onSelectBrand?: (name: string) => void;
};

export default function MachineSearch({ variant, brands = [], onOpen, onNavigate, onSelectBrand }: Props) {
  const router = useRouter();
  const inputId = useId();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const compact = foldSearchText(query).replace(/\s/g, "");
  const ready = compact.length >= MACHINE_SEARCH_MIN_CHARS;
  const results = useMemo(() => (ready ? searchCatalog(query, brands) : []), [ready, query, brands]);
  const showList = open && (variant === "nav" || compact.length > 0);
  const safeIndex = results.length ? Math.min(activeIndex, results.length - 1) : 0;
  const activeHit = results[safeIndex];

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      if (variant === "nav") setQuery("");
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, variant]);

  const closeSearch = () => {
    setOpen(false);
    if (variant === "nav") setQuery("");
    onNavigate?.();
  };

  const openSearch = () => {
    setOpen(true);
    onOpen?.();
    window.requestAnimationFrame(() => inputRef.current?.focus());
  };

  const selectHit = (hit: SearchHit) => {
    closeSearch();
    if (hit.kind === "brand") {
      onSelectBrand?.(hit.name);
      return;
    }
    router.push(hit.machine.href);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" && results.length) {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, results.length - 1));
      setOpen(true);
    } else if (event.key === "ArrowUp" && results.length) {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter") {
      if (!activeHit) return;
      event.preventDefault();
      selectHit(activeHit);
    }
  };

  const field = (
    <div className="machine-search-field">
      <SearchIcon />
      <input
        ref={inputRef}
        id={inputId}
        type="search"
        role="combobox"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        enterKeyHint="search"
        aria-autocomplete="list"
        aria-expanded={showList}
        aria-controls={listId}
        aria-activedescendant={activeHit ? `${listId}-${activeHit.key}` : undefined}
        placeholder="Es. Panatta, Gym Equipe, Life Fitness…"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setActiveIndex(0);
          setOpen(true);
        }}
        onFocus={() => {
          setOpen(true);
          onOpen?.();
        }}
        onKeyDown={onKeyDown}
      />
    </div>
  );

  const brandHits = results.filter((hit): hit is Extract<SearchHit, { kind: "brand" }> => hit.kind === "brand");
  const machineHits = results.filter((hit): hit is Extract<SearchHit, { kind: "machine" }> => hit.kind === "machine");

  const resultsList = showList ? (
    <div className="machine-search-results" id={listId} role="listbox" aria-label="Marchi e macchine trovati">
      {!ready ? (
        <p className="machine-search-hint">Scrivi almeno {MACHINE_SEARCH_MIN_CHARS} lettere per iniziare.</p>
      ) : results.length === 0 ? (
        <p className="machine-search-hint">Nessun risultato per “{query.trim()}”.</p>
      ) : (
        <>
          {brandHits.length > 0 && <p className="machine-search-group">Macchinari selezionati</p>}
          {brandHits.map((hit, index) => (
            <button
              key={hit.key}
              id={`${listId}-${hit.key}`}
              type="button"
              role="option"
              aria-selected={index === safeIndex}
              className={index === safeIndex ? "is-active" : undefined}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => selectHit(hit)}
            >
              <span className="machine-search-brand" aria-hidden="true">
                {brandInitials(hit.name)}
              </span>
              <span>
                <small>Marchio in sala · {hit.origin}</small>
                <b>{hit.name}</b>
              </span>
            </button>
          ))}
          {machineHits.length > 0 && <p className="machine-search-group">Per zona</p>}
          {machineHits.map((hit, index) => {
            const optionIndex = brandHits.length + index;
            return (
              <Link
                key={hit.key}
                id={`${listId}-${hit.key}`}
                href={hit.machine.href}
                role="option"
                aria-selected={optionIndex === safeIndex}
                className={optionIndex === safeIndex ? "is-active" : undefined}
                onMouseEnter={() => setActiveIndex(optionIndex)}
                onClick={closeSearch}
              >
                <SiteImage src={hit.machine.image} alt="" width={56} height={56} />
                <span>
                  <small>
                    {hit.machine.brand} · {hit.machine.areaLabel}
                  </small>
                  <b>{hit.machine.name}</b>
                </span>
              </Link>
            );
          })}
        </>
      )}
    </div>
  ) : null;

  return (
    <div ref={rootRef} className={`machine-search is-${variant}${open ? " is-open" : ""}`}>
      {variant === "hero" ? (
        <>
          <label className="machine-search-label" htmlFor={inputId}>
            Cerca marchi e macchine
          </label>
          {field}
          {resultsList}
        </>
      ) : (
        <>
          <button
            type="button"
            className="machine-search-trigger"
            aria-expanded={open}
            aria-controls={inputId}
            onClick={() => (open ? setOpen(false) : openSearch())}
          >
            <SearchIcon />
            Cerca
          </button>
          {open && (
            <div className="machine-search-nav-panel">
              <label className="machine-search-label" htmlFor={inputId}>
                Cerca marchi e macchine
              </label>
              {field}
              {resultsList}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function brandInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M15.4 15.4 21 21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}
