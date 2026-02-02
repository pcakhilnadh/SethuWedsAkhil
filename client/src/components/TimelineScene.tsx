import { TimelineScene } from '@/types/timeline';

interface TimelineSceneProps {
  scene: TimelineScene;
  index: number;
}

export function TimelineSceneComponent({ scene, index }: TimelineSceneProps) {
  const { title, date, message, image } = scene;
  
  // Alternate layout: even scenes have content on left, odd scenes have content on right
  const contentOrder = index % 2 === 0 ? 'order-2 md:order-1' : 'order-2 md:order-2';
  const imageOrder = index % 2 === 0 ? 'order-1 md:order-2' : 'order-1 md:order-1';

  return (
    <div className="relative w-screen h-screen flex-shrink-0 snap-center bg-background">
      <div className="h-full flex items-center justify-center py-8 md:py-12 lg:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-16 items-center h-full">
              {/* Content Side */}
              <div className={`${contentOrder} space-y-4 md:space-y-6 lg:space-y-8`}>
                {/* Title */}
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
                    {title}
                  </h2>
                  <div className="h-0.5 md:h-1 w-16 md:w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
                </div>

                {/* Date Badge */}
                <div className="inline-block">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl" />
                    <div className="relative px-3 py-1.5 md:px-5 md:py-2 bg-background/80 backdrop-blur-sm border border-primary/20 rounded-full">
                      <p className="text-xs md:text-sm font-medium text-muted-foreground tracking-wide uppercase">
                        {date}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Message Bubble */}
                <div className="relative">
                  <div className="relative bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl">
                    <p className="text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed text-foreground font-light">
                      {message}
                    </p>
                    
                    {/* Decorative quote marks - smaller on mobile */}
                    <div className="absolute -top-2 -left-2 md:-top-4 md:-left-4 text-4xl md:text-6xl text-primary/20 font-serif">"</div>
                    <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 text-4xl md:text-6xl text-primary/20 font-serif">"</div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="flex items-center gap-2 pt-2 md:pt-4">
                  <div className="h-px bg-gradient-to-r from-primary/40 to-transparent flex-1" />
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary/60" />
                  <div className="h-px bg-gradient-to-l from-primary/40 to-transparent flex-1" />
                </div>
              </div>
              
              {/* Image Side */}
              <div className={imageOrder}>
                <div className="relative aspect-[4/5] max-w-xs md:max-w-sm lg:max-w-md mx-auto rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
                  
                  {/* Image */}
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: image.focalPoint || 'center',
                    }}
                    loading="lazy"
                  />
                  
                  {/* Border glow */}
                  <div className="absolute inset-0 ring-1 ring-white/10 rounded-2xl md:rounded-3xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll hint for first scene - positioned higher to avoid dots */}
      {index === 0 && (
        <div className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 animate-bounce md:hidden">
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <span>Swipe left/right →</span>
          </div>
        </div>
      )}
    </div>
  );
}
