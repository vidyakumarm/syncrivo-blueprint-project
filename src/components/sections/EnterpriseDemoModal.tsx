import { useState, useMemo, useEffect } from 'react';
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
import { Calendar } from '@/components/ui/calendar';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Shield,
  Users,
  Zap,
  CheckCircle,
  X,
  Globe,
  Clock,
  AlertCircle,
  ChevronsUpDown,
  Check,
  Info
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';

interface EnterpriseDemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const COMPANY_SIZES = [
  { value: '1-50', label: '1–50' },
  { value: '51-200', label: '51–200' },
  { value: '201-500', label: '201–500' },
  { value: '501-1000', label: '501–1k' },
  { value: '1000+', label: '1k+' },
];

const PLATFORMS_OPTIONS = [
  { value: 'microsoft-teams', label: 'Microsoft Teams' },
  { value: 'slack', label: 'Slack' },
  { value: 'zoom', label: 'Zoom' },
  { value: 'google-chat', label: 'Google Chat' },
  { value: 'google-meet', label: 'Google Meet' },
  { value: 'discord', label: 'Discord' },
  { value: 'webex', label: 'Webex' },
  { value: 'whatsapp-business', label: 'WhatsApp Business' },
  { value: 'telegram', label: 'Telegram' },
  { value: 'others', label: 'Other' },
];

const AGENDA_ITEMS = [
  { id: 'overview', label: 'Product Overview' },
  { id: 'security', label: 'Security & Compliance' },
  { id: 'integrations', label: 'Integration Requirements' },
  { id: 'pricing', label: 'Pricing & Licensing' },
  { id: 'custom', label: 'Custom Use Case Discussion' },
];

const COMMON_TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney"
];

const PERSONAL_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'hotmail.com',
  'icloud.com',
  'aol.com',
  'protonmail.com',
  'live.com',
  'me.com',
  'msn.com',
  'comcast.net'
];

const getBrowserTimezone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (e) {
    return 'UTC';
  }
};

interface TimeSlot {
  value: string; // ISO string (UTC)
  label: string; // "9:00 AM" (Local)
}

export function EnterpriseDemoModal({ open, onOpenChange }: EnterpriseDemoModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    companySize: '',
    sourcePlatform: '',
    destinationPlatform: '',
    sourceCustom: '',
    destinationCustom: '',
    agendaChecklist: [] as string[],
    demoType: 'live_demo',
    timeSlot: '',
    timezone: getBrowserTimezone(),
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [isSlotsLoading, setIsSlotsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const availableTimezones = useMemo(() => {
    const tz = getBrowserTimezone();
    const zones = new Set([...COMMON_TIMEZONES, tz]);
    return Array.from(zones).sort((a, b) =>
      a === 'UTC' ? -1 : b === 'UTC' ? 1 : a.localeCompare(b)
    );
  }, []);

  // Validation Logic
  const validationErrors = useMemo(() => {
    const newErrors: Record<string, string> = {};

    // Name: Min 2 words, no single chars
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name';
    } else {
      const parts = formData.name.trim().split(/\s+/);
      if (parts.length < 2) {
        newErrors.name = 'Please enter your full name (First & Last)';
      } else if (formData.name.length < 3) {
        newErrors.name = 'Name is too short';
      }
    }

    // Email: Check Personal Domains + Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Enter a valid work email (name@company.com)';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    } else {
      const domain = formData.email.split('@')[1]?.toLowerCase();
      if (domain && PERSONAL_EMAIL_DOMAINS.includes(domain)) {
        newErrors.email = 'Personal email domains are not supported';
      }
    }

    // Company: Min 2 chars
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    } else if (formData.company.trim().length < 2) {
      newErrors.company = 'Company name must be at least 2 characters';
    }

    if (!formData.companySize) newErrors.companySize = 'Required';

    // Platforms
    if (!formData.sourcePlatform) newErrors.sourcePlatform = 'Required';
    if (!formData.destinationPlatform) newErrors.destinationPlatform = 'Required';

    if (formData.sourcePlatform === 'others' && !formData.sourceCustom.trim()) newErrors.sourceCustom = 'Required';
    if (formData.destinationPlatform === 'others' && !formData.destinationCustom.trim()) newErrors.destinationCustom = 'Required';

    if (formData.sourcePlatform && formData.destinationPlatform &&
      formData.sourcePlatform !== 'others' &&
      formData.sourcePlatform === formData.destinationPlatform) {
      newErrors.integrationCheck = 'Source and Destination cannot be the same';
    }

    // Date & Time
    if (!selectedDate) newErrors.date = 'Required';
    if (!formData.timeSlot) newErrors.timeSlot = 'Required';

    return newErrors;
  }, [formData, selectedDate]);

  const isValid = Object.keys(validationErrors).length === 0;

  // Logic to fetch/generate slots
  useEffect(() => {
    if (!selectedDate || !formData.timezone) {
      setAvailableSlots([]);
      return;
    }

    setIsSlotsLoading(true);
    setFormData(prev => ({ ...prev, timeSlot: '' }));

    const timer = setTimeout(() => {
      const slots: TimeSlot[] = [];
      const targetHours = [9, 9.5, 10, 10.5, 11, 11.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17];

      targetHours.forEach(hour => {
        const d = new Date(selectedDate);
        const h = Math.floor(hour);
        const m = (hour - h) * 60;
        d.setHours(h, m, 0, 0);
        const label = format(d, 'h:mm a');
        slots.push({
          value: d.toISOString(),
          label: label
        });
      });

      setAvailableSlots(slots);
      setIsSlotsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [selectedDate, formData.timezone]);

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all as touched to show errors
    const allFields = Object.keys(formData);
    const allTouched = allFields.reduce((acc, curr) => ({ ...acc, [curr]: true }), {});
    setTouched(allTouched);

    if (!isValid) {
      toast.error('Please complete all required fields correctly.');
      return;
    }

    setStatus('submitting');

    try {
      let timePayload = "00:00";
      if (formData.timeSlot) {
        const d = new Date(formData.timeSlot);
        timePayload = format(d, 'HH:mm');
      }

      const selectedDateStr = selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'N/A';

      const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your SyncRivo Enterprise Demo is Confirmed</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #f4f4f5; }
    .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    .header { background-color: #10b981; padding: 32px 40px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
    .hero { padding: 40px; text-align: center; border-bottom: 1px solid #f0f0f0; }
    .hero h2 { margin: 0 0 16px; color: #111827; font-size: 22px; }
    .hero p { margin: 0; color: #6b7280; font-size: 16px; }
    .details { padding: 32px 40px; background-color: #ffffff; }
    .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f3f4f6; }
    .detail-row:last-child { border-bottom: none; }
    .label { font-weight: 600; color: #4b5563; font-size: 14px; }
    .value { color: #111827; font-weight: 500; font-size: 14px; text-align: right; }
    .cta-section { padding: 40px; text-align: center; background-color: #fafafa; }
    .button { display: inline-block; background-color: #10b981; color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2); }
    .footer { padding: 32px; text-align: center; font-size: 12px; color: #9ca3af; background-color: #f4f4f5; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>SyncRivo</h1>
    </div>
    <div class="hero">
      <h2>Your Demo is Confirmed! ✔️</h2>
      <p>Thanks for booking, ${formData.name}. We're excited to show you how SyncRivo can transform your workflow.</p>
    </div>
    <div class="details">
      <div class="detail-row">
        <span class="label">Date</span>
        <span class="value">${selectedDateStr}</span>
      </div>
      <div class="detail-row">
        <span class="label">Time</span>
        <span class="value">${timePayload} (${formData.timezone})</span>
      </div>
      <div class="detail-row">
        <span class="label">Integration</span>
        <span class="value">${formData.sourcePlatform} → ${formData.destinationPlatform}</span>
      </div>
      <div class="detail-row">
        <span class="label">Company</span>
        <span class="value">${formData.company} (${formData.companySize})</span>
      </div>
    </div>
    <div class="cta-section">
      <p style="margin-bottom: 24px; font-size: 14px; color: #6b7280;">Here is your secure meeting link:</p>
      <a href="https://meet.google.com/new" class="button">Join Meeting</a>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} SyncRivo. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
      `;

      const { error } = await supabase.functions.invoke('send-email', {
        body: {
          to: formData.email,
          subject: `Your SyncRivo Enterprise Demo is Confirmed ✔️`,
          html: emailHtml,
        },
      });

      if (error) throw error;

      setStatus('success');
      toast.success('Your demo is confirmed!');

    } catch (error) {
      console.error('Booking failed:', error);
      setStatus('error');
      toast.error('Could not send confirmation email, but your slot is reserved.');
    }
  };

  const toggleAgenda = (id: string) => {
    setFormData(prev => {
      const current = prev.agendaChecklist;
      const updated = current.includes(id)
        ? current.filter(item => item !== id)
        : [...current, id];
      return { ...prev, agendaChecklist: updated };
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] w-full h-[100dvh] sm:h-auto sm:max-h-[85vh] p-0 gap-0 overflow-hidden bg-background border-border-200 shadow-2xl flex flex-col rounded-xl">
        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center p-10 text-center space-y-6 h-full animate-in fade-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-2 shadow-sm">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Your demo is confirmed!</h2>
              <p className="text-muted-foreground max-w-sm mx-auto">
                A confirmation email has been sent to <span className="font-medium text-foreground">{formData.email}</span> with the meeting link.
              </p>
            </div>
            <div className="flex gap-4 mt-6">
              <Button onClick={() => onOpenChange(false)} variant="outline">Close</Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => window.open('https://meet.google.com/new', '_blank')}>
                Add to Calendar
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="px-8 py-5 border-b sticky top-0 bg-background/95 backdrop-blur z-20 flex justify-between items-center">
              <div>
                <DialogTitle className="text-xl font-medium">Book Enterprise Demo</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground mt-1">
                  Configure your demo session. See how secure cross-platform integrations work in real time.
                </DialogDescription>
              </div>

            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8">

              {/* SECTION 1: Integration Platforms */}
              <div className="mb-8">
                <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4 block">
                  Integration Platforms
                </Label>
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Source */}
                  <div className="flex-1 space-y-2">
                    <Label className="text-sm">Source Platform <span className="text-red-500">*</span></Label>
                    <Select
                      value={formData.sourcePlatform}
                      onValueChange={(val) => setFormData(e => ({ ...e, sourcePlatform: val }))}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select Source" />
                      </SelectTrigger>
                      <SelectContent>
                        {PLATFORMS_OPTIONS.map(p => (
                          <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formData.sourcePlatform === 'others' && (
                      <Input
                        placeholder="Type name..."
                        className="mt-2 h-9"
                        value={formData.sourceCustom}
                        onChange={e => setFormData(p => ({ ...p, sourceCustom: e.target.value }))}
                      />
                    )}
                  </div>

                  {/* Destination */}
                  <div className="flex-1 space-y-2">
                    <Label className="text-sm">Destination Platform <span className="text-red-500">*</span></Label>
                    <Select
                      value={formData.destinationPlatform}
                      onValueChange={(val) => setFormData(e => ({ ...e, destinationPlatform: val }))}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select Destination" />
                      </SelectTrigger>
                      <SelectContent>
                        {PLATFORMS_OPTIONS.map(p => (
                          <SelectItem key={p.value} value={p.value} disabled={p.value === formData.sourcePlatform && p.value !== 'others'}>
                            {p.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formData.destinationPlatform === 'others' && (
                      <Input
                        placeholder="Type name..."
                        className="mt-2 h-9"
                        value={formData.destinationCustom}
                        onChange={e => setFormData(p => ({ ...p, destinationCustom: e.target.value }))}
                      />
                    )}
                  </div>
                </div>
                {validationErrors.integrationCheck && <p className="text-xs text-red-500 mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {validationErrors.integrationCheck}</p>}
              </div >

              {/* SECTION 2: Contact Details */}
              <div className="mb-8">
                <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4 block">
                  Contact Details
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label className="text-sm" htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className={cn("h-10", touched.name && validationErrors.name && "border-red-500 ring-offset-2 focus-visible:ring-red-500")}
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      onBlur={() => handleBlur('name')}
                      aria-describedby="name-error"
                    />
                    {touched.name && validationErrors.name && (
                      <p id="name-error" className="text-xs text-red-500 flex items-center gap-1.5 animate-in slide-in-from-top-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {validationErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Work Email */}
                  <div className="space-y-2">
                    <Label className="text-sm" htmlFor="email">Work Email <span className="text-red-500">*</span></Label>
                    <Input
                      id="email"
                      placeholder="name@company.com"
                      type="email"
                      className={cn("h-10", touched.email && validationErrors.email && "border-red-500 ring-offset-2 focus-visible:ring-red-500")}
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      onBlur={() => handleBlur('email')}
                      aria-describedby="email-helper email-error"
                    />
                    {!validationErrors.email ? (
                      <p id="email-helper" className="text-xs text-muted-foreground">
                        Use your work email (e.g. name@company.com)
                      </p>
                    ) : (
                      touched.email && (
                        <p id="email-error" className="text-xs text-red-500 flex items-center gap-1.5 animate-in slide-in-from-top-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {validationErrors.email}
                        </p>
                      )
                    )}
                  </div>

                  {/* Company & Size */}
                  <div className="space-y-2">
                    <Label className="text-sm" htmlFor="company">Company & Size <span className="text-red-500">*</span></Label>
                    <div className="flex gap-2">
                      <div className="flex-[2] space-y-2">
                        <Input
                          id="company"
                          placeholder="Acme Inc"
                          className={cn("h-10", touched.company && validationErrors.company && "border-red-500 ring-offset-2 focus-visible:ring-red-500")}
                          value={formData.company}
                          onChange={e => setFormData(p => ({ ...p, company: e.target.value }))}
                          onBlur={() => handleBlur('company')}
                          aria-describedby={touched.company && validationErrors.company ? "company-error" : undefined}
                        />
                        {touched.company && validationErrors.company && (
                          <p id="company-error" className="text-xs text-red-500 flex items-center gap-1.5 absolute">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {validationErrors.company}
                          </p>
                        )}
                      </div>

                      <Select value={formData.companySize} onValueChange={v => setFormData(p => ({ ...p, companySize: v }))}>
                        <SelectTrigger className="h-10 flex-1 min-w-[90px]">
                          <SelectValue placeholder="Size" />
                        </SelectTrigger>
                        <SelectContent>
                          {COMPANY_SIZES.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: Date & Time */}
              <div className="mb-8">
                <div className="flex justify-between items-end mb-4">
                  <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Date & Time <span className="text-red-500">*</span>
                  </Label>
                  <div className="w-[180px]">
                    <Select value={formData.timezone} onValueChange={v => setFormData(p => ({ ...p, timezone: v }))}>
                      <SelectTrigger className="h-8 text-xs border-transparent hover:border-input bg-transparent hover:bg-muted text-right pr-0 justify-end gap-2">
                        <Globe className="w-3 h-3 text-muted-foreground" />
                        <SelectValue className="truncate" />
                      </SelectTrigger>
                      <SelectContent align="end">
                        {availableTimezones.map(tz => <SelectItem key={tz} value={tz}>{tz}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Layout: Grid 2 Cols */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left: Calendar */}
                  <div className="border border-border/60 rounded-xl p-4 bg-muted/10 flex flex-col items-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md"
                      classNames={{
                        head_cell: "text-muted-foreground font-normal text-[0.8rem] w-9",
                        cell: "h-9 w-9 text-center text-sm p-0 flex items-center justify-center relative [&:has([aria-selected])]:bg-primary/5 [&:has([aria-selected])]:rounded-md focus-within:relative focus-within:z-20",
                        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-muted rounded-md",
                        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                        day_today: "bg-accent text-accent-foreground",
                      }}
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today || date.getDay() === 0 || date.getDay() === 6;
                      }}
                    />
                  </div>

                  {/* Right: Time Slots */}
                  <div className="border border-border/60 rounded-xl p-0 bg-muted/10 overflow-hidden flex flex-col h-[320px]">
                    <div className="p-3 border-b bg-muted/20 text-center">
                      <span className="text-sm font-medium">
                        {selectedDate ? format(selectedDate, 'EEEE, MMMM d') : 'Select a date'}
                      </span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
                      {!selectedDate ? (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-sm gap-2 opacity-60">
                          <Clock className="w-8 h-8 opacity-50" />
                          <span>Choose a date to see times</span>
                        </div>
                      ) : isSlotsLoading ? (
                        <div className="space-y-2">
                          {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-9 w-full rounded-md" />)}
                        </div>
                      ) : availableSlots.length > 0 ? (
                        <div className="space-y-2">
                          {availableSlots.map(slot => (
                            <Button
                              key={slot.value}
                              variant={formData.timeSlot === slot.value ? "default" : "outline"}
                              className={cn(
                                "w-full justify-start h-9 text-sm font-normal",
                                formData.timeSlot === slot.value && "bg-primary text-primary-foreground font-medium"
                              )}
                              onClick={() => setFormData(p => ({ ...p, timeSlot: slot.value }))}
                            >
                              {slot.label}
                            </Button>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-10 text-sm text-muted-foreground">
                          No slots available
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 4: Topics */}
              <div className="mb-2">
                <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4 block">
                  Topics to Cover <span className="text-xs normal-case text-muted-foreground/70">(Optional)</span>
                </Label>
                <div className="flex flex-wrap gap-3">
                  {AGENDA_ITEMS.map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleAgenda(item.id)}
                      className={cn(
                        "px-4 py-2 rounded-full border text-sm transition-all flex items-center gap-2",
                        formData.agendaChecklist.includes(item.id)
                          ? "bg-primary/10 border-primary text-primary font-medium"
                          : "bg-background border-border hover:bg-muted"
                      )}
                    >
                      {formData.agendaChecklist.includes(item.id) && <Check className="w-3.5 h-3.5" />}
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

            </div >

            {/* SECTION 5: Footer */}
            <div className="p-6 border-t bg-background flex justify-end gap-3 sticky bottom-0 z-20">
              <Button variant="ghost" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>

              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <span tabIndex={-1}>
                      <Button
                        onClick={handleSubmit}
                        disabled={status === 'submitting' || !isValid}
                        className={cn(
                          "bg-emerald-600 hover:bg-emerald-700 text-white min-w-[150px]",
                          (!isValid) && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        {status === 'submitting' ? 'Confirming...' : 'Confirm Booking'}
                      </Button>
                    </span>
                  </TooltipTrigger>
                  {!isValid && (
                    <TooltipContent>
                      <p>Complete all required fields to continue</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
