import { TimelineScene } from '@/types/timeline';

interface TimelineSceneProps {
  scene: TimelineScene;
  index: number;
}

export function TimelineSceneComponent({ scene, index }: TimelineSceneProps) {
  const { date, message, image } = scene;
  
  // Alternate layout: even scenes have content on left, odd scenes have content on right
  const contentOrder = index % 2 === 0 ? 'order-2 md:order-1' : 'order-2 md:order-2';
  const imageOrder = index % 2 === 0 ? 'order-1 md:order-2' : 'order-1 md:order-1';

  return (
    <div className="relative w-screen h-screen flex-shrink-0 snap-center bg-background">
      <div className="h-full flex items-center justify-center py-12 md:py-20">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center h-full">
              {/* Content Side */}
              <div className={`${contentOrder} space-y-6 md:space-y-8`}>
                {/* Date Badge */}
                <div className="inline-block">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl" />
                    <div className="relative px-6 py-3 bg-background/80 backdrop-blur-sm border border-primary/20 rounded-full">
                      <p className="text-sm md:text-base font-semibold text-primary tracking-wider">
                        {date}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Message Bubble */}
                <div className="relative">
                  <div className="relative bg-card/60 backdrop-blur-md border border-border/50 rounded-3xl p-6 md:p-8 shadow-2xl">
                    <p className="text-base md:text-lg lg:text-xl leading-relaxed text-foreground font-light">
                      {message}
                    </p>
                    
                    {/* Decorative quote marks */}
                    <div className="absolute -top-4 -left-4 text-6xl text-primary/20 font-serif">"</div>
                    <div className="absolute -bottom-4 -right-4 text-6xl text-primary/20 font-serif">"</div>
                  </div>
                </div>
                
                {/* Scene indicator */}
                <div className="flex items-center gap-2 pt-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === index
                          ? 'w-12 bg-primary'
                          : 'w-1.5 bg-primary/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Image Side */}
              <div className={imageOrder}>
                <div className="relative aspect-[4/5] max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl">
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
                  <div className="absolute inset-0 ring-1 ring-white/10 rounded-3xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll hint for first scene */}
      {index === 0 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce md:hidden">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>Swipe to explore</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
