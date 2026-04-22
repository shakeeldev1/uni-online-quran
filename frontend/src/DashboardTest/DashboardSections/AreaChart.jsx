import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const useResize = (ref) => {
  const [rect, setRect] = useState({ width: 300, height: 150 });
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => setRect(e.contentRect));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ref]);
  return rect;
};

export const AreaChart = ({
  series,
  labels,
  height = 280,
  legend,
  onToggle,
  svgRef,
}) => {
  const holder = useRef(null);
  const { width } = useResize(holder);
  const [hover, setHover] = useState(null);
  const isXS = width < 480;

  const pad = isXS
    ? { t: 12, r: 8, b: 16, l: 32 }
    : { t: 16, r: 12, b: 18, l: 40 };
  const W = Math.max(300, width);
  const H = isXS ? 220 : height;

  const visible = series.filter((s) => !legend.hidden.has(s.name));
  const flat = visible.flatMap((s) => s.data);
  const yMin = Math.min(...flat),
    yMax = Math.max(...flat);
  const niceMin = Math.floor(yMin * 0.95),
    niceMax = Math.ceil(yMax * 1.05);
  const plotW = W - pad.l - pad.r,
    plotH = H - pad.t - pad.b;

  const x = (i) => pad.l + (plotW * i) / (labels.length - 1);
  const y = (v) =>
    pad.t + plotH - ((v - niceMin) / (niceMax - niceMin || 1)) * plotH;
  const getPath = (arr) =>
    arr.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`).join(" ");
  const getArea = (arr) =>
    `${getPath(arr)} L ${x(arr.length - 1)} ${pad.t + plotH} L ${x(0)} ${
      pad.t + plotH
    } Z`;
  const idxFromX = (px) => {
    const v = Math.max(pad.l, Math.min(px, pad.l + plotW)) - pad.l;
    return Math.round((v / plotW) * (labels.length - 1));
  };

  const ease = [0.16, 1, 0.3, 1];
  return (
    <div ref={holder} className="">
      <svg ref={svgRef} width={W} height={H}>
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={pad.l}
            x2={W - pad.r}
            y1={pad.t + (plotH * i) / 4}
            y2={pad.t + (plotH * i) / 4}
            stroke="#e5e7eb"
            strokeDasharray="3 5"
          />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <text
            key={i}
            x={8}
            y={pad.t + (plotH * i) / 4 + 4}
            fontSize={isXS ? "10" : "11"}
            fill="#64748b"
          >
            {Math.round(niceMax - ((niceMax - niceMin) * i) / 4)}
          </text>
        ))}
        <defs>
          {visible.map((s, i) => (
            <linearGradient key={i} id={`g-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity="0.28" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
        {visible.map((s, i) => (
          <motion.path
            key={`a${s.name}`}
            d={getArea(s.data)}
            fill={`url(#g-${i})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.05 * i }}
          />
        ))}
        {visible.map((s, i) => (
          <motion.path
            key={`l${s.name}`}
            d={getPath(s.data)}
            fill="none"
            stroke={s.color}
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.05 * i, ease }}
          />
        ))}
        {hover != null && (
          <>
            <line
              x1={x(hover)}
              x2={x(hover)}
              y1={pad.t}
              y2={pad.t + plotH}
              stroke="#94a3b8"
              strokeDasharray="4 4"
            />
            {visible.map((s, i) => (
              <circle
                key={i}
                cx={x(hover)}
                cy={y(s.data[hover])}
                r={isXS ? "3.5" : "4.5"}
                fill="#fff"
                stroke={s.color}
                strokeWidth="2"
              />
            ))}
          </>
        )}
        {[0, Math.floor((labels.length - 1) / 2), labels.length - 1].map(
          (i) => (
            <text
              key={i}
              x={x(i)}
              y={H - 6}
              fontSize={isXS ? "10" : "11"}
              textAnchor="middle"
              fill="#64748b"
            >
              {labels[i]}
            </text>
          )
        )}
        <rect
          x={pad.l}
          y={pad.t}
          width={plotW}
          height={H - pad.t - pad.b}
          fill="transparent"
          onMouseMove={(e) => setHover(idxFromX(e.nativeEvent.offsetX))}
          onMouseLeave={() => setHover(null)}
          onTouchMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setHover(idxFromX(e.touches[0].clientX - r.left));
          }}
          onTouchEnd={() => setHover(null)}
        />
      </svg>

      {/* tight legend */}
      <div className="flex flex-wrap gap-2 mt-0">
        {series.map((s) => (
          <button
            key={s.name}
            className={`px-2.5 py-1 rounded-full text-xs border transition ${
              legend.hidden.has(s.name)
                ? "bg-white text-slate-500 border-slate-200"
                : "text-white"
            }`}
            style={{
              background: legend.hidden.has(s.name) ? undefined : s.color,
            }}
            onClick={() => onToggle(s.name)}
          >
            {legend.hidden.has(s.name) ? "Show" : "Hide"} {s.name}
          </button>
        ))}
      </div>
    </div>
  );
};
