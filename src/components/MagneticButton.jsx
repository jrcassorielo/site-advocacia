import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MagneticButton = ({ children, onClick, className = '' }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.3, y: middleY * 0.3 }); // Adjust 0.3 for strength
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.button
            ref={ref}
            className={`magnetic-btn ${className}`}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            onClick={onClick}
            style={{
                position: 'relative',
                padding: '1.2rem 2.5rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                background: 'var(--accent-primary)',
                borderRadius: '4px',
                overflow: 'hidden',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                boxShadow: '0 10px 30px -10px rgba(132, 25, 25, 0.5)'
            }}
        >
            <span style={{ position: 'relative', zIndex: 10 }}>{children}</span>
            <motion.div
                className="glow"
                style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                    zIndex: 1,
                    opacity: 0,
                }}
                whileHover={{ opacity: 1 }}
            />
        </motion.button>
    );
};

export default MagneticButton;
