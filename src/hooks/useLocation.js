import { useState, useEffect } from "react";
import { requestForegroundPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';

export default (shouldTrack, callback) => {
    const [err, setErr] = useState(null);

    useEffect(() => {
        let subsciber;

        const startWatching = async () => {
            try {
                const { granted } = await requestForegroundPermissionsAsync();
                if (!granted) {
                    throw new Error('Location permission not granted');
                }
                subsciber = await watchPositionAsync({
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000,
                    distanceInterval: 10
                },
                    callback
                );
            } catch (e) {
                setErr(e);
            }
        };

        if (shouldTrack) {
            startWatching();
        } else {
            if (subsciber) {
            subsciber.remove();
            }
            subsciber = null;
        }

        return () => {
            if (subsciber) {
                subsciber.remove();
            }
        };

    }, [shouldTrack, callback]);

    return [err];
};