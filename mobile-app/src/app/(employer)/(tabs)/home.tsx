import { useState } from 'react'
import { useRouter } from 'expo-router'
import { Text, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Search, X, Sparkles } from 'lucide-react-native'
import { useEmployerJobs } from '@/features/employer/hooks/useEmployerJobs'
import PageHeader from '@/components/PageHeader'
import JobPostingCard from '@/features/employer/components/cards/JobPostingCard'

const Home = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const { jobs, error, isLoading } = useEmployerJobs();

  return (
    <SafeAreaView className="flex-1 bg-navy-900" edges={["top"]}>
      <PageHeader
        mode="dashboard"
        title='good morning'
        heading={<>Makati Med<Text className="text-blue">.</Text></>}
        avatarLabel="M"
        hasNotification
      >
        <View className="flex-row items-center bg-navy-700 rounded-3xl px-4 py-1 gap-3 mt-2">
          <Search size={16} color="#6B7BA0" />
          <TextInput
            className="flex-1 font-figtree text-sm text-white"
            placeholder="Search your postings..."
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
        {/* Stats row */}
        <View className="flex-row gap-3 mb-6">
          {[
            { value: jobs.length,  label: 'Active posts', dot: 'bg-success' },
            { value: 38, label: 'Applicants',   dot: 'bg-ai'      },
            { value: 12, label: 'AI matched',   dot: 'bg-ai-dark' },
          ].map((stat) => (
            <View key={stat.label} className="flex-1 bg-white border border-surface-border rounded-2xl px-3 py-3">
              <View className={`w-2 h-2 rounded-full ${stat.dot} mb-2`} />
              <Text className="font-figtree-extrabold text-2xl text-navy-950">{stat.value}</Text>
              <Text className="font-figtree text-xs text-surface-muted">{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* AI Insights */}
        <Text className="font-figtree-bold text-base text-navy-950 mb-3">AI Insights</Text>
        <View className="bg-navy-950 rounded-2xl px-4 py-4 flex-row gap-3 items-start mb-6">
          <Sparkles size={18} color="#7F77DD" />
          <Text className="font-figtree text-sm text-white flex-1 leading-relaxed">
            <Text className="font-figtree-bold">ICU Nurse</Text> has 12 strong AI matches this week — 3 candidates are above 90% match score.
          </Text>
        </View>

        {/* Job posts */}
        <View className="flex-row items-center justify-between mb-3">
          <Text className="font-figtree-bold text-base text-navy-950">Your Job Posts</Text>
          <TouchableOpacity>
            <Text className="font-figtree-bold text-sm text-blue">see all →</Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <View className="items-center py-10 gap-3">
            <ActivityIndicator size="large" color="#0A1628" />
            <Text className="font-figtree text-sm text-surface-muted">Matching jobs to your profile...</Text>
          </View>
        ) : jobs.length === 0 ? (
          <View className="items-center py-10 gap-2">
            <Sparkles size={28} color="#9BA8C0" />
            <Text className="font-figtree-bold text-sm text-navy-950">No jobs yet</Text>
            <Text className="font-figtree text-xs text-surface-muted text-center px-6">
              Update and save your profile to see AI-matched roles here.
            </Text>
          </View>
        ) : (
          jobs.map((job, index) => (
            <JobPostingCard
              key={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              isOverseas={job.isOverseas}
              salaryRange={job.extracted.salaryRange}
              experienceYears={job.extracted.experienceYears}
              onEdit={() => router.push({
                pathname: "/(employer)/update/update-job",
                params: { job: JSON.stringify(job) }
              })}
              onView={() => {}}
            />
          ))
        )}

      </ScrollView>
    </SafeAreaView>
  )
}

export default Home