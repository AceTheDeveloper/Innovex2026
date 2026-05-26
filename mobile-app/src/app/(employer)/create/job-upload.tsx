import { useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageHeader from '@/components/PageHeader'
import * as DocumentPicker from 'expo-document-picker'
import { FileUp, Sparkles } from 'lucide-react-native'

const ACCEPTED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
]

const JobUpload = () => {
  const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null)

  const handlePickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ACCEPTED_TYPES,
      copyToCacheDirectory: true,
    })

    if (!result.canceled) {
      setFile(result.assets[0])
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-navy-900" edges={["top"]}>
      <PageHeader
        title='UPLOAD DOCUMENT'
        heading={<>Upload your{" "}<Text className="text-sky">job {"\n"} description</Text></>}
        subheading={"Drop your existing job description — AI handles the rest"}
      />

      <ScrollView
        className="flex-1 bg-surface-bg rounded-t-3xl"
        contentContainerClassName="px-4 pt-6 pb-10"
        showsVerticalScrollIndicator={false}
      >
        {/* Upload zone */}
        <TouchableOpacity
          onPress={handlePickFile}
          className="border-2 border-dashed border-blue-muted rounded-3xl items-center px-6 py-10"
          style={{ backgroundColor: '#F0F6FF' }}
        >
          {/* Icon */}
          <View className="w-16 h-16 rounded-2xl bg-blue-pale items-center justify-center mb-4">
            <FileUp size={28} color="#4A7BE0" />
          </View>

          <Text className="font-figtree-extrabold text-base text-navy-950 mb-2">
            {file ? file.name : 'Drag & drop your file here'}
          </Text>

          <Text className="font-figtree text-sm text-surface-muted text-center mb-5">
            Supports PDF, DOCX, and TXT{'\n'}up to 10MB
          </Text>

          {/* Browse button */}
          <View className="border border-surface-border rounded-2xl px-8 py-2.5 bg-white">
            <Text className="font-figtree-bold text-sm text-surface-secondary">Browse files</Text>
          </View>

          {/* Format pills */}
          <View className="flex-row gap-2 mt-5">
            {['PDF', 'DOCX', 'TXT'].map((fmt) => (
              <View key={fmt} className="border border-surface-border rounded-full px-4 py-1.5 bg-white">
                <Text className="font-figtree-bold text-xs text-navy-950">{fmt}</Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>

        {/* AI extraction info */}
        <View className="bg-white border border-surface-border rounded-2xl px-4 py-4 mt-4">
          <View className="flex-row items-center gap-2 mb-2">
            <Sparkles size={16} color="#7F77DD" />
            <Text className="font-figtree-bold text-sm text-navy-950">What AI extracts from your document</Text>
          </View>
          <Text className="font-figtree text-sm text-surface-muted leading-relaxed">
            Job title · Department · Employment type · Location · Job description · Responsibilities · Required skills · Experience level · Salary range · Perks & benefits
          </Text>
        </View>

        {/* Continue button */}
        {file && (
          <SafeAreaView edges={["bottom"]} className="pt-4">
            <TouchableOpacity className="bg-blue rounded-2xl py-4 items-center">
              <Text className="font-figtree-bold text-white text-sm">Extract with AI</Text>
            </TouchableOpacity>
          </SafeAreaView>
        )}

      </ScrollView>
    </SafeAreaView>
  )
}

export default JobUpload
