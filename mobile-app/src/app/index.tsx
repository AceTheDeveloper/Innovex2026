import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View >
      <Text className="font-display text-red-600">Edit src/app/index.tsx to edit this screen.</Text>
      <Link href={"/(employer)/(tabs)/home"}>
        <Text>List Job</Text>
      </Link>
    </View>
  );
}