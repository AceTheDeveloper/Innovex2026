import React from 'react'
import { Text, View, TextInput } from 'react-native'
import { TextInputProps } from 'react-native'
import { Asterisk } from 'lucide-react-native'

type InputProps = TextInputProps & {
  label?: string
  icon?: React.ReactNode
  multiline?: boolean
}

const Input = ({ icon, label, multiline, ...props }: InputProps) => {
  return (
    <View className='my-2'>
      <View className='flex-row items-center gap-2 mb-2'>
        {icon}
        <Text className='font-figtree-medium'>
          {label} <Asterisk size={10} color={"#E8526A"} />
        </Text>
      </View>

      <TextInput 
        {...props} 
        multiline={multiline}
        className='border border-surface-border rounded-2xl px-4 py-2'
      />
    </View>
  )
}

export default Input