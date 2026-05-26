// src/features/applicant/components/ResumeCard.tsx
import { View, Text, TouchableOpacity } from 'react-native'
import { FileText, Upload, Eye, Sparkles, Download } from 'lucide-react-native'
import dayjs from 'dayjs'

interface ResumeCardProps {
  fileName?: string
  uploadedAt?: string
  fileSizeKb?: number
  completionPercent?: number
  completionHint?: string
  onDownload: () => void
  onUpdate: () => void
  onPreview: () => void
}

const ResumeCard = ({
  fileName,
  uploadedAt,
  fileSizeKb,
  completionPercent = 0,
  completionHint,
  onDownload,
  onUpdate,
  onPreview,
}: ResumeCardProps) => {

  const hasResume = !!fileName

  return (
    <View>
      {/* Resume card */}
      <View className="bg-navy-900 rounded-2xl p-4 mb-3">
        {hasResume ? (
          <>
            {/* File info */}
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-10 h-10 rounded-xl bg-navy-800 items-center justify-center">
                <FileText size={20} color="#4A7BE0" />
              </View>
              <View className="flex-1">
                <Text className="font-figtree-bold text-sm text-white" numberOfLines={1}>
                  {fileName}
                </Text>
                <Text className="font-figtree text-xs text-surface-muted mt-0.5">
                  Uploaded {dayjs(uploadedAt).format('MMM D, YYYY')}
                  {fileSizeKb ? ` · ${fileSizeKb} KB` : ''}
                </Text>
              </View>
              <View className="w-2 h-2 rounded-full bg-success" />
            </View>

            {/* Action buttons */}
            <View className="flex-row gap-3 mb-4">
              <TouchableOpacity
                onPress={onUpdate}
                className="flex-1 border border-navy-700 rounded-2xl py-3 items-center flex-row justify-center gap-2"
              >
                <Upload size={14} color="#FFFFFF" />
                <Text className="font-figtree-bold text-sm text-white">Update resume</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onPreview}
                className="flex-1 border border-navy-700 rounded-2xl py-3 items-center flex-row justify-center gap-2"
              >
                <Eye size={14} color="#FFFFFF" />
                <Text className="font-figtree-bold text-sm text-white">Preview</Text>
              </TouchableOpacity>
            </View>

            {/* AI note */}
            <View className="flex-row items-start gap-2">
              <Sparkles size={14} color="#7F77DD" />
              <Text className="font-figtree text-xs text-surface-secondary flex-1 leading-relaxed">
                <Text className="font-figtree-bold text-white">AI re-reads your resume</Text> every time you update it and refreshes your skill matches automatically.
              </Text>
            </View>
          </>
        ) : (
          // Fallback — no resume
          <>
            <View className="items-center py-4">
              <View className="w-14 h-14 rounded-2xl bg-navy-800 items-center justify-center mb-3">
                <FileText size={24} color="#6B7BA0" />
              </View>
              <Text className="font-figtree-bold text-sm text-white mb-1">No resume uploaded yet</Text>
              <Text className="font-figtree text-xs text-surface-muted text-center mb-4">
                Upload your resume so AI can match you to the best jobs
              </Text>
              <TouchableOpacity
                onPress={onUpdate}
                className="bg-blue rounded-2xl px-6 py-3 flex-row items-center gap-2"
              >
                <Upload size={14} color="#FFFFFF" />
                <Text className="font-figtree-bold text-sm text-white">Upload resume</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      {/* Profile completion */}
      <View className="bg-white border border-surface-border rounded-2xl px-4 py-4">
        <View className="flex-row items-center justify-between mb-2">
          <Text className="font-figtree-bold text-sm text-navy-950">Profile completion</Text>
          <Text className="font-figtree-bold text-sm text-blue">{completionPercent}%</Text>
        </View>
        <View className="h-1.5 bg-surface-border rounded-full overflow-hidden mb-2">
          <View
            className="h-full bg-blue rounded-full"
            style={{ width: `${completionPercent}%` }}
          />
        </View>
        {completionHint && (
          <Text className="font-figtree text-xs text-surface-muted">{completionHint}</Text>
        )}
      </View>
    </View>
  )
}

export default ResumeCard