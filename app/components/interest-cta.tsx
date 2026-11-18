"use client";

import { ArrowRight } from "@phosphor-icons/react/ssr";
import { interestCta } from "./links";
import { useOpenPreRegistration } from "./pre-registration";

type InterestCtaProps = {
  className?: string;
  withIcon?: boolean;
};

export function InterestCta({ className = "cta", withIcon = true }: InterestCtaProps) {
  const openPreRegistration = useOpenPreRegistration();

  return (
    <button type="button" className={className} onClick={openPreRegistration}>
      {interestCta.label}
      {withIcon ? <ArrowRight aria-hidden="true" size={18} weight="bold" /> : null}
    </button>
  );
}
