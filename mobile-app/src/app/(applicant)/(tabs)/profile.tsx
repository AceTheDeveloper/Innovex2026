import { useState } from 'react'
import { useRouter } from 'expo-router'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Wrench, Briefcase, GraduationCap, BadgeCheck, ChevronRight, SlidersVertical } from 'lucide-react-native'
import PageHeader from '@/components/PageHeader'
import Card from '@/components/Card'
import AddItemModal from '@/components/modals/AddItemModal'
import ResumeCard from '@/features/applicant/components/cards/ResumeCard'
import PersonalInfoModal from '@/features/applicant/components/modals/PersonalInfoModal'
import { ApplicantProfileForm, APPLICANT_PROFILE_INITIAL_STATE } from '@/features/applicant/types/applicant'

const CERT_COLORS = [
  { bg: 'bg-blue-pale', icon: '#4A7BE0' },
  { bg: 'bg-ai-light',  icon: '#7F77DD' },
  { bg: 'bg-success-bg', icon: '#22C98A' },
  { bg: 'bg-warning-bg', icon: '#F5A623' },
];

const Profile = () => {

  const router = useRouter();
  const [profile, setProfile] = useState<ApplicantProfileForm>(APPLICANT_PROFILE_INITIAL_STATE);
  const [skillsModal, setSkillsModal] = useState<boolean>(false);
  const [personalInfoModal, setPersonalInfoModal] = useState<boolean>(false);

  return (
    <>
      <AddItemModal
        visible={skillsModal}
        title="Add a skill"
        subtitle="Add a skill you're proficient in. Be specific — it helps match you to the right jobs."
        placeholder="e.g. React Native, Patient monitoring, Excel..."
        inputHint='Press "Add" to save, or keep typing to add more'
        onClose={() => setSkillsModal(false)}
        onAdd={(value) => setProfile(prev => ({
          ...prev,
          skills: [...prev.extracted.skills, value]
        }))}
      />

      <PersonalInfoModal
        visible={personalInfoModal}
        initialData={profile}
        onClose={() => setPersonalInfoModal(false)}
        onSave={(data) => setProfile(prev => ({ ...prev, ...data }))}
      />

      <SafeAreaView className="flex-1 bg-navy-900" edges={["top"]}>
        <PageHeader
          mode="profile"
          heading={profile.name}
          subheading={`${profile.experience[0]?.title} · ${profile.extracted.experienceYears} yrs experience`}
          onEdit={() => setPersonalInfoModal(true)}
        />

        <ScrollView
          className="flex-1 bg-surface-bg rounded-t-3xl"
          contentContainerClassName="px-4 pt-6 pb-10"
          showsVerticalScrollIndicator={false}
        >
          <ResumeCard
            fileName="Maverick_Barrientos_Resume.pdf"
            uploadedAt="January 1, 2026"
            fileSizeKb={284}
            completionPercent={85}
            completionHint="Add your phone number to reach 100%"
            onUpdate={() => {}}
            onDownload={() => {}}
            onPreview={() => {}}
          />

          {/* Skills */}
          <Card className="mt-3">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-2">
                <Wrench size={16} color="#4A7BE0" />
                <Text className="font-figtree-bold text-sm text-navy-950">Skills</Text>
              </View>
              <TouchableOpacity onPress={() => setSkillsModal(true)}>
                <Text className="font-figtree-bold text-sm text-blue">edit</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row flex-wrap gap-2">
              {profile.extracted.skills.map((skill) => (
                <View key={skill} className="border border-success bg-success-bg rounded-full px-3 py-1.5">
                  <Text className="font-figtree-bold text-xs text-success-dark">{skill}</Text>
                </View>
              ))}
            </View>
          </Card>

          {/* Experience */}
          <Card className="mt-3">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-2">
                <Briefcase size={16} color="#4A7BE0" />
                <Text className="font-figtree-bold text-sm text-navy-950">Experience</Text>
              </View>
              <TouchableOpacity 
                onPress={() => router.push({
                  pathname: "/(applicant)/update/experience",
                  params: { experiences: JSON.stringify(profile.experience) }}
              )}>
                <Text className="font-figtree-bold text-sm text-blue">+ add</Text>
              </TouchableOpacity>
            </View>

            {profile.experience.map((exp, index) => (
              <View key={index} className={`flex-row gap-3 ${index < profile.experience.length - 1 ? 'mb-4' : ''}`}>
                {/* Timeline dot + line */}
                <View className="items-center">
                  <View className={`w-3 h-3 rounded-full mt-1 ${exp.current ? 'bg-success' : 'bg-blue'}`} />
                  {index < profile.experience.length - 1 && (
                    <View className="w-px flex-1 bg-surface-border mt-1" />
                  )}
                </View>

                <View className="flex-1 pb-2">
                  <View className="flex-row items-center gap-2 flex-wrap">
                    <Text className="font-figtree-bold text-sm text-navy-950">{exp.title}</Text>
                    {exp.current && (
                      <View className="bg-success-bg rounded-full px-2 py-0.5">
                        <Text className="font-figtree-bold text-2xs text-success-dark">Current</Text>
                      </View>
                    )}
                  </View>
                  <Text className="font-figtree text-xs text-surface-muted mt-0.5">
                    {exp.company} · {exp.location}
                  </Text>
                  <Text className="font-figtree text-xs text-surface-muted italic mt-0.5">
                    {exp.from} – {exp.to} · {exp.duration}
                  </Text>
                </View>
              </View>
            ))}
          </Card>

          {/* Education */}
          <Card className="mt-3">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-2">
                <GraduationCap size={16} color="#4A7BE0" />
                <Text className="font-figtree-bold text-sm text-navy-950">Education</Text>
              </View>
              <TouchableOpacity onPress={() => router.push({
                  pathname: "/(applicant)/update/education",
                  params: { education: JSON.stringify(profile.education) }}
              )}>
                <Text className="font-figtree-bold text-sm text-blue">+ add</Text>
              </TouchableOpacity>
            </View>

            {profile.education.map((edu, index) => (
              <View key={index} className="flex-row gap-3">
                <View className="w-10 h-10 rounded-xl bg-ai-light items-center justify-center flex-shrink-0">
                  <GraduationCap size={18} color="#7F77DD" />
                </View>
                <View>
                  <Text className="font-figtree-bold text-sm text-navy-950">{edu.degree}</Text>
                  <Text className="font-figtree text-xs text-surface-muted mt-0.5">{edu.school}</Text>
                  <Text className="font-figtree text-xs text-surface-muted italic mt-0.5">{edu.year}</Text>
                </View>
              </View>
            ))}
          </Card>

          
          <Card className="mt-3">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-2">
                <BadgeCheck size={16} color="#4A7BE0" />
                <Text className="font-figtree-bold text-sm text-navy-950">Certifications</Text>
              </View>
              <TouchableOpacity onPress={() => router.push({
                  pathname: "/(applicant)/update/certifications",
                  params: { certifications: JSON.stringify(profile.extracted.certifications) }}
              )}>
                <Text className="font-figtree-bold text-sm text-blue">+ add</Text>
              </TouchableOpacity>
            </View>

            {profile.extracted.certifications.map((cert, index) => {
              const color = CERT_COLORS[index % CERT_COLORS.length]
              return (
                <View
                  key={index}
                  className={`flex-row justify-between items-center ${
                    index < profile.extracted.certifications.length - 1 ? 'border-b border-surface-border' : ''
                  } ${index === 0 ? 'pb-2' : 'py-2'}`}
                >
                    <View className='flex-row gap-3 items-center'>
                      <View className={`${color.bg} w-10 h-10 rounded-xl items-center justify-center flex-shrink-0`}>
                        <BadgeCheck size={18} color={`${color.icon}`} />
                      </View>
                      <View>
                        <Text className="font-figtree-bold text-sm text-navy-950">{cert.name}</Text>
                        <Text className="font-figtree text-xs text-surface-muted mt-0.5">{cert.issuer}</Text>
                        <Text className="font-figtree text-xs text-surface-muted italic mt-0.5">{cert.year}</Text>
                      </View>
                    </View>
                    <TouchableOpacity>
                      <ChevronRight size={17} color={"#9BA8C0"} />
                    </TouchableOpacity>
                </View>
              ) 
            })}
          </Card>

        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default Profile