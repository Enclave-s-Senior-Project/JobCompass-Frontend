"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PaperclipIcon, AlertCircleIcon, X } from "lucide-react"
import { toast } from '@/lib/toast';
import { handleErrorToast } from "@/lib/utils"
import { ReportService, UploadService } from "@/services"
import { successKeyMessage } from "@/lib/message-keys"

export function EnterpriseReport({ enterpriseId }: { enterpriseId: string }) {
  const [open, setOpen] = useState(false)
  const [reportReason, setReportReason] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      const totalFiles = files.length + newFiles.length

      if (totalFiles > 5) {
        toast.warning("You can only upload a maximum of 5 files")
        return
      }

      setFiles(prev => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!reportReason) {
      toast.error("Please select a reason for reporting")
      return
    }

    setIsSubmitting(true)

    try {
      // Upload all files
      const uploadPromises = files.map(file => UploadService.uploadFile(file))
      const uploadedFiles = await Promise.all(uploadPromises)
      console.log("uploadedFiles", uploadedFiles);
      const reportData = {
        reason: reportReason,
        fileAttachment: uploadedFiles.map(file => file.fileUrl || ''),
        enterpriseId: enterpriseId,
      }

      const response = await ReportService.postReport(reportData)
      console.log("response", response);
      if(response) {
        toast.success(successKeyMessage.REPORT_ENTERPRISE_SUCCESSFUL)
      }


      setReportReason("")
      setFiles([])
      setOpen(false)
    } catch (error) {
      handleErrorToast(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline-secondary"
          size="icon-lg"
          className="rounded-sm border-2 border-red-500 "
          title="Report Enterprise"
        >
          <AlertCircleIcon className="h-4 w-4 text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Report Enterprise</DialogTitle>
            <DialogDescription>
              Please provide details about the enterprise you want to report. Your report will be reviewed by our team.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason for Report</Label>
              <Select value={reportReason} onValueChange={setReportReason}>
                <SelectTrigger id="reason">
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inappropriate">Inappropriate Content</SelectItem>
                  <SelectItem value="spam">Spam or Misleading</SelectItem>
                  <SelectItem value="fraud">Fraudulent Activity</SelectItem>
                  <SelectItem value="harassment">Harassment</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="file">Attach Evidence (optional)</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="file" 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileChange}
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("file")?.click()}
                  className="w-full"
                  disabled={files.length >= 5}
                >
                  <PaperclipIcon className="mr-2 h-4 w-4" />
                  Choose files ({files.length}/5)
                </Button>
              </div>
              {files.length > 0 && (
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="truncate flex-1">
                        {file.name} ({(file.size / 1024).toFixed(2)} KB)
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="md"
                        onClick={() => removeFile(index)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button className="mr-2" type="button" size="lg" variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
