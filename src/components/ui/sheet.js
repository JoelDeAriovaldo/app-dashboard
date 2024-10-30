// src/components/ui/sheet.js
import * as React from "react"

const Sheet = ({ children }) => {
    return <div className="relative">{children}</div>
}

const SheetTrigger = React.forwardRef(({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? React.cloneElement(props.children, { ref, ...props }) :
        <button
            ref={ref}
            className={className}
            {...props}
        />
    return Comp
})
SheetTrigger.displayName = "SheetTrigger"

const SheetContent = React.forwardRef(({ className, children, side = "right", ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)

    React.useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") setIsOpen(false)
        }
        document.addEventListener("keydown", handleEscape)
        return () => document.removeEventListener("keydown", handleEscape)
    }, [])

    if (!isOpen) return null

    const sideClasses = {
        top: "top-0 left-0 right-0",
        right: "right-0 top-0 h-full",
        bottom: "bottom-0 left-0 right-0",
        left: "left-0 top-0 h-full"
    }

    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsOpen(false)} />
            <div
                ref={ref}
                className={`fixed bg-background p-6 shadow-lg z-50 ${sideClasses[side]} ${className || ''}`}
                {...props}
            >
                {children}
            </div>
        </>
    )
})
SheetContent.displayName = "SheetContent"

export { Sheet, SheetTrigger, SheetContent }