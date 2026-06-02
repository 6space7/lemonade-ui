"use client"

import {
  type ComponentPropsWithoutRef,
  type FormEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react"
import { Check, ChevronDown } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

export type PaymentMethodValues = {
  nameOnCard: string
  cardNumber: string
  expiry: string
  cvc: string
  country: string
  countryCode: string
  address: string
}

export type PaymentCountryOption = {
  id: string
  name: string
  code?: string
  flagColors?: string[]
  flagDirection?: "horizontal" | "vertical"
}

export type PaymentMethodCardProps = Omit<
  ComponentPropsWithoutRef<"form">,
  "children" | "onSubmit"
> & {
  title?: string
  methodLabel?: string
  cardBrand?: string
  nameLabel?: string
  cardDetailsLabel?: string
  billingAddressLabel?: string
  namePlaceholder?: string
  cardNumberPlaceholder?: string
  expiryPlaceholder?: string
  cvcPlaceholder?: string
  addressPlaceholder?: string
  countryName?: string
  countryOptions?: PaymentCountryOption[]
  defaultCountryId?: string
  amount?: string
  payLabel?: string
  initialValues?: Partial<PaymentMethodValues>
  onCountryClick?: () => void
  onCountryChange?: (country: PaymentCountryOption) => void
  onPay?: (values: PaymentMethodValues) => void
  onValueChange?: (values: PaymentMethodValues) => void
}

const emptyValues: PaymentMethodValues = {
  nameOnCard: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
  country: "Poland",
  countryCode: "PL",
  address: "",
}

const defaultCountries: PaymentCountryOption[] = [
  { id: "pl", name: "Poland", code: "PL", flagColors: ["#ffffff", "#dc2f3f"] },
  {
    id: "us",
    name: "United States",
    code: "US",
    flagColors: ["#2457c5", "#ffffff", "#d92f3b"],
    flagDirection: "vertical",
  },
  {
    id: "gb",
    name: "United Kingdom",
    code: "GB",
    flagColors: ["#173b8f", "#ffffff", "#cf142b"],
    flagDirection: "vertical",
  },
  {
    id: "ca",
    name: "Canada",
    code: "CA",
    flagColors: ["#e31b23", "#ffffff", "#e31b23"],
    flagDirection: "vertical",
  },
  {
    id: "de",
    name: "Germany",
    code: "DE",
    flagColors: ["#111111", "#dd0000", "#ffce00"],
  },
  {
    id: "fr",
    name: "France",
    code: "FR",
    flagColors: ["#2446a8", "#ffffff", "#ed2939"],
    flagDirection: "vertical",
  },
  { id: "nl", name: "Netherlands", code: "NL", flagColors: ["#ae1c28", "#ffffff", "#21468b"] },
  { id: "bd", name: "Bangladesh", code: "BD", flagColors: ["#006a4e", "#f42a41"], flagDirection: "vertical" },
]

const inputClassName =
  "h-12 w-full bg-white px-4 text-base font-medium text-[#111111] outline-none transition-[border-color,box-shadow] placeholder:text-[#9aa0a1] focus-visible:ring-0"

export function PaymentMethodCard({
  title = "Payment Method",
  methodLabel = "Credit card",
  cardBrand = "VISA",
  nameLabel = "Name on the card",
  cardDetailsLabel = "Card details",
  billingAddressLabel = "Billing address",
  namePlaceholder = "John Smith",
  cardNumberPlaceholder = "1234 5678 9012 3456",
  expiryPlaceholder = "MM/YY",
  cvcPlaceholder = "CVC",
  addressPlaceholder = "Address",
  countryName = "Poland",
  countryOptions = defaultCountries,
  defaultCountryId,
  amount = "$10.99",
  payLabel,
  initialValues,
  onCountryClick,
  onCountryChange,
  onPay,
  onValueChange,
  className,
  "aria-label": ariaLabel,
  ...props
}: PaymentMethodCardProps) {
  const rootRef = useRef<HTMLFormElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const countryButtonRef = useRef<HTMLButtonElement>(null)
  const sheenRef = useRef<HTMLSpanElement>(null)
  const countryListId = useId()
  const reducedMotion = usePrefersReducedMotion()
  const safeCountryOptions = countryOptions.length > 0 ? countryOptions : defaultCountries
  const initialCountry = resolveInitialCountry({
    countries: safeCountryOptions,
    countryName,
    defaultCountryId,
    initialValues,
  })
  const [selectedCountry, setSelectedCountry] = useState(initialCountry)
  const [countryOpen, setCountryOpen] = useState(false)
  const [countryMenuPlacement, setCountryMenuPlacement] = useState<"top" | "bottom">("bottom")
  const [values, setValues] = useState<PaymentMethodValues>({
    ...emptyValues,
    ...(initialValues ?? {}),
    country: initialCountry.name,
    countryCode: getCountryCode(initialCountry),
  })

  useGSAP(
    () => {
      if (!rootRef.current || reducedMotion) {
        return
      }

      const context = gsap.context(() => {
        gsap.fromTo(
          rootRef.current,
          { y: 18, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 0.72, ease: "elastic.out(1, 0.62)" }
        )
        gsap.fromTo(
          "[data-payment-reveal]",
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.48, stagger: 0.055, ease: "power3.out", delay: 0.08 }
        )
      }, rootRef)

      return () => context.revert()
    },
    { dependencies: [reducedMotion], scope: rootRef }
  )

  useEffect(() => {
    if (!countryOpen) {
      return
    }

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setCountryOpen(false)
      }
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCountryOpen(false)
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick)
    window.addEventListener("keydown", closeOnEscape)

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick)
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [countryOpen])

  const updateValue = (key: keyof PaymentMethodValues, value: string) => {
    const nextValues = { ...values, [key]: value }

    setValues(nextValues)
    onValueChange?.(nextValues)
  }

  const selectCountry = (country: PaymentCountryOption) => {
    const nextValues = {
      ...values,
      country: country.name,
      countryCode: getCountryCode(country),
    }

    setSelectedCountry(country)
    setCountryOpen(false)
    setValues(nextValues)
    onCountryChange?.(country)
    onValueChange?.(nextValues)
  }

  const toggleCountryMenu = () => {
    if (!countryOpen) {
      const buttonRect = countryButtonRef.current?.getBoundingClientRect()
      const menuHeight = Math.min(200, safeCountryOptions.length * 40 + 8)

      if (buttonRect) {
        const spaceBelow = window.innerHeight - buttonRect.bottom
        const spaceAbove = buttonRect.top

        setCountryMenuPlacement(
          spaceBelow < menuHeight + 16 && spaceAbove > spaceBelow ? "top" : "bottom"
        )
      }
    }

    setCountryOpen((current) => !current)
  }

  const submitPayment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onPay?.(values)

    if (reducedMotion) {
      return
    }

    gsap.killTweensOf([buttonRef.current, sheenRef.current])
    gsap.fromTo(
      buttonRef.current,
      { scale: 0.985 },
      { scale: 1, duration: 0.42, ease: "elastic.out(1, 0.5)" }
    )
    gsap.fromTo(
      sheenRef.current,
      { xPercent: -130, opacity: 0 },
      { xPercent: 130, opacity: 0.58, duration: 0.72, ease: "power3.out" }
    )
  }

  return (
    <form
      ref={rootRef}
      aria-label={ariaLabel ?? title}
      className={cn(
        "relative mx-auto w-full max-w-[29rem] rounded-[2.15rem] bg-white p-4 text-[#111111] shadow-[0_26px_80px_rgba(16,20,24,0.12)] sm:p-5",
        className
      )}
      onSubmit={submitPayment}
      {...props}
    >
      <h2
        data-payment-reveal
        className="px-1 text-[1.38rem] font-semibold leading-tight tracking-normal text-[#111111]"
      >
        {title}
      </h2>

      <section
        data-payment-reveal
        className="relative z-10 mt-5 rounded-[1.55rem] border-[2.5px] border-[#111111] bg-white p-5 shadow-[0_16px_40px_rgba(17,17,17,0.05)] sm:p-5"
      >
        <div className="flex items-center gap-4">
          <label className="inline-flex min-w-0 items-center gap-4">
            <input
              type="radio"
              name="payment-method"
              value="credit-card"
              checked
              readOnly
              className="sr-only"
            />
            <span className="grid size-6 shrink-0 place-items-center rounded-full border-2 border-[#111111] bg-white">
              <span className="size-3.5 rounded-full bg-[#111111]" />
            </span>
            <span className="truncate text-xl font-semibold tracking-normal text-[#171717]">
              {methodLabel}
            </span>
          </label>

          <span className="ml-auto inline-flex h-11 min-w-16 items-center justify-center rounded-lg bg-[#c8ebff] px-3 text-base font-black uppercase tracking-normal text-[#111111] shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_8px_18px_rgba(52,152,204,0.12)]">
            {cardBrand}
          </span>
        </div>

        <div className="mt-6 grid gap-5">
          <FieldLabel label={nameLabel}>
            <div
              className="overflow-hidden rounded-xl border border-[#cbd1d0] bg-white focus-within:border-[#111111]/46"
            >
              <input
                value={values.nameOnCard}
                aria-label={nameLabel}
                placeholder={namePlaceholder}
                autoComplete="cc-name"
                className={inputClassName}
                onChange={(event) => updateValue("nameOnCard", event.target.value)}
              />
            </div>
          </FieldLabel>

          <FieldLabel label={cardDetailsLabel}>
            <div
              className="overflow-hidden rounded-xl border border-[#cbd1d0] bg-white focus-within:border-[#111111]/46"
            >
              <div className="relative">
                <input
                  value={values.cardNumber}
                  aria-label="Card number"
                  placeholder={cardNumberPlaceholder}
                  autoComplete="cc-number"
                  inputMode="numeric"
                  className={cn(inputClassName, "pr-24")}
                  onChange={(event) =>
                    updateValue("cardNumber", formatCardNumber(event.target.value))
                  }
                />
                <span
                  aria-hidden="true"
                  className="absolute right-4 top-1/2 inline-flex -translate-y-1/2 items-center gap-2 text-xs font-black italic text-[#111111]"
                >
                  {cardBrand}
                  <span className="relative inline-flex h-3 w-6 items-center">
                    <span className="absolute left-0 size-3 rounded-full bg-[#111111]" />
                    <span className="absolute left-2.5 size-3 rounded-full bg-[#111111]" />
                  </span>
                </span>
              </div>

              <div className="grid grid-cols-2 border-t border-[#d6dbda]">
                <input
                  value={values.expiry}
                  aria-label="Card expiry"
                  placeholder={expiryPlaceholder}
                  autoComplete="cc-exp"
                  inputMode="numeric"
                  className={inputClassName}
                  onChange={(event) => updateValue("expiry", formatExpiry(event.target.value))}
                />
                <input
                  value={values.cvc}
                  aria-label="Card security code"
                  placeholder={cvcPlaceholder}
                  autoComplete="cc-csc"
                  inputMode="numeric"
                  className={cn(inputClassName, "border-l border-[#d6dbda]")}
                  onChange={(event) => updateValue("cvc", digitsOnly(event.target.value, 4))}
                />
              </div>
            </div>
          </FieldLabel>

          <FieldLabel label={billingAddressLabel}>
            <div className="relative rounded-xl border border-[#cbd1d0] bg-white focus-within:border-[#111111]/46">
              <button
                ref={countryButtonRef}
                type="button"
                className="flex h-12 w-full items-center gap-3 rounded-t-xl px-4 text-left text-base font-semibold text-[#171717] outline-none transition-colors hover:bg-[#f8faf9] focus-visible:bg-[#f8faf9]"
                aria-label={`Billing country: ${selectedCountry.name}`}
                aria-controls={countryListId}
                aria-expanded={countryOpen}
                aria-haspopup="listbox"
                onClick={() => {
                  onCountryClick?.()
                  toggleCountryMenu()
                }}
              >
                <CountryFlag country={selectedCountry} />
                <span className="min-w-0 flex-1 truncate">{selectedCountry.name}</span>
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 text-[#111111] transition-transform",
                    countryOpen && "rotate-180"
                  )}
                  strokeWidth={2.4}
                />
              </button>
              {countryOpen ? (
                <div
                  id={countryListId}
                  role="listbox"
                  aria-label="Billing country"
                  className={cn(
                    "absolute left-2 right-2 z-30 max-h-48 overflow-y-auto rounded-xl border border-[#d6dbda] bg-white p-1 shadow-[0_18px_45px_rgba(17,17,17,0.14)]",
                    countryMenuPlacement === "top"
                      ? "bottom-[calc(100%+0.45rem)]"
                      : "top-[3.15rem]"
                  )}
                >
                  {safeCountryOptions.map((country) => {
                    const isSelected = country.id === selectedCountry.id

                    return (
                      <button
                        key={country.id}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        className={cn(
                          "flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-semibold text-[#171717] outline-none transition-colors hover:bg-[#f3f5f5] focus-visible:bg-[#f3f5f5]",
                          isSelected && "bg-[#f1f3f3]"
                        )}
                        onClick={() => selectCountry(country)}
                      >
                        <CountryFlag country={country} />
                        <span className="min-w-0 flex-1 truncate">{country.name}</span>
                        <span className="shrink-0 text-xs font-black text-[#111111]/34">
                          {getCountryCode(country)}
                        </span>
                      </button>
                    )
                  })}
                </div>
              ) : null}
              <input
                value={values.address}
                aria-label={addressPlaceholder}
                placeholder={addressPlaceholder}
                autoComplete="billing street-address"
                className={cn(inputClassName, "rounded-b-xl border-t border-[#d6dbda]")}
                onChange={(event) => updateValue("address", event.target.value)}
              />
            </div>
          </FieldLabel>
        </div>
      </section>

      <button
        ref={buttonRef}
        data-payment-reveal
        type="submit"
        className="group/pay relative mt-4 flex h-16 w-full items-center justify-center overflow-hidden rounded-xl bg-[#101010] px-6 text-xl font-semibold tracking-normal text-white shadow-[0_18px_36px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.08)] outline-none transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-black focus-visible:ring-4 focus-visible:ring-black/14"
      >
        <span
          ref={sheenRef}
          aria-hidden="true"
          className="absolute inset-y-[-30%] left-0 w-1/3 -skew-x-12 bg-white/24 opacity-0 blur-xl"
        />
        <span className="relative inline-flex items-center gap-2">
          {payLabel ?? `Pay ${amount}`}
          <Check className="size-5 opacity-0 transition-[opacity,transform] duration-300 group-hover/pay:translate-x-0.5 group-hover/pay:opacity-100 group-focus-visible/pay:translate-x-0.5 group-focus-visible/pay:opacity-100" />
        </span>
      </button>
    </form>
  )
}

function FieldLabel({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="block">
      <span className="mb-2 block text-base font-semibold leading-none tracking-normal text-[#303030]">
        {label}
      </span>
      {children}
    </div>
  )
}

function CountryFlag({ country }: { country: PaymentCountryOption }) {
  const colors = country.flagColors?.length ? country.flagColors : ["#f4f4f4", "#d7d7d7"]
  const direction = country.flagDirection ?? "horizontal"

  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex h-4 w-6 shrink-0 overflow-hidden rounded-[0.2rem] border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.1)]",
        direction === "vertical" ? "flex-row" : "flex-col"
      )}
    >
      {colors.map((color, index) => (
        <span
          key={`${country.id}-${color}-${index}`}
          className="flex-1"
          style={{ backgroundColor: color }}
        />
      ))}
    </span>
  )
}

function resolveInitialCountry({
  countries,
  countryName,
  defaultCountryId,
  initialValues,
}: {
  countries: PaymentCountryOption[]
  countryName: string
  defaultCountryId?: string
  initialValues?: Partial<PaymentMethodValues>
}) {
  return (
    countries.find((country) => country.id === defaultCountryId) ??
    countries.find((country) => getCountryCode(country) === initialValues?.countryCode) ??
    countries.find((country) => country.name === initialValues?.country) ??
    countries.find((country) => country.name === countryName) ??
    countries[0] ??
    defaultCountries[0]
  )
}

function getCountryCode(country: PaymentCountryOption) {
  return country.code ?? country.id.toUpperCase()
}

function formatCardNumber(value: string) {
  return digitsOnly(value, 16).replace(/(\d{4})(?=\d)/g, "$1 ")
}

function formatExpiry(value: string) {
  const digits = digitsOnly(value, 4)

  if (digits.length <= 2) {
    return digits
  }

  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

function digitsOnly(value: string, maxLength: number) {
  return value.replace(/\D/g, "").slice(0, maxLength)
}
