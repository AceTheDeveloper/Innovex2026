import React, { useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, View, TextInput, TouchableOpacity  } from 'react-native'
import { Check, Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react-native'
import { ApplicantProfileForm } from '@/features/applicant/types/applicant'
import { registerUser } from '../../api/authApi'
import { createProfile } from '@/features/applicant/api/profileApi'

type UserRole = 'applicant' | 'employer' | null

type RegisterFormProps = {
  userRole: UserRole
  userCountry: 'PH' | 'ID' | null
  onRegister: (userRole: UserRole) => void
  onBack: () => void
}

const RegisterForm = ({ userRole, userCountry, onRegister, onBack }: RegisterFormProps) => {

  const router = useRouter();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const emailValid = email.includes("@") && email.includes(".");

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).trim()
  const name = `${capitalize(firstName)} ${capitalize(lastName)}`

  const handleSubmit = async () => {
    console.log(firstName);
    const result = await registerUser({ name, email, password, role: userRole, country: userCountry });
    const user = result?.data.user;
    if (userRole === 'applicant') {
      await createProfile({
        userId: user.id,
        name: user.name,
        email: user.email,
        country: user.country,
        isOpenToOverseas: false,
        rawText: '',
        extracted: {
          skills: [],
          experienceYears: null,
          education: null,
          previousRoles: [],
          certifications: [],
          languages: [],
        }
      })
    }
    onRegister(userRole)
  }


  return (
    <>

      <TouchableOpacity
        className="flex-row items-center gap-1 self-start mt-3"
        activeOpacity={0.7}
        onPress={onBack}
      >
        <ArrowLeft size={16} color="#9BA8C0" />
        <Text className="font-figtree-bold text-sm text-surface-muted">Back</Text>
      </TouchableOpacity>

      <View className={`py-2 px-4 border rounded-3xl my-5 self-start ${
        userRole === 'applicant' ? 
        'border-tag-blue-text bg-tag-blue-bg' : 
        'border-success-dark bg-success-bg'
      }`}>
        <Text className={`font-figtree-bold text-sm ${
          userRole === 'applicant' ? 
          'text-tag-blue-text' : 
          'text-success-dark'
        }`}
        >{userRole === 'applicant' ? 'Signing up as Job seeker' : 'Signing up as Employer'}</Text>
      </View>

      <View className='flex-row items-center gap-2'>
        <View className='flex-1'>
          <Text className="font-figtree-bold text-sm text-navy-950 mb-2">First name</Text>
          <View className={`flex-row items-center border rounded-2xl px-4 py-1 bg-white ${
            emailValid ? 'border-success' : 'border-surface-border'
          }`}>
            <TextInput
              className="flex-1 font-figtree text-sm text-navy-950 py-3"
              placeholder="Juan"
              placeholderTextColor="#9BA8C0"
              value={firstName}
              onChangeText={setFirstName}
              keyboardType="default"
              autoCapitalize="none"
            />
            {emailValid && <Check size={16} color="#22C98A" />}
          </View>
        </View>

        <View className='flex-1'>
          <Text className="font-figtree-bold text-sm text-navy-950 mb-2">Last name</Text>
          <View className={`flex-row items-center border rounded-2xl px-4 py-1 bg-white ${
            emailValid ? 'border-success' : 'border-surface-border'
          }`}>
            <TextInput
              className="flex-1 font-figtree text-sm text-navy-950 py-3"
              placeholder="dela Cruz"
              placeholderTextColor="#9BA8C0"
              value={lastName}
              onChangeText={setLastName}
              keyboardType="default"
              autoCapitalize="none"
            />
            {emailValid && <Check size={16} color="#22C98A" />}
          </View>
        </View>
      </View>

      <View>
        <Text className="font-figtree-bold text-sm text-navy-950 mb-2">Email address</Text>
        <View className={`flex-row items-center border rounded-2xl px-4 py-1 bg-white ${
          emailValid ? 'border-success' : 'border-surface-border'
        }`}>
          <TextInput
            className="flex-1 font-figtree text-sm text-navy-950 py-3"
            placeholder="juandelacruz@email.com"
            placeholderTextColor="#9BA8C0"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailValid && <Check size={16} color="#22C98A" />}
        </View>
      </View>

      {/* Password */}
      <View className="mb-3">
        <Text className="font-figtree-bold text-sm text-navy-950 mb-2">Password</Text>
        <View className="flex-row items-center border border-surface-border rounded-2xl px-4 py-1 bg-white">
          <TextInput
            className="flex-1 font-figtree text-sm text-navy-950 py-3"
            placeholder="Enter your password"
            placeholderTextColor="#9BA8C0"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} hitSlop={8}>
            {showPassword
              ? <EyeOff size={16} color="#9BA8C0" />
              : <Eye size={16} color="#9BA8C0" />
            }
          </TouchableOpacity>
        </View>
      </View>

      {/* Create account button */}
      <TouchableOpacity
        className='rounded-2xl py-4 flex-row items-center justify-center gap-2 bg-navy-950'
        activeOpacity={0.8}
        onPress={handleSubmit}
      >
        <Text className={`font-figtree-bold text-sm text-white`}>
            Create account
        </Text>
        <ArrowRight size={14} color={'#fff'} />
      </TouchableOpacity>

      {/* Divider */}
      <View className="flex-row items-center gap-3 my-6">
        <View className="flex-1 h-px bg-surface-border" />
        <Text className="font-figtree text-xs text-surface-muted">or continue with</Text>
        <View className="flex-1 h-px bg-surface-border" />
      </View>

      {/* Social buttons */}
      <View className="flex-row gap-3">
        <TouchableOpacity
          onPress={() => router.push("/(applicant)/(tabs)/home")}
          className="flex-1 flex-row items-center justify-center gap-2 border border-surface-border rounded-2xl py-3.5 bg-white"
          activeOpacity={0.7}
        >
          <Text className="font-figtree-bold text-sm text-navy-950">G</Text>
          <Text className="font-figtree-bold text-sm text-navy-950">Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/(employer)/(tabs)/home")}
          className="flex-1 flex-row items-center justify-center gap-2 border border-surface-border rounded-2xl py-3.5 bg-white"
          activeOpacity={0.7}
        >
          <Text className="font-figtree-bold text-sm text-blue">in</Text>
          <Text className="font-figtree-bold text-sm text-navy-950">LinkedIn</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <SafeAreaView edges={["bottom"]}>
        <View className="items-center mt-8">
          <Text className="font-figtree text-sm text-surface-muted">
            Already have an account?{" "}
            <Link href={'/'}>
              <Text className="font-figtree-bold text-blue">Sign in →</Text>
            </Link>
          </Text>
        </View>
      </SafeAreaView>
    </>
  )
}

export default RegisterForm
