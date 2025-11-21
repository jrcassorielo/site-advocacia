import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StepWizard = ({ step, children }) => {
    return (
        <div style={{ position: 'relative', minHeight: '300px' }}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    style={{ width: '100%' }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default StepWizard;
