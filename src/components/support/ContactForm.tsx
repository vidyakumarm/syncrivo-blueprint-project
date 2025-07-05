import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  MessageSquare
} from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  category: string;
  priority: string;
  message: string;
}

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    category: '',
    priority: 'medium',
    message: ''
  });

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
        duration: 5000,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        priority: 'medium',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const responseTimeInfo = {
    high: { time: '< 2 hours', color: 'text-destructive', icon: <AlertCircle className="h-3 w-3" /> },
    medium: { time: '< 24 hours', color: 'text-accent', icon: <Clock className="h-3 w-3" /> },
    low: { time: '2-3 days', color: 'text-muted-foreground', icon: <MessageSquare className="h-3 w-3" /> }
  };

  const currentResponseTime = responseTimeInfo[formData.priority as keyof typeof responseTimeInfo];

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Send className="h-5 w-5 mr-2" />
          Contact Support
        </CardTitle>
        <p className="text-muted-foreground">
          Get help with your SyncRivo account, integrations, or technical issues.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="john@company.com"
                required
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              placeholder="Brief description of your issue"
              required
            />
          </div>

          {/* Category and Priority */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => handleInputChange('category', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border">
                  <SelectItem value="technical">Technical Issue</SelectItem>
                  <SelectItem value="billing">Billing & Pricing</SelectItem>
                  <SelectItem value="integration">Integration Help</SelectItem>
                  <SelectItem value="api">API Support</SelectItem>
                  <SelectItem value="account">Account Management</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={formData.priority} 
                onValueChange={(value) => handleInputChange('priority', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border">
                  <SelectItem value="high">High - Urgent</SelectItem>
                  <SelectItem value="medium">Medium - Normal</SelectItem>
                  <SelectItem value="low">Low - When possible</SelectItem>
                </SelectContent>
              </Select>
              {formData.priority && (
                <div className={`flex items-center mt-1 text-xs ${currentResponseTime.color}`}>
                  {currentResponseTime.icon}
                  <span className="ml-1">Expected response: {currentResponseTime.time}</span>
                </div>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Please describe your issue in detail. Include any error messages, steps you've tried, and relevant information about your setup."
              className="min-h-32"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              {formData.message.length}/2000 characters
            </p>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={isSubmitting || !formData.name || !formData.email || !formData.subject || !formData.category || !formData.message}
            className="w-full bg-gradient-primary"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending Message...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}