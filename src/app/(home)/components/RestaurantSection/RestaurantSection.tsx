"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import { TiLocationArrowOutline } from "react-icons/ti";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import NoRestaurantFound from "../NoRestaurantFound/NoRestaurantFound";
import { useGetRestaurantListQuery } from "@/app/redux/features/restaurantApi";



const BASE_URL = "https://chatchefs.com";

export default function RestaurantSection() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const allParams = Object.fromEntries(searchParams.entries());
    const queryString = new URLSearchParams(allParams).toString();


    console.log("searchParams", allParams)

    const { data: restaurantList, isLoading, refetch } = useGetRestaurantListQuery({
        allParams: queryString,
    })

    console.log("restaurantList", restaurantList)


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


    return (
        <section className="w-full px-4 py-8 md:px-6 lg:px-8">
            <h2 className="mb-6 text-2xl font-bold">Restaurants near you</h2>
            {isLoading && (
                <div className="flex items-center justify-center py-10 text-xl">
                    <h3>Loading...</h3>
                </div>
            )}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {restaurantList?.results?.length ?
                    restaurantList?.results?.map((restaurant: any) => (
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
                                    <p className="text-sm">
                                        Delivery Fee: {restaurant?.delivery_fee || "Free"}
                                    </p>
                                    <p className="text-sm">Distance: {restaurant?.distance || "N/A"}</p>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="mt-2"
                                        onClick={() =>
                                            window.open(
                                                getVisitUrl(restaurant.slug, "default-location"),
                                                "_blank"
                                            )
                                        }
                                    >
                                        Schedule Order
                                    </Button>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <CardContent className="p-4">
                                <p className="text-sm text-gray-500">
                                    Address: {restaurant?.res_details?.address || "Not available"}
                                </p>
                                <div className="mt-4">
                                    <h4 className="text-sm font-bold mb-2">Opening Hours</h4>
                                    {restaurant?.opening_hours?.length ? (
                                        restaurant.opening_hours.map((hour: any, index: number) => (
                                            <p key={index} className="text-sm text-gray-600">
                                                {hour.start_time} - {hour.end_time}
                                            </p>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500">No hours available</p>
                                    )}
                                </div>
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
                    )) : null}
            </div>
            <div>
                {restaurantList?.results?.length <= 0 ? <NoRestaurantFound /> : null}
            </div>
        </section>
    );
}
