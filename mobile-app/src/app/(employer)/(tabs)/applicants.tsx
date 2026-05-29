import { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Search, X, Sparkles, SlidersHorizontal } from 'lucide-react-native'
import PageHeader from '@/components/PageHeader'
import ApplicantCard from '@/features/employer/components/cards/ApplicantCard'
import { useMatchContext } from '@/features/employer/context/MatchContext'
import { useJobContext } from '@/features/employer/context/JobContext'
import { Job } from '@/features/employer/types/employment'

const Applicants = () => {
  const [search, setSearch] = useState<string>('');
  const { topMatches, isMatching, matchError } = useMatchContext()
  const { jobs, selectedJob, handleSelectJob } = useJobContext()

  const filtered = topMatches
    .filter(a => a.jobId === selectedJob?.id)

  console.log('topMatches', topMatches)
  console.log('selectedJob', selectedJob?.id)
  console.log('filtered', filtered)

  return (
    <SafeAreaView className="flex-1 bg-navy-900" edges={["top"]}>
      <PageHeader
        mode="dashboard"
        title='applicants'
        heading={<>All <Text className="text-blue">candidates</Text></>}
        avatarLabel="M"
        hasNotification
      >
        <View className="flex-row items-center bg-navy-700 rounded-3xl px-4 py-1 gap-3 mt-2">
          <Search size={16} color="#6B7BA0" />
          <TextInput
            className="flex-1 font-figtree text-sm text-white"
            placeholder="Search applicants..."
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

        {/* AI Insights */}
        <Text className="font-figtree-bold text-base text-navy-950 mb-3">AI Insights</Text>
        <View className="bg-navy-950 rounded-2xl px-4 py-4 flex-row gap-3 items-start mb-6">
          <Sparkles size={18} color="#7F77DD" />
          {topMatches.length > 0 ? (
            <Text className="font-figtree text-sm text-white flex-1 leading-relaxed">
              <Text className="font-figtree-bold">{selectedJob?.title}</Text> has{' '}
              <Text className="font-figtree-bold">{topMatches?.length}</Text> AI matched candidates —{' '}
              <Text className="font-figtree-bold">
                {topMatches.filter(a => a.matchScore >= 90).length}
              </Text> are above 90% match score.
            </Text>
          ) : (
            <Text className="font-figtree text-sm text-white flex-1 leading-relaxed">
              Save your job posting to see AI-matched candidates here.
            </Text>
          )}
        </View>

        {/* Applicants list */}
        <View className="flex-row items-center justify-between mb-3">
          <Text className="font-figtree-bold text-base text-navy-950">
            Top matches · <Text className="text-surface-muted">{selectedJob?.title}</Text>
          </Text>
          <TouchableOpacity className='flex-row items-center gap-2'>
            <Text className="font-figtree-bold text-sm text-blue">filter</Text>
            <SlidersHorizontal size={10} strokeWidth={2} color={"#4A7BE0"} />
          </TouchableOpacity>
        </View>

        {/* Job selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="my-2">
          <View className="flex-row gap-2">
            {jobs.map((job, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelectJob(job)}
                className={`px-4 py-1.5 rounded-full border ${selectedJob?.id === job.id ? 'bg-navy-950' : 'border-navy-950'}`}
              >
                <Text className={`font-figtree-bold text-xs ${selectedJob?.id === job.id ? 'text-white' : 'text-navy-950'}`}>
                  {job.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {isMatching ? (
          <View className="items-center py-10 gap-3">
            <ActivityIndicator size="large" color="#0A1628" />
            <Text className="font-figtree text-sm text-surface-muted">Finding top matches...</Text>
          </View>
        ) : matchError ? (
          <View className="items-center py-10 gap-2">
            <Text className="font-figtree-bold text-sm text-alert">Failed to load applicants</Text>
            <Text className="font-figtree text-xs text-surface-muted">{matchError}</Text>
          </View>
        ) : filtered.length === 0 ? (
          <View className="items-center py-10 gap-2">
            <Sparkles size={28} color="#9BA8C0" />
            <Text className="font-figtree-bold text-sm text-navy-950">No matches yet</Text>
            <Text className="font-figtree text-xs text-surface-muted text-center px-6">
              Save your job posting to trigger AI matching.
            </Text>
          </View>
        ) : (
          filtered.map((applicant) => (
            <ApplicantCard
              key={applicant.applicantId}
              name={applicant.name}
              jobApplied={'titl'}
              location={applicant.country}
              isOverseas={applicant.isOpenToOverseas}
              experienceYears={applicant.experienceYears}
              matchScore={applicant.matchScore}
              onMessage={() => {}}
              onSchedule={() => {}}
              onView={() => {}}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Applicants