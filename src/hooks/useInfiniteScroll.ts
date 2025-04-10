import { useCallback, useEffect, useRef } from 'react';

type UseInfiniteScrollOptions = {
    loading: boolean;
    hasMore: boolean;
    threshold?: number;
    onLoadMore: () => void;
};

export const useInfiniteScroll = ({ loading, hasMore, threshold = 100, onLoadMore }: UseInfiniteScrollOptions) => {
    const containerRef = useRef<any>(null);

    const handleScroll = useCallback(() => {
        console.log('Scrolling');
        if (!containerRef.current || loading || !hasMore) return;

        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

        // Load more content when user scrolls near the bottom
        if (scrollHeight - scrollTop - clientHeight <= threshold) {
            onLoadMore();
        }
    }, [loading, hasMore, threshold, onLoadMore]);

    useEffect(() => {
        const currentContainer = containerRef.current;
        console.log(currentContainer);
        if (currentContainer && currentContainer instanceof HTMLDivElement) {
            currentContainer.addEventListener('scroll', handleScroll);

            return () => {
                currentContainer.removeEventListener('scroll', handleScroll);
            };
        }
    }, [handleScroll]);

    return { containerRef };
};
