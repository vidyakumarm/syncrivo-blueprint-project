import { Link } from 'react-router-dom';
import RegionPage from "@/templates/regions/RegionPage";
import { ArrowRight, CheckCircle2, ShieldCheck, Globe } from "lucide-react";

export default function Europe() {
    return (
        <RegionPage
            region="Europe"
            headline="GDPR-Compliant Messaging Automation for European Teams"
            description="SyncRivo enables secure cross-platform messaging automation for European organizations, fully aligned with GDPR data protection standards."
            slug="europe"
        >
            <div className="space-y-12">
                <section>
                    <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800">
                        <h2 className="text-2xl font-semibold mb-4 text-foreground flex items-center gap-2">
                            <Globe className="w-5 h-5 text-emerald-600" />
                            European Data Protection
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            European organizations need automation that respects data protection and operational transparency. SyncRivo supports cross-platform messaging while aligning with GDPR-aware workflows.
                        </p>
                    </div>
                </section>

                <section className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl">
                    <div className="flex items-start gap-4">
                        <ShieldCheck className="w-8 h-8 text-emerald-500 mt-1 shrink-0" />
                        <div>
                            <h3 className="text-xl font-bold mb-2">GDPR Compliance Note</h3>
                            <p className="text-muted-foreground">SyncRivo is designed with data minimization, auditability, and secure transport in mind, ensuring your messaging infrastructure meets strict EU regulatory requirements.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-6 text-foreground">Common Use Cases</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {[
                            { title: "Secure Operations", desc: "Automate ops alerts without data leaks." },
                            { title: "Works Council Friendly", desc: "Transparent logging and audit trails." },
                            { title: "Cross-Border Teams", desc: "Connect EU subsidiaries seamlessly." }
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
                    <h2 className="text-2xl font-semibold mb-6 text-foreground">Integration Features</h2>
                    <div className="flex flex-wrap gap-4 mb-8">
                        <Link to="/features/messaging-automation" className="inline-flex items-center text-primary font-medium hover:underline">
                            Messaging Automation <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                </section>

                <section className="bg-muted/30 p-8 rounded-2xl text-center">
                    <h2 className="text-2xl font-bold mb-4">Secure your European comms</h2>
                    <Link to="/signup" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
                        Start Compliance Trial
                    </Link>
                </section>

                <section className="pt-8">
                    <h2 className="text-lg font-semibold mb-4 text-muted-foreground">Global Connections</h2>
                    <div className="flex gap-6 text-sm">
                        <Link to="/uk" className="text-foreground hover:text-primary transition-colors">UK Workflows</Link>
                        <Link to="/middle-east" className="text-foreground hover:text-primary transition-colors">Middle East Enterprises</Link>
                    </div>
                </section>
            </div>
        </RegionPage>
    );
}
