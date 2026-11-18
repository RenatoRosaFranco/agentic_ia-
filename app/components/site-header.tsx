"use client";

import { List, X } from "@phosphor-icons/react/ssr";
import { useEffect, useRef, useState } from "react";
import { InterestCta } from "./interest-cta";
import { sectionLinks } from "./links";
import { NoticeBar } from "./notice-bar";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    firstLinkRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const closeAndGo = (href: string) => {
    setOpen(false);
    const target = document.querySelector(href);
    if (!(target instanceof HTMLElement)) {
      return;
    }

    window.history.pushState(null, "", href);
    window.requestAnimationFrame(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.focus({ preventScroll: true });
      target.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    });
  };

  return (
    <header id="topo" className="sticky top-0 z-40 bg-surface">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-3 sm:px-8 lg:min-h-[4.75rem] lg:gap-5 lg:py-0">
        <a
          href="#topo"
          className="mr-auto max-w-[11.5rem] font-sans text-[1.05rem] leading-tight font-semibold text-ink sm:max-w-none sm:text-lg"
        >
          IA Agêntica na Prática
        </a>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Seções da página">
          {sectionLinks.map((item) => (
            <a key={item.href} href={item.href} className="nav-link whitespace-nowrap">
              {item.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
        <div className="hidden lg:block">
          <InterestCta />
        </div>
        <div className="lg:hidden">
          <button
            ref={buttonRef}
            type="button"
            className="menu-button"
            aria-expanded={open}
            aria-controls="menu-secoes"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" size={18} weight="bold" /> : <List aria-hidden="true" size={18} weight="bold" />}
            {open ? "Fechar" : "Menu"}
          </button>
        </div>
      </div>
      <div className="px-5 pb-3 lg:hidden">
        <InterestCta className="cta w-full" />
      </div>
      {open ? (
        <nav
          id="menu-secoes"
          className="border-t border-line px-5 py-2 lg:hidden"
          aria-label="Seções da página"
        >
          <ul>
            {sectionLinks.map((item, index) => (
              <li key={item.href} className="border-b border-line last:border-b-0">
                <a
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  className="block py-3 font-semibold text-ink"
                  onClick={(event) => {
                    event.preventDefault();
                    closeAndGo(item.href);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
      <NoticeBar />
    </header>
  );
}
