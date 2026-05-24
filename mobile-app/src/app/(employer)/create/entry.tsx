import { Text, View,
         TouchableOpacity
 } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ArrowLeft } from "lucide-react-native";

const CreateEntry = () => {

  const router = useRouter();

  return (
    <SafeAreaProvider>
      <View>
      
        <View>

          <View className='flex-row items-center justify-between'>
            <TouchableOpacity 
              className='rounded-full h-10 w-10 items-center justify-center bg-navy-400'
              onPress={() => router.back()}
            >
              <ArrowLeft size={20} color="#6A85B8" />
            </TouchableOpacity>

            <Text className='text-base font-semibold'>Post a Job</Text>

            <View className='h-10 w-10' />
          </View>

        </View>

        <View>


        </View>

      </View>
    </SafeAreaProvider>
  )
}

export default CreateEntry