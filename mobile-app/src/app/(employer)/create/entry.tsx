import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeft, ArrowUpFromLine, NotebookPen } from "lucide-react-native";
import PageHeader from "@/components/PageHeader";
import ChoiceCard from "@/features/employer/components/ChoiceCard";

const CreateEntry = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-navy-900" edges={["top"]}>

      {/* ── Header ── */}
      <PageHeader
        mode='back'
        title="POST A JOB"
        heading={<>How do you want{"\n"}to{" "}<Text className="text-sky">get started?</Text></>}
        subheading="Choose your path — you can always edit later"
      />

      {/* ── Body ── */}
      <ScrollView
        className="flex-1 bg-surface-bg rounded-t-3xl py-5"
        contentContainerClassName="px-4 pt-6 pb-10"
        showsVerticalScrollIndicator={false}
      >

        <ChoiceCard
          recommended
          title="Fill in manually"
          description="Step-by-step form — we guide you through every detail of the role"
          icon={<NotebookPen size={22} color="#4A7BE0" />}
          pills={[
            { label: "4 steps",           variant: "blue" },
            { label: "AI writing assist",  variant: "green" },
            { label: "Full control",       variant: "purple" },
          ]}
          onPress={() => router.push("/(employer)/create/job-form")}
        />

        {/* Divider */}
        <View className="flex-row items-center gap-2 my-4">
          <View className="flex-1 h-px bg-surface-border" />
          <Text className="font-figtree text-sm text-surface-muted italic">or</Text>
          <View className="flex-1 h-px bg-surface-border" />
        </View>

        <ChoiceCard
          title="Upload a document"
          description="Drop your existing job description — our AI reads it and fills everything for you"
          icon={<ArrowUpFromLine size={22} color="#6FBFFF" />}
          pills={[
            { label: "PDF or DOCX",  variant: "amber" },
            { label: "AI auto-fill", variant: "green" },
            { label: "Fastest way",  variant: "blue" },
          ]}
          onPress={() => router.push("/(employer)/create/job-upload")}
        />

        {/* AI note */}
        <View className="bg-navy-950 rounded-xl p-3.5 flex-row items-start gap-3 mt-5">
          <View className="w-8 h-8 rounded-lg bg-navy-900 items-center justify-center flex-shrink-0 mt-0.5">
            <Text className="text-sky text-base">✦</Text>
          </View>
          <Text className="font-figtree text-sm text-surface-secondary leading-relaxed flex-1">
            <Text className="text-white font-figtree-bold">AI is with you either way. </Text>
            Whether you type or upload, JobBridge AI will suggest improvements,
            flag missing details, and match your posting to the right candidates.
          </Text>
        </View>

      </ScrollView>

    </SafeAreaView>
  );
};

export default CreateEntry;