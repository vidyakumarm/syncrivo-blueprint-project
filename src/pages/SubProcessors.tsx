import { useTranslation } from 'react-i18next';
import { Footer } from '@/components/layout/Footer';
import { Navigation } from '@/components/layout/Navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function SubProcessors() {
    const { t } = useTranslation();

    const processors = [
        { name: 'Amazon Web Services (AWS)', purpose: 'Cloud Infrastructure & Hosting', location: 'USA' },
        { name: 'Supabase', purpose: 'Database & Authentication', location: 'USA' },
        { name: 'Stripe', purpose: 'Payment Processing', location: 'USA' },
        { name: 'OpenAI', purpose: 'AI & Machine Learning Services', location: 'USA' },
        { name: 'Postmark', purpose: 'Transactional Email', location: 'USA' },
        { name: 'Vercel', purpose: 'Edge Network & Hosting', location: 'Global' },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navigation />

            <main className="flex-grow pt-24 pb-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold tracking-tight mb-4">{t('sub_processors.title')}</h1>
                        <p className="text-xl text-muted-foreground">{t('sub_processors.description')}</p>
                    </div>

                    <div className="prose prose-gray dark:prose-invert max-w-none mb-12">
                        <p>
                            SyncRivo engages the following entities as sub-processors to assist in providing our services.
                            We maintain data processing agreements with each sub-processor to ensuring the protection and privacy of your data.
                        </p>
                    </div>

                    <div className="rounded-xl border border-border shadow-sm overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50">
                                    <TableHead className="w-[30%]">Name</TableHead>
                                    <TableHead className="w-[40%]">Purpose</TableHead>
                                    <TableHead>Location</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {processors.map((processor) => (
                                    <TableRow key={processor.name}>
                                        <TableCell className="font-medium">{processor.name}</TableCell>
                                        <TableCell>{processor.purpose}</TableCell>
                                        <TableCell>{processor.location}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
