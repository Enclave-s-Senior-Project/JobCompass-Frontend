const motionVariant = {
    itemVariants: {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 },
        },
    },
    containerVariants: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    },
    cardVariants: {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 120 },
        },
        hover: {
            scale: 1.05,
            boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)',
            transition: { duration: 0.3 },
        },
    },
};

export { motionVariant };
