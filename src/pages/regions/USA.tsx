import { Link } from 'react-router-dom';
import RegionPage from "@/templates/regions/RegionPage";
import { ArrowRight, CheckCircle2, Globe } from "lucide-react";

export default function USA() {
    return (
        <RegionPage
            region="USA"
            headline="Messaging Automation for US-Based Teams"
            description="SyncRivo helps US engineering, operations, and support teams automate message routing across Slack, Teams, and Google Workspace without slowing down critical workflows."
            slug="usa"
        >
            <div className="space-y-12">
                <section>
                    <div className="bg-blue-50/50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
                        <h2 className="text-2xl font-semibold mb-4 text-foreground flex items-center gap-2">
                            <Globe className="w-5 h-5 text-blue-600" />
                            US Market Focus
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            US organizations rely on fast, reliable communication across Slack, Microsoft Teams, and Google Workspace. SyncRivo helps engineering, operations, and support teams automate message routing without slowing down critical workflows.
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-6 text-foreground">Common Use Cases</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {[
                            { title: "Incident Response", desc: "Automate P1/P2 alert routing for on-call teams." },
                            { title: "Cross-func Collaboration", desc: "Bridge IT and business units seamlessly." },
                            { title: "Compliance Workflows", desc: "Ensure notification trails for audits." }
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
                    <h2 className="text-2xl font-semibold mb-6 text-foreground">Key Capabilities</h2>
                    <div className="flex flex-wrap gap-4 mb-8">
                        <Link to="/features/messaging-automation" className="inline-flex items-center text-primary font-medium hover:underline">
                            Messaging Automation <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                </section>

                <section className="bg-muted/30 p-8 rounded-2xl text-center">
                    <h2 className="text-2xl font-bold mb-4">Ready to unify your US teams?</h2>
                    <Link to="/signup" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
                        Start Free Trial
                    </Link>
                </section>

                <section className="pt-8">
                    <h2 className="text-lg font-semibold mb-4 text-muted-foreground">Explore Other Regions</h2>
                    <div className="flex gap-6 text-sm">
                        <Link to="/uk" className="text-foreground hover:text-primary transition-colors">UK Teams</Link>
                        <Link to="/europe" className="text-foreground hover:text-primary transition-colors">European Organizations</Link>
                    </div>
                </section>
            </div>
        </RegionPage>
    );
}
