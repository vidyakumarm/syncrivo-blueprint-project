import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { chatScenarios } from '@/data/chatScenarios';
import { ChatCard } from '@/components/chat/ChatCard';
import { SyncRivoHub } from '@/components/chat/SyncRivoHub';
import { ScenarioController } from '@/components/chat/ScenarioController';
import { motion, AnimatePresence } from 'framer-motion';

const MultiScenarioMessageFlow = () => {
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [phase, setPhase] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    const scenario = chatScenarios[currentScenarioIndex];
    const message = scenario.messages[currentMessageIndex];
    const isFromLeft = message.from === 'left';

    // Phase durations (matching existing animation)
    const phases = [
        { duration: 500 },   // 0: Idle
        { duration: 1400 },  // 1: Typing
        { duration: 700 },   // 2: Message sent
        { duration: 700 },   // 3: Traveling to hub
        { duration: 600 },   // 4: Processing/Encrypting
        { duration: 700 },   // 5: Traveling to destination
        { duration: 2000 },  // 6: Received
    ];

    // Auto-rotate scenarios
    useEffect(() => {
        if (!isPlaying) return;

        const scenarioTimer = setTimeout(() => {
            setCurrentScenarioIndex((prev) => (prev + 1) % chatScenarios.length);
            setCurrentMessageIndex(0);
            setPhase(0);
        }, 9000 * scenario.messages.length); // 9 seconds per message cycle

        return () => clearTimeout(scenarioTimer);
    }, [currentScenarioIndex, isPlaying, scenario.messages.length]);

    // Animation phase progression
    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            setPhase((prev) => {
                if (prev === 6) {
                    // Move to next message
                    const nextMessageIndex = (currentMessageIndex + 1) % scenario.messages.length;
                    setCurrentMessageIndex(nextMessageIndex);

                    // If we've completed all messages, this will be handled by scenario rotation
                    return 0;
                }
                return prev + 1;
            });
        }, phases[phase].duration);

        return () => clearInterval(interval);
    }, [phase, isPlaying, currentMessageIndex, scenario.messages.length, phases]);

    // Progress calculation for step indicator
    const getStepProgress = () => {
        if (phase <= 2) return 1;
        if (phase <= 4) return 2;
        return 3;
    };

    const handleScenarioSelect = (index: number) => {
        setCurrentScenarioIndex(index);
        setCurrentMessageIndex(0);
        setPhase(0);
        setIsPlaying(false); // Pause auto-rotation on manual selection
    };

    const previousMessages = scenario.messages.slice(0, currentMessageIndex);

    return (
        <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-slate-50/50 via-background to-slate-50/30 dark:from-slate-950/50 dark:via-background dark:to-slate-950/30 relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-400/5 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Section Header */}
                <div className="text-center mb-10 lg:mb-14">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm font-medium mb-6">
                        <Play className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                        <span className="text-slate-600 dark:text-slate-400">Live Demo</span>
                    </span>
                    <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 tracking-tight leading-[1.1]">
                        See How SyncRivo Syncs Messages{' '}
                        <span className="text-slate-500 dark:text-slate-400">Instantly</span>
                    </h2>
                    <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Watch real conversations flow securely across Teams, Slack, Google Chat, and Zoom — encrypted and instant.
                    </p>
                </div>

                {/* Step Progress Indicator */}
                <div className="flex items-center justify-center gap-4 mb-12">
                    {[
                        {
                            step: 1,
                            label: isFromLeft
                                ? `Send from ${scenario.leftPlatform.name}`
                                : `Send from ${scenario.rightPlatform.name}`,
                        },
                        { step: 2, label: 'Encrypt & Route' },
                        {
                            step: 3,
                            label: isFromLeft
                                ? `Deliver to ${scenario.rightPlatform.name}`
                                : `Deliver to ${scenario.leftPlatform.name}`,
                        },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <div className="flex flex-col items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${getStepProgress() >= item.step
                                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                                        : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                                        }`}
                                >
                                    {getStepProgress() > item.step ? (
                                        <CheckCircle2 className="w-5 h-5" />
                                    ) : (
                                        <span className="text-sm font-semibold">{item.step}</span>
                                    )}
                                </div>
                                <span
                                    className={`text-xs mt-2 font-medium transition-colors duration-300 text-center max-w-[100px] ${getStepProgress() >= item.step ? 'text-foreground' : 'text-muted-foreground'
                                        }`}
                                >
                                    {item.label}
                                </span>
                            </div>
                            {i < 2 && (
                                <div
                                    className={`w-16 sm:w-24 h-0.5 rounded-full transition-all duration-500 mb-6 ${getStepProgress() > item.step
                                        ? 'bg-slate-900 dark:bg-white'
                                        : 'bg-slate-200 dark:bg-slate-700'
                                        }`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Demo Container with Scenario Transition */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentScenarioIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        {/* Desktop Layout */}
                        <div className="hidden md:flex items-stretch justify-between gap-6 lg:gap-10">
                            {/* Left Chat Panel */}
                            <ChatCard
                                platform={scenario.leftPlatform}
                                currentMessage={message}
                                previousMessages={previousMessages}
                                phase={phase}
                                isSource={isFromLeft}
                                oppositePlatformName={scenario.rightPlatform.name}
                            />

                            {/* Connection Line Left + SyncRivo Hub + Connection Line Right */}
                            <div className="flex-1 flex items-center justify-center relative min-w-[200px] lg:min-w-[280px]">
                                {/* Left connection */}
                                <div className="flex-1 relative h-0.5 bg-gradient-to-r from-primary/20 to-primary/30 rounded-full">
                                    {/* Forward flow: Left → Hub */}
                                    <div
                                        className={`absolute top-1/2 -translate-y-1/2 transition-all ease-out ${isFromLeft && (phase === 3 || phase === 4) ? 'opacity-100' : 'opacity-0'
                                            }`}
                                        style={{
                                            left: isFromLeft && phase === 4 ? '100%' : '0%',
                                            transition: 'left 0.6s ease-out, opacity 0.3s',
                                        }}
                                    >
                                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/40">
                                            <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />
                                        </div>
                                    </div>
                                    {/* Reverse flow: Hub → Left */}
                                    <div
                                        className={`absolute top-1/2 -translate-y-1/2 transition-all ease-out ${!isFromLeft && (phase === 5 || phase === 6) ? 'opacity-100' : 'opacity-0'
                                            }`}
                                        style={{
                                            right: !isFromLeft && phase >= 6 ? '100%' : '0%',
                                            transition: 'right 0.6s ease-out, opacity 0.3s',
                                        }}
                                    >
                                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-accent to-primary shadow-lg shadow-primary/40">
                                            <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />
                                        </div>
                                    </div>
                                </div>

                                {/* SyncRivo Hub */}
                                <SyncRivoHub phase={phase} />

                                {/* Right connection */}
                                <div className="flex-1 relative h-0.5 bg-gradient-to-r from-primary/30 to-primary/20 rounded-full">
                                    {/* Forward flow: Hub → Right */}
                                    <div
                                        className={`absolute top-1/2 -translate-y-1/2 transition-all ease-out ${isFromLeft && (phase === 5 || phase === 6) ? 'opacity-100' : 'opacity-0'
                                            }`}
                                        style={{
                                            left: isFromLeft && phase >= 6 ? '100%' : '0%',
                                            transition: 'left 0.6s ease-out, opacity 0.3s',
                                        }}
                                    >
                                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/40">
                                            <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />
                                        </div>
                                    </div>
                                    {/* Reverse flow: Right → Hub */}
                                    <div
                                        className={`absolute top-1/2 -translate-y-1/2 transition-all ease-out ${!isFromLeft && (phase === 3 || phase === 4) ? 'opacity-100' : 'opacity-0'
                                            }`}
                                        style={{
                                            right: !isFromLeft && phase >= 4 ? '100%' : '0%',
                                            transition: 'right 0.6s ease-out, opacity 0.3s',
                                        }}
                                    >
                                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-accent to-primary shadow-lg shadow-primary/40">
                                            <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Chat Panel */}
                            <ChatCard
                                platform={scenario.rightPlatform}
                                currentMessage={message}
                                previousMessages={previousMessages}
                                phase={phase}
                                isSource={!isFromLeft}
                                oppositePlatformName={scenario.leftPlatform.name}
                            />
                        </div>

                        {/* Mobile Layout */}
                        <div className="flex md:hidden flex-col items-center gap-4">
                            <ChatCard
                                platform={scenario.leftPlatform}
                                currentMessage={message}
                                previousMessages={previousMessages}
                                phase={phase}
                                isSource={isFromLeft}
                                oppositePlatformName={scenario.rightPlatform.name}
                            />

                            {/* Vertical connection */}
                            <div className="relative w-0.5 h-12 bg-gradient-to-b from-primary/30 to-primary/30 rounded-full">
                                <div
                                    className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-lg transition-all duration-500 ${phase >= 3 && phase <= 5 ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    style={{
                                        top: phase >= 5 ? '100%' : '0%',
                                        transition: 'top 0.5s ease-out, opacity 0.3s',
                                    }}
                                />
                            </div>

                            <SyncRivoHub phase={phase} />

                            <div className="relative w-0.5 h-12 bg-gradient-to-b from-primary/30 to-primary/30 rounded-full">
                                <div
                                    className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-lg transition-all duration-500 ${phase >= 3 ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    style={{
                                        top: phase >= 6 ? '100%' : '0%',
                                        transition: 'top 0.5s ease-out, opacity 0.3s',
                                    }}
                                />
                            </div>

                            <ChatCard
                                platform={scenario.rightPlatform}
                                currentMessage={message}
                                previousMessages={previousMessages}
                                phase={phase}
                                isSource={!isFromLeft}
                                oppositePlatformName={scenario.leftPlatform.name}
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Scenario Controller */}
                <ScenarioController
                    scenarios={chatScenarios}
                    activeScenario={currentScenarioIndex}
                    onSelect={handleScenarioSelect}
                />

                {/* Play/Pause + CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-8">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        {isPlaying ? (
                            <>
                                <div className="w-4 h-4 mr-2 flex gap-1">
                                    <div className="w-1.5 h-4 bg-current rounded-sm" />
                                    <div className="w-1.5 h-4 bg-current rounded-sm" />
                                </div>
                                Pause Demo
                            </>
                        ) : (
                            <>
                                <Play className="w-4 h-4 mr-2" />
                                Play Demo
                            </>
                        )}
                    </Button>

                    <Button
                        asChild
                        size="lg"
                        className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white shadow-xl group"
                    >
                        <Link to="/features">
                            See Full Multi-Platform Sync
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>

                {/* Value Indicators */}
                <div className="text-center mt-10 text-sm text-muted-foreground">
                    Zero-switch messaging · Enterprise-grade encryption · Multi-platform compliance
                </div>
            </div>
        </section>
    );
};

export default MultiScenarioMessageFlow;
