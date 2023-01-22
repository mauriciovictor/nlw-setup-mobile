import { View, Text, ScrollView } from "react-native";
import { Header } from "../components/Header";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { generateRangeDatesFromYearStart } from "../utils/generate-range-between-dates";
import { useNavigation } from "@react-navigation/native";

const WEEK_DAYS = ["D", "S", "T", "Q", "Q", "S", "S"];

const summaryDays = generateRangeDatesFromYearStart();

const minumumSummaryDatesSizes = 10 * 5;
const amountOfDaysToFill = minumumSummaryDatesSizes - summaryDays.length;

export function Home() {
  const { navigate } = useNavigation();
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />
      <View className="flex-row mt-6 mb-2">
        {WEEK_DAYS.map((weekDay, index) => (
          <Text
            key={index}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{ width: DAY_SIZE }}
          >
            {weekDay}
          </Text>
        ))}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap ">
          {summaryDays.map((date) => (
            <HabitDay
              onPress={() => navigate("Habit", { date: date.toString() })}
              key={date.toString()}
            />
          ))}
          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, indes) => {
              return (
                <View
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                  key={indes}
                  className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                />
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
}
