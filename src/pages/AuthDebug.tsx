
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, RefreshCw, ExternalLink } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Separator } from '@/components/ui/separator';

export default function AuthDebug() {
    const { session, user } = useAuth();
    const [urlParams, setUrlParams] = useState<Record<string, string>>({});
    const [urlHashParams, setUrlHashParams] = useState<Record<string, string>>({});
    const [checkResult, setCheckResult] = useState<{ status: 'loading' | 'success' | 'error', message: string }>({ status: 'loading', message: 'Checking Supabase connection...' });
    const [lastEvent, setLastEvent] = useState<string>('None');

    useEffect(() => {
        // 1. Capture URL params (search)
        const params = new URLSearchParams(window.location.search);
        const paramsObj: Record<string, string> = {};
        params.forEach((value, key) => {
            paramsObj[key] = value;
        });
        setUrlParams(paramsObj);

        // 2. Capture Hash params (Supabase often returns tokens in hash)
        const hash = window.location.hash.substring(1); // remove #
        const hashParams = new URLSearchParams(hash);
        const hashObj: Record<string, string> = {};
        hashParams.forEach((value, key) => {
            hashObj[key] = value;
        });
        setUrlHashParams(hashObj);

        // 3. Health Check
        checkSupabaseConnection();

        // 4. Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setLastEvent(`${event} at ${new Date().toLocaleTimeString()}`);
        });

        return () => subscription.unsubscribe();
    }, []);

    const checkSupabaseConnection = async () => {
        setCheckResult({ status: 'loading', message: 'Pinging Supabase...' });
        try {
            // Use user_preferences as it is a known table type in the project
            // @ts-ignore - Ignoring type check for debug tool flexibility
            const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });

            // Fallback if profiles doesn't exist, try user_preferences which was in the type error
            if (error && error.code === '42P01') {
                const { error: error2 } = await supabase.from('user_preferences').select('count', { count: 'exact', head: true });
                if (error2) throw error2;
            } else if (error) {
                // It's possible profiles table assumes auth, so this error might be "expected" if RLS blocks it.
                // But network errors will show up here.
                setCheckResult({ status: 'error', message: `Supabase reachable but returned error: ${error.message} (Hint: This might be RLS, which is fine)` });
                return;
            }
            setCheckResult({ status: 'success', message: 'Supabase connection successful.' });
        } catch (e: any) {
            setCheckResult({ status: 'error', message: `Network/Client Error: ${e.message}` });
        }
    };

    const handleTestGoogle = async () => {
        const redirectUrl = `${window.location.origin}/auth-debug`;
        console.log('Testing Google Sign-In with redirect:', redirectUrl);

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: redirectUrl,
                skipBrowserRedirect: false,
            }
        });

        if (error) {
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="container mx-auto py-10 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Auth Debugger</h1>
                <p className="text-muted-foreground">Diagnostics for Supabase Auth & Google Sign-In</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Health Check */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <RefreshCw className="w-5 h-5" />
                            <span>System Health</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className={`p-4 rounded-md border ${checkResult.status === 'success' ? 'bg-green-50 border-green-200 text-green-700' : checkResult.status === 'error' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-gray-50'}`}>
                            <div className="flex items-start gap-3">
                                {checkResult.status === 'success' ? <CheckCircle className="w-5 h-5 mt-0.5" /> : <AlertCircle className="w-5 h-5 mt-0.5" />}
                                <div>
                                    <div className="font-semibold">{checkResult.status.toUpperCase()}</div>
                                    <div className="text-sm mt-1">{checkResult.message}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="text-sm font-medium mb-1">Configuration</div>
                            <div className="text-xs font-mono bg-muted p-2 rounded">
                                URL: {window.location.origin}<br />
                                Supabase URL: {import.meta.env.VITE_SUPABASE_URL?.substring(0, 20)}...
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Current Session */}
                <Card>
                    <CardHeader>
                        <CardTitle>Session State</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <div className="text-sm font-medium">User Status</div>
                            <div className={`text-lg font-bold ${session ? 'text-green-600' : 'text-yellow-600'}`}>
                                {session ? 'Authenticated' : 'Not Authenticated'}
                            </div>
                        </div>
                        {session && (
                            <div className="text-xs bg-muted p-2 rounded overflow-auto max-h-40">
                                <pre>{JSON.stringify(session.user, null, 2)}</pre>
                            </div>
                        )}
                        <div>
                            <div className="text-sm font-medium">Last Auth Event</div>
                            <div className="text-sm">{lastEvent}</div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* URL Params Analysis (for Callback debugging) */}
            <Card>
                <CardHeader>
                    <CardTitle>URL Parameters (Callback Data)</CardTitle>
                    <CardDescription>
                        If you were redirected back from Google, errors often appear here.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {Object.keys(urlHashParams).length > 0 || Object.keys(urlParams).length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-sm font-semibold mb-2">Hash Params (#...)</h4>
                                {Object.keys(urlHashParams).length > 0 ? (
                                    <table className="w-full text-sm">
                                        <tbody>
                                            {Object.entries(urlHashParams).map(([k, v]) => (
                                                <tr key={k} className="border-b">
                                                    <td className="py-1 font-mono text-muted-foreground">{k}</td>
                                                    <td className="py-1 font-mono break-all pl-2">{v}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : <div className="text-sm text-muted-foreground">None</div>}
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold mb-2">Query Params (?...)</h4>
                                {Object.keys(urlParams).length > 0 ? (
                                    <table className="w-full text-sm">
                                        <tbody>
                                            {Object.entries(urlParams).map(([k, v]) => (
                                                <tr key={k} className="border-b">
                                                    <td className="py-1 font-mono text-muted-foreground">{k}</td>
                                                    <td className="py-1 font-mono break-all pl-2">{v}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : <div className="text-sm text-muted-foreground">None</div>}
                            </div>
                        </div>
                    ) : (
                        <div className="text-sm text-muted-foreground italic">No URL parameters found. This page is clean.</div>
                    )}

                    {/* Heuristic for errors */}
                    {urlHashParams['error'] || urlParams['error'] ? (
                        <Alert variant="destructive" className="mt-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Auth Error Detected in URL</AlertTitle>
                            <AlertDescription>
                                Code: {urlHashParams['error_code'] || urlParams['error_code']}<br />
                                Description: {urlHashParams['error_description'] || urlParams['error_description']?.replace(/\+/g, ' ')}
                            </AlertDescription>
                        </Alert>
                    ) : null}
                </CardContent>
            </Card>

            {/* Actions */}
            <Card>
                <CardHeader><CardTitle>Test Actions</CardTitle></CardHeader>
                <CardContent className="flex gap-4">
                    <Button onClick={handleTestGoogle} className="gap-2">
                        Test Google Sign-In (Redirect)
                        <ExternalLink className="w-4 h-4" />
                    </Button>

                    <Button variant="outline" onClick={() => supabase.auth.signOut()}>
                        Sign Out
                    </Button>

                    <Button variant="secondary" onClick={() => window.location.href = '/auth-debug'}>
                        Clear URL Params
                    </Button>
                </CardContent>
            </Card>

            <div className="max-w-xl mx-auto border-t pt-8">
                <h3 className="font-semibold mb-4">Required Configuration Checklist</h3>
                <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                        <input type="checkbox" readOnly />
                        <span><strong>Supabase:</strong> Redirect URL <code>{window.location.origin}/</code> is added to Allow List.</span>
                    </li>
                    <li className="flex gap-2">
                        <input type="checkbox" readOnly />
                        <span><strong>Google Console:</strong> Authorized Redirect URI matches <code>{import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'}/auth/v1/callback</code>.</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
