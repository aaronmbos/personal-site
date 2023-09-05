import { icons } from "../types/icons";
import ButtonIcon from "./button-icon";
import { useState } from "react";

interface Props {
  url: string;
}

function ClipboardButton({ url }: Props) {
  const [clip, setClip] = useState({ text: "Copy link", isCopied: false });

  function copyToClipboard(url: string) {
    if (document.getElementById("clip")?.classList.contains("hidden")) {
      return;
    }
    navigator.clipboard.writeText(url);
    window.setTimeout(() => {
      setClip({ text: "Copy link", isCopied: false });
    }, 1000);

    setClip({ text: "Copied!", isCopied: true });
  }

  return (
    <button
      id="clip-btn"
      type="button"
      className={`text-sm mb-3 mr-2 py-2 px-3 rounded-lg bg-gray-100 dark:bg-stone-900 hover:ring-2 ring-stone-400 transition-all`}
      onClick={() => copyToClipboard(url)}
    >
      <ButtonIcon
        id="clip"
        fill="currentColor"
        path={icons.emptyClipboard}
        dimensions={[17, 17]}
        classList={clip.isCopied ? ["hidden"] : []}
      />
      <ButtonIcon
        id="clipped"
        fill="currentColor"
        path={icons.copiedClipboard}
        classList={clip.isCopied ? [] : ["hidden"]}
        dimensions={[17, 17]}
      />{" "}
      <span id="clip-text" className="text-sm ml-1">
        {clip.text}
      </span>
    </button>
  );
}

export default ClipboardButton;
