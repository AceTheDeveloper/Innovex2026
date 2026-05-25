import { View, Text, TouchableOpacity } from 'react-native'
import { ArrowLeft } from 'lucide-react-native'
import { useRouter } from 'expo-router'

type PageHeaderProps = {
  title: string
  heading: React.ReactNode
  subheading?: string
  children?: React.ReactNode
}

const PageHeader = ({ title, heading, subheading, children }: PageHeaderProps) => {
  const router = useRouter()

  return (
    <View className="px-5 pt-4 pb-7">
      <View className="flex-row items-center justify-between mb-5">
        <TouchableOpacity
          className="rounded-full h-8 w-8 items-center justify-center bg-navy-800"
          onPress={() => router.back()}
        >
          <ArrowLeft size={18} color="#6FBFFF" />
        </TouchableOpacity>

        <Text className="font-figtree text-blue-pale text-sm tracking-widest">
          {title}
        </Text>

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

      {children }
    </View>
  )
}

export default PageHeader