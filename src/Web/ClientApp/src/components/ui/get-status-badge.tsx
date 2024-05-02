("use client");
import { Badge } from "rizzui";
import cn from "../../utils/class-names";
export default function GetStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case "update":
      return (
        <Badge
          color="success"
          variant="flat"
          size="sm"
          className={cn(
            "border border-green px-2 py-0.5  text-xs font-normal capitalize tracking-wider dark:bg-green dark:bg-opacity-40 dark:text-gray-900 dark:text-opacity-90 dark:backdrop-blur",
            "bg-opacity-50"
          )}
        >
          {status}
        </Badge>
      );
    default:
      return (
        <Badge
          color="danger"
          variant="flat"
          size="sm"
          className={cn(
            "border border-red px-2 py-0.5  text-xs font-normal capitalize tracking-wider dark:bg-red dark:bg-opacity-40 dark:text-gray-900 dark:text-opacity-90 dark:backdrop-blur",
            "bg-opacity-50"
          )}
        >
          {status}
        </Badge>
      );
  }
}
