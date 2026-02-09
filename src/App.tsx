"use client";
import { useState } from "react";

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [step, setStep] = useState(0); // 0: Domanda, 1: Gioco frase, 2: Messaggio finale
  const [userInput, setUserInput] = useState("");
  
  const yesButtonSize = noCount * 20 + 16;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const checkPhrase = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUserInput(val);
    // Appena scrive "I LOVE YOU" passa alla pagina finale
    if (val.toUpperCase() === "I LOVE YOU") {
      setTimeout(() => setStep(2), 500);
    }
  };

  const getNoButtonText = () => {
    const phrases = [
      "No", "Sei sicura?", "Sicura sicura?", "Pensaci bene!",
      "Ultima occasione!", "Davvero no?", "Potresti pentirti!",
      "Riflettici un attimo!", "Sei assolutamente certa?",
      "Potrebbe essere un errore!", "Dai, prova ad avere un cuore!",
      "Non essere così fredda!", "Cambiato idea?",
      "Non vuoi ripensarci?", "È la tua risposta definitiva?",
      "Mi stai spezzando il cuore ;(",
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <div className="-mt-16 flex h-screen flex-col items-center justify-center p-4">
      
      {/* STEP 0: LA TUA PAGINA CON LE FOTO CHE FUNZIONANO */}
      {step === 0 && (
        <>
          <div className="flex items-center justify-center gap-2 md:gap-6 mb-4">
            {/* Foto Sinistra - TUO LINK */}
            <img 
              className="h-[150px] md:h-[250px] w-auto rounded-2xl shadow-2xl object-cover" 
              src="https://i.imgur.com/0qDwtLV.jpeg" 
              alt="foto 1" 
            />

            {/* GIF Centrale */}
            <img
              className="h-[200px] md:h-[300px] w-auto"
              src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
              alt="bear with roses"
            />

            {/* Foto Destra - TUO LINK */}
            <img 
              className="h-[150px] md:h-[250px] w-auto rounded-2xl shadow-2xl object-cover" 
              src="https://i.imgur.com/UVK3kTW.jpeg" 
              alt="foto 2" 
            />
          </div>

          <h1 className="my-4 text-4xl font-bold text-center">
            Buon San Valentino Amore ❤️, vuoi scoprire cosa ti ho preparato?
          </h1>
          
          <div className="flex items-center">
            <button
              className="mr-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 transition-all"
              style={{ fontSize: yesButtonSize }}
              onClick={() => setStep(1)}
            >
              Sì
            </button>
            <button
              onClick={handleNoClick}
              className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            >
              {noCount === 0 ? "No" : getNoButtonText()}
            </button>
          </div>
        </>
      )}

      {/* STEP 1: IL GIOCO "I LOVE YOU" */}
      {step === 1 && (
        <div className="flex flex-col items-center">
          <img className="h-[200px] mb-4" src="https://media.tenor.com/T_7_7vA696AAAAAi/bear-cute.gif" alt="waiting bear" />
          <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">
            Per continuare, completa la frase magica:
          </h2>
          <p className="text-2xl mb-4 tracking-widest font-mono font-bold">I _ _ _ _ _ _ U</p>
          <input
            type="text"
            placeholder="Scrivi qui..."
            className="border-4 border-pink-300 rounded-full px-6 py-3 text-xl text-center focus:outline-none focus:border-pink-500 transition-all shadow-lg"
            value={userInput}
            onChange={checkPhrase}
            autoFocus
          />
        </div>
      )}

      {/* STEP 2: PAGINA FINALE POOKIE */}
      {step === 2 && (
        <div className="flex flex-col items-center text-center max-w-lg">
          <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" alt="kiss" />
          <div className="my-4 text-5xl font-bold text-pink-600">
            BRAVISSIMA POOKIE!! ❤️
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-xl border-2 border-pink-200">
            <p className="text-xl text-gray-700 leading-relaxed italic">
              "Qui inserisci il tuo messaggio speciale. Ad esempio: 
              Sei la mia persona preferita e questo è solo l'inizio della nostra sorpresa..."
            </p>
          </div>
        </div>
      )}

    </div>
  );
}