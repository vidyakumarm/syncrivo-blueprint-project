import { Scenario } from '@/data/chatScenarios';

interface ScenarioControllerProps {
    scenarios: Scenario[];
    activeScenario: number;
    onSelect: (index: number) => void;
}

export function ScenarioController({
    scenarios,
    activeScenario,
    onSelect,
}: ScenarioControllerProps) {
    return (
        <div className="flex flex-wrap justify-center gap-3 mt-14">
            {scenarios.map((scenario, idx) => (
                <button
                    key={scenario.id}
                    onClick={() => onSelect(idx)}
                    className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${idx === activeScenario
                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg scale-105'
                            : 'bg-slate-100 dark:bg-slate-800 text-foreground hover:bg-slate-200 dark:hover:bg-slate-700 hover:shadow-md'
                        }`}
                >
                    {scenario.label}
                </button>
            ))}
        </div>
    );
}
