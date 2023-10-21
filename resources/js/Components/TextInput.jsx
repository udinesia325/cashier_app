import { cn } from "@/lib/utils";
import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput(
    { type = "text", className = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={cn(
                "border-b-2 border-b-gray-100 pb-1 outline-none text-lg focus:border-b-gray-300",
                className
            )}
            ref={input}
        />
    );
});
