import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChatContext } from "@/features/chat/chat-ui/chat-context";
import { Loader, Send } from "lucide-react";
import { FC, FormEvent, useRef } from "react";
import { Microphone } from "../chat-speech/microphone";
import { useChatInputDynamicHeight } from "./use-chat-input-dynamic-height";

interface Props {}

const ChatInput: FC<Props> = (props) => {
  const { setInput, handleSubmit, isLoading, input } = useChatContext();
  const DISCLAIMER_TEXT =  process.env.NEXT_PUBLIC_DISCLAIMER_TEXT ?? '';
  const DISCLAIMER_TEXT_POSITION = process.env.NEXT_PUBLIC_DISCLAIMER_TEXT_POSITION ?? "above";

  const buttonRef = useRef<HTMLButtonElement>(null);
  const { rows, resetRows, onKeyDown, onKeyUp } = useChatInputDynamicHeight({
    buttonRef,
  });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e);
    resetRows();
    setInput("");
  };

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  return (
    <form
      onSubmit={submit}
      className="absolute bottom-0 w-full flex items-center"
    >
      <div className="grid grid-cols-1 w-full items-center container mx-auto max-w-3xl justify-center h-full gap-1">
        { (DISCLAIMER_TEXT_POSITION === "above") && {DISCLAIMER_TEXT} && (
          <div className="container" dangerouslySetInnerHTML={{ __html: DISCLAIMER_TEXT}} />
        )}
        <div className="container mx-auto max-w-4xl relative py-2 flex gap-2 items-end">
          <Textarea
            rows={rows}
            value={input}
            placeholder="Send a message"
            className="min-h-fit bg-background shadow-sm resize-none py-4 pr-[80px]"
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            onChange={onChange}
          ></Textarea>
          <div className="absolute right-0 bottom-0 px-8 flex items-end h-full mr-2 mb-4">
            <Microphone disabled={isLoading} />
            <Button
              size="icon"
              type="submit"
              variant={"ghost"}
              ref={buttonRef}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="animate-spin" size={16} />
              ) : (
                <Send size={16} />
              )}
            </Button>
          </div>
        </div>
        { (DISCLAIMER_TEXT_POSITION === "below") && {DISCLAIMER_TEXT} && (
          <div className="container" dangerouslySetInnerHTML={{ __html: DISCLAIMER_TEXT}} />
        )}  
      </div>
    </form>
  );
};

export default ChatInput;
