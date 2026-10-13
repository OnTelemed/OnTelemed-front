"use client"

import React, { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useMotionValueEvent, useScroll } from "motion/react"

export const centralColumnStyle = "w-[92%] max-w-[1340px] mx-auto"
export const pageYPadding = "py-10 md:py-12 lg:py-20"
const defaultTitleClass = "text-xl md:text-2xl lg:text-3xl font-bold mb-2.5 text-slate-900 tracking-tight"
const defaultDescriptionClass = "text-sm md:text-base font-normal text-slate-600 leading-[160%]"
const imageClass =
  "absolute inset-0 w-full h-full object-cover rounded-2xl transition-opacity duration-300"

export interface ItemContent {
  title: string
  description: string
  image?: {
    url: string
    width: number
    height: number
    alt: string
  }
  customVisual?: React.ReactNode
}

interface Props extends React.ComponentProps<"div"> {
  contentA: ItemContent
  contentB: ItemContent
  contentC: ItemContent
  titleClass?: string
  descriptionClass?: string
}

export function ScrollRevealContentA({
  contentA,
  contentB,
  contentC,
  titleClass = defaultTitleClass,
  descriptionClass = defaultDescriptionClass,
  className,
  ...props
}: Props) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest)
  })

  const currentStep = scrollProgress <= 0.33 ? 0 : scrollProgress <= 0.66 ? 1 : 2

  const scrollToStep = (stepIndex: number) => {
    if (!containerRef.current) return
    const containerTop = containerRef.current.offsetTop
    const containerHeight = containerRef.current.offsetHeight
    const targetScroll = containerTop + (stepIndex / 3) * (containerHeight - window.innerHeight)
    window.scrollTo({ top: targetScroll, behavior: "smooth" })
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      style={{ height: "300vh" }}
      {...props}
    >
      {/* Sticky Viewport Container: stays pinned for 300vh of scroll */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className={cn(centralColumnStyle, "px-4")}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Column: Topics List with scrolling progress animation */}
            <div className="lg:col-span-6 flex flex-col justify-center gap-6 md:gap-8">
              <PointItem
                index={0}
                active={currentStep === 0}
                number="01"
                title={contentA.title}
                description={contentA.description}
                thresholdStart={0}
                thresholdEnd={0.33}
                scrollProgress={scrollProgress}
                titleClass={titleClass}
                descriptionClass={descriptionClass}
                onClick={() => scrollToStep(0)}
              />
              <PointItem
                index={1}
                active={currentStep === 1}
                number="02"
                title={contentB.title}
                description={contentB.description}
                thresholdStart={0.33}
                thresholdEnd={0.66}
                scrollProgress={scrollProgress}
                titleClass={titleClass}
                descriptionClass={descriptionClass}
                onClick={() => scrollToStep(1)}
              />
              <PointItem
                index={2}
                active={currentStep === 2}
                number="03"
                title={contentC.title}
                description={contentC.description}
                thresholdStart={0.66}
                thresholdEnd={1}
                scrollProgress={scrollProgress}
                titleClass={titleClass}
                descriptionClass={descriptionClass}
                onClick={() => scrollToStep(2)}
              />
            </div>

            {/* Right Column: Visual Showcase (Sticky, swaps elements smoothly) */}
            <div className="hidden lg:flex flex-col justify-center items-center lg:col-span-6 relative h-[560px] lg:h-[600px] xl:h-[640px] max-h-[85vh] w-full">
              {/* Visual A */}
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out",
                  currentStep === 0
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-95 translate-y-4 pointer-events-none"
                )}
              >
                {contentA.customVisual ? (
                  contentA.customVisual
                ) : contentA.image ? (
                  <Image
                    width={contentA.image.width}
                    height={contentA.image.height}
                    src={contentA.image.url}
                    alt={contentA.image.alt}
                    className={cn(imageClass, "opacity-100")}
                  />
                ) : null}
              </div>

              {/* Visual B */}
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out",
                  currentStep === 1
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-95 translate-y-4 pointer-events-none"
                )}
              >
                {contentB.customVisual ? (
                  contentB.customVisual
                ) : contentB.image ? (
                  <Image
                    width={contentB.image.width}
                    height={contentB.image.height}
                    src={contentB.image.url}
                    alt={contentB.image.alt}
                    className={cn(imageClass, "opacity-100")}
                  />
                ) : null}
              </div>

              {/* Visual C */}
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out",
                  currentStep === 2
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-95 translate-y-4 pointer-events-none"
                )}
              >
                {contentC.customVisual ? (
                  contentC.customVisual
                ) : contentC.image ? (
                  <Image
                    width={contentC.image.width}
                    height={contentC.image.height}
                    src={contentC.image.url}
                    alt={contentC.image.alt}
                    className={cn(imageClass, "opacity-100")}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScrollRevealContentA

const getBarPercentageHeight = (scrollProgress: number, thresholdStart: number, thresholdEnd: number) => {
  if (scrollProgress < thresholdStart) {
    return 0
  }
  if (scrollProgress >= thresholdEnd) {
    return 100
  }
  return ((scrollProgress - thresholdStart) / (thresholdEnd - thresholdStart)) * 100
}

const PointItem = ({
  active,
  number,
  title,
  description,
  thresholdStart,
  thresholdEnd,
  scrollProgress,
  titleClass,
  descriptionClass,
  onClick,
}: {
  index: number
  active: boolean
  number: string
  title: string
  description: string
  thresholdStart: number
  thresholdEnd: number
  scrollProgress: number
  titleClass: string
  descriptionClass: string
  onClick: () => void
}) => {
  const barHeightPercentage = getBarPercentageHeight(scrollProgress, thresholdStart, thresholdEnd)

  return (
    <div
      onClick={onClick}
      className={cn(
        "group cursor-pointer select-none rounded-2xl p-4 md:p-5 transition-all duration-500",
        active
          ? "bg-white/80 dark:bg-slate-900/80 shadow-lg shadow-sky-950/5 border border-sky-100 dark:border-slate-800 scale-[1.01]"
          : "opacity-45 hover:opacity-75 hover:bg-white/40 border border-transparent scale-[0.99]"
      )}
    >
      <div className="flex items-center gap-3 mb-2">
        <span
          className={cn(
            "text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full transition-colors",
            active
              ? "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300"
              : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
          )}
        >
          Etapa {number}
        </span>
      </div>

      <div className="w-full flex relative left-[2px]">
        {/* Animated Progress Track */}
        <div className="w-[24px] flex items-start justify-center relative shrink-0 pt-1">
          <div className="h-full w-[3px] bg-slate-200 dark:bg-slate-800 rounded-full absolute top-1 left-[50%] -translate-x-1/2" />
          <div
            className="w-[3px] bg-sky-600 rounded-full absolute top-1 left-[50%] -translate-x-1/2 transition-all duration-150"
            style={{
              height: active ? `${Math.max(15, barHeightPercentage)}%` : scrollProgress > thresholdEnd ? "100%" : "0%",
            }}
          />
        </div>

        {/* Text Details */}
        <div className="w-[calc(100%-24px)] pl-4">
          <div className="flex flex-col">
            <h3 className={cn(titleClass, active ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-400")}>
              {title}
            </h3>
            <p className={cn(descriptionClass, active ? "text-slate-600 dark:text-slate-300" : "text-slate-500 dark:text-slate-500")}>
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
