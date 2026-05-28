import { useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BadgeCheck, Plus } from 'lucide-react-native'
import PageHeader from '@/components/PageHeader'
import ProfileItemCard from '@/features/applicant/components/cards/ProfileItemCard'
import CertificationModal from '@/features/applicant/components/modals/CertificationModal'
import { useProfile } from '@/features/applicant/context/ProfileContext'

const Certifications = () => {
  const { profile, setProfile, setIsDirty, saveProfile } = useProfile()
  const [showModal, setShowModal] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const certifications = profile.extracted.certifications  // string[]

  const handleSave = async (value: string) => {
    const updated = editingIndex !== null
      ? certifications.map((c, i) => i === editingIndex ? value : c)
      : [...certifications, value]

    setProfile(prev => ({
      ...prev,
      extracted: { ...prev.extracted, certifications: updated }
    }))
    setIsDirty(true)
  }

  const handleDelete = async (index: number) => {
    const updated = certifications.filter((_, i) => i !== index)
    setProfile(prev => ({
      ...prev,
      extracted: { ...prev.extracted, certifications: updated }
    }))
    setIsDirty(true)
    await saveProfile()
  }

  const handleEdit = (index: number) => {
    setEditingIndex(index)
    setShowModal(true)
  }

  const handleAdd = () => {
    setEditingIndex(null)
    setShowModal(true)
  }

  // Parse "Name · Issuer · Year" string into parts for the card
  const parseCert = (cert: string) => {
    const parts = cert.split(' · ')
    return {
      title: parts[0]?.trim() ?? cert,
      subtitle: parts[1]?.trim(),
      meta: parts[2]?.trim(),
    }
  }

  return (
    <>
      <CertificationModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        initialData={editingIndex !== null ? certifications[editingIndex] : null}
        onSave={handleSave}
      />

      <SafeAreaView className="flex-1 bg-navy-900" edges={['top']}>
        <PageHeader
          mode="back"
          heading="Certifications"
          subheading={`${certifications.length} certification${certifications.length !== 1 ? 's' : ''}`}
        />

        <ScrollView
          className="flex-1 bg-surface-bg rounded-t-3xl"
          contentContainerClassName="px-4 pt-6 pb-10"
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            onPress={handleAdd}
            className="bg-white border border-dashed border-blue-muted rounded-2xl flex-row items-center justify-center gap-2 py-4 mb-3"
          >
            <Plus size={20} color="#0D1F4E" />
            <Text className="font-figtree-extrabold text-base text-navy-950">Add new certification</Text>
          </TouchableOpacity>

          {certifications.map((cert, index) => {
            const { title, subtitle, meta } = parseCert(cert)
            return (
              <ProfileItemCard
                key={index}
                title={title}
                subtitle={subtitle}
                meta={meta}
                onEdit={() => handleEdit(index)}
                onDelete={() => handleDelete(index)}
              />
            )
          })}
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default Certifications