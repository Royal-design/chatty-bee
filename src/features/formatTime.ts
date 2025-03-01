import { format, parse, isValid } from "date-fns";
import { Timestamp } from "firebase/firestore";

export const formatTime = (input: any) => {
  let date: Date;

  if (input instanceof Timestamp) {
    date = input.toDate();
  } else if (typeof input === "number") {
    date = new Date(input);
  } else if (typeof input === "string") {
    const parsedDate = parse(
      input,
      "MMMM d, yyyy 'at' h:mm:ss a 'UTC'X",
      new Date()
    );
    if (isValid(parsedDate)) {
      date = parsedDate;
    } else {
      console.error("Invalid Firebase timestamp string:", input);
      return "Invalid date";
    }
  } else {
    console.error("Invalid input type:", input);
    return "Invalid input";
  }

  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / 3600000;

  if (diffInHours < 24) {
    return format(date, "h:mm a");
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;

  return format(date, "MMMM d, yyyy");
};
