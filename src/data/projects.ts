export interface Project {
  id: string;
  title: string;
  description: string;
  /**
   * Each entry is a single technology label, e.g. ['React', 'Node.js', 'AWS'].
   * Keep labels short (1–3 words) so they fit comfortably in the pill tags.
   */
  techStack?: string[];
  /** Full URL to the deployed project, e.g. 'https://myproject.com'. */
  liveUrl?: string;
  /**
   * Path or URL to a preview screenshot shown in the accordion panel.
   *
   * RESOLUTION & FORMAT
   *   - Aspect ratio : 16 : 9  (the UI renders it with `aspect-video`)
   *   - Recommended size : 640 × 360 px  (displays at 256 px wide; 2× for sharp Retina)
   *   - Minimum size : 320 × 180 px
   *   - Preferred format : WebP (best compression) — JPEG is fine too
   *   - Avoid PNG for photos; the file size balloons without quality benefit
   *
   * WHERE TO PUT THE FILE
   *   Drop images into `public/images/projects/` and reference them as:
   *     imageUrl: '/images/projects/my-project.webp'
   *   (Vite serves everything in `public/` from the root at build time.)
   *
   * LEAVE UNDEFINED to hide the image column entirely for that project.
   */
  imageUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'court-booking',
    title: 'Court Booking System',
    description:
      'A real-time sports court reservation platform built with React and AWS Amplify. Features live availability, instant slot booking, and an admin dashboard — all deployed serverlessly.',
    techStack: ['React', 'AWS Amplify', 'Tailwind', 'Serverless'],
    liveUrl: 'https://court-booking-system.pauljison.com',
    // imageUrl: '/images/projects/court-booking.webp',
  },
];
