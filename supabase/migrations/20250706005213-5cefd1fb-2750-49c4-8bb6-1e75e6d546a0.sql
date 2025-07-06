-- Create jobs table for job listings
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('full-time', 'part-time', 'contract', 'internship')),
  level TEXT NOT NULL CHECK(level IN ('entry', 'mid', 'senior', 'lead', 'director')),
  description TEXT NOT NULL,
  requirements TEXT[] NOT NULL DEFAULT '{}',
  responsibilities TEXT[] NOT NULL DEFAULT '{}',
  benefits TEXT[] NOT NULL DEFAULT '{}',
  salary_min INTEGER,
  salary_max INTEGER,
  currency TEXT DEFAULT 'USD',
  remote_allowed BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  posted_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  application_deadline TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create job applications table
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  resume_url TEXT,
  cover_letter TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  years_experience INTEGER,
  current_salary INTEGER,
  expected_salary INTEGER,
  availability_date DATE,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK(status IN ('submitted', 'reviewing', 'interviewing', 'offered', 'hired', 'rejected')),
  notes TEXT,
  applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for jobs (public read access for active jobs)
CREATE POLICY "Anyone can view active jobs" 
ON public.jobs 
FOR SELECT 
USING (is_active = true);

-- Create policies for job applications (users can create applications, but not view others)
CREATE POLICY "Anyone can create job applications" 
ON public.job_applications 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_jobs_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.update_applications_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_jobs_updated_at
BEFORE UPDATE ON public.jobs
FOR EACH ROW
EXECUTE FUNCTION public.update_jobs_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at
BEFORE UPDATE ON public.job_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_applications_updated_at_column();

-- Insert sample job openings (15+ positions)
INSERT INTO public.jobs (title, department, location, type, level, description, requirements, responsibilities, benefits, salary_min, salary_max, remote_allowed) VALUES
('Senior Software Engineer - Backend', 'Engineering', 'San Francisco, CA', 'full-time', 'senior', 'Join our backend team to build scalable data synchronization infrastructure that powers billions of data points across enterprise platforms.', 
ARRAY['5+ years backend development', 'Experience with Python/Node.js', 'Database design expertise', 'API development', 'Cloud platforms (AWS/GCP)'], 
ARRAY['Design and implement scalable backend services', 'Build APIs for data synchronization', 'Optimize database performance', 'Collaborate with frontend teams', 'Mentor junior developers'],
ARRAY['Competitive salary', 'Equity package', 'Health insurance', 'Flexible work arrangements', 'Learning budget'], 
150000, 200000, true),

('Frontend React Developer', 'Engineering', 'Remote', 'full-time', 'mid', 'Create beautiful, responsive user interfaces for our enterprise data platform using React and modern web technologies.',
ARRAY['3+ years React development', 'TypeScript expertise', 'CSS/Tailwind proficiency', 'REST API integration', 'Git workflow'],
ARRAY['Develop responsive React components', 'Implement user interfaces', 'Optimize web performance', 'Write automated tests', 'Collaborate with designers'],
ARRAY['Remote-first culture', 'Health benefits', 'Stock options', 'Professional development', 'Home office setup'], 
120000, 160000, true),

('DevOps Engineer', 'Infrastructure', 'New York, NY', 'full-time', 'senior', 'Scale our infrastructure to handle enterprise-level data synchronization across multiple cloud platforms.',
ARRAY['Kubernetes expertise', 'CI/CD pipelines', 'Docker containerization', 'Infrastructure as Code', 'Monitoring tools'],
ARRAY['Manage Kubernetes clusters', 'Build deployment pipelines', 'Monitor system performance', 'Ensure security compliance', 'Automate infrastructure'],
ARRAY['Competitive compensation', 'Annual bonus', 'Health coverage', 'Retirement matching', 'Tech stipend'], 
140000, 180000, false),

('Product Manager - Integrations', 'Product', 'Austin, TX', 'full-time', 'mid', 'Drive product strategy for our integration platform, working with 450K+ enterprise connections worldwide.',
ARRAY['3+ years product management', 'Technical background', 'API/integration experience', 'Data analysis skills', 'Agile methodologies'],
ARRAY['Define product roadmap', 'Gather customer requirements', 'Work with engineering teams', 'Analyze product metrics', 'Coordinate product launches'],
ARRAY['Equity participation', 'Health insurance', 'Flexible PTO', 'Learning opportunities', 'Conference budget'], 
130000, 170000, true),

('UX/UI Designer', 'Design', 'Los Angeles, CA', 'full-time', 'mid', 'Design intuitive interfaces for complex data workflows, helping users manage billions of data points seamlessly.',
ARRAY['4+ years UX/UI design', 'Figma/Sketch proficiency', 'User research experience', 'Prototyping skills', 'Design systems knowledge'],
ARRAY['Create user interface designs', 'Conduct user research', 'Build design systems', 'Prototype new features', 'Collaborate with product team'],
ARRAY['Creative freedom', 'Health benefits', 'Design tool subscriptions', 'Flexible schedule', 'Team retreats'], 
110000, 145000, true),

('Data Engineer', 'Engineering', 'Seattle, WA', 'full-time', 'senior', 'Build data pipelines that process trillions of data points, enabling real-time synchronization across enterprise platforms.',
ARRAY['5+ years data engineering', 'Apache Kafka/Spark', 'Python/Scala expertise', 'Big data technologies', 'Data warehouse design'],
ARRAY['Design data architectures', 'Build ETL pipelines', 'Optimize data processing', 'Ensure data quality', 'Support analytics teams'],
ARRAY['Stock options', 'Premium healthcare', 'Unlimited PTO', 'Learning budget', 'Flexible work'], 
160000, 210000, true),

('QA Automation Engineer', 'Quality Assurance', 'Remote', 'full-time', 'mid', 'Ensure quality across our platform that serves 1.8B global users through comprehensive automated testing.',
ARRAY['3+ years QA automation', 'Selenium/Cypress', 'API testing', 'CI/CD integration', 'Programming skills'],
ARRAY['Design test automation frameworks', 'Write automated test scripts', 'Perform API testing', 'Integrate with CI/CD', 'Report quality metrics'],
ARRAY['Remote flexibility', 'Health coverage', 'Professional development', 'Equipment allowance', 'Team events'], 
105000, 135000, true),

('Security Engineer', 'Security', 'Washington, DC', 'full-time', 'senior', 'Protect enterprise data and ensure security compliance for our platform handling $847B in market value.',
ARRAY['5+ years security experience', 'Penetration testing', 'Security frameworks', 'Compliance standards', 'Incident response'],
ARRAY['Conduct security assessments', 'Implement security controls', 'Monitor threats', 'Ensure compliance', 'Respond to incidents'],
ARRAY['Security clearance bonus', 'Health benefits', 'Retirement plan', 'Training budget', 'Flexible hours'], 
150000, 190000, false),

('Machine Learning Engineer', 'AI/ML', 'Boston, MA', 'full-time', 'senior', 'Develop ML models to optimize data synchronization and predict integration patterns across our global platform.',
ARRAY['PhD or 5+ years ML experience', 'Python/TensorFlow/PyTorch', 'Statistics knowledge', 'Big data processing', 'Model deployment'],
ARRAY['Build ML models', 'Optimize algorithms', 'Deploy models to production', 'Analyze large datasets', 'Research new techniques'],
ARRAY['Research opportunities', 'Conference attendance', 'Stock options', 'Health insurance', 'Sabbatical program'], 
170000, 220000, true),

('Sales Director - Enterprise', 'Sales', 'Chicago, IL', 'full-time', 'director', 'Lead enterprise sales to expand our reach beyond current 450K connections to new market segments.',
ARRAY['8+ years enterprise sales', 'SaaS/tech sales experience', 'Team leadership', 'CRM proficiency', 'Enterprise deal closure'],
ARRAY['Develop sales strategies', 'Manage sales team', 'Close enterprise deals', 'Build client relationships', 'Forecast revenue'],
ARRAY['Commission structure', 'Equity package', 'Expense account', 'Health benefits', 'Sales incentives'], 
180000, 250000, false),

('Customer Success Manager', 'Customer Success', 'Denver, CO', 'full-time', 'mid', 'Ensure customer satisfaction and success for our enterprise clients managing billions of data points.',
ARRAY['3+ years customer success', 'SaaS experience', 'Communication skills', 'Data analysis', 'Project management'],
ARRAY['Manage customer relationships', 'Drive product adoption', 'Resolve customer issues', 'Conduct business reviews', 'Identify expansion opportunities'],
ARRAY['Customer success bonus', 'Health coverage', 'Professional development', 'Work-life balance', 'Travel opportunities'], 
90000, 120000, true),

('Technical Writer', 'Documentation', 'Remote', 'full-time', 'mid', 'Create comprehensive documentation for our platform used by 1.8B users worldwide.',
ARRAY['3+ years technical writing', 'API documentation', 'Developer tools knowledge', 'Markdown/Git', 'Communication skills'],
ARRAY['Write API documentation', 'Create user guides', 'Maintain knowledge base', 'Collaborate with engineers', 'Update documentation'],
ARRAY['Remote work', 'Health benefits', 'Learning stipend', 'Flexible schedule', 'Writing tools budget'], 
85000, 110000, true),

('Site Reliability Engineer', 'Infrastructure', 'San Jose, CA', 'full-time', 'senior', 'Maintain 99.99% uptime for our platform processing 125B+ data points daily across global infrastructure.',
ARRAY['5+ years SRE experience', 'Kubernetes/Docker', 'Monitoring tools', 'Incident management', 'Automation scripting'],
ARRAY['Monitor system reliability', 'Automate operations', 'Handle incident response', 'Optimize performance', 'Implement best practices'],
ARRAY['On-call compensation', 'Stock options', 'Health insurance', 'Learning budget', 'Flexible PTO'], 
155000, 195000, false),

('Business Intelligence Analyst', 'Analytics', 'Miami, FL', 'full-time', 'mid', 'Analyze market data and user patterns from our $847B market value platform to drive business decisions.',
ARRAY['3+ years BI experience', 'SQL expertise', 'Tableau/Power BI', 'Statistical analysis', 'Business acumen'],
ARRAY['Create business reports', 'Analyze user data', 'Build dashboards', 'Identify trends', 'Present insights to leadership'],
ARRAY['Performance bonus', 'Health benefits', 'Professional development', 'Flexible work', 'Data conference access'], 
95000, 125000, true),

('Mobile Developer - React Native', 'Engineering', 'Portland, OR', 'full-time', 'mid', 'Build mobile applications to extend our platform reach to mobile users managing enterprise data on-the-go.',
ARRAY['3+ years mobile development', 'React Native expertise', 'iOS/Android knowledge', 'API integration', 'App store deployment'],
ARRAY['Develop mobile applications', 'Optimize app performance', 'Implement new features', 'Debug mobile issues', 'Collaborate with design team'],
ARRAY['Mobile device allowance', 'Health coverage', 'Stock options', 'Remote flexibility', 'Conference attendance'], 
115000, 150000, true),

('Marketing Manager - Growth', 'Marketing', 'Nashville, TN', 'full-time', 'mid', 'Drive growth marketing strategies to expand our user base beyond 1.8B global users.',
ARRAY['4+ years growth marketing', 'Digital marketing', 'Analytics tools', 'A/B testing', 'Content marketing'],
ARRAY['Develop marketing campaigns', 'Analyze campaign performance', 'Optimize conversion funnels', 'Manage marketing budget', 'Collaborate with sales team'],
ARRAY['Marketing budget', 'Health benefits', 'Creative freedom', 'Professional development', 'Performance bonuses'], 
100000, 135000, true);