import { useState } from "react";

export default function RandomPage() {
    const [code, setCode] = useState("");

    const handleRandom = () => {
            const arr = [1, 2, 3, 4];

        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        const nums = arr.slice(0, 3);
        setCode(nums.join(" - "));
    };


    return (
        <div className="min-h-screen bg-indigo-950 flex flex-col items-center justify-center text-white px-4">
            {/* Terminal giả lập */}
            <div
                className="w-full max-w-md bg-black border-2 border-green-500 rounded-lg shadow-lg font-mono text-green-400 text-4xl flex items-center justify-center h-40 mb-8"
            >
                {code || ">>> Nhấn RANDOM"}
            </div>

            {/* Nút bấm */}
            <div className="flex gap-4">
                <button
                    onClick={handleRandom}
                    className="px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg text-lg font-bold shadow-md transition"
                >
                    RANDOM
                </button>
                <a
                    href="/"
                    className="px-6 py-3 bg-red-600 hover:bg-red-500 rounded-lg text-lg font-bold shadow-md transition"
                >
                    QUAY LẠI
                </a>
            </div>
        </div>
    );
}
