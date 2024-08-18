import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

const dateUtil = dayjs;

export default dateUtil;
