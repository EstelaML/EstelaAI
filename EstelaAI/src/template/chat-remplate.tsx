import { useState } from "react";
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from "../components";

interface Message {
  text: string;
  isGpt: boolean;
}

export const ChatTemplate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async(text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false}])
  
    // TODO Llamar usecase 
    
    setIsLoading(false);

    // TODO Añadir mensaje isGpt True
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">

          <GptMessage text="Hola, puedes escribir texto en español y te ayudaré con las correcciones"></GptMessage>

          {messages.map((message, index) => (
            message.isGpt
              ? (
                <GptMessage key={index} text={message.text}></GptMessage>
              )
              : (<MyMessage key={index} text={message.text}></MyMessage>)
          ))}

          {
            isLoading
            &&
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader className="fade-in"></TypingLoader>
            </div>
          }
        </div>
      </div>

      <TextMessageBox
        placeholder="Escribe lo que deseas"
        disableCorrections
        onSendMessage={handlePost}
      />

    </div>
  )
}