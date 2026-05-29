// src/features/employer/components/JobPostingCard.tsx
import { View, Text, TouchableOpacity } from 'react-native'
import { Users, PenLine, MapPin, Globe } from 'lucide-react-native'

interface JobPostingCardProps {
  title: string
  company: string
  location: string
  isOverseas: boolean
  salaryRange?: string | null
  experienceYears?: number | null
  applicants?: number
  onEdit?: () => void
  onView?: () => void
}

const JobPostingCard = ({
  title,
  company,
  location,
  isOverseas,
  salaryRange,
  experienceYears,
  applicants,
  onEdit,
  onView,
}: JobPostingCardProps) => {
  return (
    <View
      className="bg-white rounded-2xl px-4 py-4 mb-3 border border-surface-border"
    >
      {/* Top row */}
      <View className="flex-row items-start justify-between mb-2">
        <View className="flex-1">
          <Text className="font-figtree-bold text-base text-navy-950">{title}</Text>
          <Text className="font-figtree text-xs text-surface-muted mt-0.5">{company}</Text>
        </View>
      </View>

      {/* Location */}
      <View className="flex-row items-center gap-1.5 mb-2">
        {isOverseas ? <Globe size={12} color="#9BA8C0" /> : <MapPin size={12} color="#9BA8C0" />}
        <Text className="font-figtree text-xs text-surface-muted">{location}</Text>
        {isOverseas && (
          <View className="bg-success-bg rounded-full px-2 py-0.5 ml-1">
            <Text className="font-figtree-bold text-2xs text-success-dark">Overseas</Text>
          </View>
        )}
      </View>

      {/* Salary + experience */}
      {(salaryRange || experienceYears != null) && (
        <View className="flex-row items-center gap-3 mb-2">
          {salaryRange && (
            <Text className="font-figtree-bold text-xs text-navy-950">{salaryRange}</Text>
          )}
          {experienceYears != null && (
            <View className="bg-warning-bg rounded-full px-2 py-0.5">
              <Text className="font-figtree-bold text-2xs text-warning-dark">{experienceYears} yrs exp</Text>
            </View>
          )}
        </View>
      )}

      {/* Stats row */}
      <View className="flex-row items-center gap-4 pt-2 border-t border-surface-border">
        {applicants !== undefined && (
          <View className="flex-row items-center gap-1">
            <Users size={12} color="#9BA8C0" />
            <Text className="font-figtree text-xs text-surface-muted">
              <Text className="font-figtree-bold text-navy-950">{applicants}</Text> applicants
            </Text>
          </View>
        )}
      </View>

      <View className="flex-row gap-2 ">
        <TouchableOpacity
          onPress={onEdit}
          className="flex-1 border border-surface-border rounded-xl py-2.5 flex-row items-center justify-center gap-1.5"
          activeOpacity={0.7}
        >
          <PenLine size={12} color="#9BA8C0" />
          <Text className="font-figtree-bold text-xs text-surface-secondary">Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onView}
          className="flex-1 bg-navy-950 rounded-xl py-2.5 items-center justify-center"
          activeOpacity={0.8}
        >
          <Text className="font-figtree-bold text-xs text-white">View</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default JobPostingCard