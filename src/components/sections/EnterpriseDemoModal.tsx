import { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, Shield, Users, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface EnterpriseDemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const companySizes = [
  { value: '1-50', label: '1–50 employees' },
  { value: '51-200', label: '51–200 employees' },
  { value: '201-500', label: '201–500 employees' },
  { value: '501-1000', label: '501–1,000 employees' },
  { value: '1000+', label: '1,000+ employees' },
];

const platforms = [
  { value: 'teams-slack', label: 'Microsoft Teams + Slack' },
  { value: 'teams-only', label: 'Microsoft Teams only' },
  { value: 'slack-only', label: 'Slack only' },
  { value: 'multiple', label: 'Multiple platforms' },
];

const demoTypes = [
  { value: 'live-demo', label: 'Live Product Demo', icon: Zap, description: 'See SyncRivo in action' },
  { value: 'security', label: 'Security Walkthrough', icon: Shield, description: 'Enterprise compliance deep-dive' },
  { value: 'poc', label: 'POC Discussion', icon: Users, description: 'Plan a proof-of-concept' },
];

// Generate timezone-aware time slots
const generateTimeSlots = () => {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const slots = [];
  const today = new Date();
  
  for (let dayOffset = 1; dayOffset <= 5; dayOffset++) {
    const date = new Date(today);
    date.setDate(today.getDate() + dayOffset);
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    const dateStr = date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
    
    // Morning and afternoon slots
    ['9:00 AM', '10:30 AM', '2:00 PM', '3:30 PM'].forEach(time => {
      slots.push({
        value: `${date.toISOString().split('T')[0]}-${time.replace(/\s/g, '')}`,
        label: `${dateStr} · ${time}`,
        timezone: userTimezone,
      });
    });
  }
  
  return slots.slice(0, 8); // Limit to 8 slots
};

export function EnterpriseDemoModal({ open, onOpenChange }: EnterpriseDemoModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    companySize: '',
    platforms: '',
    demoType: '',
    timeSlot: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = useMemo(() => generateTimeSlots(), []);
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Demo Scheduled!', {
      description: 'Check your email for confirmation and calendar invite.',
    });
    
    setIsSubmitting(false);
    onOpenChange(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      companySize: '',
      platforms: '',
      demoType: '',
      timeSlot: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px] max-h-[90vh] p-0 gap-0 overflow-hidden bg-background border-border/50 shadow-2xl">
        {/* Scrollable container */}
        <div className="max-h-[90vh] overflow-y-auto">
          {/* Premium header with gradient */}
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent px-6 sm:px-8 pt-6 sm:pt-8 pb-5 sm:pb-6 border-b border-border/30 sticky top-0 z-10 backdrop-blur-sm">
            <DialogHeader className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight">
                  Book Your Enterprise Demo
                </DialogTitle>
              </div>
              <DialogDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Experience how <span className="font-semibold text-foreground">SyncRivo</span> enables 
                seamless cross-platform messaging for enterprise teams — secure, instant, and effortless.
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Form content */}
          <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-5 sm:py-6 space-y-5 sm:space-y-6">
          {/* Demo type selection */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">What would you like to explore?</Label>
            <div className="grid grid-cols-1 gap-2.5">
              {demoTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, demoType: type.value }))}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    formData.demoType === type.value
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border/50 hover:border-primary/30 hover:bg-muted/30'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    formData.demoType === type.value 
                      ? 'bg-primary/15 text-primary' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <type.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{type.label}</p>
                    <p className="text-xs text-muted-foreground">{type.description}</p>
                  </div>
                  {formData.demoType === type.value && (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Contact info row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
              <Input
                id="name"
                placeholder="John Smith"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Work Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@company.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                className="h-11"
              />
            </div>
          </div>

          {/* Company details row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-medium">Company</Label>
              <Input
                id="company"
                placeholder="Company name"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Company Size</Label>
              <Select
                value={formData.companySize}
                onValueChange={(value) => setFormData(prev => ({ ...prev, companySize: value }))}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {companySizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Platforms dropdown */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Which platforms do you use?</Label>
            <Select
              value={formData.platforms}
              onValueChange={(value) => setFormData(prev => ({ ...prev, platforms: value }))}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select your platforms" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((platform) => (
                  <SelectItem key={platform.value} value={platform.value}>
                    {platform.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Time slot picker */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Select a Time Slot</Label>
              <span className="text-xs text-muted-foreground">{userTimezone}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, timeSlot: slot.value }))}
                  className={`px-3 py-2.5 text-sm rounded-lg border transition-all duration-200 ${
                    formData.timeSlot === slot.value
                      ? 'border-primary bg-primary/10 text-primary font-medium'
                      : 'border-border/50 hover:border-primary/40 hover:bg-muted/50 text-foreground'
                  }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            disabled={isSubmitting || !formData.demoType || !formData.name || !formData.email || !formData.timeSlot}
            className="w-full h-12 bg-gradient-primary hover:bg-gradient-primary-hover text-white font-semibold text-base shadow-brand-lg hover:shadow-brand-xl transition-all duration-300"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Scheduling...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Confirm Demo Booking
                <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>

          {/* Trust text */}
          <p className="text-center text-xs text-muted-foreground pb-2">
            By booking, you agree to receive communication from SyncRivo. 
            We respect your privacy and never share your data.
          </p>
        </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
