"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Menu, ShoppingCart, X } from 'lucide-react'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

// const menuItems = [
//     { name: "Shop", href: "#" },
//     { name: "About", href: "#" },
//     { name: "Journal", href: "#" },
//     { name: "Contact", href: "#" },
// ]

export default function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [cartCount, setCartCount] = React.useState(0)

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="mr-4 shrink-0 lg:hidden"
                            >
                                {isOpen ? (
                                    <X className="h-5 w-5" />
                                ) : (
                                    <Menu className="h-5 w-5" />
                                )}
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px]">
                            <SheetHeader>
                                <SheetTitle>Menu</SheetTitle>
                            </SheetHeader>
                            {/* <div className="mt-8 flex flex-col gap-4">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-lg font-medium transition-colors hover:text-primary"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div> */}
                        </SheetContent>
                    </Sheet>
                    <Link
                        href="/"
                        className="text-xl font-semibold tracking-wider hover:opacity-90"
                    >
                        Remote Kitchen
                    </Link>
                </div>

                <div className="hidden lg:flex lg:items-center lg:gap-8">
                    {/* {menuItems.map((item, index) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                href={item.href}
                                className="text-sm font-medium transition-colors hover:text-primary"
                            >
                                {item.name}
                            </Link>
                        </motion.div>
                    ))} */}
                </div>

                <div className="flex items-center gap-4">
                    {/* <Button
                        variant="ghost"
                        size="icon"
                        className="relative"
                        onClick={() => setCartCount((prev) => prev + 1)}
                    >
                        <ShoppingCart className="h-5 w-5" />
                        {cartCount > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground"
                            >
                                {cartCount}
                            </motion.span>
                        )}
                    </Button> */}
                    <Button size="sm" className="hidden sm:inline-flex">
                        Sign In
                    </Button>
                </div>
            </div>
        </nav>
    )
}

