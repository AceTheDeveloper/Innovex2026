import { View, Text, TouchableOpacity } from 'react-native'
import { ArrowLeft, Bell, SquarePen } from 'lucide-react-native'
import { useRouter } from 'expo-router'

type PageHeaderMode = 'back' | 'dashboard' | 'profile'

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
  onEdit?: () => void
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
  onEdit,
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

      ) : mode === 'dashboard' ? (
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

      ) : (
        // profile mode
        <View className="w-full">
          {/* Avatar */}
          <View className='flex-row justify-between w-full'>
              <TouchableOpacity
                onPress={onAvatarPress}
                className="w-20 h-20 rounded-full bg-navy-700 border border-sky items-center justify-center mb-4"
              >
                <Text className="font-figtree-extrabold text-5xl text-white">
                  {avatarLabel}
                </Text>
              </TouchableOpacity>
            <View>
              <TouchableOpacity
                onPress={onEdit}
                className="items-center gap-1.5 bg-navy-800 border border-navy-700 rounded-full px-3 py-1.5"
              >
                <SquarePen size={12} color="#6FBFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Heading */}
          <Text className="font-figtree-extrabold text-4xl text-white leading-tight">
            {heading}
          </Text>

          {subheading && (
            <Text className="font-figtree text-sky text-sm mt-1">
              {subheading}
            </Text>
          )}
        </View>
      )}

      {children}
    </View>
  )
}

export default PageHeader