import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Briefcase,
  CheckCircle,
  Building
} from 'lucide-react';
import { JobApplicationDialog } from './JobApplicationDialog';

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  level: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string | null;
  remote_allowed: boolean;
  posted_date: string;
}

interface JobCardProps {
  job: Job;
  onApply?: (jobId: string) => void;
}

export function JobCard({ job, onApply }: JobCardProps) {
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const formatSalary = (min?: number, max?: number, currency?: string | null) => {
    if (!min || !max) return 'Competitive';
    const formatNumber = (num: number) => (num / 1000).toFixed(0) + 'K';
    return `$${formatNumber(min)} - $${formatNumber(max)} ${currency || 'USD'}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleApply = () => {
    setShowApplicationDialog(true);
  };

  const handleApplicationSubmit = () => {
    onApply?.(job.id);
    setShowApplicationDialog(false);
  };

  return (
    <>
      <Card className="hover:shadow-md transition-shadow duration-200 bg-card border border-border">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <CardTitle className="text-xl font-semibold text-foreground mb-2">
                {job.title}
              </CardTitle>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Building className="h-3 w-3" />
                  {job.department}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {job.location}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {job.type.replace('-', ' ')}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {job.level}
                </Badge>
                {job.remote_allowed && (
                  <Badge className="bg-success text-success-foreground">
                    Remote OK
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-sm font-medium text-foreground mb-1">
                <DollarSign className="h-4 w-4" />
                {formatSalary(job.salary_min, job.salary_max, job.salary_currency)}
              </div>
              <div className="text-xs text-muted-foreground">
                Posted {formatDate(job.posted_date)}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {job.description}
          </p>

          {isExpanded && (
            <div className="space-y-4">
              <Separator />
              
              <div>
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Key Responsibilities
                </h4>
                <ul className="space-y-1">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-3 w-3 mt-0.5 text-primary flex-shrink-0" />
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Requirements
                </h4>
                <ul className="space-y-1">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-3 w-3 mt-0.5 text-accent flex-shrink-0" />
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2">Benefits & Perks</h4>
                <div className="flex flex-wrap gap-2">
                  {job.benefits.map((benefit, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <Button 
              onClick={handleApply}
              className="flex-1 bg-gradient-primary hover:opacity-90 text-primary-foreground"
            >
              Apply Now
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-6"
            >
              {isExpanded ? 'Show Less' : 'View Details'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <JobApplicationDialog
        open={showApplicationDialog}
        onOpenChange={setShowApplicationDialog}
        job={job}
        onSubmit={handleApplicationSubmit}
      />
    </>
  );
}