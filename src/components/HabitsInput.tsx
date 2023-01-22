import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function HabitsInput() {
  const { navigate } = useNavigation();
  return (
    <Text className="text-zinc-400 text-base">
      Voê não está monitorando nenhum habito ! {` `}
      <Text
        className="text-violet-400 text-base underline "
        onPress={() => navigate("NewHabit")}
      ></Text>
    </Text>
  );
}
