import { useEffect, useState } from 'react';

function TerminalLine({ text, delay = 50 }) {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [index, text, delay]);

  return (
    <pre className="terminal-line">
      {displayed}
      <span className="blinking-cursor">█</span>
    </pre>
  );
}

export default TerminalLine;
