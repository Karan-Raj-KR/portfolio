import { ImageIcon } from "lucide-react";

interface ImagePlaceholderProps {
    width?: string;
    height?: string;
    text?: string;
    className?: string;
}

export function ImagePlaceholder({ 
    width = "100%", 
    height = "300px", 
    text = "Image Placeholder",
    className = ""
}: ImagePlaceholderProps) {
    return (
        <div 
            className={`flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/10 text-muted-foreground ${className}`}
            style={{ width, height }}
        >
            <ImageIcon className="mb-2 h-8 w-8 opacity-50" />
            <span className="text-sm font-medium opacity-50">{text}</span>
        </div>
    );
}
