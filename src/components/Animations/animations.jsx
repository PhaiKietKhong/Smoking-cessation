import { motion } from "framer-motion";
import { Box } from "@mui/material";

export function LeftToRight({
  delay = 0,
  duration = 0.8,
  initialX = -20,
  children,
  ...rest
}) {
  return (
    <motion.div
      initial={{ x: initialX, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration }}
    >
      <Box {...rest}>{children}</Box>
    </motion.div>
  );
}

export function BotToTop({
  delay = 0,
  duration = 0.8,
  initialY = 20,
  children,
  ...rest
}) {
  return (
    <motion.div
      initial={{ y: initialY, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration, delay }}
    >
      <Box {...rest}>{children}</Box>
    </motion.div>
  );
}

export function FadeIn({ delay = 0, duration = 0.8, children, ...rest }) {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration }}
    >
      <Box {...rest}>{children}</Box>
    </motion.div>
  );
}

import { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";

export function AnimatedProgress({ target, duration }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min((elapsed / duration) * target, target);
      setValue(progress);

      if (progress < target) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [target, duration]);

  return (
    <LinearProgress
      variant="determinate"
      value={value}
      sx={{
        height: 10,
        borderRadius: 5,
        bgcolor: "rgba(0,0,0,0.1)",
        "& .MuiLinearProgress-bar": {
          bgcolor: "#67bb6b",
        },
      }}
    />
  );
}
