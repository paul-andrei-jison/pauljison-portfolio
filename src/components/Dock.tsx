export default function Dock() {
  return (
    <div className="dock">
      <div className="dock-status">
        <span className="live-dot" />
        <span className="label">Available · June</span>
      </div>

      <div className="dock-socials">
        <a href="https://github.com/pauljison" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg width="17" height="17" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.6 0 0 3.6 0 8c0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4v-1.4c-2.2.5-2.7-1.1-2.7-1.1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.2-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.2 0 3.1-1.9 3.8-3.7 4 .3.3.6.8.6 1.5v2.2c0 .2.1.5.5.4C13.7 14.5 16 11.5 16 8c0-4.4-3.6-8-8-8z" />
          </svg>
        </a>
        <a href="https://linkedin.com/in/pauljison" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg width="15" height="15" viewBox="0 0 14 14" fill="currentColor">
            <path d="M3.6 4.4H1.2v8h2.4v-8zM2.4 1c-.8 0-1.4.6-1.4 1.3 0 .8.6 1.3 1.4 1.3.8 0 1.4-.6 1.4-1.3 0-.7-.6-1.3-1.4-1.3zM13 8.6c0-2.1-.4-3.6-2.9-3.6-1.2 0-2 .5-2.4 1.2v-1H5.3v8h2.4V8.7c0-1 .2-2 1.5-2 1.3 0 1.4 1.2 1.4 2v3.6H13V8.6z" />
          </svg>
        </a>
        <a href="https://x.com/pauljison" target="_blank" rel="noopener noreferrer" aria-label="X">
          <svg width="15" height="15" viewBox="0 0 14 14" fill="currentColor">
            <path d="M10.6 1H12.6L8.2 6.1 13.3 13H9.4L6.3 9 2.8 13H0.8L5.5 7.6 0.6 1H4.7L7.5 4.7 10.6 1zM9.9 11.7H11L4 2.2H2.8L9.9 11.7z" />
          </svg>
        </a>
      </div>

      <a href="#contact" className="dock-cta">
        Get in touch
        <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
          <path d="M2 9L9 2M9 2H4M9 2V7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}
