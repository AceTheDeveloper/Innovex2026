import { View, Text, TouchableOpacity } from 'react-native'
import Card from '@/components/Card'
import { GripVertical } from 'lucide-react-native'

interface ItemCardProps {
  title: string
  subtitle?: string
  meta?: string
  badge?: string
  onEdit: () => void
  onDelete: () => void
}

const ProfileItemCard = ({ title, subtitle, meta, badge, onEdit, onDelete }: ItemCardProps) => {
  return (
    <Card className="mb-3">
      {/* Top row */}
      <View className="flex-row items-start justify-between mb-1">
        <View className="flex-1 pr-3">
          <View className="flex-row items-center gap-2 flex-wrap">
            <Text className="font-figtree-bold text-sm text-navy-950" numberOfLines={2}>{title}</Text>
            {badge && (
              <View className="bg-success-bg rounded-full px-2 py-0.5">
                <Text className="font-figtree-bold text-2xs text-success-dark">{badge}</Text>
              </View>
            )}
          </View>
          {subtitle && (
            <Text className="font-figtree text-xs text-surface-muted mt-0.5">{subtitle}</Text>
          )}
          {meta && (
            <Text className="font-figtree text-xs text-surface-muted italic mt-0.5">{meta}</Text>
          )}
        </View>
        <GripVertical size={16} color="#9BA8C0" />
      </View>

      {/* Buttons */}
      <View className="flex-row gap-2 mt-3">
        <TouchableOpacity
          onPress={onEdit}
          className="flex-1 border border-surface-border rounded-2xl py-2.5 items-center"
        >
          <Text className="font-figtree-bold text-xs text-surface-secondary">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          className="flex-1 border border-surface-border rounded-2xl py-2.5 items-center"
        >
          <Text className="font-figtree-bold text-xs text-surface-secondary">Delete</Text>
        </TouchableOpacity>
      </View>
    </Card>
  )
}

export default ProfileItemCard