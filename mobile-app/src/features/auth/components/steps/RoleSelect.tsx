import React, { useRef } from 'react'
import { Link } from 'expo-router';
import { Text, View, TouchableOpacity, Animated, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserSearch, Building, Brain, FileText, Bell, Users, BarChart2, ArrowRight } from 'lucide-react-native'
import SelectorCard from '../SelectorCard';

const roleConfig: {
    role: 'applicant' | 'employer';
    title: string;
    description: string;
    activeColor: string;
    activeBg: string
    icon: React.ComponentType<{ size?: number; color?: string }>;
    benefits: { icon: React.ComponentType<{ size?: number; color?: string }>; benefit: string }[];
  }[] = [
    {
      role: 'applicant',
      title: 'Job Seeker',
      description: 'Find roles matched to your skills & experience',
      icon: UserSearch,
      activeBg: "#4A7BE0",
      activeColor: "#EBF0FB",
      benefits: [
        { icon: Brain,      benefit: 'AI-matched jobs based on your actual skills' },
        { icon: FileText,   benefit: 'Smart resume analysis & gap feedback' },
        { icon: Bell,       benefit: 'Alerts when new matches appear' },
      ],
    },
    {
      role: 'employer',
      title: 'Employer',
      description: 'Source and hire top talents for your team',
      activeColor:"#DCFCE7",
      activeBg:"#0F6E56",
      icon: Building,
      benefits: [
        { icon: Brain,      benefit: 'Semantic search across applicant profiles' },
        { icon: Users,      benefit: 'AI-ranked candidate shortlists' },
        { icon: BarChart2,  benefit: 'Hiring pipeline analytics' },
      ],
    },
  ];

type UserRole = 'applicant' | 'employer'

type RoleSelectProps = {
  userRole: UserRole | null       // allow null before selection
  setUserRole: (role: UserRole) => void
  onNext: () => void
  scrollRef: React.RefObject<ScrollView | null>   // passed in from parent
}

const RoleSelect = ({ userRole, setUserRole, onNext, scrollRef }: RoleSelectProps) => {

  const continueRef = useRef<View>(null)
  const pulseAnim = useRef(new Animated.Value(1)).current
  
  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role)

    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true })
    }, 150)

    Animated.sequence([
      Animated.spring(pulseAnim, { toValue: 1.04, useNativeDriver: true, speed: 30, bounciness: 6 }),
      Animated.spring(pulseAnim, { toValue: 1,    useNativeDriver: true, speed: 30, bounciness: 6 }),
    ]).start()
  }


  return (
    <View>
      <View>
        <Text className='font-figtree-bold text-xl'>I am a...</Text>
        <Text className='font-figtree text-sm text-surface-muted'>
          Your role shapes how we set up your experience.{"\n"}You can always change it later.
        </Text>
      </View>

      {roleConfig.map(({ role, title, activeBg, activeColor, description, icon }) => (
        <View className="mt-5" key={role}>
          <SelectorCard
            value={role}
            title={title}
            activeColor={activeBg}
            activeBg={activeColor}
            description={description}
            icon={icon}
            selected={userRole === role}
            onPress={() => handleRoleSelect(role)}
          />
        </View>
      ))}

      {/* Benefits */}
      {(() => {
        const selected = roleConfig.find(r => r.role === userRole);
        if (!selected) return null;
        return (
          <View className="mt-4 bg-white rounded-2xl px-4 py-4 gap-3">
            <Text className="font-figtree-bold text-xs text-surface-muted uppercase tracking-wide">
              What you'll get
            </Text>
            {selected.benefits.map(({ icon: BenefitIcon, benefit }) => (
              <View key={benefit} className="flex-row items-center gap-3">
                <View
                  className="w-8 h-8 rounded-xl items-center justify-center"
                  style={{ backgroundColor: userRole === 'applicant' ? '#e8f0fe' : '#e8f8f0' }}
                >
                  <BenefitIcon size={16} color={userRole === 'applicant' ? '#2c6bed' : '#1a9e64'} />
                </View>
                <Text className="font-figtree text-sm text-navy-950 flex-1">{benefit}</Text>
              </View>
            ))}
          </View>
        );
      })()}

      {/* Continue button — pulse & scroll target */}
      <View ref={continueRef}>
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity
            className={`rounded-2xl mt-4 py-4 flex-row items-center justify-center gap-2 ${userRole ? 'bg-navy-950' : 'bg-surface-muted'}`}
            activeOpacity={0.8}
            disabled={!userRole}
            onPress={onNext}
          >
            <Text className="font-figtree-bold text-sm text-white">
              {userRole ? `Continue as ${userRole === 'applicant' ? 'Job Seeker' : 'Employer'}` : 'Select a role to continue'}
            </Text>
            <ArrowRight size={14} color={'#9BA8C0'} />
          </TouchableOpacity>
        </Animated.View>
      </View>

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

    </View>
  )
}

export default RoleSelect