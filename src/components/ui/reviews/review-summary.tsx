"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"
import { queryKey } from '@/lib/react-query/keys';
import { useQuery } from "@tanstack/react-query";
import { ReviewService } from "@/services";
import { DetailedResponse } from "@/types/api-types";

interface ReviewSummaryProps {
  enterpriseId: string
}

const DEFAULT_RATING_DISTRIBUTION = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0
};

export default function ReviewSummary({ enterpriseId }: ReviewSummaryProps) {
  const { data: reviewData, isLoading, error } = useQuery({
    queryKey: [queryKey.getSummaryReviewByEnterpriseId, enterpriseId],
    queryFn: async () => {
      const response = await ReviewService.getSummaryReviewByEnterpriseId(enterpriseId);
      if (!response) throw new Error('No review data found');
      return response as DetailedResponse.ReviewSummary;
    },
  })

  const getBarColor = (star: number) => {
    switch (star) {
      case 5:
        return "bg-green-500"
      case 4:
        return "bg-green-400"
      case 3:
        return "bg-yellow-500"
      case 2:
        return "bg-orange-500"
      case 1:
        return "bg-red-500"
      default:
        return "bg-gray-400"
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="h-4 bg-gray-200 rounded w-12"></div>
                  <div className="h-2 bg-gray-200 rounded flex-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-8"></div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-500">Cannot load review data</p>
        </CardContent>
      </Card>
    )
  }

  const { 
    averageRating = 0, 
    totalReviews = 0, 
    ratingDistribution = DEFAULT_RATING_DISTRIBUTION 
  } = reviewData || {};

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Reviews from employees</span>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
            <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            <span className="text-gray-600">({totalReviews} reviews)</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 w-16">
                <span className="text-sm text-gray-600">{star}</span>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getBarColor(star)}`}
                  style={{
                    width: `${
                      totalReviews > 0
                        ? (ratingDistribution[star as keyof typeof ratingDistribution] / totalReviews) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
              <span className="text-sm text-gray-600 w-8 text-right">
                {ratingDistribution[star as keyof typeof ratingDistribution] || 0}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
