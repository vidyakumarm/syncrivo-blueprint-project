import { useState, useEffect, useMemo } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { JobCard, Job } from '@/components/careers/JobCard';
import { JobFilters, JobFilters as FilterType } from '@/components/careers/JobFilters';
import { GeneralApplicationDialog } from '@/components/careers/GeneralApplicationDialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users,
  MapPin,
  Briefcase,
  TrendingUp,
  Globe,
  Heart,
  Award,
  Coffee,
  Zap
} from 'lucide-react';

const Careers = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGeneralApplication, setShowGeneralApplication] = useState(false);
  const [filters, setFilters] = useState<FilterType>({
    search: '',
    department: '',
    location: '',
    type: '',
    level: '',
    remoteOnly: false,
  });
  const { toast } = useToast();

  // Fetch jobs from database
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('is_active', true)
          .order('posted_date', { ascending: false });

        if (error) throw error;
        setJobs(data || []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast({
          title: 'Error Loading Jobs',
          description: 'Failed to load job listings. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [toast]);

  // Filter jobs based on current filters
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = !filters.search || 
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.requirements.some(req => req.toLowerCase().includes(filters.search.toLowerCase()));

      const matchesDepartment = !filters.department || job.department === filters.department;
      const matchesLocation = !filters.location || job.location === filters.location;
      const matchesType = !filters.type || job.type === filters.type;
      const matchesLevel = !filters.level || job.level === filters.level;
      const matchesRemote = !filters.remoteOnly || job.remote_allowed;

      return matchesSearch && matchesDepartment && matchesLocation && 
             matchesType && matchesLevel && matchesRemote;
    });
  }, [jobs, filters]);

  // Extract unique values for filters
  const filterOptions = useMemo(() => {
    return {
      departments: [...new Set(jobs.map(job => job.department))],
      locations: [...new Set(jobs.map(job => job.location))],
      types: [...new Set(jobs.map(job => job.type))],
      levels: [...new Set(jobs.map(job => job.level))],
    };
  }, [jobs]);

  const handleJobApplication = (jobId: string) => {
    toast({
      title: 'Application Successfully Submitted!',
      description: 'We\'ve received your application and will review it shortly. You should hear back from us within 3-5 business days.',
    });
  };

  const handleGeneralApplication = () => {
    toast({
      title: 'Application Received!',
      description: 'Thank you for your interest in SyncRivo. We\'ll keep your information on file and reach out when relevant opportunities arise.',
    });
    setShowGeneralApplication(false);
  };

  // Company stats for display
  const companyStats = [
    { icon: Users, label: 'Global Users Served', value: '1.8B+' },
    { icon: TrendingUp, label: 'Market Value Unlocked', value: '$847B+' },
    { icon: MapPin, label: 'Office Locations', value: '12+' },
    { icon: Briefcase, label: 'Open Positions', value: `${jobs.length}+` },
  ];

  const benefits = [
    { icon: Heart, title: 'Health & Wellness', description: 'Comprehensive health insurance, mental health support, and wellness programs' },
    { icon: Globe, title: 'Remote Flexibility', description: 'Work from anywhere with flexible hours and home office setup allowance' },
    { icon: Award, title: 'Growth & Learning', description: 'Professional development budget, conference attendance, and mentorship programs' },
    { icon: Coffee, title: 'Work-Life Balance', description: 'Unlimited PTO, flexible schedules, and team retreats' },
    { icon: Zap, title: 'Innovation Culture', description: 'Work on cutting-edge technology with billions of data points and global impact' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading career opportunities...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                Join the Future of
                <span className="bg-gradient-hero bg-clip-text text-transparent"> Data Sync</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Help us build the infrastructure that powers billions of data points and serves
                1.8 billion users worldwide. Be part of a team that's unlocking $847B+ in market value.
              </p>
              
              {/* Company Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                {companyStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Why Work at SyncRivo?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We believe in creating an environment where innovation thrives and people grow.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                          <p className="text-sm text-muted-foreground">{benefit.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Jobs Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Open Positions</h2>
              <p className="text-lg text-muted-foreground">
                Discover opportunities to make a global impact with {jobs.length}+ open roles
              </p>
            </div>

            {/* Filters */}
            <div className="mb-8">
              <JobFilters
                filters={filters}
                onFiltersChange={setFilters}
                departments={filterOptions.departments}
                locations={filterOptions.locations}
                types={filterOptions.types}
                levels={filterOptions.levels}
              />
            </div>

            {/* Results Summary */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-muted-foreground">
                Showing {filteredJobs.length} of {jobs.length} positions
              </div>
              {filteredJobs.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {filterOptions.departments.slice(0, 5).map((dept) => (
                    <Badge key={dept} variant="outline" className="text-xs">
                      {dept} ({jobs.filter(j => j.department === dept).length})
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Job Listings */}
            {filteredJobs.length > 0 ? (
              <div className="grid gap-6">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={handleJobApplication}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <CardContent className="p-0">
                  <div className="text-muted-foreground mb-4">
                    <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No positions found</h3>
                    <p>Try adjusting your filters to see more opportunities.</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setFilters({
                      search: '',
                      department: '',
                      location: '',
                      type: '',
                      level: '',
                      remoteOnly: false,
                    })}
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-primary text-primary-foreground py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Don't See the Perfect Role?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              We're always looking for exceptional talent. Send us your resume and let us know how you'd like to contribute to our mission.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
              onClick={() => setShowGeneralApplication(true)}
            >
              Send Us Your Resume
            </Button>
          </div>
        </div>
      </main>
      <Footer />
      
      <GeneralApplicationDialog
        open={showGeneralApplication}
        onOpenChange={setShowGeneralApplication}
        onSubmit={handleGeneralApplication}
      />
    </div>
  );
};

export default Careers;