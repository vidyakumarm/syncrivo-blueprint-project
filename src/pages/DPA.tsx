import { useTranslation } from 'react-i18next';
import { Footer } from '@/components/layout/Footer';
import { Navigation } from '@/components/layout/Navigation';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';

export default function DPA() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navigation />

            <main className="flex-grow pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold tracking-tight mb-4">{t('dpa.title')}</h1>
                        <p className="text-xl text-muted-foreground">{t('dpa.description')}</p>
                    </div>

                    <div className="grid gap-8 mb-12">
                        <div className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <FileText className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Standard DPA Template</h3>
                                    <p className="text-sm text-muted-foreground">Latest version: Feb 2025</p>
                                </div>
                            </div>
                            <Button className="w-full sm:w-auto gap-2">
                                <Download className="h-4 w-4" />
                                Download PDF
                            </Button>
                        </div>
                    </div>

                    <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">1. Scope and Applicability</h2>
                            <p>
                                This Data Processing Addendum ("DPA") forms part of the Master Services Agreement between SyncRivo and the Customer.
                                It applies to the extent SyncRivo processes Personal Data on behalf of the Customer.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">2. Data Processing Roles</h2>
                            <p>
                                For the purposes of the GDPR and other applicable data protection laws, the Customer is the Controller and
                                SyncRivo is the Processor of Personal Data.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">3. Security Measures</h2>
                            <p>
                                SyncRivo implements appropriate technical and organizational measures to protect Personal Data, including:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li>Encryption of data in transit and at rest</li>
                                <li>Regular vulnerability assessments and penetration testing</li>
                                <li>Access controls and authentication mechanisms</li>
                                <li>Business continuity and disaster recovery plans</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">4. Data Subject Rights</h2>
                            <p>
                                SyncRivo shall, to the extent legally permitted, promptly notify Customer if it receives a request from a Data
                                Subject to exercise their rights (e.g., access, rectification, erasure).
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
