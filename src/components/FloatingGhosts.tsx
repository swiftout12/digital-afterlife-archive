
import { useState, useEffect } from 'react';

interface Ghost {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

const FloatingGhosts = () => {
  const [ghosts, setGhosts] = useState<Ghost[]>([]);

  useEffect(() => {
    const createGhost = (): Ghost => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 20 + 10,
      opacity: Math.random() * 0.3 + 0.1,
      speed: Math.random() * 2 + 0.5,
    });

    const initialGhosts = Array.from({ length: 5 }, createGhost);
    setGhosts(initialGhosts);

    const interval = setInterval(() => {
      setGhosts(prev => prev.map(ghost => ({
        ...ghost,
        y: ghost.y - ghost.speed,
        x: ghost.x + Math.sin(Date.now() * 0.001 + ghost.id) * 0.5,
      })).filter(ghost => ghost.y > -100));
    }, 50);

    const ghostSpawner = setInterval(() => {
      setGhosts(prev => [...prev, createGhost()]);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(ghostSpawner);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {ghosts.map(ghost => (
        <div
          key={ghost.id}
          className="absolute text-white transition-all duration-500 animate-float"
          style={{
            left: ghost.x,
            top: ghost.y,
            fontSize: ghost.size,
            opacity: ghost.opacity,
          }}
        >
          👻
        </div>
      ))}
    </div>
  );
};

export default FloatingGhosts;
