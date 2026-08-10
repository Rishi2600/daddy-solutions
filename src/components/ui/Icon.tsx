import type { SVGProps } from "react";

/**
 * Hand-rolled icon set. Keeping these local means no icon package in the
 * bundle and a consistent 24px, 1.5-stroke look across the site.
 */
const paths = {
  layers: (
    <>
      <path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" />
      <path d="m3 12.5 9 4.5 9-4.5" />
      <path d="m3 17 9 4.5 9-4.5" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </>
  ),
  window: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M6.5 6.5h.01M9.5 6.5h.01" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  cloud: (
    <>
      <path d="M6.5 18a4.5 4.5 0 0 1-.5-8.97 6 6 0 0 1 11.6 1.24A3.75 3.75 0 0 1 17.5 18h-11Z" />
      <path d="M12 21v-6m0 0-2 2m2-2 2 2" />
    </>
  ),
  hexagon: (
    <>
      <path d="M12 2.5 20 7v10l-8 4.5L4 17V7l8-4.5Z" />
      <path d="M12 8.5 16 11v3l-4 2.2L8 14v-3l4-2.5Z" />
    </>
  ),
  lifebuoy: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.6" />
      <path d="m5.7 5.7 3.8 3.8m5 5 3.8 3.8m0-12.6-3.8 3.8m-5 5-3.8 3.8" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5Z" />
      <path d="M18.5 16.5 19.2 19l2.3.8-2.3.8-.7 2.4" />
    </>
  ),
  arrowRight: <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" />,
  arrowUpRight: <path d="M7.5 16.5 16.5 7.5m0 0H9m7.5 0V15" />,
  check: <path d="m4.5 12.5 4.5 4.5L19.5 6.5" />,
  cross: <path d="M6 6 18 18M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  bolt: <path d="M13 2.5 4.5 13.5H11l-.5 8L19.5 10.5H13l0-8Z" />,
  shield: (
    <>
      <path d="M12 2.8 20 6v6.2c0 4.3-3.2 7.6-8 9-4.8-1.4-8-4.7-8-9V6l8-3.2Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.4 2" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths;

type IconProps = SVGProps<SVGSVGElement> & { name: IconName; size?: number };

export function Icon({ name, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
