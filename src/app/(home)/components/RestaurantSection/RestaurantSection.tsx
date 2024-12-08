import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";

interface Restaurant {
    id: number;
    name: string;
    location: string;
    cuisineType: string[];
    address: string;
    distance: string;
    openingTime: string;
    imageUrl: string;
}

const restaurants: Restaurant[] = [
    {
        id: 1,
        name: "Toranj Fine Foods",
        location: "Yonge/Steeles",
        cuisineType: ["Middle Eastern", "Asian"],
        address: "6464 Yonge Street",
        distance: "95 m",
        openingTime: "Opens Today 11:30 AM",
        imageUrl: "/resturant.png",
    },
    {
        id: 2,
        name: "Salamat Bakery",
        location: "Steeles/Hilda",
        cuisineType: ["Baked Goods", "Sweets"],
        address: "unit 15 100 Steeles Avenue West",
        distance: "160 m",
        openingTime: "Opens Thu 8:00 AM",
        imageUrl: "/resturant.png",
    },
    {
        id: 3,
        name: "EAT BKK Thai Kitchen & Bar",
        location: "Athabasca/Yonge",
        cuisineType: ["Thai", "Asian"],
        address: "6307 Yonge Street",
        distance: "260 m",
        openingTime: "Opens Today 11:30 AM",
        imageUrl: "/resturant.png",
    },
    {
        id: 4,
        name: "EAT BKK Thai Kitchen & Bar",
        location: "Athabasca/Yonge",
        cuisineType: ["Thai", "Asian"],
        address: "6307 Yonge Street",
        distance: "260 m",
        openingTime: "Opens Today 11:30 AM",
        imageUrl: "/resturant.png",
    },
    {
        id: 5,
        name: "EAT BKK Thai Kitchen & Bar",
        location: "Athabasca/Yonge",
        cuisineType: ["Thai", "Asian"],
        address: "6307 Yonge Street",
        distance: "260 m",
        openingTime: "Opens Today 11:30 AM",
        imageUrl: "/resturant.png",
    },
    {
        id: 6,
        name: "EAT BKK Thai Kitchen & Bar",
        location: "Athabasca/Yonge",
        cuisineType: ["Thai", "Asian"],
        address: "6307 Yonge Street",
        distance: "260 m",
        openingTime: "Opens Today 11:30 AM",
        imageUrl: "/resturant.png",
    },
];

export default function RestaurantSection() {
    return (
        <section className="w-full px-4 py-8 md:px-6 lg:px-8">
            <h2 className="mb-6 text-2xl font-bold">Restaurants near you</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {restaurants.map((restaurant) => (
                    <Card
                        style={{ boxShadow: "rgba(219, 222, 229, 0.4) 0px 6px 18px 0px" }}
                        key={restaurant.id}
                        className="overflow-hidden"
                    >
                        <div className="relative aspect-[4/2] sm:aspect-[4/1.6]">
                            <Image
                                src={restaurant.imageUrl}
                                alt={restaurant.name}
                                fill
                                className="object-cover transition-transform duration-300 hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <div className="flex items-center gap-2 text-white">
                                    <Clock className="h-4 w-4" />
                                    <span className="text-sm">{restaurant.openingTime}</span>
                                </div>
                                <Button variant="secondary" size="sm" className="mt-2">
                                    Schedule Order
                                </Button>
                            </div>
                        </div>
                        <CardHeader>
                            <h3 className="text-lg font-semibold">{`${restaurant.name} (${restaurant.location})`}</h3>
                            <p className="text-sm text-muted-foreground">
                                {restaurant.cuisineType.join(" • ")}
                            </p>
                        </CardHeader>
                        <CardContent className="py-0">
                            <div className="flex items-start gap-2">
                                <MapPin className=" text-muted-foreground" />
                                <div>
                                    <p className="text-sm">{restaurant.address}</p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {restaurant.distance}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
