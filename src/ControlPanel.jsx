import React, { useState, useEffect } from "react";
import { Lock, Unlock } from "lucide-react";
import {useNavigate} from "react-router";

const ControlPanel = () => {
    const [words, setWords] = useState([]);
    const navigate = useNavigate();
    const [terminalWords, setTerminalWords] = useState({});
    const [locked, setLocked] = useState(false);

    const getRandomChar = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        return chars[Math.floor(Math.random() * chars.length)];
    };

    useEffect(() => {
        fetch("/words.txt")
            .then((res) => res.text())
            .then((text) => {
                // nếu words.txt chứa danh sách từ, ví dụ mỗi từ 1 dòng
                const wordList = text.split("\n").map((w) => w.trim()).filter(Boolean);
                setWords(wordList);
            })
            .catch((err) => console.error("Lỗi load words.txt:", err));
    }, []);

    const Terminal = ({ number, word, onClick }) => {
        const rows = 15;
        const cols = 15;
        const [matrixLines, setMatrixLines] = useState(() =>
            Array.from({ length: rows }, () =>
                Array.from({ length: cols }, getRandomChar)
            )
        );

        useEffect(() => {
            if (word) return;
            const interval = setInterval(() => {
                setMatrixLines((prev) => {
                    const newMatrix = prev.map((row) => [...row]);
                    for (let i = 0; i < 5; i++) {
                        const r = Math.floor(Math.random() * rows);
                        const c = Math.floor(Math.random() * cols);
                        newMatrix[r][c] = getRandomChar();
                    }
                    return newMatrix;
                });
            }, 100);
            return () => clearInterval(interval);
        }, [word]);

        const handleClick = () => {
            if (!locked) {
                const newWord = words[Math.floor(Math.random() * words.length)];
                onClick(number, newWord);
            }
        };

        return (
            <div
                className={`relative bg-gradient-to-b from-amber-900 to-amber-950 rounded-lg p-4 border-4
          ${
                    locked
                        ? "border-gray-500 shadow-md shadow-gray-500/30"
                        : word
                            ? "border-red-500 shadow-lg shadow-red-500/50"
                            : "border-amber-700"
                }
          cursor-pointer transition-all duration-300 hover:border-amber-500`}
                onClick={handleClick}
            >
                {/* Screen */}
                <div className="relative z-10 bg-black rounded p-3 min-h-48 flex items-center justify-center overflow-hidden">
                    {word ? (
                        <span className="text-green-400 font-mono text-xl md:text-2xl tracking-widest">
              {word}
            </span>
                    ) : (
                        <div className="text-green-400 font-mono text-[8px] md:text-[10px] leading-relaxed tracking-widest whitespace-pre">
                            {matrixLines.map((row, idx) => (
                                <div key={idx}>{row.join(" ")}</div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Control Buttons */}
                <div className="flex justify-center mt-3 space-x-2">
                    <div className="w-6 h-6 bg-gray-600 rounded-full border border-gray-400"></div>
                    <div className="w-6 h-6 bg-gray-600 rounded-full border border-gray-400"></div>
                    <div className="w-6 h-6 bg-gray-600 rounded-full border border-gray-400"></div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-700 to-slate-900 p-4 md:p-8">
            {/* Hiện thông báo khi dọc */}
            <p className="block portrait:flex items-center justify-center text-white text-lg font-bold h-screen landscape:hidden">
                📱 Vui lòng xoay ngang
            </p>

            {/* Chỉ hiện panel khi ngang */}
            <div className="max-w-7xl mx-auto landscape:block portrait:hidden">
                <div className="bg-gradient-to-b from-slate-600 to-slate-800 rounded-lg p-4 md:p-6 shadow-2xl border border-slate-500">
                    {/* Terminal Grid Responsive */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[1, 2, 3, 4].map((num) => (
                            <div key={num} className="text-center">
                                <Terminal
                                    number={num}
                                    word={terminalWords[num]}
                                    onClick={(n, w) =>
                                        setTerminalWords((prev) => ({
                                            ...prev,
                                            [n]: w,
                                        }))
                                    }
                                />
                                {/* Terminal Number */}
                                <div className="text-white text-5xl md:text-7xl lg:text-8xl font-bold mt-4 font-mono tracking-wider">
                                    {num}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Lock Button */}
                    <div className="flex justify-center mt-5 space-x-2">
                        <button
                            onClick={() => setLocked(!locked)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-800 hover:bg-amber-700 text-white shadow-md transition-all"
                        >
                            {locked ? (
                                <>
                                    <Lock className="w-5 h-5" /> LOCK
                                </>
                            ) : (
                                <>
                                    <Unlock className="w-5 h-5" /> UNLOCK
                                </>
                            )}
                        </button>

                        <button
                            onClick={() => navigate('random')}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-800 hover:bg-amber-700 text-white shadow-md transition-all"
                        >
                            Random
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;
