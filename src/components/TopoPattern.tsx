export default function TopoPattern({
  className = '',
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      className={`pointer-events-none absolute ${flip ? 'left-0 bottom-0 -scale-x-100' : 'right-0 top-0'} ${className}`}
      width="640"
      height="480"
      viewBox="0 0 800 600"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.5" opacity="0.5">
        <path d="M50,500 Q150,400 100,300 Q50,200 150,120 Q250,40 400,80 Q550,120 600,250 Q650,380 550,460 Q450,540 300,500 Q180,470 50,500Z" />
        <path d="M90,470 Q170,390 130,310 Q90,230 180,160 Q270,90 390,120 Q510,150 550,260 Q590,370 510,440 Q430,510 310,470 Q210,440 90,470Z" />
        <path d="M130,440 Q190,380 160,320 Q130,260 200,210 Q270,160 370,180 Q470,200 500,280 Q530,360 470,410 Q410,460 320,430 Q240,410 130,440Z" />
        <path d="M170,410 Q210,370 190,330 Q170,290 220,260 Q270,230 340,245 Q410,260 430,310 Q450,360 410,390 Q370,420 310,400 Q260,390 170,410Z" />
      </g>
    </svg>
  );
}
