import { Link } from 'react-router-dom';
import RegionPage from "@/templates/regions/RegionPage";
import { ArrowRight, CheckCircle2, Globe } from "lucide-react";

export default function MiddleEast() {
    return (
        <RegionPage
            region="Middle East"
            headline="Secure Messaging Automation for Middle East Enterprises"
            description="Supporting operations across UAE, Saudi Arabia, and the Middle East with secure, real-time messaging automation for enterprise teams."
            slug="middle-east"
        >
            <div className="space-y-12">
                <section>
                    <div className="bg-amber-50/50 dark:bg-amber-900/20 p-6 rounded-2xl border border-amber-100 dark:border-amber-800">
                        <h2 className="text-2xl font-semibold mb-4 text-foreground flex items-center gap-2">
                            <Globe className="w-5 h-5 text-amber-600" />
                            Regional Enterprise Focus
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Organizations across the UAE, Saudi Arabia, and the wider Middle East rely on real-time communication for operations, IT, and customer support. SyncRivo automates cross-platform messaging while maintaining security and control.
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-6 text-foreground">Regional Use Cases</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {[
                            { title: "Operations Notifications", desc: "Reliable alerts for critical infrastructure." },
                            { title: "Multi-entity Coordination", desc: "Manage communications across subsidiaries." },
                            { title: "Secure Internal Comms", desc: "Keep sensitive data within authorized channels." }
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
                    <h2 className="text-2xl font-semibold mb-6 text-foreground">Platform Capabilities</h2>
                    <div className="flex flex-wrap gap-4 mb-8">
                        <Link to="/features/messaging-automation" className="inline-flex items-center text-primary font-medium hover:underline">
                            Messaging Automation <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                </section>

                <section className="bg-muted/30 p-8 rounded-2xl text-center">
                    <h2 className="text-2xl font-bold mb-4">Automate your enterprise</h2>
                    <Link to="/signup" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
                        Contact Sales
                    </Link>
                </section>

                <section className="pt-8">
                    <h2 className="text-lg font-semibold mb-4 text-muted-foreground">Explore More</h2>
                    <div className="flex gap-6 text-sm">
                        <Link to="/europe" className="text-foreground hover:text-primary transition-colors">European Security</Link>
                        <Link to="/apac" className="text-foreground hover:text-primary transition-colors">APAC Growth</Link>
                    </div>
                </section>
            </div>
        </RegionPage>
    );
}
