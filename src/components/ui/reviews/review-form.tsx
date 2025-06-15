"use client"
import { useState } from "react"
import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import { useCreateReview } from "@/hooks/use-reviews"
import { useToast } from "@/hooks/use-toast"
import { handleErrorToast } from "@/lib/utils"

interface ReviewFormProps {
  enterpriseId: string
  onSuccess?: () => void
}

export default function ReviewForm({ enterpriseId, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")
  const [showForm, setShowForm] = useState(false)
  const { toast } = useToast()
  const createReviewMutation = useCreateReview()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      toast({
        title: "Error",
        description: "Please select a rating",
        variant: "destructive",
      })
      return
    }

    if (!comment.trim()) {
      toast({
        title: "Error",
        description: "Please enter a comment",
        variant: "destructive",
      })
      return
    }

    try {
      await createReviewMutation.mutateAsync({
        enterpriseId,
        data: {
          rating,
          comment: comment.trim(),
        },
      })

      // Reset form
      setRating(0)
      setComment("")
      setShowForm(false)
      onSuccess?.()

      toast({
        title: "Success",
        description: "Your review has been submitted successfully",
      })
    } catch (error) {
      handleErrorToast(error)
    }
  }

  if (!showForm) {
    return (
      <Card>
        <CardContent className="p-6">
          <Button onClick={() => setShowForm(true)} className="w-full" variant="outline">
            Write a review for this company
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write a review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your rating *</label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1 hover:scale-110 transition-transform"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 hover:text-yellow-200"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating === 0 && <p className="text-sm text-red-500 mt-1">Please select a rating</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Comment *</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this company..."
              rows={4}
              className="w-full"
              maxLength={1000}
            />
            <p className="text-sm text-gray-500 mt-1">{comment.length}/1000 characters</p>
            {!comment.trim() && <p className="text-sm text-red-500 mt-1">Please enter a comment</p>}
          </div>

          <div className="flex space-x-3">
            <Button
              type="submit"
              className="flex-1"
              disabled={createReviewMutation.isPending}
            >
              {createReviewMutation.isPending ? "Submitting..." : "Submit"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowForm(false)
                setRating(0)
                setComment("")
              }}
              disabled={createReviewMutation.isPending}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
