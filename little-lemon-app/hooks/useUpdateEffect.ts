import { useEffect, useRef } from "react";

export function useUpdateEffect(
    effect: () => any,
    dependencies: Array<any> = []
) {
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            return effect();
        }
    }, dependencies);
};
