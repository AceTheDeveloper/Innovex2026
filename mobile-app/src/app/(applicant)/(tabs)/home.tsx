import { useState } from 'react'
import { Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Search, X } from 'lucide-react-native'
import PageHeader from '@/components/PageHeader'

const Home = () => {

  const [search, setSearch] = useState<string>('');

  return (
    <SafeAreaView className="flex-1 bg-navy-900" edges={["top"]}>
      <PageHeader
        mode="dashboard"
        title='good morning'
        heading={<>Find your{" "}<Text className="text-blue">role.</Text></>}
        avatarLabel="M"
        hasNotification
      >
        <View className="flex-row items-center bg-navy-700 rounded-3xl px-4 py-1 gap-3 mt-2">
          <Search size={16} color="#6B7BA0" />
          <TextInput
            className="flex-1 font-figtree text-sm text-white"
            placeholder="Job title, skills, company..."
            placeholderTextColor="#6B7BA0"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <X size={14} color="#6B7BA0" />
            </TouchableOpacity>
          )}
        </View>
      </PageHeader>

      <ScrollView
        className="flex-1 bg-surface-bg rounded-t-3xl"
        contentContainerClassName="px-4 pt-6 pb-10"
        showsVerticalScrollIndicator={false}
      >

          <Text>Suck me</Text>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Home