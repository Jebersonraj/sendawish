import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Wand2, Home as HomeIcon, Check, Volume2, VolumeX, AlertTriangle } from 'lucide-react';
import { generateFunnyWish } from '../services/geminiService.ts';
import { Occasion, OccasionTheme, OccasionLabels } from '@/types.ts';
import BackgroundEffect from '../components/Confetti.tsx';
import FloatingEmojis from '../components/FloatingEmojis.tsx';
import { playThemeSound, playSparkle, playSuccess, playPop } from '../utils/soundEffects.ts';

const WishPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const from = searchParams.get('from') || 'Anonymous';
    const to = searchParams.get('to') || 'Someone';

    const rawOccasion = searchParams.get('occasion');
    const occasion: Occasion = Object.values(Occasion).includes(rawOccasion as Occasion)
        ? (rawOccasion as Occasion)
        : Occasion.OTHER;

    const parsedYears = Number(searchParams.get('years'));
    const years = !isNaN(parsedYears) && parsedYears > 0 ? parsedYears : undefined;

    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(false);
    const [isBlobUrl, setIsBlobUrl] = useState(false);

    const theme = OccasionTheme[occasion];

    useEffect(() => {
        setIsBlobUrl(window.location.protocol === 'blob:');

        const fetchWish = async () => {
            try {
                setLoading(true);
                const msg = await generateFunnyWish(from, to, occasion, years);
                setMessage(msg);
            } catch (error) {
                console.error("Failed to generate wish:", error);
                setMessage("Happy special day! (The AI generator fell asleep, sorry!)");
            } finally {
                setLoading(false);
            }
        };
        void fetchWish();
    }, [from, to, occasion, years]);

    const toggleSound = () => {
        if (!soundEnabled) {
            playThemeSound(theme.animation);
        }
        setSoundEnabled(!soundEnabled);
    };

    const playEffect = (effect: 'theme' | 'sparkle' | 'success' | 'pop') => {
        if (!soundEnabled) return;
        switch(effect) {
            case 'theme': playThemeSound(theme.animation); break;
            case 'sparkle': playSparkle(); break;
            case 'success': playSuccess(); break;
            case 'pop': playPop(); break;
        }
    };

    const handleShare = async () => {
        if (isBlobUrl) {
            alert("⚠️ Preview Link Detected\n\nYou are currently viewing this in a temporary preview environment (Blob URL). This link cannot be shared externally.\n\nTo share this wish, please deploy the application to a hosting provider (like Vercel, Netlify, or GitHub Pages) first.");
            return;
        }

        playEffect('success');
        const url = window.location.href;
        const shareData = {
            title: `A chaotic wish for ${to}!`,
            text: `Check out this hilarious wish from ${from}!`,
            url: url
        };
        if (navigator.share) {
            try {
                await navigator.share(shareData);
                return;
            } catch (err) {
                console.log('Share cancelled or failed', err);
            }
        }
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch (err) {
            console.error('Clipboard failed', err);
            prompt("Copy this link manually:", url);
        }
    };

    const handleRegenerate = async () => {
        playEffect('sparkle');
        setLoading(true);
        try {
            const msg = await generateFunnyWish(from, to, occasion, years);
            setMessage(msg);
        } catch (error) {
            console.error("Regeneration failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-4 bg-gradient-to-br ${theme.bg} selection:bg-pink-200 selection:text-pink-900`}>

            <BackgroundEffect type={theme.animation} colors={theme.particleColors} />
            <FloatingEmojis emojis={theme.emojis} />
            <AnimatePresence>
                {isBlobUrl && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="fixed top-0 left-0 right-0 z-50 bg-amber-400 text-amber-900 px-4 py-3 text-center shadow-md flex items-center justify-center gap-2 font-bold text-sm md:text-base"
                    >
                        <AlertTriangle size={20} />
                        <span>Preview Mode: Links cannot be shared until deployed.</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative z-10 w-full max-w-2xl mt-8"
            >
                <div className={`bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 md:p-12 border-4 ${theme.accent} text-center transform md:rotate-1 hover:rotate-0 transition-transform duration-500 relative`}>

                    <button
                        onClick={toggleSound}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100/50 transition-colors text-gray-400 hover:text-gray-600 z-30"
                        title={soundEnabled ? "Mute sounds" : "Enable fun sounds"}
                    >
                        {soundEnabled ? <Volume2 size={24} className="text-indigo-500" /> : <VolumeX size={24} />}
                    </button>
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mb-6"
                    >
             <span className={`inline-block px-4 py-2 rounded-full ${theme.buttonBg} text-white font-bold text-xs md:text-sm tracking-widest uppercase mb-4 shadow-md`}>
                {occasion.replace(/_/g, ' ')} ALERT 🚨
             </span>
                        <h1 className="font-display text-5xl md:text-7xl text-gray-900 leading-tight drop-shadow-sm select-none">
                            HAPPY {years && <span className={`${theme.color}`}>{years}{['st','nd','rd'][((years+90)%100-10)%10-1]||"th"}</span>} <br />
                            <span className={`text-transparent bg-clip-text ${theme.buttonBg}`}>
                    {OccasionLabels[occasion].split(' ')[0].toUpperCase()}!
                </span>
                        </h1>
                        <h2 className="font-sans font-bold text-2xl md:text-4xl text-gray-800 mt-2 break-words">
                            {to}
                        </h2>
                    </motion.div>
                    <motion.div
                        layout
                        className={`bg-gray-50 p-6 md:p-8 rounded-2xl transform -rotate-1 shadow-inner border-2 ${theme.accent} mb-8 relative min-h-[120px] flex items-center justify-center`}
                    >
                        <AnimatePresence mode="wait">
                            {loading ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center justify-center"
                                >
                                    <div className={`w-8 h-8 border-4 border-t-transparent rounded-full animate-spin ${theme.color.replace('text-', 'border-')}`}></div>
                                    <p className={`mt-2 ${theme.color} font-bold animate-pulse text-sm`}>Brewing chaotic magic...</p>
                                </motion.div>
                            ) : (
                                <motion.p
                                    key="content"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="font-display text-xl md:text-3xl text-gray-800 leading-relaxed"
                                >
                                    "{message}"
                                </motion.p>
                            )}
                        </AnimatePresence>

                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 180 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleRegenerate}
                            className="absolute -top-4 -right-4 bg-white p-3 rounded-full shadow-lg border-2 border-gray-100 text-gray-500 hover:text-indigo-600 z-20 transition-colors"
                            title="Rewrite this madness"
                        >
                            <Wand2 size={22} />
                        </motion.button>
                    </motion.div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleShare}
                            disabled={isBlobUrl}
                            className={`w-full md:w-auto px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl text-white ${
                                isBlobUrl
                                    ? 'bg-gray-400 cursor-not-allowed opacity-80'
                                    : copied ? 'bg-green-500' : theme.buttonBg
                            }`}
                        >
                            {copied ? <><Check size={24} /> Copied! </> : <><Share2 size={24} /> {isBlobUrl ? 'Share Disabled' : 'Share Chaos Link'}</>}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => { playEffect('pop'); navigate('/'); }}
                            className="w-full md:w-auto px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 bg-white text-gray-800 border-2 border-gray-100 hover:bg-gray-50 shadow-md transition-all"
                        >
                            <HomeIcon size={20} /> Create New
                        </motion.button>
                    </div>

                    <div className="mt-8 text-sm text-gray-500 font-bold opacity-60">
                        Sent with ❤️ (and a bit of malice) by {from}
                    </div>

                </div>
            </motion.div>
        </div>
    );
};

export default WishPage;