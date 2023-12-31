"use client";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import theme from "prism-react-renderer";
import clsx from "clsx";

interface CodeProps {
  placeHolder: string;
  initialValue?: string;
}

const Code: FC<CodeProps> = ({ placeHolder, initialValue }) => {
  const preRef = useRef<HTMLPreElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<string>("");
  const [isTextareaFocus, setIsTextareaFocus] = useState<boolean>(true);
  useEffect(() => {
    if (containerRef.current && preRef.current && textareaRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      const preHeight = preRef.current?.clientHeight;

      textareaRef.current.style.height = `${Math.max(
        containerHeight,
        preHeight
      )}px`;
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className={clsx()}>
      <textarea
        className="w-1/2 resize-none text-black"
        placeholder={placeHolder}
        value={value}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default Code;
