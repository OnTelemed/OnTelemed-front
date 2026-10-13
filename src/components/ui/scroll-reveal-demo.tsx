"use client"

import ScrollRevealContentA, { ItemContent } from "@/components/ui/scroll-reveal-content-a"

const contentA: ItemContent = {
  title: "Join The Community",
  description:
    "Join over a billion people around the world who come to games to create, connect and be entertained.",
  image: {
    url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InJlZCIvPjwvc3ZnPg==",
    width: 657.6,
    height: 715.3,
    alt: "Three Points",
  },
}

const contentB: ItemContent = {
  title: "Bask in the spotlight",
  description:
    "This is where customer attention locks in — with your brand directly in the action of the biggest IP games.",
  image: {
    url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImdyZWVuIi8+PC9zdmc+",
    width: 657.6,
    height: 715.3,
    alt: "Three Points",
  },
}

const contentC: ItemContent = {
  title: "Drive big results",
  description:
    "Reach massive, high-intent audiences — and turn attention into awareness, engagement, and sales.",
  image: {
    url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsdWUiLz48L3N2Zz4=",
    width: 657.6,
    height: 715.3,
    alt: "Three Points",
  },
}

export default function ScrollRevealContentADemo() {
  return <ScrollRevealContentA contentA={contentA} contentB={contentB} contentC={contentC} />
}
