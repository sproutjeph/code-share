"use client";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import clsx from "clsx";

interface CodeProps {
  initialValue?: string;
}

const Code: FC<CodeProps> = ({ initialValue }) => {
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
    <div
      className={clsx(
        isTextareaFocus ? "border-pink-400" : "border-white/20",
        "h-2/3 w-2/3 max-w-4xl rounded-xl border-[1px] py-4",
        "transition-colors duration-300 ease-in-out"
      )}
    >
      <div ref={containerRef} className="relative h-full w-full overflow-auto">
        <Highlight theme={themes.nightOwl} language="jsx" code={value}>
          {({ className, tokens, getLineProps, getTokenProps }) => (
            <>
              <textarea
                ref={textareaRef}
                value={value}
                placeholder="Add some code here..."
                onChange={(e) => handleChange(e)}
                spellCheck={false}
                onFocus={() => setIsTextareaFocus(true)}
                onBlur={() => setIsTextareaFocus(false)}
                className={clsx(
                  "absolute w-full resize-none overflow-hidden whitespace-pre-wrap break-keep break-words bg-transparent pl-16 pr-3 font-mono text-transparent",
                  "caret-pink-500 selection:bg-pink-500/30 placeholder:text-white/20 focus:outline-none"
                )}
              />
              <pre
                ref={preRef}
                aria-hidden={true}
                className={clsx(
                  className,
                  "pointer-events-none absolute w-full select-none pr-3"
                )}
              >
                {tokens.map((line, i) => (
                  <div
                    key={i}
                    {...getLineProps({ line, key: i })}
                    className="table-row"
                  >
                    <span className="table-cell w-10 select-none text-right opacity-50">
                      {i + 1}
                    </span>
                    <code className="table-cell whitespace-pre-wrap break-words break-keep pl-6">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </code>
                  </div>
                ))}{" "}
              </pre>
            </>
          )}
        </Highlight>
      </div>
    </div>
  );
};

export default Code;
