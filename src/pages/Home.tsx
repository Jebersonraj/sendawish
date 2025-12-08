import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {Sparkles, Gift, Heart, Calendar} from "lucide-react";
import AnimatedCard from "../components/AnimatedCard.tsx";
import FloatingEmojis from "../components/FloatingEmojis.tsx";
import {Occasion, OccasionLabels} from "@/types.ts";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [sender, setSender] = useState<string>("");
    const [recipient, setRecipient] = useState<string>("");
    const [occasion, setOccasion] = useState<Occasion>(Occasion.BIRTHDAY);
    const [years, setYears] = useState<number | "">("");

    const needsYears =
        occasion === Occasion.BIRTHDAY ||
        occasion === Occasion.WEDDING_ANNIVERSARY ||
        occasion === Occasion.LOVE_ANNIVERSARY;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!sender || !recipient) return;
        if (needsYears && (!years || Number(years) < 1)) {
            alert("Years/Age must be at least 1!");
            return;
        }

        const params = new URLSearchParams();
        params.append("from", sender);
        params.append("to", recipient);
        params.append("occasion", occasion);
        if (needsYears && years) params.append("years", years.toString());
        navigate(`/wish?${params.toString()}`);
    };

    return (
        <div
            className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            <FloatingEmojis emojis={["✨", "🚀", "🔥", "🤪", "🎉", "💩", "🦄"]}/>
            <div
                className="absolute top-0 -left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div
                className="absolute top-0 -right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div
                className="absolute -bottom-32 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

            <AnimatedCard className="w-full max-w-lg z-10">
                <motion.div
                    initial={{opacity: 0, scale: 0.9}}
                    animate={{opacity: 1, scale: 1}}
                    className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-8 md:p-10"
                >
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{y: -20, opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            transition={{delay: 0.2}}
                        >
                            <h1 className="font-display text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 mb-2 transform -rotate-2">
                                SendAWish
                            </h1>
                            <p className="text-gray-600 font-sans font-medium text-lg">
                                Create chaotic joy for your friends! 🌪️
                            </p>
                        </motion.div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <motion.div whileHover={{scale: 1.02}} className="group">
                                <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">
                                    Who is this from? (You)
                                </label>
                                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-400">
                    <Sparkles size={20}/>
                  </span>
                                    <input
                                        type="text"
                                        required
                                        value={sender}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setSender(e.target.value)
                                        }
                                        placeholder="e.g. The Coolest Friend"
                                        className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 border-2 border-gray-100 focus:border-primary focus:ring-0 font-sans font-semibold text-gray-800"
                                    />
                                </div>
                            </motion.div>

                            {/* Recipient */}
                            <motion.div whileHover={{scale: 1.02}} className="group">
                                <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">
                                    Who is the victim? (Recipient)
                                </label>
                                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-400">
                    <Gift size={20}/>
                  </span>
                                    <input
                                        type="text"
                                        required
                                        value={recipient}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setRecipient(e.target.value)
                                        }
                                        placeholder="e.g. Birthday Boy Dave"
                                        className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 border-2 border-gray-100 focus:border-primary focus:ring-0 font-sans font-semibold text-gray-800"
                                    />
                                </div>
                            </motion.div>

                            <motion.div whileHover={{scale: 1.02}} className="group">
                                <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">
                                    What's the occasion?
                                </label>
                                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-400">
                    <Heart size={20}/>
                  </span>
                                    <select
                                        value={occasion}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                            setOccasion(e.target.value as Occasion)
                                        }
                                        className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 border-2 border-gray-100 focus:border-primary focus:ring-0 font-sans font-semibold text-gray-800 cursor-pointer"
                                    >
                                        {Object.values(Occasion).map((occ) => (
                                            <option key={occ} value={occ}>
                                                {OccasionLabels[occ]}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </motion.div>

                            {needsYears && (
                                <motion.div
                                    initial={{opacity: 0, height: 0}}
                                    animate={{opacity: 1, height: "auto"}}
                                    className="group"
                                >
                                    <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">
                                        {occasion === Occasion.BIRTHDAY ? "Age?" : "How many years?"}
                                    </label>
                                    <div className="relative">
                    <span className="absolute left-4 top-3.5 text-gray-400">
                      <Calendar size={20}/>
                    </span>
                                        <input
                                            type="number"
                                            required
                                            min={1}
                                            value={years}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                const value = Number(e.target.value);
                                                setYears(value >= 1 ? value : "");
                                            }}
                                            placeholder={occasion === Occasion.BIRTHDAY ? "e.g. 25" : "e.g. 5"}
                                            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 border-2 border-gray-100 focus:border-primary focus:ring-0 font-sans font-semibold text-gray-800"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </div>


                        <motion.button
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            type="submit"
                            className="w-full py-4 bg-gradient-to-r from-primary to-purple-600 text-white font-display text-2xl rounded-2xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all flex items-center justify-center gap-2"
                        >
                            Generate Chaos ⚡
                        </motion.button>
                    </form>
                </motion.div>
            </AnimatedCard>
        </div>
    );
};

export default Home;
