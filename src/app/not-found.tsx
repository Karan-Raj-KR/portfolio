import { Metadata } from "next";
import { NotFoundContent } from "@/components/not-found-content";

export const metadata: Metadata = {
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist or has been moved.",
};

export default function NotFound() {
    return <NotFoundContent />;
}
