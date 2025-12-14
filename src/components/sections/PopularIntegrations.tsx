import { motion } from 'framer-motion';
import { ExternalLink, Star } from 'lucide-react';
import React from 'react';

/* 
  Using authoritative official brand icon URLs (SVGs) to ensure 2024/2025 accuracy.
*/
const icons = {
  slack: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg',
  teams:
    'https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg',
  discord:
    'https://assets-global.website-files.com/6257adef93867e56f84d3092/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png',
  meet: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Meet_icon_%282020%29.svg',
  zoom: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Zoom-icon.svg',
  webex: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Cisco_Webex_Meetings_Logo.png',
  intercom:
    'https://static.vecteezy.com/system/resources/previews/022/100/778/original/intercom-logo-icon-free-png.png',
  zendesk: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Zendesk_logo.svg',
  freshchat:
    'https://assets.freshworks.com/freshworks/attachments/cjro2d94200428zfop88l96u4-fc-symbol-transparent-win.png',
  salesforce: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg',
  hubspot: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg',
  whatsapp: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
  telegram: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg',
  notion: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg',
  workspace: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Google_Workspace_Logo.svg',
  stripe: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Stripe_Logo%2C_revised_2016.svg', // Using full logo as icon is wide
  shopify: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo.svg',
};

interface Integration {
  id: string;
  name: string;
  icon: string;
  rating: string;
  users: string;
  description: string;
  featured?: boolean; // Maps to "Popular"
  bgGradient: string;
  shadowColor: string;
}

const integrations: Integration[] = [
  // --- Existing Favorites ---
  {
    id: 'slack',
    name: 'Slack',
    icon: icons.slack,
    rating: '4.9',
    users: '500k+',
    description: 'Connect your workspaces for seamless real-time messaging sync.',
    featured: true,
    bgGradient: 'from-[#E01E5A]/10 to-[#36C5F0]/10',
    shadowColor: 'shadow-[#E01E5A]/20',
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    icon: icons.teams,
    rating: '4.8',
    users: '850k+',
    description: 'Enterprise-grade channel and direct message synchronization.',
    featured: true,
    bgGradient: 'from-[#6264A7]/10 to-[#7B83EB]/10',
    shadowColor: 'shadow-[#6264A7]/20',
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: icons.discord,
    rating: '4.9',
    users: '450k+',
    description: 'Bridge your community servers with internal business tools.',
    bgGradient: 'from-[#5865F2]/10 to-[#7289da]/10',
    shadowColor: 'shadow-[#5865F2]/20',
  },
  {
    id: 'zoom',
    name: 'Zoom',
    icon: icons.zoom,
    rating: '4.8',
    users: '600k+',
    description: 'Unified video conferencing status and meeting management.',
    bgGradient: 'from-[#2D8CFF]/10 to-[#56A0FF]/10',
    shadowColor: 'shadow-[#2D8CFF]/20',
  },
  {
    id: 'google-meet',
    name: 'Google Meet',
    icon: icons.meet,
    rating: '4.7',
    users: '300k+',
    description: 'Sync meeting links, status updates, and chat transcripts.',
    bgGradient: 'from-[#00AC47]/10 to-[#FFC107]/10',
    shadowColor: 'shadow-[#00AC47]/20',
  },

  // --- User Requested Updates ---
  {
    id: 'intercom',
    name: 'Intercom',
    icon: icons.intercom,
    rating: '4.7',
    users: '28k+',
    description: 'Customer messaging and support platform.',
    featured: true,
    bgGradient: 'from-[#1F8CEB]/10 to-[#7CAFFC]/10',
    shadowColor: 'shadow-[#1F8CEB]/20',
  },
  {
    id: 'zendesk',
    name: 'Zendesk',
    icon: icons.zendesk,
    rating: '4.4',
    users: '12k+',
    description: 'Streamline customer support by connecting your help desk and ticketing system.',
    featured: false,
    bgGradient: 'from-[#03363D]/10 to-[#17494D]/10',
    shadowColor: 'shadow-[#03363D]/20',
  },
  {
    id: 'freshchat',
    name: 'Freshchat',
    icon: icons.freshchat,
    rating: '4.5',
    users: '18k+',
    description: 'Modern messaging software for sales and customer engagement.',
    featured: false,
    bgGradient: 'from-[#3BBFFA]/10 to-[#4AD3AC]/10',
    shadowColor: 'shadow-[#4AD3AC]/20',
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    icon: icons.salesforce,
    rating: '4.8',
    users: '25k+',
    description: "Sync customer data and automate workflows with the world's leading CRM platform.",
    featured: true,
    bgGradient: 'from-[#00A1E0]/10 to-[#00A1E0]/5',
    shadowColor: 'shadow-[#00A1E0]/20',
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    icon: icons.hubspot,
    rating: '4.6',
    users: '20k+',
    description:
      "Connect your marketing and sales workflows with HubSpot's comprehensive platform.",
    featured: false,
    bgGradient: 'from-[#FF7A59]/10 to-[#FF9E85]/10',
    shadowColor: 'shadow-[#FF7A59]/20',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    icon: icons.whatsapp,
    rating: '4.6',
    users: '35k+',
    description: 'Business messaging for customer communication.',
    featured: true,
    bgGradient: 'from-[#25D366]/10 to-[#4CE586]/10',
    shadowColor: 'shadow-[#25D366]/20',
  },

  // --- New Additions ---
  {
    id: 'telegram',
    name: 'Telegram Business',
    icon: icons.telegram,
    rating: '4.5',
    users: '22k+',
    description: 'Secure business messaging and automation.',
    featured: false,
    bgGradient: 'from-[#0088cc]/10 to-[#31a9e1]/10',
    shadowColor: 'shadow-[#0088cc]/20',
  },
  {
    id: 'notion',
    name: 'Notion',
    icon: icons.notion,
    rating: '4.7',
    users: '18k+',
    description:
      'Sync data with your Notion workspace for enhanced productivity and collaboration.',
    featured: false,
    bgGradient: 'from-[#000000]/5 to-[#333333]/10',
    shadowColor: 'shadow-black/20',
  },
  {
    id: 'workspace',
    name: 'Google Workspace',
    icon: icons.workspace,
    rating: '4.6',
    users: '35k+',
    description:
      'Connect Google Workspace for seamless document and collaboration workflow integration.',
    featured: true,
    bgGradient: 'from-[#4285F4]/10 to-[#34A853]/10',
    shadowColor: 'shadow-[#4285F4]/20',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    icon: icons.stripe,
    rating: '4.9',
    users: '40k+',
    description:
      "Process payments and sync transaction data with Stripe's powerful payment platform.",
    featured: true,
    bgGradient: 'from-[#635BFF]/10 to-[#00D4FF]/10',
    shadowColor: 'shadow-[#635BFF]/20',
  },
  {
    id: 'shopify',
    name: 'Shopify',
    icon: icons.shopify,
    rating: '4.7',
    users: '30k+',
    description:
      'Integrate your e-commerce store to sync orders, inventory, and customer data automatically.',
    featured: true,
    bgGradient: 'from-[#95BF47]/10 to-[#5E8E3E]/10',
    shadowColor: 'shadow-[#95BF47]/20',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: 'easeOut' as any,
    },
  }),
};

const floatingAnimation = (index: number) => ({
  y: [0, index % 2 === 0 ? -6 : -4, 0],
  transition: {
    duration: 3 + (index % 3),
    repeat: Infinity,
    ease: 'easeInOut' as any,
    delay: index * 0.2,
  },
});

const PopularIntegrations: React.FC = () => {
  return (
    <section className='py-24 relative overflow-hidden bg-background'>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10' />

      <div className='container px-4 mx-auto'>
        <div className='text-center mb-16 space-y-4'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60'
          >
            Popular Integrations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className='text-lg text-muted-foreground/80 max-w-2xl mx-auto'
          >
            Power up your workflow with the most used integrations by our community.
          </motion.p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.id}
              custom={index}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: '-50px' }}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
              className='relative group'
            >
              <motion.div animate={floatingAnimation(index)}>
                <div
                  className={`
                  relative h-full p-6 rounded-2xl border border-white/5 
                  bg-gradient-to-br ${integration.bgGradient} backdrop-blur-sm
                  hover:bg-opacity-20 transition-all duration-300
                  ${integration.shadowColor} hover:shadow-lg dark:hover:shadow-primary/5
                `}
                >
                  {integration.featured && (
                    <div className='absolute top-4 right-12 px-2 py-0.5 rounded-full bg-primary/20 border border-primary/20'>
                      <span className='text-[10px] font-semibold text-primary uppercase tracking-wider'>
                        Popular
                      </span>
                    </div>
                  )}

                  <button className='absolute top-4 right-4 text-muted-foreground/50 hover:text-white transition-colors'>
                    <ExternalLink className='w-4 h-4' />
                  </button>

                  <div className='flex items-start gap-4 mb-4'>
                    <motion.div
                      className='relative w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2.5 shadow-sm overflow-hidden'
                      whileHover={{
                        rotate: [0, -5, 5, 0],
                        scale: 1.1,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className='absolute inset-0 bg-white/10 opacity-0 group-hover:animate-ping rounded-xl' />
                      <img
                        src={integration.icon}
                        alt={integration.name}
                        className='w-full h-full object-contain relative z-10'
                      />
                    </motion.div>

                    <div>
                      <h3 className='font-semibold text-lg text-white mb-1'>{integration.name}</h3>
                      <div className='flex items-center gap-3 text-sm'>
                        <div className='flex items-center gap-1 text-amber-400'>
                          <Star className='w-3.5 h-3.5 fill-current' />
                          <span className='font-medium'>{integration.rating}</span>
                        </div>
                      </div>
                      <span className='text-xs text-muted-foreground'>
                        {integration.users} users
                      </span>
                    </div>
                  </div>

                  <p className='text-sm text-muted-foreground/90 leading-relaxed mb-2 line-clamp-2'>
                    {integration.description}
                  </p>

                  <div className='absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none' />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularIntegrations;
