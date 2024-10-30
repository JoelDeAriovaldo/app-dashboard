// src/components/ui/dropdown-menu.js
import * as React from "react"

const DropdownMenu = ({ children }) => {
    return <div className="relative">{children}</div>
}

const DropdownMenuTrigger = React.forwardRef(({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? React.cloneElement(props.children, { ref, ...props }) :
        <button
            ref={ref}
            className={`inline-flex items-center justify-center ${className || ''}`}
            {...props}
        />
    return Comp
})
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

const DropdownMenuContent = React.forwardRef(({ className, align = "center", ...props }, ref) => {
    const alignClasses = {
        center: "left-1/2 -translate-x-1/2",
        start: "left-0",
        end: "right-0"
    }

    return (
        <div
            ref={ref}
            className={`z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 absolute top-full mt-2 ${alignClasses[align]} ${className || ''}`}
            {...props}
        />
    )
})
DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuItem = React.forwardRef(({ className, ...props }, ref) => (
    <button
        ref={ref}
        className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground w-full ${className || ''}`}
        {...props}
    />
))
DropdownMenuItem.displayName = "DropdownMenuItem"

const DropdownMenuLabel = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={`px-2 py-1.5 text-sm font-semibold ${className || ''}`}
        {...props}
    />
))
DropdownMenuLabel.displayName = "DropdownMenuLabel"

const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={`-mx-1 my-1 h-px bg-muted ${className || ''}`}
        {...props}
    />
))
DropdownMenuSeparator.displayName = "DropdownMenuSeparator"

export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
}