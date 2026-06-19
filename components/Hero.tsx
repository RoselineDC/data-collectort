"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

type Slide = {
  tag: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  image: string;
};

const slides: Slide[] = [
  {
    tag: "Launch",
    title: "Execute projects with confidence from day one",
    description: "Create a project workspace, gather requirements, collect assets, and keep everything organized before development begins.",
    primaryCta: "Start a project",
    secondaryCta: "Learn more",
    image: "/start.jpg",
  },
  {
    tag: "Requirements",
    title: "Capture every requirement in one place",
    description: "Gather project goals, business requirements, technical specifications, and client expectations through structured project forms.",
    primaryCta: "Create project brief",
    secondaryCta: "Learn more",
    image: "/captureIdeas.jpg",
  },
  {
    tag: "Assets",
    title: "Keep project assets organized",
    description: "Collect logos, documents, videos, designs, and supporting materials in a secure project workspace accessible to your team.",
    primaryCta: "Upload assets",
    secondaryCta: "Learn more",
    image: "/securestorage.jpg",
  },
  {
    tag: "Collaboration",
    title: "Simplify client communication",
    description: "Share project links, receive updates, collect feedback, and maintain a clear record of all project interactions.",
    primaryCta: "Invite a client",
    secondaryCta: "Learn more",
    image: "/team.jpg",
  },
  {
    tag: "Progress",
    title: "Monitor project execution every step of the way",
    description: "Track submissions, approvals, pending tasks, milestones, and project readiness through a unified dashboard.",
    primaryCta: "View progress",
    secondaryCta: "Learn more",
    image: "/status.jpg",
  },
  {
    tag: "Delivery",
    title: "Move from planning to delivery faster",
    description: "Reduce delays, eliminate missing information, and ensure every project has everything needed for successful execution.",
    primaryCta: "Get started",
    secondaryCta: "Learn more",
    image: "/startProject.jpg",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);
  const total = slides.length;

  const goTo = useCallback((n: number) => setCurrent((n + total) % total), [total]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => goTo(current + 1), 5000);
    return () => clearInterval(timer);
  }, [current, paused, goTo]);

  const slide = slides[current];

  return (
    <div
      className="w-full relative overflow-hidden rounded-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
      }}
    >
      <div className="flex min-h-[460px] md:min-h-[520px]">

        {/* Left — green text panel */}
        <div className="bg-[#7ac943] flex-1 flex flex-col justify-center px-10 py-14 md:px-16 md:py-16 relative z-10">

          {/* Tag pill */}
          <div className="inline-flex w-fit items-center bg-black text-white text-xs font-bold rounded-full px-4 py-1.5 mb-7 tracking-widest uppercase">
            {slide.tag}
          </div>

          {/* Title — font-black for maximum punch on green */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-5 max-w-sm drop-shadow-sm">
            {slide.title}
          </h2>

          {/* Description — full white, larger */}
          <p className="text-white text-base md:text-lg leading-relaxed mb-10 max-w-sm opacity-90">
            {slide.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button className="bg-white text-gray-900 text-sm font-bold px-7 py-3.5 rounded-full hover:bg-gray-100 transition-colors">
              {slide.secondaryCta}
            </button>
            <button className="bg-black text-white text-sm font-bold px-7 py-3.5 rounded-full hover:bg-gray-900 transition-colors flex items-center gap-2">
              {slide.primaryCta}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        {/* Right — image panel */}
        <div className="hidden md:block flex-[0_0_48%] relative overflow-hidden">
          <Image
            src={slide.image}
            alt={slide.tag}
            fill
            sizes="48vw"
            className="object-cover"
            priority={current === 0}
          />
        </div>
      </div>

      {/* Left arrow — sits at the very left edge */}
      <button
        onClick={() => goTo(current - 1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-md transition-all text-2xl leading-none"
      >
        ‹
      </button>

      {/* Right arrow — sits at the very right edge */}
      <button
        onClick={() => goTo(current + 1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-md transition-all text-2xl leading-none"
      >
        ›
      </button>

      {/* Bottom dots — centered across full carousel width */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-20">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full border-none transition-all duration-300 ${
              i === current
                ? "w-7 h-2.5 bg-white"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}