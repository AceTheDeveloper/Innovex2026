import { useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Plus } from 'lucide-react-native'
import PageHeader from '@/components/PageHeader'
import ProfileItemCard from '@/features/applicant/components/cards/ProfileItemCard'
import { useProfile } from '@/features/applicant/context/ProfileContext'
import ExperienceModal, { EMPTY_FORM } from '@/features/applicant/components/modals/ExperienceModal'

const Experience = () => {
  const { experiences } = useLocalSearchParams()
  const { setProfile, setIsDirty } = useProfile()

  const [items, setItems] = useState<string[]>(
    JSON.parse(experiences as string) as string[]
  )
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);


  const syncToContext = (updated: string[]) => {
    setItems(updated)
    setProfile(prev => ({
      ...prev,
      extracted: { ...prev.extracted, previousRoles: updated },
    }))
    setIsDirty(true)
  }

  const handleAdd = (value: string) => {
    if (!value.trim() || items.includes(value.trim())) return
    syncToContext([value.trim(), ...items])
  }

  const handleDelete = (role: string) => {
    syncToContext(items.filter(i => i !== role))
  }

  const handleEdit = (role: string) => {
    setSelectedItem(role);
    setShowModal(true);
  }

  const handleSaveEdit = (updated: string) => {
    syncToContext(items.map(i => i === selectedItem ? updated : i));
    setSelectedItem(null);
  }

  return (
    <>
      <ExperienceModal
        visible={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedItem(null);
        }}
        onSave={selectedItem ? handleSaveEdit : handleAdd}
        initialData={selectedItem ? { ...EMPTY_FORM, title: selectedItem } : undefined}
      />

      <SafeAreaView className="flex-1 bg-navy-900" edges={['top']}>
        <PageHeader
          mode="back"
          heading="Previous Roles"
          subheading={`${items.length} role${items.length !== 1 ? 's' : ''}`}
        />

        <ScrollView
          className="flex-1 bg-surface-bg rounded-t-3xl"
          contentContainerClassName="px-4 pt-6 pb-10"
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            className="bg-white border border-dashed border-blue-muted rounded-2xl flex-row items-center justify-center gap-2 py-4"
          >
            <Plus size={20} color="#0D1F4E" />
            <Text className="font-figtree-extrabold text-base text-navy-950">
              Add new role
            </Text>
          </TouchableOpacity>

          <View className="mt-3">
            {items.map((role, index) => (
              <ProfileItemCard
                key={index}
                title={role}
                onDelete={() => handleDelete(role)}
                onEdit={() => handleEdit(role)}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default Experience