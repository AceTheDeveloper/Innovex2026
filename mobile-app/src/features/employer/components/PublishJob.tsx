import { useState } from 'react'
import { Text, View, ScrollView, Switch, TouchableOpacity, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FileText, Mail, Award, LayoutGrid, Infinity, CalendarDays } from 'lucide-react-native'
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker'
import dayjs from 'dayjs'
import JobCard from '@/components/JobCard'
import { JobPostingForm, RequiredDocument, REQUIRED_DOCUMENT_OPTIONS } from '@/features/employer/types/employment'

interface PublishJobProps {
  form: JobPostingForm
  setForm: React.Dispatch<React.SetStateAction<JobPostingForm>>
  onNext: () => void
  onBack: () => void
  onGoToStep: (step: number) => void
}

const DOCUMENT_ICONS: Record<string, React.ReactNode> = {
  resume:        <FileText size={18} color="#4A7BE0" />,
  cover_letter:  <Mail size={18} color="#22C98A" />,
  certifications:<Award size={18} color="#7F77DD" />,
  portfolio:     <LayoutGrid size={18} color="#F5A623" />,
}

const DOCUMENT_ICON_BG: Record<string, string> = {
  resume:         'bg-blue-pale',
  cover_letter:   'bg-success-bg',
  certifications: 'bg-ai-light',
  portfolio:      'bg-warning-bg',
}

const PublishJob = ({ form, setForm, onNext, onBack, onGoToStep }: PublishJobProps) => {

  const [showPicker, setShowPicker] = useState(false)
  const defaultStyles = useDefaultStyles()
  const hasDeadline = !!form.applicationDeadline

  return (
    <ScrollView
      className="flex-1 bg-surface-bg rounded-t-3xl"
      contentContainerClassName="px-4 pt-6 pb-10"
      showsVerticalScrollIndicator={false}
    >
      
      <View className="flex-row items-center gap-2 my-4">
        <View className="flex-1 h-px bg-surface-border" />
        <Text className="font-figtree-medium text-sm text-surface-muted">YOUR POSTING SO FAR</Text>
        <View className="flex-1 h-px bg-surface-border" />
      </View>

      <View className="bg-white border border-surface-border rounded-2xl overflow-hidden mb-2">

        {/* Row 1 — title + type + location */}
        <View className="flex-row items-center px-4 py-3 gap-3 border-b border-surface-border">
          <View className="w-2 h-2 rounded-full bg-success" />
          <View className="flex-1">
            <Text className="font-figtree-bold text-sm text-navy-950">
              {form.jobTitle || 'Untitled role'}
            </Text>
            <Text className="font-figtree text-xs text-surface-muted">
              {[form.department, form.employmentType, form.isRemote ? 'Remote' : form.city ? 'On-site' : null]
                .filter(Boolean).join(' · ')}
            </Text>
          </View>
          <TouchableOpacity onPress={() => onGoToStep(1)}>
            <Text className="font-figtree-bold text-xs text-blue">edit</Text>
          </TouchableOpacity>
        </View>

        {/* Row 2 — responsibilities + skills + experience */}
        <View className="flex-row items-center px-4 py-3 gap-3 border-b border-surface-border">
          <View className="w-2 h-2 rounded-full bg-success" />
          <View className="flex-1">
            <Text className="font-figtree-bold text-sm text-navy-950">
              {form.responsibilities.length} responsibilities · {form.skills.length} skills
            </Text>
            <Text className="font-figtree text-xs text-surface-muted">
              {form.experienceLevel ? `${form.experienceLevel} years experience required` : 'No experience requirement'}
            </Text>
          </View>
          <TouchableOpacity onPress={() => onGoToStep(2)}>
            <Text className="font-figtree-bold text-xs text-blue">edit</Text>
          </TouchableOpacity>
        </View>

        {/* Row 3 — salary */}
        <View className="flex-row items-center px-4 py-3 gap-3">
          <View className={`w-2 h-2 rounded-full ${form.salaryMin ? 'bg-success' : 'bg-surface-border'}`} />
          <View className="flex-1">
            <Text className="font-figtree-bold text-sm text-navy-950">
              {form.salaryType === 'negotiable' ? 'Negotiable'
                : form.salaryType === 'internship' ? 'Internship / Unpaid'
                : form.salaryMin
                  ? `${form.currency || 'USD'} ${form.salaryMin.toLocaleString()}${form.salaryMax ? ` – ${form.salaryMax.toLocaleString()}` : ''}`
                  : 'No salary set'}
            </Text>
            <Text className="font-figtree text-xs text-surface-muted">
              {[form.payPeriod ? `per ${form.payPeriod}` : null, form.salaryType].filter(Boolean).join(' · ')}
            </Text>
          </View>
          <TouchableOpacity onPress={() => onGoToStep(3)}>
            <Text className="font-figtree-bold text-xs text-blue">edit</Text>
          </TouchableOpacity>
        </View>

      </View>

      <View className="flex-row items-center gap-2 my-4">
        <View className="flex-1 h-px bg-surface-border" />
        <Text className="font-figtree-medium text-sm text-surface-muted">REQUIRED DOCUMENTS</Text>
        <View className="flex-1 h-px bg-surface-border" />
      </View>

      {/* Required Documents */}
      <View className="flex-row items-center gap-1.5 mb-3">
        <FileText size={14} color="#4A7BE0" />
        <Text className="font-figtree-bold text-sm text-navy-950">What should applicants submit?</Text>
      </View>

      <View className="border border-surface-border rounded-2xl overflow-hidden">
        {REQUIRED_DOCUMENT_OPTIONS.map((doc, index) => {
          const isRequired = form.requiredDocuments.includes(doc.value as RequiredDocument)
          return (
            <View
              key={doc.value}
              className={`flex-row items-center px-4 py-3 gap-3 ${
                index < REQUIRED_DOCUMENT_OPTIONS.length - 1 ? 'border-b border-surface-border' : ''
              }`}
            >
              <View className={`w-10 h-10 rounded-xl items-center justify-center ${DOCUMENT_ICON_BG[doc.value]}`}>
                {DOCUMENT_ICONS[doc.value]}
              </View>

              <View className="flex-1">
                <Text className="font-figtree-bold text-sm text-navy-950">{doc.label}</Text>
                <Text className="font-figtree text-xs text-surface-muted">{doc.description}</Text>
              </View>

              <View className="items-end gap-1">
                <Text className={`font-figtree text-xs ${isRequired ? 'text-blue' : 'text-surface-muted'}`}>
                  {isRequired ? 'Required' : 'Optional'}
                </Text>
                <Switch
                  value={isRequired}
                  onValueChange={(val) => setForm(prev => ({
                    ...prev,
                    requiredDocuments: val
                      ? [...prev.requiredDocuments, doc.value as RequiredDocument]
                      : prev.requiredDocuments.filter(d => d !== doc.value)
                  }))}
                  trackColor={{ false: "#E4E8F2", true: "#4A7BE0" }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </View>
          )
        })}
      </View>


      <View className="flex-row items-center gap-2 my-4">
        <View className="flex-1 h-px bg-surface-border" />
        <Text className="font-figtree-medium text-sm text-surface-muted">DEADLINE</Text>
        <View className="flex-1 h-px bg-surface-border" />
      </View>

      <View className="flex-row items-center gap-1.5 mb-3">
        <CalendarDays size={14} color="#4A7BE0" />
        <Text className="font-figtree-bold text-sm text-navy-950">Application deadline</Text>
      </View>

      <Modal visible={showPicker} transparent animationType="slide" onRequestClose={() => setShowPicker(false)}>
        <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <TouchableOpacity className="flex-1" activeOpacity={1} onPress={() => setShowPicker(false)} />
          <SafeAreaView edges={["bottom"]} className="bg-white rounded-t-3xl px-5 pt-4">
            <View className="w-10 h-1 rounded-full bg-surface-border self-center mb-4" />
            <DateTimePicker
              mode="single"
              date={form.applicationDeadline ? dayjs(form.applicationDeadline).toDate() : undefined}
              onChange={({ date }) => {
                setForm(prev => ({ ...prev, applicationDeadline: date ? dayjs(date as DateType).toISOString() : null }))
                setShowPicker(false)
              }}
              minDate={new Date()}
              styles={defaultStyles}
            />
          </SafeAreaView>
        </View>
      </Modal>

      {/* Selected date — shown when deadline is set */}
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        className={`bg-white border rounded-2xl px-4 py-3.5 flex-row items-center justify-between mb-2 ${
          hasDeadline ? 'border-blue' : 'border-surface-border'
        }`}
      >
        <View>
          <Text className={`font-figtree-bold text-sm ${hasDeadline ? 'text-navy-950' : 'text-surface-muted'}`}>
            {hasDeadline ? dayjs(form.applicationDeadline).format('MMMM D, YYYY') : 'Set a deadline'}
          </Text>
          {hasDeadline && (
            <Text className="font-figtree text-xs text-surface-muted">
              {dayjs(form.applicationDeadline).diff(dayjs(), 'day')} days from today
            </Text>
          )}
        </View>
        <CalendarDays size={16} color={hasDeadline ? "#4A7BE0" : "#9BA8C0"} />
      </TouchableOpacity>

      {/* No deadline */}
      <TouchableOpacity
        onPress={() => setForm(prev => ({ ...prev, applicationDeadline: null }))}
        className={`flex-row items-center justify-center gap-2 border rounded-2xl py-3 ${
          !hasDeadline ? 'border-blue bg-blue-pale' : 'border-surface-border bg-white'
        }`}
      >
        <Infinity size={14} color={!hasDeadline ? "#4A7BE0" : "#9BA8C0"} />
        <Text className={`font-figtree-bold text-sm ${!hasDeadline ? 'text-blue' : 'text-surface-muted'}`}>
          No deadline — keep open until filled
        </Text>
      </TouchableOpacity>


      <View className="flex-row items-center gap-2 my-4">
        <View className="flex-1 h-px bg-surface-border" />
        <Text className="font-figtree-medium text-sm text-surface-muted">HOW IT LOOKS TO CANDIDATES</Text>
        <View className="flex-1 h-px bg-surface-border" />
      </View>

      <JobCard
        title={form.jobTitle || 'Untitled role'}
        company="Your Company"
        location={[form.city, form.country].filter(Boolean).join(', ')}
        employmentType={form.employmentType || ''}
        isRemote={form.isRemote}
        experienceLevel={form.experienceLevel}
        salaryMin={form.salaryMin}
        salaryMax={form.salaryMax}
        currency={form.currency || 'USD'}
        payPeriod={form.payPeriod}
        aiMatched
      />

      <SafeAreaView edges={["bottom"]} className="bg-surface-bg pt-2 pb-2 mt-4">
        <TouchableOpacity
          onPress={onNext}
          className="bg-blue rounded-2xl py-4 items-center mb-2"
        >
          <Text className="font-figtree-bold text-white text-sm">Publish Job</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onBack} className="py-4 items-center">
          <Text className="font-figtree-bold text-sm text-surface-secondary">Back</Text>
        </TouchableOpacity>
      </SafeAreaView>

    </ScrollView>
  )
}

export default PublishJob