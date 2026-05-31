import React from 'react'
import { Link } from 'expo-router'
import { Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowRight } from 'lucide-react-native'
import SelectorCard from '../SelectorCard'

const PHFlag = () => <Text style={{ fontSize: 20 }}>🇵🇭</Text>
const IDFlag = () => <Text style={{ fontSize: 20 }}>🇮🇩</Text>

const countryConfig: {
  value: 'PH' | 'ID'
  title: string
  description: string
  icon: React.ComponentType<{ size?: number, color?: string }>
  activeColor: string
  activeBg: string
  }[] = [
  {
    value: 'PH',
    title: 'Philippines',
    description: 'Based in the Philippines',
    icon: PHFlag,
    activeColor: '#4A7BE0',
    activeBg: '#EBF0FB',
  },
  {
    value: 'ID',
    title: 'Indonesia',
    description: 'Based in Indonesia',
    icon: IDFlag,
    activeColor: '#E63946',
    activeBg: '#FDE8EA',
  },
]

type CountrySelectProps = {
  country: 'PH' | 'ID' | null
  setCountry: (country: 'PH' | 'ID' | null) => void
  onNext: () => void
}

const CountrySelect = ({ country, setCountry, onNext }: CountrySelectProps) => {
  return (
    <View>
      <View>
        <Text className='font-figtree-bold text-xl'>Where are you based?</Text>
        <Text className='font-figtree text-sm text-surface-muted'>
          This helps us show relevant jobs and candidates in your region.
        </Text>
      </View>

      {countryConfig.map(({ value, title, description, icon, activeColor, activeBg }) => (
        <View className="mt-5" key={value}>
          <SelectorCard
            value={value}
            title={title}
            description={description}
            icon={icon}
            selected={country === value}
            onPress={() => setCountry(value)}
            activeColor={activeColor}
            activeBg={activeBg}
          />
        </View>
      ))}

      <TouchableOpacity
        className={`rounded-2xl mt-6 py-4 flex-row items-center justify-center gap-2 ${country ? 'bg-navy-950' : 'bg-surface-muted'}`}
        activeOpacity={0.8}
        disabled={!country}
        onPress={onNext}
      >
        <Text className="font-figtree-bold text-sm text-white">
          {country ? `Continue` : 'Select a country to continue'}
        </Text>
        <ArrowRight size={14} color={'#9BA8C0'} />
      </TouchableOpacity>

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

export default CountrySelect