type Props = {
  line1?: string;
  line2?: string;
  /** Horizontal corner the badge anchors to. */
  side?: "left" | "right";
  /** Visual style: "solid" = opaque dark square, "glass" = translucent blurred. */
  tone?: "solid" | "glass";
  /** Extra classes appended to the badge container (e.g. shadow). */
  className?: string;
  /** Extra classes appended to the text span (e.g. padding). */
  textClassName?: string;
};

const CornerBadge = ({
  line1,
  line2,
  side = "right",
  tone = "solid",
  className = "",
  textClassName = "",
}: Props) => {
  const position =
    side === "right"
      ? "right-2 sm:-right-5"
      : "left-2 sm:-left-5";

  const toneClasses =
    tone === "solid"
      ? "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-neutral-900"
      : "w-20 h-20 sm:w-24 sm:h-24 bg-neutral-700/60 backdrop-blur-sm";

  const textSize =
    tone === "solid"
      ? "text-xs sm:text-sm"
      : "text-[10px] sm:text-xs";

  return (
    <div
      className={`absolute ${position} bottom-2 sm:-bottom-5 ${toneClasses} rounded-lg flex items-center justify-center${className ? ` ${className}` : ""}`}
    >
      <span
        className={`text-white font-light ${textSize} text-center leading-snug${textClassName ? ` ${textClassName}` : ""}`}
      >
        {line1}
        <br />
        {line2}
      </span>
    </div>
  );
};

export default CornerBadge;
