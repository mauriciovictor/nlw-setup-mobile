import { ScrollView, Text, View } from "react-native";

import { useRoute } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";
import dayjs from "dayjs";
import { Progressbar } from "../components/Progressbar";
import { CheckBox } from "../components/CheckBox";

interface Params {
  date: string;
}

export function Habit() {
  const route = useRoute();

  const { date } = route.params as Params;

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format("dddd");

  const dayAndMount = parsedDate.format("DD/MM");

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-500 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="mt-6 text-white font-extrabold text-3xl ">
          {dayAndMount}
        </Text>

        <Progressbar progress={20} />

        <View className="mt-6">
          <CheckBox title="Beber 2L de água " checked />
          <CheckBox title="Caminhar" />
        </View>
      </ScrollView>
    </View>
  );
}
