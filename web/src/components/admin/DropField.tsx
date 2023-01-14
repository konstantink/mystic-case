import { AxiosProgressEvent } from "axios";
import clamp from "lodash-es/clamp";
import _ from "lodash";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import { mergeRefs } from "react-merge-refs";
import { useDrag } from "@use-gesture/react";
import useMeasure from "react-use-measure";
import { animated, config, to, useSprings } from "react-spring";

import AddOutlined from "@mui/icons-material/AddOutlined";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { FileUploadOutlined } from "@mui/icons-material";

import * as mcApi from "../../api/api";
import { useNotifier } from "../../hooks/useNotifier";
import {
    ProductImage,
    ProgressAction,
    ProgressReducer,
    ProgressState,
    UploadResponse,
    UploadSuccessResponse
} from "../../types";

const move = <T = number>(array: Array<T>, moveIndex: number, toIndex: number) => {
    /* #move - Moves an array item from one position in an array to another.
       Note: This is a pure function so a new array will be returned, instead
       of altering the array argument.
      Arguments:
      1. array     (String) : Array in which to move an item.         (required)
      2. moveIndex (Object) : The index of the item to move.          (required)
      3. toIndex   (Object) : The index to move item at moveIndex to. (required)
    */
    const item = array[moveIndex];
    const length = array.length;
    const diff = moveIndex - toIndex;

    if (diff > 0) {
        // move left
        return [
            ...array.slice(0, toIndex),
            item,
            ...array.slice(toIndex, moveIndex),
            ...array.slice(moveIndex + 1, length)
        ];
    } else if (diff < 0) {
        // move right
        const targetIndex = toIndex + 1;
        return [
            ...array.slice(0, moveIndex),
            ...array.slice(moveIndex + 1, targetIndex),
            item,
            ...array.slice(targetIndex, length)
        ];
    }
    return array;
};

const useStyles = makeStyles(() => ({
    container: {
        background: "#fefefe",
        color: "rgba(0,0,0,0.6)",
        height: "calc(100% - 24px)",
        width: "100%",
    },
    field: {
        border: "1px solid rgba(0,0,0,0.26)",
        borderRadius: "4px",
        bottom: 0,
        left: 0,
        margin: 0,
        padding: "0 8px",
        position: "absolute",
        right: 0,
        top: -5,
        width: "100%",
        height: "100%",
    },
    fieldset: {
        border: "1px solid rgba(0,0,0,0.26)",
        borderRadius: 4,
        height: "calc(596.55px - 29px)",
        overflowY: "auto",
        paddingRight: "0 4px 0 8px",
    },
    imagesContainer: {
        height: "calc(100% - 44.5px)",
        overflowX: "hidden",
        paddingBottom: 1,
        position: "relative",
        width: "100%",
        "&>div": {
            position: "absolute",
            touchAction: "none",
        },
        "&::-webkit-scrollbar": {
            width: 16,
            background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
            background: "hsl(0 0% 0% / 0.4)",
            border: "4px solid #fff",
            borderRadius: 8,
        },
    },
    legend: {
        color: "rgba(0,0,0,0.6)",
        fontSize: "0.75rem",
        visibility: "hidden",
    },
}));

const useImageStyles = makeStyles(() => ({
    imageCard: {
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
        position: "relative",
    },
    spinnerCard: {
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
    },
}));

const EmptyImageUpload = ({ addFiles }: { addFiles(files: Array<File>): void }) => {
    const { getRootProps, getInputProps, isDragAccept, open } = useDropzone({
        onDrop: addFiles,
        noClick: true,
        noKeyboard: true,
    });

    const style = React.useMemo(() => ({
        ...(isDragAccept ? { borderColor: "rgb(58, 49, 133)" } : {}),
    }), [isDragAccept]);

    return (
        <Box
            component="div"
            alignItems="center"
            border="2px dashed rgba(0,0,0,0.26)"
            borderRadius={1}
            boxShadow="inset black 0 0 10px 2px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            height={150}
            position="absolute"
            width={150}
            sx={{
                background: "rgba(0 0 0 / 11%)",
            }}
            {...getRootProps(style)}
        >
            <input {...getInputProps()} />
            <IconButton aria-label="upload" onClick={open}>
                <AddOutlined fontSize="large" />
            </IconButton>
        </Box>
    );
};

interface ImagePreviewProps {
    file: File | ProductImage;
    uploadProgress: number;
    removeFile(): void;
}

interface ImagePreviewState {
    loading: boolean;
    ready: boolean;
}

interface ImagePreviewAction {
    type: string;
}

const ACTION_IMAGE_LOADING = "@@action/image_preview/image_loading";
const ACTION_IMAGE_LOADED = "@@action/image_preview/image_loaded";

const ImagePreview = React.memo(({ file, uploadProgress, removeFile }: ImagePreviewProps) => {
    const classes = useImageStyles();
    const [image, setImage] = React.useState<string>("");
    React.useEffect(() => {
        let fileReader: FileReader; let isCancel = false;
        if (file && !_.has(file, "id")) {
            dispatch({ type: ACTION_IMAGE_LOADING });
            (async () => {
                fileReader = new FileReader();
                fileReader.onload = (e) => {
                    const { result } = e.target ? e.target : { result: false };
                    if (result && !isCancel) {
                        setImage(result as string);
                    }
                    dispatch({ type: ACTION_IMAGE_LOADED });
                };
                fileReader.readAsDataURL(file as File);
            })();
        } else {
            setImage((file as ProductImage).url);
        }
        return () => {
            isCancel = true;
            dispatch({ type: ACTION_IMAGE_LOADED });
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        };
    }, [file]);

    const reducer = (state: ImagePreviewState, action: ImagePreviewAction) => {
        switch (action.type) {
        case ACTION_IMAGE_LOADING:
            return {
                ...state,
                loading: true,
                ready: false,
            };
        case ACTION_IMAGE_LOADED:
            return {
                ...state,
                loading: false,
                ready: true,
            };
        default:
            return state;
        }
    };

    const [state, dispatch] = React.useReducer(reducer, { loading: false, ready: false });

    return (
        <Card
            className={state.loading ? classes.spinnerCard : classes.imageCard}
            sx={{
                backgroundImage: state.ready ? `url('${image}')` : "none",
                height: 150,
                width: 150,
            }}
        >
            {state.loading
                ? (<CircularProgress />)
                : (<Box
                    alignItems="center"
                    color="#F0F0F0"
                    component="div"
                    display="grid"
                    gridTemplateColumns="122px 16px"
                    padding="0 4px"
                    position="absolute"
                    width="100%"
                    sx={{ background: "rgba(0,0,0,0.5)", gridColumnGap: "4px" }}
                >
                    <Typography component="span" variant="body1" sx={{ fontSize: "12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "100%" }}>
                        {file.name}
                    </Typography>
                    <IconButton sx={{ color: "#fff", height: 24 }} onClick={removeFile}>
                        <CloseOutlined sx={{ height: 16, width: 16 }}/>
                    </IconButton>
                </Box>
                )}
            {(uploadProgress !== undefined && (uploadProgress === 100 || _.has(file, "id"))) && (
                <Box
                    alignItems="center"
                    bottom={0}
                    color="#F0F0F0"
                    component="div"
                    position="absolute"
                    width="100%"
                    sx={{ background: "rgba(0,0,0,0.5)" }}
                >
                    <Typography component="span" variant="body1" sx={{ fontSize: "12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "100%" }}>
                        <CheckCircleOutline />
                    </Typography>
                </Box>
            )}
        </Card>
    );
});

const IMAGE_SIZE = { width: 150, height: 150 };
const PADDING = 8;
const placeImages = (ref: React.RefObject<HTMLDivElement>, order: Array<number>, down = false, originalIndex = -1, curIndex = -1, x = 0, y = 0) => (index: number) => {
    if (ref.current === null) {
        return { x: 0, y: 0, scale: 1, shadow: 1, zIndex: 1 };
    }

    const { width } = ref.current.getBoundingClientRect();
    const imagesInRow = Math.floor(width / (IMAGE_SIZE.width + PADDING));
    if (down && index === originalIndex) {
        const [row, col] = [Math.floor((curIndex + 1) / imagesInRow), (curIndex + 1) % imagesInRow];
        return {
            y: (IMAGE_SIZE.height + PADDING) * row + y,
            x: (IMAGE_SIZE.width + PADDING) * col + x,
            scale: 1.1,
            shadow: 15,
            zIndex: 1,
            immediate: (key: string) => key === "zIndex",
            config: (key: string) => (key === "y" ? config.stiff : config.default),
        };
    } else {
        const [row, col] = [Math.floor((order.indexOf(index) + 1) / imagesInRow), (order.indexOf(index) + 1) % imagesInRow];
        return {
            y: (IMAGE_SIZE.height + PADDING) * row,
            x: (IMAGE_SIZE.width + PADDING) * col,
            scale: 1,
            shadow: 1,
            zIndex: 0,
            immediate: false,
        };
    }
};

export interface DropFieldProps {
    images?: Array<ProductImage>;
    onUploadSuccess?(images: Array<ProductImage>): void;
}

export default ({ images, onUploadSuccess }: DropFieldProps) => {
    const { error, success } = useNotifier();
    const [files, setFiles] = React.useState<Array<ProductImage | File>>(images || []);
    const classes = useStyles();
    const [_ref, { width }] = useMeasure();
    const ref = React.useRef<HTMLDivElement>(null);
    const order = React.useRef(files.map((_, idx) => idx));

    const bind = useDrag(({ args: [originalIndex], active, movement: [x, y] }) => {
        const curIndex = order.current.indexOf(originalIndex);
        const imagesInRow = Math.floor(width / (IMAGE_SIZE.width + PADDING));
        const imagesInCol = Math.round(order.current.length / imagesInRow);
        const curRow = clamp(Math.round((Math.floor((curIndex + 1) / imagesInRow) * IMAGE_SIZE.height + y) / IMAGE_SIZE.width), 0, imagesInCol);
        const curCol = clamp(Math.round((((curIndex + 1) % imagesInRow) * IMAGE_SIZE.width + x) / IMAGE_SIZE.width), 0, imagesInRow);
        const newIndex = clamp(curRow * imagesInRow + curCol - 1, 0, order.current.length);
        const newOrder = move<number>(order.current, curIndex, newIndex);

        api.start(placeImages(ref, newOrder, active, originalIndex, curIndex, x, y));
        if (!active) order.current = newOrder;
    }, { bounds: ref, rubberband: true });

    const progressReducer = (state: ProgressState, action: ProgressAction) => {
        switch (action.type) {
        case "progress":
            return {
                ...state,
                [action.fileName]: {
                    status: action.status,
                    progress: action.progress,
                },

            };
        case "clear_progress":
            return {};
        case "load":
            return {
                ...state,
                [action.fileName]: {
                    status: action.status,
                    progress: action.progress,
                },
            };
        case "error":
            return {
                ...state,
                [action.fileName]: {
                    status: action.status,
                    progress: action.progress,
                },
            };
        default:
            return state;
        }
    };
    const [progress, progressDispatch] = React.useReducer<ProgressReducer>(progressReducer, {});

    const onProgress = (file: File) => (pe: AxiosProgressEvent) => {
        progressDispatch({
            type: "progress",
            fileName: file.name,
            progress: Math.round((pe.loaded / (pe.total || 1)) * 100),
            status: "pending",
        } as ProgressAction);
        if (pe.loaded / (pe.total || 1) === 1) {
            progressDispatch({
                type: "progress",
                fileName: file.name,
                progress: 100,
                status: "done",
            } as ProgressAction);
        }
    };

    const uploadFiles = React.useCallback(async () => {
        try {
            const token = await mcApi.checkToken();
            if (token.success) {
                const promises: Array<Promise<UploadResponse>> = [];
                files.filter(item => !_.has(item, "id")).forEach(file => promises.push(mcApi.uploadFile(file as File, onProgress(file as File))));
                try {
                    const values = await Promise.all(promises);
                    if (onUploadSuccess) {
                        onUploadSuccess(values
                            .filter((item: UploadResponse) => item.success)
                            .map((item: UploadResponse) => (item as UploadSuccessResponse).item));
                    }
                    success(`Successfully uploaded ${promises.length} file(s)`);
                } catch (err) {
                    error((err as Error).message);
                }
            }
        } catch (err) {
            error("You are not authorized, please log in.");
        }
    }, [files]);

    React.useEffect(() => {
        api.start(placeImages(ref, order.current));
        return () => {
            api.stop();
        };
    }, [width]);

    const [gridItems] = React.useMemo(() => {
        const { width } = ref.current ? ref.current.getBoundingClientRect() : { width: 0 };
        const imagesInRow = Math.floor(width / (IMAGE_SIZE.width + PADDING));
        const gridItems = files.map((_, idx) => {
            const [row, col] = [Math.floor((idx + 1) / imagesInRow), (idx + 1) % imagesInRow];

            return {
                y: (IMAGE_SIZE.height + PADDING) * row,
                x: (IMAGE_SIZE.width + PADDING) * col,
                scale: 1,
                shadow: 1,
                zIndex: 0,
            };
        });

        return [gridItems];
    }, [images, files, width]);

    const [springs, api] = useSprings(gridItems.length, placeImages(ref, order.current));

    const addFiles = (uploadedFiles: Array<File>) => {
        const newFiles = [...files, ...uploadedFiles];
        order.current = newFiles.map((_, idx) => idx);
        setFiles(newFiles);
    };

    const removeFile = (idx: number) => () => {
        const newFiles = [...files.slice(0, idx), ...files.slice(idx + 1)];
        order.current = newFiles.map((_, idx) => idx);
        setFiles(newFiles);
    };

    return (
        <Box component="div" sx={{ padding: "4px 0 9px 0" }}>
            <fieldset className={classes.fieldset}>
                <legend>
                    <span style={{ color: "rgba(0,0,0,0.6)", fontSize: "0.75rem" }}>Product images</span>
                </legend>
                <div
                    ref={mergeRefs([_ref, ref])}
                    className={classes.imagesContainer}
                >
                    <EmptyImageUpload addFiles={addFiles} />
                    {springs.map(({ x, y, scale, shadow, zIndex }, i) => (
                        <animated.div
                            {...bind(i)}
                            key={files[order.current[i]].name}
                            style={{
                                zIndex,
                                boxShadow: shadow.to(s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
                                transform: to([x, y, scale], (x, y, s) => `translate3d(${x}px,${y}px,0) scale(${s})`),
                            }}
                        >
                            <ImagePreview file={files[i]} removeFile={removeFile(i)} uploadProgress={progress[files[i].name]?.progress || 0} />
                        </animated.div>
                    ))}
                </div>
                <Container sx={{ background: "#fefefe", bottom: 0, padding: 0.5, position: "relative" }}>
                    <div style={{
                        position: "absolute",
                        height: "calc(100% - 8px)",
                        width: "calc(100% - 48px)",
                        background: "rgba(0,0,0,0.4)",
                        filter: "blur(8px)",
                    }}
                    ></div>
                    <Button fullWidth variant="contained" startIcon={<FileUploadOutlined />} onClick={uploadFiles}>Upload</Button>
                </Container>
            </fieldset>
        </Box>
    );
};
