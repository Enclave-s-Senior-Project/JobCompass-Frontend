"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, MoreVertical, Edit2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Review {
  id: string
  userId: string
  rating: number
  comment: string
  createdAt: string
  updatedAt: string
  user?: {
    id: string
    name: string
  }
}

interface ReviewListProps {
  enterpriseId: string
  currentUserId?: string
}

export default function ReviewList({ enterpriseId, currentUserId }: ReviewListProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [reviews, setReviews] = useState<Review[]>([])
  const [page, setPage] = useState(1)
  const [totalReviews, setTotalReviews] = useState(0)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/v1/user-ratings/enterprise/${enterpriseId}?page=${page}&limit=10`)
        if (!response.ok) {
          throw new Error("Failed to fetch reviews")
        }
        const data = await response.json()
        setReviews(data.data)
        setTotalReviews(data.total)
      } catch (error) {
        console.error("Error fetching reviews:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (enterpriseId) {
      fetchReviews()
    }
  }, [enterpriseId, page])

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm("Are you sure you want to delete this review?")) {
      return
    }

    try {
      const response = await fetch(`/api/v1/user-ratings/${reviewId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete review")
      }

      // Remove the deleted review from the list
      setReviews(reviews.filter((review) => review.id !== reviewId))
      setTotalReviews((prev) => prev - 1)
    } catch (error) {
      console.error("Error deleting review:", error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
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

  if (!reviews?.length) {
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
        <CardTitle>{totalReviews} đánh giá</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-4 last:border-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {review.user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <div className="font-medium">{review.user?.name || "Anonymous"}</div>
                    <div className="text-sm text-gray-500">{formatDate(review.createdAt)}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                  </div>

                  {currentUserId === review.userId && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon-md">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit2 className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer text-red-600"
                          onClick={() => handleDeleteReview(review.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>

              <p className="text-gray-700 mt-2">{review.comment}</p>
            </div>
          ))}
        </div>

        {totalReviews > 10 && (
          <div className="flex justify-between items-center mt-6">
            <Button variant="outline" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
              Previous
            </Button>
            <span>Page {page}</span>
            <Button variant="outline" onClick={() => setPage((p) => p + 1)} disabled={page * 10 >= totalReviews}>
              Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
