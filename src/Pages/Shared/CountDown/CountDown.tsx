import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ---------------------------------------------------------
// Professional Countdown Page (Hours : Minutes : Seconds)
// Default: counts down from 1 hour (3600 seconds)
// Usage: <CountDown /> or <CountDown durationSeconds={900} />
// ---------------------------------------------------------

type CountDownProps = {
  durationSeconds?: number; // default 3600 (1 hour)
  title?: string;
  onComplete?: () => void;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const Pill = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col items-center">
    <div className="rounded-2xl shadow-xl bg-white/10 backdrop-blur-md border border-white/20 px-5 py-4 min-w-[90px] md:min-w-[110px] text-center">
      <span className="block text-3xl md:text-5xl font-extrabold tracking-wider text-white tabular-nums">
        {value}
      </span>
    </div>
    <span className="mt-2 text-xs md:text-sm uppercase tracking-[0.2em] text-white/80">
      {label}
    </span>
  </div>
);

export default function CountDown({
  durationSeconds = 3600,
  title = "We go live in",
  onComplete,
}: CountDownProps) {
  const [remaining, setRemaining] = useState<number>(durationSeconds);

  useEffect(() => {
    setRemaining(durationSeconds);
    const id = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [durationSeconds, onComplete]);

  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;
  const isDone = remaining === 0;

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-6"
      style={{ background: "linear-gradient(to bottom, #0d7382, #a7c2c6)" }}
    >
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-5xl"
      >
        <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-8 md:px-12 pt-10 md:pt-14 text-center">
            <h1 className="text-white text-3xl md:text-5xl font-extrabold tracking-tight">
              {title}
            </h1>
          </div>

          {/* Countdown */}
          <div className="px-6 md:px-12 py-10">
            {isDone ? (
              <div className="text-center">
                <p className="text-white text-2xl md:text-4xl font-bold">
                  We\'re live! 🎉
                </p>
                <p className="mt-2 text-white/80">
                  Reset the component or pass a new durationSeconds to start
                  again.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3 md:gap-6 place-items-center">
                <Pill label="Hours" value={pad(hours)} />
                <Pill label="Minutes" value={pad(minutes)} />
                <Pill label="Seconds" value={pad(seconds)} />
              </div>
            )}
          </div>
        </div>
      </motion.main>
    </div>
  );
}
