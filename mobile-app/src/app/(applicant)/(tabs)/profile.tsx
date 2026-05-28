// features/applicant/screens/Profile.tsx
// ─── Updated to use ProfileContext instead of local state ─────────────────────

import { useRouter } from "expo-router";
import { Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Wrench, Briefcase, GraduationCap, BadgeCheck, ChevronRight } from "lucide-react-native";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import AddItemModal from "@/components/modals/AddItemModal";
import ResumeCard from "@/features/applicant/components/cards/ResumeCard";
import PersonalInfoModal from "@/features/applicant/components/modals/PersonalInfoModal";
import SaveBar from "@/features/applicant/components/SaveBar";
import { useProfile } from "@/features/applicant/context/ProfileContext";
import { useState } from "react";

const CERT_COLORS = [
  { bg: "bg-blue-pale",   icon: "#4A7BE0" },
  { bg: "bg-ai-light",    icon: "#7F77DD" },
  { bg: "bg-success-bg",  icon: "#22C98A" },
  { bg: "bg-warning-bg",  icon: "#F5A623" },
];

const Profile = () => {
  const router = useRouter();
  const { profile, setProfile, isDirty, setIsDirty, saveStatus, isLoading, error, saveProfile } = useProfile();
  const [skillsModal, setSkillsModal] = useState(false);
  const [personalInfoModal, setPersonalInfoModal] = useState(false);

  // ── Helper — marks profile as dirty whenever a field changes ────────────────
  const updateProfile = (updater: (prev: typeof profile) => typeof profile) => {
    setProfile(updater);
    setIsDirty(true);
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-navy-900 items-center justify-center" edges={["top"]}>
        <ActivityIndicator size="large" color="#6FBFFF" />
        <Text className="font-figtree text-sky mt-3 text-sm">Loading profile…</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-navy-900 items-center justify-center px-6" edges={["top"]}>
        <Text className="font-figtree-bold text-white text-base text-center mb-2">Something went wrong</Text>
        <Text className="font-figtree text-surface-secondary text-sm text-center">{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <>
      <AddItemModal
        visible={skillsModal}
        title="Add a skill"
        subtitle="Add a skill you're proficient in."
        placeholder="e.g. React Native, Patient monitoring..."
        inputHint='Press "Add" to save'
        onClose={() => setSkillsModal(false)}
        onAdd={(value) =>
          updateProfile((prev) => ({
            ...prev,
            extracted: {
              ...prev.extracted,
              skills: [...prev.extracted.skills, value],
            },
          }))
        }
      />

      <PersonalInfoModal
        visible={personalInfoModal}
        initialData={profile}
        onClose={() => setPersonalInfoModal(false)}
        onSave={(data) => updateProfile((prev) => ({ ...prev, ...data }))}
      />

      <SafeAreaView className="flex-1 bg-navy-900" edges={["top"]}>
        <PageHeader
          mode="profile"
          heading={profile.name}
          subheading={`${profile.extracted.experienceYears ?? '0'} yrs experience`}
          onEdit={() => setPersonalInfoModal(true)}
        />

        <ScrollView
          className="flex-1 bg-surface-bg rounded-t-3xl"
          contentContainerClassName="px-4 pt-6 pb-32"
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
                  onPress={() =>
                    router.push({
                      pathname: "/(applicant)/update/experience",
                      params: { experiences: JSON.stringify(profile.extracted.previousRoles) },
                    })
                  }
                >
                  <Text className="font-figtree-bold text-sm text-blue">+ add</Text>
                </TouchableOpacity>
              </View>

              {profile.extracted.previousRoles.map((role, index) => {
                const isLast = index === profile.extracted.previousRoles.length - 1
                return (
                  <View key={index} className="flex-row gap-3">
                    {/* Timeline column */}
                    <View className="items-center" style={{ width: 12 }}>
                      <View className="w-3 h-3 rounded-full mt-1 bg-blue" />
                      {!isLast && <View className="w-px flex-1 bg-surface-border mt-1" />}
                    </View>

                    {/* Content */}
                    <View className={`flex-1 ${!isLast ? 'mb-4' : ''}`}>
                      <Text className="font-figtree-bold text-sm text-navy-950">{role}</Text>
                    </View>
                  </View>
                )
              })}
            </Card>

          {/* Education */}
          <Card className="mt-3">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-2">
                <GraduationCap size={16} color="#4A7BE0" />
                <Text className="font-figtree-bold text-sm text-navy-950">Education</Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/(applicant)/update/education",
                    params: { education: JSON.stringify(profile.extracted.education) },
                  })
                }
              >
                <Text className="font-figtree-bold text-sm text-blue">+ add</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row gap-3 items-center">
              <View className="w-10 h-10 rounded-xl bg-ai-light items-center justify-center flex-shrink-0">
                <GraduationCap size={18} color="#7F77DD" />
              </View>
              <View>
                <Text className="font-figtree-bold text-sm text-navy-950">{profile.extracted.education}</Text>
              </View>
            </View>
          </Card>

          {/* Certifications */}
          <Card className="mt-3">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-2">
                <BadgeCheck size={16} color="#4A7BE0" />
                <Text className="font-figtree-bold text-sm text-navy-950">Certifications</Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/(applicant)/update/certifications",
                    params: { certifications: JSON.stringify(profile.extracted.certifications) },
                  })
                }
              >
                <Text className="font-figtree-bold text-sm text-blue">+ add</Text>
              </TouchableOpacity>
            </View>
            {profile.extracted.certifications.map((cert, index) => {
              const color = CERT_COLORS[index % CERT_COLORS.length];
              return (
                <View
                  key={index}
                  className={`flex-row justify-between items-center ${
                    index < profile.extracted.certifications.length - 1 ? "border-b border-surface-border" : ""
                  } ${index === 0 ? "pb-2" : "py-2"}`}
                >
                  <View className="flex-row gap-3 items-center">
                    <View className={`${color.bg} w-10 h-10 rounded-xl items-center justify-center flex-shrink-0`}>
                      <BadgeCheck size={18} color={color.icon} />
                    </View>
                    <View>
                      <Text className="font-figtree-bold text-sm text-navy-950">{cert}</Text>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <ChevronRight size={17} color="#9BA8C0" />
                  </TouchableOpacity>
                </View>
              );
            })}
          </Card>
        </ScrollView>

        {/* Save bar — only shows when dirty */}
        <SaveBar
          isDirty={isDirty}
          saveStatus={saveStatus}
          onSave={saveProfile}
        />
      </SafeAreaView>
    </>
  );
};

export default Profile;