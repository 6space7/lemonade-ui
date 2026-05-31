"use client"

import { type ComponentPropsWithoutRef, useMemo, useRef, useState } from "react"
import { Check, Star } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

export type PricingBillingCycle = "monthly" | "annual"

export type PricingPlan = {
  name: string
  monthlyPrice: number
  annualPrice?: number
  unit?: string
  period?: string
  description: string
  ctaLabel?: string
  ctaHref?: string
  ctaTarget?: ComponentPropsWithoutRef<"a">["target"]
  ctaRel?: string
  ctaAriaLabel?: string
  featureHeading?: string
  featureIntro: string
  features: string[]
  badge?: string
}

export type PricingReviewAvatar = {
  label: string
  initials?: string
  tooltip?: string
  src?: string
  color?: string
}

export type PricingBillingLabels = {
  monthly?: string
  annual?: string
}

export type PricingPlansProps = Omit<ComponentPropsWithoutRef<"section">, "title"> & {
  title?: string
  accentTitle?: string
  defaultBilling?: PricingBillingCycle
  annualDiscount?: number
  billingLabels?: PricingBillingLabels
  saveLabel?: string | null
  currency?: string
  unitLabel?: string
  periodLabel?: string
  ctaLabel?: string
  featureHeading?: string
  plans?: PricingPlan[]
  logos?: string[]
  avatars?: PricingReviewAvatar[]
  avatarLimit?: number
  starCount?: number
  rating?: string
  reviewText?: string
  onBillingChange?: (billing: PricingBillingCycle) => void
  onPlanSelect?: (plan: PricingPlan, billing: PricingBillingCycle) => void
}

const defaultPlans: PricingPlan[] = [
  {
    name: "Basic plan",
    monthlyPrice: 10,
    unit: "per user",
    period: "per month",
    description: "Basic features for up to 10 users.",
    featureIntro: "Everything in our free plan plus....",
    features: [
      "Access to basic features",
      "Basic reporting and analytics",
      "Up to 10 individual users",
      "20GB individual data each user",
    ],
  },
  {
    name: "Business plan",
    monthlyPrice: 20,
    unit: "per user",
    period: "per month",
    description: "Basic features for up to 20 users.",
    featureIntro: "Everything in Basic plus....",
    features: [
      "200+ integrations",
      "Advanced reporting and analytics",
      "Up to 20 individual users",
      "40GB individual data each user",
    ],
    badge: "Popular",
  },
  {
    name: "Enterprise plan",
    monthlyPrice: 40,
    unit: "per user",
    period: "per month",
    description: "Advanced features + unlimited users.",
    featureIntro: "Everything in Business plus....",
    features: [
      "Advanced custom fields",
      "Audit log and data history",
      "Unlimited individual users",
      "Unlimited individual data",
    ],
  },
]

const defaultLogos = ["upwork", "PLAID", "splunk>", "ghost", "Square", "Wealthsimple", "Uber", "twitch"]

const defaultAvatars: PricingReviewAvatar[] = [
  { label: "Jay", color: "#c98958" },
  { label: "Noa", color: "#2d3946" },
  { label: "Rae", color: "#f0d7bf" },
  { label: "Mia", color: "#38302b" },
  { label: "Ana", color: "#e2b9a8" },
]

const planCtaClassName =
  "mt-8 inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#202124] text-base font-bold tracking-normal text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_8px_22px_rgba(0,0,0,0.08)] transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#202124]/12"

export function PricingPlans({
  title = "We've got a plan",
  accentTitle = "that's perfect for you",
  defaultBilling = "monthly",
  annualDiscount = 0.16,
  billingLabels,
  saveLabel,
  currency = "$",
  unitLabel = "per user",
  periodLabel = "per month",
  ctaLabel = "Get started",
  featureHeading = "Features",
  plans = defaultPlans,
  logos = defaultLogos,
  avatars = defaultAvatars,
  avatarLimit = 5,
  starCount = 5,
  rating = "5.0",
  reviewText = "from 4,000+ reviews",
  onBillingChange,
  onPlanSelect,
  className,
  ...props
}: PricingPlansProps) {
  const rootRef = useRef<HTMLElement>(null)
  const billingRef = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const [billing, setBilling] = useState<PricingBillingCycle>(defaultBilling)
  const visibleAvatars = useMemo(
    () => avatars.slice(0, Math.max(0, avatarLimit)),
    [avatarLimit, avatars]
  )
  const visibleStarCount = Math.max(0, Math.round(starCount))
  const computedSaveLabel = useMemo(
    () => (saveLabel === null ? null : saveLabel ?? `Save ${Math.round(annualDiscount * 100)}%`),
    [annualDiscount, saveLabel]
  )

  useGSAP(
    () => {
      if (!rootRef.current || reducedMotion) {
        return
      }

      const context = gsap.context(() => {
        gsap.fromTo(
          "[data-pricing-intro]",
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.78, ease: "power3.out", stagger: 0.08 }
        )

        gsap.fromTo(
          "[data-pricing-card]",
          { y: 28, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.72,
            ease: "power3.out",
            stagger: 0.08,
            delay: 0.12,
          }
        )

        gsap.fromTo(
          "[data-pricing-logo]",
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: 0.045, delay: 0.36 }
        )
      }, rootRef)

      return () => context.revert()
    },
    { dependencies: [reducedMotion], scope: rootRef }
  )

  const setBillingCycle = (nextBilling: PricingBillingCycle) => {
    setBilling(nextBilling)
    onBillingChange?.(nextBilling)

    if (reducedMotion || !rootRef.current) {
      return
    }

    gsap.fromTo(
      rootRef.current.querySelectorAll("[data-price-value]"),
      { y: 12, opacity: 0, filter: "blur(5px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.38, ease: "power3.out", stagger: 0.04 }
    )

    gsap.fromTo(
      billingRef.current,
      { scale: 0.98 },
      { scale: 1, duration: 0.45, ease: "elastic.out(1, 0.55)" }
    )
  }

  const liftCard = (card: HTMLElement) => {
    if (reducedMotion) {
      return
    }

    gsap.to(card, {
      y: -8,
      scale: 1.012,
      duration: 0.34,
      ease: "power3.out",
    })
  }

  const settleCard = (card: HTMLElement) => {
    if (reducedMotion) {
      return
    }

    gsap.to(card, {
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.72)",
    })
  }

  return (
    <section
      ref={rootRef}
      className={cn("mx-auto w-full max-w-[69rem] bg-white px-7 py-10 text-[#202124]", className)}
      {...props}
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <h2
            data-pricing-intro
            className="max-w-[48rem] text-5xl font-normal leading-[0.95] tracking-normal text-[#202124] sm:text-6xl lg:text-[4.35rem]"
          >
            <span className="block">{title}</span>
            <span className="mt-3 block font-serif italic">{accentTitle}</span>
          </h2>

          <div
            ref={billingRef}
            data-pricing-intro
            className="mt-12 inline-flex items-center rounded-lg border border-[#d7d7d7] bg-[#f6f6f6] p-1 shadow-[0_3px_12px_rgba(0,0,0,0.06)]"
            aria-label="Pricing billing period"
          >
            <BillingButton
              active={billing === "monthly"}
              onClick={() => setBillingCycle("monthly")}
              label={billingLabels?.monthly ?? "Monthly billing"}
            />
            <BillingButton
              active={billing === "annual"}
              onClick={() => setBillingCycle("annual")}
              label={billingLabels?.annual ?? "Annual billing"}
            />
            {computedSaveLabel ? (
              <span className="ml-1 rounded-md bg-[#ededed] px-3 py-2 text-sm font-bold leading-none text-[#202124]/74">
                {computedSaveLabel}
              </span>
            ) : null}
          </div>
        </div>

        <div data-pricing-intro className="flex shrink-0 items-start gap-3 pt-3">
          <div className="flex -space-x-2 overflow-visible">
            {visibleAvatars.map((avatar, index) => (
              <span
                key={`${avatar.label}-${index}`}
                tabIndex={0}
                data-avatar-index={index}
                aria-label={`${avatar.tooltip ?? avatar.label} review`}
                className="group/avatar relative grid size-8 place-items-center overflow-visible rounded-full outline-none hover:z-20 focus:z-20"
              >
                <span
                  data-avatar-tooltip
                  role="tooltip"
                  className="pointer-events-none absolute -top-8 left-1/2 z-20 -translate-x-1/2 translate-y-1 scale-95 select-none whitespace-nowrap rounded-md border border-[#202124]/10 bg-white px-2 py-1 text-[0.66rem] font-black leading-none text-[#202124] opacity-0 shadow-[0_8px_18px_rgba(0,0,0,0.09)] transition-[opacity,transform] delay-75 duration-150 ease-out group-hover/avatar:translate-y-0 group-hover/avatar:scale-100 group-hover/avatar:opacity-100 group-focus/avatar:translate-y-0 group-focus/avatar:scale-100 group-focus/avatar:opacity-100"
                >
                  {avatar.tooltip ?? avatar.label}
                  <span className="absolute left-1/2 top-full size-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r border-[#202124]/10 bg-white" />
                </span>
                <span
                  data-avatar-bubble
                  className="grid size-8 select-none place-items-center overflow-hidden rounded-full border-2 border-white bg-[#ddd] text-[0.62rem] font-black text-white shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition-transform duration-200 ease-out group-hover/avatar:-translate-y-1 group-hover/avatar:scale-105 group-focus/avatar:-translate-y-1 group-focus/avatar:scale-105"
                  style={{ background: avatar.color }}
                >
                  {avatar.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={avatar.src} alt={avatar.label} className="size-full object-cover" />
                  ) : (
                    avatar.initials ?? avatar.label.slice(0, 1)
                  )}
                </span>
              </span>
            ))}
          </div>
          <div className="pt-0.5">
            <div className="flex gap-0.5" aria-label={`${rating} star rating`}>
              {Array.from({ length: visibleStarCount }).map((_, index) => (
                <Star key={index} className="size-4 fill-[#202124] text-[#202124]" strokeWidth={2.6} />
              ))}
              <span className="ml-1 text-sm font-black leading-none text-[#202124]">{rating}</span>
            </div>
            <p className="mt-1 text-sm font-semibold leading-none text-[#202124]/54">{reviewText}</p>
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-7 lg:grid-cols-3">
        {plans.map((plan) => {
          const price = getPrice(plan, billing, annualDiscount)

          return (
            <article
              key={plan.name}
              data-pricing-card
              className="overflow-hidden rounded-[1.35rem] border border-[#d7d7d7] bg-white shadow-[0_1px_0_rgba(0,0,0,0.02)]"
              onPointerEnter={(event) => liftCard(event.currentTarget)}
              onPointerLeave={(event) => settleCard(event.currentTarget)}
            >
              <div className="p-7">
                <div className="flex min-h-7 items-start justify-between gap-3">
                  <h3 className="text-2xl font-black leading-none tracking-normal text-[#202124]">
                    {plan.name}
                  </h3>
                  {plan.badge ? (
                    <span className="rounded-lg bg-[#f2f2f2] px-3 py-2 text-xs font-black leading-none text-[#202124]/68">
                      {plan.badge}
                    </span>
                  ) : null}
                </div>

                <div className="mt-7 flex items-end gap-2">
                  <span className="text-5xl font-black leading-none tracking-normal text-[#202124] sm:text-6xl">
                    {currency}
                  </span>
                  <span
                    data-price-value
                    className="text-6xl font-black leading-[0.82] tracking-normal text-[#202124] sm:text-7xl"
                  >
                    {price}
                  </span>
                  <span className="mb-1.5 text-sm font-semibold leading-tight text-[#202124]/66">
                    {plan.unit ?? unitLabel}
                    <br />
                    {plan.period ?? periodLabel}
                  </span>
                </div>

                <p className="mt-8 min-h-6 text-base font-semibold leading-normal text-[#202124]/58">
                  {plan.description}
                </p>

                {plan.ctaHref ? (
                  <a
                    href={plan.ctaHref}
                    target={plan.ctaTarget}
                    rel={plan.ctaRel ?? (plan.ctaTarget === "_blank" ? "noreferrer" : undefined)}
                    aria-label={plan.ctaAriaLabel ?? `${plan.ctaLabel ?? ctaLabel} for ${plan.name}`}
                    className={planCtaClassName}
                    onClick={() => onPlanSelect?.(plan, billing)}
                  >
                    {plan.ctaLabel ?? ctaLabel}
                  </a>
                ) : (
                  <button
                    type="button"
                    className={planCtaClassName}
                    aria-label={plan.ctaAriaLabel ?? `${plan.ctaLabel ?? ctaLabel} for ${plan.name}`}
                    onClick={() => onPlanSelect?.(plan, billing)}
                  >
                    {plan.ctaLabel ?? ctaLabel}
                  </button>
                )}
              </div>

              <div className="border-t border-[#d7d7d7] p-7">
                <p className="text-sm font-black uppercase text-[#202124]">
                  {plan.featureHeading ?? featureHeading}
                </p>
                <p className="mt-2 text-base font-semibold text-[#202124]/58">{plan.featureIntro}</p>

                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-base font-semibold text-[#202124]/64">
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#98ff0a] text-[#202124]">
                        <Check className="size-3.5" strokeWidth={4} />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          )
        })}
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-between gap-x-9 gap-y-5">
        {logos.map((logo) => (
          <span
            key={logo}
            data-pricing-logo
            className="text-2xl font-black leading-none tracking-normal text-[#202124] opacity-90"
          >
            {logo}
          </span>
        ))}
      </div>
    </section>
  )
}

function BillingButton({
  active,
  label,
  onClick,
}: {
  active: boolean
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        "rounded-md px-3 py-2 text-sm font-bold leading-none transition-colors",
        active
          ? "bg-white text-[#202124] shadow-[0_2px_9px_rgba(0,0,0,0.08)]"
          : "text-[#202124]/55 hover:bg-white/70 hover:text-[#202124]"
      )}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

function getPrice(plan: PricingPlan, billing: PricingBillingCycle, annualDiscount: number) {
  if (billing === "monthly") {
    return plan.monthlyPrice
  }

  return plan.annualPrice ?? Math.round(plan.monthlyPrice * (1 - annualDiscount))
}
