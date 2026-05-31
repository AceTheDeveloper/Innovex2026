import React, { useState, useRef } from 'react'
import { useRouter, Link } from 'expo-router'
import { Text, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ApplicantProfileForm, APPLICANT_PROFILE_INITIAL_STATE } from '@/features/applicant/types/applicant'
import StepsIndicator from '@/features/auth/components/StepsIndicator'
import RoleSelect from '@/features/auth/components/steps/RoleSelect'
import CountrySelect from '@/features/auth/components/steps/CountrySelect'
import RegisterForm from '@/features/auth/components/steps/RegisterForm'

type ApplicantProfileFormWithoutId = Omit<ApplicantProfileForm, 'id' | 'createdAt'>

const SignUp = () => {

  const router = useRouter()
  const scrollRef = useRef<ScrollView | null>(null)
  const [currentStep, setCurrentStep] = useState<'1' | '2' | '3' | '4'>('1')
  const [userRole, setUserRole] = useState<'applicant' | 'employer' | null>(null);
  const [country, setCountry] = useState<'PH' | 'ID' | null>(null);
  const [profile, setProfile] = useState<ApplicantProfileFormWithoutId>(APPLICANT_PROFILE_INITIAL_STATE);

  const handleChange = (field: string, value: any) => {
    setProfile(prev => {
      if (field.startsWith('extracted.')) {
        const key = field.split('.')[1]
        return { ...prev, extracted: { ...prev.extracted, [key]: value } }
      }
      return { ...prev, [field]: value }
    })
  }

  return (
    <SafeAreaView className="flex-1 bg-navy-950" edges={["top"]}>

      {/* Header */}
      <View className="px-6 pt-6 pb-10">
        {/* Logo */}
        <View className="flex-row items-center gap-2 mb-8">
          <View className="w-9 h-9 bg-blue rounded-xl items-center justify-center">
            <Text className="text-white font-figtree-bold text-base">HF</Text>
          </View>
          <Text className="font-figtree-bold text-white text-lg">
            Hire<Text className="text-sky">Flow</Text>
          </Text>
        </View>

        {/* Hero text */}
        <Text className="font-figtree-extrabold text-5xl text-white leading-tight">
          Create your{"\n"}
          <Text className="text-sky">account.</Text>
        </Text>
        <Text className="font-figtree text-sm text-surface-secondary mt-3">
          First, tell us how you'll use HireFlow.
        </Text>
      </View>

      {/* Bottom sheet */}
      <ScrollView
        className="flex-1 bg-surface-bg rounded-t-3xl"
        contentContainerClassName="px-6 pt-8 pb-10"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
      >

        <StepsIndicator
          currentStep={Number(currentStep)}
          totalSteps={3}
        />

        {currentStep === '1' && (
          <RoleSelect
            userRole={userRole}
            setUserRole={setUserRole}
            onNext={() => setCurrentStep('2')}
            scrollRef={scrollRef}
          />
        )}

        {currentStep === '2' && (
          <CountrySelect
            country={country}
            setCountry={setCountry}
            onNext={() => setCurrentStep('3')}
          />
        )}

        {currentStep === '3' && (
          <RegisterForm
            userRole={userRole}
            userCountry={country}
            onRegister={(role) => {
              if (role === 'applicant') router.push('/(applicant)/(tabs)/home')
              if (role === 'employer') router.push('/(employer)/(tabs)/home')
            }}
            onBack={() => setCurrentStep('2')}
          />
        )}


      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
