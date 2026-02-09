"use client";
import { useState } from "react";

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const yesButtonSize = noCount * 20 + 16;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Sei sicura?",
      "Sicura sicura?",
      "Pensaci bene!",
      "Ultima occasione!",
      "Davvero no?",
      "Potresti pentirti!",
      "Riflettici un attimo!",
      "Sei assolutamente certa?",
      "Potrebbe essere un errore!",
      "Dai, prova ad avere un cuore!",
      "Non essere così fredda!",
      "Cambiato idea?",
      "Non vuoi ripensarci?",
      "È la tua risposta definitiva?",
      "Mi stai spezzando il cuore ;(",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <div className="-mt-16 flex h-screen flex-col items-center justify-center p-4">
      {yesPressed ? (
        <>
          <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" alt="kiss" />
          <div className="my-4 text-4xl font-bold text-pink-600 text-center">
            WOOOOOO!!! Ti amo pookie!! ❤️ ;))
          </div>
        </>
      ) : (
        <>
          {/* SEZIONE IMMAGINI: GIF Centrale con due foto ai lati */}
          <div className="flex items-center justify-center gap-2 md:gap-6 mb-4">
            {/* Foto Sinistra */}
            <img 
              className="h-[100px] md:h-[150px] rounded-2xl shadow-md object-cover" 
              src="public/foto1.jpg" 
              alt="foto 1" 
            />

            {/* GIF Centrale */}
            <img
              className="h-[150px] md:h-[200px]"
              src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
              alt="bear with roses"
            />

            {/* Foto Destra */}
            <img 
              className="h-[100px] md:h-[150px] rounded-2xl shadow-md object-cover" 
              src="https://imgur.com/a/41dglcr" 
              alt="foto 2" 
            />
          </div>

          <h1 className="my-4 text-4xl font-bold text-center">Vuoi essere la mia Valentina?</h1>
          
          <div className="flex items-center">
            <button
              className="mr-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 transition-all"
              style={{ fontSize: yesButtonSize }}
              onClick={() => setYesPressed(true)}
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
    </div>
  );
}
