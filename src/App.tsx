"use client";
import { useState, useEffect } from "react";

const MEMORY_IMAGES = [
  "https://i.imgur.com/CwHxmMx.jpeg", 
  "https://i.imgur.com/XvnwP6M.jpeg", 
  "https://i.imgur.com/vT2XlgT.jpeg", 
  "https://i.imgur.com/yc9iNN3.jpeg", 
];

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [step, setStep] = useState(0);
  const [userInput, setUserInput] = useState("");
  
  const [cards, setCards] = useState<{id: number, url: string, flipped: boolean, matched: boolean}[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCount, setMatchedCount] = useState(0);

  const yesButtonSize = noCount * 20 + 16;

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

  useEffect(() => {
    if (matchedCount === 4 && step === 2) {
      setTimeout(() => setStep(3), 1500);
    }
  }, [matchedCount, step]);

  const getNoButtonText = () => {
    const phrases = ["No", "Sei sicura?", "Sicura sicura?", "Pensaci bene!", "Ultima occasione!", "Davvero no?", "Potresti pentirti!", "Riflettici un attimo!", "Sei assolutamente certa?", "Potrebbe essere un errore!", "Dai, prova ad avere un cuore!", "Non essere così fredda!", "Cambiato idea?", "Non vuoi ripensarci?", "È la tua risposta definitiva?", "Mi stai spezzando il cuore ;("];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-pink-50">
      
      {/* STEP 0: DOMANDA INIZIALE */}
      {step === 0 && (
        <div className="flex flex-col items-center w-full max-w-4xl">
          {/* Layout immagini: colonna su mobile, riga su desktop */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
            <img className="h-40 md:h-60 w-auto rounded-2xl shadow-xl object-cover" src="https://i.imgur.com/0qDwtLV.jpeg" alt="foto 1" />
            <img className="h-48 md:h-72 w-auto" src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif" alt="bear" />
            <img className="h-40 md:h-60 w-auto rounded-2xl shadow-xl object-cover" src="https://i.imgur.com/UVK3kTW.jpeg" alt="foto 2" />
          </div>
          
          <h1 className="text-2xl md:text-4xl font-bold text-center italic mb-8 px-2">
            Buon San Valentino Amore ❤️, vuoi scoprire cosa ti ho preparato?
          </h1>
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            <button 
              className="rounded bg-green-500 px-8 py-4 font-bold text-white hover:bg-green-700 transition-all shadow-lg" 
              style={{ fontSize: yesButtonSize }}
              onClick={() => setStep(1)}
            >
              Sì
            </button>
            <button 
              onClick={() => setNoCount(noCount + 1)} 
              className="rounded bg-red-500 px-6 py-3 font-bold text-white hover:bg-red-700 text-lg"
            >
              {noCount === 0 ? "No" : getNoButtonText()}
            </button>
          </div>
        </div>
      )}

      {/* STEP 1: PAROLA CHIAVE */}
      {step === 1 && (
        <div className="flex flex-col items-center w-full px-4">
          {/*<img className="h-48 mb-6" src="https://media.tenor.com/T_7_7vA696AAAAAi/bear-cute.gif" alt="wait" />*/}
          <h2 className="text-2xl md:text-3xl font-bold text-pink-600 mb-6 text-center">Completa la frase magica:</h2>
          <p className="text-3xl md:text-3xl mb-6 tracking-[0.2em] font-mono font-bold text-pink-400">_ - _ _ _ _ - _ _ _</p>
          <input 
            type="text" 
            className="w-full max-w-sm border-4 border-pink-300 rounded-full px-6 py-4 text-xl text-center focus:outline-none focus:border-pink-500 shadow-md" 
            value={userInput} 
            onChange={(e) => {
              setUserInput(e.target.value);
              if (e.target.value.toUpperCase() === "I LOVE YOU") setTimeout(() => setStep(2), 500);
            }} 
            autoFocus 
          />
        </div>
      )}

      {/* STEP 2: MEMORY RESPONSIVE */}
      {step === 2 && (
        <div className="flex flex-col items-center w-full max-w-screen-md">
          <h2 className="text-2xl md:text-3xl font-bold text-pink-600 mb-6 text-center px-2">Trova le coppie delle nostre foto! ❤️</h2>
          
          {/* Grid: 2 colonne su mobile, 4 su desktop per evitare overflow */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 p-2">
            {cards.map((card, index) => (
              <div 
                key={index} 
                onClick={() => handleCardClick(index)}
                className={`w-32 h-32 md:w-40 md:h-40 cursor-pointer rounded-2xl transition-all shadow-lg flex items-center justify-center text-white text-4xl ${card.flipped || card.matched ? 'bg-white' : 'bg-pink-400'}`}
              >
                {card.flipped || card.matched ? (
                  <img src={card.url} className="w-full h-full object-cover rounded-2xl border-2 border-pink-200" />
                ) : "❤️"}
              </div>
            ))}
          </div>
          <p className="mt-8 font-bold text-pink-500 text-xl animate-pulse">Coppie: {matchedCount} / 4</p>
        </div>
      )}

      {/* STEP 3: PAGINA FINALE */}
      {step === 3 && (
        <div className="flex flex-col items-center text-center max-w-2xl px-4 animate-fadeIn py-10">
          <img className="h-48 md:h-64 mb-6" src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" alt="kiss" />
          <div className="text-3xl md:text-5xl font-bold text-pink-600 mb-6">BRAVISSIMA AMORE!! ❤️</div>
          <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-2xl border-2 border-pink-100 w-full">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic whitespace-pre-line text-left md:text-center">
              {`Caro amorino patatino,
              In questo momento di lontananza ho pensato a diverse idee per cercare di sorprenderti (e te in questo momento starai pensando e perché allora non sei venuto qua? E effettivamente hai anche ragione ahahah) ho così pensato di farti qualcosa di alternativo ma allo stesso tempo semplice ovvero scriverti qualcosa.
              Anche se magari alcune volte può non sembrare, mi manchi tanto e non è facile. 
              Grazie per tutto il supporto che mi dai nonostante la distanza.
              Non vedo l’ora di poter mangiare di nuovo una pizza con te, ti amo tanto.

              Enrico
              
              PS. Vediamo se ti ricordi dove sono state fatte le foto che ho messo`}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}