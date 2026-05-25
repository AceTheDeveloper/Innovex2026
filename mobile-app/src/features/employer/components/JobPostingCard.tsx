// src/features/employer/components/JobPostingCard.tsx
import { View, Text, TouchableOpacity } from 'react-native'
import { Users, Sparkle, Clock, PenLine } from 'lucide-react-native'

type PostingStatus = 'active' | 'draft' | 'closed'

interface JobPostingCardProps {
  title: string
  department: string
  employmentType: string
  status: PostingStatus
  applicants?: number
  aiMatched?: number
  daysLeft?: number
  onPress?: () => void
}

const STATUS_STYLES: Record<PostingStatus, { bg: string; text: string; label: string; dot: string }> = {
  active: { bg: 'bg-success-bg', text: 'text-success-dark', label: 'ACTIVE', dot: 'bg-success' },
  draft:  { bg: 'bg-warning-bg', text: 'text-warning-dark', label: 'DRAFT',  dot: 'bg-warning' },
  closed: { bg: 'bg-alert-bg',   text: 'text-alert',        label: 'CLOSED', dot: 'bg-alert'   },
}

const JobPostingCard = ({
  title,
  department,
  employmentType,
  status,
  applicants,
  aiMatched,
  daysLeft,
  onPress,
}: JobPostingCardProps) => {
  const s = STATUS_STYLES[status]

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="bg-white rounded-2xl px-4 py-4 mb-3 border border-surface-border"
      style={{ borderLeftWidth: 4, borderLeftColor: status === 'active' ? '#22C98A' : status === 'draft' ? '#F5A623' : '#E8526A' }}
    >
      {/* Top row */}
      <View className="flex-row items-start justify-between mb-2">
        <View className="flex-1 pr-3">
          <Text className="font-figtree-bold text-base text-navy-950">{title}</Text>
          <Text className="font-figtree text-xs text-surface-muted mt-0.5">
            {department} · {employmentType}
          </Text>
        </View>
        <View className={`${s.bg} rounded-full px-2.5 py-1`}>
          <Text className={`${s.text} font-figtree-bold text-2xs tracking-wider`}>{s.label}</Text>
        </View>
      </View>

      {/* Stats row */}
      {status === 'draft' ? (
        <View className="flex-row items-center gap-1.5 mt-1">
          <PenLine size={12} color="#9BA8C0" />
          <Text className="font-figtree text-xs text-surface-muted">Continue editing</Text>
        </View>
      ) : (
        <View className="flex-row items-center gap-4 mt-1">
          {applicants !== undefined && (
            <View className="flex-row items-center gap-1">
              <Users size={12} color="#9BA8C0" />
              <Text className="font-figtree text-xs text-surface-muted">
                <Text className="font-figtree-bold text-navy-950">{applicants}</Text> applicants
              </Text>
            </View>
          )}
          {aiMatched !== undefined && (
            <View className="flex-row items-center gap-1">
              <Sparkle size={12} color="#7F77DD" />
              <Text className="font-figtree text-xs text-surface-muted">
                <Text className="font-figtree-bold text-navy-950">{aiMatched}</Text> AI matched
              </Text>
            </View>
          )}
          {daysLeft !== undefined && (
            <View className="flex-row items-center gap-1">
              <Clock size={12} color="#9BA8C0" />
              <Text className="font-figtree text-xs text-surface-muted">{daysLeft}d left</Text>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  )
}

export default JobPostingCard