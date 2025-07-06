-- Insert sample job data with correct level values
INSERT INTO jobs (
  title, department, location, type, level, description, requirements, responsibilities, benefits,
  salary_min, salary_max, currency, remote_allowed, posted_date, is_active
) VALUES 
(
  'Senior Frontend Developer',
  'Engineering',
  'San Francisco, CA, USA',
  'full-time',
  'senior',
  'Join our team to build cutting-edge user interfaces for our data synchronization platform.',
  ARRAY['React', 'TypeScript', 'JavaScript', '5+ years experience', 'Node.js', 'GraphQL'],
  ARRAY['Develop responsive web applications', 'Collaborate with design team', 'Optimize performance', 'Code reviews'],
  ARRAY['Health Insurance', 'Stock Options', 'Remote Work', 'Learning Budget'],
  120000, 180000, 'USD', true, NOW() - INTERVAL '2 days', true
),
(
  'Data Engineer',
  'Engineering',
  'New York, NY, USA',
  'full-time',
  'mid',
  'Build and maintain data pipelines that handle billions of data points daily.',
  ARRAY['Python', 'SQL', 'Apache Spark', '3+ years experience', 'AWS', 'Docker'],
  ARRAY['Design data pipelines', 'Monitor data quality', 'Optimize database performance', 'Support analytics team'],
  ARRAY['Health Insurance', 'Stock Options', 'Flexible Hours', 'Conference Budget'],
  100000, 140000, 'USD', true, NOW() - INTERVAL '5 days', true
),
(
  'Product Manager',
  'Product',
  'London, UK',
  'full-time',
  'senior',
  'Lead product strategy for our enterprise sync solutions serving millions of users.',
  ARRAY['Product Management', 'Agile', 'SQL', '4+ years experience', 'Analytics'],
  ARRAY['Define product roadmap', 'Collaborate with engineering', 'Analyze user metrics', 'Stakeholder communication'],
  ARRAY['Health Insurance', 'Stock Options', 'Remote Work', 'Learning Budget', 'Unlimited PTO'],
  80000, 120000, 'GBP', true, NOW() - INTERVAL '1 day', true
),
(
  'DevOps Engineer',
  'Engineering',
  'Berlin, Germany',
  'full-time',
  'mid',
  'Manage our cloud infrastructure and deployment pipelines for global scale.',
  ARRAY['Kubernetes', 'Docker', 'AWS', 'Terraform', '3+ years experience', 'Linux'],
  ARRAY['Maintain CI/CD pipelines', 'Monitor system performance', 'Ensure security compliance', 'Automate deployments'],
  ARRAY['Health Insurance', 'Stock Options', 'Remote Work', 'Relocation Assistance'],
  70000, 100000, 'EUR', true, NOW() - INTERVAL '3 days', true
),
(
  'UX Designer',
  'Design',
  'Toronto, ON, Canada',
  'full-time',
  'mid',
  'Design intuitive interfaces for complex data synchronization workflows.',
  ARRAY['Figma', 'Sketch', 'User Research', '3+ years experience', 'Prototyping'],
  ARRAY['Create user-centered designs', 'Conduct user research', 'Collaborate with product team', 'Design system maintenance'],
  ARRAY['Health Insurance', 'Stock Options', 'Remote Work', 'Design Tools Budget'],
  80000, 110000, 'CAD', true, NOW() - INTERVAL '4 days', true
),
(
  'Security Engineer',
  'Security',
  'Austin, TX, USA',
  'full-time',
  'senior',
  'Secure our infrastructure handling sensitive data for billions of users worldwide.',
  ARRAY['Cybersecurity', 'Penetration Testing', 'AWS Security', '5+ years experience', 'Compliance'],
  ARRAY['Security assessments', 'Implement security controls', 'Incident response', 'Security training'],
  ARRAY['Health Insurance', 'Stock Options', 'Remote Work', 'Security Certifications'],
  130000, 180000, 'USD', false, NOW() - INTERVAL '6 days', true
),
(
  'Marketing Manager',
  'Marketing',
  'Sydney, Australia',
  'full-time',
  'mid',
  'Drive growth marketing initiatives for our global data sync platform.',
  ARRAY['Digital Marketing', 'Analytics', 'Content Marketing', '4+ years experience', 'SEO'],
  ARRAY['Execute marketing campaigns', 'Analyze campaign performance', 'Content strategy', 'Lead generation'],
  ARRAY['Health Insurance', 'Stock Options', 'Remote Work', 'Marketing Tools Budget'],
  70000, 95000, 'AUD', true, NOW() - INTERVAL '7 days', true
),
(
  'Junior Full Stack Developer',
  'Engineering',
  'Remote',
  'full-time',
  'entry',
  'Start your career building scalable web applications in a remote-first environment.',
  ARRAY['JavaScript', 'React', 'Node.js', '1+ years experience', 'Git', 'REST APIs'],
  ARRAY['Develop web features', 'Write unit tests', 'Participate in code reviews', 'Learn from senior developers'],
  ARRAY['Health Insurance', 'Stock Options', 'Remote Work', 'Mentorship Program'],
  60000, 85000, 'USD', true, NOW() - INTERVAL '1 day', true
),
(
  'Senior Data Scientist',
  'Data Science',
  'Seattle, WA, USA',
  'full-time',
  'senior',
  'Apply machine learning to optimize data synchronization patterns and predict system behavior.',
  ARRAY['Python', 'Machine Learning', 'TensorFlow', 'SQL', '5+ years experience', 'Statistics'],
  ARRAY['Build ML models', 'Analyze data patterns', 'Create predictive algorithms', 'Research new techniques'],
  ARRAY['Health Insurance', 'Stock Options', 'Remote Work', 'Research Budget'],
  140000, 200000, 'USD', true, NOW() - INTERVAL '8 days', true
),
(
  'Technical Writer',
  'Documentation',
  'Remote',
  'contract',
  'mid',
  'Create comprehensive documentation for our APIs and developer tools.',
  ARRAY['Technical Writing', 'API Documentation', 'Markdown', '3+ years experience', 'Programming Knowledge'],
  ARRAY['Write API documentation', 'Create developer guides', 'Maintain help articles', 'Collaborate with engineering'],
  ARRAY['Flexible Hours', 'Remote Work', 'Writing Tools Budget'],
  50000, 70000, 'USD', true, NOW() - INTERVAL '2 days', true
),
(
  'Engineering Director',
  'Engineering',
  'San Francisco, CA, USA',
  'full-time',
  'director',
  'Lead our engineering organization and drive technical strategy for our data sync platform.',
  ARRAY['Engineering Leadership', 'Team Management', '10+ years experience', 'Strategic Planning'],
  ARRAY['Lead engineering teams', 'Define technical strategy', 'Hire and mentor engineers', 'Drive architectural decisions'],
  ARRAY['Health Insurance', 'Stock Options', 'Executive Benefits', 'Learning Budget'],
  250000, 350000, 'USD', false, NOW() - INTERVAL '10 days', true
),
(
  'Technical Lead',
  'Engineering',
  'Austin, TX, USA',
  'full-time',
  'lead',
  'Lead a team of engineers building scalable microservices for data synchronization.',
  ARRAY['System Architecture', 'Team Leadership', '7+ years experience', 'Microservices', 'Java', 'Kubernetes'],
  ARRAY['Lead engineering team', 'Design system architecture', 'Code reviews', 'Technical mentoring'],
  ARRAY['Health Insurance', 'Stock Options', 'Remote Work', 'Conference Budget'],
  160000, 220000, 'USD', true, NOW() - INTERVAL '3 days', true
);