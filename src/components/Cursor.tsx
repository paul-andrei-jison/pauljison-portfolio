import { useEffect, useRef } from 'react';

export default function Cursor() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    let raf: number;

    const onMove = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener('pointermove', onMove);

    function loop() {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow" />;
}
