import { cn } from "../../lib/utils/cn";
import { Spin } from "antd";
export default function Loading({ className }) {
  return (
    <div
      className={cn(
        "w-full h-full flex justify-center items-center pt-40",
        className
      )}
    >
      <Spin />
    </div>
  );
}