import { useState } from 'react'
import { Modal, View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, KeyboardAvoidingView, Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Search, X } from 'lucide-react-native'

interface City {
  id: number
  city: string
  countryCode: string
  country: string
}

interface CityPickerModalProps {
  visible: boolean
  onClose: () => void
  onSelect: (city: string, country: string) => void
}

const CityPickerModal = ({ visible, onClose, onSelect }: CityPickerModalProps) => {
  const [query, setQuery] = useState('')
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(false)

  const searchCities = async (text: string) => {
    setQuery(text)
    if (text.length < 3) {
      setCities([])
      return
    }

    setLoading(true)
    try {
      const sanitized = text.replace(/\s*city\s*/gi, '').trim()

      const response = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${encodeURIComponent(sanitized)}&limit=10&sort=-population`,
        {
          headers: {
            'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
            'x-rapidapi-key': process.env.EXPO_PUBLIC_GEODB_API_KEY!,
          },
        }
      )
      const data = await response.json()
      setCities(data.data ?? [])
    } catch (e) {
      console.log(e)
      setCities([])
    } finally {
      setLoading(false)
    }
  }


  const handleSelect = (city: City) => {
    onSelect(city.city, city.country)
    setQuery('')
    setCities([])
    onClose()
  }

  const handleClose = () => {
    setQuery('')
    setCities([])
    onClose()
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
        <TouchableOpacity className="flex-1" activeOpacity={1} onPress={handleClose} />

        <KeyboardAvoidingView behavior="padding">
          <SafeAreaView edges={["bottom"]} className="bg-white rounded-t-3xl px-5 pt-4">
            {/* Handle */}
            <View className="w-10 h-1 rounded-full bg-surface-border self-center mb-4" />

            {/* Title */}
            <Text className="font-figtree-extrabold text-xl text-navy-950 mb-4">Select City</Text>

            {/* Search input */}
            <View className="flex-row items-center bg-surface-bg border border-surface-border rounded-2xl px-4 py-3 gap-3 mb-4">
              <Search size={16} color="#9BA8C0" />
              <TextInput
                className="flex-1 font-figtree text-sm text-navy-950"
                placeholder="Search city..."
                placeholderTextColor="#9BA8C0"
                value={query}
                onChangeText={searchCities}
                autoFocus
              />
              {query.length > 0 && (
                <TouchableOpacity onPress={() => { setQuery(''); setCities([]) }}>
                  <X size={14} color="#9BA8C0" />
                </TouchableOpacity>
              )}
            </View>

            {/* Results */}
            {loading ? (
              <View className="py-8 items-center">
                <ActivityIndicator color="#4A7BE0" />
              </View>
            ) : cities.length > 0 ? (
              <FlatList
                data={cities}
                keyExtractor={(item) => item.id.toString()}
                style={{ maxHeight: 300 }}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => handleSelect(item)}
                    className={`py-3.5 ${index < cities.length - 1 ? 'border-b border-surface-border' : ''}`}
                  >
                    <Text className="font-figtree-bold text-sm text-navy-950">{item.city}</Text>
                    <Text className="font-figtree text-xs text-surface-muted">{item.country}</Text>
                  </TouchableOpacity>
                )}
              />
            ) : query.length >= 3 ? (
              <View className="py-8 items-center">
                <Text className="font-figtree text-sm text-surface-muted">No cities found</Text>
              </View>
            ) : (
              <View className="py-8 items-center">
                <Text className="font-figtree text-sm text-surface-muted">Type at least 3 characters</Text>
              </View>
            )}
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  )
}

export default CityPickerModal