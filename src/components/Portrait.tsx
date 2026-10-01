"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import photo from "../../public/norma.jpeg";
import Robot from "./Robot";

gsap.registerPlugin(useGSAP);

// Portrait styled like UiPath's "indicate element": the robot finds the element,
// draws its highlight box, and validates the selector. Plays once on load.
export default function Portrait() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ delay: 0.8 });
        tl.fromTo(
          ".portrait-img",
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "expo.out" },
        )
          .from(".indicate", { opacity: 0, scale: 1.25, duration: 0.5, ease: "power3.out" }, "-=0.2")
          .from(".selector-line", { opacity: 0, y: 6, duration: 0.4, stagger: 0.12, ease: "power2.out" }, "-=0.1");
      });
    },
    { scope: root },
  );

  return (
    <figure ref={root} className="portrait">
      <div className="portrait-frame">
        <Image
          className="portrait-img"
          src={photo}
          alt="Norma Irkham Maulana"
          sizes="(max-width: 1068px) 260px, 260px"
          priority
        />
        <span className="indicate" aria-hidden="true">
          <span className="indicate-tag mono">person</span>
        </span>
      </div>
      <figcaption className="selector mono">
        <span className="selector-line selector-head">
          <Robot size={16} /> Selector
        </span>
        <code className="selector-line">
          &lt;webctrl tag=&apos;PERSON&apos; name=&apos;Norma Irkham Maulana&apos; /&gt;
        </code>
        <code className="selector-line">
          &lt;ctrl role=&apos;automation engineer&apos; since=&apos;2020&apos; /&gt;
        </code>
        <span className="selector-line selector-ok">✓ Selector valid · 1 match</span>
      </figcaption>
    </figure>
  );
}
