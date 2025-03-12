'use client';

const LoadingOnlyIcon = () => {
    return (
        <div className="fui-loading-default">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <style jsx>{`
                .fui-loading-default {
                    display: inline-block;
                    position: relative;
                    width: 80px;
                    height: 80px;
                }
                .fui-loading-default div {
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    background: #9dc1eb;
                    border-radius: 50%;
                    animation: lds-default 1.2s linear infinite;
                }
                .fui-loading-default div:nth-child(1) {
                    animation-delay: 0s;
                    top: 37px;
                    left: 66px;
                }
                .fui-loading-default div:nth-child(2) {
                    animation-delay: -0.1s;
                    top: 22px;
                    left: 62px;
                }
                .fui-loading-default div:nth-child(3) {
                    animation-delay: -0.2s;
                    top: 11px;
                    left: 52px;
                }
                .fui-loading-default div:nth-child(4) {
                    animation-delay: -0.3s;
                    top: 7px;
                    left: 37px;
                }
                .fui-loading-default div:nth-child(5) {
                    animation-delay: -0.4s;
                    top: 11px;
                    left: 22px;
                }
                .fui-loading-default div:nth-child(6) {
                    animation-delay: -0.5s;
                    top: 22px;
                    left: 11px;
                }
                .fui-loading-default div:nth-child(7) {
                    animation-delay: -0.6s;
                    top: 37px;
                    left: 7px;
                }
                .fui-loading-default div:nth-child(8) {
                    animation-delay: -0.7s;
                    top: 52px;
                    left: 11px;
                }
                .fui-loading-default div:nth-child(9) {
                    animation-delay: -0.8s;
                    top: 62px;
                    left: 22px;
                }
                .fui-loading-default div:nth-child(10) {
                    animation-delay: -0.9s;
                    top: 66px;
                    left: 37px;
                }
                .fui-loading-default div:nth-child(11) {
                    animation-delay: -1s;
                    top: 62px;
                    left: 52px;
                }
                .fui-loading-default div:nth-child(12) {
                    animation-delay: -1.1s;
                    top: 52px;
                    left: 62px;
                }
                @keyframes lds-default {
                    0%,
                    20%,
                    80%,
                    100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.5);
                    }
                }
            `}</style>
        </div>
    );
};

const CompassLoadingQuick = ({ isLoading = true }) => {
    // Base transition style
    const transitionStyle = {
        transition: 'opacity 300ms cubic-bezier(0.16, 1, 0.3, 1), transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        opacity: isLoading ? 1 : 0,
        transform: isLoading ? 'translateY(0) scale(1)' : 'translateY(5px) scale(0.98)',
    };

    // Text section transition style
    const textTransitionStyle = {
        transition:
            'opacity 300ms cubic-bezier(0.16, 1, 0.3, 1) 50ms, transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1) 50ms',
        opacity: isLoading ? 1 : 0,
        transform: isLoading ? 'translateY(0)' : 'translateY(5px)',
    };

    // Dot animation style (we'll handle this purely with CSS)
    const dotStyle = {
        transition: 'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    };

    return (
        <div className="flex flex-col items-center justify-center p-3" style={transitionStyle}>
            {/* Full Logo with Spinning Compass */}
            <div className="w-64 relative mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100">
                    {/* Spinning Compass Icon */}
                    <g className="compass-spin">
                        <circle cx="50" cy="50" r="45" fill="#2B6CB0" />
                        <circle cx="50" cy="50" r="42.5" fill="white" />
                        <path d="M50 17.5 L53 45 L82.5 50 L53 55 L50 82.5 L47 55 L17.5 50 L47 45 Z" fill="#2B6CB0" />
                        <circle cx="50" cy="50" r="15" fill="white" />
                        <circle cx="50" cy="50" r="12.5" fill="#2B6CB0" />
                        <circle cx="50" cy="50" r="10" fill="white" />
                        <circle cx="50" cy="50" r="2.5" fill="#2B6CB0" />
                        <text
                            x="50"
                            y="15"
                            fontFamily="Arial"
                            fontSize="8"
                            fontWeight="bold"
                            textAnchor="middle"
                            fill="#2B6CB0"
                        >
                            N
                        </text>
                        <text
                            x="87.5"
                            y="52.5"
                            fontFamily="Arial"
                            fontSize="8"
                            fontWeight="bold"
                            textAnchor="middle"
                            fill="#2B6CB0"
                        >
                            E
                        </text>
                        <text
                            x="50"
                            y="90"
                            fontFamily="Arial"
                            fontSize="8"
                            fontWeight="bold"
                            textAnchor="middle"
                            fill="#2B6CB0"
                        >
                            S
                        </text>
                        <text
                            x="12.5"
                            y="52.5"
                            fontFamily="Arial"
                            fontSize="8"
                            fontWeight="bold"
                            textAnchor="middle"
                            fill="#2B6CB0"
                        >
                            W
                        </text>
                    </g>

                    {/* Company name and slogan (static) */}
                    <text x="110" y="60" fontFamily="Arial" fontSize="32" fontWeight="bold" fill="#2B6CB0">
                        Job<tspan fill="#1A365D">Compass</tspan>
                    </text>
                    <text x="120" y="85" fontFamily="Arial" fontSize="14" fill="#4A5568">
                        Navigate your career, find your future
                    </text>
                </svg>
            </div>

            {/* Processing Text Section */}
            <div className="flex flex-col items-center text-center" style={textTransitionStyle}>
                <div className="flex items-center">
                    <span className="text-base font-normal text-primary message-cycle">Just a moment</span>
                    <span className="flex space-x-1 ml-1">
                        <span className="w-1 h-1 rounded-full bg-blue-500 dot-1" style={dotStyle}></span>
                        <span className="w-1 h-1 rounded-full bg-blue-500 dot-2" style={dotStyle}></span>
                        <span className="w-1 h-1 rounded-full bg-blue-500 dot-3" style={dotStyle}></span>
                    </span>
                </div>
            </div>

            {/* CSS for animations */}
            <style jsx>{`
                .compass-spin {
                    transform-origin: 50px 50px;
                    animation: quickSpin 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;
                }

                @keyframes quickSpin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }

                .message-cycle {
                    animation: cycleMessages 5.4s infinite;
                }

                @keyframes cycleMessages {
                    0%,
                    33% {
                        content: 'Processing';
                    }
                    34%,
                    66% {
                        content: 'Just a sec';
                    }
                    67%,
                    100% {
                        content: 'Wait a moment';
                    }
                }

                .dot-1 {
                    animation: dotFade 0.9s infinite;
                }
                .dot-2 {
                    animation: dotFade 0.9s infinite 0.3s;
                }
                .dot-3 {
                    animation: dotFade 0.9s infinite 0.6s;
                }

                @keyframes dotFade {
                    0%,
                    100% {
                        opacity: 0.2;
                    }
                    50% {
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
};

export { CompassLoadingQuick, LoadingOnlyIcon };
