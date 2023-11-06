import React from 'react'
import { useSpring, animated } from "react-spring";

function Number({ original, change }) {
    const updated = original + change;
    const { number } = useSpring({
        from: {number: original},
        number: updated,
        delay: 200,
        config: {mass: 1, tension: 20, friction: 10},
    });
    return (
        <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
    )
}

export default Number