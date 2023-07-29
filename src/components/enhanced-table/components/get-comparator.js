import { DescendingComparator } from "./descending-comparator";

export function GetComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => DescendingComparator(a, b, orderBy)
    : (a, b) => -DescendingComparator(a, b, orderBy);
}
