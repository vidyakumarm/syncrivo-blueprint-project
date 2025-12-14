import { Link } from 'react-router-dom';
import RegionPage from "@/templates/regions/RegionPage";
import { ArrowRight, CheckCircle2, Globe } from "lucide-react";

export default function APAC() {
    return (
        <RegionPage
            region="APAC"
            headline="Scalable Messaging Automation for APAC Teams"
            description="Keep distributed teams aligned across Asia-Pacific timezones by automating communication flows between Teams, Slack, and Workspace."
            slug="apac"
        >
            <div className="space-y-12">
                <section>
                    <div className="bg-teal-50/50 dark:bg-teal-900/20 p-6 rounded-2xl border border-teal-100 dark:border-teal-800">
                        <h2 className="text-2xl font-semibold mb-4 text-foreground flex items-center gap-2">
                            <Globe className="w-5 h-5 text-teal-600" />
                            Asia-Pacific Connectivity
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            APAC teams often operate across diverse time zones and regions. SyncRivo helps automate communication between Teams, Slack, and Workspace to keep distributed teams aligned and productive around the clock.
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-6 text-foreground">Common Use Cases</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {[
                            { title: "Regional IT Operations", desc: "Centralize alerts from distributed systems." },
                            { title: "Distributed Support", desc: "Handover tasks across timezones smoothly." },
                            { title: "Cross-timezone Collab", desc: "Keep context alive for async work." }
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
                    <h2 className="text-2xl font-semibold mb-6 text-foreground">Core Solutions</h2>
                    <div className="flex flex-wrap gap-4 mb-8">
                        <Link to="/features/messaging-automation" className="inline-flex items-center text-primary font-medium hover:underline">
                            Messaging Automation <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                </section>

                <section className="bg-muted/30 p-8 rounded-2xl text-center">
                    <h2 className="text-2xl font-bold mb-4">Scale your APAC operations</h2>
                    <Link to="/signup" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
                        Start Free Trial
                    </Link>
                </section>

                <section className="pt-8">
                    <h2 className="text-lg font-semibold mb-4 text-muted-foreground">Global Network</h2>
                    <div className="flex gap-6 text-sm">
                        <Link to="/usa" className="text-foreground hover:text-primary transition-colors">US HQ Teams</Link>
                        <Link to="/middle-east" className="text-foreground hover:text-primary transition-colors">Middle East Operations</Link>
                    </div>
                </section>
            </div>
        </RegionPage>
    );
}
