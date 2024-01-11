export const ParsedText = ({ text }: any) => {
  const splitText = text.split(" ");
  return (
    <>
      {splitText.map((text: string) => (
        <>
          {text[0] === "#" ? (
            <span className="font-semibold text-[#fe8040] cursor-pointer mx-1">
              {text}
            </span>
          ) : (
            <span className="mx-[2px]">{text}</span>
          )}
        </>
      ))}
    </>
  );
};

export default ParsedText;
