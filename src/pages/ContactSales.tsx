import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Footer } from '@/components/layout/Footer';
import { Navigation } from '@/components/layout/Navigation';

export default function ContactSales() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navigation />

            <main className="flex-grow pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Left Column: Hero/Info */}
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                                {t('contact_sales.title')}
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                {t('contact_sales.description')}
                            </p>

                            <div className="space-y-4 pt-4">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-primary/10 rounded-full">
                                        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-lg">Custom Enterprise Pricing</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-primary/10 rounded-full">
                                        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-lg">Dedicated Success Manager</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-primary/10 rounded-full">
                                        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-lg">Priority Support Patterns</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Form */}
                        <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/50">
                            <CardHeader>
                                <CardTitle>Get in Touch</CardTitle>
                                <CardDescription>Fill out the form below and we'll get back to you shortly.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium">Name</label>
                                            <Input id="name" placeholder="John Doe" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium">Work Email</label>
                                            <Input id="email" type="email" placeholder="john@company.com" required />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="company" className="text-sm font-medium">Company</label>
                                        <Input id="company" placeholder="Acme Inc." required />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium">Message</label>
                                        <Textarea
                                            id="message"
                                            placeholder="Tell us about your integration needs..."
                                            className="min-h-[120px]"
                                            required
                                        />
                                    </div>

                                    <Button type="submit" className="w-full text-lg py-6 btn-shine">
                                        {t('footer.book_demo')}
                                    </Button>

                                    <p className="text-xs text-center text-muted-foreground mt-4">
                                        By submitting this form, you agree to our <a href="/terms" className="underline hover:text-primary">Terms</a> and <a href="/privacy" className="underline hover:text-primary">Privacy Policy</a>.
                                    </p>
                                </form>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
