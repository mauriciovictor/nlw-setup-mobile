import {
  Alert,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BackButton } from "../components/BackButton";
import { Feather } from "@expo/vector-icons";
import { Text } from "react-native";
import { CheckBox } from "../components/CheckBox";
import { useState } from "react";
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";
const availableWeekDays = [
  "Domindo",
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sábado",
];
export function NewHabit() {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex)
      );
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex]);
    }
  }

  async function handleCreateNewHabit() {
    try {
      if (!title.trim() || weekDays.length === 0) {
        return Alert.alert(
          "Novo Hábito",
          "Informe o nome do novo hábito e escolha a periodicidade"
        );
      }

      await api.post("/habits", {
        title,
        weekDays,
      });

      setTitle("");
      setWeekDays([]);

      Alert.alert("Novo Hábito", "Hábito Criado com sucesso");
    } catch (error) {
      Alert.alert("Ops", "Não foi possivel criar o novo hábito");
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar Hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento ?
        </Text>

        <TextInput
          className="mb-6 h-12 pl-4 rounded-lg bg-zinc-800 text-white focus:border-2 focus:border-green-600"
          placeholder="Exercicios, domir bem, etc..."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
        />

        {availableWeekDays.map((week, index) => (
          <CheckBox
            onPress={() => handleToggleWeekDay(index)}
            checked={weekDays.includes(index)}
            title={week}
            key={week}
          />
        ))}

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleCreateNewHabit}
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6 "
        >
          <Feather name="check" size={20} color={colors.white} />

          <Text className="font-semibold text-base text-white ml-2">
            {" "}
            Confirmar{" "}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
