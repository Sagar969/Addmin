import { cn } from "../../lib/utils/cn";

export default function PageTitle({
  title = "",
  caption = "",
  extra = null,
  className = "",
  sticky = false,
}) {
  return (
    <>
      <div
        className={cn(
          "flex items-center justify-between gap-10 py-4 px-3",
          sticky ? "stickyBar" : "",
          className
        )}
      >
        <div className="flex flex-col">
          <h2 className="text-xl sm:text-2xl font-semibold">{title}</h2>
          <p className="opacity-70">{caption}</p>
        </div>
        {extra}
      </div>
    </>
  );
}
