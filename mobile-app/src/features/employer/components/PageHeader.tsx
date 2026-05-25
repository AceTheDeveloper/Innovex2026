import { View, Text, TouchableOpacity } from 'react-native'
import { ArrowLeft, Bell } from 'lucide-react-native'
import { useRouter } from 'expo-router'

type PageHeaderMode = 'back' | 'dashboard'

type PageHeaderProps = {
  mode?: PageHeaderMode
  title?: string
  heading: React.ReactNode
  subheading?: string
  // dashboard mode
  avatarLabel?: string
  hasNotification?: boolean
  onNotificationPress?: () => void
  onAvatarPress?: () => void
  // back mode
  showBack?: boolean
  children?: React.ReactNode
}

const PageHeader = ({
  mode = 'back',
  title,
  heading,
  subheading,
  avatarLabel = 'M',
  hasNotification = false,
  onNotificationPress,
  onAvatarPress,
  children,
}: PageHeaderProps) => {
  const router = useRouter()

  return (
    <View className="px-5 pt-4 pb-7 bg-navy-900">

      {mode === 'back' ? (
        <>
          <View className="flex-row items-center justify-between mb-5">
            <TouchableOpacity
              className="rounded-full h-8 w-8 items-center justify-center bg-navy-800"
              onPress={() => router.back()}
            >
              <ArrowLeft size={18} color="#6FBFFF" />
            </TouchableOpacity>

            {title && (
              <Text className="font-figtree text-blue-pale text-sm tracking-widest">
                {title}
              </Text>
            )}

            <View className="h-8 w-8" />
          </View>

          <Text className="font-figtree-extrabold text-5xl text-white leading-tight">
            {heading}
          </Text>

          {subheading && (
            <Text className="font-figtree text-surface-secondary text-sm mt-2">
              {subheading}
            </Text>
          )}
        </>
      ) : (
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-4">
            {title && (
              <Text className="font-figtree text-blue-light text-xs mb-1">
                {title}
              </Text>
            )}
            <Text className="font-figtree-extrabold text-5xl text-white leading-tight">
              {heading}
            </Text>
            {subheading && (
              <Text className="font-figtree text-surface-secondary text-sm mt-2">
                {subheading}
              </Text>
            )}
          </View>

          <View className="flex-row items-center gap-3 mt-1">
            <TouchableOpacity
              onPress={onNotificationPress}
              className="rounded-full h-9 w-9 items-center justify-center bg-navy-800"
            >
              <Bell size={18} color="#6FBFFF" />
              {hasNotification && (
                <View className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-alert" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onAvatarPress}
              className="rounded-full h-9 w-9 items-center justify-center bg-navy-700"
            >
              <Text className="font-figtree-bold text-sm text-white">
                {avatarLabel}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {children}
    </View>
  )
}

export default PageHeader