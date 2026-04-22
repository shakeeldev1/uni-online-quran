import React, { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "introduction", title: "Introduction" },
  { id: "what-you-learn", title: "What You'll Learn" },
  { id: "benefits", title: "Benefits" },
  { id: "course-material", title: "Course Material" },
];

export default function DetailSection() {
  const [active, setActive] = useState(SECTIONS[0].id);
  const containerRef = useRef(null);
  const asideRef = useRef(null);
  const wrapperRef = useRef(null);
  const [fixedStyle, setFixedStyle] = useState(null);

  useEffect(() => {
    const options = { root: null, rootMargin: "0px", threshold: 0.4 };
    const node = containerRef.current;
    if (!node) return;

    const sections = Array.from(node.querySelectorAll(".detail-section"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, options);

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Diagnostic + JS fallback for sticky sidebar
  useEffect(() => {
    const headerOffset = 10; // matches md:top-28 (7rem)
    const asideEl = asideRef.current;
    const wrapperEl = wrapperRef.current;
    if (!asideEl || !wrapperEl) return;

    const checkAncestors = (el) => {
      let node = el.parentElement;
      const problems = [];
      while (node && node !== document.documentElement) {
        const style = getComputedStyle(node);
        const overflow = `${style.overflow} ${style.overflowY} ${style.overflowX}`;
        if (/(hidden|auto|scroll)/.test(overflow)) {
          problems.push({ node, reason: 'overflow != visible' });
        }
        if (style.transform && style.transform !== 'none') {
          problems.push({ node, reason: 'transform != none' });
        }
        node = node.parentElement;
      }
      return problems;
    };

    const problems = checkAncestors(wrapperEl);
    if (problems.length) {
      // Helpful diagnostic for developers
      console.warn(
        'DetailSection: possible reason position:sticky is not working for sidebar. Ancestors with non-visible overflow or transform found:',
        problems.map((p) => p.reason)
      );
    }

    // Fallback: pin the aside using fixed positioning on desktop when scrolled
    let wrapperTop = wrapperEl.getBoundingClientRect().top + window.scrollY;
    const computeAndApply = () => {
      const viewportWidth = window.innerWidth;
      if (viewportWidth < 68) {
        if (fixedStyle) setFixedStyle(null);
        return;
      }

      // recompute wrapperTop in case layout changed
      wrapperTop = wrapperEl.getBoundingClientRect().top + window.scrollY;
      const shouldFix = window.scrollY + headerOffset >= wrapperTop;
      if (shouldFix) {
        const rect = wrapperEl.getBoundingClientRect();
        setFixedStyle({ left: rect.left + window.scrollX, top: headerOffset, width: rect.width, zIndex: 0 });
      } else if (fixedStyle) {
        setFixedStyle(null);
      }
    };

    computeAndApply();
    window.addEventListener('scroll', computeAndApply, { passive: true });
    window.addEventListener('resize', computeAndApply);
    return () => {
      window.removeEventListener('scroll', computeAndApply);
      window.removeEventListener('resize', computeAndApply);
    };
  }, [fixedStyle]);

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 my-12">
      {/* Sticky Sidebar */}
      <div ref={wrapperRef} className="md:w-64 flex-shrink-0">
        <div
          ref={asideRef}
          className="md:sticky md:top-0 bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          style={
            fixedStyle
              ? { position: 'fixed', left: `${fixedStyle.left}px`, top: `${fixedStyle.top}px`, width: `${fixedStyle.width}px`, zIndex: fixedStyle.zIndex }
              : undefined
          }
        >
          <h3 className="text-lg font-bold text-[#0E7C5A] mb-3 border-b pb-2">Course Sections</h3>
          <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => handleClick(s.id)}
                className={`text-left font-medium px-3 py-2 rounded-lg transition-all duration-200 ${active === s.id
                    ? 'bg-[#0E7C5A]/10 text-[#0E7C5A] border-l-4 border-[#0E7C5A]'
                    : 'text-gray-600 hover:text-[#0E7C5A]'
                  }`}
              >
                {s.title}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 space-y-10" ref={containerRef}>
        <section
          id="introduction"
          className="detail-section bg-white p-6 rounded-xl shadow-sm border border-gray-100 scroll-mt-24"
        >
          <h2 className="text-2xl font-bold text-[#0E7C5A] mb-3">
            Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to this Nazra Quran course. This program is designed for
            beginners who aim to learn Quran reading with correct pronunciation
            and fluency. You’ll learn in a structured environment with practice
            sessions, audio guidance, and personalized tutor feedback.
          </p>
        </section>

        <section
          id="what-you-learn"
          className="detail-section bg-white p-6 rounded-xl shadow-sm border border-gray-100 scroll-mt-24"
        >
          <h2 className="text-2xl font-bold text-[#0E7C5A] mb-3">
            What You'll Learn
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Recognize and pronounce Arabic letters accurately</li>
            <li>Understand the rules of Tajweed for better recitation</li>
            <li>Read short Surahs with confidence and fluency</li>
            <li>Improve accuracy through guided listening and practice</li>
          </ul>
        </section>

        <section
          id="benefits"
          className="detail-section bg-white p-6 rounded-xl shadow-sm border border-gray-100 scroll-mt-24"
        >
          <h2 className="text-2xl font-bold text-[#0E7C5A] mb-3">Benefits</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Gain confidence in Quran recitation</li>
            <li>Learn at your own pace with personalized feedback</li>
            <li>Structured journey from alphabets to fluent recitation</li>
            <li>24/7 access to learning resources and tutor support</li>
          </ul>
        </section>

        <section
          id="course-material"
          className="detail-section bg-white p-6 rounded-xl shadow-sm border border-gray-100 scroll-mt-24"
        >
          <h2 className="text-2xl font-bold text-[#0E7C5A] mb-3">
            Course Material
          </h2>
          <p className="text-gray-700 mb-3">
            Students receive a full learning package designed to build skills
            gradually and effectively. Materials are available online and
            downloadable for offline review.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Lesson PDFs with visual guides</li>
            <li>Audio recitations for pronunciation practice</li>
            <li>Short video demonstrations</li>
            <li>Practice worksheets and mini-quizzes</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
