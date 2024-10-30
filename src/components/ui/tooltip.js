// src/components/ui/tooltip.js
import * as React from "react"

const TooltipProvider = ({ children, delayDuration = 200 }) => {
    return <div data-delay={delayDuration}>{children}</div>
}

const Tooltip = ({ children }) => {
    return <div className="relative">{children}</div>
}

const TooltipTrigger = React.forwardRef(({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? React.cloneElement(props.children, { ref, ...props }) :
        <button
            ref={ref}
            className={className}
            {...props}
        />
    return Comp
})
TooltipTrigger.displayName = "TooltipTrigger"

const TooltipContent = React.forwardRef(({ className, side = "top", ...props }, ref) => {
    const sideClasses = {
        top: "-top-2 left-1/2 -translate-x-1/2 -translate-y-full",
        right: "top-1/2 -right-2 translate-x-full -translate-y-1/2",
        bottom: "-bottom-2 left-1/2 -translate-x-1/2 translate-y-full",
        left: "top-1/2 -left-2 -translate-x-full -translate-y-1/2"
    }

    return (
        <div
            ref={ref}
            className={`z-50 rounded-md bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 absolute ${sideClasses[side]} ${className || ''}`}
            {...props}
        />
    )
})
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }