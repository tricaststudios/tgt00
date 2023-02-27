import { uuid } from "@/Lib/uuid";
import { useState, useEffect } from "react";

export const useNotificationPortal = () => {
    const [loaded, setLoaded] = useState(false);
    const [portalId] = useState(`notification-portal-${uuid()}`);

    useEffect(() => {
        const container = document.createElement("div");
        container.id = portalId;
        document.getElementsByTagName("body")[0].prepend(container);

        setLoaded(true);

        return () =>
            document.getElementsByTagName("body")[0].removeChild(container);
    }, [portalId]);

    return { loaded, portalId };
};

export default useNotificationPortal;
