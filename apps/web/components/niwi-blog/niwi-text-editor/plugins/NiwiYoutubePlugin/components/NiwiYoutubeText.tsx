import { NiwiYoutubeTextPropsType } from "../nodes/NiwiYoutubeTextNode";

type NiwiYoutubeTextProps = NiwiYoutubeTextPropsType & { nodeKey: string };

function NiwiYoutubeText({ placeholder }: NiwiYoutubeTextProps) {
  return (
    <>
      <input className="" placeholder={placeholder} />
    </>
  );
}
export default NiwiYoutubeText;
