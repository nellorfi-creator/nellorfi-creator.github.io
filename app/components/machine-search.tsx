"use client";

import SiteImage from "@/app/components/site-image";
import {
  MACHINE_SEARCH_MIN_CHARS,
  searchMachines,
  type CatalogMachine,
} from "@/lib/machine-catalog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";

type Props = {
  variant: "hero" | "nav";
  onOpen?: () => void;
  onNavigate?: () => void;
};

export default function MachineSearch({ variant, onOpen, onNavigate }: Props) {
  const router = useRouter();
  const inputId = useId();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const trimmed = query.trim();
  const ready = trimmed.length >= MACHINE_SEARCH_MIN_CHARS;
  const results = useMemo(() => (ready ? searchMachines(trimmed) : []), [ready, trimmed]);
  const showList = open && (variant === "nav" || trimmed.length > 0);
  const safeIndex = results.length ? Math.min(activeIndex, results.length - 1) : 0;

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

  const openSearch = () => {
    setOpen(true);
    onOpen?.();
    window.requestAnimationFrame(() => inputRef.current?.focus());
  };

  const selectMachine = (machine: CatalogMachine) => {
    setOpen(false);
    if (variant === "nav") setQuery("");
    onNavigate?.();
    router.push(machine.href);
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
      const machine = results[safeIndex];
      if (!machine) return;
      event.preventDefault();
      selectMachine(machine);
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
        aria-activedescendant={results[safeIndex] ? `${listId}-${results[safeIndex].key}` : undefined}
        placeholder="Es. Panatta, pressa, curl…"
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

  const resultsList = showList ? (
    <div className="machine-search-results" id={listId} role="listbox" aria-label="Macchine trovate">
      {!ready ? (
        <p className="machine-search-hint">Scrivi almeno {MACHINE_SEARCH_MIN_CHARS} lettere per iniziare.</p>
      ) : results.length === 0 ? (
        <p className="machine-search-hint">Nessuna macchina trovata per “{trimmed}”.</p>
      ) : (
        results.map((machine, index) => (
          <Link
            key={machine.key}
            id={`${listId}-${machine.key}`}
            href={machine.href}
            role="option"
            aria-selected={index === activeIndex}
            className={index === safeIndex ? "is-active" : undefined}
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => {
              setOpen(false);
              if (variant === "nav") setQuery("");
              onNavigate?.();
            }}
          >
            <SiteImage src={machine.image} alt="" width={56} height={56} />
            <span>
              <small>
                {machine.brand} · {machine.areaLabel}
              </small>
              <b>{machine.name}</b>
            </span>
          </Link>
        ))
      )}
    </div>
  ) : null;

  return (
    <div ref={rootRef} className={`machine-search is-${variant}${open ? " is-open" : ""}`}>
      {variant === "hero" ? (
        <>
          <label className="machine-search-label" htmlFor={inputId}>
            Cerca macchine
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
                Cerca macchine
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

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M15.4 15.4 21 21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}
