import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, CheckCircle2, Code, FileJson, Loader2, Sparkles, X } from 'lucide-react';
import { EXAMPLE_TEMPLATES, TEMPLATE_LABELS } from '@/data/exampleTemplates';

const DashboardConnections = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState('');
  const [backendError, setBackendError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const { toast } = useToast();

  const handleJsonChange = (value: string) => {
    setJsonInput(value);
    setBackendError('');
    setSuccessMessage('');

    if (!value.trim()) {
      setJsonError('');
      setIsUpdateMode(false);
      return;
    }

    // Only check JSON syntax
    try {
      const parsed = JSON.parse(value);
      setJsonError('');
      setIsUpdateMode(!!(parsed._id && parsed._id.$oid));
    } catch (e) {
      setJsonError('Invalid JSON syntax');
      setIsUpdateMode(false);
    }
  };

  const handleAutoFormat = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonInput(formatted);
      toast({
        title: 'Formatted',
        description: 'JSON has been auto-formatted',
      });
    } catch (e) {
      toast({
        title: 'Cannot Format',
        description: 'Invalid JSON syntax',
        variant: 'destructive',
      });
    }
  };

  const handleLoadTemplate = (templateKey: string) => {
    const template = EXAMPLE_TEMPLATES[templateKey];
    const prettyJson = JSON.stringify(template, null, 2);
    setJsonInput(prettyJson);
    handleJsonChange(prettyJson);
    setSuccessMessage('');
    setBackendError('');
    toast({
      title: 'Template Loaded',
      description: `Loaded ${TEMPLATE_LABELS[templateKey]} template`,
    });
  };

  const handleCreate = async () => {
    if (jsonError) {
      toast({
        title: 'Invalid JSON',
        description: 'Please fix JSON syntax before submitting',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);
      setBackendError('');
      setSuccessMessage('');

      const payload = JSON.parse(jsonInput);
      delete payload._id; // Remove _id for create

      const response = await fetch(
        'https://asia-south1-testing-474706.cloudfunctions.net/create-channel',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          mode: 'cors',
        }
      );

      const responseText = await response.text();

      if (!response.ok) {
        setBackendError(responseText || `HTTP ${response.status}: ${response.statusText}`);
        return;
      }

      // Success
      setSuccessMessage('Channel created successfully!');
      setJsonInput('');
      setJsonError('');

      toast({
        title: 'Success!',
        description: 'Channel created successfully',
      });

    } catch (error: any) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setBackendError('CORS Error: Unable to connect to backend. The server needs to allow requests from this origin.');
      } else {
        setBackendError(error.message || 'Unknown error occurred');
      }

      console.error('[SyncRivo Connections] Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (jsonError) {
      toast({
        title: 'Invalid JSON',
        description: 'Please fix JSON syntax before submitting',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);
      setBackendError('');
      setSuccessMessage('');

      const payload = JSON.parse(jsonInput);

      if (!payload._id || !payload._id.$oid) {
        setBackendError('Missing _id.$oid for update operation');
        return;
      }

      const response = await fetch(
        'https://asia-south1-testing-474706.cloudfunctions.net/update-channel',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          mode: 'cors',
        }
      );

      const responseText = await response.text();

      if (!response.ok) {
        setBackendError(responseText || `HTTP ${response.status}: ${response.statusText}`);
        return;
      }

      // Success
      setSuccessMessage('Channel updated successfully!');

      toast({
        title: 'Success!',
        description: 'Channel updated successfully',
      });

    } catch (error: any) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setBackendError('CORS Error: Unable to connect to backend. The server needs to allow requests from this origin.');
      } else {
        setBackendError(error.message || 'Unknown error occurred');
      }

      console.error('[SyncRivo Connections] Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setJsonInput('');
    setJsonError('');
    setBackendError('');
    setSuccessMessage('');
    setIsUpdateMode(false);
  };

  const isValid = !jsonError && jsonInput.trim().length > 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Code className="w-6 h-6 text-primary" />
              <CardTitle className="text-3xl font-bold">Connections</CardTitle>
            </div>
            <CardDescription className="text-base">
              Create and manage cross-platform channels. No validation - send any JSON structure.
            </CardDescription>

            {isUpdateMode && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                <FileJson className="w-4 h-4" />
                Update Mode (has _id)
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Success Banner */}
            {successMessage && (
              <Alert className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertDescription className="flex items-center justify-between">
                  <span className="text-green-700 dark:text-green-300 font-medium">
                    {successMessage}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSuccessMessage('')}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {/* Error Banner */}
            {backendError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="font-semibold mb-2">Backend Error:</div>
                      <pre className="text-xs whitespace-pre-wrap font-mono bg-red-50 dark:bg-red-950 p-3 rounded border border-red-200 dark:border-red-800">
                        {backendError}
                      </pre>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setBackendError('')}
                      className="h-6 w-6 p-0 flex-shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* JSON Syntax Error */}
            {jsonError && !backendError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{jsonError}</AlertDescription>
              </Alert>
            )}

            {/* JSON Editor */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-foreground">
                  JSON Payload
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAutoFormat}
                  disabled={!jsonInput || isLoading}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Auto-Format
                </Button>
              </div>
              <Textarea
                value={jsonInput}
                onChange={(e) => handleJsonChange(e.target.value)}
                placeholder='Paste any JSON here. Example:
{
  "channel_id": "AAQAWWyiEBo",
  "name": "General",
  "provider": "google",
  "routes": {
    "to": "teams"
  }
}'
                className="font-mono text-sm min-h-[400px] resize-y"
                spellCheck={false}
              />
              <p className="text-xs text-muted-foreground">
                No validation applied. Backend will process any valid JSON structure.
              </p>
            </div>

            {/* Example Templates */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">
                Quick Start Templates
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.keys(EXAMPLE_TEMPLATES).map((key) => (
                  <Button
                    key={key}
                    variant="outline"
                    size="sm"
                    onClick={() => handleLoadTemplate(key)}
                    disabled={isLoading}
                    className="justify-start"
                  >
                    <FileJson className="w-4 h-4 mr-2" />
                    {TEMPLATE_LABELS[key]}
                  </Button>
                ))}
              </div>
              <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
                <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <AlertDescription className="text-amber-700 dark:text-amber-300 text-xs">
                  <strong>Templates contain placeholder values only.</strong> Replace all example IDs (channel_id, team_id, secrets, etc.) with your real values before creating a channel.
                </AlertDescription>
              </Alert>
            </div>


            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={handleReset}
                disabled={isLoading || !jsonInput}
              >
                Reset
              </Button>

              {isUpdateMode ? (
                <Button
                  onClick={handleUpdate}
                  disabled={!isValid || isLoading}
                  className="min-w-[140px]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update Channel'
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleCreate}
                  disabled={!isValid || isLoading}
                  className="min-w-[140px]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Channel'
                  )}
                </Button>
              )}
            </div>

            {/* Help Text */}
            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong>CORS Note:</strong> If you see "Failed to fetch" errors, the backend Cloud Function needs CORS headers configured.
                Contact your backend team to enable CORS for this origin.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* API Info */}
        <div className="max-w-4xl mx-auto mt-6">
          <Card className="bg-slate-100 dark:bg-slate-900">
            <CardContent className="p-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-foreground">Backend Endpoints:</p>
                <code className="block text-[10px] text-muted-foreground">POST https://asia-south1-testing-474706.cloudfunctions.net/create-channel</code>
                <code className="block text-[10px] text-muted-foreground">POST https://asia-south1-testing-474706.cloudfunctions.net/update-channel</code>
                <p className="text-xs text-muted-foreground pt-2">
                  <strong>Backend Requirements:</strong> Endpoints must handle OPTIONS requests and return proper CORS headers.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardConnections;