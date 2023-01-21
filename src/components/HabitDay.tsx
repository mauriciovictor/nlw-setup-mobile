import { TouchableOpacity, Dimensions } from "react-native";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
  Dimensions.get("screen").width / 7 - (DAY_MARGIN_BETWEEN + 5);

export function HabitDay() {
  return (
    <TouchableOpacity
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800"
      activeOpacity={0.7}
    />
  );
}
