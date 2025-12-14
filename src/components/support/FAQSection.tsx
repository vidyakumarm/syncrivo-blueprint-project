import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  ChevronDown,
  ChevronUp,
  Search,
  HelpCircle,
  Zap,
  CreditCard,
  Shield,
  Code,
  Settings
} from 'lucide-react';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  popular: boolean;
}

export const faqs: FAQItem[] = [
  {
    id: '1',
    question: 'How do I get started with SyncRivo?',
    answer: 'Getting started is easy! First, create your free account and get your API key from the dashboard. Then install our SDK using npm install @syncrivo/sdk or use our REST API directly. Check out our Quick Start guide in the documentation for a step-by-step walkthrough.',
    category: 'getting-started',
    popular: true
  },
  {
    id: '2',
    question: 'What integrations are supported?',
    answer: 'We support 50+ integrations including Slack, Google Drive, Notion, Airtable, Trello, Salesforce, HubSpot, and many more. You can also create custom integrations using webhooks or our REST API. New integrations are added regularly based on user requests.',
    category: 'integrations',
    popular: true
  },
  {
    id: '3',
    question: 'How much does SyncRivo cost?',
    answer: 'We offer a free tier with 1,000 syncs per month, perfect for testing and small projects. Paid plans start at $29/month for 10,000 syncs. Enterprise plans are available for high-volume usage with custom pricing. Check our pricing page for full details.',
    category: 'billing',
    popular: true
  },
  {
    id: '4',
    question: 'Is my data secure?',
    answer: 'Absolutely! We use enterprise-grade security including AES-256 encryption, SOC 2 compliance, and regular security audits. Data is encrypted both in transit and at rest. We never store your actual data - only the minimum metadata needed for synchronization.',
    category: 'security',
    popular: false
  },
  {
    id: '5',
    question: 'What are rate limits?',
    answer: 'Rate limits prevent API abuse and ensure reliable service for all users. Free accounts have a limit of 100 requests per minute, while paid plans get higher limits. If you hit a rate limit, requests will be queued and processed automatically.',
    category: 'technical',
    popular: false
  },
  {
    id: '6',
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time from your account settings. Your plan will remain active until the end of your current billing period, and you\'ll retain access to all features until then.',
    category: 'billing',
    popular: false
  },
  {
    id: '7',
    question: 'How do I set up webhooks?',
    answer: 'Webhooks allow real-time data synchronization. In your dashboard, go to Integrations > Create New > Webhook. Enter your endpoint URL, select the events you want to receive, and configure any authentication headers. We\'ll send a test request to verify the setup.',
    category: 'technical',
    popular: true
  },
  {
    id: '8',
    question: 'What happens if a sync fails?',
    answer: 'Failed syncs are automatically retried up to 3 times with exponential backoff. If all retries fail, you\'ll receive an email notification and can view the error details in your dashboard. Most failures are temporary and resolve automatically.',
    category: 'technical',
    popular: false
  }
];

export function FAQSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Topics', icon: <HelpCircle className="h-4 w-4" /> },
    { id: 'getting-started', label: 'Getting Started', icon: <Zap className="h-4 w-4" /> },
    { id: 'integrations', label: 'Integrations', icon: <Settings className="h-4 w-4" /> },
    { id: 'technical', label: 'Technical', icon: <Code className="h-4 w-4" /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard className="h-4 w-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="h-4 w-4" /> },
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground">
          Find quick answers to common questions about SyncRivo
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center space-x-2"
          >
            {category.icon}
            <span>{category.label}</span>
          </Button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="max-w-4xl mx-auto space-y-4">
        {filteredFAQs.map((faq) => (
          <Card key={faq.id} className="bg-gradient-card">
            <CardContent className="p-0">
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full p-6 text-left hover:bg-accent/50 transition-colors rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <h3 className="font-semibold text-foreground pr-4">
                      {faq.question}
                    </h3>
                    {faq.popular && (
                      <Badge variant="secondary" className="text-xs">
                        Popular
                      </Badge>
                    )}
                  </div>
                  {openItems.has(faq.id) ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                </div>
              </button>

              {openItems.has(faq.id) && (
                <div className="px-6 pb-6 animate-fade-in">
                  <div className="pt-4 border-t border-border">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No FAQs found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or browse different categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}