

import { useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Plus } from 'lucide-react-native'
import PageHeader from '@/components/PageHeader'
import ProfileItemCard from '@/features/applicant/components/cards/ProfileItemCard'
import CertificationModal from '@/features/applicant/components/modals/CertificationModal'
import { Certification as CertificationType } from '@/features/applicant/types/applicant' 

const Certification = () => {

  const { certifications } = useLocalSearchParams();
  const parsedEducation: CertificationType[] = JSON.parse(certifications as string)
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <CertificationModal 
        visible={showModal}
        onClose={() => setShowModal(false)}
      />

      <SafeAreaView className="flex-1 bg-navy-900" edges={["top"]}>
        <PageHeader
          mode='back'
          heading={"Certification"}
          subheading={"3 certifications"}
        />

        <ScrollView
          className="flex-1 bg-surface-bg rounded-t-3xl"
          contentContainerClassName="px-4 pt-6 pb-10"
          showsVerticalScrollIndicator={false}
        >

          <TouchableOpacity onPress={() => setShowModal(true)}
            className="bg-white border border-dashed border-blue-muted rounded-2xl flex-row items-center justify-center gap-2 py-4"
          >
            <Plus size={20} color="#0D1F4E" />
            <Text className="font-figtree-extrabold text-base text-navy-950">Add new certification</Text>
          </TouchableOpacity>

          <View className='mt-3'>
            {parsedEducation.map((certification, index) => (
              <ProfileItemCard
                key={index}
                title={certification.name}
                subtitle={certification.issuer}
                meta={certification.year}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            ))}
          </View>

        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default Certification