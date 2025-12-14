import { Link } from 'react-router-dom';
import RegionPage from "@/templates/regions/RegionPage";
import { ArrowRight, CheckCircle2, Globe } from "lucide-react";

export default function UK() {
    return (
        <RegionPage
            region="UK"
            headline="Workflow & Messaging Automation for UK Teams"
            description="SyncRivo reduces friction for UK teams by automatically routing messages between Microsoft Teams, Slack, and Google Workspace to optimise operations."
            slug="uk"
        >
            <div className="space-y-12">
                <section>
                    <div className="bg-indigo-50/50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                        <h2 className="text-2xl font-semibold mb-4 text-foreground flex items-center gap-2">
                            <Globe className="w-5 h-5 text-indigo-600" />
                            United Kingdom focus
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            UK teams often operate across departments and partner organisations using different communication platforms. SyncRivo reduces friction by automating message flows between Teams, Slack, and Workspace, helping you organise workflows efficiently.
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-6 text-foreground">Common Use Cases</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {[
                            { title: "Operations Coordination", desc: "Keep dispersed teams in sync across tools." },
                            { title: "MSP Communication", desc: "Streamline managed service provider updates." },
                            { title: "Vendor Collaboration", desc: "Bridge gaps with external partners seamlessly." }
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <CheckCircle2 className="w-5 h-5 text-primary" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                                <p className="text-muted-foreground text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="border-t border-border pt-12">
                    <h2 className="text-2xl font-semibold mb-6 text-foreground">Core Features</h2>
                    <div className="flex flex-wrap gap-4 mb-8">
                        <Link to="/features/messaging-automation" className="inline-flex items-center text-primary font-medium hover:underline">
                            Messaging Automation <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                </section>

                <section className="bg-muted/30 p-8 rounded-2xl text-center">
                    <h2 className="text-2xl font-bold mb-4">Unify your UK workforce</h2>
                    <Link to="/signup" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
                        Get Started
                    </Link>
                </section>

                <section className="pt-8">
                    <h2 className="text-lg font-semibold mb-4 text-muted-foreground">Regional Links</h2>
                    <div className="flex gap-6 text-sm">
                        <Link to="/usa" className="text-foreground hover:text-primary transition-colors">US Teams</Link>
                        <Link to="/europe" className="text-foreground hover:text-primary transition-colors">European Compliance</Link>
                    </div>
                </section>
            </div>
        </RegionPage>
    );
}
