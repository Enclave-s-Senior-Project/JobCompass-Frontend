"use client"
import ReviewForm from "./review-form"
import ReviewSummary from "./review-summary"
import ReviewList from "./review-list"
import { useQueryClient } from "@tanstack/react-query"
import { queryKey } from "@/lib/react-query/keys"

interface EnterpriseReviewsProps {
  enterpriseId: string
  currentUserId?: string
}

export default function EnterpriseReviews({ enterpriseId, currentUserId }: EnterpriseReviewsProps) {
  const queryClient = useQueryClient()

  const handleReviewSuccess = () => {
    // Invalidate both review list and summary queries
    queryClient.invalidateQueries({ queryKey: [queryKey.getSummaryReviewByEnterpriseId, enterpriseId] })
    queryClient.invalidateQueries({ queryKey: [queryKey.getEnterpriseReviews, enterpriseId] })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-primary-700">Company Reviews</h2>

      {/* Review Summary */}
      <ReviewSummary enterpriseId={enterpriseId} />

      {/* Review Form - Only show if user is logged in */}
      {currentUserId && <ReviewForm enterpriseId={enterpriseId} onSuccess={handleReviewSuccess} />}

      {/* Review List */}
      <ReviewList enterpriseId={enterpriseId} currentUserId={currentUserId} />
    </div>
  )
}
