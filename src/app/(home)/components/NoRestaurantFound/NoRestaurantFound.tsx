'use client';

import { motion } from 'framer-motion';

const NoRestaurantFound = () => {
    const plateVariants = {
        initial: { rotate: 0, y: 0 },
        animate: {
            rotate: [0, -10, 10, -10, 0],
            y: [0, -20, 20, -10, 0],
            transition: {
                duration: 2.5,
                ease: 'easeInOut',
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1,
            },
        },
    };

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center px-6 dark:bg-gray-900">
            <motion.div
                initial="initial"
                animate="animate"
                variants={plateVariants}
                className="mb-8 h-64 w-64"
            >
                <svg viewBox="0 0 100 100" className="h-full w-full">
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-primary"
                    />
                    <motion.path
                        d="M30 50 L70 50"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="text-primary"
                    />
                </svg>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-2xl font-bold text-gray-800 dark:text-gray-100 md:text-3xl"
            >
                No Restaurants Found
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="mt-4 max-w-md text-center text-base text-gray-600 dark:text-gray-300 md:text-lg"
            >
                We couldn{"'"}t find any restaurants in this area. Try searching in a
                different location or check back later.
            </motion.p>
        </div>
    );
};

export default NoRestaurantFound;
