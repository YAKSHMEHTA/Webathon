import { cn, px } from "../../lib/utils"

const base =
  "inline-flex relative uppercase border font-mono cursor-pointer items-center font-medium has-[>svg]:px-3 justify-center gap-2 whitespace-nowrap ease-out transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] [clip-path:polygon(var(--poly-roundness)_0,calc(100%_-_var(--poly-roundness))_0,100%_0,100%_calc(100%_-_var(--poly-roundness)),calc(100%_-_var(--poly-roundness))_100%,0_100%,0_calc(100%_-_var(--poly-roundness)),0_var(--poly-roundness))]"

const variants = {
  default:
    "bg-background border-primary text-primary-foreground [&>[data-border]]:bg-primary [box-shadow:inset_0_0_54px_0px_var(--tw-shadow-color)] shadow-[#EBB800] hover:shadow-[#EBB800]/80",
}

const sizes = {
  default: "h-16 px-6 text-base",
  sm: "h-14 px-6 text-sm",
}

export function Button({
  className,
  variant = "default",
  size = "default",
  as: Comp = "button",
  children,
  ...props
}) {
  const polyRoundness = 16
  const hypotenuse = polyRoundness * 2
  const hypotenuseHalf = polyRoundness / 2 - 1.5

  const corner = { "--h": px(hypotenuse), "--hh": px(hypotenuseHalf) }

  return (
    <Comp
      style={{ "--poly-roundness": px(polyRoundness) }}
      data-slot="button"
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      <span
        data-border="top-left"
        style={corner}
        className="absolute inline-block w-[var(--h)] top-[var(--hh)] left-[var(--hh)] h-[2px] -rotate-45 origin-top -translate-x-1/2"
      />
      <span
        data-border="bottom-right"
        style={corner}
        className="absolute w-[var(--h)] bottom-[var(--hh)] right-[var(--hh)] h-[2px] -rotate-45 translate-x-1/2"
      />
      {children}
    </Comp>
  )
}

export default Button
