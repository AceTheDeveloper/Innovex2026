import { useState } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createJobPosting } from '@/features/employer/api/jobApi'
import { JobPostingForm, JOB_FORM_INITIAL_STATE } from '@/features/employer/types/employment'
import PageHeader from '@/components/PageHeader'
import StepIndicator from '@/features/employer/components/StepIndicator'
import RoleBasics from '@/features/employer/components/steps/RoleBasics'
import JobDetails from '@/features/employer/components/steps/JobDetails'
import Compensation from '@/features/employer/components/steps/Compensation'
import PublishJob from '@/features/employer/components/steps/PublishJob'

type StepContent = {
  heading: React.ReactNode
  subheading: string
}

const STEP_CONTENT: Record<number, StepContent> = {
  1: { heading: <>Role{" "}<Text className="text-sky">Basics</Text></>, subheading: "Tell us about the position" },
  2: { heading: <>Job{" "}<Text className="text-sky">Details</Text></>, subheading: "Describe the role and requirements" },
  3: { heading: <>Compensation</>, subheading: "Set the salary and benefits" },
  4: { heading: <>Screening{" "}<Text className="text-sky">& Publish</Text></>, subheading: "Final checks before going live" },
}

const JobForm = () => {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<JobPostingForm>(JOB_FORM_INITIAL_STATE);

  const handleSubmit = async () => {
  try {
    await createJobPosting(form, 'employer-001') // replace with real employer id later
  } catch (e) {
    console.error(e)
  }
}

  return (
    <SafeAreaView className="flex-1 bg-navy-900" edges={["top"]}>
      <PageHeader
        mode='back'
        title='POST A JOB'
        heading={STEP_CONTENT[step].heading}
        subheading={STEP_CONTENT[step].subheading}
      >
        <StepIndicator currentStep={step} />
      </PageHeader>

      {step === 1 && <RoleBasics form={form} setForm={setForm} onNext={() => setStep(2)} />}
      {step === 2 && <JobDetails form={form} setForm={setForm} onNext={() => setStep(3)}  onBack={() => setStep(1)}/>}
      {step === 3 && <Compensation form={form} setForm={setForm} onNext={() => setStep(4)}  onBack={() => setStep(2)}/>}
      {step === 4 && (
        <PublishJob
          form={form}
          setForm={setForm}
          onBack={() => setStep(3)}
          onNext={handleSubmit}
          onGoToStep={(step) => setStep(step)}
        />
      )}
    </SafeAreaView>
  )
}

export default JobForm
