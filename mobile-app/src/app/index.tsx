import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Check, Eye, EyeOff, ArrowRight } from "lucide-react-native";
import { login } from "@/features/auth/api/authApi";

export default function Index() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailValid = email.includes("@") && email.includes(".");
  const canSubmit = email && password;

  const handleSubmit = async () => {

    try {
      await login({ email, password });
      router.push("/(applicant)/(tabs)/home");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-navy-950" edges={["top"]}>

      {/* Header */}
      <View className="px-6 pt-6 pb-10">
        {/* Logo */}
        <View className="flex-row items-center gap-2 mb-8">
          <View className="w-9 h-9 bg-blue rounded-xl items-center justify-center">
            <Text className="text-white font-figtree-bold text-base">HF</Text>
          </View>
          <Text className="font-figtree-bold text-white text-lg">
            Hire<Text className="text-sky">Flow</Text>
          </Text>
        </View>

        {/* Hero text */}
        <Text className="font-figtree-extrabold text-5xl text-white leading-tight">
          Where talent{"\n"}meets{"\n"}
          <Text className="text-sky">opportunity.</Text>
        </Text>
        <Text className="font-figtree text-sm text-surface-secondary mt-3">
          AI-powered hiring — matched by skill, not just keywords.
        </Text>
      </View>

      {/* Bottom sheet */}
      <ScrollView
        className="flex-1 bg-surface-bg rounded-t-3xl"
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 32, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Email */}
        <View className="mb-4">
          <Text className="font-figtree-bold text-sm text-navy-950 mb-2">Email address</Text>
          <View className={`flex-row items-center border rounded-2xl px-4 py-1 bg-white ${
            emailValid ? 'border-success' : 'border-surface-border'
          }`}>
            <TextInput
              className="flex-1 font-figtree text-sm text-navy-950 py-3"
              placeholder="your@email.com"
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

        {/* Forgot password */}
        <View className="items-end mb-6">
          <TouchableOpacity>
            <Text className="font-figtree-bold text-sm text-blue">Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign in button */}
        <TouchableOpacity
          className={`rounded-2xl py-4 flex-row items-center justify-center gap-2 ${
            canSubmit ? 'bg-navy-950' : 'bg-surface-border'
          }`}
          disabled={!canSubmit}
          activeOpacity={0.8}
          onPress={handleSubmit}
        >
          <Text className={`font-figtree-bold text-sm ${canSubmit ? 'text-white' : 'text-surface-muted'}`}>
            Sign in
          </Text>
          <ArrowRight size={14} color={canSubmit ? '#fff' : '#9BA8C0'} />
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
        <View className="items-center mt-8">
          <Text className="font-figtree text-sm text-surface-muted">
            New to JobBridge?{" "}
            <Link href="/">
              <Text className="font-figtree-bold text-blue">Create an account →</Text>
            </Link>
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}