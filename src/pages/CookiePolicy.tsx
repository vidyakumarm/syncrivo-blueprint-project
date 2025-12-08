import { useTranslation } from 'react-i18next';
import { Footer } from '@/components/layout/Footer';
import { Navigation } from '@/components/layout/Navigation';

export default function CookiePolicy() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navigation />

            <main className="flex-grow pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold tracking-tight mb-4">{t('cookie_policy.title')}</h1>
                        <p className="text-xl text-muted-foreground">{t('cookie_policy.description')}</p>
                    </div>

                    <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                            <p>
                                SyncRivo uses cookies to improve your experience on our website. This Cookie Policy explains what cookies are,
                                how we use them, and your choices regarding cookies.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">2. What are Cookies?</h2>
                            <p>
                                Cookies are small text files that are stored on your device when you visit a website. They are widely used to
                                make websites work more efficiently and to provide information to the owners of the site.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">3. How We Use Cookies</h2>
                            <div className="space-y-4">
                                <div className="p-4 bg-card rounded-lg border border-border">
                                    <h3 className="text-lg font-medium mb-2">Essential Cookies</h3>
                                    <p className="text-sm text-muted-foreground">
                                        These cookies are necessary for the website to function and cannot be switched off. They are usually only set
                                        in response to actions made by you, such as setting your privacy preferences, logging in, or filling in forms.
                                    </p>
                                </div>

                                <div className="p-4 bg-card rounded-lg border border-border">
                                    <h3 className="text-lg font-medium mb-2">Performance & Analytics</h3>
                                    <p className="text-sm text-muted-foreground">
                                        These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.
                                        They help us to know which pages are the most and least popular.
                                    </p>
                                </div>

                                <div className="p-4 bg-card rounded-lg border border-border">
                                    <h3 className="text-lg font-medium mb-2">Functional Cookies</h3>
                                    <p className="text-sm text-muted-foreground">
                                        These cookies enable the website to provide enhanced functionality and personalization. They may be set by us
                                        or by third-party providers whose services we have added to our pages.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">4. Managing Cookies</h2>
                            <p>
                                Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies,
                                including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org" className="text-primary hover:underline">www.aboutcookies.org</a>.
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
