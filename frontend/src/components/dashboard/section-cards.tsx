"use client";

import { useEffect, useState } from "react";
import { IconTrendingDown, IconTrendingUp, IconLoader2 } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/lib/api";

export function SectionCards() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/stats/summary");
        setStats(res.data.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Display a loading state while waiting for the database count
  if (loading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <IconLoader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  const cards = [
    {
      title: "Total Articles",
      value: stats?.totalArticles?.toLocaleString() || "0",
      trend: "+12%", // Hardcoded for now, later backend stats logic
      trendUp: true,
      footer: "Total published content",
      footerTrend: "Increasing this month",
    },
    {
      title: "Total Comments",
      value: stats?.totalComments?.toLocaleString() || "0",
      trend: "+8%",
      trendUp: true,
      footer: "Active discussions",
      footerTrend: "High engagement",
    },
    {
      title: "Registered Users",
      value: stats?.totalUsers?.toLocaleString() || "0",
      trend: "+5.4%",
      trendUp: true,
      footer: "Active reader accounts",
      footerTrend: "Strong community growth",
    },
    {
      title: "Engagement Rate",
      value: stats?.engagementRate || "0%",
      trend: "+0.2%",
      trendUp: true,
      footer: "Meets editorial targets",
      footerTrend: "Average time on page up",
    },
  ];

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cards.map((card, index) => (
        <Card key={index} className="@container/card">
          <CardHeader>
            <CardDescription>{card.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card.value}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                {card.trendUp ? <IconTrendingUp /> : <IconTrendingDown />}
                {card.trend}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {card.footerTrend}{" "}
              {card.trendUp ? (
                <IconTrendingUp className="size-4" />
              ) : (
                <IconTrendingDown className="size-4" />
              )}
            </div>
            <div className="text-muted-foreground">{card.footer}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}