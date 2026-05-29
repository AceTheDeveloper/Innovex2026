import React, { useState, useEffect } from 'react'
import { Modal, TextInput, TouchableOpacity, Text, View, KeyboardAvoidingView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type AddItemModalProps = {
  visible: boolean
  defaultValue?: string
  title: string
  subtitle?: string
  placeholder: string
  inputHint?: string
  multiline?: boolean
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad'
  onClose: () => void
  onAdd: (value: string) => void
  children?: React.ReactNode
}

const AddItemModal = ({ visible, defaultValue, title, subtitle, inputHint, placeholder, multiline, keyboardType, onClose, onAdd, children }: AddItemModalProps) => {
  const [value, setValue] = useState('')
  console.log(visible);

  const handleAdd = () => {
    if (!value.trim()) return
    onAdd(value.trim())
    setValue('')
    onClose()
  }

  const handleClose = () => {
    setValue('')
    onClose()
  }

  useEffect(() => {
    if (visible) {
      setValue(defaultValue ?? '')
    }
  }, [visible])

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <KeyboardAvoidingView
        behavior="padding" 
        className="flex-1 justify-end"
        style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      >

        {/* Backdrop */}
        <TouchableOpacity className="flex-1" activeOpacity={1} onPress={handleClose} />

        {/* Sheet */}
        <SafeAreaView edges={["bottom"]} className="bg-white rounded-t-3xl px-5 pt-4">

          {/* Handle */}
          <View className="w-10 h-1 rounded-full bg-surface-border self-center mb-5" />

          {/* Title */}
          <Text className="font-figtree-extrabold text-xl text-navy-950 mb-1">{title}</Text>
          {subtitle && (
            <Text className="font-figtree text-sm text-surface-secondary leading-snug mb-5">{subtitle}</Text>
          )}

          {/* Input */}
          <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            placeholderTextColor="#9BA8C0"
            autoFocus
            multiline={multiline}
            keyboardType={keyboardType}
            className={`bg-navy-950 text-white font-figtree text-sm rounded-2xl px-4 py-4 ${multiline ? 'min-h-28' : ''}`}
            textAlignVertical={multiline ? 'top' : 'center'}
          />

          {inputHint && (
            <Text className="font-figtree text-xs text-surface-muted mt-2 mb-5">{inputHint}</Text>
          )}

          {children}

          {/* Buttons */}
          <View className="flex-row gap-3 mt-4 mb-4">
            <TouchableOpacity
              onPress={handleClose}
              className="flex-1 border border-surface-border rounded-2xl py-4 items-center"
            >
              <Text className="font-figtree-bold text-sm text-surface-secondary">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleAdd}
              disabled={!value.trim()}
              className={`flex-1 rounded-2xl py-4 items-center flex-row justify-center gap-2 ${value.trim() ? 'bg-blue' : 'bg-surface-border'}`}
            >
              <Text className={`font-figtree-bold text-sm ${value.trim() ? 'text-white' : 'text-surface-muted'}`}>
                Add to list
              </Text>
            </TouchableOpacity>
          </View>

        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  )
}

export default AddItemModal