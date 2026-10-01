import type { ReactNode } from "react";
import SplitHeading from "./SplitHeading";

// Home page section: mono index, display heading, then content.
export function Section({
  id,
  index,
  title,
  children,
}: {
  id?: string;
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="sec page">
      <header className="sec-head">
        <span className="sec-idx mono">{index}</span>
        <SplitHeading className="display-m">{title}</SplitHeading>
      </header>
      <div className="sec-body">{children}</div>
    </section>
  );
}

// Project page section: label on the left, content on the right.
export function DocSection({
  label,
  wide = false,
  children,
}: {
  label: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <section className="doc-sec">
      <h2 className="doc-label">{label}</h2>
      <div className={wide ? "doc-body" : "doc-body prose"}>{children}</div>
    </section>
  );
}
