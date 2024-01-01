import { FC, Fragment } from "react";
import type { LanguageName } from "@uiw/codemirror-extensions-langs";
import { ThemeDefinition } from "@/lib/types";
import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface SelectProps<T> {
  type: "language" | "theme";
  initialValue: T;
  setValue: (_: T) => void;
  options: T[];
}

function ThemeBubble({ color }: { color: string }) {
  return (
    <span
      className={clsx("block h-4 w-4 rounded-full bg-gradient-to-br", color)}
    />
  );
}

const Select: FC<SelectProps<ThemeDefinition | LanguageName>> = ({
  type,
  initialValue,
  setValue,
  options,
}) => {
  return (
    <Listbox value={initialValue} onChange={setValue}>
      <div className="relative">
        <Listbox.Button
          className={clsx(
            "flex select-none justify-between gap-3 rounded-lg p-2 text-xs",
            "border-[1px] border-white/20 bg-black",
            "hover:cursor-pointer hover:bg-white/20 focus:outline-none"
          )}
        >
          {type === "language" ? (
            <span>{initialValue as LanguageName}</span>
          ) : (
            <ThemeBubble color={(initialValue as ThemeDefinition).label} />
          )}
          <span className="pointer-events-none">
            <ChevronDownIcon className="h-3 w-3" aria-hidden="true" />

            <Transition
              as={Fragment}
              enter="transition-all transform ease-in-out duration-200"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100"
              leave="transition-all transform ease-in-out duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0 scale-90"
            >
              <Listbox.Options
                className={clsx(
                  "absolute z-10 max-h-80 -translate-y-3/4 space-y-1 overflow-auto rounded-xl p-2",
                  "border-[1px] border-white/20 bg-black"
                )}
              >
                {options.map((option, i) => (
                  <Listbox.Option
                    key={`${type}-${i}`}
                    value={option}
                    className={clsx(
                      "flex items-center gap-3 rounded-lg p-2 text-xs",
                      "cursor-pointer select-none",
                      "transition-colors duration-200 ease-in-out"
                    )}
                  >
                    {type === "language" ? (
                      <span className="block truncate pr-3">
                        {option as LanguageName}
                      </span>
                    ) : (
                      <>
                        <ThemeBubble
                          color={(option as ThemeDefinition).label}
                        />
                        <span className="block truncate">
                          {(option as ThemeDefinition).label}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </span>
        </Listbox.Button>
      </div>
    </Listbox>
  );
};

export default Select;
