import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReviewService } from '@/services';
import { queryKey } from '@/lib/react-query/keys';

export function useCreateReview() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ enterpriseId, data }: { enterpriseId: string; data: { rating: number; comment?: string } }) =>
            ReviewService.createReview(enterpriseId, data),
        onSuccess: (_, { enterpriseId }) => {
            queryClient.invalidateQueries({ queryKey: [queryKey.getSummaryReviewByEnterpriseId, enterpriseId] });
            queryClient.invalidateQueries({ queryKey: [queryKey.getEnterpriseReviews, enterpriseId] });
        },
    });
}

// export function useUpdateReview() {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: ({ id, data }: { id: string; data: { rating: number; comment?: string } }) =>
//             ReviewService.updateReview(id, data),
//         onSuccess: (_, { id }) => {
//             queryClient.invalidateQueries({ queryKey: [queryKey.getSummaryReviewByEnterpriseId] });
//         },
//     });
// }

// export function useDeleteReview() {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: (id: string) => ReviewService.deleteReview(id),
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: [queryKey.getSummaryReviewByEnterpriseId] });
//         },
//     });
