import FeaturePage from "@/templates/features/FeaturePage";
import { Check } from "lucide-react";

export default function MessagingAutomation() {
    return (
        <FeaturePage
            title="Messaging Automation"
            description="Automate message routing between Slack, Teams, and Google Workspace for faster response and less manual work."
            slug="messaging-automation"
            faqs={[
                {
                    q: "What is messaging automation?",
                    a: "Messaging automation routes messages between platforms automatically using rules and workflows.",
                },
                {
                    q: "Does it work with secure channels?",
                    a: "Yes, SyncRivo supports private and encrypted channels with proper authorization.",
                }
            ]}
        >
            <div className="space-y-12">
                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">Why it matters</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Manual message forwarding leads to delays, errors, and missed context. When teams work across different platforms—like Support in Slack and Engineering in Teams—critical alerts can get lost in translation.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-6 text-foreground">Key Benefits</h2>
                    <ul className="grid gap-4 sm:grid-cols-2">
                        {[
                            "Reduce Mean Time to Acknowledge (MTTA)",
                            "Keep context intact (threads, attachments)",
                            "Eliminate manual copy-pasting",
                            "Centralize audit logs"
                        ].map((benefit, i) => (
                            <li key={i} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg border border-border/50">
                                <div className="mt-1 w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                                    <Check className="w-3.5 h-3.5 text-success" />
                                </div>
                                <span className="font-medium">{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </FeaturePage>
    );
}
