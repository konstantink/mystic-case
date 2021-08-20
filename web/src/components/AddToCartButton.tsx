import * as React from "react";
import { animated, useSpring } from "@react-spring/web";

import { createStyles, Theme, WithStyles, withStyles} from "@material-ui/core/styles";

type Coords = {
    x: number,
    y:number
};
interface AddToCartButtonProps extends WithStyles<typeof styles> {};


const styles = (theme: Theme) => createStyles({
    container: {
        // backgroundColor: "#938CD1",
        border: "4px solid #938CD1",
        borderRadius: theme.spacing(10),
        // height: theme.spacing(10),
        overflow: "hidden",
        padding: theme.spacing(2.5, 4.5),
        position: "relative",
        // width: theme.spacing(33),
        // "& a": {
            color: "#3A3185",
            fontFamily: "Pangram",
            fontSize: theme.spacing(3),
            fontWeight: 900,
            lineHeight: `${theme.spacing(3)}px`,
            letterSpacing: "0.3px",
            textDecoration: "none",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
        // }
        "&:hover": {
            backgroundColor: "#DBDBDB",
        },
        "& .ripple": {
            width: 20,
            height: 20,
            position: "absolute",
            background: "#d1d1d1", //"rgba(159, 190, 36, 0.26)", //"#63a4ff",
            display: "block",
            borderRadius: 9999,
            opacity: 0,
            zIndex: 102,
        },
        zIndex:100,
    },
    button: {
        borderRadius: theme.spacing(10),
        height: "100%",
        left: 0,
        position: "absolute",
        top: 0,
        width: "100%",
        zIndex:10,
    },
});

const AddToCartButton = withStyles(styles)(({ classes }: AddToCartButtonProps) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const handleClick = (e: React.MouseEvent) => {
        if(ref && ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setCoords({x: e.clientX - rect.left, y: e.clientY - rect.top})
            set({
                reset: true,
                config: {
                    damping: 0.8,
                    frequency: 9 / 10
                },
                onRest: () => {},
                from: { scale: 0, opacity: 1},
                to: { scale: 30, opacity: 0},
            })
            // console.log(e.clientX)
        }
    };

    const [isRippling, setRippling] = React.useState<boolean>(false);
    const [coords, setCoords] = React.useState<Coords>({x: -1, y: -1})

    const [props, set] = useSpring(() => ({
        from: {opacity: 0, scale: 0},
        to: {opacity: 0.5, scale: 40},
        config: {duration: 900}
    }));

    React.useEffect(() => {
        if (!isRippling) { setCoords({x: -1, y: -1}) }
    }, [isRippling]);

    React.useEffect(() => {
        if (coords.x !== -1 && coords.y !== -1) {
            setRippling(true);
            setTimeout(() => setRippling(false), 1000);
        } else {
            setRippling(false);
        }
    }, [coords])
    
    return (
        <div ref={ref} className={classes.container} onClick={handleClick}>
            <span style={{ position: "relative", zIndex: 105 }}>Add to cart</span>
            <span className={classes.button}></span>
            {isRippling && (<animated.span className="ripple" style={{ left: coords.x, top: coords.y, ...props }}/>)}
        </div>
    )
});

export default AddToCartButton;