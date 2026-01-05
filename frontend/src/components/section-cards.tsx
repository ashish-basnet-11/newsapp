import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* CARD 1: TOTAL ARTICLES */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Articles</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1,250
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Increasing this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Total published content
          </div>
        </CardFooter>
      </Card>

      {/* CARD 2: TOTAL VIEWS */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Views</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            45.2k
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -2%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Slightly down this week <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Across all categories
          </div>
        </CardFooter>
      </Card>

      {/* CARD 3: REGISTERED USERS */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Registered Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            8,902
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +5.4%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong community growth <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Active reader accounts</div>
        </CardFooter>
      </Card>

      {/* CARD 4: ENGAGEMENT RATE */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Engagement Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            4.5%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +0.2%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Average time on page up <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets editorial targets</div>
        </CardFooter>
      </Card>
    </div>
  )
}