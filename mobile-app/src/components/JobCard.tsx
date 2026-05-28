import { View, Text, TouchableOpacity } from 'react-native'
import { Bookmark, Cpu, Sparkles, Send } from 'lucide-react-native'

interface JobCardProps {
  title: string
  company: string
  location: string
  isOverseas: boolean
  salaryRange?: string | null
  experienceYears?: number | null
  matchScore?: number | null
  isTopMatch?: boolean
  onPress?: () => void
  onBookmark?: () => void
  onApply?: () => void
}

const JobCard = ({
  title,
  company,
  location,
  isOverseas,
  salaryRange,
  experienceYears,
  matchScore,
  isTopMatch = false,
  onPress,
  onBookmark,
  onApply,
}: JobCardProps) => {

  const initial = company.charAt(0).toUpperCase()

  return (
    <View className={`bg-white rounded-2xl overflow-hidden ${isTopMatch ? 'border-2 border-blue' : 'border border-surface-border'}`}>

      {/* TOP MATCH badge */}
      {isTopMatch && (
        <View className="absolute top-0 right-4 z-10 bg-navy-950 px-3 py-1 rounded-b-lg flex-row items-center gap-1">
          <Sparkles size={10} color="#6FBFFF" />
          <Text className="font-figtree-bold text-2xs text-sky tracking-wider">TOP MATCH</Text>
        </View>
      )}

      <TouchableOpacity
        onPress={onPress}
        activeOpacity={onPress ? 0.7 : 1}
        className="p-4"
      >
        {/* Top row */}
        <View className="flex-row items-start gap-3">
          <View className="w-10 h-10 rounded-xl bg-blue-pale items-center justify-center flex-shrink-0">
            <Text className="font-figtree-bold text-sm text-blue">{initial}</Text>
          </View>

          <View className="flex-1">
            <Text className="font-figtree-bold text-sm text-navy-950">{title}</Text>
            <Text className="font-figtree text-xs text-surface-muted mt-0.5">
              {company} · {location}
            </Text>
          </View>

          <TouchableOpacity onPress={onBookmark} hitSlop={8}>
            <Bookmark size={16} color="#9BA8C0" />
          </TouchableOpacity>
        </View>

        {/* Tags */}
        <View className="flex-row flex-wrap gap-1.5 mt-3">
          <View className="bg-success-bg rounded-full px-2.5 py-1">
            <Text className="font-figtree-bold text-xs text-success-dark">
              {isOverseas ? 'Overseas' : 'Local'}
            </Text>
          </View>
          {experienceYears != null && (
            <View className="bg-warning-bg rounded-full px-2.5 py-1">
              <Text className="font-figtree-bold text-xs text-warning-dark">
                {experienceYears} yrs exp
              </Text>
            </View>
          )}
        </View>

        {/* Bottom row — salary + match score */}
        {(salaryRange || matchScore != null) && (
          <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-surface-border">
            <View className="flex-1 mr-2">
              {salaryRange ? (
                <Text className="font-figtree-bold text-sm text-navy-950">{salaryRange}</Text>
              ) : (
                <Text className="font-figtree text-xs text-surface-muted">Salary not specified</Text>
              )}
            </View>

            {matchScore != null && (
              <View className="flex-row items-center gap-1 bg-navy-950 rounded-full px-2.5 py-1">
                <Cpu size={10} color="#6FBFFF" />
                <Text className="font-figtree-bold text-xs text-sky">{matchScore}%</Text>
              </View>
            )}
          </View>
        )}
      </TouchableOpacity>

      {/* Apply + View row */}
      {(onApply || onPress) && (
        <View className="flex-row gap-2 px-4 pb-4">
          {onPress && (
            <TouchableOpacity
              onPress={onPress}
              className="flex-1 border border-surface-border rounded-xl py-2.5 items-center justify-center"
              activeOpacity={0.7}
            >
              <Text className="font-figtree-bold text-xs text-surface-secondary">View role</Text>
            </TouchableOpacity>
          )}
          {onApply && (
            <TouchableOpacity
              onPress={onApply}
              className="flex-1 bg-navy-950 rounded-xl py-2.5 flex-row items-center justify-center gap-1.5"
              activeOpacity={0.8}
            >
              <Send size={12} color="#fff" strokeWidth={2.5} />
              <Text className="font-figtree-bold text-xs text-white">Apply now</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

    </View>
  )
}

export default JobCard