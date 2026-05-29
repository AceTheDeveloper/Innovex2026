// src/features/employer/components/ApplicantCard.tsx
import { View, Text, TouchableOpacity } from 'react-native'
import { Calendar1, MapPin, Globe, Cpu, MessageSquareText, BriefcaseBusiness } from 'lucide-react-native'

interface ApplicantCardProps {
  name: string,
  jobApplied: string
  location: string
  isOverseas: boolean
  experienceYears?: number | null
  matchScore?: number | null
  onMessage?: () => void
  onSchedule?: () => void
  onView?: () => void
}

const AVATAR_COLORS = [
  { bg: "bg-blue-pale",   text: "text-blue" },
  { bg: "bg-ai-light",    text: "text-ai" },
  { bg: "bg-success-bg",  text: "text-success" },
  { bg: "bg-warning-bg",  text: "text-warning" },
];

const ApplicantCard = ({
  name,
  jobApplied,
  location,
  isOverseas,
  experienceYears,
  matchScore,
  onMessage,
  onSchedule,
  onView,
}: ApplicantCardProps) => {

  const color = AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <View
      className="bg-white rounded-2xl px-4 py-4 mb-3 border border-surface-border"
    >
      {/* Top row */}
      <View className="flex-row items-start justify-between mb-2">
        <View className="flex-1 flex-row items-center gap-2">
          <View className={`w-9 h-9 ${color.bg} rounded-full items-center justify-center`}>
            <Text className={`${color.text} font-figtree-bold text-base`}>{initials}</Text>
          </View>
          <View>
            <Text className="font-figtree-bold text-base text-navy-950">{name}</Text>
            <Text className="font-figtree text-xs text-surface-muted mt-0.5">{jobApplied}</Text>
          </View>
        </View>

        <View className="flex-row items-center gap-1 bg-navy-950 rounded-full px-2.5 py-1">
          <Cpu size={10} color="#6FBFFF" />
          <Text className="font-figtree-bold text-xs text-sky">{matchScore}%</Text>
        </View>
      </View>

      <View className="h-px bg-surface-border mb-3" />

      {/* experience + location + open to overseas */}
      {(experienceYears != null) && (
        <View className="flex-row items-center gap-3 mb-2">
          {experienceYears != null && (
            <View className="flex-row items-center gap-1">
              <BriefcaseBusiness size={12} color="#9BA8C0" />
              <Text className="font-figtree text-xs text-surface-secondary ml-1">{experienceYears} yrs experience</Text>
            </View>
          )}
          <View className='flex-row items-center gap-1'>
            {isOverseas ? <Globe size={12} color="#9BA8C0" /> : <MapPin size={12} color="#9BA8C0" />}
            <Text className="font-figtree text-xs text-surface-secondary">{location}</Text>
          </View>

          {isOverseas && (
            <View className="bg-success-bg rounded-full px-2 py-0.5 ml-1">
              <Text className="font-figtree-bold text-2xs text-success-dark">Open to overseas</Text>
            </View>
          )}
        </View>
      )}

      <View className="flex-row gap-2 ">
        <TouchableOpacity
          onPress={onMessage}
          className="flex-1 border border-surface-border rounded-xl py-2.5 flex-row items-center justify-center gap-1.5"
          activeOpacity={0.7}
        >
          <MessageSquareText size={12} color="#9BA8C0" />
          <Text className="font-figtree-bold text-xs text-surface-secondary">Message</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onSchedule}
          className="flex-1 border border-surface-border rounded-xl py-2.5 flex-row items-center justify-center gap-1.5"
          activeOpacity={0.7}
        >
          <Calendar1 size={12} color="#9BA8C0" />
          <Text className="font-figtree-bold text-xs text-surface-secondary">Schedule</Text>
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

export default ApplicantCard