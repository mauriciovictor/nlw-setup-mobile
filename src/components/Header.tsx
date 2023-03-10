import { View, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import Logo from "../assets/logo.svg";
import colors from "tailwindcss/colors";

export function Header() {
  const { navigate } = useNavigation();

  return (
    <View className="w-full flex-row items-center justify-between">
      <Logo />
      <TouchableOpacity
        onPress={() => navigate("NewHabit")}
        activeOpacity={0.7}
        className="flex-row h-11 border border-violet-500 rounded-lg px-5 flex items-center justify-between"
      >
        <Feather name="plus" color={colors.violet[500]} size={20}></Feather>
        <Text className="text-white nl-3 font-semibold text-base">
          Novo Hábito
        </Text>
      </TouchableOpacity>
    </View>
  );
}
