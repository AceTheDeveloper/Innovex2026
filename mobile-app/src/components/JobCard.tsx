import { View, Text, TouchableOpacity } from 'react-native'
import { Bookmark, Cpu } from 'lucide-react-native'

interface JobCardProps {
  title: string
  company: string
  location: string
  employmentType: string
  isRemote: boolean
  experienceLevel?: string | null
  salaryMin?: number | null
  salaryMax?: number | null
  currency?: string
  payPeriod?: string | null
  aiMatched?: boolean
  onPress?: () => void
  onBookmark?: () => void
}

const JobCard = ({
  title,
  company,
  location,
  employmentType,
  isRemote,
  experienceLevel,
  salaryMin,
  salaryMax,
  currency = 'USD',
  payPeriod,
  aiMatched = false,
  onPress,
  onBookmark,
}: JobCardProps) => {

  const initial = company.charAt(0).toUpperCase()

  const Wrapper = onPress ? TouchableOpacity : View

  const salaryText = salaryMin
    ? salaryMax
      ? `${currency} ${salaryMin.toLocaleString()} – ${salaryMax.toLocaleString()}`
      : `${currency} ${salaryMin.toLocaleString()}`
    : null

  return (
    <Wrapper
      onPress={onPress}
      className="bg-white border border-surface-border rounded-2xl p-4"
    >
      {/* Top row */}
      <View className="flex-row items-start gap-3">
        {/* Company initial */}
        <View className="w-10 h-10 rounded-xl bg-blue-pale items-center justify-center flex-shrink-0">
          <Text className="font-figtree-bold text-sm text-blue">{initial}</Text>
        </View>

        {/* Title + company + location */}
        <View className="flex-1">
          <Text className="font-figtree-bold text-sm text-navy-950">{title}</Text>
          <Text className="font-figtree text-xs text-surface-muted mt-0.5">
            {company} · {location}
          </Text>
        </View>

        {/* Bookmark */}
        <TouchableOpacity onPress={onBookmark} hitSlop={8}>
          <Bookmark size={16} color="#9BA8C0" />
        </TouchableOpacity>
      </View>

      {/* Tags */}
      <View className="flex-row flex-wrap gap-1.5 mt-3">
        {employmentType && (
          <View className="bg-blue-pale rounded-full px-2.5 py-1">
            <Text className="font-figtree-bold text-xs text-blue capitalize">{employmentType.replace('-', ' ')}</Text>
          </View>
        )}
        <View className="bg-success-bg rounded-full px-2.5 py-1">
          <Text className="font-figtree-bold text-xs text-success-dark">{isRemote ? 'Remote' : 'On-site'}</Text>
        </View>
        {experienceLevel && (
          <View className="bg-warning-bg rounded-full px-2.5 py-1">
            <Text className="font-figtree-bold text-xs text-warning-dark">{experienceLevel} yrs exp</Text>
          </View>
        )}
      </View>

      {/* Bottom row — salary + AI matched */}
      {salaryText && (
        <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-surface-border">
          <View>
            <Text className="font-figtree-bold text-sm text-navy-950">{salaryText}</Text>
            {payPeriod && (
              <Text className="font-figtree text-xs text-surface-muted">per {payPeriod}</Text>
            )}
          </View>

          {aiMatched && (
            <View className="flex-row items-center gap-1.5 bg-ai-light rounded-full px-3 py-1.5">
              <Cpu size={12} color="#7F77DD" />
              <Text className="font-figtree-bold text-xs text-ai-dark">AI matched</Text>
            </View>
          )}
        </View>
      )}
    </Wrapper>
  )
}

export default JobCard