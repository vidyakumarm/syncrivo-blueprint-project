import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { fadeInUp, staggerContainer } from './SolutionPageLayout';
import { CheckCircle, AlertTriangle } from 'lucide-react';

export interface ProblemSolutionBlock {
  header: string;
  problem: string;
  solution: string;
  icon?: ReactNode;
}

interface ProblemSolutionSectionProps {
  title: string;
  subtitle: string;
  blocks: ProblemSolutionBlock[];
}

export function ProblemSolutionSection({ title, subtitle, blocks }: ProblemSolutionSectionProps) {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4"
          >
            {title}
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </motion.div>
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {blocks.map((block, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-card rounded-2xl p-6 lg:p-8 border border-border/50 shadow-brand-sm hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-1"
            >
              {block.icon && (
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  {block.icon}
                </div>
              )}
              
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {block.header}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {block.problem}
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <p className="text-foreground text-sm leading-relaxed font-medium">
                    {block.solution}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
