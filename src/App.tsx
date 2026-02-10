"use client";
import { useState, useEffect } from "react";

// --- CONFIGURAZIONE FOTO MEMORY ---
// Ho messo le tue 2 foto ripetute, ma puoi aggiungere altri link qui sotto
const MEMORY_IMAGES = [
  "https://i.imgur.com/CwHxmMx.jpeg", 
  "https://i.imgur.com/XvnwP6M.jpeg", 
  "https://i.imgur.com/vT2XlgT.jpeg", 
  "https://i.imgur.com/yc9iNN3.jpeg", 
];

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [step, setStep] = useState(0); // 0: Domanda, 1: Frase, 2: Memory, 3: Finale
  const [userInput, setUserInput] = useState("");
  
  // Stati per il gioco Memory
  const [cards, setCards] = useState<{id: number, url: string, flipped: boolean, matched: boolean}[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCount, setMatchedCount] = useState(0);

  const yesButtonSize = noCount * 20 + 16;

  // Inizializza il Memory quando arriva allo step 2
  useEffect(() => {
    if (step === 2) {
      const shuffledCards = [...MEMORY_IMAGES, ...MEMORY_IMAGES]
        .map((url, index) => ({ id: index, url, flipped: false, matched: false }))
        .sort(() => Math.random() - 0.5);
      setCards(shuffledCards);
    }
  }, [step]);

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || cards[index].flipped || cards[index].matched) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].url === cards[second].url) {
        newCards[first].matched = true;
        newCards[second].matched = true;
        setCards(newCards);
        setFlippedCards([]);
        setMatchedCount(prev => prev + 1);
      } else {
        setTimeout(() => {
          newCards[first].flipped = false;
          newCards[second].flipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 800);
      }
    }
  };

  // Quando finisce il memory passa al finale
  useEffect(() => {
    if (matchedCount === 4 && step === 2) {
      setTimeout(() => setStep(3), 1500);
    }
  }, [matchedCount, step]);

  const handleNoClick = () => setNoCount(noCount + 1);

  const getNoButtonText = () => {
    const phrases = [
      "No", "Sei sicura?", "Sicura sicura?", "Pensaci bene!", "Ultima occasione!", 
      "Davvero no?", "Potresti pentirti!", "Riflettici un attimo!", "Sei assolutamente certa?", 
      "Potrebbe essere un errore!", "Dai, prova ad avere un cuore!", "Non essere così fredda!", 
      "Cambiato idea?", "Non vuoi ripensarci?", "È la tua risposta definitiva?", "Mi stai spezzando il cuore ;("
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <div className="-mt-16 flex min-h-screen flex-col items-center justify-center p-4">
      
      {/* STEP 0: DOMANDA INIZIALE (CON LE TUE FOTO) */}
      {step === 0 && (
        <>
          <div className="flex items-center justify-center gap-2 md:gap-6 mb-4">
            <img className="h-[150px] md:h-[250px] w-auto rounded-2xl shadow-2xl object-cover" src="https://i.imgur.com/0qDwtLV.jpeg" alt="foto 1" />
            <img className="h-[200px] md:h-[300px] w-auto" src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif" alt="bear" />
            <img className="h-[150px] md:h-[250px] w-auto rounded-2xl shadow-2xl object-cover" src="https://i.imgur.com/UVK3kTW.jpeg" alt="foto 2" />
          </div>
          <h1 className="my-4 text-4xl font-bold text-center italic">Buon San Valentino Amore, vuoi scoprire cosa ti ho preparato?</h1>
          <div className="flex items-center">
            <button className="mr-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 transition-all" style={{ fontSize: yesButtonSize }} onClick={() => setStep(1)}>Sì</button>
            <button onClick={handleNoClick} className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700">
              {noCount === 0 ? "No" : getNoButtonText()}
            </button>
          </div>
        </>
      )}

      {/* STEP 1: PAROLA CHIAVE */}
      {step === 1 && (
        <div className="flex flex-col items-center">
          <img className="h-[200px] mb-4" src="https://media.tenor.com/T_7_7vA696AAAAAi/bear-cute.gif" alt="wait" />
          <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">Completa la frase magica:</h2>
          <p className="text-2xl mb-4 tracking-widest font-mono font-bold">I _ _ _ _ _ _ U</p>
          <input 
            type="text" 
            className="border-4 border-pink-300 rounded-full px-6 py-3 text-xl text-center focus:outline-none focus:border-pink-500 shadow-inner" 
            value={userInput} 
            onChange={(e) => {
              setUserInput(e.target.value);
              if (e.target.value.toUpperCase() === "I LOVE YOU") setTimeout(() => setStep(2), 500);
            }} 
            autoFocus 
          />
        </div>
      )}

      {/* STEP 2: MEMORY CON LE VOSTRE FOTO */}
      {step === 2 && (
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold text-pink-600 mb-6">Trova le coppie delle nostre foto! ❤️</h2>
          <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-md">
            {cards.map((card, index) => (
              <div 
                key={index} 
                onClick={() => handleCardClick(index)}
                className={`w-34 h-34 md:w-50 md:h-50 cursor-pointer rounded-xl transition-all shadow-lg flex items-center justify-center text-white text-3xl ${card.flipped || card.matched ? 'bg-white' : 'bg-pink-400'}`}
              >
                {card.flipped || card.matched ? (
                  <img src={card.url} className="w-full h-full object-cover rounded-xl border-2 border-pink-200" />
                ) : "❤️"}
              </div>
            ))}
          </div>
          <p className="mt-6 font-bold text-pink-500 text-xl animate-pulse">Coppie: {matchedCount} / 4</p>
        </div>
      )}

      {/* STEP 3: PAGINA FINALE */}
      {step === 3 && (
        <div className="flex flex-col items-center text-center max-w-lg animate-fadeIn">
          <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" alt="kiss" />
          <div className="my-4 text-5xl font-bold text-pink-600">BRAVISSIMA AMORE!! ❤️</div>
          <div className="bg-white p-8 rounded-3xl shadow-2xl border-2 border-pink-100">
            <p className="text-2xl text-gray-700 leading-relaxed italic">
              "Sei stata bravissima a superare tutte le sfide! Sei la mia Valentina speciale..."
            </p>
          </div>
        </div>
      )}

    </div>
  );
}