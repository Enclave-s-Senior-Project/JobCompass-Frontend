"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Star, MoreVertical, Edit2, Trash2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { ReviewService } from "@/services"
import { queryKey } from "@/lib/react-query/keys"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Review {
  userRatingId: string
  rating: number
  comment: string
  createdAt: string
  profile: {
    profileId: string
    fullName: string
    profileUrl: string
  }
}

interface ReviewListProps {
  enterpriseId: string
  currentUserId?: string
}

export default function ReviewList({ enterpriseId, currentUserId }: ReviewListProps) {
  const [isMounted, setIsMounted] = useState(false)
  const queryClient = useQueryClient()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const { data: reviewsData, isLoading, error } = useQuery({
    queryKey: [queryKey.getEnterpriseReviews, enterpriseId],
    queryFn: async () => {
      const response = await ReviewService.getByEnterprise(enterpriseId);
      if (!response) throw new Error('No review data found');
      return (response as unknown) as Review[];
    },
  })

  const deleteReviewMutation = useMutation({
    mutationFn: (reviewId: string) => ReviewService.deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.getEnterpriseReviews, enterpriseId] })
    }
  })

  const handleDeleteReview = async (reviewId: string) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await deleteReviewMutation.mutateAsync(reviewId)
      } catch (error) {
        console.error("Error deleting review:", error)
      }
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-500">Cannot load review list</p>
        </CardContent>
      </Card>
    )
  }

  if (!reviewsData?.length) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">No reviews yet for this company.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>There are {reviewsData.length} reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reviewsData.map((review) => (
            <div key={review.userRatingId} className="border-b pb-4 last:border-b-0">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="size-10 lg:size-12">
                    <AvatarImage className="object-cover object-center" src={review.profile.profileUrl} />
                    <AvatarFallback>{review.profile.fullName}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">{review.profile.fullName}</p>
                    <p className="text-sm text-gray-500">
                      {isMounted ? formatDistanceToNow(new Date(review.createdAt), {
                        addSuffix: true,
                        locale: vi,
                      }) : new Date(review.createdAt).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                </div>

                {currentUserId === review.profile.profileId && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-md">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit2 className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteReview(review.userRatingId)}
                        disabled={deleteReviewMutation.isPending}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              <div className="mt-3 flex items-center space-x-1">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
              </div>

              <p className="mt-3 text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
