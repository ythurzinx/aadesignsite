"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function AmbientUi() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.2 });

  useEffect(() => {
    if (reduceMotion || sessionStorage.getItem("aa-intro-seen")) return;
    let timeoutId = 0;
    const frameId = window.requestAnimationFrame(() => {
      setVisible(true);
      timeoutId = window.setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem("aa-intro-seen", "1");
      }, 900);
    });
    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, [reduceMotion]);

  return (
    <>
      <motion.div className="fixed left-0 top-0 z-[100] h-[2px] w-full origin-left bg-[#0b66ff]" style={{ scaleX }} />
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed inset-0 z-[120] grid place-items-center bg-[#03060d]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
          >
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="grid h-20 w-20 place-items-center rounded-2xl bg-[#0b66ff] text-2xl font-black tracking-[-0.15em]">
              AA
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
