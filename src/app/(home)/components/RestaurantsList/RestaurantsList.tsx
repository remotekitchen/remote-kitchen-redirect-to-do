"use client"

import { useEffect, useState } from "react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"


const restaurants = [
    {
        id: 1,
        name: "The Rustic Table",
        cuisine: "Italian",
        rating: 4.7,
        price: "$$",
        image: "/placeholder.svg?height=200&width=300",
        address: "123 Main St, Anytown",
    },
    {
        id: 2,
        name: "Spice Garden",
        cuisine: "Indian",
        rating: 4.5,
        price: "$$$",
        image: "/placeholder.svg?height=200&width=300",
        address: "456 Oak Ave, Somewhere",
    },
    {
        id: 3,
        name: "Ocean Breeze",
        cuisine: "Seafood",
        rating: 4.8,
        price: "$$$$",
        image: "/placeholder.svg?height=200&width=300",
        address: "789 Beach Rd, Coastville",
    },
    {
        id: 4,
        name: "Green Leaf Cafe",
        cuisine: "Vegetarian",
        rating: 4.3,
        price: "$$",
        image: "/placeholder.svg?height=200&width=300",
        address: "101 Park Ln, Greentown",
    },
    {
        id: 5,
        name: "Smokey BBQ",
        cuisine: "American",
        rating: 4.6,
        price: "$$$",
        image: "/placeholder.svg?height=200&width=300",
        address: "202 Grill St, Smokeville",
    },
    {
        id: 6,
        name: "Sushi Express",
        cuisine: "Japanese",
        rating: 4.4,
        price: "$$$",
        image: "/placeholder.svg?height=200&width=300",
        address: "303 Rice Blvd, Fishtown",
    },
    {
        id: 7,
        name: "Taco Fiesta",
        cuisine: "Mexican",
        rating: 4.2,
        price: "$",
        image: "/placeholder.svg?height=200&width=300",
        address: "404 Salsa Ave, Spicyville",
    },
    {
        id: 8,
        name: "Parisian Corner",
        cuisine: "French",
        rating: 4.9,
        price: "$$$$",
        image: "/placeholder.svg?height=200&width=300",
        address: "505 Baguette St, Frenchtown",
    },
]

const API_URL = "https://api.chatchefs.com/remote-kitchen/api/v1/restaurant/lists/chatchef"

export default function RestaurantsList({ loading, setLoading }: any) {
    const [data, setData] = useState<typeof restaurants>([])
    const searchParams = useSearchParams();
    const allParams = Object.fromEntries(searchParams.entries());
    const queryString = new URLSearchParams(allParams).toString();



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}?${queryString}`, {
                    cache: "force-cache",
                })

                if (!response.ok) {
                    throw new Error("Failed to fetch restaurants")
                }

                const result = await response.json()
                setData(result)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching restaurants:", error)
                setData(restaurants)
                setLoading(false)
            }
        }

        fetchData()
    }, [loading])

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Restaurants</h1>
                <p className="text-muted-foreground mt-2">Discover the best dining experiences in your area</p>
            </div>

            {loading ? (
                <RestaurantSkeleton />
                //@ts-ignore
            ) : data?.results?.length > 0 ? (
                <RestaurantList restaurants={data} />
            ) : (
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                    <div className="animate-bounce-slow mb-6 rounded-full bg-muted p-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-muted-foreground"
                        >
                            <path d="M17 8c.7 0 1.3.3 1.7.7.4.4.7 1 .7 1.7 0 1.5-1.3 2.7-2.7 2.7h-1.3c-.5 0-.9.4-.9.9s.4.9.9.9h1.3c1.5 0 2.7-1.3 2.7-2.7 0-.7-.3-1.3-.7-1.7-.4-.4-1-.7-1.7-.7H6.3c-.5 0-.9.4-.9.9s.4.9.9.9h10.7c-.5 0-.9-.4-.9-.9s.4-.9.9-.9z" />
                            <path d="M11.6 19.5c.5 0 .9-.4.9-.9v-1.3c0-.5-.4-.9-.9-.9s-.9.4-.9.9v1.3c0 .5.4.9.9.9z" />
                            <path d="M11.6 6.8c.5 0 .9-.4.9-.9V4.6c0-.5-.4-.9-.9-.9s-.9.4-.9.9v1.3c0 .5.4.9.9.9z" />
                            <path d="M4.6 12.4c0 .5.4.9.9.9h1.3c.5 0 .9-.4.9-.9s-.4-.9-.9-.9H5.5c-.5 0-.9.4-.9.9z" />
                            <path d="M17.3 12.4c0 .5.4.9.9.9h1.3c.5 0 .9-.4.9-.9s-.4-.9-.9-.9h-1.3c-.5 0-.9.4-.9.9z" />
                            <path d="M7.2 17.6c.4.4.9.4 1.3 0l.9-.9c.4-.4.4-.9 0-1.3-.4-.4-.9-.4-1.3 0l-.9.9c-.4.4-.4.9 0 1.3z" />
                            <path d="M15.8 9c.4.4.9.4 1.3 0l.9-.9c.4-.4.4-.9 0-1.3-.4-.4-.9-.4-1.3 0l-.9.9c-.4.4-.4.9 0 1.3z" />
                            <path d="M7.2 9c.4-.4.4-.9 0-1.3l-.9-.9c-.4-.4-.9-.4-1.3 0-.4.4-.4.9 0 1.3l.9.9c.4.4.9.4 1.3 0z" />
                            <path d="M15.8 17.6c.4-.4.4-.9 0-1.3l-.9-.9c-.4-.4-.9-.4-1.3 0-.4.4-.4.9 0 1.3l.9.9c.4.4.9.4 1.3 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight mb-2">No Restaurants Found</h2>
                    <p className="text-muted-foreground max-w-md mx-auto mb-8">
                        We couldn't find any restaurants matching your criteria. Try adjusting your search or check back later.
                    </p>
                </div>
            )}
        </div>
    )
}

function RestaurantList({ restaurants }: any) {

    const BASE_URL = "https://order.chatchefs.com/";

    const getRestaurantImageUrl = (avatarImage: any) => {
        if (avatarImage?.local_url) {
            return avatarImage.local_url;
        } else if (avatarImage?.remote_url) {
            return avatarImage.remote_url;
        } else if (avatarImage?.working_url) {
            return avatarImage.working_url;
        } else {
            return "https://via.placeholder.com/150?text=No+Image";
        }
    };


    const getVisitUrl = (restaurantSlug: string, locationSlug: string) => {
        return `${BASE_URL}/${restaurantSlug}/${locationSlug}/menu`;
    };

    console.log("restaurants list", restaurants?.results[0])


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {restaurants?.results?.map((restaurant: any) => (
                <Card
                    style={{
                        boxShadow: "rgba(0, 0, 0, 0.2) 0px 4px 12px",
                        borderRadius: "12px",
                    }}
                    key={restaurant.id}
                    className="overflow-hidden relative group"
                >
                    {/* Restaurant Image */}
                    <div className="relative aspect-[4/2] sm:aspect-[4/1.6]">
                        <motion.img
                            src={getRestaurantImageUrl(restaurant.avatar_image)}
                            alt={`${restaurant.name} Image`}
                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        {/* Info Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <h3 className="text-lg font-bold">{restaurant?.name}</h3>
                            {/* <p className="text-sm">
                                Delivery Fee: {restaurant?.delivery_charge || "Free"}
                            </p> */}
                            <p className="text-sm">Distance: {restaurant?.distance || "N/A"}</p>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <CardContent className="p-4">
                        <h2>{restaurant?.name}</h2>
                        <p className="text-sm text-gray-500">
                            Address: {restaurant?.location_details[0]?.details || "Not available"}
                        </p>

                    </CardContent>

                    {/* Hover Overlay for Location Details */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                        <h4 className="text-lg font-bold mb-4">Locations</h4>
                        <div className="space-y-4 px-4">
                            {restaurant?.location_details?.map((location: any, index: any) => (
                                <motion.div
                                    key={location.id || index}
                                    className="flex justify-between items-center bg-white/20 backdrop-blur-md rounded-md p-4 w-full"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div>
                                        <p className="font-semibold">
                                            {location.name || "Unnamed Location"}
                                        </p>
                                        <p className="text-sm">
                                            {location.details || "No details provided"}
                                        </p>
                                        {location.is_location_closed && (
                                            <span className="text-xs text-red-500">Closed</span>
                                        )}
                                    </div>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() =>
                                            window.open(
                                                getVisitUrl(
                                                    restaurant?.res_details?.slug,
                                                    location.slug || "default-location"
                                                ),
                                                "_blank"
                                            )
                                        }
                                    >
                                        Visit
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Card>
            ))}
        </div>
    )
}

function RestaurantSkeleton() {
    // Create an array of 8 items to match our data length
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                    <Skeleton className="aspect-video w-full" />
                    <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-6 w-10" />
                        </div>
                        <Skeleton className="h-4 w-1/2 mt-2" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <Skeleton className="h-4 w-full" />
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                        <Skeleton className="h-4 w-24" />
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

