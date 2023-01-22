import { Alert, ScrollView, Text, View } from "react-native";

import { useRoute } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";
import dayjs from "dayjs";
import { Progressbar } from "../components/Progressbar";
import { CheckBox } from "../components/CheckBox";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import { HabitsInput } from "../components/HabitsInput";
import clsx from "clsx";

interface Params {
  date: string;
}

interface DayInfoProps {
  possibleHabits: {
    id: string;
    title: string;
  }[];

  completedHabits: string[];
}

export function Habit() {
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null);
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);

  const habitProgress = dayInfo?.possibleHabits.length
    ? generateProgressPercentage(
        dayInfo?.possibleHabits.length,
        completedHabits.length
      )
    : 0;

  const { date } = route.params as Params;

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format("dddd");
  const isDateInPast = parsedDate.endOf("day").isBefore(new Date());
  const dayAndMount = parsedDate.format("DD/MM");

  async function fetchHabits() {
    try {
      setLoading(true);

      const response = await api.get("/day", {
        params: {
          date,
        },
      });

      setDayInfo(response.data);
      setCompletedHabits(response.data.completedHabits);
    } catch (error) {
      return Alert.alert("Ops", "Não foi possivel buscar os dados d servidor");
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleHabit(habitId: string) {
    try {
      await api.patch(`/habits/${habitId}/toggle`);
      if (completedHabits.includes(habitId)) {
        setCompletedHabits((prevState) =>
          prevState.filter((habit) => habit !== habitId)
        );
      } else {
        setCompletedHabits((preveState) => [...preveState, habitId]);
      }
    } catch (error) {
      Alert.alert("Ops", "Não foi possivel concluir o hábito");
    }
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  if (loading) return <Loading />;

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

        <Progressbar progress={habitProgress} />

        <View
          className={clsx("mt-6", {
            "opacity-50": isDateInPast,
          })}
        >
          {dayInfo?.possibleHabits ? (
            dayInfo?.possibleHabits.map((day) => (
              <CheckBox
                key={day.id}
                title={day.title}
                onPress={() => handleToggleHabit(day.id)}
                checked={completedHabits.includes(day.id)}
                disabled={isDateInPast}
              />
            ))
          ) : (
            <HabitsInput />
          )}
        </View>

        {isDateInPast && (
          <Text className="text-white mt-10 text-center">
            Você só pode alterar o hábito do dia atual!
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
