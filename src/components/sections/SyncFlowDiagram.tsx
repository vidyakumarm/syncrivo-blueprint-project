import teamsIcon from '@/assets/teams-icon.svg';
import slackIcon from '@/assets/slack-icon.svg';
import googleChatIcon from '@/assets/google-chat-icon.png';

export function SyncFlowDiagram() {
  const platforms = [
    { icon: teamsIcon, name: 'Teams', color: 'hsl(239, 84%, 67%)' },
    { icon: slackIcon, name: 'Slack', color: 'hsl(270, 84%, 60%)' },
    { icon: googleChatIcon, name: 'Google Chat', color: 'hsl(142, 76%, 36%)' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Label */}
      <p className="text-center text-sm text-muted-foreground mb-8">
        Messages sync seamlessly between platforms
      </p>

      {/* Flow diagram */}
      <div className="relative flex items-center justify-center gap-4 sm:gap-6 md:gap-8">
        {/* Teams */}
        <div className="group flex flex-col items-center gap-2">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-card border border-border shadow-md flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_20px_hsl(239,84%,67%,0.3)] group-hover:border-primary/50 group-hover:scale-105">
            <img src={teamsIcon} alt="Microsoft Teams" className="w-8 h-8 sm:w-9 sm:h-9" />
          </div>
          <span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Teams</span>
        </div>

        {/* Arrow 1 */}
        <div className="flex items-center">
          <div className="w-6 sm:w-10 md:w-14 h-[2px] bg-gradient-to-r from-primary/60 to-primary/30" />
          <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-primary/50" />
        </div>

        {/* SyncRivo Hub */}
        <div className="group flex flex-col items-center gap-2">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[hsl(239,84%,67%)] to-[hsl(270,84%,60%)] shadow-lg flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_30px_hsl(239,84%,67%,0.4)] group-hover:scale-110">
            {/* Rotating ring effect */}
            <div className="absolute inset-0 rounded-full border-2 border-primary-foreground/20 animate-[spin_8s_linear_infinite]" />
            <div className="absolute inset-1 rounded-full border border-primary-foreground/10" />
            {/* Logo */}
            <span className="text-primary-foreground font-bold text-sm sm:text-base">Sync</span>
          </div>
          <span className="text-xs sm:text-sm font-semibold text-foreground">SyncRivo</span>
        </div>

        {/* Arrow 2 - Bidirectional to Slack */}
        <div className="flex items-center">
          <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[8px] border-r-primary/50" />
          <div className="w-6 sm:w-10 md:w-14 h-[2px] bg-gradient-to-r from-primary/30 to-primary/60" />
        </div>

        {/* Slack */}
        <div className="group flex flex-col items-center gap-2">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-card border border-border shadow-md flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_20px_hsl(270,84%,60%,0.3)] group-hover:border-primary/50 group-hover:scale-105">
            <img src={slackIcon} alt="Slack" className="w-8 h-8 sm:w-9 sm:h-9" />
          </div>
          <span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Slack</span>
        </div>

        {/* Arrow 3 */}
        <div className="flex items-center">
          <div className="w-6 sm:w-10 md:w-14 h-[2px] bg-gradient-to-r from-primary/60 to-accent/60" />
          <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-accent/50" />
        </div>

        {/* Google Chat */}
        <div className="group flex flex-col items-center gap-2">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-card border border-border shadow-md flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_20px_hsl(142,76%,36%,0.3)] group-hover:border-accent/50 group-hover:scale-105">
            <img src={googleChatIcon} alt="Google Chat" className="w-8 h-8 sm:w-9 sm:h-9" />
          </div>
          <span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Google Chat</span>
        </div>
      </div>

      {/* Animated pulse line underneath */}
      <div className="mt-8 flex justify-center">
        <div className="relative w-64 sm:w-80 h-1 rounded-full bg-border overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent animate-[shimmer_2s_infinite]" />
        </div>
      </div>
    </div>
  );
}
