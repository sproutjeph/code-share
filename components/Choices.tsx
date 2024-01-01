import { ChoiceDefinition } from "@/lib/types";
import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import { FC } from "react";

interface ChoicesProps {
  choices: ChoiceDefinition[];
  initialValue: ChoiceDefinition;
  setValue: (_: ChoiceDefinition) => void;
}

const Choices: FC<ChoicesProps> = ({ choices, initialValue, setValue }) => {
  return (
    <RadioGroup value={initialValue} onChange={setValue}>
      <div className="flex gap-3 py-[7px] text-sm">
        {choices.map((choice) => (
          <RadioGroup.Option
            value={choice}
            key={choice.label}
            className={clsx("cursor-pointer select-none rounded-md")}
          >
            <span
              className={clsx(
                "rounded-md py-1 px-2",
                "transition-colors duration-300 ease-in-out"
              )}
            >
              {choice.label}
            </span>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default Choices;
