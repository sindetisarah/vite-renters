import moment from "moment";
import {
  addMonths,
  subDays,
  addDays,
  addYears,
  subYears,
  subMonths,
  format,
  startOfDay,
  endOfDay,
  // startOfISOWeek,
  startOfWeek,
  endOfWeek,
  // endOfISOWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  subWeeks,
} from "date-fns";

const today = new Date();
class RangeDate {
  static Today = moment(today).format("YYYY-MM-DDTHH:mm:ss");
  static Yesterday = moment(subDays(today, 1)).format("YYYY-MM-DDTHH:mm:ss");
  static InThreeDays = moment(addDays(today, 3)).format("YYYY-MM-DDTHH:mm:ss");
  static InSevenDays = moment(addDays(today, 7)).format("YYYY-MM-DDTHH:mm:ss");
  static StartDay = moment(startOfDay(today)).format("YYYY-MM-DDTHH:mm:ss");
  static EndDay = moment(endOfDay(today)).format("YYYY-MM-DDTHH:mm:ss");
  static StartWeek = moment(startOfWeek(today)).format("YYYY-MM-DDTHH:mm:ss");
  static EndWeek = moment(endOfWeek(today)).format("YYYY-MM-DDTHH:mm:ss");
  static StartMonth = moment(startOfMonth(today)).format("YYYY-MM-DDTHH:mm:ss");
  static EndMonth = moment(endOfMonth(today)).format("YYYY-MM-DDTHH:mm:ss");
  static StartYear = moment(startOfYear(today)).format("YYYY-MM-DDTHH:mm:ss");
  static EndYear = moment(today).format("YYYY-MM-DDTHH:mm:ss");

  static StartLastWeek = moment(startOfWeek(subWeeks(today, 1))).format(
    "YYYY-MM-DDTHH:mm:ss"
  );
  static EndLastWeek = moment(endOfWeek(subWeeks(today, 1))).format(
    "YYYY-MM-DDTHH:mm:ss"
  );
  static AfterOneMonth = moment(addMonths(today, 1)).format(
    "YYYY-MM-DDTHH:mm:ss"
  );
  static StartDayYesterday = moment(startOfDay(subDays(today, 1))).format(
    "YYYY-MM-DDTHH:mm:ss"
  );
  static EndDayYesterday = moment(endOfDay(subDays(today, 1))).format(
    "YYYY-MM-DDTHH:mm:ss"
  );
  static StartOfLastMonth = moment(startOfMonth(subMonths(today, 1))).format(
    "YYYY-MM-DDTHH:mm:ss"
  );
  static EndOfLastMonth = moment(endOfMonth(subMonths(today, 1))).format(
    "YYYY-MM-DDTHH:mm:ss"
  );
  static StartOfNextMonth = moment(startOfMonth(addMonths(today, 1))).format(
    "YYYY-MM-DDTHH:mm:ss"
  );
  static EndOfNextMonth = moment(endOfMonth(addMonths(today, 1))).format(
    "YYYY-MM-DDTHH:mm:ss"
  );
  static EndOfQuarter = moment(endOfMonth(addMonths(today, 3))).format(
    "YYYY-MM-DDTHH:mm:ss"
  );
  static EndOfSemianual = moment(endOfMonth(addMonths(today, 6))).format(
    "YYYY-MM-DDTHH:mm:ss"
  );
  static EndOfAnual = moment(endOfMonth(addMonths(today, 12))).format(
    "YYYY-MM-DDTHH:mm:ss"
  );
}
export default RangeDate;
