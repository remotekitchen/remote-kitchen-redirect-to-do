'use client';
import { useEffect, useState } from 'react';

interface ClientOnlyProps {
    children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({
    children,
}: ClientOnlyProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div>Loading</div>;
    }

    return <>{children}</>;
};

export default ClientOnly;
