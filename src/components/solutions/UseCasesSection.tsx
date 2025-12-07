import { motion } from 'framer-motion';
import { TrendingUp, Clock, CheckCircle, ArrowUpRight } from 'lucide-react';
import { fadeInUp, staggerContainer } from './SolutionPageLayout';

export interface UseCase {
  title: string;
  description: string;
  metric?: string;
  metricLabel?: string;
}

interface UseCasesSectionProps {
  title: string;
  subtitle: string;
  useCases: UseCase[];
}

export function UseCasesSection({ title, subtitle, useCases }: UseCasesSectionProps) {
  return (
    <section className="py-16 md:py-20 lg:py-24">
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
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group bg-card rounded-2xl p-6 border border-border/50 shadow-brand-sm hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground/50 group-hover:text-primary transition-colors" />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {useCase.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4">
                {useCase.description}
              </p>
              
              {useCase.metric && (
                <div className="flex items-center gap-2 pt-4 border-t border-border/50">
                  <TrendingUp className="h-4 w-4 text-accent" />
                  <span className="text-lg font-bold text-accent">{useCase.metric}</span>
                  {useCase.metricLabel && (
                    <span className="text-xs text-muted-foreground">{useCase.metricLabel}</span>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
