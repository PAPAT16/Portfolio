import * as React from 'react'
import { cn } from "@/lib/utils"

type ChartConfig = Record<string, string | number>

type ChartTooltipProps = {
  active?: boolean
  payload?: Array<{
    value: number
    name: string
    dataKey: string
    color: string
    payload: Record<string, any>
  }>
  label?: string
  labelFormatter?: (label: string) => string
  labelClassName?: string
  formatter?: (value: number, name: string) => [number, string]
  hideLabel?: boolean
  hideIndicator?: boolean
  indicator?: 'line' | 'dot' | 'dashed'
  nameKey?: string
  labelKey?: string
  className?: string
}

type ChartLegendProps = {
  payload?: Array<{
    value: string | number
    id: string
    type: string
    color: string
    [key: string]: any
  }>
  verticalAlign?: 'top' | 'middle' | 'bottom'
  hideIcon?: boolean
  nameKey?: string
  className?: string
}

const ChartContext = React.createContext<{ config: ChartConfig }>({
  config: {},
})

export function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error('useChart must be used within a ChartProvider')
  }
  return context
}

const Chart = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div 
      ref={ref} 
      className={cn("flex aspect-video justify-center", className)}
      {...props}
    />
  )
})
Chart.displayName = "Chart"

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config: ChartConfig
  }
>(({ className, children, config, ...props }, ref) => {
  return (
    <ChartContext.Provider value={{ config }}>
      <Chart 
        ref={ref} 
        className={className}
        {...props}
      >
        {children}
      </Chart>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = React.forwardRef<HTMLDivElement, ChartTooltipProps>(
  ({ 
    active, 
    payload, 
    label, 
    labelFormatter, 
    labelClassName, 
    formatter, 
    className,
    ...props 
  }, ref) => {
    if (!active || !payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-background px-3 py-2 text-sm shadow-md",
          className
        )}
      >
        {!props.hideLabel && (
          <div className={cn("mb-2 text-sm font-medium", labelClassName)}>
            {labelFormatter ? labelFormatter(label!) : label}
          </div>
        )}
        <div className="flex flex-col gap-1">
          {payload.map((item, index) => {
            const [value, name] = formatter
              ? formatter(item.value, item.name)
              : [item.value, item.name]
            return (
              <div key={index} className="flex items-center gap-2">
                {!props.hideIndicator && (
                  <div
                    className={cn("h-2 w-2", {
                      "rounded-full": props.indicator !== "line",
                      "h-0.5": props.indicator === "line",
                    })}
                    style={{ background: item.color }}
                  />
                )}
                <span className="text-sm font-medium">{name}</span>
                <span className="text-sm text-muted-foreground">{value}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltip.displayName = "ChartTooltip"

const ChartLegend = React.forwardRef<HTMLDivElement, ChartLegendProps>(
  ({ 
    payload, 
    verticalAlign = "middle", 
    hideIcon, 
    nameKey, 
    className,
  }, ref) => {
    if (!payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-2",
          {
            "justify-start": verticalAlign === "top",
            "justify-center": verticalAlign === "middle",
            "justify-end": verticalAlign === "bottom",
          },
          className
        )}
      >
        {payload.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            {!hideIcon && (
              <div
                className="h-2 w-2 rounded-full"
                style={{ background: item.color }}
              />
            )}
            <span className="text-sm font-medium">
              {nameKey ? item[nameKey] : item.value}
            </span>
          </div>
        ))}
      </div>
    )
  }
)
ChartLegend.displayName = "ChartLegend"

export { Chart, ChartContainer, ChartTooltip, ChartLegend }
