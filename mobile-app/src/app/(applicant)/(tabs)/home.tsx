import { useState } from 'react'
import { useRouter } from 'expo-router'
import { Text, View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Search, X, Sparkles } from 'lucide-react-native'
import { useProfile } from '@/features/applicant/context/ProfileContext'
import PageHeader from '@/components/PageHeader'
import JobCard from '@/components/JobCard'

const Home = () => {
  const { matchedJobs, isMatching } = useProfile()
  const router = useRouter()
  const [search, setSearch] = useState<string>('')

  const avgScore = matchedJobs.length
    ? Math.round(matchedJobs.reduce((sum, j) => sum + (j.matchScore ?? 0), 0) / matchedJobs.length)
    : null

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
        <View>

          {/* AI Match banner */}
          <View className="bg-navy-950 rounded-xl p-3.5 items-start gap-3 my-5">
            <View className='flex-row gap-3 items-center'>
              <Sparkles size={16} color={"#6FBFFF"} />
              <View className="flex-row items-center gap-2">
                <View className="bg-navy-600 border border-sky rounded-xl px-2">
                  <Text className='text-sky text-sm font-figtree-bold not-italic'>AI Match</Text>
                </View>
                <Text className='font-figtree text-sm text-surface-secondary leading-relaxed italic'>
                  based on your resume.
                </Text>
              </View>
            </View>
            <View>
              {isMatching ? (
                <Text className='font-figtree text-white text-sm'>Finding your best matches...</Text>
              ) : avgScore != null ? (
                <Text className='font-figtree-bold text-white text-sm'>
                  {matchedJobs.length} strong matches{' '}
                  <Text className='font-figtree text-blue-300'>found — </Text>
                  {avgScore}% avg skill{' '}
                  <Text className='font-figtree text-blue-300'>overlap with open roles this week.</Text>
                </Text>
              ) : (
                <Text className='font-figtree text-surface-secondary text-sm'>
                  Save your profile to get AI-matched jobs.
                </Text>
              )}
            </View>
          </View>

          {/* Section header */}
          <View className="flex-row items-center justify-between mb-3">
            <Text className="font-figtree-bold text-base text-navy-950">AI Picks for you</Text>
            <TouchableOpacity onPress={() => router.push("/(applicant)/(tabs)/applied")}>
              <Text className="font-figtree-bold text-sm text-blue">see all →</Text>
            </TouchableOpacity>
          </View>

          {/* Jobs */}
          {isMatching ? (
            <View className="items-center py-10 gap-3">
              <ActivityIndicator size="large" color="#0A1628" />
              <Text className="font-figtree text-sm text-surface-muted">Matching jobs to your profile...</Text>
            </View>
          ) : matchedJobs.length === 0 ? (
            <View className="items-center py-10 gap-2">
              <Sparkles size={28} color="#9BA8C0" />
              <Text className="font-figtree-bold text-sm text-navy-950">No matches yet</Text>
              <Text className="font-figtree text-xs text-surface-muted text-center px-6">
                Update and save your profile to see AI-matched roles here.
              </Text>
            </View>
          ) : (
            <View className="gap-3">

              {matchedJobs.length > 0 && (
                <JobCard
                  title={matchedJobs[0].title}
                  company={matchedJobs[0].company}
                  location={matchedJobs[0].location}
                  isOverseas={matchedJobs[0].isOverseas}
                  salaryRange={matchedJobs[0].extracted?.salaryRange ?? null}
                  experienceYears={matchedJobs[0].extracted?.experienceYears ?? null}
                  matchScore={matchedJobs[0].matchScore}
                  isTopMatch={true}
                  onPress={() => {}}
                  onApply={() => {}}
                />
              )}

              {matchedJobs.map((job, index) => (
                index === 0 ? null : (  // ← skip first, it's the TOP MATCH card
                  <View key={index}>
                    {job.reason && (
                      <View className="bg-blue-pale rounded-xl px-3 py-2 mb-1.5 mx-0.5">
                        <Text className="font-figtree text-xs text-blue leading-relaxed">
                          {job.reason}
                        </Text>
                      </View>
                    )}
                    <JobCard
                      title={job.title}
                      company={job.company}
                      location={job.location}
                      isOverseas={job.isOverseas}
                      salaryRange={job.extracted?.salaryRange ?? null}
                      experienceYears={job.extracted?.experienceYears ?? null}
                      matchScore={job.matchScore}
                      isTopMatch={false}
                      onPress={() => {}}
                      onApply={() => {}}
                    />
                  </View>
                )
              ))}
            </View>
          )}

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home